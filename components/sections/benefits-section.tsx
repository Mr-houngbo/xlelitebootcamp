'use client';

import { motion } from 'framer-motion';
import { Award, Lightbulb, Users, Headset, GraduationCap, Clock } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      title: "Certification Officielle",
      description: "Démarquez-vous avec un diplôme Microsoft reconnu mondialement.",
      icon: Award,
      color: "from-brand-green to-[#059669]"
    },
    {
      title: "Pédagogie Pratique",
      description: "Zéro théorie inutile. Uniquement des cas réels appliqués à votre métier.",
      icon: Lightbulb,
      color: "from-brand-orange to-[#d97706]"
    },
    {
      title: "L'Élite en Comité Réduit",
      description: "20 places max. Un suivi ultra-personnalisé pour garantir votre réussite.",
      icon: Users,
      color: "from-brand-green to-[#059669]"
    },
    {
      title: "Accompagnement 6 Mois",
      description: "Ne soyez jamais seul. Accès direct au formateur et à la communauté.",
      icon: Headset,
      color: "from-brand-orange to-[#d97706]"
    },
    {
      title: "Expertise Senior",
      description: "Apprenez de Leonce SODJINOU, consultant avec 15+ années d'expérience.",
      icon: GraduationCap,
      color: "from-brand-green to-[#059669]"
    },
    {
      title: "Flexibilité Absolue",
      description: "Choisissez parmi 3 créneaux horaires adaptés à votre agenda chargé.",
      icon: Clock,
      color: "from-brand-orange to-[#d97706]"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl elegant-heading mb-6">
            L'Avantage <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Injuste</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Une architecture pédagogique conçue méticuleusement pour vous transformer en expert incontestable de votre domaine.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-brand-orange/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative h-full glass-card p-8 border-gray-100/50 hover:border-brand-green/20">
                  <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${benefit.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-green group-hover:to-brand-orange transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pricing CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div className="relative p-[2px] rounded-[2rem] bg-gradient-to-r from-brand-green via-brand-orange to-brand-green bg-[length:200%_auto] animate-gradient-x shadow-xl">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green/5 via-transparent to-transparent"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Investissez en Vous-Même</h3>
                <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-lg">
                  Le ROI de cette formation est immédiat. Boostez votre productivité et propulsez votre carrière pour un investissement unique.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-green/30 transition-colors">
                    <div className="relative z-10">
                      <p className="text-sm text-brand-green uppercase tracking-wider font-bold mb-2">Frais d'Inscription</p>
                      <div className="text-4xl font-black text-gray-900 mb-1">30.000<span className="text-2xl text-gray-400"> FCFA</span></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-orange/30 transition-colors">
                    <div className="absolute -top-3 -right-3 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md transform rotate-12">POPULAIRE</div>
                    <div className="relative z-10">
                      <p className="text-sm text-brand-orange uppercase tracking-wider font-bold mb-2">Tarif de Formation</p>
                      <div className="text-4xl font-black text-gray-900 mb-1">125.000<span className="text-2xl text-gray-400"> FCFA</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
