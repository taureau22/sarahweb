import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🥟</span>
              <div>
                <div className="font-playfair font-bold text-xl leading-none">Le Panier d'Elif</div>
                <div className="text-xs text-white/60 mt-0.5">Fait maison · Abidjan</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-xs">
              Des pastels artisanaux préparés chaque jour avec des ingrédients frais.
              Depuis 2024, nous régalons les familles d'Abidjan avec amour.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Instagram', emoji: '📸', href: '#' },
                { label: 'Facebook',  emoji: '📘', href: '#' },
                { label: 'WhatsApp',  emoji: '💬', href: '#' },
                { label: 'TikTok',    emoji: '🎵', href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                   className="w-9 h-9 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center text-base transition-all duration-200 hover:scale-110">
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/',         label: 'Accueil' },
                { href: '/boutique', label: 'Boutique' },
                { href: '/panier',   label: 'Mon panier' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-primary text-sm transition-colors hover:translate-x-1 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span>📍</span> Abidjan, Côte d'Ivoire
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span> +225 07 58 44 00 09
              </li>
              <li className="flex items-start gap-2">
                <span>🕐</span> Lun–Sam · 8h00–20h00
              </li>
              <li className="flex items-start gap-2">
                <span>💳</span> MTN, Orange, Wave, Moov
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© 2025 Le Panier d'Elif. Tous droits réservés.</span>
          <span>Fait avec ❤️ à Abidjan, Côte d'Ivoire</span>
        </div>
      </div>
    </footer>
  )
}
