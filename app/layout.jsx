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
    default: "Le Panier d'Elif — Pastels artisanaux & Jus frais",
    template: "%s | Le Panier d'Elif",
  },
  description: "Des pastels faits main, livrés avec amour à Abidjan. Commandez en ligne — paiement Mobile Money.",
  keywords: ['pastels', 'artisanal', 'Abidjan', 'Côte d\'Ivoire', 'livraison', 'fait maison'],
  openGraph: {
    title: "Le Panier d'Elif",
    description: "Des pastels faits main, livrés avec amour.",
    type: 'website',
    locale: 'fr_CI',
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
