import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: {
    default: "Le Panier d'Elif — Pastels artisanaux & Jus frais à Abidjan",
    template: "%s | Le Panier d'Elif — Abidjan",
  },
  description: "Commandez des pastels artisanaux faits main à Abidjan. Livraison rapide Cocody, Yopougon, Marcory, Plateau. Paiement MTN MoMo, Orange Money, Wave.",
  keywords: [
    'pastels artisanaux Abidjan',
    'pastels faits main Côte d\'Ivoire',
    'commande pastels Abidjan',
    'livraison pastels Abidjan',
    'pastels Cocody',
    'pastels Yopougon',
    'jus frais Abidjan',
    'Le Panier d\'Elif',
    'pâtisserie ivoirienne',
    'snack Abidjan',
    'Mobile Money Abidjan',
  ],
  openGraph: {
    title: "Le Panier d'Elif — Pastels artisanaux Abidjan",
    description: "Des pastels faits main livrés à Abidjan. MTN MoMo, Orange Money, Wave.",
    type: 'website',
    locale: 'fr_CI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-poppins bg-cream text-dark antialiased">
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
