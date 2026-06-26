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
  const [scrolled, setScrolled]    = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const isHome   = pathname === '/'

  /* Styles adaptatifs : transparent sur hero sombre (accueil), solide sinon */
  const navBg = scrolled
    ? 'bg-void/92 backdrop-blur-md border-b border-cream/8 shadow-[0_1px_0_rgba(251,245,236,.06)]'
    : isHome
    ? 'bg-transparent border-b border-transparent'
    : 'bg-cream shadow-soft border-b border-border'

  const logoColor   = scrolled || isHome ? 'text-cream'       : 'text-ink'
  const logoSub     = scrolled || isHome ? 'text-cream/40'    : 'text-muted'
  const linkBase    = scrolled || isHome ? 'text-cream/65 hover:text-cream' : 'text-ink-soft hover:text-ink'
  const linkActive  = 'text-terracotta'
  const cartBg      = scrolled || isHome ? 'bg-cream/10 hover:bg-terracotta text-cream border border-cream/15 hover:border-terracotta' : 'bg-ink text-cream hover:bg-terracotta border border-transparent'
  const burgerColor = scrolled || isHome ? 'text-cream hover:bg-cream/10'   : 'text-ink hover:bg-ink/5'

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${navBg}`}>
        <nav className="max-w-8xl mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">

          {/* Wordmark */}
          <Link href="/" aria-label="Le Panier d'Elif — Accueil" className={`group flex items-baseline gap-2 shrink-0 transition-colors duration-300 ${logoColor}`}>
            <span className="font-display font-semibold italic text-2xl sm:text-[1.7rem] leading-none tracking-tightest">
              elif
            </span>
            <span className={`hidden sm:block text-[11px] uppercase tracking-[0.18em] font-medium translate-y-[-2px] transition-colors duration-300 ${logoSub}`}>
              Le Panier
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive(href) ? linkActive : linkBase
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
              className={`relative inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-medium transition-all duration-250 ${cartBg}`}
            >
              <Icon.Bag className="w-[17px] h-[17px]" />
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span className="min-w-[20px] h-5 px-1 inline-flex items-center justify-center rounded-full bg-terracotta text-cream text-[11px] font-bold tabular-nums">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className={`md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full transition-colors ${burgerColor}`}
            >
              {menuOpen ? <Icon.X className="w-5 h-5" /> : <Icon.Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-void/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-[78%] max-w-xs bg-void md:hidden transition-transform duration-350 ease-out border-l border-cream/8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-7">
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-semibold italic text-cream text-2xl">elif</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-cream/8 hover:bg-cream/15 text-cream transition-colors"
            >
              <Icon.X className="w-5 h-5" />
            </button>
          </div>

          <nav aria-label="Menu mobile">
            <ul className="flex flex-col">
              {navLinks.map(({ href, label }, i) => (
                <li key={href} className={i > 0 ? 'border-t border-cream/8' : ''}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? 'page' : undefined}
                    className={`flex items-center justify-between py-4 text-lg font-display ${
                      isActive(href) ? 'text-terracotta' : 'text-cream/80'
                    }`}
                  >
                    {label}
                    <Icon.ArrowUpRight className="w-5 h-5 text-cream/30" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/boutique"
            className="mt-auto inline-flex items-center justify-center gap-2 w-full h-14 rounded-full bg-terracotta text-cream font-medium hover:bg-terracotta-dark transition-colors btn-shimmer"
          >
            Commander maintenant
            <Icon.ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  )
}
