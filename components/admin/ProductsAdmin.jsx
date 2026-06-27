'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

const EMPTY = { name: '', shortName: '', price: '', unit: '', category: 'frais', description: '', bestseller: false }

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
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      {/* Formulaire ajout / édition */}
      <form onSubmit={handleSubmit} className="lg:col-span-2 bg-surface border border-border rounded-4xl p-6 shadow-soft lg:sticky lg:top-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-ink text-xl">
            {editingId ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>
          {editingId && (
            <button type="button" onClick={() => resetForm()} className="text-xs text-muted hover:text-terracotta">
              Annuler
            </button>
          )}
        </div>

        {/* Upload image */}
        <label className="block mb-4 cursor-pointer">
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

        <div className="space-y-3">
          <Input label="Nom complet" value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))} required placeholder="Pastel au poulet, crème et fromage" />
          <Input label="Nom court" value={form.shortName} onChange={(v) => setForm(f => ({ ...f, shortName: v }))} placeholder="Pastel Poulet" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Prix (FCFA)" type="number" value={form.price} onChange={(v) => setForm(f => ({ ...f, price: v }))} required placeholder="3500" />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                className="mt-1.5 w-full h-12 px-3 rounded-2xl bg-bg border border-border text-ink focus:outline-none focus:border-terracotta"
              >
                <option value="frais">Frais</option>
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
              rows={3}
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
        </div>

        {msg && (
          <p className={`mt-4 text-sm flex items-center gap-2 ${msg.type === 'error' ? 'text-terracotta' : 'text-olive'}`}>
            {msg.type === 'error' ? <Icon.X className="w-4 h-4" /> : <Icon.Check className="w-4 h-4" />}
            {msg.text}
          </p>
        )}

        <button
          disabled={submitting}
          className="mt-5 w-full h-12 rounded-3xl bg-gradient-to-r from-terracotta to-terra-2 text-white font-semibold shadow-terra hover:from-[#d8701d] hover:to-[#f1a35f] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          {submitting ? 'Enregistrement…' : <><Icon.Plus className="w-5 h-5" /> {editingId ? 'Enregistrer les modifications' : 'Ajouter le produit'}</>}
        </button>
      </form>

      {/* Liste produits */}
      <section className="lg:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-ink text-xl">
            Produits <span className="text-muted font-sans font-normal text-base">({products.length})</span>
          </h2>
          <button onClick={load} className="text-sm text-muted hover:text-terracotta transition-colors">Rafraîchir</button>
        </div>

        {loading ? (
          <p className="text-muted text-sm py-12 text-center">Chargement…</p>
        ) : products.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">Aucun produit. Ajoutez-en un à gauche.</p>
        ) : (
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className={`bg-surface border rounded-3xl p-3 flex items-center gap-4 transition-colors ${editingId === p.id ? 'border-terracotta' : 'border-border'}`}>
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-terra-bg border border-border shrink-0">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} width={64} height={64} className="w-full h-full object-cover" sizes="64px" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted"><Icon.Leaf className="w-6 h-6" /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink text-sm truncate">{p.shortName || p.name}</p>
                    {p.bestseller && <Icon.StarFilled className="w-3.5 h-3.5 text-gold shrink-0" />}
                  </div>
                  <p className="text-muted text-xs truncate">{p.name}</p>
                  <p className="text-ink-2 text-xs mt-0.5">
                    <span className="font-semibold tabular-nums">{formatPrice(p.price)}</span>
                    {' · '}{p.category === 'surgele' ? 'Surgelé' : 'Frais'}
                  </p>
                </div>
                <button
                  onClick={() => startEdit(p)}
                  aria-label={`Modifier ${p.name}`}
                  className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-bg transition-colors"
                >
                  <Icon.Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  aria-label={`Supprimer ${p.name}`}
                  className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full text-muted hover:text-terracotta hover:bg-terra-bg transition-colors"
                >
                  <Icon.Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
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
