import productsData from './products.json'

// Source of truth = data/products.json (éditable via /admin).
// En dev, toute modification du JSON est rechargée à chaud par Next.
export const products = productsData

export function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
}

export const fraisProducts   = products.filter(p => p.category === 'frais')
export const surgeleProducts = products.filter(p => p.category === 'surgele')
