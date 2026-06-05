'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import RevealSection from '@/components/RevealSection'

export default function BoutiquePage() {
  const [activeFilter, setActiveFilter] = useState('tous')

  const filters = [
    { key: 'tous',   label: 'Tous les produits', count: products.length },
    { key: 'pastel', label: '🥟 Pastels',         count: products.filter(p => p.category === 'pastel').length },
    { key: 'jus',    label: '🧃 Jus frais',       count: products.filter(p => p.category === 'jus').length },
  ]

  const filtered = activeFilter === 'tous'
    ? products
    : products.filter(p => p.category === activeFilter)

  return (
    <>
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-secondary to-secondary-light pt-24 pb-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Notre Boutique
          </h1>
          <p className="text-white/75 text-lg">
            Pastels artisanaux & jus frais — commandez et faites-vous livrer
          </p>
        </div>
      </div>

      {/* Sticky filters */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  activeFilter === f.key
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary bg-white'
                }`}
              >
                {f.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeFilter === f.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

        {/* Pastels section */}
        {(activeFilter === 'tous' || activeFilter === 'pastel') && (
          <div className="mb-14">
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-8">
              <h2 className="font-playfair text-2xl font-bold text-secondary">🥟 Pastels artisanaux</h2>
              <span className="text-gray-400 text-sm font-medium">— 3 500 FCFA / paquet de 10 pièces</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(p => p.category === 'pastel')
                .map((product, i) => (
                  <RevealSection key={product.id} delay={i + 1}>
                    <ProductCard product={product} />
                  </RevealSection>
                ))}
            </div>
          </div>
        )}

        {/* Jus section */}
        {(activeFilter === 'tous' || activeFilter === 'jus') && (
          <div>
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-8">
              <h2 className="font-playfair text-2xl font-bold text-secondary">🧃 Jus frais</h2>
              <span className="text-gray-400 text-sm font-medium">— 1 000 FCFA / bouteille</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(p => p.category === 'jus')
                .map((product, i) => (
                  <RevealSection key={product.id} delay={i + 1}>
                    <ProductCard product={product} />
                  </RevealSection>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
