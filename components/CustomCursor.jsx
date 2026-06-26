'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const ring = ringRef.current
    const dot  = dotRef.current

    let mouseX = -200, mouseY = -200
    let ringX  = -200, ringY  = -200
    let rafId  = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      ring.classList.add('is-visible')
      dot.classList.add('is-visible')
    }

    const onLeave = () => {
      ring.classList.remove('is-visible')
      dot.classList.remove('is-visible')
    }

    const onHoverIn  = () => ring.classList.add('is-hovering')
    const onHoverOut = () => ring.classList.remove('is-hovering')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    /* Attache les événements sur les éléments interactifs (y compris futurs) */
    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"], label[for]').forEach(el => {
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    attachHover()

    /* Smooth follow pour le ring (lerp) */
    const loop = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
    </>
  )
}
