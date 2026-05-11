import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, LogOut, Hexagon, MessageSquare } from 'lucide-react';
import { AdminNav } from './nav';
import { ModeToggle } from '@/components/mode-toggle';

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
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-orange-500/20 selection:text-orange-600 font-sans transition-colors duration-300">
      {/* Soft Ambient Light (Light Mode) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-orange-500/5 dark:bg-orange-500/[0.03] blur-[150px] rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-700/5 dark:bg-amber-900/[0.03] blur-[120px] rounded-full translate-y-1/3"></div>
      </div>

      {/* Sidebar - Precision Floating Glass (Light/Dark) */}
      <div className="fixed top-4 left-4 bottom-4 w-72 bg-white/70 dark:bg-stone-900/70 backdrop-blur-2xl rounded-3xl border border-stone-200/60 dark:border-stone-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] z-50 overflow-hidden flex flex-col">
        {/* Logo Section */}
        <div className="h-28 flex items-center px-8 relative">
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-stone-200 dark:from-stone-800 via-stone-200 dark:via-stone-800 to-transparent"></div>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group hover:scale-105 transition-transform duration-500">
               <span className="font-black text-xl tracking-tighter text-white">XL</span>
               <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 inset-ring"></div>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none mb-1 text-stone-900 dark:text-stone-100">CORE</h1>
              <p className="text-[9px] text-amber-700 dark:text-orange-500 font-bold uppercase tracking-[0.2em]">Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-2">
           <AdminNav />
        </div>

        {/* Logout / User */}
        <div className="p-6 space-y-3 mt-auto">
          <div className="p-3 rounded-2xl bg-white dark:bg-stone-950 border border-stone-100 dark:border-stone-800 shadow-sm relative group transition-all">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
               </div>
               <div className="overflow-hidden">
                <p className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-0.5">Session</p>
                <p className="text-xs font-bold truncate text-stone-700 dark:text-stone-300">{user.email}</p>
               </div>
            </div>
          </div>
          
          <a
            href="/admin/logout"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all shadow-sm"
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
            <div className="flex items-center gap-2 text-amber-600 dark:text-orange-500 mb-2">
               <div className="w-3 h-[2px] bg-amber-500 dark:bg-orange-500 rounded-full" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em]">XL Elite Intelligence</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">Command Center <span className="text-orange-500">.</span></h2>
          </div>
          
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="flex items-center gap-5 px-6 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm transition-all">
              <div className="text-right">
                <p className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em]">Network</p>
                <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-500">SECURE</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center border border-orange-100 dark:border-orange-500/20">
                <Hexagon className="w-4 h-4 text-amber-600 dark:text-orange-500 animate-[spin_10s_linear_infinite]" />
              </div>
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
