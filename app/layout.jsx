import { Cormorant_Garamond, Fraunces, DM_Sans, Pacifico } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '700', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
  weight: '400',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lepanierdelif.ci'),
  title: {
    default: "Le Panier d'Elif — Pastels artisanales & Jus frais | Livraison partout",
    template: "%s | Le Panier d'Elif",
  },
  description: "Pastels artisanales faits main livrés partout en Côte d'Ivoire. Poulet, viande, poisson, jambon. Jus frais bissap, passion, ananas. Paiement Orange Money, Wave.",
  keywords: [
    'pastels artisanaux Abidjan', 'pastels faits main Côte d\'Ivoire', 'livraison pastels',
    'pastels surgelés Abidjan', 'jus frais Abidjan', 'Le Panier d\'Elif',
    'commande pastels en ligne', 'Orange Money', 'Wave CI',
    'Cocody', 'Yopougon', 'Marcory', 'Adjamé', 'Plateau',
  ],
  openGraph: {
    title: "Le Panier d'Elif — Pastels artisanales & Jus frais",
    description: "Pastels faits main livrés partout en Côte d'Ivoire. Paiement Orange Money · Wave.",
    type: 'website',
    locale: 'fr_CI',
    siteName: "Le Panier d'Elif",
    images: [{
      url: '/images/cover.jpeg',
      width: 1200,
      height: 630,
      alt: "Le Panier d'Elif — Pastels artisanales",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Le Panier d'Elif — Pastels artisanales & Jus frais",
    description: "Pastels faits main livrés partout en Côte d'Ivoire.",
    images: ['/images/cover.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${fraunces.variable} ${dmSans.variable} ${pacifico.variable}`}
    >
      <body className="font-dm bg-cream text-secondary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "name": "Le Panier d'Elif",
            "description": "Pastels artisanales faits main et jus frais, livrés partout en Côte d'Ivoire.",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://lepanierdelif.ci",
            "telephone": "+2250710669990",
            "image": "/images/cover.jpeg",
            "servesCuisine": "Ivoirienne, Street food",
            "priceRange": "1000–3500 FCFA",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Abidjan",
              "addressCountry": "CI"
            },
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              "opens": "08:00",
              "closes": "20:00"
            }],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Pastels & Jus frais",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "FoodService", "name": "Pastels artisanales" }, "price": "3500", "priceCurrency": "XOF" },
                { "@type": "Offer", "itemOffered": { "@type": "FoodService", "name": "Jus frais" }, "price": "1000", "priceCurrency": "XOF" }
              ]
            }
          })}}
        />
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  )
}
