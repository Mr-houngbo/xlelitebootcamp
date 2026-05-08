'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  ExternalLink,
  Search,
  CheckCircle2,
  XCircle
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

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
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
  };

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
      alert('Erreur lors de l\'enregistrement');
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📣 Gestion des Témoignages</h1>
          <p className="text-gray-600 mt-2">Gérez la preuve sociale (vidéos, LinkedIn, avis certifiés)</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem({ type: 'text', rating: 5 })} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Témoignage
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem?.id ? 'Modifier le témoignage' : 'Ajouter un témoignage'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Nom complet *</label>
                  <Input 
                    required 
                    value={editingItem?.participant_name || ''} 
                    onChange={e => setEditingItem({...editingItem, participant_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Type de contenu</label>
                  <Select 
                    value={editingItem?.type || 'text'} 
                    onValueChange={v => setEditingItem({...editingItem, type: v as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Texte uniquement</SelectItem>
                      <SelectItem value="video">Vidéo + Texte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Entreprise</label>
                  <Input 
                    value={editingItem?.company || ''} 
                    onChange={e => setEditingItem({...editingItem, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Poste / Position</label>
                  <Input 
                    value={editingItem?.position || ''} 
                    onChange={e => setEditingItem({...editingItem, position: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Lien Photo Avatar (URL)</label>
                <Input 
                  placeholder="https://..." 
                  value={editingItem?.participant_photo || ''} 
                  onChange={e => setEditingItem({...editingItem, participant_photo: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Lien LinkedIn (URL)</label>
                <Input 
                  placeholder="https://linkedin.com/in/..." 
                  value={editingItem?.linkedin_url || ''} 
                  onChange={e => setEditingItem({...editingItem, linkedin_url: e.target.value})}
                />
              </div>

              {editingItem?.type === 'video' && (
                <div className="space-y-2 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <label className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                    <Video className="w-4 h-4" /> Lien Vidéo MP4 (Direct URL)
                  </label>
                  <Input 
                    placeholder="https://votre-stockage.com/video.mp4" 
                    value={editingItem?.video_url || ''} 
                    onChange={e => setEditingItem({...editingItem, video_url: e.target.value})}
                  />
                  <p className="text-[10px] text-emerald-600 mt-1">Utilisez un lien direct vers le fichier MP4 (Supabase Storage, Cloudinary, etc.)</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold">Le Témoignage (Texte court) *</label>
                <Textarea 
                  required 
                  className="h-24"
                  value={editingItem?.testimonial || ''} 
                  onChange={e => setEditingItem({...editingItem, testimonial: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={editingItem?.is_active ?? true} 
                    onChange={e => setEditingItem({...editingItem, is_active: e.target.checked})}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span className="text-sm font-medium">Actif (Visible)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={editingItem?.is_featured ?? false} 
                    onChange={e => setEditingItem({...editingItem, is_featured: e.target.checked})}
                    className="w-4 h-4 rounded text-orange-500"
                  />
                  <span className="text-sm font-medium">Mettre en avant</span>
                </label>
              </div>

              <Button type="submit" className="w-full bg-slate-900 hover:bg-black text-white h-12 text-lg font-bold">
                {editingItem?.id ? 'Mettre à jour' : 'Publier le témoignage'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><FileText className="w-5 h-5"/></div>
            <div><p className="text-xs text-gray-500">Total</p><p className="text-xl font-bold">{testimonials.length}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Video className="w-5 h-5"/></div>
            <div><p className="text-xs text-gray-500">Vidéos</p><p className="text-xl font-bold">{testimonials.filter(t => t.type === 'video').length}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center"><Star className="w-5 h-5"/></div>
            <div><p className="text-xs text-gray-500">Featured</p><p className="text-xl font-bold">{testimonials.filter(t => t.is_featured).length}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-5 h-5"/></div>
            <div><p className="text-xs text-gray-500">Actifs</p><p className="text-xl font-bold">{testimonials.filter(t => t.is_active).length}</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Main List */}
      <Card>
        <CardHeader className="border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Rechercher un participant ou une entreprise..." 
              className="pl-10 h-11"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((t) => (
              <div key={t.id} className="p-6 flex items-start gap-6 hover:bg-slate-50 transition-colors">
                <img 
                  src={t.participant_photo || `https://api.dicebear.com/7.x/initials/svg?seed=${t.participant_name}`} 
                  className="w-16 h-16 rounded-2xl object-cover bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{t.participant_name}</h3>
                    <Badge variant={t.type === 'video' ? 'default' : 'secondary'} className="gap-1">
                      {t.type === 'video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                      {t.type}
                    </Badge>
                    {t.is_featured && <Badge className="bg-orange-100 text-orange-600 border-orange-200">Featured</Badge>}
                    {!t.is_active && <Badge variant="destructive">Inactif</Badge>}
                  </div>
                  <p className="text-sm text-gray-500 font-medium mb-3">{t.position} @ {t.company}</p>
                  <p className="text-gray-700 italic line-clamp-2">"{t.testimonial}"</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    {t.linkedin_url && (
                      <a href={t.linkedin_url} target="_blank" className="text-xs flex items-center gap-1 text-blue-600 hover:underline">
                        <Linkedin className="w-3 h-3" /> LinkedIn
                      </a>
                    )}
                    {t.video_url && (
                      <a href={t.video_url} target="_blank" className="text-xs flex items-center gap-1 text-emerald-600 hover:underline">
                        <Video className="w-3 h-3" /> Voir la vidéo
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => { setEditingItem(t); setIsDialogOpen(true); }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteTestimonial(t.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                Aucun témoignage trouvé.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
