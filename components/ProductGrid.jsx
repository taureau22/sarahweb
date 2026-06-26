import ProductCard from '@/components/ProductCard'

/**
 * Grille de produits responsive.
 * Mobile : carrousel horizontal avec scroll-snap.
 * sm+ : grille classique 2 colonnes, lg+ : 4 colonnes.
 */
export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-muted text-center py-12">Aucun produit disponible.</p>
    )
  }

  return (
    <>
      {/* Mobile carousel */}
      <div className="flex overflow-x-auto touch-scroll scrollbar-hide gap-4 -mx-5 px-5 pb-4 sm:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="touch-scroll-item shrink-0 min-w-[78%] xs:min-w-[72%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
