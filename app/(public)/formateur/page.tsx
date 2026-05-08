import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formateur - XL Elite Bootcamp',
  description: 'Découvrez votre formateur certifié Microsoft Excel Expert',
};

export default function FormateurPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
            Votre Formateur
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">LS</span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">
                  Leonce Tounde SODJINOU
                </h2>
                <p className="text-xl text-green-600 mb-4">
                  Microsoft Certified Excel Expert Trainer
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>10+ ans d'expérience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>500+ professionnels formés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Certification Microsoft Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Expert en formation intensive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-600">Expertise Technique</h3>
              <ul className="space-y-2">
                <li>• Formules avancées et fonctions complexes</li>
                <li>• Power Query et Power Pivot</li>
                <li>• Macros et VBA</li>
                <li>• Tableaux croisés dynamiques</li>
                <li>• Analyse de données et dashboarding</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Pédagogie</h3>
              <ul className="space-y-2">
                <li>• Méthode immersive et pratique</li>
                <li>• Cas réels et exercices concrets</li>
                <li>• Accompagnement personnalisé</li>
                <li>• Support post-formation</li>
                <li>• Préparation intensive à la certification</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-orange-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Apprenez avec le meilleur</h3>
            <p className="mb-6">Bénéficiez d'une expertise reconnue pour votre succès</p>
            <a 
              href="/inscription" 
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Réserver ma place
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
