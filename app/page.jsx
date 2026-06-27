import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import MenuBrowser from '@/components/MenuBrowser'
import { Icon } from '@/components/icons'
import { readProducts } from '@/lib/products-store'

// Catalogue live : lu depuis le stockage à chaque requête (admin → visible aussitôt).
export const dynamic = 'force-dynamic'

const STEPS = [
  { n: '1', Ico: Icon.Bag,        t: 'Composez',  s: 'Ajoutez vos pastels au panier.' },
  { n: '2', Ico: Icon.CreditCard, t: 'Payez',     s: 'Orange Money ou Wave, sécurisé.' },
  { n: '3', Ico: Icon.Truck,      t: 'Recevez',   s: 'On livre, encore croustillant.' },
]

export default async function HomePage() {
  const products = await readProducts()
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
      <MenuBrowser products={products} />

      {/* Comment ça marche */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <h2 className="font-display font-semibold text-ink text-2xl sm:text-3xl text-center mb-8 reveal">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STEPS.map(({ n, Ico, t, s }, idx) => (
              <div key={n} className={`bg-bg border border-border rounded-[28px] p-4 sm:p-5 shadow-soft hover:shadow-card transition-shadow reveal reveal-delay-${idx + 1}`}>
                <div className="flex items-start gap-3">
                  <span className="w-11 h-11 rounded-2xl bg-terracotta text-white grid place-items-center flex-shrink-0">
                    <Ico className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-ink text-base leading-tight">{t}</h3>
                      <span className="text-sm font-semibold text-border">{n}</span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{s}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
