import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          {/* Logo */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group justify-center md:justify-start">
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-gray-900 font-extrabold tracking-tighter z-10 text-base md:text-lg">XL</span>
              </div>
              <span className="font-bold text-lg md:text-xl text-gray-900 tracking-tight">
                Elite<span className="text-brand-green">Bootcamp</span>
              </span>
            </Link>
            <p className="hidden md:block text-gray-500 leading-relaxed max-w-sm text-sm">
              L'excellence Excel, en 4 jours. La seule formation certifiante Microsoft Excel Expert qui propulse votre carrière.
            </p>
          </div>

          {/* Social & Contact Compact */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-green transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-green transition-colors"><Linkedin size={18} /></a>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Mail size={12} className="text-brand-orange" /> contact@xlbootcamp.com</span>
              <span className="flex items-center gap-2"><Phone size={12} className="text-brand-green" /> +226 XX XX XX XX</span>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-100 mt-8 md:mt-16 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} XL Elite
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-gray-900 text-[9px] transition-colors font-bold uppercase">Mentions</Link>
              <Link href="/politique-confidentialite" className="text-gray-400 hover:text-gray-900 text-[9px] transition-colors font-bold uppercase">Privacy</Link>
              <Link href="/conditions-generales-de-vente" className="text-gray-400 hover:text-gray-900 text-[9px] transition-colors font-bold uppercase">CGV</Link>
              <Link href="/admin/login" className="opacity-0 w-4 h-4">.</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
