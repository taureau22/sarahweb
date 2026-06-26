'use client'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 2000)
    const t2 = setTimeout(() => setPhase('done'), 2900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      data-phase={phase}
      className="loader-wrap"
    >
      <div className="loader-curtain loader-curtain-top" />
      <div className="loader-curtain loader-curtain-bottom" />
      <div className={`loader-content${phase === 'exit' ? ' loader-content--exit' : ''}`}>
        <p className="loader-logo">elif</p>
        <p className="loader-sub">Le Panier</p>
        <div className="loader-bar">
          <span className="loader-bar-fill" />
        </div>
        <p className="loader-tagline">Artisanal · Abidjan</p>
      </div>
    </div>
  )
}
