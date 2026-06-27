const ITEMS = [
  'Pastel poulet', 'Pastel poisson', 'Pastel viande', 'Jambon de dinde',
  'Fait main', 'Frais & surgelés', 'Livré à Abidjan', 'Orange Money · Wave',
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="bg-terracotta text-white overflow-hidden border-y border-black/5">
      <div className="flex w-max animate-marquee py-3">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center text-sm font-semibold uppercase tracking-wider">
            <span className="px-6">{t}</span>
            <span className="text-white/40" aria-hidden="true">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
