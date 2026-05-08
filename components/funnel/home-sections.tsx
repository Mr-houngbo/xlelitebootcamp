'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, TrendingUp, ShieldCheck, Zap, Award } from 'lucide-react';
import Link from 'next/link';
import { CountdownTimer } from './countdown-timer';
import { UrgencyBadge } from './urgency-badge';
import { Button } from '@/components/ui/button';

export const HeroFunnel = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="container px-4 mx-auto text-center relative z-10">
        <UrgencyBadge />
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-5xl md:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-[0.95]"
        >
          Devenez certifié <br className="hidden md:block" />
          <span className="text-emerald-600">Microsoft Excel Expert</span> <br className="hidden md:block" />
          en 4 jours.
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-xl md:text-2xl text-slate-900 dark:text-slate-100 font-bold max-w-3xl mx-auto"
        >
          Arrêtez de perdre des heures sur Excel. <br className="hidden md:block" />
          Automatisez vos processus, gagnez en crédibilité et boostez votre carrière.
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="mt-6 flex items-center justify-center gap-4 text-sm font-medium text-slate-500"
        >
           <span>+500 formés</span>
           <span className="w-1 h-1 bg-slate-300 rounded-full" />
           <span className="text-emerald-600 font-bold text-base">4.9/5 satisfaction</span>
           <span className="w-1 h-1 bg-slate-300 rounded-full" />
           <span>Certification Microsoft</span>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/preuve">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-8 text-xl font-black rounded-2xl shadow-2xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95">
                Réserver ma place maintenant <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-slate-200 dark:border-slate-800 px-10 py-8 text-xl font-bold rounded-2xl bg-white/50 backdrop-blur-sm">
              Voir comment ça marche
            </Button>
          </div>
          
          <div className="pt-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Fermeture des inscriptions dans :</p>
            <CountdownTimer targetDate="2026-06-02T23:59:59" />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[120px]" />
      </div>
    </section>
  );
};

export const ProblemSection = () => {
  const problems = [
    { text: "Vous perdez des heures sur des tâches répétitives ?", icon: <Zap className="w-6 h-6 text-orange-500" /> },
    { text: "Vos fichiers sont instables et remplis d'erreurs ?", icon: <XCircle className="w-6 h-6 text-red-500" /> },
    { text: "Votre niveau Excel limite votre évolution professionnelle ?", icon: <ShieldCheck className="w-6 h-6 text-slate-400" /> },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Si Excel vous ralentit, <span className="text-red-600">c'est un problème.</span></h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 font-medium">Arrêtez d'utiliser Excel comme au siècle dernier.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50"
            >
              <div className="mb-6 w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center">{p.icon}</div>
              <p className="text-xl font-bold leading-tight text-slate-900 dark:text-white">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TransformationSection = () => {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight">Voici ce que vous <br /> <span className="text-emerald-600">allez devenir :</span></h2>
            
            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
                   <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl font-black">Un expert ultra-productif</p>
                  <p className="text-slate-600 dark:text-slate-400">Capale d'automatiser 80% de son travail quotidien avec Power Query.</p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
                   <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl font-black">Une référence technique</p>
                  <p className="text-slate-600 dark:text-slate-400">Devenez celui qu'on consulte pour les sujets complexes dans votre équipe.</p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
                   <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl font-black">Profil certifié Microsoft</p>
                  <p className="text-slate-600 dark:text-slate-400">Une reconnaissance internationale immédiate sur votre CV et LinkedIn.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center lg:text-left">
              <Link href="/preuve">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-8 text-xl font-black rounded-2xl shadow-2xl shadow-orange-500/20">
                  Voir le programme complet
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
             <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border border-slate-800 transform rotate-2">
                <div className="aspect-video bg-slate-800 rounded-3xl flex items-center justify-center text-slate-500 italic">
                   [AVANT / APRÈS : -90% DE TEMPS PERDU]
                </div>
             </div>
             {/* Abstract shape */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-600/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
