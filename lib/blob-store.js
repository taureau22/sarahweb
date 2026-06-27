// Stockage unifié pour Le Panier d'Elif.
//
// - En PRODUCTION (Vercel) : utilise Vercel Blob (persistant).
//   Nécessite un store Blob connecté au projet → variable BLOB_READ_WRITE_TOKEN
//   (auto-injectée par Vercel ; le SDK la lit tout seul).
// - En LOCAL (`next dev`)  : repli sur des fichiers dans .data/ (gitignoré),
//   pour fonctionner sans configuration.

import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')

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

// URL publique de base, dérivée du token (lecture immédiate après écriture).
function publicBase() {
  const t = process.env.BLOB_READ_WRITE_TOKEN || ''
  const m = t.match(/^vercel_blob_rw_([^_]+)_/)
  return m ? `https://${m[1]}.public.blob.vercel-storage.com` : null
}

// Récupère le contenu d'un pathname distant (essaie l'URL directe puis list()).
async function fetchRemote(pathname) {
  const base = publicBase()
  if (base) {
    try {
      const r = await fetch(`${base}/${pathname}`, { cache: 'no-store' })
      if (r.ok) return r
    } catch {}
  }
  try {
    const { list } = await blobApi()
    const { blobs } = await list({ prefix: pathname, limit: 1 })
    const hit = blobs.find(b => b.pathname === pathname)
    if (hit) {
      const r = await fetch(hit.url, { cache: 'no-store' })
      if (r.ok) return r
    }
  } catch {}
  return null
}

async function delRemote(pathname) {
  const { list, del } = await blobApi()
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 })
    const hit = blobs.find(b => b.pathname === pathname)
    if (hit) await del(hit.url)
  } catch {}
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
  const { put } = await blobApi()
  await put(remoteJson(store, key), JSON.stringify(value), {
    access: 'public', addRandomSuffix: false, contentType: 'application/json', allowOverwrite: true,
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
    const { list } = await blobApi()
    const { blobs } = await list({ prefix: `${store}/` })
    const out = []
    for (const b of blobs) {
      if (!b.pathname.endsWith('.json')) continue
      try {
        const r = await fetch(b.url, { cache: 'no-store' })
        if (r.ok) out.push(await r.json())
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
  const { put } = await blobApi()
  await put(remoteBlob(store, key), buffer, {
    access: 'public', addRandomSuffix: false, contentType, allowOverwrite: true,
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
