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
    { title: "Consolider vos acquis", desc: "Reprenez les fondamentaux Microsoft et corrigez définitivement les mauvaises habitudes qui coûtent des points à l'examen.", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Automatiser selon les standards", desc: "Power Query, scénarios, fonctions dynamiques : vous apprenez la méthode validée par les examinateurs.", icon: <Laptop className="w-6 h-6" /> },
    { title: "Pitcher vos analyses", desc: "Vous livrez un dashboard propre, mesuré, prêt à être présenté à un directeur financier.", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Réussir la certification", desc: "Le bootcamp se termine par une simulation et votre passage à l'examen Microsoft Excel Expert.", icon: <Award className="w-6 h-6" /> }
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
                Structurer. <br />
                Simuler. <br />
                <span className="text-emerald-600">Certifier.</span>
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg">
                Chaque atelier reproduit un sujet de certification ou un cas métier senior. Vous faites, vous présentez, vous êtes coaché.
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
            <h3 className="text-lg md:text-xl font-bold mb-2">4 jours pour valider</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Du 09 au 13 juin 2026. 32 heures de coaching technique + simulations d'examen.</p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20">
            <Clock className="w-8 h-8 md:w-10 md:h-10 text-orange-600 mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Groupes professionnels</h3>
            <ul className="text-[12px] md:text-sm space-y-2 text-slate-700 dark:text-slate-300 font-bold mt-3">
              <li>• G1 : 09h – 12h (cadres dirigeants)</li>
              <li>• G2 : 14h – 17h (analystes & financiers)</li>
              <li>• G3 : 18h – 21h (managers & consultants)</li>
            </ul>
            <p className="text-[10px] text-slate-500 mt-4 italic">Coaching live, interactions ciblées, corrections d'examen.</p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <div className="flex gap-2 mb-4 md:mb-6">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 text-slate-600" />
              <Laptop className="w-8 h-8 md:w-10 md:h-10 text-slate-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Présentiel + live certif</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Présentiel à Ouaga 2000 ou 100% live. Vous passez la certification depuis un centre agréé ou un espace sécurisé.</p>
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
        <h2 className="text-xl md:text-4xl font-bold mb-8 md:mb-12 leading-tight">Tout ce qu'il faut pour décrocher <br className="md:hidden" />Microsoft Excel Expert</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
          {[
            { icon: <Award className="w-6 h-6 text-orange-400 shrink-0" />, text: "2 vouchers officiels + frais d'examen compris." },
            { icon: <ShieldCheck className="w-6 h-6 text-orange-400 shrink-0" />, text: "Licence Office 365 + environnement d'entraînement dédié." },
            { icon: <Users className="w-6 h-6 text-orange-400 shrink-0" />, text: "Mentoring post-examen pendant 30 jours pour valider la certification." },
            { icon: <CheckCircle2 className="w-6 h-6 text-orange-400 shrink-0" />, text: "Cas d'usage inspirés de missions réelles (finance, audit, supply chain)." },
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
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Un budget unique pour une certification à vie</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg italic">Coaching premium, vouchers Microsoft, simulations d'examen et accompagnement post-certif.</p>
        </div>

        <div className="bg-slate-900 rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* Left Side: Pricing Details */}
          <div className="p-8 md:p-16 flex-1 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Coaching élite limité</span>
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
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Support de cours premium, cas corrigés de l'examen, deux vouchers inclus et licence Office 365.</p>
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
                    <p className="text-xs font-black uppercase tracking-widest">Clôture des inscriptions : <span className="text-emerald-300">02 Juin</span></p>
                  </div>
                </div>

                <Link href="/inscription" className="block group">
                  <Button size="lg" className="w-full bg-white hover:bg-slate-50 text-emerald-950 px-12 py-8 text-xl font-black rounded-2xl shadow-2xl transition-all hover:scale-[1.03] group flex items-center justify-center">
                    <Lock className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" /> Je réserve mes vouchers
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
              duration: 6,
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
      '/illustrations/IMG-20230808-WA0012.jpg',
      '/illustrations/IMG-20260403-WA0063.jpg',
    ],
    [
      '/illustrations/IMG-20230808-WA0013.jpg',
      '/illustrations/IMG-20251210-WA0019.jpg',
      '/illustrations/IMG-20250703-WA0016.jpg',
      '/illustrations/FB_IMG_1735152498589.jpg',
      '/illustrations/IMG-20260403-WA0064.jpg',
      '/illustrations/IMG-20251210-WA0011.jpg',
    ],
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="space-y-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.4)]">
            <div className="absolute -top-32 -right-20 w-72 h-72 bg-emerald-500/20 blur-[120px] rounded-full" />
            <div className="absolute -bottom-20 left-0 w-60 h-60 bg-orange-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10 grid md:grid-cols-5 gap-10 md:gap-16 p-10 md:p-16">
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
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
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

          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 border border-emerald-900/60 p-10 md:p-16 text-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
            <div className="relative z-10 grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-2 space-y-6">
                <span className="inline-flex items-center gap-2 text-emerald-300 font-black uppercase tracking-[0.4em] text-xs">
                  Certification officiellement reconnue
                </span>
                <h3 className="text-3xl md:text-4xl font-black leading-tight">
                  Deux vouchers inclus pour décrocher <span className="text-emerald-300">Microsoft Excel Expert</span>
                </h3>
                <p className="text-sm md:text-base text-emerald-100/80 leading-relaxed">
                  Vous passez l’examen officiel sous supervision. Ces certificats proviennent de promotions réelles : preuve que notre méthode prépare concrètement à la réussite.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-emerald-100/80 leading-relaxed">
                  <li>• Coaching ciblé sur les compétences évaluées à l’examen.</li>
                  <li>• Suivi individuel jusqu’à la validation de vos deux tentatives.</li>
                  <li>• Remise de vos certificats numériques sous 48h après réussite.</li>
                </ul>
              </div>

              <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificationArtifacts.map((artifact) => (
                  <motion.div
                    key={artifact.src}
                    whileHover={{ scale: 1.03 }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={artifact.src}
                        alt={`Certification ${artifact.label}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                        <p className="text-sm font-bold">{artifact.label}</p>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-200/80 font-semibold">{artifact.batch}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-10 md:p-14 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.45)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.4em] font-black text-slate-400">Galerie terrain</span>
                <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mt-2">
                  Des bootcamps en mouvement
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl">
                Revivez l’énergie des précédentes promotions avec des images authentiques, capturées sur le terrain.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-white/5 p-6 md:p-10">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent pointer-events-none z-20" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent pointer-events-none z-20" />

              <div className="space-y-10 md:space-y-16">
                {galleryRows.map((row, rowIndex) => (
                  <motion.div
                    key={rowIndex}
                    className="flex gap-10 md:gap-14"
                    animate={{ x: rowIndex % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  >
                    {[...row, ...row].map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className="relative w-[320px] md:w-[460px] aspect-[16/9] overflow-hidden rounded-[2.25rem] border border-slate-200/60 dark:border-slate-700/60 shadow-[0_30px_60px_-35px_rgba(15,23,42,0.6)] bg-white dark:bg-slate-900 shrink-0"
                      >
                        <Image
                          src={src}
                          alt="Moment de bootcamp XL Elite"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, 35vw"
                        />
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
