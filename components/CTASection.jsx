import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/icons'

export default function CTASection() {
  const WA    = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
  const waMsg = encodeURIComponent("Bonjour Le Panier d'Elif ! Je souhaite passer une commande.")

  return (
    <section className="bg-bg py-20 sm:py-28" aria-label="Commander maintenant">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-dark isolate">

          {/* Background image with heavy overlay */}
          <Image
            src="/images/03_pastels-frits.png"
            alt=""
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            sizes="100vw"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(28,18,8,0.92) 0%, rgba(28,18,8,0.85) 100%)' }}
            aria-hidden="true"
          />

          <div className="relative z-[2] px-6 sm:px-14 py-16 sm:py-20 text-center max-w-2xl mx-auto">

            <span className="text-xs uppercase tracking-[0.18em] text-white/60 font-semibold">
              Une petite faim ?
            </span>

            <h2 className="font-display font-semibold text-white text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-tightest mt-4 mb-5">
              Commandez vos pastels<br />
              <span className="italic text-terra-2">dès maintenant</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Frais ou surgelés, livrés partout en Côte d'Ivoire.
              Paiement Orange Money · Wave.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-terracotta text-white font-medium hover:bg-[#A0451F] transition-colors duration-200"
              >
                Voir le menu <Icon.ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`https://wa.me/${WA}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-whatsapp text-white font-medium hover:bg-[#1DA851] transition-colors duration-200"
              >
                <Icon.WhatsApp className="w-5 h-5" /> WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 pt-8 border-t border-white/10">
              {[
                { Ico: Icon.ShieldCheck, label: 'Paiement sécurisé' },
                { Ico: Icon.Smartphone,  label: 'Mobile Money CI' },
                { Ico: Icon.Truck,       label: 'Livraison express' },
              ].map(({ Ico, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-white/60 text-sm">
                  <Ico className="w-[18px] h-[18px]" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
