'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
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
          <span className="font-bold text-slate-600 dark:text-slate-400 text-xs md:text-sm">4.9/5 satisfaction (500+ pros)</span>
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
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-8 text-xl font-black rounded-2xl shadow-2xl shadow-emerald-600/30">
              Réserver ma place maintenant
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
        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{testimonial.company}</p>
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
    <section className="py-20 bg-slate-950 text-white overflow-hidden relative border-y border-white/5">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex items-center justify-center gap-8 mb-12 opacity-30">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">Ils sont passés par là</span>
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
              <div key={`${t.id}-${idx}`} className="w-[300px] md:w-[450px] p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all shrink-0 whitespace-normal">
                <div className="flex gap-1 mb-6 text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-sm md:text-lg leading-relaxed text-slate-300 font-medium mb-8 italic">"{t.testimonial}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 p-0.5 bg-slate-800">
                    <img src={t.participant_photo} alt="" className="w-full h-full rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs md:text-sm">{t.participant_name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t.company}</p>
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
    { id: 'v5', participant_name: 'Comlan Herman', company: 'Benin', video_url: 'https://i.imgur.com/95TsFVD.mp4' },
    { id: 'v2', participant_name: 'KOUADIO Dominique KONIN', company: 'Côte d\'Ivoire', video_url: 'https://i.imgur.com/2je7YyL.mp4' },
  ];

  const actions = [
    { title: "Nettoyer vos données", desc: "Dites adieu au copier-coller. Utilisez Power Query pour traiter des milliers de lignes en un clic.", icon: <Zap className="w-6 h-6" /> },
    { title: "Automatiser vos tâches", desc: "Créez des macros intelligentes qui font le travail à votre place.", icon: <Laptop className="w-6 h-6" /> },
    { title: "Créer des Dashboards", desc: "Concevez des tableaux de bord dynamiques qui impressionnent votre direction.", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Valider votre Certification", desc: "Passez l'examen officiel Microsoft Excel Expert le dernier jour.", icon: <Award className="w-6 h-6" /> }
  ];

  return (
    <section className="py-24 md:py-48 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Left: Actions */}
          <div className="space-y-16">
            <div>
              <div className="w-20 h-1 bg-emerald-600 mb-8" />
              <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter text-slate-900 dark:text-white">
                Faire. <br />
                Prouver. <br />
                <span className="text-emerald-600">Réussir.</span>
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg">
                Notre méthode repose sur la pratique intensive. Vous ne regardez pas quelqu'un faire, vous agissez.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {actions.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-8 group"
                >
                  <div className="text-emerald-600 group-hover:scale-125 transition-transform duration-500">
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">{a.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Focused Video Showcase (4 Videos) */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-2 gap-4 md:gap-6 items-start">
              <div className="space-y-4 md:space-y-6 pt-12">
                <VideoTestimonialCard testimonial={videoTestimonials[0]} active={true} />
                <VideoTestimonialCard testimonial={videoTestimonials[2]} />
              </div>
              <div className="space-y-4 md:space-y-6">
                <VideoTestimonialCard testimonial={videoTestimonials[1]} />
                <VideoTestimonialCard testimonial={videoTestimonials[3]} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};






export const OrganizationSection = () => {
  return (
    <section className="py-12 md:py-24 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto max-w-5xl">
        <h2 className="text-xl md:text-4xl font-black mb-8 md:mb-16 text-center leading-tight">Une organisation <br className="md:hidden" />flexible pour les pros</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/20">
            <Calendar className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl font-bold mb-2">4 Jours Intensifs</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Du 09 au 13 juin 2026. Une immersion totale pour des résultats immédiats.</p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20">
            <Clock className="w-8 h-8 md:w-10 md:h-10 text-orange-600 mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl font-bold mb-2">3 Groupes au choix</h3>
            <ul className="text-[12px] md:text-sm space-y-2 text-slate-700 dark:text-slate-300 font-bold mt-3">
              <li>• G1 : 09h – 12h</li>
              <li>• G2 : 14h – 17h</li>
              <li>• G3 : 18h – 21h</li>
            </ul>
            <p className="text-[10px] text-slate-500 mt-4 italic">Choisissez le créneau qui vous convient.</p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <div className="flex gap-2 mb-4 md:mb-6">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 text-slate-600" />
              <Laptop className="w-8 h-8 md:w-10 md:h-10 text-slate-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Format Hybride</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">En présentiel à Ouaga 2000 ou en ligne (Live) avec interaction directe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const InclusionsSection = () => {
  return (
    <section className="py-12 md:py-24 bg-emerald-900 text-white overflow-hidden relative">
      <div className="container px-4 mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-xl md:text-4xl font-bold mb-8 md:mb-12 leading-tight">Tout est inclus <br className="md:hidden" />pour votre réussite</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
          {[
            { icon: <Award className="w-6 h-6 text-orange-400 shrink-0" />, text: "2 Vouchers pour la Certification Microsoft Excel Expert." },
            { icon: <ShieldCheck className="w-6 h-6 text-orange-400 shrink-0" />, text: "Licence Office 365 offerte pour pratiquer." },
            { icon: <Users className="w-6 h-6 text-orange-400 shrink-0" />, text: "Support post-formation & accès communauté." },
            { icon: <CheckCircle2 className="w-6 h-6 text-orange-400 shrink-0" />, text: "Matériel complet et fichiers réels." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white/10 rounded-xl border border-white/10 items-center">
              {item.icon}
              <p className="font-bold text-sm md:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FinancialOffer = () => {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Investissez dans votre futur </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg italic">Un pack complet incluant formation intensive et certification officielle Microsoft.</p>
        </div>

        <div className="bg-slate-900 rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* Left Side: Pricing Details */}
          <div className="p-8 md:p-16 flex-1 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Offre Limitée</span>
            </div>

            <div className="space-y-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Frais d'inscription</p>
                  <p className="text-3xl md:text-4xl font-black text-white">25 000 F</p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Frais de formation</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl md:text-4xl font-black text-white/90">125 000 F</p>
                  <span className="text-slate-500 text-sm font-medium">/ sessions complètes</span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white mb-1">Paiement Sécurisé & Inclus</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Tout est inclus : Support de cours, Voucher de certification (2 essais) et licence Office 365.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Total & CTA */}
          <div className="bg-emerald-600 p-8 md:p-16 w-full lg:w-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10">
              <p className="text-emerald-100/60 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Investissement Total</p>
              <div className="relative inline-block mb-8">
                <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-50" />
                <h3 className="text-5xl md:text-7xl font-black text-white relative leading-none">150K</h3>
                <span className="text-emerald-100 font-bold text-xl ml-1 tracking-tighter uppercase opacity-80">CFA</span>
              </div>

              <div className="space-y-8">
                <div className="inline-block px-4 py-2 rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3 text-white">
                    <Clock className="w-4 h-4 text-emerald-300" />
                    <p className="text-xs font-black uppercase tracking-widest">Dernier délai : <span className="text-emerald-300">02 Juin</span></p>
                  </div>
                </div>

                <Link href="/inscription" className="block group">
                  <Button size="lg" className="w-full bg-white hover:bg-slate-50 text-emerald-950 px-12 py-8 text-xl font-black rounded-2xl shadow-2xl transition-all hover:scale-[1.03] group flex items-center justify-center">
                    <Lock className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" /> Réserver ma place
                  </Button>
                  <p className="mt-4 text-emerald-100/60 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors italic">⚠️ Places limitées à 15 par session</p>
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
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">Des questions ?</h2>
          <p className="text-sm md:text-base text-slate-500 font-medium italic px-4">Tout ce que vous devez savoir pour décider.</p>
        </div>

        {/* Category Marquee - Moving horizontally */}
        <div className="relative mb-12 overflow-hidden py-2 border-y border-slate-100 dark:border-slate-800">
          <motion.div
            className="flex gap-4 whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {/* Triple the list to ensure no gaps */}
            {[...categories, ...categories, ...categories].map((cat, idx) => (
              <button
                key={`${cat.id}-${idx}`}
                onClick={() => { setActiveCat(cat.id); setOpenIndex(null); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] md:text-sm font-black transition-all shrink-0 ${activeCat === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100'
                  }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </motion.div>
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
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${openIndex === i
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
  const trainingPhotos = [
    "/form_1.jpeg",
    "/form_2.jpeg",
    "/form_3.jpeg",
    "/form_4.jpeg",
    "/form_5.jpeg",
    "/form_6.jpeg",
    "/form_7.jpeg"
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center relative z-10 mb-16">
            {/* Trainer Image */}
            <div className="w-full md:w-2/5 shrink-0">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <img
                  src="/Leonce_1.jpeg"
                  alt="Léonce TOUNDE SODJINOU - Formateur Excel"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="font-bold text-xl leading-tight">Léonce TOUNDE SODJINOU</p>
                    <p className="text-white/80 text-sm font-medium">Expert Excel & Coach-Formateur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Description */}
            <div className="w-full md:w-3/5">
              <div className="mb-6">
                <span className="text-orange-500 font-black tracking-wider uppercase text-xs mb-2 block">Votre Formateur</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                  Expert Data & Finance Digitale
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg text-justify">
                  <p>
                    <strong className="text-slate-900 dark:text-white font-bold">Léonce TOUNDE SODJINOU</strong> est coach-formateur et consultant passionné par la gestion de projets et la transformation digitale. Il est <strong className="text-emerald-600">triple certifié Microsoft Excel</strong> (Expert 2019, Expert 365, Associate 365 for Accounting).
                  </p>
                  <p>
                    Depuis plus de 5 ans, il accompagne les professionnels et les organisations à mieux décider et performer grâce à Excel, Power Query et Power BI. Il a déjà formé et certifié plusieurs centaines de talents et aidé des entreprises à automatiser leurs processus.
                  </p>
                  <p>
                    Alliant finance, data, technologie et pédagogie, sa mission est claire : démystifier Excel, rendre l'analyse de données accessible à tous et transformer vos compétences techniques en véritables opportunités de carrière.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-3xl font-black text-emerald-600 mb-1">+500</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professionnels Formés</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-3xl font-black text-orange-500 mb-1">100%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Taux de Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Gallery Carousel */}
          <div className="relative z-10 border-t border-slate-100 dark:border-slate-800 pt-10">
            <h3 className="text-center font-bold text-slate-400 uppercase tracking-widest text-xs mb-6">Sur le terrain, aux côtés des professionnels</h3>

            <div className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

              <motion.div
                className="flex gap-4"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                whileHover={{ animationPlayState: 'paused' }}
              >
                {[...trainingPhotos, ...trainingPhotos].map((photo, idx) => (
                  <div key={idx} className="w-[200px] md:w-[250px] aspect-video rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 shrink-0 group">
                    <img src={photo} alt="Formation en cours" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
