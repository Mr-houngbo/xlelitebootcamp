import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-12">
          {/* Logo et description */}
          <div className="space-y-4 max-w-xs">
            <Link href="/" className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-black text-sm md:text-lg">XL</span>
              </div>
              <span className="font-bold text-lg md:text-xl text-gray-900">
                Elite<span className="text-brand-green">Bootcamp</span>
              </span>
            </Link>
            <p className="hidden md:block text-gray-500 text-sm leading-relaxed">
              L'excellence Excel en 4 jours. La seule formation certifiante Microsoft Excel Expert qui propulse votre carrière.
            </p>
            <div className="flex justify-center md:justify-start space-x-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 hover:text-brand-green border border-gray-100">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Rapide (Compact) */}
          <div className="flex flex-col items-center md:items-end space-y-2 md:space-y-3">
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail size={14} className="text-brand-orange" />
                <span>contact@xlbootcamp.com</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone size={14} className="text-brand-green" />
                <span>+226 XX XX XX XX</span>
             </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-100 mt-8 md:mt-16 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-[9px] md:text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} XL Elite Bootcamp
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { name: 'Légal', href: '/mentions-legales' },
                { name: 'Privacy', href: '/politique-confidentialite' },
                { name: 'CGV', href: '/conditions-generales-de-vente' },
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-gray-400 hover:text-gray-900 text-[9px] md:text-xs font-bold uppercase tracking-tighter">
                  {link.name}
                </Link>
              ))}
              <Link href="/admin/login" className="text-slate-100 text-[6px]">ad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
