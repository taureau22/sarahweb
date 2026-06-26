'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

export default function ProductCard({ product }) {
  const [qty, setQty]     = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart }     = useCart()
  const { addToast }      = useToast()
  const cardRef           = useRef(null)
  const timerRef          = useRef(null)

  // 3D tilt on pointer:fine devices
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`
    }
    const onLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Cleanup added-state timer
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const handleAdd = () => {
    addToCart(product, qty)
    addToast(`${product.shortName || product.name} ajouté au panier`)
    setAdded(true)
    timerRef.current = setTimeout(() => setAdded(false), 1800)
  }

  const hasImage = product.image !== null && product.image !== undefined

  return (
    <article
      ref={cardRef}
      className="card-3d bg-white rounded-3xl shadow-soft hover:shadow-card border border-border/40 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-cream-2 overflow-hidden">
        {hasImage ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--clay), var(--terracotta))' }}
          >
            <Icon.Leaf className="w-10 h-10 text-white/50" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 inline-flex items-center h-6 px-2.5 rounded-full bg-void/70 backdrop-blur-sm text-cream text-[10px] font-medium uppercase tracking-wide">
          {product.category === 'pastel' ? 'Pastel' : 'Jus frais'}
        </span>

        {/* Bestseller badge */}
        {product.bestseller && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 h-6 px-2.5 rounded-full bg-terracotta text-cream text-[10px] font-medium">
            <Icon.StarFilled className="w-3 h-3" /> Top
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-ink text-lg leading-snug line-clamp-2">
          {product.shortName || product.name}
        </h3>
        <p className="text-muted text-sm mt-1.5 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {product.unit && (
          <p className="text-muted text-xs mt-1.5">{product.unit}</p>
        )}

        <p
          className="font-display font-semibold text-ink text-2xl mt-3 tabular-nums"
          aria-label={`Prix : ${formatPrice(product.price)}`}
        >
          {formatPrice(product.price)}
        </p>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-4">
          <div
            className="inline-flex items-center border border-border rounded-full shrink-0"
            role="group"
            aria-label="Quantité"
          >
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              aria-label="Diminuer la quantité"
              className="w-8 h-8 inline-flex items-center justify-center text-ink-soft hover:text-terracotta transition-colors"
            >
              <Icon.Minus className="w-4 h-4" />
            </button>
            <span
              className="w-7 text-center text-sm font-semibold text-ink tabular-nums"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              onClick={() => setQty(q => q + 1)}
              aria-label="Augmenter la quantité"
              className="w-8 h-8 inline-flex items-center justify-center text-ink-soft hover:text-terracotta transition-colors"
            >
              <Icon.Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            aria-label={added ? `${product.name} ajouté` : `Ajouter ${product.name} au panier`}
            className={`flex-1 h-10 rounded-full text-sm font-medium transition-colors duration-250 inline-flex items-center justify-center gap-1.5 ${
              added
                ? 'bg-olive text-cream'
                : 'bg-terracotta text-cream hover:bg-terracotta-dark btn-shimmer'
            }`}
          >
            {added ? (
              <><Icon.Check className="w-4 h-4" /> Ajouté</>
            ) : (
              <><Icon.Plus className="w-4 h-4" /> Ajouter</>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
