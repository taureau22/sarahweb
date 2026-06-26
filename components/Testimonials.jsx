import { Icon } from '@/components/icons'

const testimonials = [
  {
    quote: "Les meilleurs pastels d'Abidjan, point final. La pâte est incroyablement croustillante et la farce généreuse. Je commande chaque semaine.",
    author: 'Aminata K.',
    location: 'Cocody',
  },
  {
    quote: "Service impeccable, livraison rapide et les pastels arrivent encore chauds. Vraiment artisanal, on sent la différence immédiatement.",
    author: 'Jean-Marc D.',
    location: 'Plateau',
  },
  {
    quote: "J'ai commandé les surgelés pour avoir des pastels maison quand j'en ai envie. C'est parfait — qualité identique à la livraison fraîche.",
    author: 'Fatoumata C.',
    location: 'Yopougon',
  },
]

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-clay" aria-label="5 étoiles">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon.StarFilled key={i} className="w-4 h-4" />
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <article className="bg-void-2 border border-cream/8 rounded-3xl p-7 flex flex-col gap-5 h-full hover:border-terracotta/30 transition-colors duration-300">
      <Stars />
      <blockquote className="font-display italic text-cream/90 text-lg leading-relaxed flex-1">
        "{t.quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <span
          className="w-10 h-10 rounded-full bg-terracotta/20 border border-terracotta/25 inline-flex items-center justify-center font-display font-semibold text-terracotta-soft text-sm shrink-0"
          aria-hidden="true"
        >
          {t.author.charAt(0)}
        </span>
        <div>
          <p className="text-cream text-sm font-medium">{t.author}</p>
          <p className="text-cream/40 text-xs mt-0.5">{t.location}</p>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-void py-16 sm:py-24" aria-label="Témoignages clients">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="rule" />
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta-soft font-semibold">
              Avis clients
            </span>
            <span className="rule" />
          </div>
          <h2 className="font-display font-semibold text-cream text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] tracking-tightest">
            Ce qu'ils disent
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-cream/50 text-sm">
            <div className="flex text-clay" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon.StarFilled key={i} className="w-3.5 h-3.5" />
              ))}
            </div>
            <span>500+ clients satisfaits</span>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="flex overflow-x-auto touch-scroll scrollbar-hide gap-4 -mx-5 px-5 pb-4 sm:hidden">
          {testimonials.map((t, i) => (
            <div key={i} className="touch-scroll-item shrink-0 min-w-[85%] xs:min-w-[80%]">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
