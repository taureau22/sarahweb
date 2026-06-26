'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function GsapProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
    }
  }, [])

  return <>{children}</>
}
