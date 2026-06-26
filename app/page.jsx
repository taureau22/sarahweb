import HeroSection     from '@/components/HeroSection'
import MarqueeStrip    from '@/components/MarqueeStrip'
import ProductShowcase from '@/components/ProductShowcase'
import BrandStory      from '@/components/BrandStory'
import HowItWorks      from '@/components/HowItWorks'
import Testimonials    from '@/components/Testimonials'
import CTASection      from '@/components/CTASection'

export const metadata = {
  title: "Pastels artisanaux & Jus frais — Livraison à Abidjan",
  description: "Pastels artisanaux faits main au poulet, viande, poisson, jambon et jus frais bissap, ananas. Livraison à Abidjan, Côte d'Ivoire.",
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ProductShowcase />
      <BrandStory />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  )
}
