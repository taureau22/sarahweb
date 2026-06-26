'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

export default function ProductCard({ product }) {
  const { items, addToCart, updateQuantity, atLimit } = useCart()
  const { addToast } = useToast()

  const inCart = items.find(i => i.id === product.id)
  const qty = inCart?.quantity || 0

  const add = () => {
    if (qty === 0) {
      if (atLimit) return addToast('Limite atteinte (20 articles / 100 000 FCFA)', 'error')
      addToCart(product, 1)
      addToast(`${product.shortName || product.name} ajouté`)
    } else {
      if (atLimit) return addToast('Limite atteinte (20 articles / 100 000 FCFA)', 'error')
      updateQuantity(product.id, qty + 1)
    }
  }
  const dec = () => updateQuantity(product.id, qty - 1)

  return (
    <article className="group relative bg-surface rounded-4xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden bg-terra-bg">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 50vw, 280px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${product.color || 'from-gold to-terracotta'} shadow-lift`} />
          </div>
        )}

        {/* Bestseller badge */}
        {product.bestseller && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-surface/95 text-ink backdrop-blur-sm shadow-soft">
            <Icon.StarFilled className="w-3 h-3 text-gold" /> Best-seller
          </span>
        )}

        {/* In-cart counter chip */}
        {qty > 0 && (
          <span className="absolute top-3 right-3 min-w-[26px] h-[26px] px-1.5 inline-flex items-center justify-center rounded-full bg-terracotta text-white text-xs font-bold tabular-nums shadow-terra">
            {qty}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 pt-3.5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-ink text-[15px] leading-snug line-clamp-2">
          {product.shortName || product.name}
        </h3>
        <p className="text-muted text-xs mt-1 line-clamp-1">{product.unit}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="font-display font-semibold text-ink text-lg leading-none tabular-nums">
            {formatPrice(product.price)}
          </p>

          {/* Quick add / stepper */}
          {qty === 0 ? (
            <button
              onClick={add}
              aria-label={`Ajouter ${product.name}`}
              className="w-10 h-10 rounded-full bg-ink text-white inline-flex items-center justify-center hover:bg-terracotta transition-colors active:scale-90 shrink-0"
            >
              <Icon.Plus className="w-5 h-5" strokeWidth={2.25} />
            </button>
          ) : (
            <div
              className="inline-flex items-center bg-terracotta text-white rounded-full h-10 shadow-terra"
              role="group"
              aria-label={`Quantité de ${product.name}`}
            >
              <button onClick={dec} aria-label="Retirer un" className="w-10 h-10 inline-flex items-center justify-center active:scale-90 transition-transform">
                <Icon.Minus className="w-4 h-4" strokeWidth={2.25} />
              </button>
              <span className="min-w-[18px] text-center text-sm font-bold tabular-nums" aria-live="polite">{qty}</span>
              <button onClick={add} aria-label="Ajouter un" className="w-10 h-10 inline-flex items-center justify-center active:scale-90 transition-transform">
                <Icon.Plus className="w-4 h-4" strokeWidth={2.25} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
