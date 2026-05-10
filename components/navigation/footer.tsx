import Link from 'next/link';
import { Facebook, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo et description */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-black text-lg">XL</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                Elite<span className="text-brand-green">Bootcamp</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              L'excellence Excel en 4 jours. La seule formation certifiante Microsoft Excel Expert qui propulse votre carrière.
            </p>
          </div>

          {/* Contacts Globaux */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contactez-nous</h3>
            <div className="space-y-4 flex flex-col items-center md:items-start">
               <a href="mailto:smart.otobos@gmail.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-orange transition-colors">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-brand-orange" />
                  </div>
                  <span>smart.otobos@gmail.com</span>
               </a>
               <a href="tel:+2250799133365" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-green transition-colors">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-brand-green" />
                  </div>
                  <span>+225 07 99 13 33 65</span>
               </a>
            </div>
          </div>

          {/* Nos Bureaux */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Nos Bureaux</h3>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              <li className="flex flex-col space-y-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Côte d'ivoire</span>
                <a href="tel:+2250799133365" className="text-sm text-gray-700 hover:text-brand-green font-medium">+225 07 99 13 33 65</a>
              </li>
              <li className="flex flex-col space-y-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Bénin</span>
                <a href="tel:+22961574094" className="text-sm text-gray-700 hover:text-brand-green font-medium">+229 61 57 40 94</a>
              </li>
              <li className="flex flex-col space-y-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Sénégal</span>
                <a href="tel:+221774329345" className="text-sm text-gray-700 hover:text-brand-green font-medium">+221 77 432 93 45</a>
              </li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Suivez-nous</h3>
            <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/cabinet-smart-otobos-consulting/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 border border-gray-100 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.youtube.com/@smartotobosconsulting" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 border border-gray-100 transition-all">
                  <Youtube size={18} />
                </a>
                <a href="https://www.facebook.com/cabinetsoc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 border border-gray-100 transition-all">
                  <Facebook size={18} />
                </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} XL Elite Bootcamp
              </p>
              <p className="text-gray-400 text-[10px] font-medium tracking-wide">
                Made by <span className="text-gray-600 font-bold">enverse</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'Légal', href: '/mentions-legales' },
                { name: 'Privacy', href: '/politique-confidentialite' },
                { name: 'CGV', href: '/conditions-generales-de-vente' },
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-gray-500 hover:text-gray-900 text-xs font-bold uppercase tracking-wider transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link href="/admin/login" className="text-transparent selection:text-transparent text-[6px]">ad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
