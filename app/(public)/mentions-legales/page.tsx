import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - XL Elite Bootcamp',
  description: 'Informations légales concernant l\'éditeur et l\'hébergeur du site XL Elite Bootcamp.',
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight text-center">Mentions Légales</h1>
        <p className="text-slate-500 text-center mb-12 font-medium italic">En vigueur au 15 Mai 2026</p>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">
          
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold">1</div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Éditeur du site</h2>
            </div>
            <div className="pl-14 space-y-2">
              <p>Le site <strong>XL Elite Bootcamp</strong> (accessible à l'adresse https://www.xlbootcamp.com) est édité par le cabinet :</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 uppercase">Smart Otobos Consulting</p>
              <p>Cabinet de conseil, ingénierie financière et formation professionnelle.</p>
              <p><strong>Siège social :</strong> Ouagadougou, Burkina Faso.</p>
              <p><strong>Contact :</strong> smart.otobos@gmail.com</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold">2</div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Directeur de la publication</h2>
            </div>
            <div className="pl-14">
              <p>Le responsable éditorial et directeur de la publication est :</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">Monsieur Léonce Toundé SODJINOU</p>
              <p className="italic">Expert Microsoft Excel & Consultant Finance Digitale.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold">3</div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Hébergement</h2>
            </div>
            <div className="pl-14">
              <p>Le site est hébergé par la société <strong>Vercel Inc.</strong></p>
              <p>Adresse : 340 S Lemon Ave #1142, Walnut, CA 91789, USA.</p>
              <p>Site web : <a href="https://vercel.com" className="text-orange-500 hover:underline">www.vercel.com</a></p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold">4</div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Propriété intellectuelle</h2>
            </div>
            <div className="pl-14 space-y-4">
              <p>
                L'intégralité du contenu présent sur ce site (textes, logos, images, vidéos, structure pédagogique, cas métiers Excel) est la propriété exclusive de <strong>Smart Otobos Consulting</strong> et de <strong>Léonce Toundé SODJINOU</strong>.
              </p>
              <p>
                Toute reproduction, distribution, modification ou utilisation, même partielle, sans accord écrit préalable est strictement interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold">5</div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Marques déposées</h2>
            </div>
            <div className="pl-14">
              <p>
                <strong>Microsoft Excel</strong>, <strong>Office 365</strong> et les logos associés sont des marques déposées de Microsoft Corporation. XL Elite Bootcamp est un programme de formation indépendant visant à la préparation des certifications officielles Microsoft.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
