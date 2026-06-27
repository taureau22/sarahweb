import Link from 'next/link'
import { Icon } from '@/components/icons'
import { WHATSAPP_NUMBER as WA } from '@/lib/site'

const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/le_panierdelif', icon: Icon.Instagram },
  { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61566931681957', icon: Icon.Facebook },
  { label: 'WhatsApp',  href: `https://wa.me/${WA}`,    icon: Icon.WhatsApp },
]

const infos = [
  { Ico: Icon.MapPin, t: 'Abidjan, Côte d’Ivoire', s: 'Livraison locale' },
  { Ico: Icon.Clock,  t: 'Lun — Sam · 8h–20h',     s: 'Orange Money · Wave' },
  { Ico: Icon.Phone,  t: '+225 07 10 66 99 90',    s: 'Commande & infos', href: `tel:+${WA}` },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-14 pb-28 sm:pb-12">

        {/* Brand */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-10 border-b border-white/10">
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-terra-2 to-terracotta text-white flex items-center justify-center">
                <Icon.ChefHat className="w-5 h-5" strokeWidth={2} />
              </span>
              <span className="font-display font-semibold text-white text-xl">Le Panier d&apos;Elif</span>
            </span>
            <p className="text-white/55 text-sm leading-relaxed">
              Pastels artisanaux faits main, frits ou surgelés, livrés partout.
            </p>
          </div>
          <div className="flex gap-2.5">
            {social.map(({ label, href, icon: Ico }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-11 h-11 inline-flex items-center justify-center rounded-2xl border border-white/15 text-white/70 hover:text-ink hover:bg-white hover:border-white transition-colors"
              >
                <Ico className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Infos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-10 border-b border-white/10">
          {infos.map(({ Ico, t, s, href }) => {
            const inner = (
              <>
                <Ico className="w-5 h-5 text-terra-2 shrink-0 mt-0.5" />
                <span>
                  <span className="block text-white text-sm font-medium">{t}</span>
                  <span className="block text-white/45 text-xs mt-0.5">{s}</span>
                </span>
              </>
            )
            return href
              ? <a key={t} href={href} className="flex items-start gap-3 hover:text-terra-2 transition-colors">{inner}</a>
              : <div key={t} className="flex items-start gap-3">{inner}</div>
          })}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} Le Panier d&apos;Elif</span>
          <span className="flex items-center gap-3">
            <Link href="/suivi" className="hover:text-white transition-colors">Suivi de commande</Link>
            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
            <Link href="/annulation" className="hover:text-white transition-colors">Annulation</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
