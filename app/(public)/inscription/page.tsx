import { Metadata } from 'next';
import { RegistrationForm } from '@/components/forms/registration-form';

export const metadata: Metadata = {
  title: 'Inscription - XL Elite Bootcamp Excel Expert',
  description: 'Inscrivez-vous à la formation Microsoft Excel Expert. Places limitées. Formation certifiante en 4 jours à Ouagadougou.',
};

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden py-24">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-brand-green/10 rounded-full mix-blend-multiply blur-[100px] opacity-70 pointer-events-none animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-brand-orange/10 rounded-full mix-blend-multiply blur-[100px] opacity-70 pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <RegistrationForm />
      </div>
    </div>
  );
}
