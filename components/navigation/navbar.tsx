'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Pourquoi nous ?', href: '/preuve' },
  ];

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
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-gray-900 font-black tracking-tighter z-10 text-sm md:text-lg">XL</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-900 tracking-tight hidden sm:block">
              Elite<span className="text-brand-green">Bootcamp</span>
            </span>
          </Link>

          {/* Desktop Navigation & CTA Grouped Together */}
          <div className="hidden md:flex items-center gap-3 z-10">
            <div className="flex items-center gap-1 bg-white/60 backdrop-blur-md rounded-full p-1 border border-gray-100/50 shadow-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-5 py-2 text-sm font-semibold text-slate-700 hover:text-brand-green transition-all rounded-full hover:bg-white hover:shadow-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <Link 
              href="/inscription"
              className="premium-button text-sm px-7 py-3 !rounded-full shadow-lg shadow-brand-green/20 whitespace-nowrap"
            >
              S'inscrire
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 bg-white/90 rounded-full border border-gray-100 text-gray-700 hover:text-brand-green transition-colors focus:outline-none shadow-sm"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-3xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden z-40"
            >
              <div className="flex flex-col p-4 space-y-1">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-5 py-4 text-gray-700 hover:text-brand-green hover:bg-brand-green/5 rounded-2xl transition-all font-bold text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="pt-2 pb-1"
                >
                  <Link 
                    href="/inscription"
                    className="premium-button block text-center w-full !rounded-2xl text-lg py-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    S'inscrire maintenant
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
