import { HeroFunnel, ProblemSection, TransformationSection } from '@/components/funnel/home-sections';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroFunnel />
      <ProblemSection />
      <TransformationSection />
    </main>
  );
}
