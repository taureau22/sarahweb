import { Icon } from '@/components/icons'

const values = [
  { Ico: Icon.ChefHat,    label: 'Pétri et garni à la main' },
  { Ico: Icon.Leaf,       label: 'Ingrédients frais du marché' },
  { Ico: Icon.Truck,      label: 'Livraison partout en CI' },
  { Ico: Icon.Snowflake,  label: 'Option surgelé disponible' },
  { Ico: Icon.Sparkles,   label: 'Recette artisanale' },
  { Ico: Icon.ShieldCheck, label: 'Qualité garantie' },
]

export default function ValueStrip() {
  const items = [...values, ...values]

  return (
    <div
      className="bg-terracotta overflow-hidden py-3.5"
      aria-label="Nos engagements"
    >
      <div
        className="flex whitespace-nowrap animate-marquee"
        aria-hidden="true"
      >
        {items.map(({ Ico, label }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 text-cream text-sm font-medium px-6"
          >
            <Ico className="w-4 h-4 text-cream/70 shrink-0" />
            {label}
            <span className="text-cream/35 mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
