'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Icon } from '@/components/icons'

export default function HeroSection() {
  const imageRef = useRef(null)

  useEffect(() => {
    let st

    async function initParallax() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        gsap.registerPlugin(ScrollTrigger)

        if (!imageRef.current) return

        st = gsap.to(imageRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current.closest('section'),
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      } catch {}
    }

    initParallax()

    return () => {
      if (st && st.scrollTrigger) st.scrollTrigger.kill()
    }
  }, [])

  return (
    <section
      className="min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[55%_45%]"
      aria-label="Le Panier d'Elif — L'Atelier du Goût"
    >
      {/* LEFT — image side */}
      <div className="relative overflow-hidden h-[55vw] lg:h-auto">
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <Image
            src="/images/cover.jpeg"
            alt="Pastels artisanaux dorés du Panier d'Elif"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
        {/* Bottom gradient for mobile text overlap */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(28,18,8,0.45) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
      </div>

      {/* RIGHT — brand text side */}
      <div className="flex flex-col justify-center px-8 xl:px-16 py-16 bg-bg">

        {/* Eyebrow */}
        <div className="reveal inline-flex items-center gap-2.5 mb-7 flex-wrap">
          <span className="rule" />
          <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
            Artisanal · Abidjan · Côte d'Ivoire
          </span>
        </div>

        {/* H1 */}
        <h1 className="reveal reveal-delay-1 font-display font-semibold text-ink leading-[0.97] tracking-tightest mb-6 text-[clamp(2.6rem,5.5vw,4.4rem)]">
          Le goût de chez nous,
          <br />
          <span className="italic text-terracotta">livré chez vous.</span>
        </h1>

        {/* Description */}
        <p className="reveal reveal-delay-2 text-ink-2 text-lg leading-relaxed max-w-sm mb-8">
          Pastels artisanaux pétris à la main chaque matin et jus pressés du jour.
          Livrés partout en Côte d'Ivoire.
        </p>

        {/* CTA */}
        <div className="reveal reveal-delay-2 flex flex-wrap items-center gap-4 mb-10">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-terracotta text-white font-medium hover:bg-[#A0451F] transition-colors duration-200 shadow-terra"
          >
            Commander maintenant
            <Icon.ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-1.5 text-ink font-medium link-underline"
          >
            Voir le menu
            <Icon.ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust strip */}
        <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-border">
          {[
            { Ico: Icon.ChefHat, label: 'Fait main' },
            { Ico: Icon.Leaf,    label: 'Sans conservateurs' },
            { Ico: Icon.Truck,   label: 'Livraison CI' },
          ].map(({ Ico, label }) => (
            <span key={label} className="inline-flex items-center gap-2 text-sm text-ink-2">
              <Ico className="w-[18px] h-[18px] text-gold" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
