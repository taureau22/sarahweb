import Link from 'next/link'

export const metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente du Panier d'Elif — pastels artisanaux à Abidjan.",
  robots: { index: false },
}

export default function CGVPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-sm text-primary hover:underline">← Retour à l'accueil</Link>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary mt-4 mb-2">
            Conditions Générales de Vente
          </h1>
          <p className="text-sm text-gray-400">Dernière mise à jour : juin 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-10 space-y-8 text-sm text-gray-600 leading-relaxed">

          {/* Article 1 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 1 — Identification du vendeur</h2>
            <p>
              Le Panier d'Elif est une activité commerciale exercée à titre individuel par une auto-entrepreneuse basée à Abidjan,
              Côte d'Ivoire. Contact : <strong>+225 07 58 44 00 09</strong>.
            </p>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 2 — Produits</h2>
            <p>
              Les produits proposés sont des pastels artisanaux faits main (pastels frits, surgelés) et des jus de fruits frais,
              préparés à Abidjan. Les produits sont disponibles dans la limite des stocks disponibles.
              En cas d'indisponibilité après commande, le client est contacté par téléphone ou WhatsApp dans les meilleurs délais.
            </p>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 3 — Prix</h2>
            <p>
              Les prix sont indiqués en Franc CFA (FCFA) toutes taxes comprises. Le Panier d'Elif se réserve le droit
              de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur
              au moment de la validation de la commande.
            </p>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 4 — Commande</h2>
            <p>
              La commande est validée après remplissage du formulaire en ligne et paiement effectif.
              Une confirmation est transmise par WhatsApp ou par téléphone. Le Panier d'Elif se réserve le droit
              de refuser ou d'annuler toute commande en cas d'impossibilité de livraison dans la zone demandée
              ou de rupture de stock.
            </p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 5 — Paiement</h2>
            <p>
              Le paiement s'effectue en ligne via la plateforme sécurisée <strong>CinetPay</strong> (MTN Mobile Money,
              Orange Money, Wave, Moov Money). Le paiement doit être complété avant la préparation de la commande.
              Aucune donnée bancaire n'est stockée sur notre site.
            </p>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 6 — Livraison</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>La livraison est assurée dans les communes d'Abidjan.</li>
              <li>Les frais de livraison sont communiqués au client avant confirmation.</li>
              <li>Le délai de livraison est généralement de <strong>1 à 3 heures</strong> selon la commune, après confirmation.</li>
              <li>Le Panier d'Elif ne peut être tenu responsable de retards dus à des causes extérieures (circulation, intempéries).</li>
            </ul>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 7 — Annulation et remboursement</h2>
            <p className="mb-2">
              Compte tenu de la nature périssable des produits alimentaires, <strong>toute commande confirmée et préparée
              ne peut pas être annulée ni remboursée.</strong>
            </p>
            <p>
              En cas d'erreur de notre part (produit manquant, produit incorrect) ou de non-livraison,
              un remboursement ou un avoir sera proposé au client dans les 24 heures.
            </p>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 8 — Réclamations</h2>
            <p>
              Toute réclamation doit être adressée dans les <strong>2 heures suivant la réception</strong> des produits,
              par WhatsApp au <strong>+225 07 58 44 00 09</strong> ou par email.
              Une photo du produit concerné pourra être demandée.
            </p>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 9 — Données personnelles</h2>
            <p>
              Les informations collectées (nom, téléphone, adresse) sont utilisées uniquement pour le traitement et
              la livraison de la commande. Elles ne sont ni vendues, ni transmises à des tiers.
              Conformément à la réglementation ivoirienne, vous disposez d'un droit d'accès et de rectification
              de vos données en contactant Le Panier d'Elif directement.
            </p>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="font-playfair font-bold text-secondary text-lg mb-3">Article 10 — Droit applicable</h2>
            <p>
              Les présentes conditions générales de vente sont soumises au droit ivoirien.
              En cas de litige, une solution amiable sera recherchée en priorité.
            </p>
          </section>

        </div>

        <div className="mt-8 text-center">
          <Link href="/boutique" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:bg-primary-dark transition-all">
            🛒 Retour à la boutique
          </Link>
        </div>

      </div>
    </div>
  )
}
