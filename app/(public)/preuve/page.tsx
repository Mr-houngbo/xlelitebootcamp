import { 
  TestimonialsProof, 
  InstructorSection, 
  ProgrammeTimeline, 
  FinalOffer, 
  FAQSection 
} from '@/components/funnel/proof-sections';

export default function ProofPage() {
  return (
    <main className="min-h-screen">
      <TestimonialsProof />
      <InstructorSection />
      <ProgrammeTimeline />
      <FinalOffer />
      <FAQSection />
    </main>
  );
}
