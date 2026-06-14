import { Icon } from '@/components/icons'

const values = [
  { Ico: Icon.ChefHat,   label: 'Pétri & garni à la main' },
  { Ico: Icon.Leaf,      label: 'Ingrédients frais du marché' },
  { Ico: Icon.Snowflake, label: 'Surgelés disponibles' },
  { Ico: Icon.Truck,     label: 'Livraison partout en CI' },
  { Ico: Icon.Wallet,    label: 'Orange Money · Wave' },
  { Ico: Icon.Sparkles,  label: 'Sans conservateurs' },
]

export default function ValueStrip() {
  // doublé pour un défilement continu
  const items = [...values, ...values]
  return (
    <section className="bg-ink py-4 overflow-hidden" aria-label="Nos engagements">
      <div className="flex gap-12 w-max animate-marquee">
        {items.map(({ Ico, label }, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-cream/85 text-sm font-medium whitespace-nowrap">
            <Ico className="w-[18px] h-[18px] text-clay" />
            {label}
            <span className="text-clay/50 ml-3" aria-hidden="true">/</span>
          </span>
        ))}
      </div>
    </section>
  )
}
