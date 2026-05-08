import { Metadata } from 'next';
import { ProgrammeHeader } from '@/components/sections/programme/programme-header';
import { ProgrammeDetails } from '@/components/sections/programme/programme-details';
import { ProgrammePedagogie } from '@/components/sections/programme/programme-pedagogie';

export const metadata: Metadata = {
  title: 'Programme Complet - Formation Excel Expert en 4 jours',
  description: 'Découvrez le programme détaillé de notre formation Microsoft Excel Expert. 4 jours intensifs pour maîtriser Excel et obtenir votre certification.',
};

export default function ProgrammePage() {
  return (
    <>
      <ProgrammeHeader />
      <ProgrammeDetails />
      <ProgrammePedagogie />
    </>
  );
}
