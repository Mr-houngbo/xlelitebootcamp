'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Video, 
  FileText, 
  Linkedin, 
  Trash2, 
  Edit2, 
  Star,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Testimonial } from '@/types/database';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { exportToCSV, exportToPDF } from '@/lib/utils/export';
import { useRealtimeRefresh } from '@/lib/supabase/useRealtimeRefresh';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      const { data, error } = await (supabase.from('testimonials') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useRealtimeRefresh(['testimonials'], fetchTestimonials, 30_000);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.participant_name || !editingItem?.testimonial) return;

    try {
      const payload = {
        ...editingItem,
        type: editingItem.type || 'text',
        rating: editingItem.rating || 5,
        is_active: editingItem.is_active ?? true,
        is_featured: editingItem.is_featured ?? false,
      };

      let error;
      if (editingItem.id) {
        const { error: err } = await (supabase.from('testimonials') as any)
          .update(payload)
          .eq('id', editingItem.id);
        error = err;
      } else {
        const { error: err } = await (supabase.from('testimonials') as any)
          .insert([payload]);
        error = err;
      }

      if (error) throw error;
      setIsDialogOpen(false);
      setEditingItem(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    try {
      const { error } = await (supabase.from('testimonials') as any)
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const filtered = testimonials.filter(t => 
    t.participant_name.toLowerCase().includes(search.toLowerCase()) ||
    t.company?.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = (type: 'csv' | 'pdf') => {
    const headers = ['Auteur', 'Entreprise', 'Poste', 'Note', 'Type', 'Statut'];
    const rows = testimonials.map(t => [
      t.participant_name,
      t.company || 'N/A',
      t.position || 'N/A',
      `${t.rating}/5`,
      t.type,
      t.is_active ? 'Actif' : 'Inactif'
    ]);

    if (type === 'csv') {
      exportToCSV('testimonials_xl_elite', headers, rows);
    } else {
      exportToPDF('testimonials_xl_elite', 'Rapport de Preuve Sociale', headers, rows);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96 text-orange-500/50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500" />
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Social Proof <span className="text-orange-500">.</span></h1>
          <p className="text-slate-500 font-medium italic">Gérez l'influence et la crédibilité du bootcamp.</p>
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 transition-all gap-2 px-6">
                <Download className="w-4 h-4" /> Exporter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-900 border-white/10 text-white rounded-xl">
              <DropdownMenuItem onClick={() => handleExport('csv')} className="hover:bg-white/5 cursor-pointer">Export CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')} className="hover:bg-white/5 cursor-pointer">Export PDF (Rapport)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem({ type: 'text', rating: 5 })} className="rounded-2xl bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/20 gap-2 px-6">
                <Plus className="w-4 h-4" /> Nouveau Témoignage
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-slate-900 border-white/10 text-white rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight">{editingItem?.id ? 'Édition Témoignage' : 'Nouveau Témoignage'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-6 pt-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nom Complet</label>
                    <Input className="bg-white/5 border-white/10 rounded-xl" value={editingItem?.participant_name || ''} onChange={e => setEditingItem({...editingItem, participant_name: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Type Content</label>
                    <Select value={editingItem?.type || 'text'} onValueChange={v => setEditingItem({...editingItem, type: v as any})}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        <SelectItem value="text">Texte</SelectItem>
                        <SelectItem value="video">Vidéo</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Le Témoignage</label>
                  <Textarea className="bg-white/5 border-white/10 rounded-xl h-32" value={editingItem?.testimonial || ''} onChange={e => setEditingItem({...editingItem, testimonial: e.target.value})} />
               </div>
               <Button type="submit" className="w-full h-14 bg-orange-600 hover:bg-orange-500 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-600/20">
                 Enregistrer l'Impact
               </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: testimonials.length, icon: <FileText className="w-4 h-4" /> },
          { label: 'Vidéos', value: testimonials.filter(t => t.type === 'video').length, icon: <Video className="w-4 h-4" /> },
          { label: 'Featured', value: testimonials.filter(t => t.is_featured).length, icon: <Star className="w-4 h-4" /> },
          { label: 'Actifs', value: testimonials.filter(t => t.is_active).length, icon: <CheckCircle2 className="w-4 h-4" /> },
        ].map((s, i) => (
          <div key={i} className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
             <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">{s.icon}</div>
             <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className="text-xl font-black">{s.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
         <div className="relative group mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" />
            <Input 
              placeholder="Rechercher une preuve sociale..." 
              className="pl-12 py-6 rounded-2xl bg-white/[0.03] border-white/10 focus:border-orange-500/50 transition-all"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all relative group flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                   <img 
                    src={t.participant_photo || `https://api.dicebear.com/7.x/initials/svg?seed=${t.participant_name}`} 
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                   />
                   <div>
                      <h3 className="font-bold text-slate-200">{t.participant_name}</h3>
                      <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{t.company}</p>
                   </div>
                </div>
                
                <p className="text-sm text-slate-400 italic flex-1 mb-6 leading-relaxed">"{t.testimonial}"</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                   <div className="flex gap-2">
                      {t.type === 'video' && <Badge className="bg-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.4)]"><Video className="w-3 h-3 mr-1" /> Vidéo</Badge>}
                      {t.is_featured && <Badge variant="outline" className="text-orange-500 border-orange-500/20">Elite</Badge>}
                   </div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => { setEditingItem(t); setIsDialogOpen(true); }} variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-white/10"><Edit2 className="w-3.5 h-3.5 text-slate-400" /></Button>
                      <Button onClick={() => deleteTestimonial(t.id)} variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-red-500/10 text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                   </div>
                </div>
                
                {t.linkedin_url && (
                  <a href={t.linkedin_url} target="_blank" className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
