'use client'

import { useState, useMemo } from 'react'
import { products as seedProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { Icon } from '@/components/icons'

const CATEGORIES = [
  { id: 'all',     label: 'Tout',     Ico: Icon.Sparkles },
  { id: 'frais',   label: 'Frais',    Ico: Icon.ChefHat },
  { id: 'surgele', label: 'Surgelés', Ico: Icon.Snowflake },
]

export default function MenuBrowser({ products: productsProp }) {
  const allProducts = productsProp?.length ? productsProp : seedProducts
  const [cat, setCat]       = useState('all')
  const [query, setQuery]   = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allProducts.filter(p => {
      const okCat = cat === 'all' || p.category === cat
      const okQ = !q || (p.name + ' ' + (p.description || '')).toLowerCase().includes(q)
      return okCat && okQ
    })
  }, [cat, query, allProducts])

  return (
    <section id="menu" className="max-w-[1100px] mx-auto px-4 sm:px-6">

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-bg/90 backdrop-blur-xl border-b border-border">
        {/* Search */}
        <div className="relative mb-3">
          <Icon.Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un pastel…"
            aria-label="Rechercher un produit"
            className="w-full h-12 pl-11 pr-4 rounded-full bg-surface border border-border text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-terracotta transition-colors"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
          {CATEGORIES.map(({ id, label, Ico }) => {
            const active = cat === id
            return (
              <button
                key={id}
                onClick={() => setCat(id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-colors active:scale-95 ${
                  active
                    ? 'bg-ink text-white'
                    : 'bg-surface text-ink-2 border border-border hover:border-terracotta'
                }`}
              >
                <Ico className="w-4 h-4" /> {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="pt-6 pb-28">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-ink mb-2">Aucun résultat</p>
            <p className="text-muted text-sm">Essayez un autre mot ou changez de catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
