import Image from 'next/image'
import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

const reasons = [
  { Ico: Icon.ChefHat,   title: 'Recette familiale',        text: 'Chaque pastel est pétri et garni à la main selon une recette transmise avec passion.' },
  { Ico: Icon.Leaf,      title: 'Frais du marché',          text: 'Poulet, poisson, viande, jambon sélectionnés chaque matin. Aucun conservateur.' },
  { Ico: Icon.Snowflake, title: 'Surgelés disponibles',     text: 'Commandez en quantité : nos pastels surgelés se frient en quelques minutes.' },
  { Ico: Icon.ShieldCheck, title: 'Paiement sécurisé',      text: 'Orange Money et Wave via CinetPay, ou commande directe sur WhatsApp.' },
]

export default function WhyUs() {
  return (
    <section className="bg-cream py-20 sm:py-28" aria-label="Pourquoi nous choisir">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Visuel */}
          <RevealSection className="order-2 lg:order-1">
            <div className="grain relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden bg-cream-2 shadow-card">
              <Image
                src="/images/pastels-handmade.png"
                alt="Préparation artisanale des pastels"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Étiquette */}
              <div className="absolute bottom-5 left-5 bg-cream/95 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-soft">
                <Icon.Heart className="w-5 h-5 text-terracotta" />
                <span className="text-ink text-sm font-medium">Préparé avec amour, chaque matin</span>
              </div>
            </div>
          </RevealSection>

          {/* Texte + liste */}
          <div className="order-1 lg:order-2">
            <RevealSection>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="rule" />
                <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">Nos engagements</span>
              </div>
              <h2 className="font-display font-semibold text-ink text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tightest mb-10">
                Le goût du <span className="italic text-terracotta">fait-maison</span>
              </h2>
            </RevealSection>

            <div className="space-y-px">
              {reasons.map((r, i) => (
                <RevealSection key={r.title} delay={i + 1}>
                  <div className="flex items-start gap-5 py-5 border-t border-border">
                    <span className="w-11 h-11 rounded-full bg-terracotta-tint text-terracotta inline-flex items-center justify-center shrink-0">
                      <r.Ico className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-ink text-lg mb-1">{r.title}</h3>
                      <p className="text-ink-soft text-sm leading-relaxed">{r.text}</p>
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
