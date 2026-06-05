import Link from 'next/link'
import Image from 'next/image'

export default function CTASection() {
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250758440009'
  const waMsg = encodeURIComponent("Bonjour Le Panier d'Elif 🧆 ! Je souhaite passer une commande.")

  return (
    <section
      className="relative py-28 overflow-hidden grain-overlay"
      aria-label="Commander maintenant"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/pastels-handmade.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-[#2A0E00]/85 to-[#3D1A00]/80" />
      </div>

      {/* Decorative orbs */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E8821A, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-accent/50 bg-accent/10 text-accent text-xs font-bold px-4 py-2 rounded-full mb-8 tracking-widest uppercase font-dm">
          <span aria-hidden="true">🔥</span> Commandez maintenant
        </div>

        {/* Title */}
        <h2 className="font-cormorant font-bold text-cream text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
          Vous avez{' '}
          <span className="italic text-gradient">faim ?</span>
        </h2>

        <p className="text-cream/70 font-dm text-lg mb-4 leading-relaxed">
          Commandez maintenant — livraison rapide dans toute la commune d'Abidjan.
        </p>
        <p className="text-cream/50 font-dm text-sm mb-12">
          Pastels frais, surgelés, jus frais · Paiement MTN, Orange, Wave, Moov
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 bg-btn-gradient text-secondary font-bold px-10 py-4.5 rounded-full text-base min-h-[56px] hover:shadow-orange-xl transition-all duration-200 hover:-translate-y-1 btn-glow"
          >
            <span aria-hidden="true">🧆</span>
            Commander maintenant
          </Link>
          <a
            href={`https://wa.me/${WA}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-10 py-4.5 rounded-full text-base min-h-[56px] transition-all duration-200 hover:-translate-y-1 pulse-green"
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Commander sur WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10" role="list" aria-label="Garanties">
          {[
            { icon: '🔒', label: 'SSL chiffré' },
            { icon: '✅', label: 'CinetPay certifié' },
            { icon: '📱', label: 'Mobile Money CI' },
            { icon: '⚡', label: 'Livraison express' },
          ].map(b => (
            <div key={b.label} role="listitem" className="flex items-center gap-1.5 text-cream/60 text-xs font-dm">
              <span aria-hidden="true">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
