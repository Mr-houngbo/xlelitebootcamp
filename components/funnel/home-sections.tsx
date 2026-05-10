'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, TrendingUp, ShieldCheck, Zap, Award, AlertTriangle, TrendingDown, Clock } from 'lucide-react';
import Link from 'next/link';
import { CountdownTimer } from './countdown-timer';

import { Button } from '@/components/ui/button';

export const HeroFunnel = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden">
      <div className="container px-4 mx-auto text-center relative z-10">

        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-[1.1] md:leading-[0.95]"
        >
          Devenez certifié <br className="hidden md:block" />
          <span className="text-emerald-600">Microsoft Excel Expert</span> <br className="hidden md:block" />
          en 4 jours.
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg md:text-2xl text-slate-700 dark:text-slate-100 font-medium md:font-bold max-w-3xl mx-auto px-4"
        >
          Arrêtez de perdre des heures sur Excel. <br className="hidden md:block" />
          Automatisez vos processus et boostez votre carrière.
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] md:text-sm font-medium text-slate-500"
        >
           <span>+500 formés</span>
           <span className="w-1 h-1 bg-slate-300 rounded-full" />
           <span className="text-emerald-600 font-bold">4.9/5 satisfaction</span>
           <span className="w-1 h-1 bg-slate-300 rounded-full" />
           <span>Certifié Microsoft</span>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link href="/preuve" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 md:px-10 py-6 md:py-8 text-lg md:text-xl font-black rounded-2xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95">
                Réserver ma place <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#programme" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-200 dark:border-slate-800 px-6 md:px-10 py-6 md:py-8 text-lg md:text-xl font-bold rounded-2xl bg-white/50 backdrop-blur-sm hover:border-brand-green/30 transition-all">
                En savoir plus
              </Button>
            </Link>
          </div>
          
          <div className="pt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Fin des inscriptions dans :</p>
            <CountdownTimer targetDate="2026-06-02T23:59:59" />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-emerald-500 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500 rounded-full blur-[80px] md:blur-[120px]" />
      </div>
    </section>
  );
};

export const ProblemSection = () => {
  const problems = [
    { 
      title: "Des heures perdues sur des tâches répétitives", 
      desc: "Vous copiez-collez manuellement des données chaque semaine. Une tâche fastidieuse qui pourrait être automatisée à 100% avec Power Query.", 
      icon: <Clock className="w-6 h-6 text-orange-500" /> 
    },
    { 
      title: "Des fichiers lourds, instables et pleins d'erreurs", 
      desc: "Vos tableaux de bord plantent, les formules RECHERCHEV se cassent, et vous passez plus de temps à réparer vos fichiers qu'à analyser les données.", 
      icon: <AlertTriangle className="w-6 h-6 text-red-500" /> 
    },
    { 
      title: "Un frein pour votre évolution de carrière", 
      desc: "Aujourd'hui, la maîtrise basique d'Excel ne suffit plus. Ne pas savoir exploiter la data vous empêche d'accéder à des postes stratégiques.", 
      icon: <TrendingDown className="w-6 h-6 text-slate-500" /> 
    },
  ];

  return (
    <section id="en-savoir-plus" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-red-500 font-bold tracking-wider uppercase text-sm mb-3 block">Le constat est clair</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Si Excel vous ralentit, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">c'est un problème.</span>
          </h2>
          <p className="mt-6 text-lg md:text-2xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto">
            Arrêtez d'utiliser Excel comme au siècle dernier et subissez moins votre outil de travail.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300 hover:shadow-2xl"
            >
              <div className="mb-6 w-14 h-14 md:w-16 md:h-16 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-600 shadow-inner">
                {p.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-black leading-tight text-slate-900 dark:text-white mb-4">
                {p.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TransformationSection = () => {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-center lg:text-left">Voici ce que vous <br /> <span className="text-emerald-600">allez devenir :</span></h2>
            
            <div className="mt-10 md:mt-12 space-y-4 md:space-y-6">
              {[
                { title: "Un expert ultra-productif", desc: "Automatisez 80% de votre travail avec Power Query.", icon: <TrendingUp className="w-6 h-6 text-emerald-600" /> },
                { title: "Une référence technique", desc: "Devenez celui qu'on consulte pour les sujets complexes.", icon: <Award className="w-6 h-6 text-emerald-600" /> },
                { title: "Profil certifié Microsoft", desc: "Une reconnaissance internationale sur votre CV.", icon: <Zap className="w-6 h-6 text-emerald-600" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                     {item.icon}
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold">{item.title}</p>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center lg:text-left">
              <Link href="#programme" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl font-black rounded-2xl shadow-xl shadow-orange-500/20">
                  Voir le programme
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
             <div className="bg-slate-900 rounded-3xl md:rounded-[2.5rem] p-2 md:p-3 shadow-2xl border border-slate-800 transform lg:rotate-2 overflow-hidden">
                <video 
                  src="https://i.imgur.com/IqKaTmA.mp4"
                  loop 
                  playsInline 
                  controls
                  className="w-full aspect-video rounded-2xl md:rounded-[1.8rem] object-cover shadow-2xl"
                />
             </div>
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-600/10 blur-[80px] md:blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProgrammeSection = () => {
  const programme = [
    { day: "Jour 1", title: "Fondations & Productivité", desc: "Maîtrisez les raccourcis, la mise en forme conditionnelle et préparez vos données comme un pro." },
    { day: "Jour 2", title: "Formules Avancées & Logique", desc: "Domptez RECHERCHEV/X, INDEX/EQUIV, et les formules logiques complexes sans erreur." },
    { day: "Jour 3", title: "Analyse & Tableaux Croisés", desc: "Analysez des milliers de lignes en quelques clics. Créez des TCD dynamiques et percutants." },
    { day: "Jour 4", title: "Power Query & Automatisation", desc: "Fini le copier-coller. Automatisez la récupération et le nettoyage de vos données à 100%." },
  ];

  return (
    <section id="programme" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-brand-green font-bold tracking-wider uppercase text-sm mb-2 block">Ce qui vous attend</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            Le Programme <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Intensif</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            4 jours pour passer de l'hésitation à la maîtrise absolue. Une pédagogie axée sur la pratique immédiate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {programme.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-brand-green/30 transition-all group">
              <div className="text-brand-orange font-black text-xl mb-2">{item.day}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-green transition-colors">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green to-brand-orange"></div>
          <h3 className="text-2xl md:text-3xl font-black mb-4">Prêt à dominer Microsoft Excel ?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">Les places sont extrêmement limitées pour garantir un suivi personnalisé de chaque participant.</p>
          <Link href="/inscription">
            <Button size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-emerald-700 text-white px-10 py-8 text-xl font-black rounded-2xl shadow-xl shadow-brand-green/20 transition-all hover:scale-105">
              Réserver ma place maintenant <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
