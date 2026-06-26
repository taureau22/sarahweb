import Image from 'next/image'

export default function BrandStory() {
  return (
    <section className="bg-bg py-20 sm:py-28" aria-label="Notre histoire">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — editorial text */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="rule" />
              <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
                Notre atelier
              </span>
            </div>

            <blockquote>
              <p className="font-display font-semibold italic text-ink text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-tight mb-8">
                "Chaque pastel est<br />une promesse."
              </p>
            </blockquote>

            <div className="space-y-4 text-ink-2 text-[15px] leading-relaxed max-w-md">
              <p>
                Chez Le Panier d'Elif, nous croyons que la cuisine artisanale est un acte d'amour.
                Chaque pastel est façonné à la main, farci d'ingrédients soigneusement choisis,
                dans le respect des recettes transmises de génération en génération.
              </p>
              <p>
                Pas de conservateurs. Pas de compromis. Juste le vrai goût d'Abidjan,
                préparé chaque matin avec le soin et la passion qu'il mérite.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: '500+', label: 'Clients satisfaits' },
                { value: '5',    label: 'Recettes signature' },
                { value: '0',    label: 'Conservateurs' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <p className="font-display font-semibold text-terracotta text-3xl leading-none tracking-tight">
                    {value}
                  </p>
                  <p className="text-muted text-xs uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="reveal reveal-delay-2">
            <div className="grain relative aspect-square rounded-3xl overflow-hidden shadow-card">
              <Image
                src="/images/04_pastels-handmade.png"
                alt="Pastels façonnés à la main dans l'atelier du Panier d'Elif"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Warm overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-10"
                style={{ background: 'linear-gradient(135deg, #C0552F 0%, #C49A3C 100%)' }}
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
