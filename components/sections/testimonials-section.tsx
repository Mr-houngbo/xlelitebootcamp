'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aminata Traoré",
      position: "Responsable Marketing",
      company: "Orange Burkina",
      rating: 5,
      testimonial: "Cette formation m'a permis de passer de 2h à 30min pour mes rapports mensuels. Investissement très rentable !",
      initials: "AT"
    },
    {
      name: "Kader Ouédraogo",
      position: "Analyste Financier",
      company: "Bank of Africa",
      rating: 5,
      testimonial: "La certification Excel Expert a boosté ma carrière. J'ai eu une promotion 3 mois après la formation.",
      initials: "KO"
    },
    {
      name: "Marie Kabore",
      position: "Chef de projet",
      company: "Sonabel",
      rating: 5,
      testimonial: "Formateur excellent, pédagogie adaptée. Les cas pratiques sont très pertinents pour notre quotidien.",
      initials: "MK"
    },
    {
      name: "Jean-Baptiste Yaméogo",
      position: "Contrôleur de gestion",
      company: "TotalEnergies",
      rating: 5,
      testimonial: "Le meilleur investissement pour ma carrière professionnelle. Je recommande vivement !",
      initials: "JY"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-green/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-orange/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl elegant-heading mb-6">
            Ils ont franchi <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">le pas</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Découvrez comment la formation XL Elite a transformé le quotidien de ces professionnels.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card p-6 flex flex-col h-full group"
            >
              <Quote className="w-10 h-10 text-brand-green/10 mb-4 group-hover:text-brand-green/30 transition-colors" />
              
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <blockquote className="text-gray-700 mb-8 flex-1 text-sm leading-relaxed font-medium">
                "{testimonial.testimonial}"
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-green to-brand-orange flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-brand-green font-semibold">{testimonial.position}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Corporate Trust */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black text-gray-800">ORANGE</span>
            <span className="text-2xl font-black text-gray-800">BOA</span>
            <span className="text-2xl font-black text-gray-800">SONABEL</span>
            <span className="text-2xl font-black text-gray-800">TOTAL</span>
            <span className="text-2xl font-black text-gray-800">CORIS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
