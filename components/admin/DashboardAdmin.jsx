'use client'

import { useState, useEffect, useCallback } from 'react'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

// Statuts considérés comme « honorés » pour le chiffre d'affaires.
const REVENUE_STATUS = ['paid', 'preparing', 'delivered']

export default function DashboardAdmin({ authHeader, onUnauthorized, onGoToOrders }) {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [ro, rp] = await Promise.all([
        fetch('/api/admin/orders', { headers: authHeader() }),
        fetch('/api/admin/products', { headers: authHeader() }),
      ])
      if (ro.status === 401 || rp.status === 401) { onUnauthorized(); return }
      const [dataOrders, dataProducts] = await Promise.all([ro.json(), rp.json()])
      setOrders(dataOrders.orders || [])
      setProducts(dataProducts.products || [])
    } catch {
      /* silencieux : l'admin peut rafraîchir */
    } finally {
      setLoading(false)
    }
  }, [authHeader, onUnauthorized])

  useEffect(() => { load() }, [load])

  const by = (s) => orders.filter(o => o.status === s).length
  const revenue = orders
    .filter(o => REVENUE_STATUS.includes(o.status))
    .reduce((sum, o) => sum + (Number(o.amount) || 0), 0)
  const itemsSold = orders
    .filter(o => o.status !== 'cancelled' && o.status !== 'failed')
    .reduce((sum, o) => sum + (o.items || []).reduce((s, it) => s + (Number(it.quantity) || 0), 0), 0)

  const outOfStock = products.filter(p => {
    if (Array.isArray(p.options) && p.options.length) {
      return p.options.some(o => Number.isFinite(o.stock) && o.stock <= 0)
    }
    return Number.isFinite(p.stock) && p.stock <= 0
  }).length

  const stats = [
    { k: 'ca',        label: 'Chiffre d’affaires', value: formatPrice(revenue), Ico: Icon.CreditCard, accent: 'text-olive',      bg: 'bg-olive/10',      hint: 'Payées + en cours + livrées' },
    { k: 'sold',      label: 'Articles vendus',         value: itemsSold,            Ico: Icon.Package,    accent: 'text-terracotta', bg: 'bg-terra-bg',      hint: 'Hors annulées' },
    { k: 'total',     label: 'Commandes',               value: orders.length,        Ico: Icon.Package,    accent: 'text-ink',        bg: 'bg-ink/5',         hint: 'Toutes' },
    { k: 'paid',      label: 'Payées',                  value: by('paid'),           Ico: Icon.Check,      accent: 'text-olive',      bg: 'bg-olive/10',      hint: 'À préparer' },
    { k: 'pending',   label: 'En attente',              value: by('pending'),        Ico: Icon.RefreshCw,  accent: 'text-gold',       bg: 'bg-gold/15',       hint: 'À confirmer' },
    { k: 'preparing', label: 'En préparation',          value: by('preparing'),      Ico: Icon.ChefHat,    accent: 'text-terracotta', bg: 'bg-terra-bg',      hint: 'En cours' },
    { k: 'delivered', label: 'Livrées',                 value: by('delivered'),      Ico: Icon.Check,      accent: 'text-ink',        bg: 'bg-ink/5',         hint: 'Terminées' },
    { k: 'cancelled', label: 'Annulées',                value: by('cancelled') + by('failed'), Ico: Icon.X, accent: 'text-rose-600',  bg: 'bg-rose-100',      hint: 'Annulées + échouées' },
    { k: 'rupture',   label: 'En rupture',              value: outOfStock,           Ico: Icon.Package,    accent: 'text-rose-600',   bg: 'bg-rose-100',      hint: 'Produits à réapprovisionner' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="font-display font-semibold text-ink text-xl">Tableau de bord</h2>
        <button onClick={load} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-terracotta transition-colors">
          <Icon.RefreshCw className="w-4 h-4" /> Rafraîchir
        </button>
      </div>

      {loading ? (
        <p className="text-muted text-sm py-16 text-center">Chargement…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.map(s => (
              <div key={s.k} className="bg-surface border border-border rounded-3xl p-4">
                <span className={`w-9 h-9 rounded-2xl ${s.bg} ${s.accent} inline-flex items-center justify-center mb-3`}>
                  <s.Ico className="w-5 h-5" />
                </span>
                <p className="font-display font-semibold text-ink text-2xl leading-none tabular-nums">{s.value}</p>
                <p className="text-ink-2 text-sm mt-1.5 font-medium">{s.label}</p>
                <p className="text-muted text-[11px] mt-0.5">{s.hint}</p>
              </div>
            ))}
          </div>

          {(by('paid') > 0 || by('pending') > 0) && (
            <button
              onClick={onGoToOrders}
              className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-terracotta transition-colors"
            >
              <Icon.Package className="w-4 h-4" />
              Traiter les {by('paid') + by('pending')} commande{by('paid') + by('pending') > 1 ? 's' : ''} à gérer
            </button>
          )}
        </>
      )}
    </div>
  )
}
