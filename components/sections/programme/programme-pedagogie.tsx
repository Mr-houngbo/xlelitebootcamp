import { motion } from 'framer-motion';

export function ProgrammePedagogie() {
  const methodes = [
    {
      titre: "Pédagogie Active",
      description: "Apprentissage par la pratique avec des cas concrets de votre environnement professionnel",
      icon: "🎯",
      details: [
        "70% pratique / 30% théorie",
        "Cas réels d'entreprises",
        "Exercices progressifs"
      ]
    },
    {
      titre: "Petits Groupes",
      description: "Maximum 20 participants pour un suivi personnalisé et des échanges riches",
      icon: "👥",
      details: [
        "20 participants maximum",
        "Suivi individuel",
        "Échanges interactifs"
      ]
    },
    {
      titre: "Formateur Expert",
      description: "Leonce SODJINOU, consultant senior avec 15+ ans d'expérience",
      icon: "👨‍🏫",
      details: [
        "15+ ans d'expérience",
        "Certifié Microsoft",
        "Expert pédagogue"
      ]
    },
    {
      titre: "Support Complet",
      description: "Accès au matériel et support pendant 6 mois après la formation",
      icon: "🤝",
      details: [
        "Support 6 mois",
        "Accès communauté alumni",
        "Mise à jour gratuites"
      ]
    }
  ];

  const objectifs = [
    "Automatiser 80% des tâches répétitives",
    "Réduire le temps de reporting de 70%",
    "Maîtriser l'analyse de données complexes",
    "Créer des dashboards interactifs",
    "Obtenir la certification Microsoft Excel Expert"
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Notre Approche <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Pédagogique</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium">
            Une méthode éprouvée pour garantir votre réussite professionnelle
          </p>
        </div>

        {/* Méthodes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {methodes.map((methode, index) => (
            <div 
              key={index}
              className="glass-card rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-6 bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                {methode.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {methode.titre}
              </h3>
              <p className="text-gray-500 mb-6 font-medium leading-relaxed">
                {methode.description}
              </p>
              <ul className="space-y-3">
                {methode.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-sm font-semibold">
                    <span className="text-brand-green mr-3 text-lg">✓</span>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Objectifs */}
        <div className="glass-card rounded-3xl p-10 md:p-14 shadow-2xl border border-gray-100 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>
          
          <h3 className="text-3xl font-black text-gray-900 mb-10 text-center tracking-tight relative z-10">
            Objectifs de la Formation
          </h3>
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {objectifs.map((objectif, index) => (
              <div key={index} className="flex items-center bg-white/60 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-brand-green to-brand-orange text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mr-5 flex-shrink-0 shadow-md">
                  {index + 1}
                </div>
                <span className="text-gray-800 font-bold text-lg leading-tight">{objectif}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Témoignages */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">
            Résultats Garantis
          </h3>
          <div className="glass-card rounded-3xl p-12 shadow-2xl border border-gray-100 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-gray-900 font-bold text-xl mb-2">Taux de satisfaction</div>
                <div className="text-sm text-gray-500 font-medium">Participants pleinement satisfaits</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300">85%</div>
                <div className="text-gray-900 font-bold text-xl mb-2">Évolution de carrière</div>
                <div className="text-sm text-gray-500 font-medium">Promotion ou augmentation salariale</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange mb-4 group-hover:scale-110 transition-transform duration-300">4.9<span className="text-3xl text-gray-400">/5</span></div>
                <div className="text-gray-900 font-bold text-xl mb-2">Note moyenne globale</div>
                <div className="text-sm text-gray-500 font-medium">Évaluation par nos alumni</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
