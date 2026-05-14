import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - XL Elite Bootcamp',
  description: 'Contrat de formation professionnelle concernant le programme XL Elite Bootcamp dirigé par Léonce Toundé SODJINOU.',
};

export default function ConditionsGeneralesDeVente() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight text-center">CGV & Règlement</h1>
        <p className="text-slate-500 text-center mb-12 font-medium italic">Contrat de formation professionnelle - Version 2026.01</p>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">1. Objet du programme</h2>
            <p>
              Le programme <strong>XL Elite Bootcamp</strong> est une formation intensive de <strong>5 jours</strong> visant à préparer les participants à l'examen de certification officielle <strong>Microsoft Office Specialist (MOS) Excel Expert</strong>. La formation est dispensée par Monsieur Léonce Toundé SODJINOU.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">2. Modalités d'inscription</h2>
            <div className="space-y-4">
              <p>L'inscription s'effectue en deux étapes obligatoires :</p>
              <div className="pl-6 border-l-4 border-orange-500 space-y-3">
                <p><strong>Étape 1 :</strong> Remplissage du formulaire en ligne et sélection du groupe (G1/G2/G3).</p>
                <p><strong>Étape 2 :</strong> Paiement des frais d'inscription de <strong>30 000 FCFA</strong> pour valider la réservation de la place.</p>
              </div>
              <p>Le cabinet se réserve le droit de refuser une inscription si le profil du candidat ne présente pas les prérequis nécessaires pour suivre une formation de niveau "Expert".</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">3. Tarifs et Paiement</h2>
            <div className="space-y-4">
              <p>L'investissement total pour le bootcamp est fixé à <strong>155 000 FCFA</strong>, décomposé comme suit :</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Frais d'inscription :</strong> 30 000 FCFA (dus immédiatement pour valider la place).</li>
                <li><strong>Frais de formation & Certification :</strong> 125 000 FCFA (payables au plus tard le premier jour de la formation).</li>
              </ul>
              <p>Le tarif inclut : la formation, le matériel pédagogique, la licence Office 365 temporaire, les simulateurs d'examen et les frais de passage de la certification Microsoft (Voucher).</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">4. Annulation et Désistement</h2>
            <div className="space-y-4">
              <p><strong>4.1 Frais d'inscription :</strong> Conformément à la nature de la réservation de ressources logistiques et de licences, les frais d'inscription (30 000 FCFA) sont <strong>non-remboursables</strong> en cas de désistement du participant.</p>
              <p><strong>4.2 Annulation tardive :</strong> Toute annulation intervenant moins de 72 heures avant le début du bootcamp entraînera la facturation de 50% du montant total de la formation à titre de dédommagement pour l'immobilisation de la licence de certification.</p>
              <p><strong>4.3 Absence :</strong> L'absence, même partielle, durant les sessions ne donne droit à aucun remboursement ou report de certification.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">5. Certification Microsoft</h2>
            <p>
              Le cabinet s'engage à fournir l'environnement et le voucher nécessaires au passage de l'examen. <strong>La réussite à l'examen dépend exclusivement des performances individuelles du candidat lors de l'épreuve officielle.</strong> En cas d'échec, le repassage de l'examen n'est pas inclus dans le tarif initial et fera l'objet d'une facturation supplémentaire pour le nouveau voucher.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">6. Responsabilité & Force Majeure</h2>
            <p>
              En cas de force majeure (problèmes techniques majeurs, instabilité réseau généralisée, directives gouvernementales), le cabinet se réserve le droit de basculer la formation en mode 100% en ligne ou de la reporter à une date ultérieure sans que cela ne puisse donner lieu à un remboursement, dès lors que la prestation est maintenue.
            </p>
          </section>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm italic">
            En validant votre inscription sur ce site, vous reconnaissez avoir pris connaissance et accepté sans réserve l'intégralité des présentes Conditions Générales de Vente.
          </div>
        </div>
      </div>
    </div>
  );
}
