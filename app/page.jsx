import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: "Le Panier d'Elif — Pastels artisanaux & Jus frais",
}

const testimonials = [
  {
    name: 'Aminata Koné',
    location: 'Cocody',
    text: 'Les meilleurs pastels d\'Abidjan sans hésitation ! La pâte est parfaite, croustillante dehors et moelleuse dedans. Ma famille en redemande à chaque fois !',
    avatar: 'A',
  },
  {
    name: 'Jean-Baptiste Assahoré',
    location: 'Marcory',
    text: 'J\'ai commandé pour l\'anniversaire de ma femme — 50 pastels disparus en 15 minutes ! Tout le monde était impressionné. Le jus de bissap était exceptionnel aussi.',
    avatar: 'J',
  },
  {
    name: 'Fatoumata Diallo',
    location: 'Yopougon',
    text: 'Les pastels surgelés sont une révélation ! J\'en stocke toujours au congélo et je les fris quand j\'ai envie. Pratique et délicieux. Merci Elif 🙏',
    avatar: 'F',
  },
]

const features = [
  { emoji: '🤲', title: 'Recettes artisanales', text: 'Chaque pastel est pétri et garni à la main selon notre recette familiale transmise avec passion.' },
  { emoji: '🌿', title: 'Ingrédients frais', text: 'Poulet, poisson, viande — tous nos ingrédients sont sélectionnés frais chaque matin du marché.' },
  { emoji: '❄️', title: 'Surgelés disponibles', text: 'Commandez en grande quantité. Nos pastels surgelés se conservent et se frient à la maison.' },
  { emoji: '🚀', title: 'Livraison rapide', text: 'Réception express dans votre quartier. Paiement Mobile Money sécurisé via CinetPay.' },
]

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden pt-16">
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
              🏆 1 an de bonheur depuis 2024 · Abidjan
            </div>

            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-6">
              Le Panier<br />
              <span className="text-amber-300">d'Elif</span>
            </h1>

            <p className="text-white/85 text-lg sm:text-xl leading-relaxed mb-10 max-w-md">
              Des pastels faits main, livrés avec amour.<br />
              Croquez dans l'authentique ivoirien.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-amber-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-base"
              >
                🛒 Commander maintenant
              </Link>
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200 text-base"
              >
                Voir le menu →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
              {[
                { value: '5', label: 'Saveurs pastels' },
                { value: '5', label: 'Jus frais' },
                { value: '100%', label: 'Fait maison' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-playfair text-3xl font-black text-amber-300">{s.value}</div>
                  <div className="text-white/60 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative lg:flex items-center justify-center hidden">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
              <Image
                src="/images/pastels-handmade.jpg"
                alt="Pastels artisanaux Le Panier d'Elif"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 40vw"
              />
            </div>
            {/* Float card */}
            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <span className="text-3xl">🤲</span>
              <div>
                <div className="font-bold text-dark text-sm">Fait main</div>
                <div className="text-xs text-gray-500">Chaque jour</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 text-center">
              <div className="text-yellow-400 text-base">★★★★★</div>
              <div className="font-bold text-dark text-sm mt-1">Top rated</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHIFFRES CLÉS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { emoji: '🥟', value: '5 variétés', label: 'de pastels artisanaux' },
              { emoji: '🤲', value: '100% Fait main', label: 'sans conservateurs' },
              { emoji: '🚀', value: 'Livraison rapide', label: 'dans tout Abidjan' },
            ].map(stat => (
              <div key={stat.value} className="p-6 rounded-2xl bg-cream border border-primary/10">
                <div className="text-3xl mb-3">{stat.emoji}</div>
                <div className="font-playfair font-bold text-lg text-secondary">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-secondary mb-4">
              Nos Spécialités
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Pastels dorés et jus frais — découvrez nos créations artisanales préparées avec amour chaque matin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
            >
              Voir tout le menu →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-secondary mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-gray-500">Ce qui nous rend uniques et irrésistibles</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-card transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.emoji}</div>
                <h3 className="font-playfair font-bold text-secondary mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-secondary mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-gray-500">Des centaines de familles satisfaites à Abidjan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl shadow-card p-6">
                <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-dark text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 bg-cta-gradient">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-6">
            Prêt à régaler vos papilles ?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Commandez maintenant — paiement Mobile Money sécurisé. Livraison dans toute la commune.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-amber-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              🛒 Commander maintenant
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250000000000'}?text=${encodeURIComponent("Bonjour Le Panier d'Elif 🥟 ! Je souhaite passer une commande.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#1DA851] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              💬 Commander sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
