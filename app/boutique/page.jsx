import MenuBrowser from '@/components/MenuBrowser'

export const metadata = {
  title: 'Le menu — Pastels & Jus frais',
  description: "Commandez nos pastels artisanaux et jus frais, livrés à Abidjan. Paiement Orange Money & Wave.",
}

export default function BoutiquePage() {
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
      <MenuBrowser />
    </div>
  )
}
