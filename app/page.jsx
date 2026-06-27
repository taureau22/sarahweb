import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import MenuBrowser from '@/components/MenuBrowser'
import { Icon } from '@/components/icons'

const STEPS = [
  { n: '1', Ico: Icon.Bag,        t: 'Composez',  s: 'Ajoutez vos pastels au panier.' },
  { n: '2', Ico: Icon.CreditCard, t: 'Payez',     s: 'Orange Money ou Wave, sécurisé.' },
  { n: '3', Ico: Icon.Truck,      t: 'Recevez',   s: 'On livre, encore croustillant.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero typographique animé */}
      <Hero />

      {/* Bandeau défilant */}
      <Marquee />

      {/* Titre menu */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 pb-1 reveal">
        <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl">Notre menu</h2>
        <p className="text-muted text-sm mt-1">Choisissez, ajoutez, on s&apos;occupe du reste.</p>
      </div>

      {/* Menu (recherche + onglets + grille) */}
      <MenuBrowser />

      {/* Comment ça marche */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl text-center mb-10 reveal">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STEPS.map(({ n, Ico, t, s }, idx) => (
              <div key={n} className={`relative bg-bg border border-border rounded-3xl p-6 reveal reveal-delay-${idx + 1}`}>
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
    </>
  )
}
