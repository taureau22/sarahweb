'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { Icon } from '@/components/icons'

const navLinks = [
  { href: '/',         label: 'Accueil' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/cgv',      label: 'Infos' },
]

export default function Navbar() {
  const pathname                   = usePathname()
  const { totalItems, openDrawer } = useCart()
  const [menuOpen, setMenuOpen]    = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#F8F3EB]/90 backdrop-blur-md border-b border-border">
        <nav className="max-w-8xl mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">

          {/* Wordmark */}
          <Link href="/" aria-label="Le Panier d'Elif — Accueil" className="group flex items-baseline gap-2 shrink-0">
            <span className="font-display font-semibold italic text-ink text-2xl sm:text-[1.7rem] leading-none tracking-tightest">
              elif
            </span>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.18em] text-muted font-medium translate-y-[-2px]">
              Le Panier
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive(href)
                      ? 'text-terracotta'
                      : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openDrawer}
              aria-label={`Panier${totalItems > 0 ? ` — ${totalItems} article${totalItems > 1 ? 's' : ''}` : ' vide'}`}
              className="relative inline-flex items-center gap-2 h-11 px-4 rounded-full bg-ink text-white text-sm font-medium hover:bg-terracotta transition-colors duration-200"
            >
              <Icon.Bag className="w-[18px] h-[18px]" />
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span className="min-w-[20px] h-5 px-1 inline-flex items-center justify-center rounded-full bg-gold text-ink text-[11px] font-bold tabular-nums">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-full text-ink hover:bg-ink/5 transition-colors"
            >
              {menuOpen ? <Icon.X className="w-6 h-6" /> : <Icon.Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile panel — bg-dark */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-[78%] max-w-xs bg-dark md:hidden transition-transform duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-7">
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-semibold italic text-white text-2xl">elif</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Icon.X className="w-5 h-5" />
            </button>
          </div>

          <nav aria-label="Menu mobile">
            <ul className="flex flex-col">
              {navLinks.map(({ href, label }, i) => (
                <li key={href} className={i > 0 ? 'border-t border-white/10' : ''}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? 'page' : undefined}
                    className={`flex items-center justify-between py-4 text-lg font-display ${
                      isActive(href) ? 'text-terra-2' : 'text-white'
                    }`}
                  >
                    {label}
                    <Icon.ArrowUpRight className="w-5 h-5 text-white/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/boutique"
            className="mt-auto inline-flex items-center justify-center gap-2 w-full h-14 rounded-full bg-terracotta text-white font-medium hover:bg-[#A0451F] transition-colors"
          >
            Commander maintenant
            <Icon.ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  )
}
