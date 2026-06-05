import Link from 'next/link'

export const metadata = {
  title: "Conditions Générales de Vente",
  description: "CGV du Panier d'Elif — pastels artisanaux à Abidjan.",
  robots: { index: false },
}

const articles = [
  {
    id: 1,
    title: 'Identification du vendeur',
    content: (
      <p>Le Panier d'Elif est une activité commerciale exercée à titre individuel par une auto-entrepreneuse basée à Abidjan, Côte d'Ivoire. Contact : <a href="tel:+2250758440009" className="font-bold text-primary hover:underline">+225 07 58 44 00 09</a>.</p>
    ),
  },
  {
    id: 2,
    title: 'Produits',
    content: <p>Les produits proposés sont des pastels artisanaux faits main (pastels frits, surgelés) et des jus de fruits frais, préparés à Abidjan. Les produits sont disponibles dans la limite des stocks. En cas d'indisponibilité, le client est contacté par WhatsApp dans les meilleurs délais.</p>,
  },
  {
    id: 3,
    title: 'Prix',
    content: <p>Les prix sont indiqués en Franc CFA (FCFA) toutes taxes comprises. Le Panier d'Elif se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au tarif en vigueur au moment de la validation de la commande.</p>,
  },
  {
    id: 4,
    title: 'Commande',
    content: <p>La commande est validée après remplissage du formulaire en ligne et paiement effectif. Une confirmation est transmise par WhatsApp ou téléphone. Le Panier d'Elif peut refuser toute commande en cas d'impossibilité de livraison ou de rupture de stock.</p>,
  },
  {
    id: 5,
    title: 'Paiement',
    content: <p>Le paiement s'effectue via la plateforme sécurisée <strong>CinetPay</strong> (MTN Mobile Money, Orange Money, Wave, Moov Money). Le paiement doit être complété avant la préparation. Aucune donnée bancaire n'est stockée sur notre site.</p>,
  },
  {
    id: 6,
    title: 'Livraison',
    content: (
      <ul className="list-disc list-inside space-y-1.5">
        <li>Livraison assurée dans les communes d'Abidjan.</li>
        <li>Les frais de livraison sont communiqués avant confirmation.</li>
        <li>Délai généralement de <strong>1 à 3 heures</strong> après confirmation.</li>
        <li>Le Panier d'Elif n'est pas responsable de retards dus à des causes extérieures.</li>
      </ul>
    ),
  },
  {
    id: 7,
    title: 'Annulation et remboursement',
    content: (
      <>
        <p className="mb-2">Compte tenu de la nature périssable des produits alimentaires, <strong>toute commande confirmée et préparée ne peut être ni annulée ni remboursée.</strong></p>
        <p>En cas d'erreur de notre part ou de non-livraison, un remboursement ou avoir sera proposé dans les 24 heures.</p>
      </>
    ),
  },
  {
    id: 8,
    title: 'Réclamations',
    content: <p>Toute réclamation doit être adressée dans les <strong>2 heures suivant la réception</strong> par WhatsApp au <a href="tel:+2250758440009" className="font-bold text-primary hover:underline">+225 07 58 44 00 09</a>. Une photo du produit pourra être demandée.</p>,
  },
  {
    id: 9,
    title: 'Données personnelles',
    content: <p>Les informations collectées (nom, téléphone, adresse) sont utilisées uniquement pour la livraison. Elles ne sont ni vendues ni transmises à des tiers. Vous disposez d'un droit d'accès et de rectification en nous contactant directement.</p>,
  },
  {
    id: 10,
    title: 'Droit applicable',
    content: <p>Les présentes CGV sont soumises au droit ivoirien. En cas de litige, une solution amiable sera recherchée en priorité.</p>,
  },
]

export default function CGVPage() {
  return (
    <div className="pt-[70px] min-h-screen bg-cream">

      {/* Mini hero */}
      <div className="bg-secondary grain-overlay py-16 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="text-sm text-primary hover:underline font-dm mb-6 inline-block">
            ← Retour à l'accueil
          </Link>
          <h1 className="font-cormorant font-bold text-cream text-4xl sm:text-5xl">
            Conditions Générales<br />
            <span className="italic text-gradient">de Vente</span>
          </h1>
          <p className="text-cream/50 font-dm text-sm mt-4">Dernière mise à jour : juin 2025</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 32" preserveAspectRatio="none" className="w-full h-6 sm:h-8">
            <path d="M0,16 C360,32 720,0 1080,16 C1260,24 1380,8 1440,16 L1440,32 L0,32 Z" fill="#FFF8EE" />
          </svg>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl shadow-card p-6 sm:p-10 space-y-8 font-dm text-sm text-text-light leading-relaxed">
          {articles.map(a => (
            <section key={a.id} aria-labelledby={`art${a.id}`}>
              <h2 id={`art${a.id}`} className="font-fraunces font-bold text-secondary text-lg mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                  {a.id}
                </span>
                {a.title}
              </h2>
              <div className="pl-9">{a.content}</div>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 bg-btn-gradient text-secondary font-bold px-10 py-4 rounded-full min-h-[52px] hover:shadow-orange transition-all btn-glow"
          >
            <span aria-hidden="true">🧆</span> Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  )
}
