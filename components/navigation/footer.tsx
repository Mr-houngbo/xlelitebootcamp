import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">
          {/* Logo et description */}
          <div className="space-y-4 md:space-y-6">
            <Link href="/" className="flex items-center gap-3 group justify-center md:justify-start">
              <div className="relative w-10 h-10 bg-slate-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-gray-900 font-extrabold tracking-tighter z-10 text-lg">XL</span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                Elite<span className="text-brand-green">Bootcamp</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-sm mx-auto md:mx-0 text-sm md:text-base">
              L'excellence Excel, en 4 jours. La seule formation certifiante Microsoft Excel Expert qui propulse votre carrière.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-brand-green/10 border border-gray-100 transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 hover:text-brand-orange hover:bg-brand-orange/10 border border-gray-100 transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-brand-green/10 border border-gray-100 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Formation - Masqué ou simplifié sur mobile pour gagner de la place */}
          <div className="hidden md:block space-y-6">
            <h3 className="font-bold text-gray-900 tracking-wide uppercase text-xs">Formation</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><span className="text-brand-green font-bold text-xs">✓</span> <span className="text-gray-500">Certification Microsoft</span></li>
              <li className="flex items-center gap-2"><span className="text-brand-green font-bold text-xs">✓</span> <span className="text-gray-500">4 jours intensifs</span></li>
              <li className="flex items-center gap-2"><span className="text-brand-green font-bold text-xs">✓</span> <span className="text-gray-500">Format d'excellence</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 tracking-wide uppercase text-xs">Contact</h3>
            <div className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3 text-gray-500 text-sm">
                <Mail size={16} className="text-brand-orange" />
                <span>contact@xlbootcamp.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 text-sm">
                <Phone size={16} className="text-brand-green" />
                <span>+226 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 text-sm">
                <MapPin size={16} className="text-slate-400" />
                <span>Ouaga 2000, Burkina Faso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-100 mt-12 md:mt-16 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} XL Elite Bootcamp
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-gray-900 text-[10px] md:text-xs transition-colors font-bold uppercase tracking-tighter">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-400 hover:text-gray-900 text-[10px] md:text-xs transition-colors font-bold uppercase tracking-tighter">
                Confidentialité
              </Link>
              <Link href="/conditions-generales-de-vente" className="text-gray-400 hover:text-gray-900 text-[10px] md:text-xs transition-colors font-bold uppercase tracking-tighter">
                CGV
              </Link>
              <Link href="/admin/login" className="text-slate-100 text-[8px]">ad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
