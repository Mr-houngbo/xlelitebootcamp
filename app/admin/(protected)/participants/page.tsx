'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Download, 
  Mail, 
  MoreHorizontal, 
  ChevronRight,
  User,
  MapPin,
  Laptop,
  Briefcase,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV, exportToPDF } from '@/lib/utils/export';
import { useRealtimeRefresh } from '@/lib/supabase/useRealtimeRefresh';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  profile_type?: string;
  source: string;
  message?: string;
  status: string;
  created_at: string;
  registrations?: Array<{
    id: string;
    payment_status: string;
    total_amount: number;
    registration_fee_paid: boolean;
    training_fee_paid: boolean;
    groups?: {
      name: string;
      time_slot: string;
    };
  }>;
}

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const fetchParticipants = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select(`
          *,
          registrations(
            *,
            groups(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParticipants(data as any[] || []);
      
      // Update selected participant if open
      if (selectedParticipant) {
        const updated = (data as any[] || []).find(p => p.id === selectedParticipant.id);
        if (updated) setSelectedParticipant(updated as Participant);
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedParticipant]);

  useRealtimeRefresh(['participants', 'registrations'], fetchParticipants, 20_000);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const togglePayment = async (registrationId: string, field: 'registration_fee_paid' | 'training_fee_paid', currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('registrations')
        // @ts-expect-error
        .update({ [field]: !currentValue })
        .eq('id', registrationId);

      if (error) throw error;
      await fetchParticipants();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const updateStatus = async (participantId: string, newStatus: string) => {
    try {
      const { error } = await (supabase.from('participants') as any)
        .update({ status: newStatus })
        .eq('id', participantId);

      if (error) throw error;
      await fetchParticipants();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const parseMetadata = (message?: string) => {
    if (!message) return { country: 'N/A', format: 'N/A', cleanMessage: '' };
    const countryMatch = message.match(/\[PAYS:\s*(.*?)\]/);
    const formatMatch = message.match(/\[FORMAT:\s*(.*?)\]/);
    const cleanMessage = message.replace(/\[PAYS:.*?\]\s*\[FORMAT:.*?\]/, '').trim();
    return {
      country: countryMatch ? countryMatch[1] : 'N/A',
      format: formatMatch ? formatMatch[1] : 'N/A',
      cleanMessage
    };
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = 
      participant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || participant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      lead: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      confirmed: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
      completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    };
    return (
      <Badge variant="outline" className={`${colors[status] || 'bg-slate-500/10'} font-black uppercase text-[9px] tracking-widest`}>
        {status}
      </Badge>
    );
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    const headers = ['Nom', 'Email', 'Pays', 'Format', 'Groupe', 'Status'];
    const rows = filteredParticipants.map(p => {
      const { country, format } = parseMetadata(p.message);
      return [
        `${p.first_name} ${p.last_name}`,
        p.email,
        country,
        format,
        p.registrations?.[0]?.groups?.name || 'N/A',
        p.status
      ];
    });

    if (type === 'csv') {
      exportToCSV('participants_xl_elite', headers, rows);
    } else {
      exportToPDF('participants_xl_elite', 'Liste des Participants', headers, rows);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96 text-orange-500/50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500" />
    </div>
  );

  return (
    <div className="space-y-10 relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Participants <span className="text-orange-500">.</span></h1>
          <p className="text-slate-500 font-medium italic">Gérez votre audience avec précision chirurgicale.</p>
        </div>
        <div className="flex gap-4">
           <Button onClick={fetchParticipants} variant="outline" className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 transition-all gap-2 px-6">
              <Clock className="w-4 h-4" /> Refresh
           </Button>
           
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 hover:bg-orange-500 hover:text-white transition-all gap-2 px-6">
                  <Download className="w-4 h-4" /> Exporter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-white/10 text-white rounded-xl">
                <DropdownMenuItem onClick={() => handleExport('csv')} className="hover:bg-white/5 cursor-pointer">Export CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')} className="hover:bg-white/5 cursor-pointer">Export PDF (Prestige)</DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" />
          <Input 
            placeholder="Rechercher par nom, email..." 
            className="pl-12 py-6 rounded-2xl bg-white/[0.03] border-white/10 focus:border-orange-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white/[0.03] border border-white/10 rounded-2xl px-4 text-sm font-bold text-slate-400 focus:outline-none focus:border-orange-500/50"
        >
          <option value="all">Tous les statuts</option>
          <option value="lead">Leads</option>
          <option value="confirmed">Confirmés</option>
          <option value="completed">Terminés</option>
        </select>
      </div>

      {/* Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden"
      >
        <Table>
          <TableHeader className="bg-white/[0.02]">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="py-6 px-8 text-slate-500 font-black uppercase text-[10px] tracking-widest">Inscrit</TableHead>
              <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Finance</TableHead>
              <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Groupe</TableHead>
              <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
              <TableHead className="text-right py-6 px-8 text-slate-500 font-black uppercase text-[10px] tracking-widest">Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((p) => {
              const reg = p.registrations?.[0];
              const { country, format } = parseMetadata(p.message);
              return (
                <TableRow key={p.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedParticipant(p)}>
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-black">
                        {p.first_name[0]}{p.last_name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{p.first_name} {p.last_name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{p.email} • <span className="text-orange-500/70">{country}</span></p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                       <div className={`w-3 h-3 rounded-full ${reg?.registration_fee_paid ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} title="Inscription" />
                       <div className={`w-3 h-3 rounded-full ${reg?.training_fee_paid ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-slate-700'}`} title="Formation" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                       <p className="text-xs font-bold text-slate-400">{reg?.groups?.name || 'N/A'}</p>
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{format}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(p.status)}
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-orange-500 transition-all inline" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>

      {/* Side Panel (Detail Drawer) */}
      <AnimatePresence>
        {selectedParticipant && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedParticipant(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-slate-900 border-l border-white/10 z-[101] shadow-2xl p-0 overflow-y-auto"
            >
               <div className="p-8 space-y-10">
                  {/* Panel Header */}
                  <div className="flex items-start justify-between">
                     <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-2xl font-black">
                           {selectedParticipant.first_name[0]}{selectedParticipant.last_name[0]}
                        </div>
                        <div>
                           <h2 className="text-2xl font-black tracking-tight">{selectedParticipant.first_name} {selectedParticipant.last_name}</h2>
                           <p className="text-orange-500 font-bold text-sm tracking-widest uppercase">{selectedParticipant.profile_type}</p>
                        </div>
                     </div>
                     <Button onClick={() => setSelectedParticipant(null)} variant="ghost" className="w-10 h-10 p-0 rounded-xl hover:bg-white/5"><XCircle className="w-6 h-6 text-slate-500" /></Button>
                  </div>

                  {/* Quick Actions Status */}
                  <div className="grid grid-cols-2 gap-4">
                     {['lead', 'confirmed', 'completed', 'cancelled'].map((st) => (
                       <Button 
                        key={st}
                        onClick={() => updateStatus(selectedParticipant.id, st)}
                        variant="ghost" 
                        className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 ${selectedParticipant.status === st ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-white/5 hover:bg-white/10 text-slate-400'}`}
                       >
                         {st}
                       </Button>
                     ))}
                  </div>

                  {/* Information Sections */}
                  <div className="space-y-8">
                     {/* Contact & Bio */}
                     <section className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <User className="w-3 h-3" /> Profil & Contact
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                           <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                              <p className="text-xs text-slate-500 mb-1">Email & Téléphone</p>
                              <p className="font-bold text-slate-200">{selectedParticipant.email}</p>
                              <p className="font-bold text-slate-200">{selectedParticipant.phone || 'N/A'}</p>
                           </div>
                           <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                              <p className="text-xs text-slate-500 mb-1">Entreprise & Poste</p>
                              <p className="font-bold text-slate-200">{selectedParticipant.company || 'Indépendant'} <span className="text-orange-500/50 mx-2">•</span> {selectedParticipant.position || 'N/A'}</p>
                           </div>
                           <div className="flex gap-3">
                              <div className="flex-1 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                 <p className="text-xs text-slate-500 mb-1">Pays</p>
                                 <p className="font-bold text-slate-200 flex items-center gap-2"><MapPin className="w-3 h-3 text-orange-500" /> {parseMetadata(selectedParticipant.message).country}</p>
                              </div>
                              <div className="flex-1 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                 <p className="text-xs text-slate-500 mb-1">Format</p>
                                 <p className="font-bold text-slate-200 flex items-center gap-2"><Laptop className="w-3 h-3 text-orange-500" /> {parseMetadata(selectedParticipant.message).format}</p>
                              </div>
                           </div>
                        </div>
                     </section>

                     {/* Financial Management */}
                     <section className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <DollarSign className="w-3 h-3" /> État Financier
                        </h4>
                        <div className="space-y-3">
                           {[
                             { label: 'Frais d\'inscription (25.000 F)', field: 'registration_fee_paid' as const },
                             { label: 'Frais de formation (125.000 F)', field: 'training_fee_paid' as const }
                           ].map((item) => {
                             const reg = selectedParticipant.registrations?.[0];
                             const isPaid = reg ? reg[item.field] : false;
                             return (
                               <div key={item.field} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                                  <span className="text-sm font-bold text-slate-300">{item.label}</span>
                                  <Button 
                                    onClick={() => reg && togglePayment(reg.id, item.field, isPaid)}
                                    className={`h-10 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 ${isPaid ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'}`}
                                  >
                                     {isPaid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                     {isPaid ? 'Payé' : 'En attente'}
                                  </Button>
                               </div>
                             );
                           })}
                        </div>
                     </section>

                     {/* Program details */}
                     <section className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <Briefcase className="w-3 h-3" /> Programme
                        </h4>
                        <div className="p-6 rounded-[2rem] bg-orange-600/5 border border-orange-500/20">
                           <div className="flex items-center gap-4 mb-4">
                              <Calendar className="w-5 h-5 text-orange-500" />
                              <div>
                                 <p className="text-lg font-black text-slate-100">{selectedParticipant.registrations?.[0]?.groups?.name || 'Groupe non assigné'}</p>
                                 <p className="text-xs font-bold text-orange-500">{selectedParticipant.registrations?.[0]?.groups?.time_slot || 'Créneau non défini'}</p>
                              </div>
                           </div>
                           <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-6 border-t border-white/5 pt-4">
                              Origine : {selectedParticipant.source}
                           </div>
                        </div>
                     </section>

                     {/* Message */}
                     {parseMetadata(selectedParticipant.message).cleanMessage && (
                       <section className="space-y-4">
                          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                             <MessageSquare className="w-3 h-3" /> Note du Participant
                          </h4>
                          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-sm text-slate-400 italic leading-relaxed">
                             "{parseMetadata(selectedParticipant.message).cleanMessage}"
                          </div>
                       </section>
                     )}
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
