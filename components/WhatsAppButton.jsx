'use client'

import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'

export default function WhatsAppButton() {
  const pathname = usePathname()
  const WA  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
  const msg = encodeURIComponent("Bonjour Le Panier d'Elif ! Je souhaite passer une commande.")

  /* Masqué sur le panier pour ne pas gêner le formulaire */
  if (pathname === '/panier') return null

  return (
    <a
      href={`https://wa.me/${WA}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Commander via WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-0 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white shadow-lift transition-all duration-300 overflow-hidden safe-bottom"
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
