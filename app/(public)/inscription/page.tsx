import { RegistrationForm } from '@/components/forms/registration-form';
import { RegistrationSummary } from '@/components/funnel/registration-summary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finalisez votre inscription - XL Elite Bootcamp',
  description: 'Rejoignez l\'élite des experts Microsoft Excel. Inscription rapide en 2 minutes.',
};

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form Column */}
          <div className="w-full lg:w-2/3">
            <RegistrationForm />
          </div>

          {/* Summary Column - Sticky on desktop */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <RegistrationSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
