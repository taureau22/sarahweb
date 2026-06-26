import Link from 'next/link'
import { products } from '@/data/products'
import ProductGrid from '@/components/ProductGrid'
import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

export default function FeaturedSection() {
  const featured = products.filter(p => p.category === 'pastel').slice(0, 4)

  return (
    <section className="bg-cream py-24 sm:py-32" aria-label="Nos spécialités">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        <RevealSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="rule" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.22em] text-terracotta font-semibold">Le menu</span>
              </div>
              <h2
                className="font-display font-semibold text-ink leading-[1.0] tracking-tightest max-w-xl"
                style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}
              >
                Nos pastels{' '}
                <em className="not-italic italic text-terracotta">signature</em>
              </h2>
            </div>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-ink font-medium link-underline shrink-0 group"
            >
              Voir tout le menu
              <Icon.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-250" />
            </Link>
          </div>
        </RevealSection>

        <ProductGrid products={featured} />

        <p className="sm:hidden text-center text-xs text-muted mt-5 inline-flex items-center justify-center gap-1.5 w-full">
          Glissez pour voir plus <Icon.ArrowRight className="w-3.5 h-3.5" />
        </p>

      </div>
    </section>
  )
}
