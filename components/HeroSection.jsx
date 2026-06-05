import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-hero-dark grain-overlay flex items-center overflow-hidden"
      aria-label="Bienvenue au Panier d'Elif"
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-1/4 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #E8821A, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F5C842, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E8821A, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-[70px] pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">

        {/* ===== TEXT SIDE ===== */}
        <div className="text-center lg:text-left">

          {/* Animated badge */}
          <div className="hero-anim-1 inline-flex items-center gap-2 border border-primary/50 bg-primary/10 backdrop-blur-sm text-primary text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-wide">
            <span aria-hidden="true">⭐</span>
            +500 clients satisfaits à Abidjan
          </div>

          {/* Main title */}
          <h1 className="hero-anim-2 font-cormorant leading-[0.9] mb-6">
            <span className="block text-[clamp(3.5rem,9vw,7rem)] font-bold text-cream tracking-tight">
              Le Panier
            </span>
            <span className="block text-[clamp(3.5rem,9vw,7rem)] font-bold italic text-gradient tracking-tight">
              d'Elif 🧆
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-anim-3 text-cream/70 text-base sm:text-lg font-dm mb-2 tracking-wide">
            Pastels faits main • Livrés chez vous • Abidjan
          </p>
          <p className="hero-anim-3 text-cream/50 text-sm font-dm mb-10">
            Paiement sécurisé MTN MoMo · Orange Money · Wave
          </p>

          {/* CTA buttons */}
          <div className="hero-anim-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 bg-btn-gradient text-secondary font-bold px-8 py-4 rounded-full text-base min-h-[52px] hover:shadow-orange-xl transition-all duration-200 hover:-translate-y-1 btn-glow"
            >
              <span aria-hidden="true">🧆</span>
              Commander maintenant
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 border-2 border-cream/30 text-cream font-semibold px-8 py-4 rounded-full text-base min-h-[52px] hover:bg-cream/10 hover:border-cream/60 transition-all duration-200"
            >
              Voir le menu →
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero-anim-5 flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-cream/10" aria-label="Chiffres clés">
            {[
              { value: '5', label: 'Saveurs' },
              { value: '10', label: 'pièces/paquet' },
              { value: '100%', label: 'Artisanal' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-cormorant text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-cream/50 text-xs mt-0.5 font-dm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== IMAGE SIDE ===== */}
        <div className="relative hidden lg:flex items-center justify-center" aria-hidden="true">
          {/* Glow ring */}
          <div
            className="absolute w-80 h-80 rounded-full blur-2xl opacity-30"
            style={{ background: 'radial-gradient(circle, #E8821A, transparent 70%)' }}
          />

          {/* Floating image */}
          <div className="hero-img relative z-10">
            <div className="relative w-72 h-72 xl:w-96 xl:h-96">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-110" />
              <div className="absolute inset-0 rounded-full border border-accent/20 scale-125" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-primary/20 shadow-orange-xl">
                <Image
                  src="/images/pastels-frits.png"
                  alt="Pastels artisanaux Le Panier d'Elif"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 288px, 384px"
                />
                {/* Orange overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Float card — "Fait main" */}
          <div className="absolute -bottom-4 -left-4 bg-cream rounded-2xl shadow-orange p-4 flex items-center gap-3 hero-anim-5">
            <div className="w-10 h-10 bg-btn-gradient rounded-xl flex items-center justify-center text-xl flex-shrink-0">✋</div>
            <div>
              <div className="font-fraunces font-bold text-secondary text-sm">Fait main</div>
              <div className="text-text-light text-xs">Chaque matin</div>
            </div>
          </div>

          {/* Float card — stars */}
          <div className="absolute -top-2 -right-2 bg-cream rounded-2xl shadow-orange p-3 hero-anim-5 text-center">
            <div className="text-accent text-sm font-bold tracking-wider">★★★★★</div>
            <div className="font-fraunces font-bold text-secondary text-xs mt-0.5">Top noté</div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14" fill="#FFF8EE">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  )
}
