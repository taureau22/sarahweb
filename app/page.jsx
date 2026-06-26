import Image from 'next/image'
import MenuBrowser from '@/components/MenuBrowser'
import { Icon } from '@/components/icons'

const TRUST = [
  { Ico: Icon.ChefHat,  t: 'Fait main',         s: 'Pâte maison, frit du jour' },
  { Ico: Icon.Wallet,   t: 'Mobile Money',      s: 'Orange Money · Wave' },
  { Ico: Icon.Truck,    t: 'Livré à Abidjan',   s: 'Rapide, chez vous' },
]

const STEPS = [
  { n: '1', Ico: Icon.Bag,        t: 'Composez',  s: 'Ajoutez pastels & jus au panier.' },
  { n: '2', Ico: Icon.CreditCard, t: 'Payez',     s: 'Orange Money ou Wave, sécurisé.' },
  { n: '3', Ico: Icon.Truck,      t: 'Recevez',   s: 'On livre, encore croustillant.' },
]

export default function HomePage() {
  return (
    <div className="pt-16">

      {/* Hero banner */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-4xl shadow-card">
          <Image
            src="/images/cover.jpeg"
            alt="Pastels artisanaux Le Panier d'Elif"
            width={1100}
            height={620}
            priority
            className="w-full h-[clamp(20rem,52vw,28rem)] object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(28,18,8,0.15) 0%, rgba(28,18,8,0.35) 45%, rgba(28,18,8,0.82) 100%)' }}
          />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 text-white">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 mb-4">
              <Icon.Clock className="w-3.5 h-3.5 text-gold" /> Livraison Abidjan · 30–45 min
            </span>
            <h1 className="font-display font-semibold text-[clamp(2rem,6vw,3.25rem)] leading-[1.02] tracking-tight max-w-xl">
              Le bon pastel,
              <br /><span className="italic text-terra-2">livré chez vous.</span>
            </h1>
            <p className="mt-3 text-white/80 text-sm sm:text-base max-w-md">
              Pastels faits main &amp; jus frais d&apos;Abidjan. Commandez en deux minutes.
            </p>
            <a
              href="#menu"
              className="mt-5 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-terracotta text-white font-medium hover:bg-[#D2761C] transition-colors shadow-terra active:scale-95"
            >
              Commander maintenant <Icon.ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Trust chips */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3">
          {TRUST.map(({ Ico, t, s }) => (
            <div key={t} className="bg-surface border border-border rounded-2xl p-3 sm:p-4 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-terra-bg text-terracotta flex items-center justify-center shrink-0">
                <Ico className="w-[18px] h-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-ink leading-tight truncate">{t}</span>
                <span className="block text-[11px] text-muted leading-tight truncate">{s}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section title */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 pb-1">
        <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl">Notre menu</h2>
        <p className="text-muted text-sm mt-1">Choisissez, ajoutez, on s&apos;occupe du reste.</p>
      </div>

      {/* Menu (search + tabs + grid) */}
      <MenuBrowser />

      {/* How it works */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl text-center mb-10">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STEPS.map(({ n, Ico, t, s }) => (
              <div key={n} className="relative bg-bg border border-border rounded-3xl p-6">
                <span className="absolute top-5 right-5 font-display text-4xl text-border leading-none">{n}</span>
                <span className="w-12 h-12 rounded-2xl bg-terracotta text-white flex items-center justify-center mb-4 shadow-terra">
                  <Ico className="w-6 h-6" />
                </span>
                <h3 className="font-display font-semibold text-ink text-lg mb-1">{t}</h3>
                <p className="text-muted text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
