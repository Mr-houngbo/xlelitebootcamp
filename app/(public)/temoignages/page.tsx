import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Témoignages - XL Elite Bootcamp',
  description: 'Découvrez les témoignages de nos participants certifiés Excel Expert',
};

export default function TemoignagesPage() {
  const temoignages = [
    {
      nom: "Marie K.",
      poste: "Analyste Financière",
      entreprise: "Banque Internationale",
      contenu: "La formation XL Elite Bootcamp a transformé ma carrière. En 4 jours, je suis passée d'utilisateur intermédiaire à expert certifié. Mon productivité a augmenté de 60% !",
      note: 5
    },
    {
      nom: "Jean-Pierre M.",
      poste: "Directeur Administratif",
      entreprise: "Groupe Industriel",
      contenu: "Excellente formation ! Les formateurs sont des experts et la méthode pédagogique est très efficace. Je recommande vivement.",
      note: 5
    },
    {
      nom: "Aminata B.",
      poste: "Consultante",
      entreprise: "Cabinet de Conseil",
      contenu: "Certification obtenue avec succès ! Cette formation m'a permis de décrocher un meilleur poste. Investissement très rentable.",
      note: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Témoignages
          </h1>
          <p className="text-xl text-center mb-12 text-gray-600">
            Ce que nos participants disent de notre formation
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temoignages.map((temoignage, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      {i < temoignage.note ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{temoignage.contenu}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{temoignage.nom}</p>
                  <p className="text-sm text-gray-600">{temoignage.poste}</p>
                  <p className="text-sm text-green-600">{temoignage.entreprise}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-600 to-orange-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Rejoignez nos succès !</h3>
              <p className="mb-6">Devenez le prochain témoignage de réussite</p>
              <a 
                href="/inscription" 
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Commencer ma formation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
