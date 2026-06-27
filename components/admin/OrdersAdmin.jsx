'use client'

import { useState, useEffect, useCallback } from 'react'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

const STATUS = {
  pending:   { label: 'En attente',     cls: 'bg-gold/15 text-gold' },
  paid:      { label: 'Payée',          cls: 'bg-olive/15 text-olive' },
  failed:    { label: 'Échouée',        cls: 'bg-terracotta/15 text-terracotta' },
  preparing: { label: 'En préparation', cls: 'bg-terra-2/20 text-terracotta' },
  delivered: { label: 'Livrée',         cls: 'bg-ink/10 text-ink' },
  cancelled: { label: 'Annulée',        cls: 'bg-muted/15 text-muted' },
}

const FILTERS = [
  { id: 'all',       label: 'Toutes' },
  { id: 'paid',      label: 'Payées' },
  { id: 'pending',   label: 'En attente' },
  { id: 'preparing', label: 'En préparation' },
  { id: 'delivered', label: 'Livrées' },
]

// Actions de statut proposées selon l'état courant.
const NEXT_ACTIONS = {
  pending:   ['paid', 'preparing', 'cancelled'],
  paid:      ['preparing', 'delivered', 'cancelled'],
  preparing: ['delivered', 'cancelled'],
  delivered: [],
  failed:    ['paid', 'cancelled'],
  cancelled: [],
}

function waPhone(tel) {
  let d = String(tel || '').replace(/\D/g, '')
  if (!d) return ''
  if (d.startsWith('225')) return d
  if (d.length === 10) return `225${d}`
  return d
}

function formatDate(iso) {
  if (!iso) return ''
  try { return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) }
  catch { return iso }
}

