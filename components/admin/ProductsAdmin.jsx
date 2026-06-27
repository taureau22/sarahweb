'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

const EMPTY = { name: '', shortName: '', price: '', unit: '', category: 'frais', description: '', bestseller: false, stock: '0', options: [] }

// Extrait le nombre de pièces depuis un libellé d'unité (« 10 pièces / paquet » → 10).
const unitToNumber = (u) => {
  const n = parseInt(String(u ?? ''), 10)
  return Number.isFinite(n) && n > 0 ? String(n) : ''
}

export default function ProductsAdmin({ authHeader, onUnauthorized }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(false)
  const [view, setView]         = useState('list') // 'list' | 'form'

  const [form, setForm]         = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview]   = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
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

  const goToList = () => { resetForm(); setView('list') }

  const startEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name || '', shortName: p.shortName || '', price: String(p.price ?? ''),
      unit: unitToNumber(p.unit), category: p.category || 'frais',
      description: p.description || '', bestseller: !!p.bestseller,
      stock: Number.isFinite(p.stock) ? String(p.stock) : '0',
      options: Array.isArray(p.options) ? p.options : [],
    })
    setImageFile(null)
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview(p.image || null)
    setMsg(null)
    setView('form')
  }

  const newProduct = () => {
    resetForm()
    setMsg(null)
    setView('form')
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
        resetForm({ target: e.target })
        setView('list')
        setMsg({ type: 'success', text })
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
    if (!confirm(`Supprimer « ${p.shortName || p.name} » ?\n\nCette action est définitive.`)) return
    setMsg(null)
    setDeletingId(p.id)
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE', headers: authHeader() })
      if (res.status === 401) { onUnauthorized(); return }
      if (res.ok) {
        setMsg({ type: 'success', text: `« ${p.shortName || p.name} » supprimé.` })
        if (editingId === p.id) resetForm()
        load()
      } else {
        const data = await res.json().catch(() => ({}))
        setMsg({ type: 'error', text: data.error || 'Suppression impossible.' })
      }
    } catch {
      setMsg({ type: 'error', text: 'Erreur réseau.' })
    } finally {
      setDeletingId(null)
    }
  }

  const Message = () => msg ? (
    <p className={`mb-4 text-sm flex items-center gap-2 ${msg.type === 'error' ? 'text-terracotta' : 'text-olive'}`}>
      {msg.type === 'error' ? <Icon.X className="w-4 h-4" /> : <Icon.Check className="w-4 h-4" />}
      {msg.text}
    </p>
  ) : null

  /* ---------------- Écran LISTE ---------------- */
  if (view === 'list') {
    return (
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <h2 className="font-display font-semibold text-ink text-xl">
            Produits <span className="text-muted font-sans font-normal text-base">({products.length})</span>
          </h2>
          <button
            type="button"
            onClick={newProduct}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-ink text-white px-4 text-sm font-semibold hover:bg-terracotta transition-colors"
          >
            <Icon.Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>

        <Message />

        {loading ? (
          <p className="text-muted text-sm py-16 text-center">Chargement…</p>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-ink font-medium mb-3">Aucun produit.</p>
            <button onClick={newProduct} className="text-terracotta font-semibold underline">Ajouter le premier produit</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.id} className="rounded-3xl border border-border bg-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="w-full text-left p-3 hover:bg-terra-1/40 transition-colors"
                >
                  <div className="flex gap-3 items-center">
                    {/* Miniature mini */}
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-terra-bg border border-border flex-shrink-0">
                      {p.image ? (
                        <Image src={p.image} alt={p.name} width={44} height={44} className="w-full h-full object-cover" sizes="44px" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted"><Icon.Leaf className="w-5 h-5" /></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-ink truncate text-sm">{p.shortName || p.name}</p>
                        {p.bestseller && <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">Best</span>}
                        {!(p.options?.length) && Number.isFinite(p.stock) && (
                          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${p.stock <= 0 ? 'bg-rose-100 text-rose-600' : p.stock <= 5 ? 'bg-gold/15 text-gold' : 'bg-olive/15 text-olive'}`}>
                            {p.stock <= 0 ? 'Rupture' : `Stock ${p.stock}`}
                          </span>
                        )}
                      </div>
                      <p className="text-ink-2 text-xs mt-1">
                        <span className="font-semibold tabular-nums">{formatPrice(p.price)}</span>
                        {' · '}{p.category === 'surgele' ? 'Surgelé' : 'Frits'}
                      </p>
                      {p.options && p.options.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {p.options.map(o => (
                            <span key={o.id} className="inline-flex items-center gap-1 bg-bg border border-border rounded-full px-2 py-0.5 text-[11px] text-ink-2">
                              <span className="truncate max-w-[8rem]">{o.label}</span>
                              {Number.isFinite(o.stock) && (
                                <span className={`font-semibold ${o.stock <= 0 ? 'text-rose-600' : o.stock <= 5 ? 'text-gold' : 'text-olive'}`}>
                                  {o.stock <= 0 ? 'Rupt.' : o.stock}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                <div className="flex border-t border-border/70 divide-x divide-border/70">
                  <button type="button" onClick={() => startEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 text-sm font-medium text-ink-2 hover:bg-terra-1 hover:text-terracotta transition-colors">
                    <Icon.Pencil className="w-4 h-4" /> Modifier
                  </button>
                  <button type="button" onClick={() => handleDelete(p)} disabled={deletingId === p.id}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 text-sm font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-50 transition-colors">
                    <Icon.Trash2 className="w-4 h-4" /> {deletingId === p.id ? '…' : 'Supprimer'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ---------------- Écran FORMULAIRE ---------------- */
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-5">
        <button type="button" onClick={goToList} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-terracotta transition-colors">
          <Icon.ArrowRight className="w-4 h-4 rotate-180" /> Retour à la liste
        </button>
        <h2 className="font-display font-semibold text-ink text-lg">
          {editingId ? 'Modifier le produit' : 'Ajouter un produit'}
        </h2>
      </div>

      <Message />

      <div className="bg-surface border border-border rounded-4xl p-5 sm:p-6 shadow-soft">
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
            <Input label="Prix (FCFA)" type="number" value={form.price} onChange={(v) => setForm(f => ({ ...f, price: v }))} required placeholder="3500" max={1000000} />
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Input label="Pièces / paquet" type="number" value={form.unit} onChange={(v) => setForm(f => ({ ...f, unit: v }))} placeholder="10" max={99} />
              <span className="block text-[11px] text-muted mt-1">Nombre uniquement (max 99). Affiché « N pièces / paquet ».</span>
            </div>
            <div>
              <Input label="Stock" type="number" value={form.stock} onChange={(v) => setForm(f => ({ ...f, stock: v }))} placeholder="0" max={999} />
              <span className="block text-[11px] text-muted mt-1">
                Défaut 0 · max 999 · 0 = rupture.{form.options?.length > 0 ? ' Pour les variantes, gérez le stock par référence ci-dessous.' : ''}
              </span>
            </div>
          </div>

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
                onClick={() => setForm(f => ({ ...f, options: [...(f.options || []), { id: '', label: '', price: form.price || 0, shortName: '', stock: 0, attrs: { hasCream: true, hasCheese: true } }] }))}
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

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Input label="Prix" type="number" value={option.price} max={1000000} onChange={(v) => setForm(f => {
                    const options = [...(f.options || [])]
                    options[index] = { ...options[index], price: Number(v) }
                    return { ...f, options }
                  })} />
                  <Input label="Stock" type="number" value={Number.isFinite(option.stock) ? option.stock : '0'} placeholder="0" max={999} onChange={(v) => setForm(f => {
                    const options = [...(f.options || [])]
                    options[index] = { ...options[index], stock: v === '' ? '' : v }
                    return { ...f, options }
                  })} />
                </div>

                <div className="flex items-center justify-between gap-3 mt-3">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-ink-2">
                      <input
                        type="checkbox"
                        checked={option.attrs ? option.attrs.hasCream !== false : true}
                        onChange={(e) => setForm(f => {
                          const options = [...(f.options || [])]
                          const opt = { ...options[index] }
                          opt.attrs = { ...(opt.attrs || {}), hasCream: e.target.checked }
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
                          opt.attrs = { ...(opt.attrs || {}), hasCheese: e.target.checked }
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
                    className="h-9 px-3 rounded-xl bg-terracotta/10 text-terracotta text-sm font-semibold hover:bg-terracotta/15"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            {(form.options || []).length > 0 && <p className="text-xs text-muted">La première option sera sélectionnée par défaut en boutique.</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={goToList}
              className="order-2 sm:order-1 h-12 px-5 rounded-3xl border border-border text-ink-2 font-medium hover:border-terracotta transition-colors"
            >
              Annuler
            </button>
            <button
              disabled={submitting}
              className="order-1 sm:order-2 flex-1 h-12 rounded-3xl bg-gradient-to-r from-terracotta to-terra-2 text-white font-semibold shadow-terra hover:from-[#d8701d] hover:to-[#f1a35f] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              {submitting ? 'Enregistrement…' : <><Icon.Check className="w-5 h-5" /> {editingId ? 'Enregistrer' : 'Ajouter le produit'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', required, placeholder, max }) {
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
        max={type === 'number' ? max : undefined}
        className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-bg border border-border text-ink text-[15px] focus:outline-none focus:border-terracotta transition-colors"
      />
    </div>
  )
}
