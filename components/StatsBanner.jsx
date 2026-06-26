'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Clients satisfaits',   sub: "À travers Abidjan et ses environs" },
  { value: 5,   suffix: '',  label: 'Saveurs artisanales',  sub: 'Recettes renouvelées régulièrement' },
  { value: 10,  suffix: '+', label: 'Quartiers livrés',     sub: "Toute la Côte d'Ivoire" },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const elRef      = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const duration = 2000
          const startTime = performance.now()
          const easeOut = (t) => 1 - Math.pow(1 - t, 3)

          const tick = (now) => {
            const elapsed  = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.round(easeOut(progress) * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={elRef} className="tabular-nums" aria-label={`${value}${suffix}`}>
      {count}{suffix}
    </span>
  )
}

export default function StatsBanner() {
  return (
    <section
      className="bg-void border-y border-cream/8 py-14 sm:py-20"
      aria-label="Chiffres clés"
    >
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-cream/8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center py-10 sm:py-0 sm:px-10 first:pt-0 last:pb-0 sm:first:pl-0 sm:last:pr-0"
            >
              <p
                className="font-display font-semibold text-cream leading-none tracking-tightest"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-cream/80 font-medium mt-3">{stat.label}</p>
              <p className="text-cream/40 text-sm mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
