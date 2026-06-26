'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Icon } from '@/components/icons'

export default function HeroSection() {
  const textRef   = useRef(null)
  const imageRef  = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.to(textRef.current, {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.4 },
      })
      gsap.to(imageRef.current, {
        y: -35, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.8 },
      })
    }
    init()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative section-void min-h-screen flex items-center pt-20 pb-16 sm:pb-20 overflow-hidden"
      aria-label="Le Panier d'Elif"
    >
      {/* Vignette lumineuse terracotta (subtile) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 70% 60%, rgba(176,81,46,.10) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[.04]"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")" }}
           aria-hidden="true" />

      <div className="max-w-8xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ===== TEXTE ===== */}
          <div ref={textRef} className="lg:col-span-5 order-2 lg:order-1">

            {/* Eyebrow */}
            <div className="anim-1 inline-flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-px bg-terracotta rounded-full" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.22em] text-cream/45 font-medium">
                Artisanal · Abidjan · 2024
              </span>
            </div>

            {/* Titre principal — très grand */}
            <h1
              className="anim-2 font-display font-semibold text-cream leading-[0.90] tracking-tightest mb-8"
              style={{ fontSize: 'clamp(3.4rem, 9.5vw, 6.8rem)' }}
            >
              Fait main,
              <br />
              <em className="not-italic text-terracotta">chaque</em>
              <br />
              matin.
            </h1>

            {/* Description */}
            <p className="anim-3 text-cream/50 text-lg leading-relaxed max-w-sm mb-10">
              Pastels artisanales pétries à la main, jus pressés du jour.
              Livrés partout en Côte d'Ivoire.
            </p>

            {/* CTA */}
            <div className="anim-3 flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/boutique"
                className="group relative inline-flex items-center gap-3 h-14 px-8 rounded-full bg-terracotta text-cream font-medium shadow-terra btn-shimmer overflow-hidden hover:shadow-[0_8px_40px_rgba(176,81,46,.55)] transition-shadow duration-350"
              >
                Commander maintenant
                <Icon.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-250" />
              </Link>
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 text-cream/55 font-medium hover:text-cream transition-colors duration-250 link-underline-light"
              >
                Voir le menu
                <Icon.ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust */}
            <div className="anim-4 flex flex-wrap items-center gap-x-6 gap-y-3 pt-7 border-t border-cream/8">
              {[
                { Ico: Icon.ChefHat,  label: 'Fait main' },
                { Ico: Icon.Leaf,     label: 'Sans conservateurs' },
                { Ico: Icon.Truck,    label: 'Livraison CI' },
              ].map(({ Ico, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-sm text-cream/40">
                  <Ico className="w-[17px] h-[17px] text-terracotta-soft" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ===== VISUEL ===== */}
          <div ref={imageRef} className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">

              {/* Image principale — inclinée en 3D */}
              <div className="anim-img grain img-hero-3d relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-[5/4] rounded-3xl overflow-hidden bg-void-soft shadow-[0_40px_100px_rgba(0,0,0,.7)]">
                <Image
                  src="/images/cover.jpeg"
                  alt="Pastels artisanales dorées du Panier d'Elif"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                {/* Vignette bas de l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" aria-hidden="true" />
              </div>

              {/* Badge note — wrapper fadeUp, inner float3d */}
              <div className="anim-4 absolute -bottom-5 left-5 sm:left-8">
                <div
                  className="badge-float-a bg-void/90 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 border-terra-glow"
                  style={{ willChange: 'transform' }}
                >
                  <div className="flex gap-0.5 text-clay" aria-label="5 étoiles">
                    {[...Array(5)].map((_, i) => <Icon.StarFilled key={i} className="w-3.5 h-3.5" />)}
                  </div>
                  <div className="leading-tight">
                    <p className="text-cream font-semibold text-sm">+500 clients</p>
                    <p className="text-cream/40 text-xs">satisfaits à Abidjan</p>
                  </div>
                </div>
              </div>

              {/* Badge prix — wrapper fadeUp, inner float3d inverse */}
              <div className="anim-4 absolute -top-4 right-4 sm:right-6">
                <div
                  className="badge-float-b bg-terracotta rounded-2xl px-5 py-3.5 shadow-terra"
                  style={{ willChange: 'transform' }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-cream/60 mb-0.5">À partir de</p>
                  <p className="font-display font-semibold text-2xl leading-none text-cream">
                    1 000 <span className="text-sm font-sans font-normal text-cream/65">FCFA</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
