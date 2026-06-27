'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

const EMPTY = { name: '', shortName: '', price: '', unit: '', category: 'frais', description: '', bestseller: false, options: [] }

export default function ProductsAdmin({ authHeader, onUnauthorized }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(false)

  const [form, setForm]         = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview]   = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg]           = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products', { headers: authHeader() })
      if (res.status === 401) { onUnauthorized(); return }
      const data = await res.json()
      setProducts(data.products || [])
    } catch {
      setMsg({ type: 'error', text: 'Erreur de chargement.' })
    } finally {
      setLoading(false)
    }
  }, [authHeader, onUnauthorized])

  useEffect(() => { load() }, [load])

  const onImage = (e) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const resetForm = (e) => {
    setForm(EMPTY)
    setEditingId(null)
    setImageFile(null)
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview(null)
    if (e?.target?.reset) e.target.reset()
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name || '', shortName: p.shortName || '', price: String(p.price ?? ''),
      unit: p.unit || '', category: p.category || 'frais',
      description: p.description || '', bestseller: !!p.bestseller,
      options: Array.isArray(p.options) ? p.options : [],
    })
    setImageFile(null)
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview(p.image || null)
    setMsg(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg(null)
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'options') return
        fd.append(k, String(v))
      })
      fd.append('options', JSON.stringify(form.options || []))
      if (imageFile) fd.append('image', imageFile)

      const url    = editingId ? `/api/admin/products/${editingId}` : '/api/admin/products'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: authHeader(), body: fd })
      if (res.status === 401) { onUnauthorized(); return }
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        let text = editingId ? `« ${data.product.shortName} » modifié.` : `« ${data.product.shortName} » ajouté.`
        if (data.warning) text += ` Attention : ${data.warning}`
        setMsg({ type: 'success', text })
        const formEl = e.target
        resetForm({ target: formEl })
        load()
      } else {
        setMsg({ type: 'error', text: data.error || 'Échec de l’opération.' })
      }
    } catch {
      setMsg({ type: 'error', text: 'Erreur réseau.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (p) => {
    if (!confirm(`Supprimer « ${p.shortName || p.name} » ?`)) return
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE', headers: authHeader() })
      if (res.status === 401) { onUnauthorized(); return }
      if (res.ok) {
        setMsg({ type: 'success', text: 'Produit supprimé.' })
        if (editingId === p.id) resetForm()
        load()
      } else {
        const data = await res.json().catch(() => ({}))
        setMsg({ type: 'error', text: data.error || 'Suppression impossible.' })
      }
    } catch {
      setMsg({ type: 'error', text: 'Erreur réseau.' })
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr] items-start">
      {/* Liste produits */}
      <aside className="space-y-6">
        <div className="bg-surface border border-border rounded-4xl p-6 shadow-soft lg:sticky lg:top-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Produits existants</p>
              <h2 className="font-display font-semibold text-ink text-xl">Catalogue</h2>
              <p className="text-sm text-muted mt-1">{products.length} produit{products.length > 1 ? 's' : ''} disponibles</p>
            </div>
            <button
              type="button"
              onClick={() => resetForm()}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-4 text-sm text-ink-2 hover:border-terracotta hover:text-terracotta transition-colors"
            >
              + Nouveau produit
            </button>
          </div>

          <div className="mt-6 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
            {loading ? (
              <p className="text-muted text-sm py-8 text-center">Chargement…</p>
            ) : products.length === 0 ? (
              <p className="text-muted text-sm py-8 text-center">Aucun produit. Ajoutez-en un.</p>
            ) : (
              products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => startEdit(p)}
                  className={`w-full text-left rounded-3xl border p-4 transition-colors hover:border-terracotta ${editingId === p.id ? 'border-terracotta bg-terra-1' : 'border-border bg-surface'}`}
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-terra-bg border border-border flex-shrink-0">
                      {p.image ? (
                        <Image src={p.image} alt={p.name} width={64} height={64} className="w-full h-full object-cover" sizes="64px" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted"><Icon.Leaf className="w-6 h-6" /></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-ink truncate">{p.shortName || p.name}</p>
                        {p.bestseller && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Best-seller</span>}
                      </div>
                      <p className="text-muted text-xs truncate mt-1">{p.name}</p>
                      <p className="text-ink-2 text-xs mt-2">
                        <span className="font-semibold tabular-nums">{formatPrice(p.price)}</span>
                        {' · '}{p.category === 'surgele' ? 'Surgelé' : 'Frits'}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {!loading && products.length > 0 && (
            <div className="mt-5 flex items-center justify-between text-sm text-muted">
              <span>Cliquer sur un produit pour éditer.</span>
              <button type="button" onClick={load} className="text-terracotta underline hover:text-[#c55f0c]">Rafraîchir</button>
            </div>
          )}
        </div>
      </aside>

      {/* Formulaire ajout / édition */}
      <section className="space-y-6">
        <div className="bg-surface border border-border rounded-4xl p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Fiche produit</p>
              <h2 className="font-display font-semibold text-ink text-xl">
                {editingId ? 'Modifier le produit' : 'Ajouter un produit'}
              </h2>
            </div>
            {editingId && (
              <button type="button" onClick={() => resetForm()} className="text-sm text-muted hover:text-terracotta transition-colors">
                Annuler la modification
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Photo</span>
              <div className="mt-2 relative aspect-[5/4] rounded-3xl overflow-hidden border-2 border-dashed border-border hover:border-terracotta transition-colors bg-bg flex items-center justify-center">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted text-sm flex flex-col items-center gap-2">
                    <Icon.Plus className="w-7 h-7" />
                    Choisir une image
                    <span className="text-[11px]">JPG · PNG · WEBP — max 5 Mo</span>
                  </span>
                )}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onImage} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              {editingId && <span className="block text-[11px] text-muted mt-1.5">Laissez vide pour garder la photo actuelle.</span>}
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input label="Nom complet" value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))} required placeholder="Pastel au poulet, crème et fromage" />
              <Input label="Nom court" value={form.shortName} onChange={(v) => setForm(f => ({ ...f, shortName: v }))} placeholder="Pastel Poulet" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input label="Prix (FCFA)" type="number" value={form.price} onChange={(v) => setForm(f => ({ ...f, price: v }))} required placeholder="3500" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">Catégorie</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                  className="mt-1.5 w-full h-12 px-3 rounded-2xl bg-bg border border-border text-ink focus:outline-none focus:border-terracotta"
                >
                  <option value="frais">Frits</option>
                  <option value="surgele">Surgelés</option>
                </select>
              </div>
            </div>

            <Input label="Unité" value={form.unit} onChange={(v) => setForm(f => ({ ...f, unit: v }))} placeholder="10 pièces / paquet" />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                placeholder="Courte description appétissante…"
                className="mt-1.5 w-full px-4 py-3 rounded-2xl bg-bg border border-border text-ink text-[15px] focus:outline-none focus:border-terracotta resize-none"
              />
            </div>

            <label className="flex items-center gap-2.5 text-sm text-ink-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.bestseller}
                onChange={(e) => setForm(f => ({ ...f, bestseller: e.target.checked }))}
                className="w-4 h-4 accent-terracotta"
              />
              Mettre en avant (Best-seller)
            </label>

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Options de saveurs</span>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, options: [...(f.options || []), { id: '', label: '', price: form.price || 0, shortName: '', attrs: { hasCream: true, hasCheese: true } }] }))}
                  className="text-sm text-ink underline-offset-4 hover:text-terracotta"
                >
                  + Ajouter une option
                </button>
              </div>
              {(form.options || []).map((option, index) => (
                <div key={index} className="rounded-3xl border border-border bg-bg p-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.5fr_1.2fr]">
                    <Input label="Label" value={option.label} onChange={(v) => setForm(f => {
                      const options = [...(f.options || [])]
                      options[index] = { ...options[index], label: v }
                      return { ...f, options }
                    })} placeholder="Poulet crème fromage" />
                    <Input label="Nom court" value={option.shortName} onChange={(v) => setForm(f => {
                      const options = [...(f.options || [])]
                      options[index] = { ...options[index], shortName: v }
                      return { ...f, options }
                    })} placeholder="Pastel Poulet" />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] items-end mt-3">
                      <Input label="Prix" type="number" value={option.price} onChange={(v) => setForm(f => {
                        const options = [...(f.options || [])]
                        options[index] = { ...options[index], price: Number(v) }
                        return { ...f, options }
                      })} />

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex gap-3">
                          <label className="flex items-center gap-2 text-sm text-ink-2">
                            <input
                              type="checkbox"
                              checked={option.attrs ? option.attrs.hasCream !== false : true}
                              onChange={(e) => setForm(f => {
                                const options = [...(f.options || [])]
                                const opt = { ...options[index] }
                                const attrs = { ...(opt.attrs || {}) }
                                attrs.hasCream = e.target.checked
                                opt.attrs = attrs
                                options[index] = opt
                                return { ...f, options }
                              })}
                              className="w-4 h-4 accent-terracotta"
                            />
                            Crème
                          </label>
                          <label className="flex items-center gap-2 text-sm text-ink-2">
                            <input
                              type="checkbox"
                              checked={option.attrs ? option.attrs.hasCheese !== false : true}
                              onChange={(e) => setForm(f => {
                                const options = [...(f.options || [])]
                                const opt = { ...options[index] }
                                const attrs = { ...(opt.attrs || {}) }
                                attrs.hasCheese = e.target.checked
                                opt.attrs = attrs
                                options[index] = opt
                                return { ...f, options }
                              })}
                              className="w-4 h-4 accent-terracotta"
                            />
                            Fromage
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, options: (f.options || []).filter((_, i) => i !== index) }))}
                          className="h-11 rounded-2xl bg-terracotta/10 text-terracotta text-sm font-semibold hover:bg-terracotta/15"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                </div>
              ))}
              <p className="text-xs text-muted">La première option sera sélectionnée par défaut en boutique.</p>
            </div>

            {msg && (
              <p className={`text-sm flex items-center gap-2 ${msg.type === 'error' ? 'text-terracotta' : 'text-olive'}`}>
                {msg.type === 'error' ? <Icon.X className="w-4 h-4" /> : <Icon.Check className="w-4 h-4" />}
                {msg.text}
              </p>
            )}

            <button
              disabled={submitting}
              className="mt-2 w-full h-12 rounded-3xl bg-gradient-to-r from-terracotta to-terra-2 text-white font-semibold shadow-terra hover:from-[#d8701d] hover:to-[#f1a35f] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              {submitting ? 'Enregistrement…' : <><Icon.Plus className="w-5 h-5" /> {editingId ? 'Enregistrer les modifications' : 'Ajouter le produit'}</>}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}{required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        min={type === 'number' ? '0' : undefined}
        className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-bg border border-border text-ink text-[15px] focus:outline-none focus:border-terracotta transition-colors"
      />
    </div>
  )
}
