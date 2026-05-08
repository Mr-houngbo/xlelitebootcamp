import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { BenefitsSection } from '@/components/sections/benefits-section';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
