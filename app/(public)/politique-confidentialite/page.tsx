import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - XL Elite Bootcamp',
  description: 'Politique de protection des données personnelles de XL Elite Bootcamp.',
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12">Politique de Confidentialité</h1>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Collecte des données</h2>
            <p>
              Nous collectons les informations que vous nous fournissez lors de votre inscription (Nom, Prénom, Email, Téléphone, Pays, Entreprise). 
              Ces données sont nécessaires pour traiter votre candidature au bootcamp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Utilisation des données</h2>
            <p>
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>La gestion de votre inscription.</li>
              <li>La communication d'informations relatives au bootcamp.</li>
              <li>Le suivi administratif et pédagogique.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Conservation des données</h2>
            <p>
              Nous conservons vos données pendant la durée nécessaire à la finalisation de votre formation et au respect de nos obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Vos droits</h2>
            <p>
              Conformément à la réglementation (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
              Vous pouvez exercer ces droits en nous contactant à <strong>contact@xlbootcamp.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
