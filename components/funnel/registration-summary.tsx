import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const RegistrationSummary = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl h-full">
      <h3 className="text-2xl font-bold mb-6">Récapitulatif de votre offre</h3>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold">Bootcamp XL Elite</p>
            <p className="text-sm text-slate-500">4 jours d'immersion totale</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold">2 Vouchers Microsoft</p>
            <p className="text-sm text-slate-500">Passage de certification inclus</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold">Support 6 mois</p>
            <p className="text-sm text-slate-500">Accès privilégié WhatsApp</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-500">Investissement</span>
          <span className="text-3xl font-black text-emerald-600">1.500 €</span>
        </div>
        <p className="text-xs text-slate-400 text-center italic">Zéro frais cachés. Paiement après validation du dossier.</p>
      </div>

      <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl">
         <p className="text-sm text-orange-700 dark:text-orange-400 font-medium">
            ⚠️ Attention : Plus que 3 places disponibles pour la session de Juin.
         </p>
      </div>
    </div>
  );
};
