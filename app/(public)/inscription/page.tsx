import { RegistrationForm } from '@/components/forms/registration-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finalisez votre inscription - XL Elite Bootcamp',
  description: 'Rejoignez l\'élite des experts Microsoft Excel. Inscription rapide en 2 minutes.',
};

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
