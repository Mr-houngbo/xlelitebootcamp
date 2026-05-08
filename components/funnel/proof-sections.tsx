'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Award, Users, BookOpen, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const TestimonialsProof = () => {
  const testimonials = [
    {
      name: "Marc-Antoine K.",
      role: "Responsable Logistique",
      company: "CMA CGM",
      content: "La gestion de mes stocks était un enfer. Après 4 jours de bootcamp, j'ai créé un outil de suivi automatisé qui me fait gagner 10h par semaine. Incroyable.",
      rating: 5
    },
    {
      name: "Sophie L.",
      role: "Analyste RH",
      company: "Société Générale",
      content: "La certification est un vrai plus sur mon CV. Le formateur est d'une pédagogie rare, même pour des sujets complexes comme les macros.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4 text-orange-500">
           {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
           <span className="ml-2 font-bold text-slate-900 dark:text-white">4.9/5 sur 500+ avis</span>
        </div>
        <h2 className="text-4xl font-bold text-center mb-16">Ils sont passés de débutants à experts</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-200 dark:text-slate-800 -z-0" />
              <p className="text-lg italic text-slate-700 dark:text-slate-300 relative z-10 mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-emerald-600">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role} @ {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InstructorSection = () => {
  return (
    <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6 inline-block border border-emerald-500/30">
              Votre Formateur
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">L'expertise au service de votre réussite</h2>
            <p className="mt-6 text-emerald-100/80 text-lg leading-relaxed">
              Titulaire de la certification **Microsoft Office Specialist (MOS) Expert**, j'accompagne depuis 10 ans les entreprises dans l'optimisation de leurs processus data.
            </p>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-emerald-300 uppercase font-medium">Taux de réussite</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-xs text-emerald-300 uppercase font-medium">Experts formés</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
             <div className="relative group">
                <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="bg-slate-800 rounded-2xl p-2 shadow-2xl relative">
                   <div className="aspect-square rounded-xl bg-slate-700 flex items-center justify-center text-slate-500 italic">
                      [Photo Formateur Certifié]
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProgrammeTimeline = () => {
  const days = [
    { day: "01", title: "Data Management & Power Query", desc: "Maitriser le nettoyage de données et l'importation massive sans effort." },
    { day: "02", title: "Analyse Avancée & BI", desc: "Calculs complexes, TCD avancés et création de dashboards interactifs." },
    { day: "03", title: "Automatisation & Macros", desc: "Introduction au VBA et création de macros pour supprimer les tâches répétitives." },
    { day: "04", title: "Certification & Coaching", desc: "Examen blanc et passage de la certification officielle Microsoft." },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-16">4 jours pour changer de dimension</h2>
        <div className="space-y-8">
          {days.map((d, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="text-4xl font-black text-emerald-200 dark:text-emerald-800 shrink-0 leading-none">{d.day}</div>
              <div className="pb-8 border-b border-slate-200 dark:border-slate-800 flex-grow">
                <h3 className="text-xl font-bold mb-2">{d.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FinalOffer = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-emerald-100 dark:border-emerald-900/50 overflow-hidden flex flex-col md:flex-row">
          <div className="p-10 md:p-16 md:w-3/5">
            <h2 className="text-4xl font-bold mb-6">Investissez dans votre futur expert</h2>
            <ul className="space-y-4 mb-10">
              {[
                "4 jours de formation intensive (Présentiel/Online)",
                "2 Vouchers d'examen Microsoft inclus",
                "Support WhatsApp privé 7j/7 (durée 6 mois)",
                "Licence Office 365 offerte (1 an)",
                "Communauté d'alumni exclusive"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-600 p-10 md:p-16 md:w-2/5 text-white flex flex-col justify-center items-center text-center">
            <p className="text-emerald-100 uppercase tracking-widest font-bold text-sm mb-2">Offre Premium</p>
            <div className="text-6xl font-black mb-4">1.500 €</div>
            <p className="text-emerald-100/70 text-sm mb-8 italic">Possibilité de paiement en 3x</p>
            <Link href="/inscription" className="w-full">
              <Button size="lg" className="w-full bg-white text-emerald-600 hover:bg-slate-50 py-8 text-xl font-bold rounded-2xl shadow-lg">
                Réserver ma place <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <p className="mt-6 text-xs text-emerald-200">Garanti Satisfait ou Remboursé</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQSection = () => {
  const faqs = [
    { q: "Quel est le niveau requis ?", a: "Un niveau intermédiaire est conseillé. Nous validons chaque profil avant l'inscription finale." },
    { q: "Comment se passe l'examen ?", a: "Le passage de la certification Microsoft se fait le dernier jour du bootcamp." },
    { q: "Le CPF est-il accepté ?", a: "Oui, nous sommes un organisme certifié Qualiopi. Contactez-nous pour les démarches." }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="container px-4 mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Une question ?</h2>
        </div>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="font-bold text-lg mb-2">{f.q}</p>
              <p className="text-slate-600 dark:text-slate-400">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
           <Link href="/inscription">
              <Button variant="link" className="text-emerald-600 font-bold">Je suis convaincu, je m'inscris maintenant</Button>
           </Link>
        </div>
      </div>
    </section>
  );
};
