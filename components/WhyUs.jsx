import Image from 'next/image'
import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

const reasons = [
  { Ico: Icon.ChefHat,     title: 'Recette familiale',     text: 'Chaque pastel est pétri et garni à la main selon une recette transmise avec passion.' },
  { Ico: Icon.Leaf,        title: 'Frais du marché',       text: 'Poulet, poisson, viande, jambon sélectionnés chaque matin. Aucun conservateur.' },
  { Ico: Icon.Snowflake,   title: 'Surgelés disponibles',  text: 'Commandez en quantité : nos pastels surgelés se frient en quelques minutes.' },
  { Ico: Icon.ShieldCheck, title: 'Paiement sécurisé',     text: 'Orange Money et Wave via CinetPay, ou commande directe sur WhatsApp.' },
]

export default function WhyUs() {
  return (
    <section className="bg-cream py-24 sm:py-32" aria-label="Pourquoi nous choisir">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Visuel */}
          <RevealSection className="order-2 lg:order-1">
            <div className="relative">
              <div className="grain relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden bg-cream-2 shadow-card">
                <Image
                  src="/images/pastels-handmade.png"
                  alt="Préparation artisanale des pastels"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Vignette subtile */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" aria-hidden="true" />
              </div>

              {/* Badge flottant */}
              <div className="absolute bottom-6 left-5 sm:left-7 bg-cream/95 backdrop-blur-sm rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-lift border border-border">
                <span className="w-9 h-9 rounded-full bg-terracotta-tint text-terracotta flex items-center justify-center shrink-0">
                  <Icon.Heart className="w-4 h-4" />
                </span>
                <span className="text-ink text-sm font-medium leading-tight">
                  Préparé avec amour,<br />
                  <span className="text-ink-soft font-normal">chaque matin</span>
                </span>
              </div>

              {/* Accent décoratif */}
              <div
                className="absolute -top-5 -right-5 w-28 h-28 rounded-full border-2 border-terracotta/15 hidden lg:block"
                aria-hidden="true"
              />
            </div>
          </RevealSection>

          {/* Texte + liste */}
          <div className="order-1 lg:order-2">
            <RevealSection>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="rule" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.22em] text-terracotta font-semibold">Nos engagements</span>
              </div>
              <h2
                className="font-display font-semibold text-ink leading-[1.0] tracking-tightest mb-12"
                style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}
              >
                Le goût du{' '}
                <em className="not-italic italic text-terracotta">fait-maison</em>
              </h2>
            </RevealSection>

            <div className="space-y-0">
              {reasons.map((r, i) => (
                <RevealSection key={r.title} delay={i + 1}>
                  <div className="flex items-start gap-5 py-6 border-t border-border group">
                    <span className="w-11 h-11 rounded-full bg-terracotta-tint text-terracotta inline-flex items-center justify-center shrink-0 ring-1 ring-terracotta/15 group-hover:bg-terracotta/15 transition-colors duration-300">
                      <r.Ico className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-ink text-lg mb-1.5 leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-ink-soft text-sm leading-relaxed">
                        {r.text}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
