'use client'

import { createContext, useContext, useReducer, useState, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'LOAD_CART':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elif_cart')
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) })
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('elif_cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const addToCart     = (product, quantity = 1) => dispatch({ type: 'ADD_ITEM',        payload: { ...product, quantity } })
  const removeFromCart = (productId)             => dispatch({ type: 'REMOVE_ITEM',     payload: productId })
  const updateQuantity = (productId, quantity)   => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  const clearCart      = ()                       => dispatch({ type: 'CLEAR_CART' })

  const openDrawer  = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <CartContext.Provider value={{
      items: state.items, totalItems, totalPrice,
      addToCart, removeFromCart, updateQuantity, clearCart,
      drawerOpen, openDrawer, closeDrawer,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
