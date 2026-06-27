// Stockage unifié pour Le Panier d'Elif.
//
// - En PRODUCTION (Vercel) : utilise Vercel Blob (persistant), store PRIVÉ.
//   Le store est connecté au projet via OIDC → Vercel injecte BLOB_STORE_ID +
//   VERCEL_OIDC_TOKEN (auto-géré). Le SDK @vercel/blob les lit tout seul.
//   (Un BLOB_READ_WRITE_TOKEN classique fonctionne aussi s'il est présent.)
// - En LOCAL (`next dev`)  : repli sur des fichiers dans .data/ (gitignoré),
//   pour fonctionner sans configuration.
//
// Tout est lu/écrit via le SDK (put/get/list) en access:'private'. Les blobs ne
// sont jamais exposés en URL publique : les images sont servies par notre route
// same-origin app/api/media/[id], qui lit le binaire via getBlob().

import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')
const ACCESS = 'private'

// En dev → fichiers locaux. Sinon (Vercel) → Vercel Blob.
const useFiles = process.env.NODE_ENV === 'development'

let _blob = null
async function blobApi() {
  if (!_blob) _blob = await import('@vercel/blob')
  return _blob
}

function safeKey(key) {
  return String(key).replace(/[^A-Za-z0-9._-]/g, '_')
}
// Chemins locaux (.data/)
function jsonPath(store, key)  { return path.join(DATA_DIR, store, `${safeKey(key)}.json`) }
function blobPath(store, key)  { return path.join(DATA_DIR, store, safeKey(key)) }
// Chemins distants (Vercel Blob, slashs)
function remoteJson(store, key) { return `${store}/${safeKey(key)}.json` }
function remoteBlob(store, key) { return `${store}/${safeKey(key)}` }

// Vrai si un store Vercel Blob est connecté (token RW classique, ou OIDC + store id).
function blobConfigured() {
  return !!(
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.VERCEL_OIDC_TOKEN ||
    process.env.BLOB_STORE_ID
  )
}
// À appeler avant toute écriture distante : message clair si le store n'est pas connecté.
function ensureBlob() {
  if (!blobConfigured()) {
    throw new Error('Stockage non configuré : connectez un store Vercel Blob au projet (Storage → Blob → Connect), puis redéployez.')
  }
}

// Récupère le contenu d'un pathname distant via le SDK (gère les blobs privés).
// Renvoie une Response (web) ou null si introuvable.
async function fetchRemote(pathname) {
  try {
    const { get } = await blobApi()
    const res = await get(pathname, { access: ACCESS })
    if (res && res.stream) {
      return new Response(res.stream, {
        headers: { 'content-type': res.blob?.contentType || 'application/octet-stream' },
      })
    }
  } catch {}
  return null
}

async function delRemote(pathname) {
  const { del } = await blobApi()
  try { await del(pathname) } catch {}
}

/* ----------------------------- JSON ----------------------------- */

export async function getJSON(store, key, fallback = null) {
  try {
    if (useFiles) {
      const raw = await fs.readFile(jsonPath(store, key), 'utf-8')
      return JSON.parse(raw)
    }
    const r = await fetchRemote(remoteJson(store, key))
    return r ? await r.json() : fallback
  } catch {
    return fallback
  }
}

export async function setJSON(store, key, value) {
  if (useFiles) {
    const p = jsonPath(store, key)
    await fs.mkdir(path.dirname(p), { recursive: true })
    await fs.writeFile(p, JSON.stringify(value, null, 2), 'utf-8')
    return
  }
  ensureBlob()
  const { put } = await blobApi()
  await put(remoteJson(store, key), JSON.stringify(value), {
    access: ACCESS, addRandomSuffix: false, contentType: 'application/json', allowOverwrite: true,
  })
}

export async function deleteJSON(store, key) {
  if (useFiles) {
    try { await fs.unlink(jsonPath(store, key)) } catch {}
    return
  }
  await delRemote(remoteJson(store, key))
}

/** Liste toutes les valeurs JSON d'un store. */
export async function listJSON(store) {
  try {
    if (useFiles) {
      const dir = path.join(DATA_DIR, store)
      let files = []
      try { files = await fs.readdir(dir) } catch { return [] }
      const out = []
      for (const f of files) {
        if (!f.endsWith('.json')) continue
        try { out.push(JSON.parse(await fs.readFile(path.join(dir, f), 'utf-8'))) } catch {}
      }
      return out
    }
    const { list, get } = await blobApi()
    const { blobs } = await list({ prefix: `${store}/` })
    const out = []
    for (const b of blobs) {
      if (!b.pathname.endsWith('.json')) continue
      try {
        const res = await get(b.pathname, { access: ACCESS })
        if (res && res.stream) out.push(await new Response(res.stream).json())
      } catch {}
    }
    return out
  } catch {
    return []
  }
}

/* ---------------------------- Binaire ---------------------------- */

export async function setBlob(store, key, buffer, contentType = 'application/octet-stream') {
  if (useFiles) {
    const p = blobPath(store, key)
    await fs.mkdir(path.dirname(p), { recursive: true })
    await fs.writeFile(p, buffer)
    await fs.writeFile(`${p}.type`, contentType, 'utf-8')
    return
  }
  ensureBlob()
  const { put } = await blobApi()
  await put(remoteBlob(store, key), buffer, {
    access: ACCESS, addRandomSuffix: false, contentType, allowOverwrite: true,
  })
}

export async function getBlob(store, key) {
  try {
    if (useFiles) {
      const p = blobPath(store, key)
      const buffer = await fs.readFile(p)
      let contentType = 'application/octet-stream'
      try { contentType = (await fs.readFile(`${p}.type`, 'utf-8')).trim() } catch {}
      return { buffer, contentType }
    }
    const r = await fetchRemote(remoteBlob(store, key))
    if (!r) return null
    return {
      buffer: Buffer.from(await r.arrayBuffer()),
      contentType: r.headers.get('content-type') || 'application/octet-stream',
    }
  } catch {
    return null
  }
}

export async function deleteBlob(store, key) {
  if (useFiles) {
    const p = blobPath(store, key)
    try { await fs.unlink(p) } catch {}
    try { await fs.unlink(`${p}.type`) } catch {}
    return
  }
  await delRemote(remoteBlob(store, key))
}
