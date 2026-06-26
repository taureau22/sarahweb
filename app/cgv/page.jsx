import Link from 'next/link'
import { Icon } from '@/components/icons'

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
      <p>
        Le Panier d'Elif est une activité commerciale exercée à titre individuel par une auto-entrepreneuse
        basée à Abidjan, Côte d'Ivoire. Contact :{' '}
        <a href="tel:+2250710669990" className="font-medium text-terracotta hover:underline">
          +225 07 10 66 99 90
        </a>.
      </p>
    ),
  },
  {
    id: 2,
    title: 'Produits',
    content: (
      <p>
        Les produits proposés sont des pastels artisanaux faits main (pastels frits, surgelés) et des jus de
        fruits frais, préparés à Abidjan. Les produits sont disponibles dans la limite des stocks. En cas
        d'indisponibilité, le client est contacté par WhatsApp dans les meilleurs délais.
      </p>
    ),
  },
  {
    id: 3,
    title: 'Prix',
    content: (
      <p>
        Les prix sont indiqués en Franc CFA (FCFA) toutes taxes comprises. Le Panier d'Elif se réserve le
        droit de modifier ses prix à tout moment. Les produits sont facturés au tarif en vigueur au moment
        de la validation de la commande.
      </p>
    ),
  },
  {
    id: 4,
    title: 'Commande',
    content: (
      <p>
        La commande est validée après remplissage du formulaire en ligne et paiement effectif. Une
        confirmation est transmise par WhatsApp ou téléphone. Le Panier d'Elif peut refuser toute commande
        en cas d'impossibilité de livraison ou de rupture de stock.
      </p>
    ),
  },
  {
    id: 5,
    title: 'Paiement',
    content: (
      <p>
        Le paiement s'effectue via la plateforme sécurisée <strong>CinetPay</strong> (Orange Money, Wave).
        Le paiement doit être complété avant la préparation. Aucune donnée bancaire n'est stockée sur notre
        site.
      </p>
    ),
  },
  {
    id: 6,
    title: 'Livraison',
    content: (
      <ul className="list-disc list-inside space-y-1.5">
        <li>Livraison et expédition partout en Côte d'Ivoire.</li>
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
        <p className="mb-2">
          Compte tenu de la nature périssable des produits alimentaires,{' '}
          <strong>toute commande confirmée et préparée ne peut être ni annulée ni remboursée.</strong>
        </p>
        <p>
          En cas d'erreur de notre part ou de non-livraison, un remboursement ou avoir sera proposé dans
          les 24 heures.
        </p>
      </>
    ),
  },
  {
    id: 8,
    title: 'Réclamations',
    content: (
      <p>
        Toute réclamation doit être adressée dans les{' '}
        <strong>2 heures suivant la réception</strong> par WhatsApp au{' '}
        <a href="tel:+2250710669990" className="font-medium text-terracotta hover:underline">
          +225 07 10 66 99 90
        </a>. Une photo du produit pourra être demandée.
      </p>
    ),
  },
  {
    id: 9,
    title: 'Données personnelles',
    content: (
      <p>
        Les informations collectées (nom, téléphone, adresse) sont utilisées uniquement pour la livraison.
        Elles ne sont ni vendues ni transmises à des tiers. Vous disposez d'un droit d'accès et de
        rectification en nous contactant directement.
      </p>
    ),
  },
  {
    id: 10,
    title: 'Droit applicable',
    content: (
      <p>
        Les présentes CGV sont soumises au droit ivoirien. En cas de litige, une solution amiable sera
        recherchée en priorité.
      </p>
    ),
  },
]

export default function CGVPage() {
  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-bg pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-terracotta transition-colors mb-8"
        >
          <Icon.ArrowRight className="w-4 h-4 rotate-180" /> Retour à l'accueil
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="rule" />
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
              Mentions légales
            </span>
          </div>
          <h1 className="font-display font-semibold text-ink text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.02] tracking-tightest">
            Conditions générales <span className="italic text-terracotta">de vente</span>
          </h1>
          <p className="text-muted text-sm mt-4">Dernière mise à jour : juin 2025</p>
        </div>

        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-10 space-y-8 text-[15px] text-ink-2 leading-relaxed">
          {articles.map(a => (
            <section key={a.id} aria-labelledby={`art${a.id}`}>
              <h2
                id={`art${a.id}`}
                className="font-display font-semibold text-ink text-lg mb-3 flex items-center gap-3"
              >
                <span className="w-7 h-7 bg-terra-bg text-terracotta text-xs font-semibold rounded-full flex items-center justify-center flex-shrink-0 tabular-nums">
                  {a.id}
                </span>
                {a.title}
              </h2>
              <div className="pl-10">{a.content}</div>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 h-13 px-8 py-4 rounded-full bg-terracotta text-white font-medium hover:bg-[#D2761C] transition-colors"
          >
            Retour à la boutique <Icon.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
