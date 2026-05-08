import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - XL Elite Bootcamp',
  description: 'Mentions légales du site XL Elite Bootcamp.',
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12">Mentions Légales</h1>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Éditeur du site</h2>
            <p>
              Le site <strong>XL Elite Bootcamp</strong> est édité par la société [NOM DE LA SOCIÉTÉ], [FORME JURIDIQUE] au capital de [MONTANT] €, 
              dont le siège social est situé à [ADRESSE], immatriculée au Registre du Commerce et des Sociétés de [VILLE] sous le numéro [NUMÉRO RCS].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Directeur de la publication</h2>
            <p>[NOM DU DIRECTEUR], en sa qualité de [TITRE/FONCTION].</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong>, situé au 340 S Lemon Ave #1142, Walnut, CA 91789, USA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Contact</h2>
            <p>
              Pour toute question, vous pouvez nous contacter par email à : <strong>contact@xlbootcamp.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
