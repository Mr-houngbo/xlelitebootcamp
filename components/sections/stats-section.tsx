'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Star, Award } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { number: "500+", label: "Professionnels formés", icon: Users },
    { number: "98%", label: "Satisfaction", icon: Star },
    { number: "85%", label: "Promotion carrière", icon: TrendingUp },
    { number: "100%", label: "Taux de Réussite", icon: Award },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
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
    <section className="py-24 relative overflow-hidden bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl elegant-heading mb-4">
            Des Résultats <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Incontestables</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            La data parle d'elle-même. Rejoignez la communauté des experts.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="glass-card p-8 text-center group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-green/0 to-brand-green/0 group-hover:from-brand-green/5 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="mx-auto w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-green/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tighter">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
