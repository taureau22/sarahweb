'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

const STATUS_LABEL = {
  pending: 'En attente',
  paid: 'Payée',
  failed: 'Paiement refusé',
  preparing: 'En préparation',
  delivered: 'Livrée',
  cancelled: 'Annulée',
}

const STATUS_MESSAGE = {
  pending: 'Nous avons bien reçu votre commande. Nous la confirmons et vous contactons bientôt.',
  paid: 'Le paiement a été validé. Votre commande est prise en charge.',
  failed: 'Le paiement de votre commande a échoué. Contactez-nous pour assistance.',
  preparing: 'Votre commande est en cours de préparation.',
  delivered: 'Votre commande a été livrée.',
  cancelled: 'Votre commande a été annulée.',
}

export default function SuiviPage() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const tx = params.get('tx') || params.get('orderId') || ''
    if (tx) {
      setOrderId(tx)
      fetchOrder(tx)
    }
  }, [])

  async function fetchOrder(id) {
    const trimmed = String(id || '').trim()
    if (!trimmed) {
      setError('Veuillez saisir votre numéro de commande.')
      setOrder(null)
      return
    }

    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(trimmed)}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Commande introuvable.')
        return
      }
      const data = await res.json()
      setOrder(data.order || null)
    } catch (err) {
      setError('Impossible de récupérer la commande. Vérifiez votre numéro et réessayez.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchOrder(orderId)
  }

  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-bg flex items-center justify-center px-5 py-16">
      <div className="max-w-3xl w-full">
        <div className="bg-surface rounded-3xl border border-border shadow-card p-8 sm:p-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">Suivi de commande</p>
              <h1 className="font-display font-semibold text-ink text-3xl sm:text-4xl">Suivez votre commande</h1>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-[#D2761C] transition-colors"
            >
              Retour à l’accueil <Icon.ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-ink">Numéro de commande</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
                placeholder="ELIF-123ABC"
                className="flex-1 h-12 rounded-2xl bg-bg border border-border px-4 text-sm text-ink focus:outline-none focus:border-terracotta transition-colors"
              />
              <button
                type="submit"
                className="h-12 rounded-2xl bg-terracotta text-white font-medium hover:bg-[#D2761C] transition-colors"
              >
                {loading ? 'Recherche...' : 'Rechercher'}
              </button>
            </div>
            <p className="text-xs text-muted">Saisissez la référence de votre commande pour voir son état actuel.</p>
          </form>

          {error && (
            <div className="mt-6 rounded-2xl border border-terracotta/40 bg-terra-bg p-4 text-sm text-terracotta">
              {error}
            </div>
          )}

          {order && (
            <div className="mt-6 grid gap-6">
              <div className="rounded-3xl border border-border bg-bg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">Référence</p>
                    <p className="mt-2 font-display text-xl text-ink">{order.id}</p>
                  </div>
                  <div className="rounded-3xl px-4 py-3 text-sm font-semibold inline-flex items-center gap-2 border border-border bg-white/90 text-ink">
                    <Icon.Truck className="w-4 h-4" />
                    {STATUS_LABEL[order.status] || order.status}
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-2">
                  {STATUS_MESSAGE[order.status] || 'État de commande disponible.'}
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-bg p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">Montant</p>
                    <p className="mt-2 font-semibold text-ink">{formatPrice(order.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">Date</p>
                    <p className="mt-2 text-ink-2 text-sm">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">Canal</p>
                    <p className="mt-2 text-ink-2 text-sm">{order.channel === 'whatsapp' ? 'WhatsApp' : 'Paiement en ligne'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-bg p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">Contenu de la commande</p>
                  <span className="text-xs text-ink-2">{order.items?.length || 0} articles</span>
                </div>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                      <div>
                        <p className="font-medium text-ink">{item.name}</p>
                        <p className="text-ink-2 text-xs">Quantité : {item.quantity}</p>
                      </div>
                      <p className="font-medium text-ink">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-olive/5 p-6 text-sm text-ink-2">
          <p className="font-semibold text-ink mb-2">Besoin d’aide ?</p>
          <p>
            Si le statut n’est pas encore à jour, attendez quelques minutes puis rechargez. Pour toute question, contactez-nous par WhatsApp ou téléphone.
          </p>
        </div>
      </div>
    </div>
  )
}
