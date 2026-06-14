import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

const testimonials = [
  { name: 'Awa K.',          location: 'Cocody',   initial: 'A', text: 'Les meilleurs pastels d\'Abidjan, sans hésitation. La pâte est parfaite — croustillante dehors, moelleuse dedans. Ma famille en redemande chaque semaine.' },
  { name: 'Jean-Baptiste M.', location: 'Marcory',  initial: 'J', text: 'Commandé 50 pastels pour un anniversaire — disparus en 15 minutes. Tout le monde était bluffé, et la livraison ultra-rapide.' },
  { name: 'Fatou D.',        location: 'Yopougon', initial: 'F', text: 'Les pastels surgelés sont une révélation. J\'en stocke et je fris quand j\'ai envie. Pratique, délicieux, vraiment artisanal.' },
]

function Card({ t }) {
  return (
    <figure className="bg-surface rounded-3xl border border-border p-7 flex flex-col gap-5 h-full">
      <div className="flex text-clay" aria-label="Note : 5 sur 5">
        {[...Array(5)].map((_, i) => <Icon.StarFilled key={i} className="w-4 h-4" />)}
      </div>
      <blockquote className="font-display italic text-ink text-lg leading-relaxed flex-1">
        « {t.text} »
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
        <span className="w-11 h-11 rounded-full bg-terracotta-tint text-terracotta font-display font-semibold inline-flex items-center justify-center" aria-hidden="true">
          {t.initial}
        </span>
        <span>
          <span className="block font-medium text-ink text-sm">{t.name}</span>
          <span className="block text-muted text-xs">{t.location}, Abidjan</span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-cream-2 py-20 sm:py-28" aria-label="Témoignages clients">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        <RevealSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="rule" />
              <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">Avis clients</span>
              <span className="rule" />
            </div>
            <h2 className="font-display font-semibold text-ink text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tightest">
              Des familles qui <span className="italic text-terracotta">reviennent</span>
            </h2>
          </div>
        </RevealSection>

        {/* Mobile : carrousel swipe */}
        <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide touch-scroll pb-4 -mx-5 px-5">
          {testimonials.map(t => (
            <div key={t.name} className="touch-scroll-item flex-shrink-0 w-[82vw] max-w-sm">
              <Card t={t} />
            </div>
          ))}
        </div>

        {/* Desktop : grille */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <RevealSection key={t.name} delay={i + 1} className="h-full">
              <Card t={t} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
