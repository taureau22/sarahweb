import MenuBrowser from '@/components/MenuBrowser'
import { readProducts } from '@/lib/products-store'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Le menu — Pastels artisanaux',
  description: "Commandez nos pastels artisanaux faits main, frais ou surgelés, livrés à Abidjan. Paiement Orange Money & Wave.",
}

export default async function BoutiquePage() {
  const products = await readProducts()
  return (
    <div className="pt-16">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-6 pb-1">
        <h1 className="font-display font-semibold text-ink text-[clamp(2rem,5vw,3rem)] tracking-tight">
          Notre menu
        </h1>
        <p className="text-muted text-sm mt-1.5">
          Choisissez, ajoutez, on s&apos;occupe du reste.
        </p>
      </div>
      <MenuBrowser products={products} />
    </div>
  )
}
