import { motion } from 'framer-motion';

export function ProgrammeDetails() {
  const programme = [
    {
      jour: "Jour 1",
      date: "09 Juin 2026",
      titre: "Fondamentaux Excel Avancé",
      modules: [
        {
          titre: "Fonctions Complexes",
          contenu: [
            "Fonctions RECHERCHEV, INDEX, EQUIV",
            "Fonctions SI, SI.MULTIPLE, SI.NON.ERREUR",
            "Fonctions logiques avancées",
            "Imbrication de fonctions"
          ],
          duree: "2h"
        },
        {
          titre: "Mise en Forme Conditionnelle",
          contenu: [
            "Règles conditionnelles avancées",
            "Mise en forme personnalisée",
            "Icônes et barres de données",
            "Validation des données"
          ],
          duree: "1h30"
        },
        {
          titre: "Tableaux et Graphiques",
          contenu: [
            "Tableaux croisés dynamiques",
            "Segments et filtres",
            "Graphiques combinés",
            "Mise en forme professionnelle"
          ],
          duree: "30min"
        }
      ],
      competences: ["Maîtrise des fonctions avancées", "Automatisation des calculs", "Visualisation des données"]
    },
    {
      jour: "Jour 2",
      date: "10 Juin 2026",
      titre: "Analyse de Données",
      modules: [
        {
          titre: "Power Query",
          contenu: [
            "Connexion aux sources de données",
            "Transformation et nettoyage",
            "Fusion de données",
            "Chargement dans Excel"
          ],
          duree: "2h"
        },
        {
          titre: "Tableaux Croisés Dynamiques",
          contenu: [
            "Création avancée",
            "Segments et filtres",
            "Champs calculés",
            "Graphiques croisés"
          ],
          duree: "1h30"
        },
        {
          titre: "Analyse Statistique",
          contenu: [
            "Fonctions statistiques avancées",
            "Scénarios et tables de données",
            "Solveur et optimisation",
            "Prévisions et tendances"
          ],
          duree: "30min"
        }
      ],
      competences: ["Importation de données", "Analyse statistique", "Reporting dynamique"]
    },
    {
      jour: "Jour 3",
      date: "11 Juin 2026",
      titre: "Automatisation & VBA",
      modules: [
        {
          titre: "Introduction à VBA",
          contenu: [
            "Environnement VBA",
            "Variables et types",
            "Structures de contrôle",
            "Fonctions et procédures"
          ],
          duree: "2h"
        },
        {
          titre: "Automatisation des Tâches",
          contenu: [
            "Macros enregistrement",
            "Boutons et formulaires",
            "Automatisation des rapports",
          ],
          duree: "1h30"
        },
        {
          titre: "Projets Pratiques",
          contenu: [
            "Automatisation complète",
            "Interface utilisateur",
            "Gestion d'erreurs"
          ],
          duree: "30min"
        }
      ],
      competences: ["Programmation VBA", "Automatisation", "Interface utilisateur"]
    },
    {
      jour: "Jour 4",
      date: "12 Juin 2026",
      titre: "Certification & Projets",
      modules: [
        {
          titre: "Préparation Certification",
          contenu: [
            "Format examen Microsoft",
            "Conseils et stratégies",
            "Examen blanc",
            "Correction détaillée"
          ],
          duree: "2h"
        },
        {
          titre: "Projets Finaux",
          contenu: [
            "Cas d'usage réels",
            "Présentation des projets",
            "Feedback personnalisé"
          ],
          duree: "1h30"
        },
        {
          titre: "Certification Officielle",
          contenu: [
            "Passage de l'examen",
            "Remise des certificats",
            "Prochaines étapes"
          ],
          duree: "30min"
        }
      ],
      competences: ["Certification Microsoft", "Projets professionnels", "Autonomie complète"]
    }
  ];

  return (
    <section id="programme-details" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Programme <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Détaillé</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium">
            4 jours pour transformer radicalement votre maîtrise d'Excel
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {programme.map((jour, index) => (
            <div key={index} className="glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-brand-green to-brand-orange opacity-80 group-hover:w-3 transition-all duration-300"></div>
              
              {/* Header du jour */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-8 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-brand-green text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                      {jour.jour}
                    </span>
                    <span className="text-gray-400 font-semibold">{jour.date}</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">{jour.titre}</h3>
                </div>
                <div className="mt-6 md:mt-0">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Compétences clés</div>
                  <div className="flex flex-wrap gap-2">
                    {jour.competences.map((competence, i) => (
                      <span key={i} className="bg-slate-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-xl text-sm font-semibold">
                        {competence}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modules du jour */}
              <div className="grid lg:grid-cols-3 gap-8">
                {jour.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="bg-slate-50/50 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-6">
                      <h4 className="font-bold text-xl text-gray-900 leading-tight pr-4">{module.titre}</h4>
                      <span className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                        {module.duree}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {module.contenu.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-brand-orange font-bold mr-3 mt-0.5">✓</span>
                          <span className="text-gray-600 font-medium leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section bonus */}
        <div className="mt-24 max-w-6xl mx-auto glass-card rounded-3xl p-12 md:p-16 border-gray-100 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-brand-orange/5"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center tracking-tight">
              Inclus dans la <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Formation</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="text-5xl mb-6 bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">📚</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Support de cours</h4>
                <p className="text-gray-500 font-medium text-sm">Fichiers et exercices complets</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="text-5xl mb-6 bg-brand-orange/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">🏆</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Certification</h4>
                <p className="text-gray-500 font-medium text-sm">Examen officiel inclus</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="text-5xl mb-6 bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">🤝</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Support 6 mois</h4>
                <p className="text-gray-500 font-medium text-sm">Accompagnement post-formation</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="text-5xl mb-6 bg-brand-orange/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">👥</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Communauté</h4>
                <p className="text-gray-500 font-medium text-sm">Accès exclusif au réseau Alumni</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
