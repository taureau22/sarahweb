'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons'

const trustItems = [
  { icon: Icon.ChefHat, label: 'Fait main' },
  { icon: Icon.Leaf,    label: 'Frais du jour' },
  { icon: Icon.Truck,   label: 'Livraison CI' },
]

export default function HeroSection() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    let ctx
    const init = async () => {
      try {
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.to(imgRef.current, {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
          gsap.to(contentRef.current, {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      } catch {
        // GSAP not available or scroll disabled — no animation
      }
    }
    init()
    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Le Panier d'Elif — Pastels artisanales"
    >
      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/cover.jpeg"
          alt="Pastels artisanales dorées du Panier d'Elif"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #0C0806 0%, rgba(12,8,6,0.82) 25%, rgba(12,8,6,0.40) 60%, rgba(12,8,6,0.15) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Eyebrow — top */}
      <div className="absolute top-0 inset-x-0 pt-24 px-5 sm:px-8">
        <div className="max-w-8xl mx-auto">
          <p className="text-cream/55 text-xs uppercase tracking-[0.22em] anim-1">
            — Artisanal · Abidjan · Côte d'Ivoire
          </p>
        </div>
      </div>

      {/* Main content — bottom */}
      <div
        ref={contentRef}
        className="absolute bottom-0 inset-x-0 px-5 sm:px-8 pb-10 sm:pb-16"
      >
        <div className="max-w-8xl mx-auto">
          <div className="anim-2">
            <h1
              className="font-display font-semibold text-cream leading-[1.02] tracking-tightest max-w-2xl"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
            >
              Fait main,<br />chaque matin.
            </h1>
          </div>

          <p className="text-cream/55 text-lg sm:text-xl mt-4 max-w-md leading-relaxed anim-3">
            Pastels artisanales livrées fraîches ou surgelées, partout en Côte d'Ivoire.
          </p>

          <div className="flex flex-wrap gap-3 mt-6 sm:mt-8 anim-4">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-terracotta text-cream font-medium hover:bg-terracotta-dark transition-colors btn-shimmer"
            >
              Commander <Icon.ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-cream/20 text-cream font-medium hover:border-cream/40 transition-colors"
            >
              Voir le menu
            </Link>
          </div>

          {/* Trust strip */}
          <div className="border-t border-cream/10 pt-5 mt-8 flex flex-wrap items-center justify-between gap-4 anim-4">
            <div className="flex items-center gap-5 sm:gap-8">
              {trustItems.map(({ icon: Ico, label }) => (
                <div key={label} className="flex items-center gap-2 text-cream/65 text-sm">
                  <Ico className="w-4 h-4 text-terracotta-soft" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-cream/8 border border-cream/12 rounded-full px-4 py-2">
              <Icon.Sparkles className="w-4 h-4 text-clay" />
              <span className="text-cream/80 text-sm font-medium">À partir de 1 000 FCFA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
