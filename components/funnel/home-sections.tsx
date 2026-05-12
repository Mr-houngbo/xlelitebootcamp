'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, TrendingUp, ShieldCheck, Zap, Award, AlertTriangle, TrendingDown, Clock, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import { CountdownTimer } from './countdown-timer';

import { Button } from '@/components/ui/button';

export const HeroFunnel = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white">
      {/* Background patterns - Green/White only */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Ambient glowing spots - Green */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-emerald-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[70%] bg-emerald-50/60 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="flex flex-col items-start text-left">
            {/* Social Proof Badge */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 text-emerald-800 text-sm font-bold mb-8 shadow-sm"
            >
               <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-4 h-4 text-emerald-500 fill-emerald-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
               </div>
               <span>4.9/5 par +500 professionnels</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight text-emerald-950 leading-[1.1]"
            >
              Devenez <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-xl">Expert Excel</span> <br className="hidden md:block" />
              Certifié en 4 Jours.
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-emerald-800 font-medium max-w-xl leading-relaxed"
            >
              Rejoignez le bootcamp intensif pensé pour les cadres et analystes. 
              Maîtrisez les fonctions avancées, automatisez vos tâches et décrochez 
              la validation officielle Microsoft.
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 w-full max-w-md"
            >
              <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 shadow-2xl shadow-emerald-900/5">
                <Link href="/inscription" className="block">
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-8 text-xl font-black rounded-2xl shadow-xl shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-95 group">
                    Rejoindre le Bootcamp
                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-center text-emerald-700 text-sm font-bold mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Places limitées pour garantir la qualité
                </p>
              </div>
            </motion.div>

            {/* Fixed Countdown */}
            <CountdownTimer targetDate="2026-06-02T23:59:59" />

            {/* Features/Trust - Green and White */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="mt-10 grid grid-cols-2 gap-y-4 gap-x-6 w-full max-w-xl"
            >
               <div className="flex items-center gap-2.5 text-emerald-900 text-sm md:text-base font-bold">
                 <div className="bg-emerald-100 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /></div>
                 Examen officiel inclus
               </div>
               <div className="flex items-center gap-2.5 text-emerald-900 text-sm md:text-base font-bold">
                 <div className="bg-emerald-100 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /></div>
                 100% Finançable
               </div>
               <div className="flex items-center gap-2.5 text-emerald-900 text-sm md:text-base font-bold">
                 <div className="bg-emerald-100 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /></div>
                 Format intensif 4 jours
               </div>
               <div className="flex items-center gap-2.5 text-emerald-900 text-sm md:text-base font-bold">
                 <div className="bg-emerald-100 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /></div>
                 Coaching personnalisé
               </div>
            </motion.div>

          </div>

          {/* Right Column: Video / Visual Proof */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center lg:pl-10 mt-10 lg:mt-0"
          >
            {/* Decorative background elements for the video */}
            <div className="absolute inset-0 bg-emerald-100 rounded-[2.5rem] transform rotate-3 scale-[1.02] z-0"></div>
            <div className="absolute inset-0 bg-white rounded-[2.5rem] transform -rotate-2 scale-[1.02] border border-emerald-100 z-0 shadow-xl"></div>
            
            <div className="relative z-10 w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white flex flex-col group cursor-pointer">
              <video 
                src="https://i.imgur.com/IqKaTmA.mp4"
                loop 
                muted
                autoPlay
                playsInline 
                className="w-full h-full object-cover"
              />
              {/* Overlay elements */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-emerald-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-emerald-950 font-bold text-sm">Découvrez la méthode</p>
                      <p className="text-emerald-700 text-xs font-medium">Aperçu en vidéo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-4 md:-right-8 top-12 z-30 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 animate-bounce" style={{ animationDuration: '4s' }}>
               <div className="flex items-center gap-3">
                 <div className="bg-emerald-50 p-2.5 rounded-xl">
                   <TrendingUp className="w-6 h-6 text-emerald-600" />
                 </div>
                 <div>
                   <p className="text-emerald-950 font-black text-base">+40%</p>
                   <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Productivité</p>
                 </div>
               </div>
            </div>
            
            <div className="absolute -left-4 md:-left-8 bottom-32 z-30 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
               <div className="flex items-center gap-3">
                 <div className="bg-emerald-50 p-2.5 rounded-xl">
                   <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                 </div>
                 <div>
                   <p className="text-emerald-950 font-black text-base">Expert</p>
                   <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Niveau Visé</p>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export const ProblemSection = () => {
  const problems = [
    {
      title: "Compétences avancées non reconnues",
      desc: "Vous livrez déjà des analyses solides, mais sans badge Microsoft vos projets restent invisibles pour la hiérarchie.",
      icon: <Award className="w-5 h-5 text-orange-500" />
    },
    {
      title: "Automatisations artisanales",
      desc: "Macros qui cassent, fichiers lourds, process dépendants d'une seule personne : sans méthode certif, le risque est permanent.",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />
    },
    {
      title: "Opportunités manquées",
      desc: "Postes seniors, missions internationales, consulting… La certification Microsoft est devenue un prérequis pour être shortlisté.",
      icon: <TrendingDown className="w-5 h-5 text-slate-500" />
    },
  ];

  return (
    <section id="en-savoir-plus" className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-red-500 font-bold tracking-wider uppercase text-xs mb-2 block">Le constat</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Vous maîtrisez Excel, mais <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">il vous manque la validation officielle.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300"
            >
              <div className="mb-4 w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-600 shadow-inner shrink-0">
                {p.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold leading-tight text-slate-900 dark:text-white mb-2">
                {p.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-snug">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-center lg:text-left">Après 4 jours, vous serez <br /> <span className="text-emerald-600">reconnu officiellement.</span></h2>
            
            <div className="mt-10 md:mt-12 space-y-4 md:space-y-6">
              {[
                { title: "Crédibilité instantanée", desc: "Badge Microsoft Excel Expert et profil LinkedIn mis à jour dès la réussite de l'examen.", icon: <Award className="w-6 h-6 text-emerald-600" /> },
                { title: "Processus fiabilisés", desc: "Vous structurez vos automatisations avec les standards Microsoft pour sécuriser vos équipes.", icon: <ShieldCheck className="w-6 h-6 text-emerald-600" /> },
                { title: "Plan de carrière accéléré", desc: "Vous gagnez en légitimité pour négocier une promotion, une mission senior ou un transfert international.", icon: <TrendingUp className="w-6 h-6 text-emerald-600" /> },
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
                  Découvrir la feuille de route vers l'examen
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
    { day: "Jour 1", title: "Fondamentaux de l'examen", desc: "Règles Microsoft, bonnes pratiques de modélisation, attentes du barème.", },
    { day: "Jour 2", title: "Fonctions avancées & cas métier", desc: "INDEX/EQUIV, XLOOKUP, LET, LAMBDA et scénarios inspirés d'audit financier.", },
    { day: "Jour 3", title: "Data Analytics & Tableaux croisés", desc: "Storytelling data, dashboards interactifs et simulations d'épreuve chronométrée.", },
    { day: "Jour 4", title: "Power Query & Simulation d'examen", desc: "Automatisation complète, corrections coachées et passage blanc du test Microsoft.", },
  ];

  return (
    <section id="programme" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-brand-green font-bold tracking-wider uppercase text-sm mb-2 block">Ce qui vous attend</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            La feuille de route pour décrocher <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Microsoft Excel Expert</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Chaque journée mêle théorie ciblée, cas pratiques issus de missions réelles et préparation directe à l'examen officiel.
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
          <h3 className="text-2xl md:text-3xl font-black mb-4">Votre badge Microsoft Excel Expert vous attend.</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">15 places maximum pour un coaching personnalisé, des simulations d'examen et une validation en conditions réelles.</p>
          <Link href="/inscription">
            <Button size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-emerald-700 text-white px-10 py-8 text-xl font-black rounded-2xl shadow-xl shadow-brand-green/20 transition-all hover:scale-105">
              Réserver ma place pour la prochaine session <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
