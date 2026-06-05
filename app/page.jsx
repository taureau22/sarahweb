import HeroSection    from '@/components/HeroSection'
import StatsBar       from '@/components/StatsBar'
import FeaturedSection from '@/components/FeaturedSection'
import WhyUs          from '@/components/WhyUs'
import Testimonials   from '@/components/Testimonials'
import CTASection     from '@/components/CTASection'

export const metadata = {
  title: "Pastels artisanaux & Jus frais — Livraison Abidjan",
  description: "Pastels faits main au poulet, viande, poisson et jus frais bissap, ananas. Livraison rapide dans tout Abidjan. Commandez en ligne, payez Mobile Money.",
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
