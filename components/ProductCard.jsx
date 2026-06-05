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
    setTimeout(() => setAdded(false), 2000)
  }

  const decrement = () => setQuantity(q => Math.max(1, q - 1))
  const increment = () => setQuantity(q => Math.min(20, q + 1))

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">

      {/* Image / Placeholder */}
      <div className="relative h-52 overflow-hidden bg-cream">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${product.color} flex items-center justify-center`}>
            <span className="text-7xl drop-shadow-lg">{product.emoji}</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestseller && (
            <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
              ⭐ Bestseller
            </span>
          )}
          {product.badges?.slice(0, 2).map(badge => (
            <span key={badge} className="bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1.5">
          {product.category === 'pastel' ? '🥟 Pastel artisanal' : '🧃 Jus frais'}
        </div>

        {/* Name */}
        <h3 className="font-playfair text-[1.05rem] font-bold text-dark leading-tight mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Unit */}
        {product.unit && (
          <p className="text-xs text-gray-400 mb-4 font-medium">📦 {product.unit}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-playfair text-2xl font-bold text-secondary">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-gray-600">Qté :</span>
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={decrement}
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-bold text-gray-600 hover:text-primary"
            >
              −
            </button>
            <span className="w-10 text-center font-bold text-dark">{quantity}</span>
            <button
              onClick={increment}
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-bold text-gray-600 hover:text-primary"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-500 text-white scale-95'
              : 'bg-primary text-white hover:bg-primary-dark hover:shadow-md active:scale-95'
          }`}
        >
          {added ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Ajouté au panier !
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Ajouter au panier
            </>
          )}
        </button>
      </div>
    </div>
  )
}
