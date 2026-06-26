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
    if (!ring || !dot) return

    let rafId
    let mouseX = -100, mouseY = -100
    let ringX  = -100, ringY  = -100
    const lerpFactor = 0.1

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const onOver = (e) => {
      if (e.target && e.target.closest('a, button')) {
        ring.classList.add('is-hovering')
      }
    }
    const onOut = (e) => {
      if (e.target && e.target.closest('a, button')) {
        ring.classList.remove('is-hovering')
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * lerpFactor
      ringY += (mouseY - ringY) * lerpFactor
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }

    ring.classList.add('is-visible')
    dot.classList.add('is-visible')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
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
