'use client'

import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

export default function CartSummary({ showPayButton = false, onPay }) {
  const { items, totalPrice, totalItems } = useCart()

  if (items.length === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="font-playfair text-xl font-bold text-secondary mb-5">
        Récapitulatif
      </h2>

      {/* Items recap */}
      <div className="space-y-2 mb-5">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <span className="text-gray-600 line-clamp-1 flex-1 pr-2">
              {item.shortName || item.name} × {item.quantity}
            </span>
            <span className="font-semibold text-dark whitespace-nowrap">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Livraison</span>
          <span className="text-primary font-medium">À définir</span>
        </div>
        <div className="flex justify-between items-baseline font-bold text-lg border-t border-gray-100 pt-3 mt-3">
          <span className="text-dark">Total</span>
          <span className="font-playfair text-2xl text-secondary">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {totalPrice >= 5000 && (
        <p className="text-xs text-green-600 font-medium mt-3 text-center">
          🎉 Livraison gratuite à partir de 5 000 FCFA !
        </p>
      )}

      {showPayButton && onPay && (
        <button
          onClick={onPay}
          className="w-full mt-5 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg text-sm"
        >
          💳 Payer — {formatPrice(totalPrice)}
        </button>
      )}
    </div>
  )
}
