'use client'

import Link from 'next/link'

export default function AnnulationPage() {
  const handleWhatsApp = () => {
    const WA  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250000000000'
    const msg = "Bonjour ! Mon paiement en ligne n'a pas abouti. Je voudrais finaliser ma commande via WhatsApp 🙏"
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <div className="pt-16 min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full">

        {/* Cancel card */}
        <div className="bg-white rounded-3xl shadow-card-hover p-8 sm:p-12 text-center">
          <div className="text-7xl mb-6">😕</div>

          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary mb-3">
            Paiement non finalisé
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Ne vous inquiétez pas — votre panier est toujours là, rien n'a été perdu.
            Vous pouvez réessayer ou nous contacter directement via WhatsApp.
          </p>

          {/* Causes */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-left mb-8">
            <p className="text-sm font-semibold text-red-700 mb-3">💡 Pourquoi ce problème ?</p>
            <ul className="text-sm text-red-600 space-y-1.5 list-disc list-inside">
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
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
            >
              🔄 Réessayer le paiement
            </Link>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
            >
              💬 Commander via WhatsApp
            </button>
            <Link
              href="/boutique"
              className="w-full border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-2xl hover:border-primary hover:text-primary transition-all text-center"
            >
              🛒 Retourner à la boutique
            </Link>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-700 text-center">
          Besoin d'aide ? Appelez-nous au{' '}
          <strong>+225 XX XX XX XX XX</strong> ou via WhatsApp.
        </div>
      </div>
    </div>
  )
}
