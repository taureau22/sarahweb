import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export default function HeroSection() {
  return (
    <section className="relative bg-cream pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-20 overflow-hidden" aria-label="Le Panier d'Elif">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ===== TEXTE ===== */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="anim-1 inline-flex items-center gap-2 mb-6">
              <span className="rule" />
              <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
                Artisanal · Abidjan · Depuis 2024
              </span>
            </div>

            {/* Titre */}
            <h1 className="anim-2 font-display font-semibold text-ink leading-[0.98] tracking-tightest mb-6 text-[clamp(2.6rem,7vw,4.6rem)]">
              Fait main,
              <br />
              <span className="italic text-terracotta">chaque matin.</span>
            </h1>

            {/* Sous-texte */}
            <p className="anim-3 text-ink-soft text-lg leading-relaxed max-w-md mb-8">
              Pastels artisanales pétries et garnies à la main, et jus pressés du jour.
              Livrés partout en Côte d'Ivoire.
            </p>

            {/* CTA */}
            <div className="anim-3 flex flex-wrap items-center gap-5 mb-10">
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-terracotta text-cream font-medium hover:bg-terracotta-dark transition-colors duration-250 shadow-terra"
              >
                Commander maintenant
                <Icon.ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/boutique"
                className="inline-flex items-center gap-1.5 text-ink font-medium link-underline"
              >
                Voir le menu
                <Icon.ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust row */}
            <div className="anim-4 flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-border">
              {[
                { Ico: Icon.ChefHat, label: 'Fait main' },
                { Ico: Icon.Leaf,    label: 'Sans conservateurs' },
                { Ico: Icon.Truck,   label: 'Livraison CI' },
              ].map(({ Ico, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-sm text-ink-soft">
                  <Ico className="w-[18px] h-[18px] text-olive" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ===== VISUEL ===== */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Photo principale plein cadre */}
              <div className="anim-img grain relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-[5/4] rounded-3xl overflow-hidden bg-cream-2 shadow-card">
                <Image
                  src="/images/cover.jpeg"
                  alt="Pastels artisanales dorées du Panier d'Elif"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>

              {/* Badge note flottant */}
              <div className="anim-4 absolute -bottom-5 left-5 sm:left-8 bg-surface rounded-2xl shadow-lift px-4 py-3 flex items-center gap-3 border border-border">
                <div className="flex text-clay">
                  {[...Array(5)].map((_, i) => <Icon.StarFilled key={i} className="w-3.5 h-3.5" />)}
                </div>
                <div className="leading-tight">
                  <p className="text-ink font-semibold text-sm">+500 clients</p>
                  <p className="text-muted text-xs">satisfaits à Abidjan</p>
                </div>
              </div>

              {/* Badge prix flottant */}
              <div className="anim-4 absolute -top-3 right-4 sm:right-6 bg-ink text-cream rounded-2xl px-4 py-3 shadow-lift">
                <p className="text-[11px] uppercase tracking-wider text-cream/60">À partir de</p>
                <p className="font-display font-semibold text-xl leading-none mt-0.5">1 000 <span className="text-sm font-sans font-normal text-cream/70">FCFA</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
