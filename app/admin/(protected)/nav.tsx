'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Briefcase, MessageSquare, PhoneCall } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/admin/dashboard' },
  { name: 'Participants', icon: <Users className="w-4 h-4" />, href: '/admin/participants' },
  { name: 'Business', icon: <Briefcase className="w-4 h-4" />, href: '/admin/business' },
  { name: 'Appeler', icon: <PhoneCall className="w-4 h-4" />, href: '/admin/calls' },
  { name: 'Témoignages', icon: <MessageSquare className="w-4 h-4" />, href: '/admin/testimonials' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-4 space-y-1">
      <div className="px-4 mb-4 flex items-center gap-2">
        <div className="h-[2px] w-3 bg-amber-600 rounded-full"></div>
        <span className="text-[9px] font-extrabold text-stone-400 uppercase tracking-[0.3em]">Operations</span>
      </div>

      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-bold transition-all duration-300 relative ${
              isActive 
                ? 'text-stone-900 bg-white shadow-sm border border-stone-100' 
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            {/* Active Indicator Bar */}
            <div className={`absolute left-0 w-1 bg-amber-500 rounded-full transition-all duration-300 ${
              isActive ? 'h-5 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'h-0 opacity-0 group-hover:h-3 group-hover:opacity-50'
            }`} />
            
            <div className={`transition-colors duration-300 flex items-center justify-center w-8 h-8 rounded-lg ${
              isActive ? 'bg-orange-50 text-amber-600' : 'text-stone-400 group-hover:text-amber-500'
            }`}>
              {item.icon}
            </div>
            
            <span className="relative z-10 text-[13px]">{item.name}</span>

            {isActive && (
              <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-amber-500" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
