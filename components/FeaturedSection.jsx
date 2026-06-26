import Link from 'next/link'
import { pastelProducts } from '@/data/products'
import ProductGrid from '@/components/ProductGrid'
import { Icon } from '@/components/icons'

export default function FeaturedSection() {
  const featured = pastelProducts.slice(0, 4)

  return (
    <section className="bg-cream py-16 sm:py-24" aria-label="Nos pastels signature">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 sm:mb-14 reveal">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="rule" />
              <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
                Le menu
              </span>
            </div>
            <h2 className="font-display font-semibold text-ink text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tightest">
              Nos pastels <span className="italic">signature</span>
            </h2>
          </div>
          <Link
            href="/boutique"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-ink-soft link-underline hover:text-terracotta transition-colors shrink-0 ml-6"
          >
            Voir tout <Icon.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={featured} />

        <div className="sm:hidden text-center mt-8">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-border text-ink text-sm font-medium hover:border-terracotta hover:text-terracotta transition-colors"
          >
            Voir tout le menu <Icon.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
