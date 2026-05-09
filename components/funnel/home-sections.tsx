'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, TrendingUp, ShieldCheck, Zap, Award } from 'lucide-react';
import Link from 'next/link';
import { CountdownTimer } from './countdown-timer';
import { UrgencyBadge } from './urgency-badge';
import { Button } from '@/components/ui/button';

export const HeroFunnel = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden">
      <div className="container px-4 mx-auto text-center relative z-10">
        <UrgencyBadge />
        
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
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-200 dark:border-slate-800 px-6 md:px-10 py-6 md:py-8 text-lg md:text-xl font-bold rounded-2xl bg-white/50 backdrop-blur-sm">
              En savoir plus
            </Button>
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
    { text: "Vous perdez des heures sur des tâches répétitives ?", icon: <Zap className="w-5 h-5 text-orange-500" /> },
    { text: "Vos fichiers sont instables et remplis d'erreurs ?", icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { text: "Votre niveau Excel limite votre évolution professionnelle ?", icon: <ShieldCheck className="w-5 h-5 text-slate-400" /> },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight">Si Excel vous ralentit, <br className="md:hidden" /><span className="text-red-600">c'est un problème.</span></h2>
          <p className="mt-4 text-base md:text-xl text-slate-600 dark:text-slate-400 font-medium px-4">Arrêtez d'utiliser Excel comme au siècle dernier.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg"
            >
              <div className="mb-4 md:mb-6 w-10 h-10 md:w-12 md:h-12 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center">{p.icon}</div>
              <p className="text-lg md:text-xl font-bold leading-tight text-slate-900 dark:text-white">{p.text}</p>
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
              <Link href="/preuve" className="inline-block w-full sm:w-auto">
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
