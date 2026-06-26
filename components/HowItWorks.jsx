import { Icon } from '@/components/icons'

const steps = [
  {
    num: '01',
    Icon: Icon.Smartphone,
    title: 'Choisissez vos pastels',
    desc: 'Parcourez notre menu de saveurs artisanales — poulet, viande, poisson, jambon. Ajoutez vos favoris au panier.',
  },
  {
    num: '02',
    Icon: Icon.Wallet,
    title: 'Confirmez et payez',
    desc: 'Paiement via Orange Money, Wave ou WhatsApp. Simple, rapide et sécurisé.',
  },
  {
    num: '03',
    Icon: Icon.Truck,
    title: 'Livraison chez vous',
    desc: "Vos pastels arrivent frais ou surgelés, partout en Côte d'Ivoire, dans les meilleurs délais.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-void py-16 sm:py-24" aria-label="Comment commander">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="rule" />
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta-soft font-semibold">
              Simple et rapide
            </span>
            <span className="rule" />
          </div>
          <h2 className="font-display font-semibold text-cream text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] tracking-tightest">
            Commander en trois temps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream/8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative py-10 md:py-0 md:px-10 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0 reveal reveal-delay-${i + 1}`}
            >
              {/* Background number */}
              <span
                className="step-number absolute top-2 right-0 md:top-0 md:right-4 select-none pointer-events-none"
                aria-hidden="true"
              >
                {step.num}
              </span>

              {/* Icon circle */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-terracotta/15 border border-terracotta/25 inline-flex items-center justify-center text-terracotta mb-6">
                <step.Icon className="w-6 h-6" />
              </div>

              <h3 className="relative z-10 font-display font-semibold text-cream leading-snug tracking-tight mb-3"
                style={{ fontSize: '1.75rem' }}
              >
                {step.title}
              </h3>
              <p className="relative z-10 text-cream/55 text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
