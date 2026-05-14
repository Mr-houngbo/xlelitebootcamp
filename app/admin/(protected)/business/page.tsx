'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Users, 
  Settings,
  Edit,
  Check,
  TrendingUp,
  Target
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { exportToCSV, exportToPDF } from '@/lib/utils/export';
import { useRealtimeRefresh } from '@/lib/supabase/useRealtimeRefresh';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Group {
  id: string;
  name: string;
  time_slot: string;
  max_capacity: number;
  current_capacity: number;
  is_active: boolean;
  created_at: string;
  registrations?: Array<{
    payment_status: string;
    total_amount: number;
    registration_fee_paid: boolean;
    training_fee_paid: boolean;
    registration_fee_amount: number;
    training_fee_amount: number;
  }>;
}

interface EditState {
  groupId: string;
  field: 'max_capacity' | 'current_capacity';
  value: string;
}

export default function BusinessPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState<EditState | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          registrations(
            payment_status,
            total_amount,
            registration_fee_paid,
            training_fee_paid,
            registration_fee_amount,
            training_fee_amount
          )
        `)
        .order('name');

      if (error) throw error;
      
      const processedGroups = (data as any[] || []).map(g => ({
        ...g,
        current_capacity: g.registrations 
          ? g.registrations.filter((r: any) => r.payment_status === 'paid').length 
          : 0
      }));
      setGroups(processedGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useRealtimeRefresh(['groups', 'registrations'], fetchGroups, 20_000);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const startEditing = (groupId: string, field: 'max_capacity', currentValue: number) => {
    setEditState({ groupId, field, value: String(currentValue) });
  };

  const confirmEdit = async () => {
    if (!editState) return;
    const parsed = parseInt(editState.value, 10);
    if (isNaN(parsed) || parsed < 0) {
      setEditState(null);
      return;
    }
    try {
      const updatePayload = editState.field === 'max_capacity' 
        ? { max_capacity: parsed } 
        : { current_capacity: parsed };

      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: 'groups',
          filter: { col: 'id', val: editState.groupId },
          payload: updatePayload
        })
      });
      
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      
      await fetchGroups();
    } catch (error) {
      console.error('Error updating group:', error);
      alert('Erreur lors de la modification. Veuillez réessayer.');
    } finally {
      setEditState(null);
    }
  };

  const generatePresenceSheet = async (groupId: string) => {
    try {
      const { data: participants } = await supabase
        .from('registrations')
        .select(`
          participants!inner(first_name, last_name, email, phone, company)
        `)
        .eq('group_id', groupId);

      if (participants) {
        const csvContent = [
          ['Nom', 'Prénom', 'Email', 'Téléphone', 'Entreprise', 'Signature'],
          ...participants.map((reg: any) => [
            reg.participants.last_name, reg.participants.first_name, reg.participants.email, reg.participants.phone || '', reg.participants.company || '', ''
          ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `feuille_presence.csv`;
        link.click();
      }
    } catch (error) {
      console.error('Error generating presence sheet:', error);
    }
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    const headers = ['Groupe', 'Créneau', 'Max', 'Occupé', 'Saturation', 'Revenus'];
    const rows = groups.map(group => {
      const fillRate = (group.current_capacity / group.max_capacity) * 100;
      const revenue = group.registrations?.filter(r => r.payment_status === 'paid').reduce((sum, r) => sum + r.total_amount, 0) || 0;
      return [
        group.name,
        group.time_slot,
        group.max_capacity,
        group.current_capacity,
        `${fillRate.toFixed(1)}%`,
        `${revenue} F`
      ];
    });

    if (type === 'csv') {
      exportToCSV('business_xl_elite', headers, rows);
    } else {
      exportToPDF('business_xl_elite', 'Rapport de Saturation Groupes', headers, rows);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96 text-orange-500/50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500" />
    </div>
  );

  return (
    <div className="space-y-6 pb-12 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Business Operations <span className="text-orange-500">.</span></h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm font-medium">Optimisation des capacités et revenus.</p>
        </div>
        
        <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="outline" className="rounded-xl border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-orange-500 dark:hover:bg-orange-600 hover:text-white transition-all gap-2 px-5 shadow-sm text-stone-900 dark:text-stone-100">
               <Download className="w-4 h-4" /> Export Global
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 shadow-xl rounded-xl">
             <DropdownMenuItem onClick={() => handleExport('csv')} className="hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer font-bold text-stone-700 dark:text-stone-300">Export CSV</DropdownMenuItem>
             <DropdownMenuItem onClick={() => handleExport('pdf')} className="hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer font-bold text-stone-700 dark:text-stone-300">Export PDF (Rapport)</DropdownMenuItem>
           </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Global Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Total Places', value: groups.reduce((s, g) => s + g.max_capacity, 0), icon: <Target className="w-4 h-4 text-orange-600 dark:text-orange-500" /> },
          { title: 'Places Remplies', value: groups.reduce((s, g) => s + g.current_capacity, 0), icon: <Users className="w-4 h-4 text-orange-600 dark:text-orange-500" /> },
          { title: 'Taux Moyen', value: `${groups.length > 0 ? (groups.reduce((s, g) => s + (g.current_capacity/g.max_capacity*100), 0) / groups.length).toFixed(1) : 0}%`, icon: <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-500" /> },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 dark:bg-orange-500/5 blur-2xl -mr-6 -mt-6" />
             <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">{stat.title}</span>
             </div>
             <p className="text-3xl font-black text-stone-900 dark:text-stone-100">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Groups Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {groups.map((group, i) => {
          const fillRate = (group.current_capacity / group.max_capacity) * 100;
          return (
            <motion.div 
              key={group.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all relative group shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-xl font-black tracking-tight text-stone-900 dark:text-stone-100 mb-1">{group.name}</h3>
                   <p className="text-[9px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-widest">{group.time_slot}</p>
                </div>
                <Button onClick={() => generatePresenceSheet(group.id)} variant="ghost" className="rounded-lg bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 text-[9px] font-black uppercase tracking-widest gap-2 h-8">
                   <FileText className="w-3 h-3 text-orange-500" /> Feuille
                </Button>
              </div>

              <div className="flex justify-between items-center mb-6">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Capacité Max</p>
                    <div className="flex items-center gap-2">
                       {editState?.groupId === group.id && editState.field === 'max_capacity' ? (
                          <div className="flex gap-2">
                             <Input 
                              type="number" 
                              className="w-16 h-8 bg-white border-orange-200 text-xs font-bold shadow-sm" 
                              value={editState.value}
                              onChange={(e) => setEditState({...editState, value: e.target.value})}
                              autoFocus
                             />
                             <Button onClick={confirmEdit} className="w-8 h-8 p-0 bg-orange-500 rounded-lg shadow-sm"><Check className="w-4 h-4 text-white"/></Button>
                          </div>
                       ) : (
                          <>
                            <span className="text-2xl font-black text-stone-900">{group.max_capacity}</span>
                            <Button onClick={() => startEditing(group.id, 'max_capacity', group.max_capacity)} variant="ghost" className="w-6 h-6 p-0 text-stone-400 hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                               <Edit className="w-3.5 h-3.5" />
                            </Button>
                          </>
                       )}
                    </div>
                 </div>
              </div>

              <div className="space-y-2 mb-6">
                 <div className="flex justify-between items-end">
                    <span className="text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-widest">Saturation ({group.current_capacity} occupés)</span>
                    <span className="text-xs font-black text-orange-600 dark:text-orange-500">{fillRate.toFixed(1)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${fillRate}%` }} 
                    />
                 </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center">
                <div>
                  <p className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Récolté</p>
                  <p className="text-sm font-black text-stone-900 dark:text-stone-100">
                    {(group.registrations?.filter(r => r.payment_status === 'paid').reduce((sum, r) => sum + r.total_amount, 0) || 0).toLocaleString()} F
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">En attente</p>
                  <p className="text-sm font-black text-orange-500">
                    {((group.registrations?.length || 0) * 155000 - (group.registrations?.filter(r => r.payment_status === 'paid').reduce((sum, r) => sum + r.total_amount, 0) || 0)).toLocaleString()} F
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
