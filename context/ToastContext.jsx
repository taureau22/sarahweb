'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Icon } from '@/components/icons'

const ToastContext = createContext(null)

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), 3000)
    return () => clearTimeout(t)
  }, [toast.id, onRemove])

  const isError = toast.type === 'error'
  const isInfo  = toast.type === 'info'

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 pl-3 pr-4 py-3 rounded-2xl shadow-lift bg-ink text-white text-sm font-medium max-w-xs"
      style={{ animation: 'slideInRight .35s cubic-bezier(.22,.61,.36,1) both' }}
    >
      <span className={`w-7 h-7 inline-flex items-center justify-center rounded-full flex-shrink-0 ${
        isError ? 'bg-terracotta' : isInfo ? 'bg-gold' : 'bg-olive'
      }`}>
        {isError ? <Icon.X className="w-4 h-4" /> : <Icon.Check className="w-4 h-4" />}
      </span>
      <span className="leading-snug">{toast.message}</span>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), [])
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev.slice(-2), { id, message, type }])
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        aria-label="Notifications"
        className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map(t => <ToastItem key={t.id} toast={t} onRemove={removeToast} />)}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}
