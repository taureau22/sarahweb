'use client'

import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/context/ToastContext'
import CartDrawer from '@/components/CartDrawer'

export function Providers({ children }) {
  return (
    <CartProvider>
      <ToastProvider>
        {children}
        <CartDrawer />
      </ToastProvider>
    </CartProvider>
  )
}
