'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

// Composant interne qui lit useSearchParams (doit être dans <Suspense>)
function MerciContent() {
  const params = useSearchParams()
  const { clearCart } = useCart()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    clearCart()
    try {
      const saved = sessionStorage.getItem('elif_last_order')
      if (saved) setOrder(JSON.parse(saved))
    } catch {}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const txId = params.get('tx') || order?.transactionId

  return (
    <div className="pt-16 min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full">

        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-card-hover p-8 sm:p-12 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse-slow">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary mb-3">
            Commande confirmée !
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Merci pour votre commande. Nous la préparons avec amour et vous contacterons très prochainement pour la livraison.
          </p>

          {order && (
            <div className="bg-cream rounded-2xl p-5 text-left mb-8">
              <h3 className="font-semibold text-secondary text-sm uppercase tracking-wide mb-4">📦 Votre commande</h3>
              <div className="space-y-2 mb-4">
                {order.items?.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.shortName || item.name} × {item.quantity}</span>
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-3">
                <span>Total payé</span>
                <span className="text-primary font-playfair text-lg">{formatPrice(order.total)}</span>
              </div>
            </div>
          )}

          {txId && (
            <div className="text-xs text-gray-400 mb-8">
              Référence : <code className="bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">{txId}</code>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link href="/boutique" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg text-center">
              🛒 Passer une nouvelle commande
            </Link>
            <Link href="/" className="w-full border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-2xl hover:border-primary hover:text-primary transition-all text-center">
              🏠 Retour à l'accueil
            </Link>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
          <p className="font-semibold mb-1">📞 Et maintenant ?</p>
          <p>Notre équipe vous contactera dans les 30 minutes pour confirmer votre livraison. Gardez votre téléphone à portée !</p>
        </div>
      </div>
    </div>
  )
}

// Skeleton affiché pendant le chargement de Suspense
function MerciSkeleton() {
  return (
    <div className="pt-16 min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 animate-pulse" />
        <div className="h-8 bg-gray-100 rounded-xl w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded w-48 mx-auto animate-pulse" />
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
