'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-4 md:pt-6 px-4`}
    >
      <div className="mx-auto max-w-5xl relative">
        <div 
          className={`flex items-center justify-between rounded-full transition-all duration-500 overflow-visible relative
            ${scrolled 
              ? 'bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] py-2 px-3 md:px-4' 
              : 'bg-white/40 backdrop-blur-lg border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3 px-4 md:px-5'
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-10 pl-1 md:pl-2">
            <div className="relative w-8 h-8 md:w-10 md:h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center overflow-hidden shadow-sm transition-transform group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-emerald-950 font-black tracking-tighter z-10 text-sm md:text-lg">XL</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-emerald-950 tracking-tight hidden sm:block">
              Elite<span className="text-emerald-600">Bootcamp</span>
            </span>
          </Link>

          {/* CTA Button - Desktop & Mobile */}
          <Link 
            href="/inscription"
            className="relative overflow-hidden bg-emerald-600 hover:bg-emerald-700 text-white text-sm md:text-sm font-bold px-5 md:px-7 py-2.5 md:py-3 rounded-full shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_20px_35px_-5px_rgba(16,185,129,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap z-10"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
