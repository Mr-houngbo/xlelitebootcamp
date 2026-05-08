import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - XL Elite Bootcamp',
  description: 'Questions fréquentes sur notre formation Microsoft Excel Expert',
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Quelle est la durée de la formation ?",
      reponse: "Notre formation intensive dure 4 jours consécutifs, de 9h à 17h, pour un total de 32 heures de formation."
    },
    {
      question: "Quels sont les prérequis ?",
      reponse: "Une connaissance de base d'Excel est recommandée. Vous devez savoir utiliser les formules simples et les tableaux."
    },
    {
      question: "La certification est-elle incluse ?",
      reponse: "Oui, la formation inclut la préparation complète et l'examen de certification Microsoft Excel Expert."
    },
    {
      question: "Quel est le taux de réussite ?",
      reponse: "Nous avons un taux de réussite de 95% à l'examen de certification grâce à notre méthode éprouvée."
    },
    {
      question: "Proposez-vous un support après la formation ?",
      reponse: "Oui, nous offrons 3 mois de support gratuit par email pour répondre à toutes vos questions post-formation."
    },
    {
      question: "Quelle est la taille des groupes ?",
      reponse: "Nous limitons nos groupes à 8 participants maximum pour garantir un accompagnement personnalisé."
    },
    {
      question: "Y a-t-il un matériel requis ?",
      reponse: "Il vous faut un ordinateur portable avec Excel 2016 ou version plus récente. Nous fournissons tous les supports de cours."
    },
    {
      question: "Comment s'inscrire ?",
      reponse: "Vous pouvez vous inscrire directement sur notre site via le formulaire d'inscription ou nous contacter par téléphone."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-center mb-12 text-gray-600">
            Tout ce que vous devez savoir sur notre formation
          </p>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
                  {faq.reponse}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <div className="bg-gradient-to-r from-green-600 to-orange-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Une autre question ?</h3>
              <p className="mb-6">Notre équipe est là pour vous répondre</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/inscription" 
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  S'inscrire maintenant
                </a>
                <a 
                  href="mailto:contact@xlelitebootcamp.com" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
