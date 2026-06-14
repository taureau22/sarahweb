import RevealSection from '@/components/RevealSection'
import { Icon } from '@/components/icons'

const steps = [
  { n: '01', Ico: Icon.Bag,        title: 'Choisissez', text: 'Parcourez le menu et composez votre panier — pastels au poulet, viande, poisson, jambon et jus pressés.' },
  { n: '02', Ico: Icon.CreditCard, title: 'Commandez',  text: 'Renseignez votre adresse et payez en sécurité via Orange Money ou Wave, ou commandez sur WhatsApp.' },
  { n: '03', Ico: Icon.Truck,      title: 'Recevez',    text: 'Votre commande est préparée fraîche et livrée chez vous, partout en Côte d\'Ivoire.' },
]

export default function HowItWorks() {
  return (
    <section className="bg-cream-2 py-20 sm:py-28" aria-label="Comment commander">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        <RevealSection>
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="rule" />
              <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">Simple & rapide</span>
            </div>
            <h2 className="font-display font-semibold text-ink text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tightest">
              Commander en <span className="italic text-terracotta">trois temps</span>
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {steps.map((s, i) => (
            <RevealSection key={s.n} delay={i + 1} className="h-full">
              <div className="bg-cream h-full p-8 sm:p-10 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span className="w-12 h-12 rounded-full bg-terracotta-tint text-terracotta inline-flex items-center justify-center">
                    <s.Ico className="w-6 h-6" />
                  </span>
                  <span className="font-display font-semibold text-4xl text-ink/15">{s.n}</span>
                </div>
                <h3 className="font-display font-semibold text-ink text-2xl mb-3">{s.title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{s.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
