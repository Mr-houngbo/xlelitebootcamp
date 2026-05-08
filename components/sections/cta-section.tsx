'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, ArrowRight, Phone, Mail } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 border-t border-gray-100">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 via-slate-50 to-brand-orange/5 opacity-50"></div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-green/20 to-brand-orange/20 rounded-full blur-[150px] pointer-events-none mix-blend-multiply"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Urgent Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-brand-orange/20 shadow-sm text-sm font-bold mb-8 text-brand-orange">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f59e0b]"></span>
              </span>
              Places limitées - 20 participants
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
              Passez à la Vitesse
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">
                Supérieure
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ne laissez pas les autres prendre l'avantage. Rejoignez la prochaine session intensive et propulsez votre carrière avec la certification Microsoft Excel Expert.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-b from-gray-200 to-gray-50 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-orange/20 rounded-[2.5rem] blur-xl opacity-30"></div>
            
            <div className="relative bg-white/90 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">L'Investissement Ultime</h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Un tarif clair, sans frais cachés, rentabilisé dès votre prochaine évaluation annuelle.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="/inscription" className="group">
                      <button className="premium-button w-full sm:w-auto flex items-center justify-center gap-2 text-lg">
                        S'inscrire Maintenant
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="flex-1 w-full max-w-md">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 shadow-lg relative group hover:border-brand-orange/30 transition-colors">
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-brand-orange to-[#d97706] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg transform rotate-3">
                      LE MEILLEUR CHOIX
                    </div>
                    <p className="text-brand-orange text-sm font-black tracking-wider uppercase mb-2">Formation Complète</p>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-black text-gray-900">150.000</span>
                      <span className="text-xl text-gray-500 font-bold">FCFA</span>
                    </div>
                    
                    <ul className="space-y-4 text-gray-600 font-medium">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-brand-green" />
                        </div>
                        <span>4 jours d'immersion totale</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-brand-green" />
                        </div>
                        <span>Certification Microsoft incluse</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-brand-green" />
                        </div>
                        <span>Accompagnement VIP 6 mois</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-12"
          >
            <div className="flex items-center justify-center gap-3 text-gray-600">
               <ShieldCheck className="w-6 h-6 text-brand-green" />
               <span className="font-semibold">Paiement 100% Sécurisé</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
               <Award className="w-6 h-6 text-brand-orange" />
               <span className="font-semibold">Excellence Garantie</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-gray-600">
               <a href="tel:+22600000000" className="flex items-center gap-2 hover:text-brand-green transition-colors font-semibold">
                 <Phone className="w-5 h-5 text-brand-green" />
                 <span>+226 00 00 00 00</span>
               </a>
               <span className="text-gray-300">|</span>
               <a href="mailto:contact@xlbootcamp.com" className="flex items-center gap-2 hover:text-brand-orange transition-colors font-semibold">
                 <Mail className="w-5 h-5 text-brand-orange" />
                 <span>Contact</span>
               </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
