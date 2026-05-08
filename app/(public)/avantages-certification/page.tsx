import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avantages Certification - XL Elite Bootcamp',
  description: 'Découvrez tous les avantages de la certification Microsoft Excel Expert avec XL Elite Bootcamp',
};

export default function AvantagesCertificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
            Avantages de la Certification
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-600">Professionnels</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Reconnaissance internationale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Augmentation des opportunités de carrière</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Meilleure position sur le marché du travail</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-orange-600">Personnels</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Confiance accrue dans vos compétences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Productivité augmentée de 40%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Maîtrise totale d'Excel</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-orange-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Prêt à booster votre carrière ?</h3>
            <p className="mb-6">Rejoignez notre formation et devenez certifié Excel Expert</p>
            <a 
              href="/inscription" 
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              S'inscrire maintenant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
