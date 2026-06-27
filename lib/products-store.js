import seedProducts from '@/data/products.json'
import { getJSON, setJSON, setBlob, deleteBlob } from '@/lib/blob-store'

// Catalogue : un seul enregistrement JSON (tableau de produits) dans le store "catalog".
// Au premier accès, si rien n'est stocké, on retombe sur le seed data/products.json.
// Images uploadées : stockées dans le store binaire "media", servies via /api/media/<clé>.
const CATALOG_STORE = 'catalog'
const CATALOG_KEY   = 'all'
const MEDIA_STORE   = 'media'

export const ALLOWED_IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
}
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 Mo

/** Vérifie le mot de passe admin (header x-admin-password). */
export function isAuthorized(request) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const provided = request.headers.get('x-admin-password')
  return provided === expected
}

export async function readProducts() {
  const stored = await getJSON(CATALOG_STORE, CATALOG_KEY, null)
  if (Array.isArray(stored) && stored.length) return stored
  return seedProducts
}

export async function writeProducts(products) {
  await setJSON(CATALOG_STORE, CATALOG_KEY, products)
}

function nextId(products) {
  return products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 50) || 'produit'
}

/** Enregistre une image dans le store média, renvoie son chemin web (/api/media/...). */
export async function saveImage(file, baseName) {
  const ext = ALLOWED_IMAGE_TYPES[file.type]
  if (!ext) throw new Error('Format image non supporté (JPG, PNG ou WEBP)')
  if (file.size > MAX_IMAGE_BYTES) throw new Error('Image trop lourde (max 5 Mo)')

  const filename = `${Date.now()}-${slugify(baseName)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  await setBlob(MEDIA_STORE, filename, buffer, file.type)
  return `/api/media/${filename}`
}

/** Supprime une image uploadée si plus aucun produit ne l'utilise. */
export async function deleteImageIfUnused(imagePath, products) {
  if (!imagePath || !imagePath.startsWith('/api/media/')) return // n'efface pas les images du repo (/images/...)
  if (products.some(p => p.image === imagePath)) return
  const key = imagePath.replace('/api/media/', '')
  try { await deleteBlob(MEDIA_STORE, key) } catch {}
}

/** Parse/valide la liste des variantes (références) envoyée par l'admin. */
function parseOptions(raw, fallbackPrice) {
  if (raw === undefined || raw === null || raw === '') return undefined
  let arr = raw
  if (typeof raw === 'string') {
    try { arr = JSON.parse(raw) } catch { return undefined }
  }
  if (!Array.isArray(arr)) return undefined
  return arr
    .map(o => {
      const label = String(o.label || '').trim().slice(0, 60)
      if (!label) return null
      const p = Number(o.price)
      // normalize attrs: support explicit o.attrs, legacy o.includesCreamFromage, or defaults
      let attrs = null
      if (o && typeof o === 'object') {
        if (o.attrs && typeof o.attrs === 'object') {
          attrs = {
            hasCream: o.attrs.hasCream !== undefined ? !!o.attrs.hasCream : true,
            hasCheese: o.attrs.hasCheese !== undefined ? !!o.attrs.hasCheese : true,
          }
        } else if (o.includesCreamFromage !== undefined) {
          const v = !!o.includesCreamFromage
          attrs = { hasCream: v, hasCheese: v }
        } else if (o.hasCream !== undefined || o.hasCheese !== undefined) {
          attrs = {
            hasCream: o.hasCream !== undefined ? !!o.hasCream : true,
            hasCheese: o.hasCheese !== undefined ? !!o.hasCheese : true,
          }
        }
      }
      if (!attrs) attrs = { hasCream: true, hasCheese: true }
      return {
        ...o,
        id: String(o.id || slugify(label)).slice(0, 40),
        label,
        shortName: String(o.shortName || label).trim().slice(0, 60),
        price: Number.isFinite(p) && p > 0 ? p : fallbackPrice,
        attrs,
      }
    })
    .filter(Boolean)
    .slice(0, 12)
}

/** Normalise les champs communs (création + édition). */
function normalizeFields(fields) {
  const price = Number(fields.price)
  const name  = String(fields.name || '').trim()
  if (!name) throw new Error('Le nom est requis')
  if (!Number.isFinite(price) || price <= 0) throw new Error('Prix invalide')

  const category = fields.category === 'surgele' ? 'surgele' : 'frais'
  const base = {
    category,
    name,
    shortName: String(fields.shortName || name).trim().slice(0, 60),
    description: String(fields.description || '').trim().slice(0, 400),
    price,
    unit: String(fields.unit || '').trim().slice(0, 60) || (category === 'surgele' ? 'Paquet à congeler' : '10 pièces / paquet'),
    badges: category === 'surgele' ? ['À congeler'] : ['Fait main'],
    bestseller: fields.bestseller === 'true' || fields.bestseller === true,
  }
  const options = parseOptions(fields.options, price)
  if (options !== undefined) base.options = options
  return base
}

/** Construit un nouveau produit validé. */
export function buildProduct(fields, imagePath, products) {
  return {
    id: nextId(products),
    ...normalizeFields(fields),
    image: imagePath || null,
  }
}

/** Fusionne des champs édités dans un produit existant. */
export function mergeProduct(existing, fields, imagePath) {
  return {
    ...existing,
    ...normalizeFields(fields),
    image: imagePath !== undefined ? imagePath : existing.image,
  }
}
