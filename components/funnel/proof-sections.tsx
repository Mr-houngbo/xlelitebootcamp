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
    <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="container px-4 mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-6"
        >
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
          </div>
          <span className="font-bold text-slate-600 dark:text-slate-400 text-xs md:text-sm uppercase tracking-wide">4.9/5 satisfaction (500+ pros)</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-6xl font-black tracking-tight mb-6 md:mb-8 leading-[1.1]"
        >
          De débutants à <br />
          <span className="text-emerald-600 italic">Experts Microsoft</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/inscription">
            <Button size="lg" className="premium-button w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-xl shadow-xl">
              Réserver ma place
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
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

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
    <div className="relative min-w-[220px] md:min-w-[260px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-900 group shadow-lg border border-slate-200/10">
      <video
        ref={videoRef}
        src={testimonial.video_url}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
      />
      
      {/* Overlay info - Plus discret */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-5">
        <div className="mb-2">
          <h4 className="text-white font-bold text-base leading-tight">{testimonial.participant_name}</h4>
          <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">{testimonial.position}</p>
        </div>
        <p className="text-white/80 text-[11px] line-clamp-2 italic leading-tight">"{testimonial.testimonial}"</p>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <button 
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
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
        testimonial: 'Mon reporting mensuel me prenait 2 jours. Grâce à Power Query appris au bootcamp, tout est automatisé en 1 clic.',
        linkedin_url: '#',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Idrissa',
        type: 'video',
        video_url: 'https://cdn.pixabay.com/vimeo/327310190/office-22872.mp4?width=1280&hash=856e7e597c5980048e9f2913b869408d6d6e7f1a',
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

  return (
    <section className="py-12 md:py-16 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden border-y border-slate-100 dark:border-slate-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-xl md:text-4xl font-black mb-2 md:mb-3 leading-tight">Ils ont transformé leur quotidien</h2>
          <p className="text-xs md:text-base text-slate-500 font-medium">Des résultats vérifiables sur le terrain</p>
        </div>

        {/* --- VIDEO CAROUSEL --- */}
        <div className="relative mb-16">
          <div className="flex gap-5 overflow-x-auto pb-8 scrollbar-hide snap-x px-4 -mx-4 justify-center md:justify-center">
            {videoTestimonials.map((t) => (
              <div key={t.id} className="snap-center">
                <VideoTestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>

        {/* --- WRITTEN INFINITE MARQUEE --- */}
        <div className="relative mb-12 overflow-hidden py-4">
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none dark:from-slate-900/50" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none dark:from-slate-900/50" />
          
          <motion.div 
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {/* Double the list to create infinite loop effect */}
            {[...textTestimonials, ...textTestimonials].map((t, idx) => (
              <div 
                key={`${t.id}-${idx}`}
                className="w-[300px] md:w-[380px] p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between whitespace-normal shrink-0"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.participant_photo} alt={t.participant_name} className="w-10 h-10 rounded-full object-cover bg-emerald-50" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{t.participant_name}</h4>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">{t.position} @ {t.company}</p>
                    </div>
                  </div>
                  <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 italic line-clamp-3">"{t.testimonial}"</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center">
          <Link href="/inscription">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-105">
              Je réserve ma place maintenant
            </Button>
          </Link>
          <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Satisfait ou remboursé
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
        <div className="space-y-3 md:space-y-6">
          {actions.map((a, i) => (
            <div key={i} className="flex gap-4 p-4 md:p-6 rounded-xl md:rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-base md:text-xl font-bold mb-1">{a.title}</h3>
                <p className="text-[12px] md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{a.desc}</p>
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
        <h2 className="text-xl md:text-4xl font-black mb-8 md:mb-16 text-center leading-tight">Organisation <br className="md:hidden" />flexible</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="p-5 md:p-8 rounded-xl md:rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/20">
            <Calendar className="w-6 h-6 md:w-10 md:h-10 text-emerald-600 mb-4" />
            <h3 className="text-base md:text-xl font-bold mb-1">4 Jours Intensifs</h3>
            <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">Du 09 au 13 juin 2026. Immersion totale pour des résultats immédiats.</p>
          </div>

          <div className="p-5 md:p-8 rounded-xl md:rounded-3xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20">
            <Clock className="w-6 h-6 md:w-10 md:h-10 text-orange-600 mb-4" />
            <h3 className="text-base md:text-xl font-bold mb-1">3 Groupes au choix</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 bg-white text-[10px] font-bold rounded-md">09h-12h</span>
              <span className="px-2 py-1 bg-white text-[10px] font-bold rounded-md">14h-17h</span>
              <span className="px-2 py-1 bg-white text-[10px] font-bold rounded-md">18h-21h</span>
            </div>
          </div>

          <div className="p-5 md:p-8 rounded-xl md:rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <div className="flex gap-2 mb-4">
              <MapPin className="w-6 h-6 text-slate-600" />
              <Laptop className="w-6 h-6 text-slate-600" />
            </div>
            <h3 className="text-base md:text-xl font-bold mb-1">Format Hybride</h3>
            <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">Présentiel à Ouaga 2000 ou en ligne (Live interaction).</p>
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
        <h2 className="text-xl md:text-4xl font-bold mb-8 md:mb-12 leading-tight">Tout est inclus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-left">
          {[
            { icon: <Award className="w-5 h-5 text-orange-400 shrink-0" />, text: "2 Vouchers Certification Microsoft." },
            { icon: <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0" />, text: "Licence Office 365 offerte." },
            { icon: <Users className="w-5 h-5 text-orange-400 shrink-0" />, text: "Support post-formation & VIP." },
            { icon: <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />, text: "Matériel complet et fichiers réels." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-4 bg-white/10 rounded-xl border border-white/10 items-center">
              {item.icon}
              <p className="font-bold text-xs md:text-base leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FinancialOffer = () => {
  return (
    <section className="py-12 md:py-24 bg-white dark:bg-slate-950 px-2 md:px-4">
      <div className="container px-0 mx-auto max-w-4xl">
        <div className="p-5 md:p-12 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 border-emerald-600 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-1.5 rounded-bl-xl font-black text-[9px] md:text-sm uppercase tracking-widest">
            Offre Limitée
          </div>
          
          <div className="text-center pt-4 md:pt-0">
            <h2 className="text-xl md:text-3xl font-black mb-6 md:mb-10 leading-tight">Investissement Carrière</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
              <div className="text-center">
                <p className="text-slate-400 uppercase tracking-widest text-[9px] font-bold mb-1">Total</p>
                <div className="text-2xl md:text-5xl font-black text-slate-900 dark:text-white">150 000 F</div>
              </div>
              <div className="hidden md:block h-12 w-[1px] bg-slate-200" />
              <div className="text-center p-3 bg-orange-50 rounded-xl md:bg-transparent">
                <p className="text-orange-600 uppercase tracking-widest text-[9px] font-black mb-1">Frais d'inscription</p>
                <div className="text-3xl md:text-5xl font-black text-orange-600">25 000 F</div>
              </div>
            </div>

            <p className="text-[11px] md:text-lg text-slate-500 font-bold mb-8 px-2 leading-relaxed">
              ⚠️ Inscription validée après paiement des frais <span className="text-red-600 underline">avant le 02 juin</span>.
            </p>

            <Link href="/inscription" className="w-full">
              <Button size="lg" className="premium-button w-full sm:w-auto px-12 py-7 text-lg font-black rounded-xl">
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
    { id: 'orga', label: 'Orga', icon: <Clock className="w-4 h-4" /> },
    { id: 'prix', label: 'Prix', icon: <Users className="w-4 h-4" /> },
    { id: 'carriere', label: 'Carrière', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const faqs = [
    { cat: 'formation', q: "Est-ce que ce bootcamp est fait pour moi ?", a: "Oui si vous utilisez Excel dans votre travail et que vous voulez gagner du temps, être plus efficace et valoriser votre profil." },
    { cat: 'formation', q: "Je suis débutant, est-ce que je peux suivre ?", a: "Le bootcamp est intensif. Si vous maîtrisez déjà les bases (formules simples, tableaux), vous pourrez suivre." },
    { cat: 'certif', q: "La certification est-elle officielle ?", a: "Oui, il s’agit de la certification Microsoft Excel Expert reconnue à l’international." },
    { cat: 'prix', q: "Puis-je payer en plusieurs fois ?", a: "Oui, des facilités peuvent être proposées selon votre situation." },
    { cat: 'carriere', q: "Est-ce utile si je ne suis pas en finance ?", a: "Absolument. Excel est utilisé en RH, logistique, marketing, gestion, etc." },
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

        {/* Category Tabs - Scrollable on mobile */}
        <div className="flex overflow-x-auto gap-2 mb-10 pb-2 scrollbar-hide -mx-4 px-4 justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setOpenIndex(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCat === cat.id 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 min-h-[300px]">
          {faqs.filter(f => f.cat === activeCat).map((f, i) => (
            <div key={i} className="group">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                  openIndex === i 
                    ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500 shadow-sm' 
                    : 'bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/40'
                }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-bold text-sm md:text-lg text-slate-900 dark:text-white">
                    {f.q}
                  </span>
                  <ChevronDown className={`shrink-0 w-4 h-4 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </div>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 text-[13px] md:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-emerald-100 dark:border-emerald-900/50 mt-3">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
