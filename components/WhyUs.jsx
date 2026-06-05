import RevealSection from '@/components/RevealSection'

const reasons = [
  {
    icon: '👩‍🍳',
    title: 'Recettes artisanales',
    text: 'Chaque pastel est pétri et garni à la main selon notre recette familiale transmise avec passion depuis des générations.',
  },
  {
    icon: '🌿',
    title: 'Ingrédients frais du marché',
    text: 'Poulet, poisson, viande, jambon — tous nos ingrédients sont sélectionnés au marché chaque matin. Aucun conservateur.',
  },
  {
    icon: '❄️',
    title: 'Surgelés disponibles',
    text: 'Commandez en grande quantité. Nos pastels surgelés se conservent parfaitement et se frient en quelques minutes.',
  },
  {
    icon: '🏍️',
    title: 'Livraison partout',
    text: 'Livraison et expédition partout en Côte d\'Ivoire. Paiement sécurisé Orange Money et Wave.',
  },
]

export default function WhyUs() {
  return (
    <section className="relative bg-secondary grain-overlay py-24 overflow-hidden" aria-label="Pourquoi choisir Le Panier d'Elif">

      {/* Top wave (cream → dark) */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" fill="#FFF8EE" />
        </svg>
      </div>

      {/* Decorative orb */}
      <div
        className="absolute right-0 top-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E8821A, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <RevealSection className="text-center mb-14">
          <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3 font-dm">Nos engagements</p>
          <h2 className="font-cormorant font-bold text-cream text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
            Pourquoi nous{' '}
            <span className="italic text-gradient">choisir ?</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px bg-primary/40 flex-1 max-w-[100px]" />
            <span className="text-xl text-primary" aria-hidden="true">✦</span>
            <div className="h-px bg-primary/40 flex-1 max-w-[100px]" />
          </div>
        </RevealSection>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <RevealSection key={r.title} delay={i + 1}>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/8 hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                {/* Orange left border accent */}
                <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-r-full opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                  {r.icon}
                </div>

                <h3 className="font-fraunces font-bold text-cream text-base mb-2 leading-tight">
                  {r.title}
                </h3>
                <p className="text-cream/55 text-sm leading-relaxed font-dm">
                  {r.text}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>

      {/* Bottom wave (dark → cream) */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z" fill="#FFF8EE" />
        </svg>
      </div>
    </section>
  )
}
