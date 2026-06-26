'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

export default function Navbar() {
  const { totalItems, totalPrice, openDrawer } = useCart()
  const pathname = usePathname()
  const onCart = pathname === '/panier'

  if (pathname?.startsWith('/admin')) return null

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 min-w-0 group">
          <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-terra-2 to-terracotta text-white flex items-center justify-center shadow-terra shrink-0">
            <Icon.ChefHat className="w-5 h-5" strokeWidth={2} />
          </span>
          <span className="min-w-0">
            <span className="block font-display font-semibold text-ink text-[17px] leading-none truncate">
              Le Panier d&apos;Elif
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted mt-1 leading-none">
              <Icon.MapPin className="w-3 h-3 text-terracotta" /> Abidjan · Fait maison
            </span>
          </span>
        </Link>

        {/* Cart pill */}
        {!onCart && (
          <button
            onClick={openDrawer}
            aria-label={`Ouvrir le panier, ${totalItems} article${totalItems > 1 ? 's' : ''}`}
            className="relative flex items-center gap-2 h-11 pl-3.5 pr-2 rounded-full bg-ink text-white text-sm font-medium hover:bg-terracotta transition-colors duration-200 active:scale-95 shrink-0"
          >
            <Icon.Bag className="w-[18px] h-[18px]" />
            {totalItems > 0 ? (
              <span className="tabular-nums hidden xs:inline">{formatPrice(totalPrice)}</span>
            ) : (
              <span className="hidden xs:inline">Panier</span>
            )}
            <span className="min-w-[22px] h-[22px] px-1.5 inline-flex items-center justify-center rounded-full bg-gold text-ink text-[11px] font-bold tabular-nums">
              {totalItems}
            </span>
          </button>
        )}
      </div>
    </header>
  )
}
