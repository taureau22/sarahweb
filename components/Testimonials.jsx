import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

const testimonials = [
  {
    name: 'Awa K.',
    location: 'Cocody',
    initial: 'A',
    text: "Les meilleurs pastels d'Abidjan, sans hésitation. La pâte est parfaite — croustillante dehors, moelleuse dedans. Ma famille en redemande chaque semaine.",
  },
  {
    name: 'Jean-Baptiste M.',
    location: 'Marcory',
    initial: 'J',
    text: "Commandé 50 pastels pour un anniversaire — disparus en 15 minutes. Tout le monde était bluffé, et la livraison ultra-rapide.",
  },
  {
    name: 'Fatou D.',
    location: 'Yopougon',
    initial: 'F',
    text: "Les pastels surgelés sont une révélation. J'en stocke et je fris quand j'ai envie. Pratique, délicieux, vraiment artisanal.",
  },
]

function TestiCard({ t }) {
  return (
    <figure className="h-full flex flex-col gap-6 p-7 sm:p-8 rounded-3xl bg-void-soft border-terra-glow group hover:border-terracotta/40 transition-colors duration-400">
      {/* Étoiles */}
      <div className="flex gap-0.5 text-clay" aria-label="Note : 5 sur 5">
        {[...Array(5)].map((_, i) => <Icon.StarFilled key={i} className="w-4 h-4" />)}
      </div>

      {/* Guillemet décoratif */}
      <blockquote className="font-display italic text-cream/75 text-lg sm:text-xl leading-relaxed flex-1">
        « {t.text} »
      </blockquote>

      {/* Auteur */}
      <figcaption className="flex items-center gap-3 pt-5 border-t border-cream/8">
        <span
          className="w-11 h-11 rounded-full bg-terracotta/20 text-terracotta-soft font-display font-semibold text-lg inline-flex items-center justify-center ring-1 ring-terracotta/20 shrink-0"
          aria-hidden="true"
        >
          {t.initial}
        </span>
        <span>
          <span className="block font-medium text-cream text-sm">{t.name}</span>
          <span className="block text-cream/35 text-xs">{t.location}, Abidjan</span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <section className="section-void py-24 sm:py-32" aria-label="Témoignages clients">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        <RevealSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="rule" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.22em] text-cream/40 font-medium">Avis clients</span>
              </div>
              <h2
                className="font-display font-semibold text-cream leading-[1.0] tracking-tightest"
                style={{ fontSize: 'clamp(2rem,5.5vw,3.6rem)' }}
              >
                Des familles qui{' '}
                <em className="not-italic text-terracotta">reviennent</em>
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex text-clay gap-0.5">
                {[...Array(5)].map((_, i) => <Icon.StarFilled key={i} className="w-4 h-4" />)}
              </div>
              <span className="text-cream/40 text-sm">5.0 — +500 avis</span>
            </div>
          </div>
        </RevealSection>

        {/* Mobile : carrousel swipe */}
        <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide touch-scroll pb-4 -mx-5 px-5">
          {testimonials.map(t => (
            <div key={t.name} className="touch-scroll-item flex-shrink-0 w-[82vw] max-w-sm">
              <TestiCard t={t} />
            </div>
          ))}
        </div>

        {/* Desktop : grille */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <RevealSection key={t.name} delay={i + 1} className="h-full">
              <TestiCard t={t} />
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  )
}
