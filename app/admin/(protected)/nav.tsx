'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Briefcase, MessageSquare, PhoneCall } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/admin/dashboard' },
  { name: 'Participants', icon: <Users className="w-5 h-5" />, href: '/admin/participants' },
  { name: 'Business', icon: <Briefcase className="w-5 h-5" />, href: '/admin/business' },
  { name: 'Appeler', icon: <PhoneCall className="w-5 h-5" />, href: '/admin/calls' },
  { name: 'Témoignages', icon: <MessageSquare className="w-5 h-5" />, href: '/admin/testimonials' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-6 py-10 space-y-3">
      <div className="px-4 mb-8 flex items-center gap-3">
        <div className="h-[1px] w-5 bg-orange-500/40"></div>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Operations</span>
      </div>

      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center gap-5 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-500 relative ${
              isActive 
                ? 'text-white bg-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.2)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {/* Active Indicator Bar */}
            <div className={`absolute left-0 w-1 bg-orange-500 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] ${
              isActive ? 'h-8' : 'h-0 group-hover:h-6'
            }`} />
            
            <div className={`transition-colors duration-500 ${
              isActive ? 'text-orange-500' : 'text-slate-500 group-hover:text-orange-500'
            }`}>
              {item.icon}
            </div>
            
            <span className="relative z-10">{item.name}</span>

            {isActive && (
              <div className="absolute right-6 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
