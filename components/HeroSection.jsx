'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Icon } from '@/components/icons'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const infoRef    = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* Léger parallax : le titre "elif" monte plus vite que le reste */
      gsap.to(titleRef.current, {
        y: -100, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      })
      gsap.to(infoRef.current, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.8 },
      })
    }
    init()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-void min-h-screen flex flex-col justify-between overflow-hidden"
      aria-label="Le Panier d'Elif"
    >

      {/* Grain global */}
      <div className="pointer-events-none absolute inset-0 hero-grain" aria-hidden="true" />

      {/* ===== TITRE PRINCIPAL — image visible à travers les lettres ===== */}
      <div ref={titleRef} className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pt-20 pb-4">

        {/* Eyebrow */}
        <div className="anim-1 inline-flex items-center gap-3 mb-6 sm:mb-8">
          <span className="inline-block w-8 h-px bg-terracotta" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-cream/35 font-medium">
            Artisanal · Abidjan · Côte d'Ivoire
          </span>
        </div>

        {/* "elif" — le mot en image */}
        <h1
          className="hero-masked-title anim-2 select-none"
          aria-label="Le Panier d'Elif — Pastels artisanales et Jus frais"
        >
          elif
        </h1>

        {/* Baseline juste sous le titre */}
        <p
          className="anim-2 font-display font-semibold text-cream/70 tracking-tight leading-none mt-2 sm:mt-4"
          style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.4rem)' }}
          aria-hidden="true"
        >
          Fait main, <em className="not-italic text-terracotta">chaque matin.</em>
        </p>
      </div>

      {/* ===== BANDE BAS — description + CTA ===== */}
      <div
        ref={infoRef}
        className="relative z-10 border-t border-cream/8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/8"
      >

        {/* Col 1 — description */}
        <div className="anim-3 bg-void px-6 sm:px-8 py-6 sm:py-7 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-[0.22em] text-cream/30 font-medium">Le concept</span>
          <p className="text-cream/55 text-sm sm:text-base leading-relaxed max-w-xs">
            Pastels artisanales pétries à la main et jus pressés du jour, livrés partout en Côte d'Ivoire.
          </p>
        </div>

        {/* Col 2 — CTA principal */}
        <div className="anim-3 bg-void px-6 sm:px-8 py-6 sm:py-7 flex flex-col gap-4 justify-center">
          <Link
            href="/boutique"
            className="group relative inline-flex items-center justify-between gap-3 w-full h-14 px-6 rounded-full bg-terracotta text-cream font-medium btn-shimmer shadow-terra hover:shadow-[0_8px_40px_rgba(176,81,46,.55)] transition-shadow duration-350"
          >
            <span>Commander maintenant</span>
            <span className="w-8 h-8 rounded-full bg-cream/15 inline-flex items-center justify-center shrink-0 group-hover:bg-cream/25 transition-colors">
              <Icon.ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 text-cream/40 text-sm font-medium hover:text-cream transition-colors duration-250 link-underline-light"
          >
            Voir le menu complet
            <Icon.ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Col 3 — Trust (caché sur petits écrans) */}
        <div className="anim-4 hidden lg:flex bg-void px-8 py-7 flex-col gap-4 justify-center">
          {[
            { Ico: Icon.ChefHat,  label: 'Pétri à la main', sub: 'Aucun conservateur' },
            { Ico: Icon.Truck,    label: 'Livraison CI',     sub: "Partout en Côte d'Ivoire" },
          ].map(({ Ico, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-terracotta/12 text-terracotta flex items-center justify-center shrink-0">
                <Ico className="w-4 h-4" />
              </span>
              <div>
                <p className="text-cream/70 text-sm font-medium leading-tight">{label}</p>
                <p className="text-cream/30 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
