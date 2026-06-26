'use client'

import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

export default function StickyCartBar() {
  const { totalItems, totalPrice, openDrawer } = useCart()
  const pathname = usePathname()

  if (totalItems === 0 || pathname === '/panier' || pathname?.startsWith('/admin')) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 safe-bottom pointer-events-none">
      <div className="max-w-[1100px] mx-auto">
        <button
          onClick={openDrawer}
          style={{ animation: 'slideUp .35s cubic-bezier(.22,.61,.36,1) both' }}
          className="pointer-events-auto w-full h-14 pl-2 pr-5 rounded-full bg-ink text-white shadow-lift flex items-center justify-between gap-3 hover:bg-terracotta transition-colors active:scale-[.99]"
        >
          <span className="flex items-center gap-3">
            <span className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Icon.Bag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 inline-flex items-center justify-center rounded-full bg-gold text-ink text-[11px] font-bold tabular-nums">
                {totalItems}
              </span>
            </span>
            <span className="font-medium">Voir le panier</span>
          </span>
          <span className="flex items-center gap-2 font-display font-semibold text-lg tabular-nums">
            {formatPrice(totalPrice)}
            <Icon.ArrowRight className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  )
}
