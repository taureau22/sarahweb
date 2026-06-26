'use client'

import { useEffect } from 'react'

export default function GsapProvider({ children }) {
  useEffect(() => {
    let lenis
    let cleanupScrollTrigger

    async function init() {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])

        gsap.registerPlugin(ScrollTrigger)

        lenis = new Lenis({
          lerp: 0.09,
          smoothWheel: true,
          syncTouch: false,
        })

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        cleanupScrollTrigger = () => {
          ScrollTrigger.getAll().forEach(t => t.kill())
        }
      } catch {}
    }

    init()

    return () => {
      if (lenis) lenis.destroy()
      if (cleanupScrollTrigger) cleanupScrollTrigger()
    }
  }, [])

  return <>{children}</>
}
