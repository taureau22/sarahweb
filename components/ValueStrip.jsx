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
  const items = [...values, ...values]
  return (
    <section className="bg-terracotta py-4 overflow-hidden" aria-label="Nos engagements">
      <div className="flex gap-12 w-max animate-marquee">
        {items.map(({ Ico, label }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 text-cream/90 text-sm font-medium whitespace-nowrap"
          >
            <Ico className="w-[17px] h-[17px] text-cream/60" />
            {label}
            <span className="text-cream/30 ml-3" aria-hidden="true">/</span>
          </span>
        ))}
      </div>
    </section>
  )
}
