import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/icons'

export default function CTASection() {
  const WA    = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
  const waMsg = encodeURIComponent("Bonjour Le Panier d'Elif ! Je souhaite passer une commande.")

  return (
    <section className="section-void py-20 sm:py-28" aria-label="Commander maintenant">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        <div className="grain relative rounded-4xl overflow-hidden isolate min-h-[440px] sm:min-h-[520px] flex items-center justify-center">

          {/* Image de fond */}
          <Image
            src="/images/pastels-frits.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Couches de gradient pour lisibilité */}
          <div className="absolute inset-0 bg-void/70" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(176,81,46,.30) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Contenu */}
          <div className="relative z-[2] px-6 sm:px-14 py-16 sm:py-20 text-center max-w-2xl mx-auto">

            <div className="inline-flex items-center gap-3 mb-6">
              <span className="rule-sm" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.22em] text-cream/45 font-medium">Une petite faim ?</span>
              <span className="rule-sm" aria-hidden="true" />
            </div>

            <h2
              className="font-display font-semibold text-cream leading-[0.95] tracking-tightest mb-6"
              style={{ fontSize: 'clamp(2.4rem,6vw,4.4rem)' }}
            >
              Commandez vos pastels
              <br />
              <em className="not-italic text-terracotta">dès maintenant</em>
            </h2>

            <p className="text-cream/55 text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Frais ou surgelés, livrés partout en Côte d'Ivoire.
              Paiement Orange Money · Wave.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-cream text-ink font-medium hover:bg-white transition-colors duration-250 shadow-lift btn-shimmer"
              >
                Voir le menu <Icon.ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`https://wa.me/${WA}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-whatsapp text-white font-medium hover:bg-whatsapp-dark transition-colors duration-250 btn-shimmer"
              >
                <Icon.WhatsApp className="w-5 h-5" /> WhatsApp
              </a>
            </div>

            {/* Garanties */}
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mt-10 pt-8 border-t border-cream/10">
              {[
                { Ico: Icon.ShieldCheck, label: 'Paiement sécurisé' },
                { Ico: Icon.Smartphone,  label: 'Mobile Money CI' },
                { Ico: Icon.Truck,       label: 'Livraison express' },
              ].map(({ Ico, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-cream/40 text-sm">
                  <Ico className="w-[17px] h-[17px] text-terracotta-soft" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
