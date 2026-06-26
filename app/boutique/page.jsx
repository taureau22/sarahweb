'use client'

import { useState } from 'react'
import { products, pastelProducts, jusProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { Icon } from '@/components/icons'

const filters = [
  { key: 'tous',   label: 'Tout',      count: products.length },
  { key: 'pastel', label: 'Pastels',   count: pastelProducts.length },
  { key: 'jus',    label: 'Jus frais', count: jusProducts.length },
]

export default function BoutiquePage() {
  const [filter, setFilter] = useState('tous')

  return (
    <>
      {/* Header */}
      <section className="bg-bg pt-28 sm:pt-32 pb-12" aria-label="Notre boutique">
        <div className="max-w-8xl mx-auto px-5 sm:px-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="rule" />
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
              {products.length} produits disponibles
            </span>
          </div>
          <h1 className="font-display font-semibold text-ink text-[clamp(2.6rem,6vw,4.5rem)] leading-[1] tracking-tightest max-w-2xl">
            Le <span className="italic text-terracotta">menu</span>
          </h1>
          <p className="text-ink-2 text-lg mt-5 max-w-md">
            Pastels artisanaux faits main et jus pressés du jour. Frais ou surgelés.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 sm:top-[72px] z-30 bg-bg/90 backdrop-blur-md shadow-soft border-y border-border">
        <div className="max-w-8xl mx-auto px-5 sm:px-8 py-3">
          <div
            role="group"
            aria-label="Filtrer les produits"
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
          >
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={`inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  filter === f.key
                    ? 'bg-ink text-white'
                    : 'bg-surface border border-border text-ink-2 hover:border-terracotta hover:text-terracotta'
                }`}
              >
                {f.label}
                <span className={`text-xs tabular-nums ${filter === f.key ? 'text-white/60' : 'text-muted'}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-8xl mx-auto px-5 sm:px-8 py-14 space-y-16">

        {(filter === 'tous' || filter === 'pastel') && (
          <section aria-label="Pastels artisanaux">
            <div className="flex items-baseline gap-3 mb-7">
              <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl tracking-tight">
                Pastels artisanaux
              </h2>
              <span className="text-muted text-sm">3 500 FCFA · paquet de 10</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {pastelProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {(filter === 'tous' || filter === 'jus') && (
          <section aria-label="Jus frais">
            <div className="flex items-baseline gap-3 mb-7">
              <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl tracking-tight">
                Jus frais
              </h2>
              <span className="text-muted text-sm">1 000 FCFA · la bouteille</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {jusProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <p className="sm:hidden text-center text-xs text-muted mt-4 inline-flex items-center justify-center gap-1.5 w-full">
              Glissez pour voir plus <Icon.ArrowRight className="w-3.5 h-3.5" />
            </p>
          </section>
        )}
      </div>
    </>
  )
}
