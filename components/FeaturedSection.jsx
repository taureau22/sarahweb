import Link from 'next/link'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import RevealSection from '@/components/RevealSection'

export default function FeaturedSection() {
  const featured = products.slice(0, 6)

  return (
    <section className="relative bg-cream py-24" aria-label="Nos spécialités">

      {/* Wave top from StatsBar */}
      <div className="absolute top-0 left-0 right-0 -mt-px" aria-hidden="true">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
          <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,12 1440,24 L1440,0 L0,0 Z" fill="#C4681A" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <RevealSection className="text-center mb-14">
          <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3 font-dm">Notre menu</p>
          <h2 className="font-cormorant font-bold text-secondary text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
            Nos{' '}
            <span className="italic text-gradient">Spécialités</span>
          </h2>
          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px bg-primary/30 flex-1 max-w-[120px]" />
            <span className="text-2xl" aria-hidden="true">🧆</span>
            <div className="h-px bg-primary/30 flex-1 max-w-[120px]" />
          </div>
          <p className="text-text-light font-dm max-w-lg mx-auto text-base leading-relaxed">
            Chaque pastel est pétri et garni à la main selon notre recette familiale,
            préparé avec amour chaque matin.
          </p>
        </RevealSection>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((product, i) => (
            <RevealSection key={product.id} delay={((i % 3) + 1)}>
              <ProductCard product={product} />
            </RevealSection>
          ))}
        </div>

        {/* CTA */}
        <RevealSection className="text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-10 py-4 rounded-full text-base hover:bg-primary hover:text-cream transition-all duration-200 min-h-[52px]"
          >
            Voir tout le menu
            <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </RevealSection>
      </div>
    </section>
  )
}
