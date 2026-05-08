import { 
  HeroProof, 
  ConcreteTestimonials, 
  RealActions, 
  OrganizationSection, 
  InclusionsSection,
  FinancialOffer, 
  FAQProof 
} from '@/components/funnel/proof-sections';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pourquoi choisir XL Elite ? - Bootcamp Excel Expert',
  description: 'Découvrez comment nos participants passent de débutants à certifiés Microsoft Excel Expert en 4 jours intensifs.',
};

export default function ProofPage() {
  return (
    <main className="min-h-screen">
      <HeroProof />
      <ConcreteTestimonials />
      <RealActions />
      <OrganizationSection />
      <InclusionsSection />
      <FinancialOffer />
      <FAQProof />
      
      <section className="py-20 bg-slate-50 dark:bg-slate-950 text-center">
         <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold mb-8">Dernière chance pour la session de Juin</h2>
            <Link href="/inscription">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-7 text-xl font-black rounded-2xl shadow-xl transition-all hover:scale-105">
                 Je m'inscris maintenant
              </Button>
            </Link>
         </div>
      </section>
    </main>
  );
}
