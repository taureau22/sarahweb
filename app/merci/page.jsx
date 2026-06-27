'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

function MerciContent() {
  const params = useSearchParams()
  const { clearCart } = useCart()
  const [order, setOrder] = useState(null)
  const txParam = params.get('tx')

  useEffect(() => {
    clearCart()
    // Affichage immédiat depuis la session (récap local)
    let sess = null
    try {
      const saved = sessionStorage.getItem('elif_last_order')
      if (saved) { sess = JSON.parse(saved); setOrder(sess) }
    } catch {}
    // Puis statut réel depuis le serveur (paiement confirmé via webhook)
    const id = txParam || sess?.transactionId
    if (id) {
      fetch(`/api/orders/${id}`)
        .then(r => (r.ok ? r.json() : null))
        .then(d => {
          if (d?.order) {
            setOrder(o => ({
              ...(o || {}),
              transactionId: d.order.id,
              items: d.order.items?.length ? d.order.items : o?.items,
              total: d.order.amount ?? o?.total,
              status: d.order.status,
            }))
          }
        })
        .catch(() => {})
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const txId = txParam || order?.transactionId
  const paid = order?.status === 'paid'

  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-bg flex items-center justify-center px-5 py-16">
      <div className="max-w-lg w-full">

        <div className="bg-surface rounded-3xl border border-border shadow-card p-8 sm:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-olive/10 text-olive flex items-center justify-center">
            <Icon.Check className="w-10 h-10" strokeWidth={2} />
          </div>

          <h1 className="font-display font-semibold text-ink text-4xl mb-3">
            Commande <span className="italic text-terracotta">{paid ? 'confirmée' : 'reçue'}</span>
          </h1>
          <p className="text-ink-2 text-[15px] mb-8 leading-relaxed">
            Merci pour votre confiance.{' '}
            {paid
              ? 'Votre paiement est confirmé. Nous vous contactons pour organiser la livraison.'
              : 'Nous vous contactons pour confirmer votre commande et organiser la livraison.'}
          </p>

          {order && (
            <div className="bg-bg rounded-2xl border border-border p-5 text-left mb-6">
              <h2 className="text-xs uppercase tracking-wider text-muted font-semibold mb-4">
                Votre commande
              </h2>
              <div className="space-y-2 mb-4">
                {order.items?.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-ink-2">
                      {item.shortName || item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-ink tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-baseline border-t border-border pt-3">
                <span className="text-ink-2 font-medium">Total payé</span>
                <span className="font-display font-semibold text-terracotta text-2xl tabular-nums">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          )}

          {txId && (
            <p className="text-xs text-muted mb-6">
              Référence :{' '}
              <code className="bg-bg border border-border px-2 py-1 rounded-lg font-mono text-ink-2">
                {txId}
              </code>
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Link
              href="/boutique"
              className="w-full h-13 py-4 rounded-full bg-terracotta text-white font-medium inline-flex items-center justify-center gap-2 hover:bg-[#D2761C] transition-colors"
            >
              Nouvelle commande <Icon.ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full h-12 rounded-full border border-border text-ink font-medium inline-flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>

        <div className="mt-5 bg-terra-bg border border-terracotta/20 rounded-2xl p-5 flex items-start gap-3">
          <Icon.Phone className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink text-sm mb-1">Et maintenant ?</p>
            <p className="text-ink-2 text-sm leading-relaxed">
              Notre équipe vous contactera pour confirmer votre commande et organiser la livraison.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MerciSkeleton() {
  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-bg flex items-center justify-center" aria-busy="true">
      <div className="text-center">
        <div className="w-20 h-20 bg-border rounded-full mx-auto mb-6 animate-pulse" />
        <div className="h-8 bg-border rounded-xl w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-border rounded w-48 mx-auto animate-pulse" />
      </div>
    </div>
  )
}

export default function MerciPage() {
  return (
    <Suspense fallback={<MerciSkeleton />}>
      <MerciContent />
    </Suspense>
  )
}
