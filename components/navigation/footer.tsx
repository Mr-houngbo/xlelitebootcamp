import Link from 'next/link';
import { Facebook, Youtube, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-600/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        
        {/* Main compact block */}
        <div className="flex flex-col gap-5">
          
          {/* Logo + Tagline */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">XL</span>
              </div>
              <span className="font-black text-base tracking-tight">
                Elite<span className="text-emerald-500">Bootcamp</span>
              </span>
            </Link>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Expert Excel en 5 jours</p>
          </div>

          {/* Contact Grid - 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <a href="mailto:smart.otobos@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
              <Mail size={12} className="text-emerald-500 shrink-0" />
              <span className="truncate font-medium">smart.otobos@gmail.com</span>
            </a>
            <a href="tel:+2250799133365" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
              <Phone size={12} className="text-emerald-500 shrink-0" />
              <span className="font-medium">+225 07 99 13 33 65</span>
            </a>
            <a href="tel:+22961574094" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
              <Phone size={12} className="text-emerald-500 shrink-0" />
              <span className="font-medium">🇧🇯 +229 61 57 40 94</span>
            </a>
            <a href="tel:+221774329345" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
              <Phone size={12} className="text-emerald-500 shrink-0" />
              <span className="font-medium">🇸🇳 +221 77 432 93 45</span>
            </a>
          </div>

          {/* Socials - Horizontal inline */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex gap-2">
              {[
                { icon: <Linkedin size={14} />, href: "https://www.linkedin.com/company/cabinet-smart-otobos-consulting/" },
                { icon: <Youtube size={14} />, href: "https://www.youtube.com/@smartotobosconsulting" },
                { icon: <Facebook size={14} />, href: "https://www.facebook.com/cabinetsoc" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <Link href="/inscription" className="text-[10px] font-black text-emerald-500 hover:text-emerald-400 uppercase tracking-wider transition-colors">
              S'inscrire →
            </Link>
          </div>

        </div>

        {/* Bottom bar - Ultra compact */}
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px]">
          <div className="flex items-center gap-2 text-slate-500">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-slate-400 font-semibold">XL Elite Bootcamp</span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="hidden sm:inline text-slate-600">by <span className="text-emerald-600 font-bold">ENVERSE</span></span>
          </div>
          <div className="flex items-center gap-4">
            {[
              { name: 'Légal', href: '/mentions-legales' },
              { name: 'Privacy', href: '/politique-confidentialite' },
              { name: 'CGV', href: '/conditions-generales-de-vente' },
            ].map((link) => (
              <Link key={link.name} href={link.href} className="text-slate-500 hover:text-emerald-500 font-medium transition-colors">
                {link.name}
              </Link>
            ))}
            <Link href="/admin/login" className="text-slate-500/20 cursor-default">ad</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
