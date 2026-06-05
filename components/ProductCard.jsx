'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [added,    setAdded]    = useState(false)
  const { addToCart } = useCart()

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const decrement = () => setQuantity(q => Math.max(1, q - 1))
  const increment = () => setQuantity(q => Math.min(20, q + 1))

  return (
    <article className="bg-cream rounded-3xl overflow-hidden border-t-4 border-primary shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 flex flex-col group">

      {/* Image / Placeholder */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-orange-light flex items-center justify-center">
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2" aria-hidden="true">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center shadow-orange"
              style={{ background: `linear-gradient(135deg, rgba(232,130,26,.15), rgba(245,200,66,.10))` }}
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${product.color} flex items-center justify-center shadow-inner`}>
                <span className="text-5xl filter drop-shadow-md">{product.emoji}</span>
              </div>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`font-pacifico text-xs px-3 py-1.5 rounded-full shadow-sm ${
              product.category === 'pastel'
                ? 'bg-primary text-cream'
                : 'bg-emerald-500 text-white'
            }`}
          >
            {product.category === 'pastel' ? 'Pastel' : 'Jus frais'}
          </span>
        </div>

        {/* Bestseller badge */}
        {product.bestseller && (
          <div className="absolute top-3 right-3">
            <span className="bg-accent text-secondary text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
              ⭐ Top vente
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        {/* Name */}
        <h3 className="font-fraunces font-bold text-secondary text-[1.05rem] leading-snug mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-text-light text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Unit badge */}
        {product.unit && (
          <div className="mb-4">
            <span className="text-xs bg-secondary/8 text-text-light px-3 py-1 rounded-full font-medium">
              <span aria-hidden="true">📦</span> {product.unit}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="font-cormorant font-bold text-primary text-3xl leading-none mb-4" aria-label={`Prix : ${formatPrice(product.price)}`}>
          {formatPrice(product.price)}
        </div>

        {/* Quantity selector */}
        <div
          className="flex items-center gap-3 mb-4"
          role="group"
          aria-label={`Quantité de ${product.name}`}
        >
          <span className="text-sm font-medium text-text-light" id={`qty-lbl-${product.id}`}>Qté :</span>
          <div className="flex items-center gap-1">
            <button
              onClick={decrement}
              aria-label="Diminuer la quantité"
              className="w-9 h-9 rounded-full bg-primary/12 hover:bg-primary hover:text-cream text-primary font-bold text-lg flex items-center justify-center transition-all duration-200 select-none"
            >
              −
            </button>
            <span
              className="w-9 text-center font-bold text-secondary text-base select-none"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              onClick={increment}
              aria-label="Augmenter la quantité"
              className="w-9 h-9 rounded-full bg-primary/12 hover:bg-primary hover:text-cream text-primary font-bold text-lg flex items-center justify-center transition-all duration-200 select-none"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          aria-live="polite"
          aria-label={added ? `${product.name} ajouté au panier` : `Ajouter ${product.name} au panier`}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-250 flex items-center justify-center gap-2 min-h-[48px] ${
            added
              ? 'bg-emerald-500 text-white scale-[.97]'
              : 'bg-btn-gradient text-secondary hover:shadow-orange btn-glow'
          }`}
        >
          {added ? (
            <>
              <svg className="w-5 h-5 scale-bounce" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Ajouté au panier !
            </>
          ) : (
            <>
              <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter au panier
            </>
          )}
        </button>
      </div>
    </article>
  )
}
