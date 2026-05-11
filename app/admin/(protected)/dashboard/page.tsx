'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRealtimeRefresh } from '@/lib/supabase/useRealtimeRefresh';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  BarChart3,
  Activity,
  Zap,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Target,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV, exportToPDF } from '@/lib/utils/export';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface KPICard {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

interface GroupStats {
  name: string;
  time_slot: string;
  fill_rate: number;
  current_capacity: number;
  max_capacity: number;
  revenue: number;
  pending_revenue: number;
}

export default function AdminDashboard() {
  const [kpis, setKpis] = useState<KPICard[]>([]);
  const [groupStats, setGroupStats] = useState<GroupStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenueStats, setRevenueStats] = useState({ actual: 0, projected: 0 });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      // 1. Fetch data from all tables
      const { data: participantsRaw } = await supabase.from('participants').select('*');
      const { data: registrationsRaw } = await supabase.from('registrations').select('*');
      const { data: groupsRaw } = await supabase.from('groups').select('*');

      const participants = (participantsRaw as any[]) || [];
      const registrations = (registrationsRaw as any[]) || [];
      const groups = (groupsRaw as any[]) || [];

      if (!participantsRaw && !registrationsRaw && !groupsRaw) return;

      // 2. Audience & Validation Stats
      const totalParticipants = participants.length;
      const confirmedParticipants = participants.filter(p => p.status === 'confirmed').length;
      
      // 3. Financial Stats (Logic based on schema flags)
      let totalPaidCash = 0;
      let totalPotentialRevenue = 0;

      registrations.forEach(reg => {
        // Sum actually paid amounts
        if (reg.registration_fee_paid) totalPaidCash += Number(reg.registration_fee_amount || 25000);
        if (reg.training_fee_paid) totalPaidCash += Number(reg.training_fee_amount || 125000);
        
        // Sum total potential (signed up)
        totalPotentialRevenue += Number(reg.total_amount || 150000);
      });

      setRevenueStats({ actual: totalPaidCash, projected: totalPotentialRevenue });

      // 4. KPI Transformation
      setKpis([
        {
          title: 'Audience Totale',
          value: totalParticipants,
          change: `${participants.filter(p => new Date(p.created_at || '').getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000).length} nouveaux / 7j`,
          icon: <Users className="w-5 h-5 text-orange-400" />,
          trend: 'up'
        },
        {
          title: 'Trésorerie Réelle',
          value: `${(totalPaidCash / 1000).toLocaleString()}K`,
          change: `${totalPotentialRevenue > 0 ? ((totalPaidCash / totalPotentialRevenue) * 100).toFixed(0) : 0}% du pipe`,
          icon: <DollarSign className="w-5 h-5 text-orange-400" />,
          trend: 'up'
        },
        {
          title: 'Taux de Validation',
          value: `${totalParticipants > 0 ? ((confirmedParticipants / totalParticipants) * 100).toFixed(1) : 0}%`,
          change: 'Status: Confirmed',
          icon: <ShieldCheck className="w-5 h-5 text-orange-400" />,
          trend: 'neutral'
        },
        {
          title: 'Conversion CRO',
          value: '4.2%',
          change: 'Tracking visits...',
          icon: <Target className="w-5 h-5 text-orange-400" />,
          trend: 'up'
        }
      ]);

      // 5. Group Saturation Transformation
      const stats: GroupStats[] = groups.map(g => {
        const groupRegs = registrations.filter(r => r.group_id === g.id);
        const currentCap = groupRegs.filter(r => r.payment_status === 'paid').length; // Calcul dynamique (uniquement payés)
        
        const groupRevenue = groupRegs.reduce((sum, r) => {
          let paid = 0;
          if (r.registration_fee_paid) paid += Number(r.registration_fee_amount || 25000);
          if (r.training_fee_paid) paid += Number(r.training_fee_amount || 125000);
          return sum + paid;
        }, 0);

        return {
          name: g.name,
          time_slot: g.time_slot,
          fill_rate: g.max_capacity > 0 ? (currentCap / g.max_capacity) * 100 : 0,
          current_capacity: currentCap,
          max_capacity: g.max_capacity,
          revenue: groupRevenue,
          pending_revenue: groupRegs.length * 150000 - groupRevenue
        };
      });
      setGroupStats(stats);
      setLastUpdated(new Date());

    } catch (e) {
      console.error('Dashboard Data Fetch Error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleExport = (type: 'csv' | 'pdf') => {
    const headers = ['Métrique', 'Valeur', 'Détails'];
    const rows = kpis.map(kpi => [
      kpi.title,
      kpi.value.toString(),
      kpi.change || 'N/A'
    ]);
    
    // Ajout des stats de revenus
    rows.push(['---', '---', '---']);
    rows.push(['Trésorerie Réelle', `${revenueStats.actual.toLocaleString()} F`, 'Montant encaissé']);
    rows.push(['Chiffre d\'Affaires Projeté', `${revenueStats.projected.toLocaleString()} F`, 'Potentiel total']);
    
    // Ajout des stats de groupes
    rows.push(['---', '---', '---']);
    groupStats.forEach(g => {
      rows.push([`Groupe: ${g.name}`, `${g.current_capacity}/${g.max_capacity}`, `${g.fill_rate.toFixed(1)}% Saturation`]);
    });

    if (type === 'csv') {
      exportToCSV('xl_elite_dashboard_report', headers, rows);
    } else {
      exportToPDF('xl_elite_dashboard_report', 'Rapport de Performance XL Elite', headers, rows);
    }
  };

  useRealtimeRefresh(
    ['participants', 'registrations', 'groups'],
    fetchDashboardData,
    20_000
  );

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-orange-100 rounded-full" />
        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-8 h-8 text-orange-500 animate-pulse" />
        </div>
      </div>
      <p className="mt-8 text-orange-400 font-extrabold tracking-[0.3em] text-[10px] uppercase">Chargement de l'Elite Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-10 text-stone-900">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Manager Cockpit <span className="text-orange-500">.</span></h1>
          <p className="text-stone-500 text-sm font-medium">Vue stratégique du XL Elite Bootcamp.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`hidden md:flex px-3 py-2 rounded-xl border items-center gap-2 transition-all shadow-sm ${isLive ? 'bg-emerald-50 border-emerald-100' : 'bg-stone-50 border-stone-200'}`}>
             <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLive ? 'bg-emerald-500' : 'bg-orange-500'}`} />
             <span className={`text-[9px] font-extrabold uppercase tracking-widest ${isLive ? 'text-emerald-600' : 'text-stone-500'}`}>
               {isLive ? 'Live' : 'Connecting...'}
             </span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center gap-2">
            <Clock className="w-3 h-3 text-stone-400" />
            <span className="text-[9px] font-extrabold text-stone-500 uppercase tracking-widest">
              {lastUpdated.toLocaleTimeString()}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 rounded-xl border-stone-200 bg-white hover:bg-orange-500 hover:text-white transition-all gap-2 px-4 shadow-sm">
                <Download className="w-4 h-4" /> 
                <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest">Exporter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-stone-100 shadow-xl rounded-xl">
              <DropdownMenuItem onClick={() => handleExport('csv')} className="hover:bg-stone-50 cursor-pointer font-bold text-stone-700 text-xs">Rapport CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')} className="hover:bg-stone-50 cursor-pointer font-bold text-stone-700 text-xs">Rapport PDF (Prestige)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={() => fetchDashboardData()} className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm">
             <Activity className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white border border-stone-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] relative overflow-hidden group hover:shadow-sm transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-3xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700 opacity-50" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-amber-600 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                {kpi.icon}
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-extrabold ${kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-50 text-stone-500'}`}>
                {kpi.change} <ArrowUpRight className="w-2.5 h-2.5" />
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-[9px] font-extrabold text-stone-400 uppercase tracking-[0.2em] mb-1">{kpi.title}</p>
              <h3 className="text-3xl font-black tracking-tight text-stone-900">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* REVENUE PIPELINE */}
        <div className="lg:col-span-4 space-y-4">
           <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-600 to-amber-600 shadow-xl shadow-orange-500/10 relative overflow-hidden group h-full text-white">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md shadow-inner">
                      <BarChart3 className="w-4 h-4 text-white" />
                   </div>
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Santé Financière</h3>
                </div>

                <div className="space-y-8 flex-1">
                  <div>
                    <p className="text-orange-100 text-[9px] font-black uppercase tracking-widest mb-1 opacity-80">Encaissement Réel</p>
                    <h4 className="text-4xl font-black tracking-tighter">{revenueStats.actual.toLocaleString()} <span className="text-xl font-bold opacity-60">F</span></h4>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest text-orange-100">
                       <span>Progression Objectif</span>
                       <span>{((revenueStats.actual / revenueStats.projected) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-black/10 rounded-full overflow-hidden p-[2px]">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(revenueStats.actual / revenueStats.projected) * 100}%` }}
                        className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                       />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/20">
                    <p className="text-orange-100 text-[9px] font-black uppercase tracking-widest mb-1 opacity-80">Chiffre d'Affaires Projeté</p>
                    <h4 className="text-2xl font-extrabold text-white">{revenueStats.projected.toLocaleString()} <span className="text-sm opacity-60">F</span></h4>
                  </div>
                </div>

                <Link href="/admin/business" className="mt-8 w-full py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm">
                  Détails <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
           </div>
        </div>

        {/* SATURATION DES GROUPES */}
        <div className="lg:col-span-8">
          <div className="p-6 rounded-3xl bg-white border border-stone-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                     <Layers className="w-4 h-4 text-orange-500" />
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-[0.2em]">Groupes</h3>
               </div>
               <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest bg-stone-50 px-2 py-1 rounded-md border border-stone-100">Capacité Modulaire</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {groupStats.map((group, i) => (
                <div key={i} className="p-5 rounded-2xl bg-stone-50/50 border border-stone-100 hover:border-orange-200 hover:bg-white hover:shadow-sm transition-all duration-300 group">
                   <div className="flex justify-between items-start mb-6">
                      <h4 className="text-xl font-black tracking-tight text-stone-900">{group.name}</h4>
                      <div className={`text-[9px] font-extrabold px-2 py-1 rounded-md border ${group.fill_rate > 80 ? 'bg-red-50 border-red-100 text-red-600' : 'bg-orange-50 border-orange-100 text-orange-600'}`}>
                        {group.fill_rate.toFixed(0)}%
                      </div>
                   </div>

                   <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-2 text-stone-500">
                         <Clock className="w-3 h-3 text-stone-400" />
                         <span className="text-[10px] font-extrabold uppercase tracking-widest">{group.time_slot}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-extrabold text-stone-400 uppercase tracking-widest">
                           <span>Places</span>
                           <span className="text-stone-900">{group.current_capacity} / {group.max_capacity}</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                           <div 
                            className={`h-full transition-all duration-1000 rounded-full ${group.fill_rate > 80 ? 'bg-red-500' : 'bg-orange-500'}`} 
                            style={{ width: `${group.fill_rate}%` }} 
                           />
                        </div>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                      <div className="text-[9px] font-extrabold text-stone-400 uppercase tracking-widest">Récolté</div>
                      <div className="text-sm font-black text-stone-900">{(group.revenue / 1000).toLocaleString()}K</div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
