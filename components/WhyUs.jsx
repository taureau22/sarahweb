import Image from 'next/image'
import { Icon } from '@/components/icons'

const reasons = [
  {
    Icon: Icon.ChefHat,
    title: 'Fait main chaque matin',
    desc: 'Nos pastels sont préparées à la main chaque jour, jamais industrielles.',
  },
  {
    Icon: Icon.Leaf,
    title: 'Ingrédients de qualité',
    desc: 'Farines sélectionnées, viandes fraîches, légumes du marché local.',
  },
  {
    Icon: Icon.Snowflake,
    title: 'Option surgelée disponible',
    desc: 'Stock à domicile, à frire en 8 minutes. Pratique et délicieux.',
  },
  {
    Icon: Icon.Truck,
    title: "Livraison partout en CI",
    desc: "Abidjan, Cocody, Yopougon, Adjamé, Marcory et tout le territoire.",
  },
]

export default function WhyUs() {
  return (
    <section className="bg-cream py-16 sm:py-24 overflow-hidden" aria-label="Pourquoi nous choisir">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image column */}
          <div className="relative order-2 lg:order-1 reveal">
            <div className="relative rounded-3xl overflow-hidden shadow-card grain aspect-[4/5] sm:aspect-square">
              <Image
                src="/images/04_pastels-handmade.png"
                alt="Préparation artisanale des pastels Le Panier d'Elif"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white rounded-3xl shadow-card px-5 py-4 animate-float border border-border/40">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-terracotta-tint inline-flex items-center justify-center text-terracotta shrink-0">
                  <Icon.Heart className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-display font-semibold text-ink text-sm leading-tight">
                    Préparé avec amour
                  </p>
                  <p className="text-muted text-xs mt-0.5">Depuis Abidjan</p>
                </div>
              </div>
            </div>

            {/* Decorative ring — lg only */}
            <div
              className="hidden lg:block absolute -top-8 -left-8 w-40 h-40 rounded-full border border-terracotta/15 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Content column */}
          <div className="order-1 lg:order-2">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="rule" />
                <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
                  Pourquoi nous
                </span>
              </div>
              <h2 className="font-display font-semibold text-ink text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] tracking-tightest">
                L'artisanat au service<br />du <span className="italic text-terracotta">goût</span>
              </h2>
              <p className="text-ink-soft mt-5 text-lg leading-relaxed">
                Chez Le Panier d'Elif, chaque pastel raconte une histoire — celle d'un savoir-faire
                transmis, d'une pâte travaillée à la main, d'une cuisson maîtrisée.
              </p>
            </div>

            <ul className="mt-8 space-y-5">
              {reasons.map((r, i) => (
                <li
                  key={r.title}
                  className={`flex items-start gap-4 reveal reveal-delay-${i + 1}`}
                >
                  <span className="w-11 h-11 rounded-2xl bg-terracotta-tint border border-terracotta/15 inline-flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                    <r.Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{r.title}</p>
                    <p className="text-ink-soft text-sm mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
