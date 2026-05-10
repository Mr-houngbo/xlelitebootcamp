'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { 
  Star, Award, Users, Calendar, Clock, MapPin, CheckCircle2, 
  HelpCircle, ChevronDown, ShieldCheck, Laptop, Zap, TrendingUp,
  Linkedin, Play, Pause, Volume2, VolumeX 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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

// --- VIDEO TESTIMONIAL CARD ---
const VideoTestimonialCard = ({ testimonial }: { testimonial: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative min-w-[150px] md:min-w-[180px] h-[260px] md:h-[320px] rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-900 group shadow-2xl border border-white/10 ring-4 ring-black/5">
      <video
        ref={videoRef}
        src={testimonial.video_url}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
      />
      
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Participant info */}
      <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
        <p className="font-bold text-[11px] md:text-sm leading-tight mb-0.5 shadow-black drop-shadow-md">{testimonial.participant_name}</p>
        <p className="text-[9px] md:text-[10px] text-white/80 font-medium truncate">{testimonial.position}</p>
      </div>

      {/* Controls */}
      <div className="absolute top-3 right-3 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          {isMuted ? <VolumeX className="w-3 h-3 md:w-4 md:h-4" /> : <Volume2 className="w-3 h-3 md:w-4 md:h-4" />}
        </button>
      </div>

      <button 
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] transform group-hover:scale-110 transition-transform">
          {isPlaying ? <Pause className="w-4 h-4 md:w-6 md:h-6 fill-current" /> : <Play className="w-4 h-4 md:w-6 md:h-6 fill-current ml-1" />}
        </div>
      </button>
    </div>
  );
};

