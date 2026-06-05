import HeroSection    from '@/components/HeroSection'
import StatsBar       from '@/components/StatsBar'
import FeaturedSection from '@/components/FeaturedSection'
import WhyUs          from '@/components/WhyUs'
import Testimonials   from '@/components/Testimonials'
import CTASection     from '@/components/CTASection'

export const metadata = {
  title: "Pastels artisanales & Jus frais — Livraison partout en Côte d'Ivoire",
  description: "Pastels artisanales faits main au poulet, viande, poisson, jambon et jus frais bissap, ananas. Livraison partout en Côte d'Ivoire. Commandez en ligne, payez Orange Money ou Wave.",
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedSection />
      <WhyUs />
      <Testimonials />
      <CTASection />
    </>
  )
}
