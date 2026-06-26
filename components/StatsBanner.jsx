'use client'

import { useEffect, useRef, useState } from 'react'
import RevealSection from '@/components/RevealSection'

function Counter({ target, suffix = '', duration = 1600 }) {
  const [count, setCount]   = useState(0)
  const spanRef  = useRef(null)
  const started  = useRef(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true

      const t0  = performance.now()
      const tick = (now) => {
        const p       = Math.min((now - t0) / duration, 1)
        const eased   = 1 - Math.pow(1 - p, 3) // ease-out cubic
        setCount(Math.round(eased * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return (
    <span ref={spanRef} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

const stats = [
  {
    value: 500, suffix: '+',
    label: 'Clients satisfaits',
    sub: 'À Abidjan et dans toute la CI',
  },
  {
    value: 5, suffix: '',
    label: 'Saveurs artisanales',
    sub: 'Poulet · Viande · Poisson · Jambon',
  },
  {
    value: 10, suffix: '+',
    label: 'Quartiers desservis',
    sub: "Livraison partout en Côte d'Ivoire",
  },
]

export default function StatsBanner() {
  return (
    <section className="section-void border-y border-cream/6 overflow-hidden" aria-label="Le Panier d'Elif en chiffres">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-cream/6">
          {stats.map((s, i) => (
            <RevealSection key={i} delay={i + 1}>
              <div className="px-8 sm:px-10 lg:px-14 py-14 sm:py-16 flex flex-col gap-2 group hover:bg-cream/[.025] transition-colors duration-500">

                {/* Valeur numérique */}
                <p
                  className="font-display font-semibold text-cream leading-none tracking-tightest"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
                >
                  <Counter target={s.value} suffix={s.suffix} />
                </p>

                {/* Label */}
                <p className="text-cream/70 font-medium text-base sm:text-lg">
                  {s.label}
                </p>

                {/* Sous-titre */}
                <p className="text-cream/30 text-xs sm:text-sm leading-relaxed">
                  {s.sub}
                </p>

                {/* Trait décoratif au hover */}
                <div className="mt-4 w-0 h-px bg-terracotta group-hover:w-12 transition-all duration-500 ease-out" aria-hidden="true" />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
