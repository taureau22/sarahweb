'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const pathname      = usePathname()
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  /* lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/',         label: 'Accueil' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/cgv',      label: 'CGV' },
  ]

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-secondary/95 backdrop-blur-md shadow-dark py-0'
            : 'bg-transparent py-2'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" aria-label="Le Panier d'Elif — Accueil" className="flex items-center gap-2.5 shrink-0 group">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200" aria-hidden="true">🧆</span>
            <div>
              <span className="font-cormorant font-bold italic text-cream text-xl leading-none block tracking-wide">
                Le Panier d'Elif
              </span>
              <span className="text-[10px] text-primary font-dm font-medium tracking-wider block mt-0.5">
                Fait maison · Abidjan
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive(href)
                      ? 'text-primary bg-primary/10'
                      : 'text-cream/80 hover:text-cream hover:bg-white/8'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <Link
              href="/panier"
              aria-label={`Panier${totalItems > 0 ? ` — ${totalItems} article${totalItems > 1 ? 's' : ''}` : ' vide'}`}
              className="relative flex items-center gap-2 bg-btn-gradient text-secondary font-bold px-5 py-2.5 rounded-2xl text-sm hover:shadow-orange transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 min-h-[44px] btn-glow"
            >
              <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-cream text-[10px] font-bold rounded-full flex items-center justify-center pulse-orange"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <span className={`block w-5 h-0.5 bg-cream rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} aria-hidden="true" />
              <span className={`block w-5 h-0.5 bg-cream rounded transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : ''}`} aria-hidden="true" />
              <span className={`block w-5 h-0.5 bg-cream rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-secondary/70 backdrop-blur-sm md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel — slide from right */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-secondary md:hidden transition-transform duration-350 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6 pt-[86px]">
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="absolute top-6 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-cream"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Brand */}
          <div className="mb-8">
            <div className="font-cormorant font-bold italic text-cream text-2xl">Le Panier d'Elif</div>
            <div className="text-xs text-primary/80 font-medium mt-1">Fait maison · Abidjan 🧆</div>
          </div>

          {/* Links */}
          <nav aria-label="Menu mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? 'page' : undefined}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium transition-colors ${
                      isActive(href) ? 'bg-primary text-secondary' : 'text-cream/80 hover:bg-white/10 hover:text-cream'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/panier"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium text-cream/80 hover:bg-white/10 hover:text-cream transition-colors mt-1"
                >
                  🛒 Mon Panier{totalItems > 0 && ` (${totalItems})`}
                </Link>
              </li>
            </ul>
          </nav>

          {/* CTA bottom */}
          <div className="mt-auto">
            <Link
              href="/boutique"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-btn-gradient text-secondary font-bold text-base"
            >
              🧆 Commander maintenant
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
