import Link from 'next/link';
import { motion } from 'framer-motion';

export function ProgrammeHeader() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-brand-green/10 rounded-full mix-blend-multiply blur-[120px] opacity-70 pointer-events-none animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-brand-orange/10 rounded-full mix-blend-multiply blur-[120px] opacity-70 pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-white border border-brand-green/20 text-brand-green px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-sm">
            <span className="w-2.5 h-2.5 bg-brand-green rounded-full mr-3 animate-pulse"></span>
            Programme de formation intensif
          </div>

          {/* Titre */}
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Programme Complet
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">
              Microsoft Excel Expert
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto font-medium">
            4 jours pour maîtriser Excel et obtenir la certification Microsoft officielle. 
            Une formation pratique et intensive avec des cas réels.
          </p>

          {/* Infos clés */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-2xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl mb-4 bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">📅</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Dates</h3>
              <p className="text-gray-500 font-medium">09-13 Juin 2026</p>
              <p className="text-sm text-brand-green font-bold mt-2">5 jours intensifs</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl mb-4 bg-brand-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">👥</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Groupes</h3>
              <p className="text-gray-500 font-medium">20 participants max</p>
              <p className="text-sm text-brand-orange font-bold mt-2">3 créneaux disponibles</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl mb-4 bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">🏆</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Certification</h3>
              <p className="text-gray-500 font-medium">Microsoft Excel Expert</p>
              <p className="text-sm text-brand-green font-bold mt-2">Reconnue mondialement</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/inscription"
              className="premium-button px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] transform hover:-translate-y-2 transition-all duration-300"
            >
              S'inscrire maintenant
            </Link>
            <Link 
              href="#programme-details"
              className="bg-white text-gray-900 px-10 py-5 text-xl font-bold border-2 border-gray-200 hover:border-brand-green hover:text-brand-green rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Voir le détail
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
