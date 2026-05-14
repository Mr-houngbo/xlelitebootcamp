'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Award, Clock, TrendingUp, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const HeroFunnel = () => {
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      {/* Background Video/Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Option 1: Video Background (décommente pour utiliser) */}
        {/* 
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://i.imgur.com/IqKaTmA.mp4" type="video/mp4" />
        </video>
        */}
        
        {/* Option 2: Image Background (actif) */}
        {/* Mobile Image */}
        <img 
          src="/image-principale-mobile.jpg"
          alt="XL Elite Bootcamp - Formation Excel Expert"
          className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
        />
        {/* Desktop Image */}
        <img 
          src="/image-principale-1.jpg"
          alt="XL Elite Bootcamp - Formation Excel Expert"
          className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-slate-900/40" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px]" 
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[80vh] flex flex-col justify-center">
        {/* Dark gradient overlay - more balanced for centered text */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        
        <div className="container px-6 mx-auto max-w-7xl relative z-10 py-12 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8 mb-4">
          
          {/* Main Title - Staggered Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
          >
            Décrochez la certification{' '}
            <span className="block">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-emerald-400"
              >
                Microsoft Excel Expert
              </motion.span>
            </span>
            {' '}en 5 jours intensifs
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-lg text-white/90 font-medium max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            La certification qui vous rend incontournable sur le marché
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <Link href="/inscription" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 md:py-6 text-sm md:text-base font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.95] group shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_25px_50px_-10px_rgba(16,185,129,0.6)] min-h-[50px]"
              >
                Je réserve ma place maintenant
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-4 flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {[
              { icon: Users, value: '+5000', label: 'Professionels formés', color: 'text-white' },
              { icon: Star, value: '4.9/5', label: 'Note moyenne', color: 'text-white' },
              { icon: ShieldCheck, value: '100%', label: 'Certifiés Microsoft Excel', color: 'text-white' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-1.5 text-white/90"
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="font-semibold text-sm">{stat.value}</span>
                <span className="text-white/70 text-[10px] md:text-sm uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        </div>
      </div>

      {/* Floating Cards Section */}
      <div className="relative z-10 bg-white py-8 md:py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-6 md:mb-10">
            <p className="text-sm md:text-xl font-bold text-slate-800">
              Obtenez la reconnaissance internationale qui vous fait gagner des projets internationaux
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-10 max-w-4xl mx-auto px-2">
          
          {/* Card 1 - Certification */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group bg-white rounded-xl p-3 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center"
          >
            <div className="relative w-full aspect-[4/3] md:h-[220px] bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg mb-2 overflow-hidden">
              <Image 
                src="/MOS_365_Certificate_SAMPLE.webp"
                alt="Certification Microsoft Excel Expert"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 400px, 400px"
                className="object-contain p-2 md:p-4"
              />
            </div>
            <h3 className="font-bold text-[10px] md:text-lg text-slate-900 mb-0.5">Certification</h3>
            <p className="text-[8px] md:text-xs text-slate-500 font-medium leading-tight text-center">Microsoft Excel Expert</p>
          </motion.div>
          
          {/* Card 2 - Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group bg-white rounded-xl p-3 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center"
          >
            <div className="relative w-full aspect-[4/3] md:h-[220px] bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg mb-2 overflow-hidden">
              <Image 
                src="/badge.png"
                alt="Badge Microsoft Excel Expert"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-2 md:p-4"
              />
            </div>
            <h3 className="font-bold text-[10px] md:text-lg text-slate-900 mb-0.5">Badge</h3>
            <p className="text-[8px] md:text-xs text-slate-500 font-medium leading-tight text-center">Microsoft Excel Expert</p>
          </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export const TransformationSection = () => {
  return (
    <section className="py-10 md:py-20 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-center lg:text-left">Après 5 jours, vous serez <br /> <span className="text-emerald-600">reconnu officiellement.</span></h2>
            
            <div className="mt-10 md:mt-12 space-y-4 md:space-y-6">
              {[
                { title: "Crédibilité instantanée", desc: "Badge et profil LinkedIn mis à jour immédiatement.", icon: <Award className="w-5 h-5 text-emerald-600" /> },
                { title: "Processus fiabilisés", desc: "Structurez vos automatisations avec les standards Microsoft.", icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> },
                { title: "Carrière accélérée", desc: "Gagnez en légitimité pour négocier une promotion.", icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 md:p-6 rounded-lg md:rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg md:rounded-2xl flex items-center justify-center shrink-0">
                     {item.icon}
                  </div>
                  <div>
                    <p className="text-base md:text-xl font-bold">{item.title}</p>
                    <p className="text-[13px] md:text-base text-slate-600 dark:text-slate-400 leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center lg:text-left">
              <Link href="#programme" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 md:px-10 py-5 md:py-8 text-base md:text-xl font-black rounded-xl shadow-lg shadow-orange-500/20 min-h-[50px]">
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
    <section id="programme" className="py-10 md:py-32 bg-slate-50 dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <span className="text-brand-green font-bold tracking-wider uppercase text-[10px] mb-1 block">Programme détaillé</span>
          <h2 className="text-2xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            Votre feuille de route <span className="text-emerald-600">Expert</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm md:text-xl font-medium max-w-2xl mx-auto">
            Théorie ciblée, cas pratiques et préparation directe à l'examen officiel.
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

        <div className="text-center bg-white dark:bg-slate-800 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-green to-brand-orange"></div>
          <h3 className="text-xl md:text-3xl font-black mb-3">Votre badge Microsoft vous attend.</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">15 places max pour un coaching personnalisé et une validation en conditions réelles.</p>
          <Link href="/inscription">
            <Button size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-emerald-700 text-white px-8 py-5 md:py-8 text-base md:text-xl font-black rounded-xl shadow-lg shadow-brand-green/20 transition-all hover:scale-105 min-h-[50px]">
              Je réserve ma place <ArrowRight className="ml-2 w-5 h-5" />
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
