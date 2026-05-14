'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, XCircle, ArrowRight, TrendingUp, ShieldCheck, Zap, Award, AlertTriangle, TrendingDown, Clock, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const HeroFunnel = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-white">
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
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 md:mb-8 text-slate-900"
            >
              Expert Excel Certifié<br className="hidden sm:block" /> en <span className="text-emerald-600">5 Jours</span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-base md:text-2xl text-slate-700 font-semibold max-w-xl mb-8"
            >
              Bootcamp intensif + Certification Microsoft officielle
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md space-y-4"
            >
              <Link href="/inscription" className="block">
                <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-7 md:py-9 text-lg md:text-2xl font-black rounded-2xl shadow-2xl shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95 group min-h-[64px]">
                  Je réserve ma place maintenant
                  <ArrowRight className="ml-2 w-5 h-5 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {/* Urgency Countdown integrated */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600 animate-pulse" />
                  <span className="text-sm md:text-base font-black text-orange-900">Clôture dans</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TimeUnit value={8} label="J" />
                  <TimeUnit value={14} label="H" />
                  <TimeUnit value={32} label="M" />
                </div>
              </div>
              
              <p className="text-center text-slate-600 text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 12 places restantes
              </p>
            </motion.div>

          </div>

          {/* Right Column: Video / Visual Proof */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center lg:pl-10 mt-10 lg:mt-0"
          >
            <div className="relative z-10 w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              <video 
                src="https://i.imgur.com/IqKaTmA.mp4"
                loop 
                muted
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-90"
              />
              {/* Overlay avec bénéfice direct */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <p className="text-white text-2xl md:text-4xl font-black leading-tight mb-2">
                  Passez de débutant à Expert certifié
                </p>
                <p className="text-emerald-400 text-sm md:text-lg font-bold">
                  En 5 jours seulement • Certification Microsoft incluse
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export const TransformationSection = () => {
  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-center lg:text-left">Après 5 jours, vous serez <br /> <span className="text-emerald-600">reconnu officiellement.</span></h2>
            
            <div className="mt-10 md:mt-12 space-y-4 md:space-y-6">
              {[
                { title: "Crédibilité instantanée", desc: "Badge Microsoft Excel Expert et profil LinkedIn mis à jour dès la réussite de l'examen.", icon: <Award className="w-6 h-6 text-emerald-600" /> },
                { title: "Processus fiabilisés", desc: "Vous structurez vos automatisations avec les standards Microsoft pour sécuriser vos équipes.", icon: <ShieldCheck className="w-6 h-6 text-emerald-600" /> },
                { title: "Plan de carrière accéléré", desc: "Vous gagnez en légitimité pour négocier une promotion, une mission senior ou un transfert international.", icon: <TrendingUp className="w-6 h-6 text-emerald-600" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg md:rounded-2xl flex items-center justify-center shrink-0">
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
                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 md:px-10 py-6 md:py-8 text-base md:text-xl font-black rounded-2xl shadow-xl shadow-orange-500/20 min-h-[56px]">
                  Je réserve ma place
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
                  preload="metadata"
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
            <Button size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-emerald-700 text-white px-10 py-8 text-base md:text-xl font-black rounded-2xl shadow-xl shadow-brand-green/20 transition-all hover:scale-105 min-h-[56px]">
              Je réserve ma place <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1">
    <span className="text-base md:text-xl font-black text-orange-900 font-mono tabular-nums leading-none">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[9px] md:text-[10px] font-bold text-orange-700 uppercase">{label}</span>
  </div>
);
