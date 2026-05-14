import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - XL Elite Bootcamp',
  description: 'Engagement de XL Elite Bootcamp concernant la protection de vos données personnelles et le respect de votre vie privée.',
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight text-center">Protection des Données</h1>
        <p className="text-slate-500 text-center mb-12 font-medium italic">Transparence et respect de la vie privée</p>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Responsable du traitement
            </h2>
            <p>
              Les données personnelles collectées via le site <strong>XL Elite Bootcamp</strong> sont traitées par Monsieur <strong>Léonce Tounde SODJINOU</strong>, agissant pour le compte de Smart Otobos Consulting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Données collectées
            </h2>
            <p className="mb-4">Nous collectons uniquement les informations strictement nécessaires à la fourniture de nos services de formation :</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Identité :</strong> Nom, Prénom.</li>
              <li><strong>Contact :</strong> Adresse email, Numéro de téléphone (WhatsApp).</li>
              <li><strong>Profil pro :</strong> Entreprise, Poste occupé, Type de profil (Cadre, Étudiant, etc.).</li>
              <li><strong>Formation :</strong> Pays de résidence, Format de formation choisi (Présentiel/Online).</li>
              <li><strong>Paiement :</strong> Références de transaction (Mobile Money, Virement).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Finalités du traitement
            </h2>
            <p className="mb-4">Vos données font l'objet d'un traitement pour les finalités suivantes :</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-800 dark:text-white mb-2">Gestion Inscription</p>
                <p className="text-sm">Validation de votre dossier, affectation à un groupe (G1/G2/G3) et suivi pédagogique.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-800 dark:text-white mb-2">Certification</p>
                <p className="text-sm">Transmission des informations nécessaires à Microsoft/Certiport pour le passage de l'examen.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-800 dark:text-white mb-2">Prospection</p>
                <p className="text-sm">Envoi d'informations sur les prochaines sessions de bootcamp (uniquement avec votre accord).</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-800 dark:text-white mb-2">Support</p>
                <p className="text-sm">Contact direct via WhatsApp ou appel pour répondre à vos questions logistiques.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Conservation & Sécurité
            </h2>
            <p>
              Vos données sont conservées pour une durée de <strong>3 ans</strong> à compter de la fin de votre formation ou du dernier contact commercial. Elles sont stockées sur les serveurs sécurisés de <strong>Supabase</strong> et <strong>Vercel</strong>, avec un accès restreint aux seuls collaborateurs en charge du suivi administratif.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Vos droits
            </h2>
            <p className="mb-4">Conformément aux réglementations internationales sur la protection des données (RGPD et équivalents nationaux), vous disposez des droits suivants :</p>
            <div className="space-y-3">
              <p>• Droit d'accès et de rectification de vos données.</p>
              <p>• Droit à l'effacement ("droit à l'oubli").</p>
              <p>• Droit à la limitation du traitement.</p>
              <p>• Droit d'opposition à la prospection commerciale.</p>
            </div>
            <p className="mt-6">
              Pour exercer ces droits, envoyez simplement un email à <strong>smart.otobos@gmail.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Cookies & Tracking
            </h2>
            <p>
              Nous utilisons des outils d'analyse (Meta Pixel) pour mesurer l'efficacité de nos campagnes publicitaires. Ces données sont anonymisées et servent uniquement à optimiser l'expérience utilisateur et la pertinence de nos offres.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
