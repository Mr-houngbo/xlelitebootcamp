import { HeroFunnel, ProblemSection, TransformationSection, ProgrammeSection } from '@/components/funnel/home-sections';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroFunnel />
      <ProblemSection />
      <TransformationSection />
      <ProgrammeSection />
    </main>
  );
}
