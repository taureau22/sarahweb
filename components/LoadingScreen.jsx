'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [phase, setPhase] = useState('in') // 'in' | 'exit' | 'done'

  useEffect(() => {
    /* Lance l'animation de sortie après 2s, retire du DOM après +1s */
    const t1 = setTimeout(() => setPhase('exit'), 2000)
    const t2 = setTimeout(() => setPhase('done'), 3050)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className="loader-wrap"
      aria-hidden="true"
      data-phase={phase}
    >
      {/* Rideau haut */}
      <div className="loader-curtain loader-curtain-top" />

      {/* Contenu central */}
      <div className={`loader-content ${phase === 'exit' ? 'loader-content--exit' : ''}`}>

        {/* Logo */}
        <p className="loader-logo">elif</p>

        {/* Sous-titre */}
        <p className="loader-sub">Le Panier</p>

        {/* Barre de progression */}
        <div className="loader-bar" role="progressbar" aria-label="Chargement">
          <span className="loader-bar-fill" />
        </div>

        {/* Tagline */}
        <p className="loader-tagline">Artisanal · Abidjan · Côte d'Ivoire</p>

      </div>

      {/* Rideau bas */}
      <div className="loader-curtain loader-curtain-bottom" />
    </div>
  )
}
