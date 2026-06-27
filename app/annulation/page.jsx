'use client'

import Link from 'next/link'
import { Icon } from '@/components/icons'
import { WHATSAPP_NUMBER } from '@/lib/site'

export default function AnnulationPage() {
  const handleWhatsApp = () => {
    const WA  = WHATSAPP_NUMBER
    const msg = "Bonjour ! Mon paiement en ligne n'a pas abouti. Je voudrais finaliser ma commande via WhatsApp."
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-bg flex items-center justify-center px-5 py-16">
      <div className="max-w-lg w-full">

        <div className="bg-surface rounded-3xl border border-border shadow-card p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-terra-bg rounded-full flex items-center justify-center mx-auto mb-6 text-terracotta">
            <Icon.X className="w-9 h-9" strokeWidth={2} />
          </div>

          <h1 className="font-display font-semibold text-ink text-4xl mb-3">
            Paiement <span className="italic text-terracotta">non finalisé</span>
          </h1>
          <p className="text-ink-2 text-[15px] leading-relaxed mb-8">
            Ne vous inquiétez pas — votre panier est intact, rien n'a été perdu.
            Réessayez ou commandez directement via WhatsApp.
          </p>

          <div className="bg-bg border border-border rounded-2xl p-5 text-left mb-8" role="note">
            <p className="font-medium text-ink text-sm mb-3">Pourquoi ce problème ?</p>
            <ul className="text-sm text-ink-2 space-y-2">
              {[
                'Solde insuffisant sur le compte Mobile Money',
                'Délai de confirmation dépassé',
                'Transaction annulée manuellement',
                'Problème de réseau temporaire',
              ].map(c => (
                <li key={c} className="flex items-start gap-2">
                  <Icon.ChevronRight className="w-4 h-4 text-terracotta shrink-0 mt-0.5" /> {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/panier"
              className="w-full h-13 py-4 rounded-full bg-terracotta text-white font-medium inline-flex items-center justify-center gap-2 hover:bg-[#D2761C] transition-colors"
            >
              Réessayer le paiement
            </Link>
            <button
              onClick={handleWhatsApp}
              className="w-full h-13 py-4 rounded-full bg-whatsapp hover:bg-[#1DA851] text-white font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Icon.WhatsApp className="w-5 h-5" /> Commander via WhatsApp
            </button>
            <Link
              href="/boutique"
              className="w-full h-12 rounded-full border border-border text-ink font-medium inline-flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors"
            >
              Retourner à la boutique
            </Link>
          </div>
        </div>

        <div className="mt-5 bg-terra-bg border border-terracotta/20 rounded-2xl p-5 flex items-start gap-3">
          <Icon.Phone className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
          <p className="text-ink-2 text-sm leading-relaxed">
            Besoin d'aide ? Appelez-nous au{' '}
            <a href="tel:+2250710669990" className="font-medium text-ink hover:text-terracotta transition-colors">
              +225 07 10 66 99 90
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
