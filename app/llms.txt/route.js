import { readProducts } from '@/lib/products-store'
import { formatPrice } from '@/data/products'
import { WHATSAPP_NUMBER } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// /llms.txt — résumé structuré du site pour les IA / agents (convention llmstxt.org).
export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://lepanierdelif.ci'
  const wa = WHATSAPP_NUMBER
  const products = await readProducts()

  const productLines = products.map(p => {
    const opts = Array.isArray(p.options) && p.options.length
      ? ` (références : ${p.options.map(o => o.label).join(', ')})`
      : ''
    const cat = p.category === 'surgele' ? 'surgelé' : 'frit'
    return `- ${p.shortName || p.name} — ${formatPrice(p.price)} · ${p.unit} · ${cat}${opts}`
  }).join('\n')

  const body = `# Le Panier d'Elif

> Pâtisserie artisanale ivoirienne à Abidjan, Côte d'Ivoire. Pastels (chaussons) faits main, vendus frits (prêts à manger) ou surgelés (à frire chez soi), avec livraison. Commande et paiement en ligne via Mobile Money (Orange Money, Wave), carte bancaire, ou WhatsApp.

## Informations clés
- Nom : Le Panier d'Elif
- Localisation : Abidjan, Côte d'Ivoire
- Livraison : à confirmer lors de la commande (pas de délai ni frais standard publiés)
- Paiement : Orange Money, Wave, carte bancaire (via CinetPay), ou à convenir via WhatsApp
- Devise : FCFA (XOF)
- Horaires : lundi à samedi, 8h–20h
- WhatsApp / téléphone : +${wa}

## Produits
Tous les pastels sont à la crème et au fromage, sauf le poisson nature (sans crème ni fromage).
${productLines}

## Pages
- [Accueil](${base}/) : présentation et menu complet.
- [Boutique](${base}/boutique) : catalogue, ajout au panier.
- [Panier](${base}/panier) : finalisation de commande et paiement.
- [Conditions générales de vente](${base}/cgv)

## Comment commander
1. Choisir des pastels (pour les surgelés, sélectionner une référence : Poulet, Viande, Jambon, Poisson Crème ou Poisson Nature).
2. Aller au panier, renseigner les coordonnées de livraison.
3. Payer en ligne (Orange Money / Wave / carte) ou commander via WhatsApp.

## Contact
- WhatsApp : https://wa.me/${wa}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
