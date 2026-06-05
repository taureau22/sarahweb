'use client'

import { useReveal } from '@/hooks/useReveal'

export default function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </div>
  )
}
