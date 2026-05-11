import Link from 'next/link';
import { Facebook, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 py-10 md:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Logo et description */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-black text-lg">XL</span>
              </div>
              <span className="font-black text-xl tracking-tighter">
                Elite<span className="text-emerald-500">Bootcamp</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-medium">
              L'excellence Excel en 4 jours. Propulsez votre carrière vers l'élite.
            </p>
          </div>

          {/* Contact Rapide */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Contact</h3>
            <div className="space-y-3 w-full">
               <a href="mailto:smart.otobos@gmail.com" className="group flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-all">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 transition-all">
                    <Mail size={14} className="text-emerald-500" />
                  </div>
                  <span className="font-semibold">smart.otobos@gmail.com</span>
               </a>
               <a href="tel:+2250799133365" className="group flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-all">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 transition-all">
                    <Phone size={14} className="text-emerald-500" />
                  </div>
                  <span className="font-semibold">+225 07 99 13 33 65</span>
               </a>
            </div>
          </div>

          {/* Présence Régionale */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Bureaux</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center md:justify-start">
              {[
                { country: "RCI", tel: "+225 07 99 13 33 65", href: "tel:+2250799133365" },
                { country: "Bénin", tel: "+229 61 57 40 94", href: "tel:+22961574094" },
                { country: "Sénégal", tel: "+221 77 432 93 45", href: "tel:+221774329345" },
              ].map((office) => (
                <div key={office.country} className="flex flex-col group cursor-pointer">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">{office.country}</span>
                  <a href={office.href} className="text-xs text-slate-300 hover:text-white font-bold transition-colors">{office.tel}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Social Connect */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Suivez-nous</h3>
            <div className="flex gap-3">
                {[
                  { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/cabinet-smart-otobos-consulting/", color: "hover:text-blue-400" },
                  { icon: <Youtube size={16} />, href: "https://www.youtube.com/@smartotobosconsulting", color: "hover:text-red-500" },
                  { icon: <Facebook size={16} />, href: "https://www.facebook.com/cabinetsoc", color: "hover:text-blue-500" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 ${social.color} hover:bg-white/10 transition-all shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="mt-12 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                © {new Date().getFullYear()} <span className="text-slate-300">XL Elite Bootcamp</span>
              </p>
              <p className="text-[9px] font-bold text-slate-600 tracking-widest">
                DESIGNED BY <span className="text-emerald-600">ENVERSE</span>
              </p>
            </div>
            
            <div className="flex gap-10 items-center">
              {[
                { name: 'Légal', href: '/mentions-legales' },
                { name: 'Privacy', href: '/politique-confidentialite' },
                { name: 'CGV', href: '/conditions-generales-de-vente' },
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-[10px] font-black text-slate-500 hover:text-emerald-500 uppercase tracking-[0.2em] transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link href="/admin/login" className="text-[9px] font-black text-slate-500/10 ml-4 uppercase tracking-widest cursor-default">
                ad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
