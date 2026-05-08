'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Star, ShieldCheck, Users } from 'lucide-react';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-slate-50">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-green/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-orange/10 via-transparent to-transparent"></div>
      
      {/* Floating Orbs (Light Mode) */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-brand-green/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float pointer-events-none"></motion.div>
      <motion.div style={{ y: y1, animationDelay: '2s' }} className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-brand-orange/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float pointer-events-none"></motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold mb-8 text-gray-700"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
            </span>
            Prochaine session : 09-13 Juin 2025
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]"
          >
            L'Excellence <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">
              Microsoft Excel
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Propulsez votre carrière avec notre Bootcamp intensif de 4 jours. Obtenez la certification <strong className="text-gray-900 font-bold">Microsoft Excel Expert</strong> et devenez incontournable.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link href="/inscription" className="w-full sm:w-auto">
              <button className="premium-button w-full flex items-center justify-center gap-2 text-lg">
                S'inscrire Maintenant
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/programme" className="w-full sm:w-auto">
              <button className="premium-button-outline w-full flex items-center justify-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                Voir le Programme
              </button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 pt-8 border-t border-gray-200/50 flex flex-wrap justify-center gap-8 md:gap-12"
          >
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 text-brand-green" />
              <span className="font-semibold text-sm">+500 Formés</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-5 h-5 text-brand-orange fill-brand-orange" />
              <span className="font-semibold text-sm">Noté 4.9/5</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ShieldCheck className="w-5 h-5 text-brand-green" />
              <span className="font-semibold text-sm">Certification Microsoft</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
