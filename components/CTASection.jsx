import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons'

const badges = [
  { Icon: Icon.Truck,       label: 'Livraison partout en CI' },
  { Icon: Icon.ShieldCheck, label: 'Qualité garantie' },
  { Icon: Icon.Wallet,      label: 'Orange Money · Wave' },
]

export default function CTASection() {
  const WA  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
  const msg = encodeURIComponent("Bonjour Le Panier d'Elif ! Je souhaite passer une commande.")

  return (
    <section className="bg-cream py-12 sm:py-16" aria-label="Commander maintenant">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-4xl overflow-hidden isolate">

          {/* Background image */}
          <Image
            src="/images/03_pastels-frits.png"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            aria-hidden="true"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(12,8,6,0.88) 0%, rgba(12,8,6,0.65) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 70% 50%, rgba(176,81,46,0.18) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 text-center py-20 sm:py-28 px-5 sm:px-16 reveal">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="rule" />
              <span className="text-xs uppercase tracking-[0.18em] text-terracotta-soft font-semibold">
                Prêt à commander ?
              </span>
              <span className="rule" />
            </div>

            <h2 className="font-display font-semibold text-cream text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tightest max-w-2xl mx-auto">
              Commandez vos pastels dès maintenant
            </h2>

            <p className="text-cream/60 mt-5 text-lg max-w-lg mx-auto leading-relaxed">
              Frais ou surgelés, livrés chez vous partout en Côte d'Ivoire.
              Paiement simple et sécurisé.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-terracotta text-cream font-medium hover:bg-terracotta-dark transition-colors btn-shimmer"
              >
                Voir le menu <Icon.ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${WA}?text=${msg}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Commander via WhatsApp"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-cream/25 text-cream font-medium hover:border-cream/50 transition-colors"
              >
                <Icon.WhatsApp className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Guarantee badges */}
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10 mt-10">
              {badges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-cream/55 text-sm">
                  <b.Icon className="w-4 h-4 text-terracotta-soft" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
