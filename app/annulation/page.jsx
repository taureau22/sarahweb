'use client'

import Link from 'next/link'

export default function AnnulationPage() {
  const handleWhatsApp = () => {
    const WA  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
    const msg = "Bonjour ! Mon paiement en ligne n'a pas abouti. Je voudrais finaliser ma commande via WhatsApp 🙏"
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <div className="pt-[70px] min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full">

        {/* Card */}
        <div className="bg-white rounded-4xl shadow-card p-8 sm:p-12 text-center">

          {/* Icon */}
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="font-cormorant font-bold text-secondary text-4xl sm:text-5xl mb-3">
            Paiement <span className="italic text-red-400">non finalisé</span>
          </h1>
          <p className="text-text-light font-dm text-sm leading-relaxed mb-8">
            Ne vous inquiétez pas — votre panier est intact, rien n'a été perdu.
            Réessayez ou commandez directement via WhatsApp.
          </p>

          {/* Causes */}
          <div
            className="bg-red-50 border border-red-100 rounded-2xl p-5 text-left mb-8"
            role="note"
            aria-label="Causes possibles de l'échec"
          >
            <p className="font-fraunces font-bold text-red-700 text-sm mb-3">
              <span aria-hidden="true">💡</span> Pourquoi ce problème ?
            </p>
            <ul className="text-sm text-red-600 space-y-1.5 font-dm list-disc list-inside">
              <li>Solde insuffisant sur votre compte Mobile Money</li>
              <li>Délai de confirmation dépassé</li>
              <li>Transaction annulée manuellement</li>
              <li>Problème de réseau temporaire</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href="/panier"
              className="w-full bg-btn-gradient text-secondary font-bold py-4 rounded-2xl min-h-[52px] flex items-center justify-center gap-2 hover:shadow-orange transition-all btn-glow"
            >
              <span aria-hidden="true">🔄</span> Réessayer le paiement
            </Link>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 rounded-2xl min-h-[52px] flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Commander via WhatsApp
            </button>
            <Link
              href="/boutique"
              className="w-full border-2 border-secondary/12 text-secondary/70 font-semibold py-3.5 rounded-2xl min-h-[44px] flex items-center justify-center gap-1.5 hover:border-primary hover:text-primary transition-all font-dm text-sm"
            >
              <span aria-hidden="true">🧆</span> Retourner à la boutique
            </Link>
          </div>
        </div>

        {/* Help */}
        <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center font-dm text-sm text-blue-700">
          Besoin d'aide ? Appelez-nous au{' '}
          <a href="tel:+2250710669990" className="font-bold hover:underline">
            +225 07 10 66 99 90
          </a>
          {' '}ou contactez-nous sur WhatsApp.
        </div>
      </div>
    </div>
  )
}
