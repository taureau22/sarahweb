import Link from 'next/link'
import { Icon } from '@/components/icons'

const social = [
  { label: 'Instagram', href: '#',                           icon: Icon.Instagram },
  { label: 'Facebook',  href: '#',                           icon: Icon.Facebook },
  { label: 'WhatsApp',  href: 'https://wa.me/2250710669990', icon: Icon.WhatsApp },
]

const navCols = [
  {
    title: 'Boutique',
    links: [
      { href: '/boutique', label: 'Tous les produits' },
      { href: '/boutique', label: 'Pastels artisanaux' },
      { href: '/boutique', label: 'Jus frais' },
      { href: '/panier',   label: 'Mon panier' },
    ],
  },
  {
    title: 'Infos',
    links: [
      { href: '/cgv',        label: 'Conditions de vente' },
      { href: '/annulation', label: 'Annulation' },
      { href: '/',           label: 'À propos' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 border-t border-white/[0.08]">
      <div className="max-w-8xl mx-auto px-5 sm:px-8 pt-16 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Brand — 2 cols */}
          <div className="lg:col-span-2 max-w-sm">
            <Link href="/" className="inline-flex items-baseline gap-2 mb-5">
              <span className="font-display font-semibold italic text-white text-3xl">elif</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">Le Panier</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Pastels artisanaux pétris à la main chaque matin, et jus pressés du jour.
              Livrés partout en Côte d'Ivoire depuis 2024.
            </p>
            <div className="flex gap-2.5">
              {social.map(({ label, href, icon: Ico }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-ink hover:bg-white hover:border-white transition-colors duration-200"
                >
                  <Ico className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-white text-xs font-semibold uppercase tracking-[0.16em] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={l.label + i}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/55 hover:text-gold transition-colors link-underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-b border-white/10">
          <div className="flex items-start gap-3">
            <Icon.MapPin className="w-5 h-5 text-terra-2 shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">Abidjan, Côte d'Ivoire</p>
              <p className="text-white/45 text-xs mt-0.5">Livraison nationale</p>
            </div>
          </div>
          <a href="tel:+2250710669990" className="flex items-start gap-3 group">
            <Icon.Phone className="w-5 h-5 text-terra-2 shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium group-hover:text-terra-2 transition-colors">
                +225 07 10 66 99 90
              </p>
              <p className="text-white/45 text-xs mt-0.5">Commande et renseignements</p>
            </div>
          </a>
          <div className="flex items-start gap-3">
            <Icon.Clock className="w-5 h-5 text-terra-2 shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">Lun — Sam · 8h–20h</p>
              <p className="text-white/45 text-xs mt-0.5">Orange Money · Wave</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>&copy; {new Date().getFullYear()} Le Panier d'Elif. Tous droits réservés.</span>
          <span className="flex items-center gap-1.5">
            Fait avec <Icon.Heart className="w-3.5 h-3.5 text-terracotta" /> à Abidjan
          </span>
        </div>
      </div>
    </footer>
  )
}
