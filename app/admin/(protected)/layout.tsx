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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30 selection:text-orange-400 font-sans">
      {/* Cinematic Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-orange-600/5 blur-[150px] rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full translate-y-1/3"></div>
      </div>

      {/* Sidebar - Precision Floating Glass */}
      <div className="fixed top-6 left-6 bottom-6 w-80 bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Logo Section */}
        <div className="h-32 flex items-center px-10 relative">
          <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-orange-500/40 via-orange-500/10 to-transparent"></div>
          <div className="flex items-center gap-5">
            <div className="relative w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20 group hover:scale-110 transition-transform duration-500">
               <span className="font-black text-2xl tracking-tighter text-white">XL</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none mb-1">CORE <span className="text-orange-500 text-[10px] align-top tracking-[0.3em] font-black">AI</span></h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Management Elite</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <AdminNav />

        {/* Logout / User */}
        <div className="p-8 space-y-6">
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 relative group cursor-pointer hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
               </div>
               <div className="overflow-hidden">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Session Active</p>
                 <p className="text-xs font-bold truncate text-slate-300">{user.email}</p>
               </div>
            </div>
          </div>
          
          <a
            href="/admin/logout"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white hover:bg-red-500 transition-all"
          >
            <LogOut className="w-4 h-4" /> Terminer
          </a>
        </div>
      </div>

      {/* Main content Area */}
      <div className="pl-[360px] pr-10 py-10 relative z-10 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="flex items-end justify-between mb-16 px-4">
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-2">
               <div className="w-4 h-[1px] bg-orange-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">XL Elite Intelligence</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter">Command Center <span className="text-orange-500">.</span></h2>
          </div>
          
          <div className="flex items-center gap-6 px-8 py-4 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Network</p>
              <p className="text-xs font-black text-emerald-500">SECURE</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-orange-600/10 flex items-center justify-center border border-orange-500/20">
              <Hexagon className="w-5 h-5 text-orange-500 animate-[spin_10s_linear_infinite]" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 px-4 pb-20">
          <div className="max-w-[1500px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
