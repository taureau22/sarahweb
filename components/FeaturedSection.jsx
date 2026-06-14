import Link from 'next/link'
import { products } from '@/data/products'
import ProductGrid from '@/components/ProductGrid'
import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

export default function FeaturedSection() {
  const featured = products.filter(p => p.category === 'pastel').slice(0, 4)

  return (
    <section className="bg-cream py-20 sm:py-28" aria-label="Nos spécialités">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* En-tête éditorial */}
        <RevealSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="rule" />
                <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">Le menu</span>
              </div>
              <h2 className="font-display font-semibold text-ink text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tightest max-w-xl">
                Nos pastels <span className="italic text-terracotta">signature</span>
              </h2>
            </div>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-ink font-medium link-underline shrink-0"
            >
              Voir tout le menu
              <Icon.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealSection>

        {/* Produits — carrousel sur mobile, grille sur desktop */}
        <ProductGrid products={featured} />

        {/* Indice de swipe (mobile) */}
        <p className="sm:hidden text-center text-xs text-muted mt-4 inline-flex items-center justify-center gap-1.5 w-full">
          Glissez pour voir plus <Icon.ArrowRight className="w-3.5 h-3.5" />
        </p>
      </div>
    </section>
  )
}
