'use client';

import { useState, useEffect, useCallback } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  useRealtimeRefresh(
    ['participants', 'registrations', 'groups'],
    fetchDashboardData,
    20_000
  );

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-slate-950">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-8 h-8 text-orange-500 animate-pulse" />
        </div>
      </div>
      <p className="mt-8 text-orange-500/60 font-black tracking-[0.3em] text-[10px] uppercase">Chargement de l'Elite Intelligence...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white space-y-10 pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Manager Cockpit <span className="text-orange-500">.</span></h1>
          <p className="text-slate-500 font-medium">Vue stratégique en temps réel du XL Elite Bootcamp.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-2xl border flex items-center gap-3 transition-all ${isLive ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/10'}`}>
             <div className={`w-2 h-2 rounded-full animate-pulse ${isLive ? 'bg-emerald-400' : 'bg-orange-500'}`} />
             <span className={`text-[10px] font-black uppercase tracking-widest ${isLive ? 'text-emerald-400' : 'text-slate-400'}`}>
               {isLive ? 'Live Realtime' : 'Connecting...'}
             </span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Clock className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          <button onClick={() => fetchDashboardData()} className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20">
             <Activity className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:bg-white/[0.05] transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                {kpi.icon}
              </div>
              <ArrowUpRight className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-orange-400' : 'text-slate-600'}`} />
            </div>
            
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{kpi.title}</p>
              <h3 className="text-4xl font-black tracking-tight mb-2">{kpi.value}</h3>
              <p className="text-[10px] font-bold text-orange-500/60 uppercase tracking-widest">{kpi.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* REVENUE PIPELINE */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-600 to-orange-900 shadow-2xl relative overflow-hidden group h-full">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                   <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                      <BarChart3 className="w-5 h-5 text-white" />
                   </div>
                   <h3 className="text-sm font-black uppercase tracking-[0.2em]">Santé Financière</h3>
                </div>

                <div className="space-y-8 flex-1">
                  <div>
                    <p className="text-orange-100/60 text-[10px] font-black uppercase tracking-widest mb-1">Encaissement Réel</p>
                    <h4 className="text-4xl font-black">{revenueStats.actual.toLocaleString()} <span className="text-lg opacity-50 font-medium">F</span></h4>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-orange-100/80">
                       <span>Progression Objectif</span>
                       <span>{((revenueStats.actual / revenueStats.projected) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/10">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(revenueStats.actual / revenueStats.projected) * 100}%` }}
                        className="h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" 
                       />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <p className="text-orange-100/60 text-[10px] font-black uppercase tracking-widest mb-1">Chiffre d'Affaires Projeté</p>
                    <h4 className="text-2xl font-black text-white/90">{revenueStats.projected.toLocaleString()} <span className="text-sm opacity-50 font-medium">F</span></h4>
                  </div>
                </div>

                <button className="mt-10 w-full py-4 bg-black/20 hover:bg-black/30 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2">
                  Détails Business <ArrowRight className="w-3 h-3" />
                </button>
              </div>
           </div>
        </div>

        {/* SATURATION DES GROUPES */}
        <div className="lg:col-span-8">
          <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 h-full">
            <div className="flex items-center justify-between mb-12">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                     <Layers className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em]">Saturation des Groupes</h3>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Capacité : 15 / groupe</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {groupStats.map((group, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <h4 className="text-xl font-black tracking-tight">{group.name}</h4>
                      <div className={`text-[9px] font-black px-2 py-1 rounded-lg border ${group.fill_rate > 80 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-orange-500/10 border-orange-500/20 text-orange-500'}`}>
                        {group.fill_rate.toFixed(0)}%
                      </div>
                   </div>

                   <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-2 text-slate-400">
                         <Clock className="w-3.5 h-3.5" />
                         <span className="text-[11px] font-bold">{group.time_slot}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                           <span>Places</span>
                           <span className="text-white">{group.current_capacity} / {group.max_capacity}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div 
                            className={`h-full transition-all duration-1000 ${group.fill_rate > 80 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'}`} 
                            style={{ width: `${group.fill_rate}%` }} 
                           />
                        </div>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Récolté</div>
                      <div className="text-sm font-black text-orange-400">{(group.revenue / 1000).toLocaleString()}K</div>
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