export const ConcreteTestimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    setTestimonials([
      {
        id: 'v1',
        participant_name: 'Idrissa Zongo',
        position: 'Contrôleur de Gestion',
        company: 'SONABEL',
        testimonial: 'Le bootcamp a révolutionné ma manière de traiter les données mensuelles.',
        type: 'video',
        video_url: 'https://i.imgur.com/vhgB6bF.mp4',
      },
      {
        id: 'v2',
        participant_name: 'Aminata Ouédraogo',
        position: 'Analyste RH',
        company: 'Orange',
        testimonial: 'La certification Microsoft Expert est un vrai plus pour mon CV.',
        type: 'video',
        video_url: 'https://i.imgur.com/2je7YyL.mp4',
      },
      {
        id: 'v3',
        participant_name: 'Samuel Traoré',
        position: 'Auditeur Senior',
        company: 'KPMG',
        testimonial: "L'automatisation Power Query me fait gagner des heures chaque semaine.",
        type: 'video',
        video_url: 'https://i.imgur.com/ITbq8NC.mp4',
      },
      {
        id: 'v4',
        participant_name: 'Fatou Keïta',
        position: 'Chef de Projet',
        company: 'Telecel',
        testimonial: "Une formation intense mais tellement riche. Je recommande à 100%.",
        type: 'video',
        video_url: 'https://i.imgur.com/Qol4jUS.mp4',
      },
      {
        id: 'v5',
        participant_name: 'Moussa Diallo',
        position: 'Directeur Financier',
        company: 'BICIAB',
        testimonial: "Enfin une formation pratique qui répond aux besoins réels du terrain.",
        type: 'video',
        video_url: 'https://i.imgur.com/95TsFVD.mp4',
      },
      {
        id: '1',
        participant_name: 'Boling Faraba Dembele',
        position: 'Auditeur Interne',
        company: 'IBI Groupe',
        testimonial: "Vraiment j'ai été transformé par ce Cabinet Smart Otobos Consulting, la pédagogie de M LEONCE (coach) et le niveau de la formation étaient au summum de nos attentes . Alors vivement la prochaine formation .",
        linkedin_url: '#',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Boling',
        type: 'text',
      },
      {
        id: '2',
        participant_name: 'Abou Ouattara',
        position: 'Gestionnaire RH',
        company: 'Ouagadougou',
        testimonial: "Un grand merci au Cabinet Otobos Consulting et particulièrement à notre formateur, Léonce TOUNDE SODJINOU, pour la perfection avec laquelle la formation a été administrée, avec en plus, un coaching participatif et motivateur.",
        linkedin_url: '#',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abou',
        type: 'text',
      },
      {
        id: '3',
        participant_name: 'Ib Zahara',
        position: 'Créateur Digital',
        company: 'Cote d\'ivoire',
        testimonial: "Bonjour Coach, nous avons été très satisfait de la qualité et temps accorder aux participants. Franchement ça me fait un bout de temps sur les formations en ligne, la votre a été du jamais vu de ma part. Encore merci !",
        linkedin_url: '#',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zahara',
        type: 'text',
      },
      {
        id: '4',
        participant_name: 'Harris Djounga',
        position: 'Professionnel',
        company: 'Accra',
        testimonial: "Merci pour tout, formateur excellent, technique de formation de bonne qualité, contenu riche et varié. De toute les formations en ligne que j'ai déjà faite, la votre est de loin la meilleur et sans comparaison.",
        linkedin_url: '#',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harris',
        type: 'text',
      },
      {
        id: '5',
        participant_name: 'Abdoulaye Wolomo',
        position: 'Professionnel',
        company: 'Bamako, Mali',
        testimonial: "Bonjour tout je remercie le formateur et Son équipe pour la qualité de la formation reçu. Toutes mes attentes ont été satisfait à 100%. Je recommande fortement la formation.",
        linkedin_url: '#',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdoulaye',
        type: 'text',
      },
      {
        id: '6',
        participant_name: 'Yacouba Bengaly',
        position: 'Professionnel',
        company: 'Bamako, Mali',
        testimonial: "Excellente formation avec un formateur très actif et soucieux du détail. Merci a vous et bonne continuation.",
        linkedin_url: '#',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yacouba',
        type: 'text',
      }
    ]);
  }, []);

  const videoTestimonials = testimonials.filter(t => t.type === 'video');
  const textTestimonials = testimonials.filter(t => t.type === 'text');
  
  // Split for two marquee rows
  const half = Math.ceil(textTestimonials.length / 2);
  const row1 = textTestimonials.slice(0, half);
  const row2 = textTestimonials.slice(half);

  return (
    <section className="py-20 md:py-32 bg-slate-950 text-white overflow-hidden relative border-y border-slate-800">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full max-w-xl h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-3 block">Témoignages</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Ils ont transformé <br className="hidden md:block"/> leur quotidien</h2>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            Plus de 500 professionnels à travers l'Afrique ont déjà fait confiance à ce bootcamp. Voici ce qu'ils en disent.
          </p>
        </div>

        {/* --- VIDEO CAROUSEL --- */}
        <div className="relative mb-24 max-w-6xl mx-auto">
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x px-4 -mx-4 md:mx-0 md:px-0 justify-start md:justify-center items-center">
            {videoTestimonials.map((t) => (
              <div key={t.id} className="snap-center shrink-0">
                <VideoTestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>

        {/* --- WRITTEN MARQUEE ROW 1 --- */}
        <div className="relative mb-6 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -1500] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {[...row1, ...row1, ...row1].map((t, idx) => (
              <div key={`r1-${t.id}-${idx}`} className="w-[300px] md:w-[400px] p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors shrink-0 backdrop-blur-sm">
                <div className="flex gap-1 mb-4 text-orange-400">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm md:text-base leading-relaxed text-slate-300 mb-6 whitespace-normal line-clamp-4">"{t.testimonial}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.participant_photo} alt={t.participant_name} className="w-12 h-12 rounded-full object-cover bg-slate-800" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.participant_name}</h4>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- WRITTEN MARQUEE ROW 2 --- */}
        <div className="relative mb-20 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [-1500, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {[...row2, ...row2, ...row2].map((t, idx) => (
              <div key={`r2-${t.id}-${idx}`} className="w-[300px] md:w-[400px] p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors shrink-0 backdrop-blur-sm">
                <div className="flex gap-1 mb-4 text-orange-400">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm md:text-base leading-relaxed text-slate-300 mb-6 whitespace-normal line-clamp-4">"{t.testimonial}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.participant_photo} alt={t.participant_name} className="w-12 h-12 rounded-full object-cover bg-slate-800" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.participant_name}</h4>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center">
          <Link href="/inscription">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-7 text-lg md:text-xl font-black rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]">
              Rejoindre l'élite maintenant
            </Button>
          </Link>
          <p className="mt-5 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Satisfaction garantie ou remboursé
          </p>
        </div>
      </div>
    </section>
  );
};


