'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Users, 
  Settings,
  Edit,
  Check
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

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
  }>;
}

// État local pour l'édition d'un champ d'un groupe
interface EditState {
  groupId: string;
  field: 'max_capacity' | 'current_capacity';
  value: string;
}

export default function BusinessPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  // BUG FIX #7: État local d'édition pour éviter le spam API à chaque frappe
  const [editState, setEditState] = useState<EditState | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          registrations(
            payment_status,
            total_amount
          )
        `)
        .order('name');

      if (error) throw error;
      
      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  // Démarre l'édition : stocke la valeur courante dans l'état local
  const startEditing = (groupId: string, field: 'max_capacity' | 'current_capacity', currentValue: number) => {
    setEditState({ groupId, field, value: String(currentValue) });
  };

  // Confirme l'édition : appel API une seule fois à la validation
  const confirmEdit = async () => {
    if (!editState) return;
    const parsed = parseInt(editState.value, 10);
    if (isNaN(parsed) || parsed < 0) {
      setEditState(null);
      return;
    }
    try {
      const { error } = await supabase
        .from('groups')
        .update({ [editState.field]: parsed })
        .eq('id', editState.groupId);

      if (error) throw error;
      await fetchGroups();
    } catch (error) {
      console.error('Error updating group:', error);
      alert('Erreur lors de la mise à jour du groupe');
    } finally {
      setEditState(null);
    }
  };

  const cancelEdit = () => setEditState(null);

  const generatePresenceSheet = async (groupId: string) => {
    try {
      const { data: participants } = await supabase
        .from('registrations')
        .select(`
          participants!inner(
            first_name,
            last_name,
            email,
            phone,
            company
          )
        `)
        .eq('group_id', groupId);

      if (participants) {
        const csvContent = [
          ['Nom', 'Prénom', 'Email', 'Téléphone', 'Entreprise', 'Signature'],
          ...participants.map((reg: any) => [
            reg.participants.last_name,
            reg.participants.first_name,
            reg.participants.email,
            reg.participants.phone || '',
            reg.participants.company || '',
            ''
          ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `feuille_presence_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
      }
    } catch (error) {
      console.error('Error generating presence sheet:', error);
      alert('Erreur lors de la génération de la feuille de présence');
    }
  };

  const exportBusinessData = async () => {
    try {
      const csvContent = [
        ['Groupe', 'Créneau', 'Capacité Max', 'Capacité Actuelle', 'Taux Remplissage', 'Revenus', 'Statut'],
        ...groups.map(group => {
          const fillRate = group.max_capacity > 0 
            ? (group.current_capacity / group.max_capacity) * 100 
            : 0;
          
          const revenue = group.registrations
            ?.filter(r => r.payment_status === 'paid')
            ?.reduce((sum, r) => sum + r.total_amount, 0) || 0;

          return [
            group.name,
            group.time_slot,
            group.max_capacity,
            group.current_capacity,
            `${fillRate.toFixed(1)}%`,
            `${(revenue / 1000000).toFixed(1)}M FCFA`,
            group.is_active ? 'Actif' : 'Inactif'
          ];
        })
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `business_data_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (error) {
      console.error('Error exporting business data:', error);
      alert("Erreur lors de l'export des données business");
    }
  };

  const getFillRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Helper : est-ce que ce champ de ce groupe est en cours d'édition ?
  const isEditing = (groupId: string, field: 'max_capacity' | 'current_capacity') =>
    editState?.groupId === groupId && editState?.field === field;

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des données business...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">💼 Gestion Business</h1>
          <p className="text-gray-600 mt-2">
            Capacité groupes + Export CSV/PDF + Génération feuilles présence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportBusinessData}>
            <Download className="w-4 h-4 mr-2" />
            Exporter Business
          </Button>
        </div>
      </div>

      {/* Groups Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Gestion des Capacités
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {groups.map((group) => {
              const fillRate = group.max_capacity > 0 
                ? (group.current_capacity / group.max_capacity) * 100 
                : 0;
              
              const revenue = group.registrations
                ?.filter(r => r.payment_status === 'paid')
                ?.reduce((sum, r) => sum + r.total_amount, 0) || 0;

              return (
                <div key={group.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg text-gray-900">{group.name}</h3>
                      <Badge className={getFillRateColor(fillRate)}>
                        {fillRate.toFixed(1)}% rempli
                      </Badge>
                      <Badge variant={group.is_active ? 'default' : 'secondary'}>
                        {group.is_active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generatePresenceSheet(group.id)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Feuille présence
                    </Button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Créneau</label>
                        <p className="text-gray-900">{group.time_slot}</p>
                      </div>
                      
                      {/* Capacité Maximale — édition locale, API appelée au clic ✓ seulement */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">Capacité Maximale</label>
                        <div className="flex items-center space-x-2 mt-1">
                          {isEditing(group.id, 'max_capacity') ? (
                            <>
                              <Input
                                type="number"
                                value={editState!.value}
                                onChange={(e) =>
                                  setEditState(prev => prev ? { ...prev, value: e.target.value } : null)
                                }
                                className="w-24"
                                min="1"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') confirmEdit();
                                  if (e.key === 'Escape') cancelEdit();
                                }}
                              />
                              <Button size="sm" onClick={confirmEdit} className="h-8 w-8 p-0">
                                <Check className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <span className="font-medium">{group.max_capacity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditing(group.id, 'max_capacity', group.max_capacity)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Capacité Actuelle — même pattern état local */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">Capacité Actuelle</label>
                        <div className="flex items-center space-x-2 mt-1">
                          {isEditing(group.id, 'current_capacity') ? (
                            <>
                              <Input
                                type="number"
                                value={editState!.value}
                                onChange={(e) =>
                                  setEditState(prev => prev ? { ...prev, value: e.target.value } : null)
                                }
                                className="w-24"
                                min="0"
                                max={group.max_capacity}
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') confirmEdit();
                                  if (e.key === 'Escape') cancelEdit();
                                }}
                              />
                              <Button size="sm" onClick={confirmEdit} className="h-8 w-8 p-0">
                                <Check className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <span className="font-medium">{group.current_capacity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditing(group.id, 'current_capacity', group.current_capacity)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700">Revenus</label>
                        <p className="font-medium text-green-600">
                          {(revenue / 1000000).toFixed(1)}M FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Taux de remplissage</span>
                      <span>{fillRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          fillRate >= 80 ? 'bg-green-500' : 
                          fillRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(fillRate, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Places</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groups.reduce((sum, g) => sum + g.max_capacity, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Places Remplies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groups.reduce((sum, g) => sum + g.current_capacity, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux Moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groups.length > 0 
                    ? (groups.reduce((sum, g) => {
                        const rate = g.max_capacity > 0 ? (g.current_capacity / g.max_capacity) * 100 : 0;
                        return sum + rate;
                      }, 0) / groups.length
                    ).toFixed(1)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
