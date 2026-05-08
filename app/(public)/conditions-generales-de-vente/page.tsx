import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - XL Elite Bootcamp',
  description: 'Conditions générales de vente de la formation XL Elite Bootcamp.',
};

export default function ConditionsGeneralesDeVente() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12">Conditions Générales de Vente</h1>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Objet</h2>
            <p>
              Les présentes conditions générales de vente régissent les relations contractuelles entre XL Elite Bootcamp et ses clients dans le cadre de la vente de formations professionnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Inscription et Validation</h2>
            <p>
              L'inscription au bootcamp se fait via le formulaire en ligne. Elle n'est considérée comme définitive qu'après validation du profil par notre équipe pédagogique et réception du premier paiement (frais d'inscription).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Tarifs et Paiement</h2>
            <p>
              Le prix de la formation est indiqué sur le site. Le paiement peut être effectué par Mobile Money, virement bancaire ou espèces selon les modalités communiquées après validation de l'inscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Annulation et Remboursement</h2>
            <p>
              Toute annulation par le client doit être notifiée par écrit. Les frais d'inscription (25.000 FCFA) ne sont pas remboursables une fois le dossier validé. En cas d'annulation moins de 7 jours avant le début, 50% des frais de formation restent dus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Certification</h2>
            <p>
              Le passage de la certification Microsoft est inclus dans le prix. La réussite à l'examen dépend du niveau du candidat et de son investissement durant les 4 jours de bootcamp.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
