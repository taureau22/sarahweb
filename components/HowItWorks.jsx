import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

const steps = [
  {
    n: '01',
    Ico: Icon.Bag,
    title: 'Choisissez',
    text: 'Parcourez le menu et composez votre panier — pastels au poulet, viande, poisson, jambon et jus pressés.',
  },
  {
    n: '02',
    Ico: Icon.CreditCard,
    title: 'Commandez',
    text: 'Renseignez votre adresse et payez en sécurité via Orange Money ou Wave, ou commandez sur WhatsApp.',
  },
  {
    n: '03',
    Ico: Icon.Truck,
    title: 'Recevez',
    text: "Votre commande est préparée fraîche et livrée chez vous, partout en Côte d'Ivoire.",
  },
]

export default function HowItWorks() {
  return (
    <section className="section-void py-24 sm:py-32 overflow-hidden" aria-label="Comment commander">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        <RevealSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16 sm:mb-20">
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="rule" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.22em] text-cream/40 font-medium">Simple & rapide</span>
              </div>
              <h2
                className="font-display font-semibold text-cream leading-[1.0] tracking-tightest"
                style={{ fontSize: 'clamp(2rem,5.5vw,3.6rem)' }}
              >
                Commander en{' '}
                <em className="not-italic text-terracotta">trois temps</em>
              </h2>
            </div>
            <p className="text-cream/35 text-sm max-w-xs sm:text-right leading-relaxed">
              Du choix à la livraison, en quelques minutes depuis votre téléphone.
            </p>
          </div>
        </RevealSection>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          {steps.map((s, i) => (
            <RevealSection key={s.n} delay={i + 1} className="h-full">
              <div className="relative h-full py-10 px-8 sm:px-10 border-t border-cream/8 md:border-t-0 md:border-l first:border-l-0 first:border-t-0 border-cream/8 overflow-hidden group hover:bg-cream/[.025] transition-colors duration-500">

                {/* Numéro géant en fond */}
                <span className="step-number absolute -top-2 right-6 select-none" aria-hidden="true">
                  {s.n}
                </span>

                {/* Icône */}
                <div className="relative mb-8">
                  <span className="w-12 h-12 rounded-full bg-terracotta/15 text-terracotta inline-flex items-center justify-center ring-1 ring-terracotta/20 group-hover:bg-terracotta/20 transition-colors duration-400">
                    <s.Ico className="w-5 h-5" />
                  </span>
                </div>

                <h3 className="font-display font-semibold text-cream text-2xl sm:text-3xl mb-4 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-cream/45 text-sm leading-relaxed max-w-xs">
                  {s.text}
                </p>

                {/* Connecteur horizontal (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[4.5rem] -right-px w-px h-8 bg-gradient-to-b from-terracotta/30 to-transparent" aria-hidden="true" />
                )}
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  )
}
