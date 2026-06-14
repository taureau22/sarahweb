import ProductCard from '@/components/ProductCard'

/**
 * Affichage produits responsive :
 *  - mobile : carrousel horizontal, ~1 carte visible + aperçu de la suivante (scroll-snap, swipe)
 *  - sm+    : grille classique 2 / 4 colonnes
 * Les cartes sont toujours visibles (pas de reveal) pour éviter toute carte masquée dans le carrousel.
 */
export default function ProductGrid({ products }) {
  return (
    <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6
                    overflow-x-auto sm:overflow-visible touch-scroll sm:[scroll-snap-type:none]
                    scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0 pb-1 sm:pb-0">
      {products.map(p => (
        <div key={p.id} className="touch-scroll-item shrink-0 sm:shrink min-w-[82%] xs:min-w-[78%] sm:min-w-0">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
