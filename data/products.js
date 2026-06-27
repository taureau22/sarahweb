import productsData from './products.json'

// Source of truth = data/products.json (éditable via /admin).
// En dev, toute modification du JSON est rechargée à chaud par Next.
export const products = productsData

export function formatPrice(amount) {
  // Séparateur de milliers déterministe (espace ASCII) — évite les
  // différences d'Intl entre serveur Node et navigateur (mismatch d'hydratation).
  const n = Math.round(Number(amount) || 0)
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA'
}

export const fraisProducts   = products.filter(p => p.category === 'frais')
export const surgeleProducts = products.filter(p => p.category === 'surgele')
