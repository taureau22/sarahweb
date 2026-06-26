'use client'

import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Icon } from '@/components/icons'

export default function WhatsAppButton() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const WA  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250758440009'
  const msg = encodeURIComponent("Bonjour Le Panier d'Elif ! Je souhaite passer une commande.")

  // Hidden on checkout & admin pages
  if (pathname === '/panier' || pathname?.startsWith('/admin')) return null

  // Lift above the sticky cart bar when items are present
  const lifted = totalItems > 0

  return (
    <a
      href={`https://wa.me/${WA}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Commander via WhatsApp"
      className={`group fixed right-4 sm:right-5 z-40 inline-flex items-center h-14 rounded-full bg-whatsapp hover:bg-[#1DA851] text-white shadow-lift transition-all duration-300 overflow-hidden ${
        lifted ? 'bottom-[5.75rem]' : 'bottom-5'
      }`}
    >
      <span className="w-14 h-14 inline-flex items-center justify-center shrink-0">
        <Icon.WhatsApp className="w-7 h-7" />
      </span>
      <span className="max-w-0 group-hover:max-w-[180px] transition-all duration-300 overflow-hidden whitespace-nowrap text-sm font-medium pr-0 group-hover:pr-5">
        Commander
      </span>
    </a>
  )
}
