'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
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
          className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
        >
          Devenez certifié <span className="text-emerald-600">Microsoft Excel Expert</span> en 4 jours
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          La formation intensive pour automatiser vos processus, doubler votre productivité et obtenir une reconnaissance internationale.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/preuve">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-7 text-lg rounded-xl shadow-xl shadow-emerald-600/20">
                Je veux ma certification <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-slate-200 dark:border-slate-800 px-8 py-7 text-lg rounded-xl">
              Voir comment ça marche
            </Button>
          </div>
          
          <div className="pt-8">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-4">Fermeture des inscriptions dans :</p>
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
    { text: "Vous perdez des heures sur des calculs répétitifs ?", icon: <Zap className="w-6 h-6 text-orange-500" /> },
    { text: "Vos fichiers sont lents et truffés d'erreurs ?", icon: <XCircle className="w-6 h-6 text-red-500" /> },
    { text: "Votre CV manque de crédibilité technique ?", icon: <ShieldCheck className="w-6 h-6 text-slate-400" /> },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Pourquoi continuer à stagner ?</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Excel ne devrait pas être une corvée, mais votre meilleur allié.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="mb-4">{p.icon}</div>
              <p className="text-lg font-medium leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TransformationSection = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold leading-tight">La transformation <span className="text-emerald-600">XL Elite</span></h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              On ne vous apprend pas juste à utiliser des formules. On vous apprend à penser comme un architecte de données.
            </p>
            
            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <p className="font-bold">Productivité x2</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Automatisez 80% de vos tâches manuelles avec Power Query et les Macros.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
                <TrendingUp className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <p className="font-bold">Visibilité Professionnelle</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Devenez la référence technique de votre département et boostez votre employabilité.</p>
                </div>
              </div>
            </div>

            <Link href="/preuve" className="mt-12 inline-block">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                Découvrir le programme complet
              </Button>
            </Link>
          </div>
          
          <div className="lg:w-1/2 relative">
             <div className="bg-slate-900 rounded-3xl p-4 shadow-2xl border border-slate-800">
                <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 italic">
                   [Aperçu Dashboard Excel Premium]
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
