'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@/components/icons'

const FLAVORS = ['au poulet', 'au poisson', 'à la viande', 'au jambon de dinde']

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setI(p => (p + 1) % FLAVORS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-dark text-white grain">
      {/* Blobs lumineux animés (fond) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 -left-24 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(234,138,46,0.55), transparent 70%)', animation: 'blobDrift 9s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(196,154,60,0.45), transparent 70%)', animation: 'blobDrift 12s ease-in-out infinite reverse' }}
        />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 pt-28 pb-14 sm:pt-36 sm:pb-20">
        {/* Eyebrow */}
        <span
          className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/70 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5"
          style={{ animation: 'fadeUp .6s ease both' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-terra-2" /> Pastels artisanaux · Abidjan
        </span>

        {/* Titre cinétique */}
        <h1 className="mt-6 font-display font-semibold tracking-tight">
          <span className="block text-white/85 text-[clamp(1.4rem,4.5vw,2.4rem)] leading-tight"
                style={{ animation: 'fadeUp .6s .05s ease both' }}>
            Pastels au Fromage
          </span>

          {/* Mot qui défile */}
          <span className="block h-[1.1em] overflow-hidden text-[clamp(2.6rem,10vw,5.5rem)] leading-[1.1]">
            <span
              key={i}
              className="block text-gradient"
              style={{ animation: 'flavorIn .55s cubic-bezier(.22,.61,.36,1) both', transformOrigin: 'bottom' }}
            >
              {FLAVORS[i]}
            </span>
          </span>

          <span className="block text-white text-[clamp(2rem,6.5vw,3.4rem)] leading-tight"
                style={{ animation: 'fadeUp .6s .1s ease both' }}>
            livré chez vous.
          </span>
        </h1>

        <p className="mt-5 max-w-md text-white/70 text-sm sm:text-base leading-relaxed"
           style={{ animation: 'fadeUp .6s .15s ease both' }}>
          Pâte maison, Là où crousti et fondant se rejoignent le goût demeure toujours .
        </p>

        {/* CTA */}
        <div className="mt-7 flex flex-wrap items-center gap-3" style={{ animation: 'fadeUp .6s .2s ease both' }}>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-terracotta text-white font-semibold hover:bg-[#D2761C] transition-colors shadow-terra active:scale-95"
          >
            Commander maintenant <Icon.ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Voir le menu
          </a>
        </div>

        {/* Réassurance factuelle */}
        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65"
             style={{ animation: 'fadeUp .6s .25s ease both' }}>
          <span className="inline-flex items-center gap-2"><Icon.ChefHat className="w-4 h-4 text-terra-2" /> Fait main</span>
          <span className="inline-flex items-center gap-2"><Icon.Snowflake className="w-4 h-4 text-terra-2" /> Frits & surgelés</span>
          <span className="inline-flex items-center gap-2"><Icon.Wallet className="w-4 h-4 text-terra-2" /> Orange Money · Wave · Carte Bancaire</span>
        </div>
      </div>
    </section>
  )
}
