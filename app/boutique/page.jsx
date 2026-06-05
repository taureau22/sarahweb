'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import RevealSection from '@/components/RevealSection'

export default function BoutiquePage() {
  const [activeFilter, setActiveFilter] = useState('tous')

  const filters = [
    { key: 'tous',   label: 'Tous',     emoji: '✨', count: products.length },
    { key: 'pastel', label: 'Pastels',  emoji: '🧆', count: products.filter(p => p.category === 'pastel').length },
    { key: 'jus',    label: 'Jus frais',emoji: '🧃', count: products.filter(p => p.category === 'jus').length },
  ]

  const pastels = products.filter(p => p.category === 'pastel')
  const jus     = products.filter(p => p.category === 'jus')

  return (
    <>
      {/* Hero banner */}
      <section
        className="relative bg-secondary grain-overlay pt-[70px] pb-20 overflow-hidden"
        aria-label="Notre boutique"
      >
        {/* Orb */}
        <div
          className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E8821A, transparent 60%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center pt-10">
          <div className="inline-flex items-center gap-2 border border-primary/50 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-wide font-dm">
            <span aria-hidden="true">🧆</span> {products.length} produits disponibles
          </div>
          <h1 className="font-cormorant font-bold text-cream text-5xl sm:text-6xl leading-tight mb-4">
            Notre{' '}
            <span className="italic text-gradient">Menu</span>
          </h1>
          <p className="text-cream/60 font-dm text-base">
            Pastels artisanales faites main · Jus frais du jour
          </p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-8 sm:h-12 block">
            <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,12 1440,24 L1440,60 L0,60 Z" fill="#FFF8EE" />
          </svg>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[70px] z-30 bg-cream/95 backdrop-blur-md border-b border-secondary/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
          <div
            role="group"
            aria-label="Filtrer les produits"
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide"
          >
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-bold text-sm whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                  activeFilter === f.key
                    ? 'bg-btn-gradient border-transparent text-secondary shadow-orange'
                    : 'border-secondary/15 text-text-light hover:border-primary hover:text-primary bg-white/60'
                }`}
              >
                <span aria-hidden="true">{f.emoji}</span>
                {f.label}
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ml-0.5 ${
                    activeFilter === f.key ? 'bg-secondary/15 text-secondary' : 'bg-secondary/8 text-text-light'
                  }`}
                  aria-hidden="true"
                >
                  {f.count}
                </span>
                <span className="sr-only">({f.count} produit{f.count > 1 ? 's' : ''})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* Pastels */}
        {(activeFilter === 'tous' || activeFilter === 'pastel') && (
          <section aria-label="Pastels artisanaux">
            <RevealSection className="mb-8">
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-cormorant font-bold text-secondary text-3xl">
                  <span aria-hidden="true">🧆</span> Pastels artisanales
                </h2>
                <span className="text-text-light text-sm font-dm">— 3 500 FCFA / paquet de 10 pièces</span>
              </div>
              <div className="mt-2 h-0.5 w-20 bg-primary rounded-full" />
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastels.map((p, i) => (
                <RevealSection key={p.id} delay={(i % 3) + 1}>
                  <ProductCard product={p} />
                </RevealSection>
              ))}
            </div>
          </section>
        )}

        {/* Jus frais */}
        {(activeFilter === 'tous' || activeFilter === 'jus') && (
          <section aria-label="Jus frais">
            <RevealSection className="mb-8">
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-cormorant font-bold text-secondary text-3xl">
                  <span aria-hidden="true">🧃</span> Jus frais
                </h2>
                <span className="text-text-light text-sm font-dm">— 1 000 FCFA / bouteille</span>
              </div>
              <div className="mt-2 h-0.5 w-20 bg-emerald-500 rounded-full" />
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jus.map((p, i) => (
                <RevealSection key={p.id} delay={(i % 3) + 1}>
                  <ProductCard product={p} />
                </RevealSection>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
