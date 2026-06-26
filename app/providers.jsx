'use client'

import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/context/ToastContext'
import CartDrawer from '@/components/CartDrawer'
import StickyCartBar from '@/components/StickyCartBar'

export function Providers({ children }) {
  return (
    <CartProvider>
      <ToastProvider>
        {children}
        <CartDrawer />
        <StickyCartBar />
      </ToastProvider>
    </CartProvider>
  )
}
