'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const [scrolled, setScrolled]    = useState(false)
  const [menuOpen, setMenuOpen]    = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Header background logic
  const navBg = scrolled
    ? 'bg-void/92 backdrop-blur-md border-b border-cream/8 shadow-soft'
    : isHome
      ? 'bg-transparent border-b border-transparent'
      : 'bg-cream border-b border-border'

  // Text colour logic
  const textCream = scrolled || isHome
  const linkBase  = textCream
    ? 'text-cream/80 hover:text-cream'
    : 'text-ink-soft hover:text-ink'
  const logoColor = textCream ? 'text-cream' : 'text-ink'

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${navBg}`}
        role="banner"
      >
        <nav
          className="max-w-8xl mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Le Panier d'Elif — Accueil"
            className={`flex flex-col leading-none shrink-0 ${logoColor}`}
          >
            <span className="font-display font-semibold italic text-2xl leading-none tracking-tightest">
              elif
            </span>
            <span className="text-[0.5rem] uppercase tracking-[0.22em] opacity-50 mt-0.5">
              Le Panier
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive(href)
                      ? 'text-terracotta'
                      : linkBase
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openDrawer}
              aria-label={`Panier${totalItems > 0 ? ` — ${totalItems} article${totalItems > 1 ? 's' : ''}` : ' vide'}`}
              className={`relative inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-medium transition-colors duration-250 ${
                textCream
                  ? 'bg-cream/10 text-cream hover:bg-cream/20'
                  : 'bg-ink/5 text-ink hover:bg-ink/10'
              }`}
            >
              <Icon.Bag className="w-[18px] h-[18px]" />
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span
                  className="min-w-[20px] h-5 px-1 inline-flex items-center justify-center rounded-full bg-terracotta text-cream text-[10px] font-bold tabular-nums"
                  aria-hidden="true"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full transition-colors ${
                textCream
                  ? 'text-cream hover:bg-cream/10'
                  : 'text-ink hover:bg-ink/5'
              }`}
            >
              <Icon.Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile drawer */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 bottom-0 z-[90] w-4/5 max-w-xs bg-void flex flex-col md:hidden transition-transform duration-350 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream/8">
          <span className="font-display font-semibold italic text-cream text-2xl tracking-tightest">
            elif
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full text-cream/60 hover:text-cream hover:bg-cream/10 transition-colors"
          >
            <Icon.X className="w-5 h-5" />
          </button>
        </div>

        <nav aria-label="Menu mobile" className="flex-1 flex flex-col justify-center px-8 gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`py-4 font-display text-3xl font-semibold tracking-tight border-b border-cream/8 transition-colors ${
                isActive(href)
                  ? 'text-terracotta'
                  : 'text-cream hover:text-terracotta'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-8 pb-10 safe-bottom">
          <button
            onClick={() => { openDrawer(); setMenuOpen(false) }}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-terracotta text-cream font-medium hover:bg-terracotta-dark transition-colors"
          >
            <Icon.Bag className="w-4 h-4" />
            Mon panier{totalItems > 0 ? ` (${totalItems})` : ''}
          </button>
        </div>
      </aside>
    </>
  )
}