export const RealActions = () => {
  const actions = [
    { title: "Nettoyer vos données", desc: "Dites adieu au copier-coller. Utilisez Power Query pour traiter des milliers de lignes en un clic." },
    { title: "Automatiser vos tâches", desc: "Créez des macros intelligentes qui font le travail à votre place." },
    { title: "Créer des Dashboards", desc: "Concevez des tableaux de bord dynamiques qui impressionnent votre direction." },
    { title: "Valider votre Certification", desc: "Passez l'examen officiel Microsoft Excel Expert le dernier jour." }
  ];

  return (
    <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto max-w-4xl">
        <h2 className="text-xl md:text-4xl font-black mb-8 md:mb-16 text-center leading-tight">Ce que vous allez <br className="md:hidden" /><span className="text-emerald-600">réellement faire</span></h2>
        <div className="space-y-4 md:space-y-6">
          {actions.map((a, i) => (
            <div key={i} className="flex gap-4 md:gap-6 p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{a.title}</h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
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
    <section className="py-12 md:py-24 bg-white dark:bg-slate-950 px-4">
      <div className="container px-0 mx-auto max-w-4xl">
        <div className="p-5 md:p-12 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 border-emerald-600 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 md:px-8 py-1.5 md:py-2 rounded-bl-xl font-black text-[9px] md:text-sm uppercase tracking-widest">
            Offre Limitée
          </div>
          
          <div className="text-center">
            <h2 className="text-xl md:text-3xl font-black mb-6 md:mb-10 mt-2 md:mt-4">Investissement pour votre carrière</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-8 md:mb-10">
              <div className="text-center">
                <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold mb-1">Prix Total</p>
                <div className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">150 000 F</div>
                <p className="text-[10px] text-slate-400 mt-1">(125k formation + 25k inscription)</p>
              </div>
              <div className="h-[1px] w-20 bg-slate-200 md:h-12 md:w-[1px]" />
              <div className="text-center">
                <p className="text-orange-600 uppercase tracking-widest text-[10px] font-bold mb-1 font-black">Frais d'inscription</p>
                <div className="text-3xl md:text-5xl font-black text-orange-600">25 000 F</div>
              </div>
            </div>

            <p className="text-sm md:text-lg text-slate-700 dark:text-slate-300 font-bold mb-8 md:mb-10 px-4">
              ⚠️ Inscription validée après paiement des frais <span className="text-red-600">avant le 02 juin</span>.
            </p>

            <Link href="/inscription" className="w-full inline-block">
              <Button size="lg" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-10 md:px-16 py-6 md:py-8 text-lg md:text-2xl font-black rounded-xl md:rounded-2xl shadow-xl transition-all hover:scale-105">
                Réserver ma place
              </Button>
            </Link>
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
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] md:text-sm font-black transition-all shrink-0 ${
                  activeCat === cat.id 
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
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  openIndex === i 
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
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center relative z-10">
            {/* Trainer Image */}
            <div className="w-full md:w-2/5 shrink-0">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Léonce TOUNDE SODJINOU - Formateur Excel" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="font-bold text-xl leading-tight">Léonce TOUNDE SODJINOU</p>
                    <p className="text-white/80 text-sm font-medium">Expert Formateur Microsoft</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Description */}
            <div className="w-full md:w-3/5">
              <div className="mb-6">
                <span className="text-orange-500 font-black tracking-wider uppercase text-xs mb-2 block">Votre Formateur</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                  Apprenez avec un expert du terrain
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                  <p>
                    <strong className="text-slate-900 dark:text-white font-bold">Léonce TOUNDE SODJINOU</strong> est le fondateur du Cabinet Smart Otobos Consulting et formateur certifié Microsoft Excel.
                  </p>
                  <p>
                    Avec une solide expérience en entreprise, il maîtrise parfaitement les enjeux auxquels vous êtes confrontés au quotidien : données massives, délais serrés et besoin d'automatisation. Il a déjà formé et accompagné <strong className="text-emerald-600">plus de 500 professionnels</strong> à travers l'Afrique (Burkina Faso, Côte d'Ivoire, Bénin, Mali, etc.).
                  </p>
                  <p>
                    Sa pédagogie est claire, orientée résultats et 100% pratique. Son objectif n'est pas de vous donner un cours théorique, mais de vous équiper des compétences exactes qui feront la différence dès le lundi matin au bureau.
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
        </div>
      </div>
    </section>
  );
};
