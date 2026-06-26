import HeroSection     from '@/components/HeroSection'
import ValueStrip      from '@/components/ValueStrip'
import FeaturedSection from '@/components/FeaturedSection'
import StatsBanner     from '@/components/StatsBanner'
import HowItWorks      from '@/components/HowItWorks'
import WhyUs           from '@/components/WhyUs'
import Testimonials    from '@/components/Testimonials'
import CTASection      from '@/components/CTASection'

export const metadata = {
  title: "Pastels artisanales & Jus frais — Livraison partout en Côte d'Ivoire",
  description: "Pastels artisanales faites main au poulet, viande, poisson, jambon et jus frais. Livraison partout en Côte d'Ivoire. Commandez en ligne, payez Orange Money ou Wave.",
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueStrip />
      <FeaturedSection />
      <StatsBanner />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <CTASection />
    </>
  )
}
