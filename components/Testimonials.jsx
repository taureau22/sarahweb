import RevealSection from '@/components/RevealSection'

const testimonials = [
  {
    name: 'Awa K.',
    location: 'Cocody',
    avatar: 'A',
    color: 'from-primary to-primary-dark',
    text: 'Les meilleurs pastels d\'Abidjan, sans hésitation ! La pâte est parfaite — croustillante dehors, moelleuse dedans. Ma famille en redemande chaque semaine !',
  },
  {
    name: 'Jean-Baptiste M.',
    location: 'Marcory',
    avatar: 'J',
    color: 'from-secondary to-[#3D1A00]',
    text: 'J\'ai commandé pour l\'anniversaire de ma femme — 50 pastels disparus en 15 minutes ! Tout le monde était bluffé. La livraison était ultra-rapide aussi.',
  },
  {
    name: 'Fatou D.',
    location: 'Yopougon',
    avatar: 'F',
    color: 'from-accent to-primary',
    text: 'Les pastels surgelés sont une vraie révélation ! J\'en stocke au congélo et je fris quand j\'ai envie. Pratique, délicieux et vraiment artisanal. Merci Elif !',
  },
]

export default function Testimonials() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF8EE 0%, #FFF0D4 50%, #FFF8EE 100%)' }}
      aria-label="Témoignages de nos clients"
    >
      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,130,26,.2), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <RevealSection className="text-center mb-14">
          <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3 font-dm">Ils nous font confiance</p>
          <h2 className="font-cormorant font-bold text-secondary text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
            Ce qu'ils disent{' '}
            <span className="italic text-gradient">de nous</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px bg-primary/30 flex-1 max-w-[100px]" />
            <span className="text-xl text-accent" aria-hidden="true">★★★★★</span>
            <div className="h-px bg-primary/30 flex-1 max-w-[100px]" />
          </div>
          <p className="text-text-light font-dm text-sm">Des centaines de familles satisfaites à Abidjan</p>
        </RevealSection>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <RevealSection key={t.name} delay={i + 1}>
              <figure className="bg-white rounded-4xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 p-7 flex flex-col gap-5 h-full">

                {/* Stars */}
                <div className="text-accent text-lg tracking-wider" aria-label="Note : 5 étoiles sur 5">
                  <span aria-hidden="true">★★★★★</span>
                </div>

                {/* Quote */}
                <div className="relative flex-1">
                  <span className="absolute -top-2 -left-1 text-5xl text-primary/15 font-cormorant font-bold leading-none select-none" aria-hidden="true">"</span>
                  <blockquote className="font-fraunces italic text-secondary/80 text-sm sm:text-base leading-relaxed pt-2">
                    {t.text}
                  </blockquote>
                </div>

                {/* Author */}
                <figcaption className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-cream font-bold text-base flex-shrink-0 shadow-sm`}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-fraunces font-bold text-secondary text-sm">{t.name}</div>
                    <div className="text-text-light text-xs font-dm">{t.location}, Abidjan</div>
                  </div>
                </figcaption>
              </figure>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
