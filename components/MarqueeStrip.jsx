const items = [
  'Fait main',
  'Pastels artisanaux',
  'Jus frais',
  'Livraison CI',
  'Abidjan',
  'Fait maison',
]

export default function MarqueeStrip() {
  // Duplicate for seamless infinite loop
  const all = [...items, ...items]

  return (
    <div
      className="bg-terracotta overflow-hidden py-3.5"
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-white font-medium text-sm tracking-wide px-5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block flex-shrink-0"
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
