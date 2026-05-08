'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  MoreHorizontal, 
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

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
  status: string;
  created_at: string;
  registrations?: Array<{
    id: string;
    payment_status: string;
    total_amount: number;
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
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterProfile, setFilterProfile] = useState<string>('all');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
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
      
      setParticipants(data || []);
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = 
      participant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || participant.status === filterStatus;
    const matchesSource = filterSource === 'all' || participant.source === filterSource;
    const matchesProfile = filterProfile === 'all' || participant.profile_type === filterProfile;
    
    return matchesSearch && matchesStatus && matchesSource && matchesProfile;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      lead: 'secondary',
      confirmed: 'default',
      cancelled: 'destructive',
      completed: 'outline'
    };
    
    const labels: Record<string, string> = {
      lead: 'Lead',
      confirmed: 'Confirmé',
      cancelled: 'Annulé',
      completed: 'Terminé'
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      partial: 'outline',
      paid: 'default',
      refunded: 'destructive'
    };
    
    const labels: Record<string, string> = {
      pending: 'En attente',
      partial: 'Partiel',
      paid: 'Payé',
      refunded: 'Remboursé'
    };

    return (
      <Badge variant={variants[paymentStatus] || 'secondary'}>
        {labels[paymentStatus] || paymentStatus}
      </Badge>
    );
  };

  const updateParticipantStatus = async (participantId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('participants')
        // @ts-expect-error: Supabase type inference fails on dynamic update payloads
        .update({ status: newStatus })
        .eq('id', participantId);

      if (error) throw error;

      await fetchParticipants();
      alert('Statut mis à jour avec succès');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Nom', 'Prénom', 'Email', 'Téléphone', 'Entreprise', 'Poste', 
      'Profil', 'Source', 'Statut', 'Groupe', 'Statut Paiement', 'Date'
    ];
    
    const csvData = filteredParticipants.map(p => [
      p.last_name,
      p.first_name,
      p.email,
      p.phone || '',
      p.company || '',
      p.position || '',
      p.profile_type || '',
      p.source,
      p.status,
      p.registrations?.[0]?.groups?.name || '',
      p.registrations?.[0]?.payment_status || '',
      new Date(p.created_at).toLocaleDateString('fr-FR')
    ]);

    const csv = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `participants_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const quickActions = [
    {
      label: 'Confirmer',
      icon: <CheckCircle className="w-4 h-4" />,
      action: (id: string) => updateParticipantStatus(id, 'confirmed'),
      color: 'text-green-600'
    },
    {
      label: 'Annuler',
      icon: <XCircle className="w-4 h-4" />,
      action: (id: string) => updateParticipantStatus(id, 'cancelled'),
      color: 'text-red-600'
    },
    {
      label: 'Terminer',
      icon: <CheckCircle className="w-4 h-4" />,
      action: (id: string) => updateParticipantStatus(id, 'completed'),
      color: 'text-blue-600'
    }
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des participants...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Gestion des Inscrits</h1>
          <p className="text-gray-600 mt-2">
            Table complète + filtres avancés + actions rapides
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres Avancés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, email, entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="lead">Leads</option>
              <option value="confirmed">Confirmés</option>
              <option value="completed">Terminés</option>
              <option value="cancelled">Annulés</option>
            </select>

            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Toutes les sources</option>
              <option value="direct">Direct</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="referral">Parrainage</option>
              <option value="colleague">Collègue</option>
              <option value="autre">Autre</option>
            </select>

            <select
              value={filterProfile}
              onChange={(e) => setFilterProfile(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Tous les profils</option>
              <option value="cadre">Cadre</option>
              <option value="etudiant">Étudiant</option>
              <option value="freelance">Freelance</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </CardContent>
      </Card>
      
      {/* Participants Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des Participants ({filteredParticipants.length})</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Profil</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Groupe</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      Aucun participant trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {participant.first_name} {participant.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {participant.position}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{participant.email}</div>
                          <div className="text-sm text-gray-500">
                            {participant.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{participant.company}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {participant.profile_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{participant.source}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(participant.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {participant.registrations?.[0]?.groups?.name || '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {participant.registrations?.[0] ? (
                          getPaymentStatusBadge(participant.registrations[0].payment_status)
                        ) : (
                          <Badge variant="secondary">Non inscrit</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(participant.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {/* Quick Actions */}
                          {quickActions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              onClick={() => action.action(participant.id)}
                              className="h-6 w-6 p-0"
                              title={action.label}
                            >
                              <span className={action.color}>{action.icon}</span>
                            </Button>
                          ))}
                          
                          {/* More Actions */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Voir détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Envoyer email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
