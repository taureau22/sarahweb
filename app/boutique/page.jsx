'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductGrid from '@/components/ProductGrid'
import { Icon } from '@/components/icons'

export default function BoutiquePage() {
  const [filter, setFilter] = useState('tous')

  const filters = [
    { key: 'tous',   label: 'Tout',      count: products.length },
    { key: 'pastel', label: 'Pastels',   count: products.filter(p => p.category === 'pastel').length },
    { key: 'jus',    label: 'Jus frais', count: products.filter(p => p.category === 'jus').length },
  ]

  const pastels = products.filter(p => p.category === 'pastel')
  const jus     = products.filter(p => p.category === 'jus')

  return (
    <>
      {/* En-tête */}
      <section className="bg-cream pt-28 sm:pt-32 pb-12" aria-label="Notre boutique">
        <div className="max-w-8xl mx-auto px-5 sm:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="rule" />
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
              {products.length} produits disponibles
            </span>
          </div>
          <h1 className="font-display font-semibold text-ink text-[clamp(2.6rem,6vw,4.5rem)] leading-[1] tracking-tightest max-w-2xl">
            Le <span className="italic text-terracotta">menu</span>
          </h1>
          <p className="text-ink-soft text-lg mt-5 max-w-md">
            Pastels artisanales faites main et jus pressés du jour. Frais ou surgelés.
          </p>
        </div>
      </section>

      {/* Filtres sticky */}
      <div className="sticky top-16 sm:top-[72px] z-30 bg-cream shadow-soft border-y border-border">
        <div className="max-w-8xl mx-auto px-5 sm:px-8 py-3">
          <div role="group" aria-label="Filtrer" className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={`inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  filter === f.key
                    ? 'bg-ink text-cream'
                    : 'bg-surface border border-border text-ink-soft hover:border-terracotta hover:text-terracotta'
                }`}
              >
                {f.label}
                <span className={`text-xs tabular-nums ${filter === f.key ? 'text-cream/60' : 'text-muted'}`}>{f.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Produits */}
      <div className="max-w-8xl mx-auto px-5 sm:px-8 py-14 space-y-16">

        {(filter === 'tous' || filter === 'pastel') && (
          <section aria-label="Pastels artisanaux">
            <div className="flex items-baseline gap-3 mb-7">
              <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl tracking-tight">Pastels artisanales</h2>
              <span className="text-muted text-sm">3 500 FCFA · paquet de 10</span>
            </div>
            <ProductGrid products={pastels} />
            <p className="sm:hidden text-center text-xs text-muted mt-4 inline-flex items-center justify-center gap-1.5 w-full">
              Glissez pour voir plus <Icon.ArrowRight className="w-3.5 h-3.5" />
            </p>
          </section>
        )}

        {(filter === 'tous' || filter === 'jus') && (
          <section aria-label="Jus frais">
            <div className="flex items-baseline gap-3 mb-7">
              <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl tracking-tight">Jus frais</h2>
              <span className="text-muted text-sm">1 000 FCFA · la bouteille</span>
            </div>
            <ProductGrid products={jus} />
            <p className="sm:hidden text-center text-xs text-muted mt-4 inline-flex items-center justify-center gap-1.5 w-full">
              Glissez pour voir plus <Icon.ArrowRight className="w-3.5 h-3.5" />
            </p>
          </section>
        )}
      </div>
    </>
  )
}
