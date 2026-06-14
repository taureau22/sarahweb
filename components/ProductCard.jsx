'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded]       = useState(false)
  const { addToCart } = useCart()
  const { addToast }  = useToast()

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    addToast(`${product.shortName || product.name} ajouté au panier`)
    setQuantity(1)
    setTimeout(() => setAdded(false), 1800)
  }

  const dec = () => setQuantity(q => Math.max(1, q - 1))
  const inc = () => setQuantity(q => Math.min(20, q + 1))

  return (
    <article className="group bg-surface rounded-3xl overflow-hidden border border-border hover:shadow-card hover:-translate-y-1 transition-all duration-350 flex flex-col">

      {/* Visuel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-2">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="w-20 h-20 rounded-full bg-olive/10 text-olive flex items-center justify-center">
              <Icon.Leaf className="w-9 h-9" strokeWidth={1.5} />
            </div>
          </div>
        )}

        {/* Catégorie */}
        <span className={`absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm ${
          product.category === 'pastel' ? 'bg-terracotta/90 text-cream' : 'bg-olive/90 text-cream'
        }`}>
          {product.category === 'pastel' ? 'Pastel' : 'Jus frais'}
        </span>

        {/* Top vente */}
        {product.bestseller && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cream/90 text-ink backdrop-blur-sm">
            <Icon.StarFilled className="w-3 h-3 text-clay" /> Top
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-ink text-lg leading-snug mb-1.5">
          {product.shortName || product.name}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {product.unit && (
          <p className="text-xs text-ink-soft mb-4 inline-flex items-center gap-1.5">
            <Icon.Bag className="w-3.5 h-3.5 text-muted" /> {product.unit}
          </p>
        )}

        {/* Prix + actions */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted">Prix</p>
            <p className="font-display font-semibold text-ink text-2xl leading-none tabular-nums">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="inline-flex items-center border border-border rounded-full" role="group" aria-label={`Quantité de ${product.name}`}>
            <button onClick={dec} aria-label="Diminuer la quantité" className="w-9 h-9 inline-flex items-center justify-center text-ink-soft hover:text-terracotta transition-colors"><Icon.Minus className="w-4 h-4" /></button>
            <span className="w-7 text-center text-sm font-semibold text-ink tabular-nums" aria-live="polite">{quantity}</span>
            <button onClick={inc} aria-label="Augmenter la quantité" className="w-9 h-9 inline-flex items-center justify-center text-ink-soft hover:text-terracotta transition-colors"><Icon.Plus className="w-4 h-4" /></button>
          </div>
        </div>

        <button
          onClick={handleAdd}
          aria-label={added ? `${product.name} ajouté` : `Ajouter ${product.name} au panier`}
          className={`w-full h-12 rounded-full font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors duration-250 ${
            added ? 'bg-olive text-cream' : 'bg-ink text-cream hover:bg-terracotta'
          }`}
        >
          {added ? <><Icon.Check className="w-4 h-4" /> Ajouté</> : <><Icon.Plus className="w-4 h-4" /> Ajouter au panier</>}
        </button>
      </div>
    </article>
  )
}
