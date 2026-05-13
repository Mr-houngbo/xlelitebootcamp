'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Star, Award, Users, Calendar, Clock, MapPin, CheckCircle2,
  HelpCircle, ChevronDown, ShieldCheck, Laptop, Zap, TrendingUp,
  Linkedin, Play, Pause, Volume2, VolumeX, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';

export const HeroProof = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="container px-4 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-4 md:mb-6"
        >
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
          </div>
          <span className="font-bold text-slate-600 dark:text-slate-400 text-sm md:text-sm">4.9/5 satisfaction (500+ pros)</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-6xl font-black tracking-tight mb-6 md:mb-8 leading-tight"
        >
          Ils sont passés de débutants à <br className="hidden md:block" />
          <span className="text-emerald-600 font-black italic">certifiés Microsoft Excel Expert</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/inscription">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-8 text-base md:text-xl font-black rounded-2xl shadow-2xl shadow-emerald-600/30 min-h-[56px]">
              Je réserve ma place
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// --- SMARTPHONE PRESTIGE VIDEO CARD ---
const VideoTestimonialCard = ({ testimonial, active = false }: { testimonial: any, active?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(e => console.error("Playback failed", e));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`group relative w-full aspect-[9/16] rounded-[2.5rem] overflow-hidden border-2 border-emerald-500 bg-slate-950 transition-all duration-500 ${active ? 'shadow-[0_20px_50px_rgba(16,185,129,0.3)] scale-[1.02]' : 'hover:scale-[1.01]'}`}>

      <video
        ref={videoRef}
        src={testimonial.video_url}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* HUD Simple */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className={`w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl transition-all duration-500 ${isPlaying ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          <Play className="w-5 h-5 text-white fill-current ml-1" />
        </div>
      </button>

      {/* Label Net */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <h4 className="text-lg font-bold text-white leading-tight">{testimonial.participant_name}</h4>
        <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">{testimonial.company}</p>
      </div>
    </div>
  );
};

export const ConcreteTestimonials = () => {
  const textTestimonials = [
    { id: '1', participant_name: 'Boling Faraba Dembele', company: 'Mali', testimonial: "Vraiment j'ai été transformé par ce Cabinet Smart Otobos Consulting, la pédagogie de M LEONCE (coach) et le niveau de la formation étaient au summum de nos attentes.", participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boling' },
    { id: '2', participant_name: 'Abou Ouattara', company: 'Ouagadougou', testimonial: "Un grand merci au Cabinet Otobos Consulting et particulièrement à notre formateur, Léonce TOUNDE SODJINOU, pour la perfection avec laquelle la formation a été administrée.", participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abou' },
    { id: '3', participant_name: 'Ib Zahara', company: 'Cote d\'ivoire', testimonial: "Bonjour Coach, nous avons été très satisfait de la qualité et temps accorder aux participants. Franchement ça me fait un bout de temps sur les formations en ligne, la votre a été du jamais vu.", participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zahara' },
    { id: '4', participant_name: 'Harris Djounga', company: 'Accra', testimonial: "Merci pour tout, formateur excellent, technique de formation de bonne qualité, contenu riche et varié. De toute les formations en ligne que j'ai déjà faite, la votre est de loin la meilleur.", participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harris' },
    { id: '5', participant_name: 'Abdoulaye Wolomo', company: 'Bamako, Mali', testimonial: "Bonjour tout je remercie le formateur et Son équipe pour la qualité de la formation reçu. Toutes mes attentes ont été satisfait à 100%. Je recommande fortement la formation.", participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdoulaye' },
  ];

  return (
    <section id="temoignages" className="py-12 md:py-16 bg-slate-950 text-white overflow-hidden relative border-y border-white/5">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex items-center justify-center gap-8 mb-12 opacity-30">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
          <span className="text-xs font-black uppercase tracking-[0.5em] whitespace-nowrap">Ils sont passés par là</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
        </div>

        <div className="relative mb-12 overflow-hidden py-4">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1500] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {[...textTestimonials, ...textTestimonials].map((t, idx) => (
              <div key={`${t.id}-${idx}`} className="w-[260px] md:w-[450px] p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all shrink-0 whitespace-normal">
                <div className="flex gap-1 mb-6 text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-sm md:text-lg leading-relaxed text-slate-300 font-medium mb-4 md:mb-8 italic">"{t.testimonial}"</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 h-12 rounded-full border-2 border-emerald-500/20 p-0.5 bg-slate-800 shrink-0">
                    <img src={t.participant_photo} alt="" className="w-full h-full rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-sm">{t.participant_name}</h4>
                    <p className="text-xs text-slate-500 uppercase font-black tracking-widest">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const RealActions = () => {
  const videoTestimonials = [
    { id: 'v1', participant_name: 'N\'GUESSAN KOFFI', company: 'Burkina Faso', video_url: 'https://i.imgur.com/vhgB6bF.mp4' },
    { id: 'v4', participant_name: 'NIANG Coumba', company: 'Senegal', video_url: 'https://i.imgur.com/Qol4jUS.mp4' },
    { id: 'v5', participant_name: 'Comlan Herman', company: 'Benin', video_url: 'https://i.imgur.com/95TsFVD.mp4' }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      
      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Ce sont eux qui en parlent <br className="hidden md:block" />
            <span className="text-emerald-600">le mieux.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Découvrez comment le Bootcamp a transformé leur quotidien.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Indicateurs de scroll pour mobile */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto overflow-x-auto scrollbar-hide pb-6 snap-x px-4 md:px-0 -mx-4 md:mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-[240px] md:w-auto shrink-0 snap-center mt-0 md:mt-12"
            >
              <VideoTestimonialCard testimonial={videoTestimonials[0]} active={true} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-[240px] md:w-auto shrink-0 snap-center mt-0"
            >
              <VideoTestimonialCard testimonial={videoTestimonials[1]} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-[240px] md:w-auto shrink-0 snap-center mt-0 md:mt-24"
            >
              <VideoTestimonialCard testimonial={videoTestimonials[2]} />
            </motion.div>
          </div>
          
          {/* Indicateur visuel de scroll mobile */}
          <div className="md:hidden text-center mt-4">
            <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Swipez pour voir plus
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};






export const OrganizationSection = () => {
  return (
    <section id="organisation" className="py-12 md:py-16 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto max-w-5xl">
        <h2 className="text-xl md:text-4xl font-black mb-6 md:mb-10 text-center leading-tight">Une organisation <br className="md:hidden" />flexible pour les pros</h2>

        <div className="grid grid-cols-3 gap-2 md:gap-8">
          <div className="p-3 md:p-8 rounded-lg md:rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/20">
            <Calendar className="w-6 h-6 md:w-10 md:h-10 text-emerald-600 mb-2 md:mb-6" />
            <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-2 leading-tight">5 jours</h3>
            <p className="text-[10px] md:text-base text-slate-600 dark:text-slate-400 leading-snug">Du 09 au 13 juin 2026</p>
          </div>

          <div className="p-3 md:p-8 rounded-lg md:rounded-3xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20">
            <Clock className="w-6 h-6 md:w-10 md:h-10 text-orange-600 mb-2 md:mb-6" />
            <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-2 leading-tight">3 Groupes</h3>
            <ul className="text-[9px] md:text-sm space-y-0.5 md:space-y-2 text-slate-700 dark:text-slate-300 font-bold">
              <li>G1: 09h-12h</li>
              <li>G2: 14h-17h</li>
              <li>G3: 18h-21h</li>
            </ul>
          </div>

          <div className="p-3 md:p-8 rounded-lg md:rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <div className="flex gap-1 md:gap-2 mb-2 md:mb-6">
              <MapPin className="w-5 h-5 md:w-10 md:h-10 text-slate-600" />
              <Laptop className="w-5 h-5 md:w-10 md:h-10 text-slate-600" />
            </div>
            <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-2 leading-tight">Hybride</h3>
            <p className="text-[10px] md:text-base text-slate-600 dark:text-slate-400 leading-snug">Présentiel ou 100% en ligne</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section supprimée - inclusions maintenant dans FinancialOffer

export const FinancialOffer = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight mb-2 md:mb-4">Un budget unique pour une certification à vie</h2>
        </div>

        <div className="bg-slate-900 rounded-3xl md:rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* Left Side: Pricing + Inclusions */}
          <div className="p-5 md:p-16 flex-1 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="space-y-8 mb-10">
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wider mb-3">Frais d'inscription</p>
                <p className="text-3xl md:text-5xl font-black text-white">25 000 F</p>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wider mb-3">Frais de participation</p>
                <p className="text-3xl md:text-5xl font-black text-white">125 000 F</p>
              </div>
            </div>

            {/* Ce qui est inclus */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
              <p className="text-emerald-400 font-black text-sm uppercase tracking-wider mb-4">Tout ce à quoi vous aurez droit</p>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg shrink-0">✓</span>
                  <span className="text-sm md:text-base">2 vouchers officiels + frais d'examen compris</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg shrink-0">✓</span>
                  <span className="text-sm md:text-base">Licence Office 365 + environnement d'entraînement dédié</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg shrink-0">✓</span>
                  <span className="text-sm md:text-base">Mentoring post-examen pour rentabiliser votre investissement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg shrink-0">✓</span>
                  <span className="text-sm md:text-base">+10 Simulateurs d'examens réels</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Total & CTA */}
          <div className="bg-emerald-600 p-5 md:p-16 w-full lg:w-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10">
              
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3 text-white">
                    <Clock className="w-4 h-4 text-emerald-300" />
                    <p className="text-sm font-black uppercase tracking-widest">Clôture des inscriptions : <span className="text-emerald-300">02 Juin</span></p>
                  </div>
                </div>

                <Link href="/inscription" className="block group">
                  <Button size="lg" className="w-full bg-white hover:bg-slate-50 text-emerald-950 px-4 py-4 md:px-12 md:py-8 text-base md:text-xl font-black rounded-xl md:rounded-2xl shadow-2xl transition-all hover:scale-[1.03] group flex items-center justify-center min-h-[56px]">
                    <Lock className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" /> Je réserve ma place
                  </Button>
                  <p className="mt-4 text-emerald-100/60 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors italic">⚠️ Places limitées</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQProof = () => {
  const categories = [
    { id: 'formation', label: 'Formation', icon: <Zap className="w-4 h-4" /> },
    { id: 'certif', label: 'Certif', icon: <Award className="w-4 h-4" /> },
    { id: 'orga', label: 'Organisation', icon: <Clock className="w-4 h-4" /> },
    { id: 'prix', label: 'Prix', icon: <Users className="w-4 h-4" /> },
    { id: 'logistique', label: 'Logistique', icon: <MapPin className="w-4 h-4" /> },
    { id: 'carriere', label: 'Carrière', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'accompagnement', label: 'Suivi', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'decision', label: 'Décision', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const faqs = [
    // SUR LA FORMATION
    { cat: 'formation', q: "Est-ce que ce bootcamp est fait pour moi ?", a: "Oui si vous utilisez Excel dans votre travail et que vous voulez gagner du temps, être plus efficace et valoriser votre profil. Un niveau intermédiaire est recommandé." },
    { cat: 'formation', q: "Je suis débutant, est-ce que je peux suivre ?", a: "Le bootcamp est intensif. Si vous maîtrisez déjà les bases (formules simples, tableaux), vous pourrez suivre. Sinon, une mise à niveau est conseillée avant." },
    { cat: 'formation', q: "Qu’est-ce que je vais concrètement savoir faire après ?", a: "Automatiser vos tâches, nettoyer des données, créer des dashboards professionnels et réussir la certification Microsoft Excel Expert." },
    { cat: 'formation', q: "Est-ce vraiment possible de progresser en 4 jours ?", a: "Oui, car la formation est focalisée sur l’essentiel + pratique intensive. Vous travaillez sur des cas réels, pas de théorie inutile." },
    { cat: 'formation', q: "Est-ce une formation théorique ou pratique ?", a: "90% pratique. Vous appliquez immédiatement chaque notion sur Excel." },

    // CERTIFICATION
    { cat: 'certif', q: "La certification est-elle officielle ?", a: "Oui, il s’agit de la certification Microsoft Excel Expert reconnue à l’international." },
    { cat: 'certif', q: "L’examen est inclus ?", a: "Oui, vous avez 2 vouchers (2 tentatives incluses)." },
    { cat: 'certif', q: "Et si j’échoue à la certification ?", a: "Vous avez une deuxième tentative incluse. De plus, le bootcamp vous prépare spécifiquement à réussir." },
    { cat: 'certif', q: "Est-ce que cette certification a de la valeur sur le marché ?", a: "Oui. Elle renforce votre crédibilité technique et est reconnue par les recruteurs et entreprises." },

    // ORGANISATION
    { cat: 'orga', q: "Quels sont les horaires ?", a: "3 groupes au choix : G1 (09h–12h), G2 (14h–17h), G3 (18h–21h)." },
    { cat: 'orga', q: "Puis-je changer de groupe après inscription ?", a: "Oui, sous réserve de disponibilité dans un autre groupe." },
    { cat: 'orga', q: "Est-ce que je peux suivre en ligne ?", a: "Oui, le bootcamp est hybride : présentiel ou en ligne en direct." },
    { cat: 'orga', q: "Est-ce que les sessions sont enregistrées ?", a: "Non, pour garantir l’engagement et la qualité de l’apprentissage." },
    { cat: 'orga', q: "Combien de participants par groupe ?", a: "Les groupes sont limités pour garantir un accompagnement de qualité." },

    // PRIX & INSCRIPTION
    { cat: 'prix', q: "Combien coûte la formation ?", a: "125 000 F CFA (+ 25 000 F d'inscription)." },
    { cat: 'prix', q: "À quoi correspondent les 25 000 F d’inscription ?", a: "Ils permettent de réserver votre place et de sécuriser votre participation." },
    { cat: 'prix', q: "Puis-je payer en plusieurs fois ?", a: "Oui, des facilités peuvent être proposées selon votre situation." },
    { cat: 'prix', q: "Y a-t-il un remboursement ?", a: "Les conditions sont précisées dans les CGV. L’objectif est de garantir votre engagement." },
    { cat: 'prix', q: "Pourquoi les places sont-elles limitées ?", a: "Pour assurer un suivi personnalisé et une meilleure qualité d’apprentissage." },

    // LOGISTIQUE
    { cat: 'logistique', q: "Où se déroule la formation en présentiel ?", a: "À Ouaga 2000, Burkina Faso." },
    { cat: 'logistique', q: "Dois-je venir avec mon ordinateur ?", a: "Oui, un ordinateur portable est nécessaire pour pratiquer." },
    { cat: 'logistique', q: "Quels logiciels sont nécessaires ?", a: "Excel (Office 365 recommandé). Une licence est offerte dans le cadre du bootcamp." },

    // IMPACT & CARRIÈRE
    { cat: 'carriere', q: "Est-ce que ça peut vraiment impacter ma carrière ?", a: "Oui. Excel est une compétence clé. La certification + la maîtrise avancée font la différence." },
    { cat: 'carriere', q: "Est-ce utile si je ne suis pas dans la finance ?", a: "Oui. Excel est utilisé en RH, logistique, marketing, gestion, etc." },
    { cat: 'carriere', q: "Vais-je vraiment gagner du temps après ?", a: "Oui. L’objectif est d’automatiser une grande partie de vos tâches répétitives." },
    { cat: 'carriere', q: "Est-ce que je peux utiliser ça immédiatement au travail ?", a: "Oui, les cas étudiés sont directement applicables." },

    // ACCOMPAGNEMENT
    { cat: 'accompagnement', q: "Y a-t-il un suivi après la formation ?", a: "Oui, vous bénéficiez d’un accompagnement et support après le bootcamp." },
    { cat: 'accompagnement', q: "Puis-je poser des questions pendant la formation ?", a: "Bien sûr. L’accompagnement est interactif." },
    { cat: 'accompagnement', q: "Y a-t-il une communauté ?", a: "Oui, vous rejoignez un réseau de participants et d’anciens." },

    // DÉCISION
    { cat: 'decision', q: "Pourquoi devrais-je m’inscrire maintenant ?", a: "Parce que les places sont limitées et que les inscriptions ferment le 02 juin." },
    { cat: 'decision', q: "Que se passe-t-il si j’attends ?", a: "Vous risquez de ne plus avoir de place dans votre créneau préféré." },
    { cat: 'decision', q: "Comment m’inscrire ?", a: "Remplissez le formulaire et payez les frais d’inscription (25 000 F CFA)." },
    { cat: 'decision', q: "Et si j’ai encore une question ?", a: "Vous pouvez nous contacter directement par email ou WhatsApp." },
    { cat: 'decision', q: "Est-ce que ça vaut vraiment le coup ?", a: "Si vous utilisez Excel régulièrement et que vous voulez passer un cap rapidement : oui, clairement." },
  ];

  const [activeCat, setActiveCat] = useState('formation');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-12 md:py-16 bg-white dark:bg-slate-950">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">Des questions ?</h2>
          <p className="text-sm md:text-base text-slate-500 font-medium italic px-4">Tout ce que vous devez savoir pour décider.</p>
        </div>

        {/* Category List - Scrollable horizontally */}
        <div className="relative mb-12 py-2 border-y border-slate-100 dark:border-slate-800">
          {/* Indicateurs de scroll pour mobile */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 overflow-x-auto faq-scrollbar pb-4 pt-2 px-2 w-full snap-x scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCat(cat.id); setOpenIndex(null); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm md:text-sm font-black transition-all shrink-0 snap-start ${activeCat === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100'
                  }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
          
          {/* Indicateur visuel de scroll mobile */}
          <div className="md:hidden text-center mt-2">
            <p className="text-xs text-slate-400 font-medium">← Swipez pour explorer les catégories →</p>
          </div>
        </div>

        {/* FAQ Items with Animation */}
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-3 min-h-[400px]"
        >
          {faqs.filter(f => f.cat === activeCat).map((f, i) => (
            <div key={i} className="group">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl border transition-all duration-300 ${openIndex === i
                  ? 'bg-emerald-50/30 dark:bg-emerald-900/5 border-emerald-500/50 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-200'
                  }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-bold text-sm md:text-lg text-slate-900 dark:text-white leading-snug">
                    {f.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-4">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const TrainerSection = () => {
  const achievements = [
    {
      title: 'Triple certifié Microsoft Excel',
      desc: 'Expert 2019 • Expert 365 • Associate 365 for Accounting',
    },
    {
      title: 'Expertise data & finance digitale',
      desc: 'Automatisation, analyse de données et pilotage financier au service de votre performance.',
    },
    {
      title: 'Formateur de terrain',
      desc: 'Des bootcamps conduits sur tout le continent avec un accompagnement humain et concret.',
    },
  ];

  const stats = [
    { value: '+500', label: 'Professionnels formés', tone: 'text-emerald-500' },
    { value: '18', label: 'Bootcamps intensifs', tone: 'text-orange-500' },
    { value: '12', label: 'Pays accompagnés', tone: 'text-sky-500' },
  ];

  const certificationArtifacts = [
    {
      src: '/certificat/IMG-20230906-WA0055.jpg',
      label: 'Microsoft Excel Expert',
      batch: 'Session Bamako',
    },
    {
      src: '/certificat/IMG-20250516-WA0043.jpg',
      label: 'Excel Expert 365',
      batch: 'Cohorte Abidjan',
    },
    {
      src: '/certificat/IMG-20260320-WA0009.jpg',
      label: 'Excel Associate',
      batch: 'Promotion Ouaga 2000',
    },
  ];

  const galleryRows = [
    [
      '/illustrations/form_1.jpeg',
      '/illustrations/form_2.jpeg',
      '/illustrations/form_3.jpeg',
      '/illustrations/form_4.jpeg',
      '/illustrations/form_5.jpeg',
      '/illustrations/form_6.jpeg',
      '/illustrations/form_7.jpeg',
      '/illustrations/IMG-20230808-WA0012.jpg',
      '/illustrations/IMG-20260403-WA0063.jpg',
    ],
    [
      '/illustrations/IMG-20230808-WA0013.jpg',
      '/illustrations/IMG-20230808-WA0014.jpg',
      '/illustrations/IMG-20251210-WA0019.jpg',
      '/illustrations/IMG-20250703-WA0016.jpg',
      '/illustrations/FB_IMG_1735152498589.jpg',
      '/illustrations/IMG-20260403-WA0064.jpg',
      '/illustrations/IMG-20251210-WA0011.jpg',
      '/illustrations/IMG-20250403-WA0041.jpg',
      '/illustrations/IMG-20260404-WA0035.jpg',
    ],
  ];

  return (
    <section id="formateur" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="space-y-12 md:space-y-16">
          <div className="relative overflow-hidden rounded-3xl md:rounded-[3rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.4)]">
            <div className="absolute -top-32 -right-20 w-72 h-72 bg-emerald-500/20 blur-[120px] rounded-full" />
            <div className="absolute -bottom-20 left-0 w-60 h-60 bg-orange-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10 grid md:grid-cols-5 gap-6 md:gap-16 p-6 md:p-16">
              <div className="md:col-span-2">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl">
                  <Image
                    src="/formateur/Leonce.jpg"
                    alt="Léonce TOUNDE SODJINOU - Formateur du bootcamp XL Elite"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-[0.3em] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Mentor
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <p className="text-lg font-black tracking-tight">Léonce TOUNDE SODJINOU</p>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-[0.2em]">Expert Excel • Coach-Formateur</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-8">
                <div>
                  <span className="inline-flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-4">
                    Votre Formateur
                  </span>
                  <h2 className="text-[1.35rem] md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 md:mb-6">
                    L’architecte de votre montée en puissance sur Excel
                  </h2>
                  <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                    <p>
                      <strong className="text-slate-900 dark:text-white">Léonce TOUNDE SODJINOU</strong> accompagne depuis plus de 5 ans les équipes financières, RH et opérationnelles à structurer leurs données pour décider plus vite.
                    </p>
                    <p>
                      Sa pédagogie mêle cas métiers, dashboards temps réel et automatisations Power Query. Chaque bootcamp est calibré pour décrocher la certification Microsoft Excel Expert dès la fin de la semaine.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-5 text-center"
                    >
                      <p className={`text-3xl font-black ${stat.tone}`}>{stat.value}</p>
                      <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-slate-500 dark:text-slate-400 mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {achievements.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl md:rounded-[3rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-6 md:p-14 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.45)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.4em] font-black text-slate-400">Galerie terrain</span>
                <h2 className="text-xl md:text-4xl font-black text-slate-900 dark:text-white mt-2">
                  Des bootcamps en mouvement
                </h2>
              </div>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl">
                Revivez l’énergie des précédentes promotions avec des images authentiques, capturées sur le terrain.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-white/5 py-6 md:py-10">
              <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white dark:from-slate-950 to-transparent pointer-events-none z-20" />
              <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white dark:from-slate-950 to-transparent pointer-events-none z-20" />

              <div className="space-y-6 md:space-y-10">
                {galleryRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex overflow-hidden">
                    <motion.div
                      className="flex w-max"
                      animate={{ x: rowIndex % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      whileHover={{ animationPlayState: 'paused' }}
                    >
                      {[0, 1].map((set) => (
                        <div key={set} className="flex gap-4 md:gap-6 px-2 md:px-3">
                          {row.map((src, idx) => (
                            <div
                              key={`${src}-${idx}`}
                              className="relative w-[240px] md:w-[400px] aspect-[16/9] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 dark:border-slate-700/60 shadow-lg bg-white dark:bg-slate-900 shrink-0 group"
                            >
                              <Image
                                src={src}
                                alt="Moment de bootcamp XL Elite"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 300px, 400px"
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
