'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

export default function ProductCard({ product }) {
  const { items, addToCart, updateQuantity, atLimit } = useCart()
  const { addToast } = useToast()
  const [selectedOption, setSelectedOption] = useState(
    product.category === 'surgele' ? null : (product.options?.[0] || null)
  )

  const itemId = selectedOption ? `${product.id}-${selectedOption.id}` : product.id
  const inCart = items.find(i => i.id === itemId)
  const qty = inCart?.quantity || 0
  const selectedPrice = selectedOption?.price ?? product.price

  const add = () => {
    if (product.category === 'surgele' && !selectedOption) {
      return addToast('Veuillez choisir une référence pour les produits surgelés.', 'error')
    }

    const itemToAdd = selectedOption ? {
      ...product,
      id: itemId,
      price: selectedPrice,
      name: `${product.name} — ${selectedOption.label}`,
      shortName: selectedOption.shortName || `${product.shortName} ${selectedOption.label}`,
      option: selectedOption.label,
    } : product

    if (qty === 0) {
      if (atLimit) return addToast('Limite atteinte (20 articles / 100 000 FCFA)', 'error')
      addToCart(itemToAdd, 1)
      addToast(`${itemToAdd.shortName || itemToAdd.name} ajouté`)
    } else {
      if (atLimit) return addToast('Limite atteinte (20 articles / 100 000 FCFA)', 'error')
      updateQuantity(itemId, qty + 1)
    }
  }
  const dec = () => updateQuantity(itemId, qty - 1)

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

        {product.options?.length > 0 && (
          <label className="mt-3 block text-sm text-ink-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Choix</span>
            <select
              value={selectedOption?.id || ''}
              onChange={(e) => {
                const option = product.options.find(o => o.id === e.target.value)
                setSelectedOption(option || null)
              }}
              className="mt-2 w-full h-12 rounded-2xl bg-bg border border-border px-4 text-sm text-ink focus:outline-none focus:border-terracotta transition-colors"
            >
              {product.category === 'surgele' && (
                <option value="">Choisir une référence...</option>
              )}
              {product.options.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </label>
        )}

        <p className="mt-2 font-display font-semibold text-ink text-xl leading-none tabular-nums">
          {formatPrice(selectedPrice)}
        </p>

        {/* Add / stepper — pleine largeur, en bas de carte */}
        <div className="mt-auto pt-3.5">
          {qty === 0 ? (
            <button
              onClick={add}
              aria-label={`Ajouter ${product.name} au panier`}
              disabled={product.category === 'surgele' && !selectedOption}
              className={`w-full h-11 rounded-full text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors active:scale-[.98] ${product.category === 'surgele' && !selectedOption ? 'bg-muted/40 cursor-not-allowed' : 'bg-ink hover:bg-terracotta'}`}
            >
              <Icon.Plus className="w-[18px] h-[18px]" strokeWidth={2.5} /> Ajouter
            </button>
          ) : (
            <div
              className="w-full h-11 p-1 flex items-center justify-between bg-terracotta text-white rounded-full shadow-terra"
              role="group"
              aria-label={`Quantité de ${product.name}`}
            >
              <button
                onClick={dec}
                aria-label="Retirer un"
                className="w-9 h-9 rounded-full bg-white/20 inline-flex items-center justify-center hover:bg-white/30 active:scale-90 transition"
              >
                <Icon.Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
              <span className="text-base font-bold tabular-nums leading-none" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={add}
                aria-label="Ajouter un"
                className="w-9 h-9 rounded-full bg-white/20 inline-flex items-center justify-center hover:bg-white/30 active:scale-90 transition"
              >
                <Icon.Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
