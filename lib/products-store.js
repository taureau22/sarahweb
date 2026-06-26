import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH  = path.join(process.cwd(), 'data', 'products.json')
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')

export const ALLOWED_IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
}
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 Mo

/** Vérifie le mot de passe admin (header x-admin-password). */
export function isAuthorized(request) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false // pas de mot de passe configuré = accès refusé
  const provided = request.headers.get('x-admin-password')
  return provided === expected
}

export async function readProducts() {
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw)
}

export async function writeProducts(products) {
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2) + '\n', 'utf-8')
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

/** Enregistre un fichier image dans public/images, renvoie le chemin web (/images/...). */
export async function saveImage(file, baseName) {
  const ext = ALLOWED_IMAGE_TYPES[file.type]
  if (!ext) throw new Error('Format image non supporté (JPG, PNG ou WEBP)')
  if (file.size > MAX_IMAGE_BYTES) throw new Error('Image trop lourde (max 5 Mo)')

  await fs.mkdir(IMAGES_DIR, { recursive: true })
  const filename = `${Date.now()}-${slugify(baseName)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(path.join(IMAGES_DIR, filename), buffer)
  return `/images/${filename}`
}

/** Supprime un fichier image si plus aucun produit ne l'utilise (jamais cover.jpeg). */
export async function deleteImageIfUnused(imagePath, products) {
  if (!imagePath || !imagePath.startsWith('/images/')) return
  const filename = imagePath.replace('/images/', '')
  if (filename === 'cover.jpeg') return
  const stillUsed = products.some(p => p.image === imagePath)
  if (stillUsed) return
  try {
    await fs.unlink(path.join(IMAGES_DIR, filename))
  } catch { /* fichier déjà absent : on ignore */ }
}

/** Construit un produit validé à partir des champs du formulaire. */
export function buildProduct(fields, imagePath, products) {
  const price = Number(fields.price)
  const name  = String(fields.name || '').trim()
  if (!name) throw new Error('Le nom est requis')
  if (!Number.isFinite(price) || price <= 0) throw new Error('Prix invalide')

  const category = fields.category === 'surgele' ? 'surgele' : 'frais'
  return {
    id: nextId(products),
    category,
    name,
    shortName: String(fields.shortName || name).trim().slice(0, 60),
    description: String(fields.description || '').trim().slice(0, 400),
    price,
    unit: String(fields.unit || '').trim().slice(0, 60) || (category === 'surgele' ? 'Paquet à congeler' : '10 pièces / paquet'),
    image: imagePath || null,
    badges: category === 'surgele' ? ['À congeler'] : ['Fait main'],
    bestseller: fields.bestseller === 'true' || fields.bestseller === true,
  }
}
