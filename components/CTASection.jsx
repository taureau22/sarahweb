import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/icons'

export default function CTASection() {
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
  const waMsg = encodeURIComponent("Bonjour Le Panier d'Elif ! Je souhaite passer une commande.")

  return (
    <section className="bg-cream py-20 sm:py-28" aria-label="Commander maintenant">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="grain relative rounded-4xl overflow-hidden bg-terracotta isolate">
          {/* Photo de fond */}
          <Image
            src="/images/pastels-frits.png"
            alt=""
            fill
            className="object-cover opacity-25 mix-blend-multiply"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta/80 to-terracotta-dark/90" aria-hidden="true" />

          <div className="relative z-[2] px-6 sm:px-14 py-16 sm:py-20 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.18em] text-cream/70 font-semibold">Une petite faim ?</span>
            <h2 className="font-display font-semibold text-cream text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-tightest mt-4 mb-5">
              Commandez vos pastels<br /><span className="italic">dès maintenant</span>
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-10">
              Frais ou surgelés, livrés partout en Côte d'Ivoire. Paiement Orange Money · Wave.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-cream text-ink font-medium hover:bg-white transition-colors duration-250"
              >
                Voir le menu <Icon.ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`https://wa.me/${WA}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-whatsapp text-white font-medium hover:bg-whatsapp-dark transition-colors duration-250"
              >
                <Icon.WhatsApp className="w-5 h-5" /> WhatsApp
              </a>
            </div>

            {/* Garanties */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 pt-8 border-t border-cream/15">
              {[
                { Ico: Icon.ShieldCheck, label: 'Paiement sécurisé' },
                { Ico: Icon.Smartphone,  label: 'Mobile Money CI' },
                { Ico: Icon.Truck,       label: 'Livraison express' },
              ].map(({ Ico, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-cream/75 text-sm">
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
