import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, LogOut, Hexagon, MessageSquare } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-brand-orange/20 selection:text-brand-orange font-sans">
      {/* Futuristic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/[0.03] to-transparent"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[150px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent"></div>
      </div>

      {/* Sidebar - Sleek, Floating, Glass */}
      <div className="fixed top-6 left-6 bottom-6 w-72 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] z-50 overflow-hidden flex flex-col">
        {/* Logo Section */}
        <div className="h-28 flex items-center px-8 relative">
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-brand-orange/10 via-brand-orange/30 to-transparent"></div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-12 h-12">
              <Hexagon className="absolute inset-0 w-full h-full text-brand-orange stroke-[1.5]" />
              <div className="absolute inset-0 bg-brand-orange/10 blur-md rounded-full"></div>
              <span className="relative z-10 font-black text-brand-orange text-lg tracking-tighter">XL</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">SYSTEM</h1>
              <p className="text-[10px] text-brand-orange font-bold uppercase tracking-[0.2em]">Core Control</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-6 flex items-center gap-2">
            <div className="h-[1px] w-4 bg-brand-orange/30"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Modules</span>
          </div>

          <a
            href="/admin/dashboard"
            className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-left"></div>
            <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
            <span className="relative z-10">Dashboard</span>
          </a>

          <a
            href="/admin/participants"
            className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-left"></div>
            <Users className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
            <span className="relative z-10">Participants</span>
          </a>

          <a
            href="/admin/business"
            className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-left"></div>
            <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
            <span className="relative z-10">Business</span>
          </a>

          <a
            href="/admin/testimonials"
            className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-left"></div>
            <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
            <span className="relative z-10">Témoignages</span>
          </a>
        </nav>

        {/* User Status / Logout */}
        <div className="p-6">
          <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 rounded-bl-full"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Admin Actif</span>
            </div>
            <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
          </div>
          
          <a
            href="/admin/logout"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-bold text-gray-600 hover:text-red-600 hover:bg-red-50/50 border border-gray-100 hover:border-red-100 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Terminer la session
          </a>
        </div>
      </div>

      {/* Main content Area */}
      <div className="pl-[340px] pr-8 py-6 relative z-10 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Panneau de Contrôle</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Supervision globale et analytique</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut Réseau</p>
              <p className="text-sm font-bold text-gray-900">Synchronisé</p>
            </div>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <div className="w-8 h-8 rounded-xl bg-brand-orange/10 flex items-center justify-center">
              <Hexagon className="w-4 h-4 text-brand-orange stroke-[2]" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1">
          <div className="max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
