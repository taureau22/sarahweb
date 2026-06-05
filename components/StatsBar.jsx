import RevealSection from '@/components/RevealSection'

const stats = [
  { icon: '🧆', value: '5',        label: 'Variétés de pastels' },
  { icon: '✋', value: '100%',     label: 'Fait main, sans conservateurs' },
  { icon: '❄️', value: 'Surgelés', label: 'Disponibles & livrables' },
  { icon: '🚀', value: 'Express',  label: 'Livraison & expédition partout' },
]

export default function StatsBar() {
  return (
    <section className="bg-orange-gradient py-6 sm:py-8 relative z-10" aria-label="Chiffres clés">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-cream/20">
          {stats.map((s, i) => (
            <RevealSection key={s.label} delay={i + 1}>
              <div className="flex flex-col items-center py-4 px-3 sm:px-6 text-center gap-1">
                <span className="text-3xl sm:text-4xl mb-1" aria-hidden="true">{s.icon}</span>
                <div className="font-cormorant font-bold text-cream text-xl sm:text-2xl leading-none">{s.value}</div>
                <div className="text-cream/70 text-xs sm:text-sm font-dm leading-tight">{s.label}</div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
