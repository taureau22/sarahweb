// Stockage unifié pour Le Panier d'Elif.
//
// - En PRODUCTION (Netlify) : utilise Netlify Blobs (persistant, aucun compte externe).
// - En LOCAL (`next dev`)   : repli sur des fichiers dans .data/ (gitignoré),
//   pour que tout fonctionne sans dépendance ni configuration.
//
// Le module @netlify/blobs n'est importé (dynamiquement) que hors développement,
// donc `npm run dev` marche même si le package n'est pas installé localement.

import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')

// En dev → fichiers locaux. Sinon (Netlify) → Blobs.
const useFiles = process.env.NODE_ENV === 'development'

let _blobs = null
async function netlifyStore(name) {
  if (!_blobs) _blobs = await import('@netlify/blobs')
  return _blobs.getStore({ name, consistency: 'strong' })
}

function safeKey(key) {
  return String(key).replace(/[^A-Za-z0-9._-]/g, '_')
}
function jsonPath(store, key) {
  return path.join(DATA_DIR, store, `${safeKey(key)}.json`)
}
function blobPath(store, key) {
  return path.join(DATA_DIR, store, safeKey(key))
}

/* ----------------------------- JSON ----------------------------- */

export async function getJSON(store, key, fallback = null) {
  try {
    if (useFiles) {
      const raw = await fs.readFile(jsonPath(store, key), 'utf-8')
      return JSON.parse(raw)
    }
    const s = await netlifyStore(store)
    const val = await s.get(key, { type: 'json' })
    return val ?? fallback
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
  const s = await netlifyStore(store)
  await s.setJSON(key, value)
}

export async function deleteJSON(store, key) {
  if (useFiles) {
    try { await fs.unlink(jsonPath(store, key)) } catch {}
    return
  }
  const s = await netlifyStore(store)
  await s.delete(key)
}

/** Liste toutes les valeurs JSON d'un store (une entrée par clé). */
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
    const s = await netlifyStore(store)
    const { blobs } = await s.list()
    const out = []
    for (const b of blobs) {
      const v = await s.get(b.key, { type: 'json' })
      if (v != null) out.push(v)
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
  const s = await netlifyStore(store)
  await s.set(key, buffer, { metadata: { contentType } })
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
    const s = await netlifyStore(store)
    const res = await s.getWithMetadata(key, { type: 'arrayBuffer' })
    if (!res) return null
    return {
      buffer: Buffer.from(res.data),
      contentType: res.metadata?.contentType || 'application/octet-stream',
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
  const s = await netlifyStore(store)
  await s.delete(key)
}
