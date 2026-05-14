import { HeroFunnel, TransformationSection } from '@/components/funnel/home-sections';
import { 
  ConcreteTestimonials, 
  RealActions, 
  OrganizationSection, 
  TrainerSection, 
  FinancialOffer, 
  FAQProof 
} from '@/components/funnel/proof-sections';
import HomeTracking from '@/components/home-tracking';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HomeTracking />
      {/* 1. L'Accroche */}
      <HeroFunnel />
      
      {/* 2. La Preuve Sociale Éclair */}
      <ConcreteTestimonials />
      
      {/* 3. La Preuve par l'Émotion (Vidéos VIP) */}
      <RealActions />
      
      {/* 4. L'Organisation & Promesse */}
      <OrganizationSection />
      
      {/* 5. L'Autorité Absolue */}
      <TrainerSection />
      
      {/* 7. Le Climax */}
      <FinancialOffer />
      
      {/* 8. Le Filet de Sécurité */}
      <FAQProof />
    </main>
  );
}
