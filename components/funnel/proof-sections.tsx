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
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="container px-4 mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
          </div>
          <span className="font-bold text-slate-600 dark:text-slate-400">4.9/5 satisfaction (500+ pros formés)</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-8"
        >
          Ils sont passés de débutants à <br />
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
    <div className="relative min-w-[300px] md:min-w-[400px] aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-slate-900 group shadow-2xl">
      <video
        ref={videoRef}
        src={testimonial.video_url}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      
      {/* Overlay info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
        <div className="mb-4">
          <h4 className="text-white font-black text-xl">{testimonial.participant_name}</h4>
          <p className="text-emerald-400 text-sm font-bold">{testimonial.position} @ {testimonial.company}</p>
        </div>
        <p className="text-white/90 text-sm line-clamp-2 italic">"{testimonial.testimonial}"</p>
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      <button 
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
          {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </div>
      </button>
    </div>
  );
};

export const ConcreteTestimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    // Dans un environnement réel, on appellerait getTestimonials()
    // Ici on simule avec les données de fallback pour la démo
    setTestimonials([
      {
        id: '1',
        participant_name: 'Idrissa Zongo',
        position: 'Contrôleur de Gestion',
        company: 'SONABEL',
        testimonial: 'Mon reporting mensuel me prenait 2 jours. Grâce à Power Query appris au bootcamp, tout est automatisé en 1 clic.',
        linkedin_url: 'https://linkedin.com',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Idrissa',
        type: 'video',
        video_url: 'https://cdn.pixabay.com/vimeo/327310190/office-22872.mp4?width=1280&hash=856e7e597c5980048e9f2913b869408d6d6e7f1a',
      },
      {
        id: '2',
        participant_name: 'Fatou K.',
        position: 'Chef de Projet',
        company: 'Telecel',
        testimonial: 'La maîtrise d\'Excel a changé ma productivité. Les dashboards dynamiques sont devenus mon meilleur allié.',
        linkedin_url: 'https://linkedin.com',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou',
        type: 'video',
        video_url: 'https://cdn.pixabay.com/vimeo/327310190/office-22872.mp4?width=1280&hash=856e7e597c5980048e9f2913b869408d6d6e7f1a',
      },
      {
        id: '3',
        participant_name: 'Aminata Ouédraogo',
        position: 'Analyste RH',
        company: 'Orange Burkina',
        testimonial: 'La certification Microsoft Expert a été le déclencheur. Mon expertise est désormais reconnue.',
        linkedin_url: 'https://linkedin.com',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata',
        type: 'text',
      },
      {
        id: '4',
        participant_name: 'Samuel T.',
        position: 'Auditeur',
        company: 'KPMG',
        testimonial: 'L\'automatisation via les macros m\'a permis de diviser mon temps de travail par 3 sur les audits récurrents.',
        linkedin_url: 'https://linkedin.com',
        participant_photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel',
        type: 'text',
      }
    ]);
  }, []);

  const videoTestimonials = testimonials.filter(t => t.type === 'video');
  const textTestimonials = testimonials.filter(t => t.type === 'text');

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Ils ont déjà transformé leur manière de travailler avec Excel</h2>
          <p className="text-xl text-slate-500 font-bold italic">Des résultats concrets, vérifiables</p>
        </div>

        {/* --- VIDEO CAROUSEL --- */}
        <div className="relative mb-24">
          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x px-4 -mx-4">
            {videoTestimonials.map((t) => (
              <div key={t.id} className="snap-center">
                <VideoTestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
          {/* Mobile tip */}
          <p className="text-center text-slate-400 text-sm mt-4 md:hidden">← Glissez pour voir plus de vidéos →</p>
        </div>

        {/* --- WRITTEN GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {textTestimonials.map((t) => (
            <motion.div 
              key={t.id}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.participant_photo} alt={t.participant_name} className="w-16 h-16 rounded-2xl object-cover bg-emerald-100" />
                <div>
                  <h4 className="font-black text-lg">{t.participant_name}</h4>
                  <p className="text-slate-500 text-sm font-bold">{t.position} @ {t.company}</p>
                </div>
                <a 
                  href={t.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-auto w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  title="Voir le profil LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-lg italic leading-relaxed text-slate-700 dark:text-slate-300">"{t.testimonial}"</p>
            </motion.div>
          ))}
        </div>

        {/* --- CTA SECTION --- */}
        <div className="text-center">
          <Link href="/inscription">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-8 text-2xl font-black rounded-2xl shadow-2xl shadow-orange-500/30 transform hover:scale-105 transition-all">
              Je réserve ma place maintenant
            </Button>
          </Link>
          <p className="mt-6 text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Satisfait ou remboursé
          </p>
        </div>
      </div>
    </section>
  );
};

export const RealActions = () => {
  const actions = [
    { title: "Nettoyer et structurer vos données", desc: "Dites adieu au copier-coller. Utilisez Power Query pour traiter des milliers de lignes en un clic." },
    { title: "Automatiser vos tâches répétitives", desc: "Créez des macros intelligentes qui font le travail à votre place pendant que vous vous concentrez sur l'analyse." },
    { title: "Créer des Dashboards professionnels", desc: "Concevez des tableaux de bord dynamiques et visuels qui impressionnent votre direction." },
    { title: "Valider votre Certification Microsoft", desc: "Préparez-vous intensivement et passez l'examen officiel Microsoft Excel Expert le dernier jour." }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto max-w-4xl">
        <h2 className="text-4xl font-black mb-16 text-center">Ce que vous allez <span className="text-emerald-600">réellement faire</span></h2>
        <div className="space-y-6">
          {actions.map((a, i) => (
            <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">{a.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{a.desc}</p>
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
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto max-w-5xl">
        <h2 className="text-4xl font-black mb-16 text-center">Une organisation flexible pour les pros</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/20">
            <Calendar className="w-10 h-10 text-emerald-600 mb-6" />
            <h3 className="text-xl font-bold mb-2">4 Jours Intensifs</h3>
            <p className="text-slate-600 dark:text-slate-400">Du 09 au 13 juin 2026. Une immersion totale pour des résultats immédiats.</p>
          </div>

          <div className="p-8 rounded-3xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20">
            <Clock className="w-10 h-10 text-orange-600 mb-6" />
            <h3 className="text-xl font-bold mb-2">3 Groupes au choix</h3>
            <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300 font-bold mt-4">
              <li>• G1 : 09h – 12h</li>
              <li>• G2 : 14h – 17h</li>
              <li>• G3 : 18h – 21h</li>
            </ul>
            <p className="text-xs text-slate-500 mt-4 italic">Choisissez le créneau qui correspond à votre emploi du temps.</p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <div className="flex gap-2 mb-6">
              <MapPin className="w-10 h-10 text-slate-600" />
              <Laptop className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Format Hybride</h3>
            <p className="text-slate-600 dark:text-slate-400">En présentiel à Ouaga 2000 ou en ligne (Live) avec interaction directe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const InclusionsSection = () => {
  return (
    <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
      <div className="container px-4 mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Tout est inclus pour votre réussite</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="flex gap-4 p-6 bg-white/10 rounded-2xl border border-white/10">
            <Award className="w-8 h-8 text-orange-400 shrink-0" />
            <p className="font-bold">2 Vouchers (tentatives) pour la Certification Microsoft Excel Expert.</p>
          </div>
          <div className="flex gap-4 p-6 bg-white/10 rounded-2xl border border-white/10">
            <ShieldCheck className="w-8 h-8 text-orange-400 shrink-0" />
            <p className="font-bold">Licence Office 365 offerte pour pratiquer sur les derniers outils.</p>
          </div>
          <div className="flex gap-4 p-6 bg-white/10 rounded-2xl border border-white/10">
            <Users className="w-8 h-8 text-orange-400 shrink-0" />
            <p className="font-bold">Support post-formation & accès à la communauté des experts.</p>
          </div>
          <div className="flex gap-4 p-6 bg-white/10 rounded-2xl border border-white/10">
            <CheckCircle2 className="w-8 h-8 text-orange-400 shrink-0" />
            <p className="font-bold">Matériel pédagogique complet et fichiers d'exercices réels.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FinancialOffer = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="p-12 rounded-[2.5rem] border-4 border-emerald-600 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white px-8 py-2 rounded-bl-3xl font-black text-sm uppercase tracking-widest">
            Offre Limitée
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-black mb-10">Investissement pour votre carrière</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-12">
              <div className="text-center">
                <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Prix Total</p>
                <div className="text-5xl font-black text-slate-900 dark:text-white">150 000 F CFA</div>
                <p className="text-xs text-slate-400 mt-1">(125 000 formation + 25 000 inscription)</p>
              </div>
              <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />
              <div className="text-center">
                <p className="text-orange-600 uppercase tracking-widest text-xs font-bold mb-2 font-black">Frais d'inscription</p>
                <div className="text-5xl font-black text-orange-600">25 000 F CFA</div>
              </div>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 font-bold mb-10">
              ⚠️ Inscription validée uniquement après paiement des frais <span className="text-red-600">avant le 02 juin</span>.
            </p>

            <Link href="/inscription">
              <Button size="lg" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-16 py-8 text-2xl font-black rounded-2xl shadow-xl transition-all hover:scale-105">
                Je réserve ma place maintenant
              </Button>
            </Link>
            
            <p className="mt-8 text-sm text-slate-500 italic">Places limitées par groupe pour garantir un accompagnement de qualité.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQProof = () => {
  const categories = [
    { id: 'formation', label: 'Formation', icon: <Zap className="w-4 h-4" /> },
    { id: 'certif', label: 'Certification', icon: <Award className="w-4 h-4" /> },
    { id: 'orga', label: 'Organisation', icon: <Clock className="w-4 h-4" /> },
    { id: 'prix', label: 'Prix', icon: <Users className="w-4 h-4" /> },
    { id: 'logistique', label: 'Logistique', icon: <MapPin className="w-4 h-4" /> },
    { id: 'carriere', label: 'Carrière', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const faqs = [
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
    { cat: 'orga', q: "Quels sont les horaires ?", a: "3 groupes au choix : 09h–12h, 14h–17h, 18h–21h." },
    { cat: 'orga', q: "Puis-je changer de groupe après inscription ?", a: "Oui, sous réserve de disponibilité dans un autre groupe." },
    { cat: 'orga', q: "Est-ce que je peux suivre en ligne ?", a: "Oui, le bootcamp est hybride : présentiel ou en ligne en direct." },
    { cat: 'orga', q: "Est-ce que les sessions sont enregistrées ?", a: "Non, pour garantir l’engagement et la qualité de l’apprentissage." },
    { cat: 'orga', q: "Combien de participants par groupe ?", a: "Les groupes sont limités pour garantir un accompagnement de qualité." },
    
    // PRIX
    { cat: 'prix', q: "Combien coûte la formation ?", a: "125 000 F CFA." },
    { cat: 'prix', q: "À quoi correspondent les 25 000 F d’inscription ?", a: "Ils permettent de réserver votre place et de sécuriser votre participation." },
    { cat: 'prix', q: "Puis-je payer en plusieurs fois ?", a: "Oui, des facilités peuvent être proposées selon votre situation." },
    { cat: 'prix', q: "Y a-t-il un remboursement ?", a: "Les conditions sont précisées dans les CGV. L’objectif est de garantir votre engagement." },
    { cat: 'prix', q: "Pourquoi les places sont-elles limitées ?", a: "Pour assurer un suivi personnalisé et une meilleure qualité d’apprentissage." },
    
    // LOGISTIQUE
    { cat: 'logistique', q: "Où se déroule la formation en présentiel ?", a: "À Ouaga 2000." },
    { cat: 'logistique', q: "Dois-je venir avec mon ordinateur ?", a: "Oui, un ordinateur portable est nécessaire pour pratiquer." },
    { cat: 'logistique', q: "Quels logiciels sont nécessaires ?", a: "Excel (Office 365 recommandé). Une licence est offerte dans le cadre du bootcamp." },
    
    // CARRIERE + ACCOMPAGNEMENT + DECISION
    { cat: 'carriere', q: "Est-ce que ça peut vraiment impacter ma carrière ?", a: "Oui. Excel est une compétence clé dans de nombreux métiers. La certification + la maîtrise avancée font la différence." },
    { cat: 'carriere', q: "Est-ce utile si je ne suis pas dans la finance ?", a: "Oui. Excel est utilisé en RH, logistique, marketing, gestion, etc." },
    { cat: 'carriere', q: "Vais-je vraiment gagner du temps après ?", a: "Oui. L’objectif est d’automatiser une grande partie de vos tâches répétitives." },
    { cat: 'carriere', q: "Est-ce que je peux utiliser ça immédiatement au travail ?", a: "Oui, les cas étudiés sont directement applicables." },
    { cat: 'carriere', q: "Y a-t-il un suivi après la formation ?", a: "Oui, vous bénéficiez d’un accompagnement et support après le bootcamp." },
    { cat: 'carriere', q: "Puis-je poser des questions pendant la formation ?", a: "Bien sûr. L’accompagnement est interactif." },
    { cat: 'carriere', q: "Y a-t-il une communauté ?", a: "Oui, vous rejoignez un réseau de participants et d’anciens." },
    { cat: 'carriere', q: "Pourquoi devrais-je m’inscrire maintenant ?", a: "Parce que les places sont limitées et que les inscriptions ferment le 02 juin." },
    { cat: 'carriere', q: "Que se passe-t-il si j’attends ?", a: "Vous risquez de ne plus avoir de place dans votre créneau préféré." },
    { cat: 'carriere', q: "Comment m’inscrire ?", a: "Remplissez le formulaire et payez les frais d’inscription (25 000 F CFA." },
    { cat: 'carriere', q: "Et si j’ai encore une question ?", a: "Vous pouvez nous contacter directement par email ou WhatsApp." },
    { cat: 'carriere', q: "Est-ce que ça vaut vraiment le coup ?", a: "Si vous utilisez Excel régulièrement et que vous voulez passer un cap rapidement : oui, clairement." },
  ];

  const [activeCat, setActiveCat] = useState('formation');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Des questions ?</h2>
          <p className="text-slate-500 font-medium italic">Tout ce que vous devez savoir pour prendre votre décision.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setOpenIndex(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeCat === cat.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 min-h-[400px]">
          {faqs.filter(f => f.cat === activeCat).map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  openIndex === i 
                    ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                    : 'bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/40 hover:border-emerald-400'
                }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {f.q}
                  </span>
                  <div className={`shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-5 h-5 ${openIndex === i ? 'text-emerald-600' : 'text-slate-300'}`} />
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
                      <div className="pt-4 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-emerald-100 dark:border-emerald-900/50 mt-4">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
