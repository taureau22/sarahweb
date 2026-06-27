import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const fraunces = localFont({
  variable: '--font-fraunces',
  display: 'swap',
  src: [
    { path: './fonts/fraunces.woff2',        weight: '400 900', style: 'normal' },
    { path: './fonts/fraunces-italic.woff2', weight: '400 900', style: 'italic' },
  ],
})

const dmSans = localFont({
  variable: '--font-dm-sans',
  display: 'swap',
  src: [{ path: './fonts/dm-sans.woff2', weight: '400 700', style: 'normal' }],
})

export const viewport = {
  themeColor: '#EA8A2E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  minimumScale: 1,
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lepanierdelif.ci'),
  title: {
    default: "Le Panier d'Elif — Pastels artisanaux faits main | Livraison à Abidjan",
    template: "%s | Le Panier d'Elif",
  },
  description: "Pastels artisanaux faits main livrés à Abidjan, Côte d'Ivoire. Poulet, viande hachée, poisson, jambon de dinde — frais ou surgelés. Paiement Orange Money, Wave.",
  keywords: [
    'pastels artisanaux Abidjan', 'pastels faits main Côte d\'Ivoire', 'livraison pastels',
    'pastels surgelés Abidjan', 'Le Panier d\'Elif', 'commande pastels en ligne',
  ],
  manifest: '/manifest.json',
  openGraph: {
    title: "Le Panier d'Elif — Pastels artisanaux faits main",
    description: "Pastels artisanaux faits main, frais ou surgelés, livrés à Abidjan. Paiement Orange Money · Wave.",
    type: 'website',
    locale: 'fr_CI',
    siteName: "Le Panier d'Elif",
    images: [{ url: '/images/cover.jpeg', width: 1200, height: 630, alt: "Le Panier d'Elif" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Le Panier d'Elif — Pastels artisanaux faits main",
    images: ['/images/cover.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased">
        {/* Scroll reveal — progressive enhancement.
            Marks <html> with .js, then observes .reveal elements via IntersectionObserver.
            Falls back to always-visible after 3s timeout. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){
  var d=document,de=d.documentElement;
  de.classList.add('js');
  function show(el){el.classList.add('visible');}
  function init(){
    var els=d.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){for(var i=0;i<els.length;i++)show(els[i]);return;}
    var io=new IntersectionObserver(function(ents){
      ents.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target);}});
    },{threshold:0.08,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el);});
    setTimeout(function(){els.forEach(show);},3000);
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "name": "Le Panier d'Elif",
            "description": "Pastels artisanaux faits main, frais ou surgelés, livrés à Abidjan, Côte d'Ivoire.",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://lepanierdelif.ci",
            "telephone": `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'}`,
            "image": "/images/cover.jpeg",
            "servesCuisine": "Ivoirienne, Street food",
            "priceRange": "3500 FCFA",
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
