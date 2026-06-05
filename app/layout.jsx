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
  title: {
    default: "Le Panier d'Elif — Pastels artisanaux & Jus frais à Abidjan",
    template: "%s | Le Panier d'Elif",
  },
  description: "Pastels faits main livrés à Abidjan. Poulet, viande, poisson, jambon. Jus frais bissap, passion, ananas. Paiement MTN MoMo, Orange Money, Wave.",
  keywords: [
    'pastels artisanaux Abidjan', 'pastels faits main', 'livraison pastels Abidjan',
    'jus frais Abidjan', 'Le Panier d\'Elif', 'commande pastels en ligne',
    'Mobile Money Abidjan', 'Cocody', 'Yopougon', 'Marcory',
  ],
  openGraph: {
    title: "Le Panier d'Elif — Pastels artisanaux Abidjan",
    description: "Des pastels faits main livrés chez vous à Abidjan. Payez Mobile Money.",
    type: 'website',
    locale: 'fr_CI',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${fraunces.variable} ${dmSans.variable} ${pacifico.variable}`}
    >
      <body className="font-dm bg-cream text-secondary antialiased">
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
