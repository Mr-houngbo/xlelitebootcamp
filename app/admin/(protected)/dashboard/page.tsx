'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  BarChart3,
  Activity,
  Zap,
  Hexagon
} from 'lucide-react';

interface KPICard {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description: string;
}

interface GroupStats {
  name: string;
  time_slot: string;
  fill_rate: number;
  current_capacity: number;
  max_capacity: number;
  revenue: number;
}

interface DailyStats {
  date: string;
  registrations: number;
  confirmations: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [kpiData, setKpiData] = useState<KPICard[]>([
    {
      title: 'Total Inscrits',
      value: 0,
      change: 0,
      icon: <Users className="w-5 h-5 text-brand-orange" />,
      description: 'Toutes sessions confondues',
    },
    {
      title: 'Revenus Totaux',
      value: '0 FCFA',
      change: 0,
      icon: <DollarSign className="w-5 h-5 text-brand-orange" />,
      description: 'Somme des paiements confirmés',
    },
    {
      title: 'Taux Conversion',
      value: '0%',
      change: 0,
      icon: <TrendingUp className="w-5 h-5 text-brand-orange" />,
      description: 'Visiteurs → Inscrits',
    },
    {
      title: 'Inscriptions Jour',
      value: 0,
      change: 0,
      icon: <Calendar className="w-5 h-5 text-brand-orange" />,
      description: "Nouvelles inscriptions aujourd'hui",
    }
  ]);

  const [groupStats, setGroupStats] = useState<GroupStats[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: participants } = await supabase
        .from('participants')
        .select('*');

      const { data: groups } = await supabase
        .from('groups')
        .select(`
          *,
          registrations(
            id,
            payment_status,
            total_amount
          )
        `);

      const totalParticipants = participants?.length || 0;
      const paidRegistrations = groups?.flatMap(g => g.registrations ?? [])
        .filter(r => r.payment_status === 'paid');
      const totalRevenue = paidRegistrations?.reduce((sum, r) => sum + r.total_amount, 0) || 0;
      
      const today = new Date().toISOString().split('T')[0];
      const todayRegistrations = participants?.filter(p => 
        p.created_at.startsWith(today)
      ).length || 0;

      setKpiData([
        {
          title: 'Total Inscrits',
          value: totalParticipants,
          change: 12,
          icon: <Users className="w-5 h-5 text-brand-orange" />,
          description: 'Toutes sessions confondues',
        },
        {
          title: 'Revenus Totaux',
          value: `${(totalRevenue / 1000000).toFixed(1)}M FCFA`,
          change: 15,
          icon: <DollarSign className="w-5 h-5 text-brand-orange" />,
          description: 'Somme des paiements confirmés',
        },
        {
          title: 'Taux Conversion',
          value: '68%',
          change: 5,
          icon: <TrendingUp className="w-5 h-5 text-brand-orange" />,
          description: 'Visiteurs → Inscrits',
        },
        {
          title: 'Inscriptions Jour',
          value: todayRegistrations,
          change: 8,
          icon: <Calendar className="w-5 h-5 text-brand-orange" />,
          description: "Nouvelles inscriptions aujourd'hui",
        }
      ]);

      if (groups) {
        const groupStatsData: GroupStats[] = groups.map(group => {
          const fillRate = group.max_capacity > 0 
            ? (group.current_capacity / group.max_capacity) * 100 
            : 0;
          
          const groupRevenue = group.registrations
            .filter(r => r.payment_status === 'paid')
            .reduce((sum, r) => sum + r.total_amount, 0);

          return {
            name: group.name,
            time_slot: group.time_slot,
            fill_rate: fillRate,
            current_capacity: group.current_capacity,
            max_capacity: group.max_capacity,
            revenue: groupRevenue
          };
        });
        setGroupStats(groupStatsData);
      }

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      const dailyStatsData: DailyStats[] = last7Days.map(date => {
        const dayParticipants = participants?.filter(p => 
          p.created_at.startsWith(date)
        ) || [];
        
        return {
          date,
          registrations: dayParticipants.length,
          confirmations: dayParticipants.filter(p => p.status === 'confirmed').length,
          revenue: 0
        };
      });
      setDailyStats(dailyStatsData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFillRateColor = (rate: number) => {
    if (rate >= 80) return 'text-brand-orange bg-brand-orange/10 border-brand-orange/20';
    if (rate >= 60) return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-red-500 bg-red-50 border-red-200';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Hexagon className="absolute inset-0 w-full h-full text-brand-orange/20 stroke-[1]" />
          <Hexagon className="absolute inset-0 w-full h-full text-brand-orange stroke-[2] animate-[spin_3s_linear_infinite]" />
          <Zap className="w-6 h-6 text-brand-orange animate-pulse" />
        </div>
        <p className="text-gray-400 mt-6 font-bold tracking-widest text-xs uppercase">Initialisation Data Core...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* KPI Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            {/* Hover Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500 ease-out"></div>
            
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/5 border border-brand-orange/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {kpi.icon}
              </div>
              {kpi.change !== undefined && (
                <div className="flex items-center text-xs font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{kpi.change}%
                </div>
              )}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{kpi.title}</h3>
              <div className="text-4xl font-black text-gray-900 tracking-tighter mb-2">{kpi.value}</div>
              <p className="text-xs font-medium text-gray-500">{kpi.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Group Fill Rates - Main Analytical View */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-gray-500" />
              </div>
              Analyse des Flux (Capacité)
            </h2>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-orange/[0.02] rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {groupStats.map((group, index) => (
                <div key={index} className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100/50 hover:bg-white hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300 group">
                  
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="font-black text-2xl text-gray-900 tracking-tight mb-1">{group.name}</h3>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-gray-100 text-xs font-bold text-gray-500">
                        <Calendar className="w-3 h-3 text-brand-orange" />
                        {group.time_slot}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-xl text-xs font-black border ${getFillRateColor(group.fill_rate)} shadow-sm`}>
                      {group.fill_rate.toFixed(1)}%
                    </div>
                  </div>
                  
                  {/* Custom Futuristic Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      <span>Saturation</span>
                      <span className="text-gray-900">{group.current_capacity} / {group.max_capacity}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-orange to-orange-400 rounded-full relative"
                        style={{ width: `${group.fill_rate}%` }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-100 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Valeur Générée</p>
                      <p className="font-black text-gray-900 text-lg">
                        {(group.revenue / 1000000).toFixed(1)}
                        <span className="text-xs text-gray-500 ml-1 font-semibold uppercase">M FCFA</span>
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors duration-300">
                      <Zap className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-orange transition-colors" />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Evolution - Log Stream Style */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-gray-500" />
              </div>
              Chronologie
            </h2>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] h-[calc(100%-3rem)] flex flex-col">
            <div className="flex-1 space-y-4">
              {dailyStats.map((day, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100/50 hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 group">
                  {/* Date Badge */}
                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center shrink-0 group-hover:border-brand-orange/30 transition-colors">
                    <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider">
                      {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                    </span>
                    <span className="text-xl font-black text-gray-900 leading-none mt-0.5">
                      {new Date(day.date).getDate()}
                    </span>
                  </div>
                  
                  {/* Metrics */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Inscrits / Confirmés</span>
                      <span className="text-xs font-black text-gray-900">
                        {day.registrations} <span className="text-gray-300 mx-1">|</span> <span className="text-brand-orange">{day.confirmations}</span>
                      </span>
                    </div>
                    {/* Tiny Progress Bar for ratio */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full bg-brand-orange rounded-full" 
                        style={{ width: `${day.registrations > 0 ? (day.confirmations / day.registrations) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Mise à jour en direct</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                Live
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
