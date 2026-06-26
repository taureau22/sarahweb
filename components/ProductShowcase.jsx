import Link from 'next/link'
import { pastelProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { Icon } from '@/components/icons'

export default function ProductShowcase() {
  return (
    <section className="bg-bg py-20 sm:py-28 overflow-hidden" aria-label="Nos pastels artisanaux">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="reveal flex items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="rule" />
              <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
                La sélection
              </span>
            </div>
            <h2 className="font-display font-semibold text-ink text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tightest">
              Nos pastels<br />
              <span className="italic">artisanaux</span>
            </h2>
          </div>
          <Link
            href="/boutique"
            className="reveal hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-terracotta transition-colors link-underline shrink-0 pb-1"
          >
            Voir tout
            <Icon.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal scroll on desktop, vertical stack on mobile */}
        <div
          className="flex flex-col sm:flex-row sm:overflow-x-auto sm:snap-x sm:scroll-smooth scrollbar-hide gap-5 pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8"
          role="list"
          aria-label="Pastels artisanaux"
        >
          {pastelProducts.map((product) => (
            <div
              key={product.id}
              className="sm:min-w-[320px] sm:max-w-[320px] sm:snap-start w-full flex-shrink-0"
              role="listitem"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-border text-ink font-medium hover:border-terracotta hover:text-terracotta transition-colors"
          >
            Voir toute la boutique
            <Icon.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
