import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, LogOut, Hexagon, MessageSquare } from 'lucide-react';
import { AdminNav } from './nav';

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
    <div className="min-h-screen bg-[#FDFBF9] text-stone-900 selection:bg-orange-500/20 selection:text-orange-600 font-sans">
      {/* Soft Ambient Light (Light Mode) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-700/5 blur-[120px] rounded-full translate-y-1/3"></div>
      </div>

      {/* Sidebar - Precision Floating Glass (Light) */}
      <div className="fixed top-4 left-4 bottom-4 w-72 bg-white/70 backdrop-blur-2xl rounded-3xl border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] z-50 overflow-hidden flex flex-col">
        {/* Logo Section */}
        <div className="h-28 flex items-center px-8 relative">
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-stone-200 via-stone-200 to-transparent"></div>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group hover:scale-105 transition-transform duration-500">
               <span className="font-black text-xl tracking-tighter text-white">XL</span>
               <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 inset-ring"></div>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none mb-1 text-stone-900">CORE</h1>
              <p className="text-[9px] text-amber-700 font-bold uppercase tracking-[0.2em]">Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-2">
           <AdminNav />
        </div>

        {/* Logout / User */}
        <div className="p-6 space-y-3 mt-auto">
          <div className="p-3 rounded-2xl bg-white border border-stone-100 shadow-sm relative group transition-all">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
               </div>
               <div className="overflow-hidden">
                 <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-0.5">Session</p>
                 <p className="text-xs font-bold truncate text-stone-700">{user.email}</p>
               </div>
            </div>
          </div>
          
          <a
            href="/admin/logout"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </a>
        </div>
      </div>

      {/* Main content Area */}
      <div className="pl-[320px] pr-6 py-8 relative z-10 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="flex items-end justify-between mb-10 px-2">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
               <div className="w-3 h-[2px] bg-amber-500 rounded-full" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em]">XL Elite Intelligence</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Command Center <span className="text-orange-500">.</span></h2>
          </div>
          
          <div className="flex items-center gap-5 px-6 py-3 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <div className="text-right">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em]">Network</p>
              <p className="text-[11px] font-black text-emerald-600">SECURE</p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
              <Hexagon className="w-4 h-4 text-amber-600 animate-[spin_10s_linear_infinite]" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 px-2 pb-12">
          <div className="max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
