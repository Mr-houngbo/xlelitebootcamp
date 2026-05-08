import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo et description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-slate-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-gray-900 font-extrabold tracking-tighter z-10 text-lg">XL</span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                Elite<span className="text-brand-green">Bootcamp</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              L'excellence Excel, en 4 jours. La seule formation certifiante Microsoft Excel Expert qui propulse votre carrière au niveau supérieur.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:text-brand-green hover:bg-brand-green/10 border border-gray-100 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:text-brand-orange hover:bg-brand-orange/10 border border-gray-100 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:text-brand-green hover:bg-brand-green/10 border border-gray-100 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6 lg:pl-8">
            <h3 className="font-bold text-gray-900 text-lg tracking-wide uppercase text-sm">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-500 hover:text-brand-green transition-colors flex items-center gap-2 group font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green/0 group-hover:bg-brand-green transition-colors"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/preuve" className="text-gray-500 hover:text-brand-green transition-colors flex items-center gap-2 group font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green/0 group-hover:bg-brand-green transition-colors"></span>
                  Pourquoi XL Elite ?
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="text-gray-500 hover:text-brand-green transition-colors flex items-center gap-2 group font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green/0 group-hover:bg-brand-green transition-colors"></span>
                  S'inscrire
                </Link>
              </li>
            </ul>
          </div>

          {/* Formation */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 text-lg tracking-wide uppercase text-sm">Formation</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-brand-green font-bold">✓</span>
                <span className="text-gray-500 font-medium">Certification Microsoft</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-green font-bold">✓</span>
                <span className="text-gray-500 font-medium">4 jours intensifs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-green font-bold">✓</span>
                <span className="text-gray-500 font-medium">Comité réduit (20 pers)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-green font-bold">✓</span>
                <span className="text-gray-500 font-medium">Format d'excellence</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-green font-bold">✓</span>
                <span className="text-gray-500 font-medium">Support VIP 6 mois</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 text-lg tracking-wide uppercase text-sm">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-500 group hover:text-gray-900 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                  <Mail size={18} />
                </div>
                <span className="font-medium">contact@xlbootcamp.com</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-500 group hover:text-gray-900 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                  <Phone size={18} />
                </div>
                <span className="font-medium">+226 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-500 group hover:text-gray-900 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="font-medium">Ouaga 2000, Burkina Faso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} XL Elite Bootcamp. L'Excellence n'attend pas.
            </p>
            <div className="flex flex-wrap justify-center space-x-6 items-center">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-gray-800 text-sm transition-colors font-medium">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-400 hover:text-gray-800 text-sm transition-colors font-medium">
                Confidentialité
              </Link>
              <Link href="/conditions-generales-de-vente" className="text-gray-400 hover:text-gray-800 text-sm transition-colors font-medium">
                Conditions Générales de Vente
              </Link>
              {/* Admin button - presque invisible */}
              <Link 
                href="/admin/login" 
                className="text-white hover:text-gray-200 text-xs transition-colors"
                title="Accès administrateur"
              >
                ad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