export default function OrdersAdmin({ authHeader, onUnauthorized }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [busy, setBusy] = useState(null)
  const [msg, setMsg] = useState(null)
  const [clearOpen, setClearOpen] = useState(false)
  const [clearPw, setClearPw] = useState('')
  const [clearing, setClearing] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders', { headers: authHeader() })
      if (res.status === 401) { onUnauthorized(); return }
      const data = await res.json()
      setOrders(data.orders || [])
    } catch {
      setMsg({ type: 'error', text: 'Erreur de chargement des commandes.' })
    } finally {
      setLoading(false)
    }
  }, [authHeader, onUnauthorized])

  useEffect(() => { load() }, [load])

  const setStatus = async (o, status) => {
    setBusy(o.id); setMsg(null)
    try {
      const res = await fetch(`/api/admin/orders/${o.id}`, {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.status === 401) { onUnauthorized(); return }
      if (res.ok) load()
      else setMsg({ type: 'error', text: 'Changement de statut impossible.' })
    } finally { setBusy(null) }
  }

  const verify = async (o) => {
    setBusy(o.id); setMsg(null)
    try {
      const res = await fetch(`/api/admin/orders/${o.id}`, { method: 'POST', headers: authHeader() })
      if (res.status === 401) { onUnauthorized(); return }
      const d = await res.json().catch(() => ({}))
      if (res.ok) {
        setMsg({ type: 'success', text: `Statut CinetPay : ${d.order?.payment?.cinetpayStatus || 'inconnu'}` })
        load()
      } else {
        setMsg({ type: 'error', text: d.error || 'Vérification impossible (à tester en production).' })
      }
    } finally { setBusy(null) }
  }

  const whatsappClient = (o) => {
    const phone = waPhone(o.customer?.telephone)
    if (!phone) return
    const text = `Bonjour ${o.customer?.prenom || ''}, c'est Le Panier d'Elif au sujet de votre commande ${o.id}.`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const clearAll = async () => {
    setClearing(true); setMsg(null)
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: clearPw }),
      })
      if (res.status === 401) { onUnauthorized(); return }
      const d = await res.json().catch(() => ({}))
      if (res.ok) {
        setMsg({ type: 'success', text: `${d.deleted} commande${d.deleted > 1 ? 's' : ''} supprimée${d.deleted > 1 ? 's' : ''}.` })
        setClearOpen(false); setClearPw('')
        load()
      } else {
        setMsg({ type: 'error', text: d.error || 'Suppression impossible.' })
      }
    } catch {
      setMsg({ type: 'error', text: 'Erreur réseau.' })
    } finally { setClearing(false) }
  }

  const copyAddress = (o) => {
    const txt = [`${o.customer?.prenom || ''} ${o.customer?.nom || ''}`.trim(), o.customer?.telephone, o.customer?.adresse, o.customer?.quartier]
      .filter(Boolean).join(' · ')
    navigator.clipboard?.writeText(txt)
    setMsg({ type: 'success', text: 'Adresse copiée.' })
  }

  const counts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc }, {})
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div>
      {/* En-tête + stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="font-display font-semibold text-ink text-xl">
          Commandes <span className="text-muted font-sans font-normal text-base">({orders.length})</span>
          {counts.paid > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-olive bg-olive/12 px-2 py-0.5 rounded-full align-middle">
              {counts.paid} payée{counts.paid > 1 ? 's' : ''} à traiter
            </span>
          )}
        </h2>
        <div className="flex items-center gap-3">
          <button onClick={load} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-terracotta transition-colors">
            <Icon.RefreshCw className="w-4 h-4" /> Rafraîchir
          </button>
          {orders.length > 0 && (
            <button onClick={() => { setClearOpen(v => !v); setClearPw(''); }} className="inline-flex items-center gap-1.5 text-sm text-rose-600 hover:text-rose-700 transition-colors">
              <Icon.Trash2 className="w-4 h-4" /> Vider
            </button>
          )}
        </div>
      </div>

      {/* Confirmation compacte « vider toutes les commandes » */}
      {clearOpen && (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-semibold text-rose-700 mb-1">Vider toutes les commandes ?</p>
          <p className="text-xs text-rose-700/80 mb-3">Action définitive sur {orders.length} commande{orders.length > 1 ? 's' : ''}. Confirmez avec votre mot de passe admin.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={clearPw}
              onChange={(e) => setClearPw(e.target.value)}
              placeholder="Mot de passe admin"
              className="flex-1 h-11 px-3 rounded-xl bg-surface border border-rose-200 text-ink text-sm focus:outline-none focus:border-rose-400"
            />
            <div className="flex gap-2">
              <button onClick={clearAll} disabled={!clearPw || clearing}
                className="h-11 px-4 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 disabled:opacity-50 transition-colors">
                {clearing ? 'Suppression…' : 'Tout supprimer'}
              </button>
              <button onClick={() => { setClearOpen(false); setClearPw(''); }}
                className="h-11 px-4 rounded-xl border border-border text-ink-2 text-sm hover:border-terracotta transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-5">
        {FILTERS.map(f => {
          const n = f.id === 'all' ? orders.length : (counts[f.id] || 0)
          const active = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                active ? 'bg-ink text-white' : 'bg-surface text-ink-2 border border-border hover:border-terracotta'
              }`}
            >
              {f.label}
              <span className={`tabular-nums text-xs ${active ? 'text-white/70' : 'text-muted'}`}>{n}</span>
            </button>
          )
        })}
      </div>

      {msg && (
        <p className={`mb-4 text-sm flex items-center gap-2 ${msg.type === 'error' ? 'text-terracotta' : 'text-olive'}`}>
          {msg.type === 'error' ? <Icon.X className="w-4 h-4" /> : <Icon.Check className="w-4 h-4" />}
          {msg.text}
        </p>
      )}

      {loading ? (
        <p className="text-muted text-sm py-16 text-center">Chargement…</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 mx-auto rounded-full bg-terra-bg text-terracotta flex items-center justify-center mb-3">
            <Icon.Package className="w-7 h-7" />
          </div>
          <p className="text-ink font-medium">Aucune commande {filter !== 'all' ? 'dans ce filtre' : 'pour le moment'}.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(o => {
            const st = STATUS[o.status] || STATUS.pending
            const isBusy = busy === o.id
            return (
              <article key={o.id} className="bg-surface border border-border rounded-3xl p-5">
                {/* Ligne haute */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>{st.label}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        {o.channel === 'whatsapp' ? <Icon.WhatsApp className="w-3.5 h-3.5" /> : <Icon.CreditCard className="w-3.5 h-3.5" />}
                        {o.channel === 'whatsapp' ? 'WhatsApp' : 'CinetPay'}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1.5">
                      <code className="font-mono text-ink-2">{o.id}</code> · {formatDate(o.createdAt)}
                    </p>
                  </div>
                  <span className="font-display font-semibold text-ink text-xl tabular-nums">{formatPrice(o.amount)}</span>
                </div>

                {/* Client */}
                <div className="bg-bg rounded-2xl border border-border p-3.5 mb-3 text-sm">
                  <p className="font-medium text-ink">{o.customer?.prenom} {o.customer?.nom}</p>
                  <p className="text-ink-2 mt-0.5 flex items-center gap-1.5"><Icon.Phone className="w-3.5 h-3.5 text-muted" /> {o.customer?.telephone}</p>
                  <p className="text-ink-2 mt-0.5 flex items-start gap-1.5">
                    <Icon.MapPin className="w-3.5 h-3.5 text-muted mt-0.5 shrink-0" />
                    <span>{o.customer?.adresse}{o.customer?.quartier ? `, ${o.customer.quartier}` : ''}</span>
                  </p>
                  {o.customer?.note && <p className="text-muted text-xs mt-1.5 italic">« {o.customer.note} »</p>}
                </div>

                {/* Articles */}
                <ul className="space-y-1 mb-3 text-sm">
                  {o.items?.map((it, i) => (
                    <li key={i} className="flex justify-between gap-3">
                      <span className="text-ink-2 truncate">{it.name} × {it.quantity}</span>
                      <span className="tabular-nums text-ink shrink-0">{formatPrice((it.price || 0) * (it.quantity || 0))}</span>
                    </li>
                  ))}
                </ul>

                {/* Paiement (si vérifié) */}
                {o.payment?.cinetpayStatus && (
                  <p className="text-xs text-muted mb-3">
                    CinetPay : <span className="text-ink-2 font-medium">{o.payment.cinetpayStatus}</span>
                    {o.payment.method ? ` · ${o.payment.method}` : ''}
                  </p>
                )}

                {/* Actions — compactes (icônes sur mobile) + menu déroulant de statut */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {o.channel === 'cinetpay' && (
                    <button onClick={() => verify(o)} disabled={isBusy} title="Vérifier le paiement"
                      className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-bg border border-border text-ink-2 text-sm hover:border-terracotta disabled:opacity-50 transition-colors">
                      <Icon.ShieldCheck className="w-4 h-4" /> <span className="hidden xs:inline">Vérifier</span>
                    </button>
                  )}
                  <button onClick={() => whatsappClient(o)} title="Contacter le client"
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-bg border border-border text-ink-2 text-sm hover:border-whatsapp hover:text-whatsapp transition-colors">
                    <Icon.WhatsApp className="w-4 h-4" /> <span className="hidden xs:inline">Client</span>
                  </button>
                  <button onClick={() => copyAddress(o)} title="Copier l'adresse"
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-bg border border-border text-ink-2 text-sm hover:border-terracotta transition-colors">
                    <Icon.Copy className="w-4 h-4" /> <span className="hidden xs:inline">Adresse</span>
                  </button>

                  {(NEXT_ACTIONS[o.status] || []).length > 0 && (
                    <select
                      value=""
                      disabled={isBusy}
                      onChange={(e) => { if (e.target.value) setStatus(o, e.target.value) }}
                      className="ml-auto h-9 pl-3 pr-2 rounded-full bg-ink text-white text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50 cursor-pointer"
                    >
                      <option value="">Changer le statut…</option>
                      {(NEXT_ACTIONS[o.status] || []).map(s => (
                        <option key={s} value={s} className="bg-surface text-ink">→ {STATUS[s].label}</option>
                      ))}
                    </select>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
