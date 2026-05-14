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
    registration_fee_amount: number;
    training_fee_amount: number;
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
      setSelectedParticipant(current => {
        if (!current) return current;
        const updated = (data as any[] || []).find(p => p.id === current.id);
        return updated ? (updated as Participant) : current;
      });
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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
      lead: 'bg-stone-100 text-stone-500 border-stone-200',
      confirmed: 'bg-orange-50 text-orange-600 border-orange-100',
      cancelled: 'bg-red-50 text-red-600 border-red-100',
      completed: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    };
    return (
      <Badge variant="outline" className={`${colors[status] || 'bg-stone-50 text-stone-400'} font-black uppercase text-[9px] tracking-widest`}>
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
    <div className="space-y-6 relative min-h-screen text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Participants <span className="text-orange-500">.</span></h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm font-medium">Gérez votre audience avec précision.</p>
        </div>
        <div className="flex gap-3">
           <Button onClick={fetchParticipants} variant="outline" className="rounded-xl border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-all gap-2 px-5 shadow-sm">
              <Clock className="w-4 h-4" /> Refresh
           </Button>
           
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-orange-500 dark:hover:bg-orange-600 hover:text-white transition-all gap-2 px-5 shadow-sm text-stone-900 dark:text-stone-100">
                  <Download className="w-4 h-4" /> Exporter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 shadow-xl rounded-xl">
                <DropdownMenuItem onClick={() => handleExport('csv')} className="hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer font-bold text-stone-700 dark:text-stone-300">Export CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')} className="hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer font-bold text-stone-700 dark:text-stone-300">Export PDF</DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-3 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-hover:text-orange-500 transition-colors" />
          <Input 
            placeholder="Rechercher par nom, email..." 
            className="pl-11 py-5 rounded-xl bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 focus:border-orange-500 dark:focus:border-orange-500 shadow-sm transition-all font-bold text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 text-sm font-bold text-stone-600 dark:text-stone-300 shadow-sm focus:outline-none focus:border-orange-500 transition-all"
        >
          <option value="all">Tous les statuts</option>
          <option value="lead">Leads</option>
          <option value="confirmed">Confirmés</option>
          <option value="completed">Terminés</option>
        </select>
      </div>

      {/* Table */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden"
      >
        <Table>
          <TableHeader className="bg-stone-50/50 dark:bg-stone-950/50">
            <TableRow className="border-stone-100 dark:border-stone-800 hover:bg-transparent">
              <TableHead className="py-4 px-6 text-stone-400 dark:text-stone-500 font-black uppercase text-[9px] tracking-widest">Inscrit</TableHead>
              <TableHead className="text-stone-400 dark:text-stone-500 font-black uppercase text-[9px] tracking-widest">Finance</TableHead>
              <TableHead className="text-stone-400 dark:text-stone-500 font-black uppercase text-[9px] tracking-widest">Groupe</TableHead>
              <TableHead className="text-stone-400 dark:text-stone-500 font-black uppercase text-[9px] tracking-widest">Status</TableHead>
              <TableHead className="text-right py-4 px-6 text-stone-400 dark:text-stone-500 font-black uppercase text-[9px] tracking-widest">Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((p) => {
              const reg = p.registrations?.[0];
              const { country, format } = parseMetadata(p.message);
              return (
                <TableRow key={p.id} className="border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group cursor-pointer" onClick={() => setSelectedParticipant(p)}>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 font-black border border-orange-100 dark:border-orange-500/20">
                        {p.first_name[0]}{p.last_name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 dark:text-stone-100">{p.first_name} {p.last_name}</p>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">{p.email} • <span className="text-orange-500/70">{country}</span></p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                         <div className={`w-2 h-2 rounded-full ${reg?.registration_fee_paid ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'bg-stone-300 dark:bg-stone-700'}`} title="Inscription" />
                         <div className={`w-2 h-2 rounded-full ${reg?.training_fee_paid ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.2)]' : 'bg-stone-300 dark:bg-stone-700'}`} title="Formation" />
                      </div>
                      <span className="text-[10px] font-bold text-stone-600 dark:text-stone-400">
                        {((reg?.registration_fee_paid ? Number(reg.registration_fee_amount) : 0) + (reg?.training_fee_paid ? Number(reg.training_fee_amount) : 0)).toLocaleString()} F
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                       <p className="text-xs font-bold text-stone-700 dark:text-stone-300">{reg?.groups?.name || 'N/A'}</p>
                       <p className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">{format}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(p.status)}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-orange-500 transition-all inline" />
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
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 z-[101] shadow-2xl p-0 overflow-y-auto transition-colors duration-300"
            >
               <div className="p-8 space-y-8">
                  {/* Panel Header */}
                  <div className="flex items-start justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-500/20">
                           {selectedParticipant.first_name[0]}{selectedParticipant.last_name[0]}
                        </div>
                        <div>
                           <h2 className="text-xl font-black tracking-tight text-stone-900 dark:text-stone-100">{selectedParticipant.first_name} {selectedParticipant.last_name}</h2>
                           <p className="text-orange-600 dark:text-orange-500 font-bold text-xs tracking-widest uppercase">{selectedParticipant.profile_type}</p>
                        </div>
                     </div>
                     <Button onClick={() => setSelectedParticipant(null)} variant="ghost" className="w-10 h-10 p-0 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"><XCircle className="w-5 h-5 text-stone-400 dark:text-stone-500" /></Button>
                  </div>

                  {/* Quick Actions Status */}
                  <div className="grid grid-cols-2 gap-3">
                     {['lead', 'confirmed', 'completed', 'cancelled'].map((st) => (
                       <Button 
                        key={st}
                        onClick={() => updateStatus(selectedParticipant.id, st)}
                        variant="ghost" 
                        className={`h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 ${
                          selectedParticipant.status === st 
                            ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' 
                            : 'bg-white dark:bg-stone-950 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-800'
                        }`}
                       >
                         {st}
                       </Button>
                     ))}
                  </div>

                  {/* Information Sections */}
                  <div className="space-y-6">
                     {/* Contact & Bio */}
                     <section className="space-y-3">
                        <h4 className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <User className="w-3 h-3" /> Profil & Contact
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                           <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50 transition-colors">
                              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Email & Téléphone</p>
                              <p className="font-bold text-stone-900 dark:text-stone-100 break-all">{selectedParticipant.email}</p>
                              <p className="font-bold text-stone-900 dark:text-stone-100 mt-0.5">{selectedParticipant.phone || 'N/A'}</p>
                           </div>
                           <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50 transition-colors">
                              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Entreprise & Poste</p>
                              <p className="font-bold text-stone-900 dark:text-stone-100">{selectedParticipant.company || 'Indépendant'} <span className="text-orange-500/30 mx-2">•</span> {selectedParticipant.position || 'N/A'}</p>
                           </div>
                           <div className="flex gap-2">
                              <div className="flex-1 p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50 transition-colors">
                                 <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Pays</p>
                                 <p className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2"><MapPin className="w-3 h-3 text-orange-500" /> {parseMetadata(selectedParticipant.message).country}</p>
                              </div>
                              <div className="flex-1 p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50 transition-colors">
                                 <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Format</p>
                                 <p className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2"><Laptop className="w-3 h-3 text-orange-500" /> {parseMetadata(selectedParticipant.message).format}</p>
                              </div>
                           </div>
                        </div>
                     </section>

                     {/* Financial Management */}
                     <section className="space-y-3">
                        <h4 className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <DollarSign className="w-3 h-3" /> État Financier
                        </h4>
                        <div className="space-y-2">
                           {[
                             { label: 'Frais d\'inscription (30.000 F)', field: 'registration_fee_paid' as const },
                             { label: 'Frais de formation (125.000 F)', field: 'training_fee_paid' as const }
                           ].map((item) => {
                             const reg = selectedParticipant.registrations?.[0];
                             const isPaid = reg ? reg[item.field] : false;
                             return (
                               <div key={item.field} className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50 transition-colors">
                                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{item.label}</span>
                                  <Button 
                                    onClick={() => reg && togglePayment(reg.id, item.field, isPaid)}
                                    className={`h-9 rounded-lg font-black text-[9px] uppercase tracking-widest gap-2 transition-all ${
                                      isPaid 
                                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30' 
                                        : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                                    }`}
                                  >
                                     {isPaid ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                     {isPaid ? 'Payé' : 'En attente'}
                                  </Button>
                               </div>
                             );
                           })}
                        </div>
                     </section>

                     {/* Program details */}
                     <section className="space-y-3">
                        <h4 className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <Briefcase className="w-3 h-3" /> Programme
                        </h4>
                        <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 transition-colors">
                           <div className="flex items-center gap-3 mb-3">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <div>
                                 <p className="text-base font-black text-stone-900 dark:text-stone-100">{selectedParticipant.registrations?.[0]?.groups?.name || 'Groupe non assigné'}</p>
                                 <p className="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest">{selectedParticipant.registrations?.[0]?.groups?.time_slot || 'Créneau non défini'}</p>
                              </div>
                           </div>
                           <div className="text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-widest mt-4 border-t border-orange-200/50 dark:border-orange-500/20 pt-3">
                              Origine : {selectedParticipant.source}
                           </div>
                        </div>
                     </section>

                     {/* Message */}
                     {parseMetadata(selectedParticipant.message).cleanMessage && (
                       <section className="space-y-3">
                          <h4 className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                             <MessageSquare className="w-3 h-3" /> Note du Participant
                          </h4>
                          <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50 text-sm text-stone-600 dark:text-stone-400 italic leading-relaxed transition-colors">
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
