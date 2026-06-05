'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

/* Confetti items — hardcoded positions to avoid SSR mismatch */
const CONFETTI = [
  { color:'#E8821A', size:10, left:'8%',  delay:'0s',   dur:'2.8s' },
  { color:'#F5C842', size:7,  left:'15%', delay:'.3s',  dur:'2.4s' },
  { color:'#FFF8EE', size:9,  left:'23%', delay:'.1s',  dur:'3.1s' },
  { color:'#C4681A', size:6,  left:'32%', delay:'.5s',  dur:'2.6s' },
  { color:'#E8821A', size:12, left:'41%', delay:'.2s',  dur:'2.9s' },
  { color:'#F5C842', size:8,  left:'50%', delay:'.7s',  dur:'2.5s' },
  { color:'#1A0A00', size:6,  left:'59%', delay:'.15s', dur:'3.0s' },
  { color:'#E8821A', size:10, left:'68%', delay:'.4s',  dur:'2.7s' },
  { color:'#F5C842', size:7,  left:'77%', delay:'.25s', dur:'2.3s' },
  { color:'#C4681A', size:9,  left:'86%', delay:'.6s',  dur:'3.2s' },
  { color:'#E8821A', size:6,  left:'93%', delay:'.05s', dur:'2.6s' },
]

function MerciContent() {
  const params = useSearchParams()
  const { clearCart } = useCart()
  const [order, setOrder] = useState(null)
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    clearCart()
    try {
      const saved = sessionStorage.getItem('elif_last_order')
      if (saved) setOrder(JSON.parse(saved))
    } catch {}
    setTimeout(() => setShowCheck(true), 300)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const txId = params.get('tx') || order?.transactionId

  return (
    <div className="pt-[70px] min-h-screen bg-cream relative overflow-hidden flex items-center justify-center px-4 py-20">

      {/* Confetti */}
      <div className="fixed inset-x-0 top-0 pointer-events-none z-0" aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            className="absolute top-0 rounded-sm"
            style={{
              width: c.size, height: c.size * 1.5,
              left: c.left,
              backgroundColor: c.color,
              animationName: 'confettiFall',
              animationDuration: c.dur,
              animationDelay: c.delay,
              animationTimingFunction: 'ease-in',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full">

        {/* Main card */}
        <div className="bg-white rounded-4xl shadow-orange-lg p-8 sm:p-12 text-center">

          {/* Check animation */}
          <div className="relative w-24 h-24 mx-auto mb-6" aria-hidden="true">
            <div className="absolute inset-0 rounded-full bg-emerald-100" />
            <div className={`absolute inset-0 rounded-full bg-emerald-500/20 transition-transform duration-700 ${showCheck ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`} />
            {showCheck && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-emerald-500 scale-bounce"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          <h1 className="font-cormorant font-bold text-secondary text-4xl sm:text-5xl mb-3">
            Commande <span className="italic text-gradient">confirmée !</span>
          </h1>
          <p className="text-text-light font-dm text-sm sm:text-base mb-8 leading-relaxed">
            Merci pour votre confiance. Nous préparons votre commande avec amour
            et vous contacterons pour la livraison.
          </p>

          {/* Order summary */}
          {order && (
            <div className="bg-cream rounded-2xl p-5 text-left mb-6" aria-label="Récapitulatif de commande">
              <h3 className="font-fraunces font-bold text-secondary text-sm tracking-wide mb-4">
                <span aria-hidden="true">📦</span> Votre commande
              </h3>
              <div className="space-y-2 mb-4">
                {order.items?.map(item => (
                  <div key={item.id} className="flex justify-between text-sm font-dm">
                    <span className="text-text-light">{item.shortName||item.name} × {item.quantity}</span>
                    <span className="font-bold text-secondary">{formatPrice(item.price*item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold border-t border-secondary/10 pt-3">
                <span className="font-dm text-secondary">Total payé</span>
                <span className="font-cormorant text-primary text-2xl">{formatPrice(order.total)}</span>
              </div>
            </div>
          )}

          {/* Transaction ref */}
          {txId && (
            <div className="text-xs text-text-light font-dm mb-6">
              Référence :{' '}
              <code className="bg-cream px-2 py-1 rounded-lg font-mono text-secondary/70 text-xs">{txId}</code>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link href="/boutique" className="w-full bg-btn-gradient text-secondary font-bold py-4 rounded-2xl min-h-[52px] flex items-center justify-center gap-2 hover:shadow-orange transition-all btn-glow">
              <span aria-hidden="true">🧆</span> Passer une nouvelle commande
            </Link>
            <Link href="/" className="w-full border-2 border-secondary/15 text-secondary font-semibold py-3.5 rounded-2xl min-h-[44px] flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all font-dm text-sm">
              <span aria-hidden="true">🏠</span> Retour à l'accueil
            </Link>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-5 bg-accent/20 border border-accent/40 rounded-2xl p-5 font-dm">
          <p className="font-bold text-secondary text-sm mb-1">
            <span aria-hidden="true">📞</span> Et maintenant ?
          </p>
          <p className="text-text-light text-sm leading-relaxed">
            Notre équipe vous contactera dans les <strong>30 minutes</strong> pour confirmer la livraison.
            Gardez votre téléphone à portée !
          </p>
        </div>
      </div>
    </div>
  )
}

function MerciSkeleton() {
  return (
    <div className="pt-[70px] min-h-screen bg-cream flex items-center justify-center" aria-busy="true">
      <div className="text-center">
        <div className="w-24 h-24 bg-secondary/8 rounded-full mx-auto mb-6 animate-pulse" />
        <div className="h-8 bg-secondary/8 rounded-xl w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-secondary/8 rounded w-48 mx-auto animate-pulse" />
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
