import Link from 'next/link'
import { Icon } from '@/components/icons'

const nav1 = [
  { href: '/',         label: 'Accueil' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/cgv',      label: 'CGV' },
]

const nav2 = [
  { href: '/panier',     label: 'Mon panier' },
  { href: '/annulation', label: 'Annulation' },
  { href: '/merci',      label: 'Confirmation' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const WA   = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'

  return (
    <footer
      className="bg-void border-t border-cream/8"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="max-w-8xl mx-auto px-5 sm:px-8 pt-14 sm:pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand — 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="Le Panier d'Elif — Accueil"
              className="inline-flex flex-col leading-none mb-4"
            >
              <span className="font-display font-semibold italic text-3xl text-cream leading-none tracking-tightest">
                elif
              </span>
              <span className="text-[0.5rem] uppercase tracking-[0.22em] text-cream/40 mt-1">
                Le Panier
              </span>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs mt-3">
              Pastels artisanales faites main et jus frais pressés du jour. Livrés chez vous partout
              en Côte d'Ivoire.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2.5 mt-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-cream/10 inline-flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-colors"
              >
                <Icon.Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-cream/10 inline-flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-colors"
              >
                <Icon.WhatsApp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav column 1 */}
          <nav aria-label="Navigation">
            <h3 className="text-cream/40 text-xs uppercase tracking-[0.18em] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {nav1.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream/60 text-sm hover:text-cream transition-colors link-underline-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Nav column 2 */}
          <nav aria-label="Commandes">
            <h3 className="text-cream/40 text-xs uppercase tracking-[0.18em] mb-5">
              Commandes
            </h3>
            <ul className="space-y-3">
              {nav2.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream/60 text-sm hover:text-cream transition-colors link-underline-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact row */}
        <div className="border-t border-cream/8 mt-10 pt-8 flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-2 text-cream/45 text-sm">
            <Icon.MapPin className="w-4 h-4 text-terracotta/60 shrink-0" />
            <span>Abidjan, Côte d'Ivoire</span>
          </div>
          <div className="flex items-center gap-2 text-cream/45 text-sm">
            <Icon.Phone className="w-4 h-4 text-terracotta/60 shrink-0" />
            <a
              href="tel:+2250710669990"
              className="hover:text-cream transition-colors"
            >
              +225 07 10 66 99 90
            </a>
          </div>
          <div className="flex items-center gap-2 text-cream/45 text-sm">
            <Icon.Clock className="w-4 h-4 text-terracotta/60 shrink-0" />
            <span>Lun–Sam · 08h00–20h00</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/8 mt-6 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-cream/30">
          <span>© {year} Le Panier d'Elif — Tous droits réservés</span>
          <span>Fait avec ♥ à Abidjan</span>
        </div>
      </div>
    </footer>
  )
}
