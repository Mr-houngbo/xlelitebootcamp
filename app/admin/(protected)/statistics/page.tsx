'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRealtimeRefresh } from '@/lib/supabase/useRealtimeRefresh';
import {
  Users,
  DollarSign,
  TrendingUp,
  Percent,
  MapPin,
  Laptop,
  Filter,
  X,
  Download,
  Clock,
  ChevronRight,
  Search,
  XCircle,
  Activity,
  HelpCircle as InfoIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV, exportToPDF } from '@/lib/utils/export';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Dictionnaire étendu de mots-clés de prénoms féminins pour classification de genre
const femaleKeywords = new Set([
  'ginette', 'anne', 'ariane', 'mariam', 'chantal', 'aïda', 'aida', 'fatou', 'awa', 'aminata',
  'kadiatou', 'kadidia', 'ramata', 'safiatou', 'minata', 'alima', 'halima', 'sonia',
  'carine', 'audrey', 'cynthia', 'fatim', 'fatima', 'fatoumata', 'therese', 'térèse', 'bernadette',
  'elisabeth', 'sylvie', 'nathalie', 'nadia', 'sarah', 'rebecca', 'esther', 'ruth',
  'grace', 'grâce', 'syntyche', 'deborah', 'eunice', 'dorcas', 'christine', 'isabelle',
  'alice', 'julie', 'camille', 'laure', 'yasmine', 'valerie', 'valérie', 'sandrine', 'patricia',
  'monique', 'charlotte', 'elise', 'élise', 'lucie', 'emmanuelle', 'sabine', 'christelle',
  'muriel', 'emilie', 'émilie', 'aude', 'delphine', 'stephanie', 'stéphanie', 'caroline',
  'virginie', 'claire', 'helene', 'hélène', 'agnes', 'agnès', 'catherine', 'martine',
  'françoise', 'dominique', 'jacqueline', 'nicole', 'genevieve', 'geneviève', 'colette',
  'micheline', 'yvette', 'liliane', 'janine', 'denise', 'marcelle', 'renée', 'renee',
  'suzanne', 'marguerite', 'jeanne', 'germaine', 'louise', 'florence', 'celine', 'céline',
  'hadja', 'bintou', 'oumi', 'rokia', 'dene', 'assiatou', 'doussou', 'saran', 'fanta', 'maman',
  'assétou', 'assetou', 'dior', 'khady', 'nogoye', 'coumba', 'seynabou', 'antoinette',
  'madeline', 'gabrielle', 'rose', 'solange', 'pauline', 'clara', 'sophia', 'leila', 'leïla',
  'ines', 'inès', 'diane', 'helena', 'elena', 'victoria', 'zoe', 'zoé', 'chloe', 'chloé', 'eva',
  'fabiola', 'nadège', 'nadege', 'tatiana', 'olivia', 'reine', 'rolande', 'josiane', 'viviane',
  'brigitte', 'michele', 'michèle', 'danielle', 'odile', 'mariama', 'fatoumata', 'oumou', 'kadidiatou'
]);

function detectGender(firstName: string = ''): 'F' | 'M' {
  const normalized = firstName.toLowerCase().trim();
  const parts = normalized.split(/[\s\-]+/);
  
  for (const part of parts) {
    if (femaleKeywords.has(part)) {
      return 'F';
    }
  }
  return 'M';
}

// Color mapping helper functions
function getFormatColor(formatName: string): string {
  const norm = formatName.toLowerCase();
  if (norm.includes('présentiel') || norm.includes('presentiel')) {
    return '#6366f1'; // Indigo
  }
  if (norm.includes('online') || norm.includes('distanciel')) {
    return '#10b981'; // Emerald
  }
  return '#8b5cf6'; // Violet / Purple
}

// Rich diverse fallback palette for unrecognized sources
const SOURCE_FALLBACK_COLORS = [
  '#6366f1', // Indigo
  '#a855f7', // Purple
  '#f43f5e', // Rose
  '#f97316', // Orange
  '#eab308', // Yellow
  '#84cc16', // Lime
  '#14b8a6', // Teal
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#d946ef', // Fuchsia
  '#fb923c', // Orange-light
  '#4ade80', // Green
];

function getSourceColor(sourceName: string, fallbackIndex?: number): string {
  const norm = sourceName.toLowerCase();
  if (norm.includes('facebook')) return '#1877f2'; // FB Blue
  if (norm.includes('linkedin')) return '#0a66c2'; // LinkedIn Blue
  if (norm.includes('whatsapp')) return '#25d366'; // WhatsApp Green
  if (norm.includes('instagram')) return '#e1306c'; // Instagram Pink
  if (norm.includes('tiktok')) return '#fe2c55'; // TikTok Pink
  if (norm.includes('youtube')) return '#ff0000'; // YouTube Red
  if (norm.includes('recommandation') || norm.includes('bouche') || norm.includes('ami') || norm.includes('collegue')) {
    return '#8b5cf6'; // Amethyst Violet
  }
  if (norm.includes('google') || norm.includes('search')) return '#4285f4'; // Google Blue
  if (norm.includes('email') || norm.includes('mail')) return '#ea4335'; // Red
  if (norm.includes('web') || norm.includes('site')) return '#0ea5e9'; // Sky Blue
  // Fallback: unique vivid color per index so no two unknowns share the same color
  if (fallbackIndex !== undefined) {
    return SOURCE_FALLBACK_COLORS[fallbackIndex % SOURCE_FALLBACK_COLORS.length];
  }
  return '#94a3b8'; // Slate Gray only if no index available
}

function getProfileColor(profileName: string): string {
  const norm = profileName.toLowerCase();
  if (norm.includes('cadre')) return '#3b82f6'; // Blue
  if (norm.includes('freelance')) return '#f59e0b'; // Amber
  if (norm.includes('etudiant') || norm.includes('étudiant')) return '#10b981'; // Emerald
  return '#64748b'; // Slate Gray for others
}

const GEOGRAPHIC_COLORS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#0ea5e9'  // Sky
];
function getCountryColor(index: number): string {
  return GEOGRAPHIC_COLORS[index % GEOGRAPHIC_COLORS.length];
}

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
      id: string;
      name: string;
      time_slot: string;
      max_capacity: number;
      current_capacity: number;
    };
  }>;
}

export default function StatisticsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Interactive Filters
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');
  const [selectedProfileType, setSelectedProfileType] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected participant for drawer view
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  // Set isMounted to true on client-side and monitor theme
  useEffect(() => {
    setIsMounted(true);
    
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    
    // Listen for theme toggles
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data: participantsRaw, error: pError } = await supabase
        .from('participants')
        .select(`
          *,
          registrations(
            *,
            groups(*)
          )
        `)
        .order('created_at', { ascending: true });

      const { data: groupsRaw, error: gError } = await supabase
        .from('groups')
        .select('*')
        .eq('is_active', true);

      if (pError) throw pError;
      if (gError) throw gError;

      setParticipants((participantsRaw as Participant[]) || []);
      setGroups(groupsRaw || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching statistics data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useRealtimeRefresh(['participants', 'registrations', 'groups'], fetchData, 20_000);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Parse location and format metadata from message column helper
  const parseMetadata = useCallback((message?: string) => {
    if (!message) return { country: 'N/A', format: 'N/A' };
    const countryMatch = message.match(/\[PAYS:\s*(.*?)\]/);
    const formatMatch = message.match(/\[FORMAT:\s*(.*?)\]/);
    return {
      country: countryMatch ? countryMatch[1] : 'N/A',
      format: formatMatch ? formatMatch[1] : 'N/A'
    };
  }, []);

  // Filter items in memory based on current filters
  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const { country, format } = parseMetadata(p.message);
      const reg = p.registrations?.[0];
      const matchSearch =
        `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.company || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchGroup = selectedGroup === 'all' || reg?.groups?.name === selectedGroup;
      const matchFormat = selectedFormat === 'all' || format.toLowerCase() === selectedFormat.toLowerCase();
      const matchCountry = selectedCountry === 'all' || country === selectedCountry;
      const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
      const matchPayment =
        selectedPaymentStatus === 'all' ||
        (selectedPaymentStatus === 'paid' && reg?.registration_fee_paid && reg?.training_fee_paid) ||
        (selectedPaymentStatus === 'partial' && (reg?.registration_fee_paid || reg?.training_fee_paid) && !(reg?.registration_fee_paid && reg?.training_fee_paid)) ||
        (selectedPaymentStatus === 'pending' && !reg?.registration_fee_paid && !reg?.training_fee_paid);
      const matchProfile = selectedProfileType === 'all' || p.profile_type === selectedProfileType;
      const matchSource = selectedSource === 'all' || p.source?.toLowerCase() === selectedSource.toLowerCase();

      return matchSearch && matchGroup && matchFormat && matchCountry && matchStatus && matchPayment && matchProfile && matchSource;
    });
  }, [participants, searchQuery, selectedGroup, selectedFormat, selectedCountry, selectedStatus, selectedPaymentStatus, selectedProfileType, selectedSource, parseMetadata]);

  // Unique lists for filter dropdowns
  const countriesList = useMemo(() => {
    const list = new Set<string>();
    participants.forEach((p) => {
      const { country } = parseMetadata(p.message);
      if (country && country !== 'N/A') list.add(country);
    });
    return Array.from(list).sort();
  }, [participants, parseMetadata]);

  // Unique list of sources for filter dropdown
  const sourcesList = useMemo(() => {
    const list = new Set<string>();
    participants.forEach((p) => {
      const rawSource = p.source || 'Autre';
      const label = rawSource.charAt(0).toUpperCase() + rawSource.slice(1);
      if (label) list.add(label);
    });
    return Array.from(list).sort();
  }, [participants]);

  // Reset all filters utility
  const resetFilters = () => {
    setSelectedGroup('all');
    setSelectedFormat('all');
    setSelectedCountry('all');
    setSelectedStatus('all');
    setSelectedPaymentStatus('all');
    setSelectedProfileType('all');
    setSelectedSource('all');
    setSearchQuery('');
  };

  const hasActiveFilters = useMemo(() => {
    return selectedGroup !== 'all' ||
      selectedFormat !== 'all' ||
      selectedCountry !== 'all' ||
      selectedStatus !== 'all' ||
      selectedPaymentStatus !== 'all' ||
      selectedProfileType !== 'all' ||
      selectedSource !== 'all' ||
      searchQuery !== '';
  }, [selectedGroup, selectedFormat, selectedCountry, selectedStatus, selectedPaymentStatus, selectedProfileType, selectedSource, searchQuery]);

  // KPIs Calculations
  const kpiStats = useMemo(() => {
    const totalCount = filteredParticipants.length;
    
    // Gender
    let womenCount = 0;
    filteredParticipants.forEach((p) => {
      if (detectGender(p.first_name) === 'F') {
        womenCount++;
      }
    });
    const femalePercentage = totalCount > 0 ? (womenCount / totalCount) * 100 : 0;

    // Conversion
    const confirmedCount = filteredParticipants.filter(p => p.status === 'confirmed' || p.status === 'completed').length;
    const conversionRate = totalCount > 0 ? (confirmedCount / totalCount) * 100 : 0;

    // Revenue
    let realizedRevenue = 0;
    let projectedRevenue = 0;
    filteredParticipants.forEach((p) => {
      const reg = p.registrations?.[0];
      if (reg) {
        projectedRevenue += Number(reg.total_amount || 155000);
        if (reg.registration_fee_paid) realizedRevenue += Number(reg.registration_fee_amount || 30000);
        if (reg.training_fee_paid) realizedRevenue += Number(reg.training_fee_amount || 125000);
      }
    });

    return {
      totalCount,
      womenCount,
      femalePercentage,
      confirmedCount,
      conversionRate,
      realizedRevenue,
      projectedRevenue
    };
  }, [filteredParticipants]);

  // Chart Data: Format (Donut)
  const formatChartData = useMemo(() => {
    let presentiel = 0;
    let online = 0;
    filteredParticipants.forEach((p) => {
      const { format } = parseMetadata(p.message);
      if (format.toLowerCase() === 'presentiel') presentiel++;
      else if (format.toLowerCase() === 'online') online++;
    });
    return [
      { name: 'Présentiel', value: presentiel },
      { name: 'Online', value: online }
    ].filter(item => item.value > 0);
  }, [filteredParticipants, parseMetadata]);

  // Chart Data: Group Capacity (Bar)
  const groupChartData = useMemo(() => {
    return groups.map((g) => {
      // Find participants currently assigned to this group from the FILTERED list
      const groupRegs = filteredParticipants.filter((p) => p.registrations?.[0]?.groups?.id === g.id);
      const count = groupRegs.length;
      const confirmedCount = groupRegs.filter(p => p.status === 'confirmed' || p.status === 'completed').length;

      return {
        name: g.name,
        'Inscrits Totaux': count,
        'Inscrits Confirmés': confirmedCount,
        Capacité: g.max_capacity
      };
    });
  }, [filteredParticipants, groups]);

  // Chart Data: Geographic Breakdown (Horizontal Bar)
  const geographicChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredParticipants.forEach((p) => {
      const { country } = parseMetadata(p.message);
      if (country) {
        counts[country] = (counts[country] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [filteredParticipants, parseMetadata]);

  // Chart Data: Acquisition Channels (Pie/Donut)
  const sourceChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredParticipants.forEach((p) => {
      const rawSource = p.source || 'Autre';
      const label = rawSource.charAt(0).toUpperCase() + rawSource.slice(1);
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredParticipants]);

  // Chart Data: Profile Types (Bar)
  const profileChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredParticipants.forEach((p) => {
      const rawProfile = p.profile_type || 'Autre';
      const label = rawProfile.charAt(0).toUpperCase() + rawProfile.slice(1);
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredParticipants]);

  // Chart Data: Cumulative Registrations Trend Over Time (Area Chart)
  const trendChartData = useMemo(() => {
    const countsByDate: Record<string, number> = {};
    
    // Sort all participants chronologically
    const sorted = [...filteredParticipants].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    sorted.forEach((p) => {
      const dateKey = new Date(p.created_at).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit'
      });
      countsByDate[dateKey] = (countsByDate[dateKey] || 0) + 1;
    });

    let cumulative = 0;
    return Object.entries(countsByDate).map(([date, count]) => {
      cumulative += count;
      return {
        date,
        Inscriptions: count,
        'Cumul Inscrits': cumulative
      };
    });
  }, [filteredParticipants]);

  // Handle cross-chart interactive filters click
  const handleChartClick = (type: 'format' | 'group' | 'country' | 'profile' | 'source', name: string) => {
    if (type === 'format') {
      const target = name.toLowerCase() === 'présentiel' ? 'presentiel' : 'online';
      setSelectedFormat(prev => prev === target ? 'all' : target);
    } else if (type === 'group') {
      setSelectedGroup(prev => prev === name ? 'all' : name);
    } else if (type === 'country') {
      setSelectedCountry(prev => prev === name ? 'all' : name);
    } else if (type === 'profile') {
      let target = name.toLowerCase();
      if (target.startsWith('étud') || target.startsWith('etud')) {
        target = 'etudiant';
      }
      setSelectedProfileType(prev => prev === target ? 'all' : target);
    } else if (type === 'source') {
      setSelectedSource(prev => prev === name ? 'all' : name);
    }
  };

  const handleExportData = (type: 'csv' | 'pdf') => {
    const headers = ['Nom complet', 'Email', 'Téléphone', 'Pays', 'Format', 'Groupe', 'Profil', 'Source', 'Statut', 'Frais payés'];
    const rows = filteredParticipants.map((p) => {
      const { country, format } = parseMetadata(p.message);
      const reg = p.registrations?.[0];
      const paidAmount = ((reg?.registration_fee_paid ? Number(reg.registration_fee_amount) : 0) + (reg?.training_fee_paid ? Number(reg.training_fee_amount) : 0));
      return [
        `${p.first_name} ${p.last_name}`,
        p.email,
        p.phone || 'N/A',
        country,
        format,
        reg?.groups?.name || 'N/A',
        p.profile_type || 'N/A',
        p.source,
        p.status,
        `${paidAmount.toLocaleString()} FCFA`
      ];
    });

    if (type === 'csv') {
      exportToCSV(`analytics_participants_${selectedGroup}_${selectedFormat}`, headers, rows);
    } else {
      exportToPDF(`analytics_participants_${selectedGroup}_${selectedFormat}`, 'Statistiques Participants - XL Elite', headers, rows);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      lead: 'bg-stone-100 text-stone-500 border-stone-200 dark:bg-stone-800/40 dark:text-stone-400 dark:border-stone-750',
      confirmed: 'bg-orange-50 text-orange-650 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
      cancelled: 'bg-red-50 text-red-650 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
      completed: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
    };
    return (
      <Badge variant="outline" className={`${colors[status] || 'bg-stone-50 text-stone-400 dark:bg-stone-850 dark:text-stone-400'} font-black uppercase text-[9px] tracking-widest`}>
        {status}
      </Badge>
    );
  };

  // Recharts Custom Styling based on Theme
  const tooltipStyle = useMemo(() => ({
    backgroundColor: isDarkMode ? '#1c1917' : '#ffffff',
    borderColor: isDarkMode ? '#292524' : '#e7e5e4',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
    color: isDarkMode ? '#fafaf9' : '#1c1917',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  }), [isDarkMode]);

  const axisColor = isDarkMode ? '#a8a29e' : '#78716c';
  const gridColor = isDarkMode ? '#292524' : '#f5f5f4';

  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-orange-500/50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 mb-4" />
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-450">Initialisation du Dashboard Analytique...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-orange-500/50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 mb-4" />
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-450">Chargement de la base décisionnelle...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 text-stone-900 dark:text-stone-100">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            Intelligence Analytique <span className="text-indigo-650 dark:text-indigo-500">.</span>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm font-medium">
            Dashboard décisionnel interactif. Filtrez et explorez en temps réel.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-250/60 dark:border-stone-800 shadow-sm flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
            <span className="text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-widest">
              Live updates: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>

          <Button 
            onClick={() => handleExportData('csv')} 
            variant="outline" 
            className="rounded-xl border-stone-250/60 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm text-stone-700 dark:text-stone-300"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </Button>

          <Button 
            onClick={() => handleExportData('pdf')} 
            variant="outline" 
            className="rounded-xl border-stone-250/60 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm text-stone-700 dark:text-stone-300"
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </Button>

          <Button 
            onClick={fetchData} 
            className="w-10 h-10 p-0 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-750 transition-colors shadow-sm"
          >
            <Activity className="w-4 h-4 animate-pulse" />
          </Button>
        </div>
      </div>

      {/* FILTER CONTROL PANEL */}
      <div className="rounded-3xl border border-stone-250/60 dark:border-stone-850 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent"></div>
        <div className="py-4 px-6 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Filtres Globaux Dynamiques
            </h3>
          </div>
          <Button 
            onClick={resetFilters} 
            disabled={!hasActiveFilters}
            variant="ghost" 
            className="text-xs text-indigo-600 hover:text-indigo-750 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold gap-1 px-3 py-1.5 h-auto rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <XCircle className="w-3.5 h-3.5" /> Réinitialiser
          </Button>
        </div>
        <div className="px-6 pb-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {/* Group Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Groupe</label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Tous les groupes</option>
                <option value="G1">Groupe 1 (09h-12h)</option>
                <option value="G2">Groupe 2 (14h-17h)</option>
                <option value="G3">Groupe 3 (18h-21h)</option>
              </select>
            </div>

            {/* Format Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Tous les formats</option>
                <option value="presentiel">Présentiel</option>
                <option value="online">Online / Distanciel</option>
              </select>
            </div>

            {/* Country Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Pays</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Tous les pays ({countriesList.length})</option>
                {countriesList.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Statut Lead</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Tous les statuts</option>
                <option value="lead">Lead / Nouveau</option>
                <option value="confirmed">Confirmé</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>

            {/* Payment Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">État Financier</label>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Tous les paiements</option>
                <option value="paid">Payé en totalité</option>
                <option value="partial">Partiel (Inscription ou Formation)</option>
                <option value="pending">En attente / Non payé</option>
              </select>
            </div>

            {/* Profile Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Profil</label>
              <select
                value={selectedProfileType}
                onChange={(e) => setSelectedProfileType(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Tous les profils</option>
                <option value="cadre">Cadre</option>
                <option value="freelance">Freelance</option>
                <option value="etudiant">Étudiant</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            {/* Source Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Canal / Source</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Toutes les sources ({sourcesList.length})</option>
                {sourcesList.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Search & Cancel Buttons */}
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <Input
                type="text"
                placeholder="Rechercher par nom, email, entreprise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 h-9 rounded-xl bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-850 text-xs font-bold text-stone-800 dark:text-stone-200 placeholder:text-stone-400 focus-visible:ring-indigo-500"
              />
            </div>
            <Button
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              variant="outline"
              className="h-9 rounded-xl px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all
                border-stone-200 dark:border-stone-800
                bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-850
                text-stone-700 dark:text-stone-300
                disabled:opacity-40 disabled:hover:bg-stone-50 dark:disabled:hover:bg-stone-950 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4" />
              Annuler les filtres
            </Button>
          </div>

          {/* Filter Status Summary Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/65">
            <span className="text-[9px] font-bold text-stone-450 dark:text-stone-500 uppercase tracking-wider flex items-center mr-1">Filtres actifs :</span>
            {selectedGroup !== 'all' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Groupe: {selectedGroup}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedGroup('all')} />
              </Badge>
            )}
            {selectedFormat !== 'all' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Format: {selectedFormat === 'presentiel' ? 'Présentiel' : 'Online'}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedFormat('all')} />
              </Badge>
            )}
            {selectedCountry !== 'all' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Pays: {selectedCountry}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedCountry('all')} />
              </Badge>
            )}
            {selectedStatus !== 'all' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Statut: {selectedStatus}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedStatus('all')} />
              </Badge>
            )}
            {selectedPaymentStatus !== 'all' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Finance: {selectedPaymentStatus === 'paid' ? 'Payé' : selectedPaymentStatus === 'partial' ? 'Partiel' : 'En attente'}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedPaymentStatus('all')} />
              </Badge>
            )}
            {selectedProfileType !== 'all' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Profil: {selectedProfileType}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedProfileType('all')} />
              </Badge>
            )}
            {selectedSource !== 'all' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Source: {selectedSource}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedSource('all')} />
              </Badge>
            )}
            {searchQuery !== '' && (
              <Badge variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                Recherche: "{searchQuery}"
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSearchQuery('')} />
              </Badge>
            )}
            {!hasActiveFilters && (
              <span className="text-[9px] font-bold text-stone-500 dark:text-stone-400 italic">Aucun (Toutes les données sont affichées)</span>
            )}
          </div>
        </div>
      </div>

      {/* KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI: Total Registrants */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 shadow-[0_4px_25px_rgb(0,0,0,0.01)] dark:shadow-[0_4px_25px_rgb(0,0,0,0.08)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl -mr-6 -mt-6" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-450">
              <Users className="w-4.5 h-4.5" />
            </div>
            <Badge className="bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-[9px] font-extrabold uppercase">
              Cohort
            </Badge>
          </div>
          <div>
            <p className="text-[9px] font-black text-stone-450 dark:text-stone-500 uppercase tracking-widest mb-1">
              Audience Segmentée
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                {kpiStats.totalCount}
              </h3>
              <span className="text-[10px] font-bold text-stone-400">
                sur {participants.length} total
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI: Women Percentage */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 shadow-[0_4px_25px_rgb(0,0,0,0.01)] dark:shadow-[0_4px_25px_rgb(0,0,0,0.08)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/5 rounded-full blur-2xl -mr-6 -mt-6" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <Percent className="w-4.5 h-4.5" />
            </div>
            <Badge className="bg-pink-50 dark:bg-pink-950/25 border-pink-100 dark:border-pink-900/30 text-pink-600 dark:text-pink-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-1">
              <InfoIcon className="w-2.5 h-2.5" />
              Inferred
            </Badge>
          </div>
          <div>
            <p className="text-[9px] font-black text-stone-450 dark:text-stone-500 uppercase tracking-widest mb-1">
              Taux Féminin
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                {kpiStats.femalePercentage.toFixed(1)}%
              </h3>
              <span className="text-[10px] font-bold text-stone-400">
                {kpiStats.womenCount} femmes
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI: Taux de Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 shadow-[0_4px_25px_rgb(0,0,0,0.01)] dark:shadow-[0_4px_25px_rgb(0,0,0,0.08)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl -mr-6 -mt-6" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
            <Badge className="bg-emerald-50 dark:bg-emerald-950/25 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-500 text-[9px] font-extrabold uppercase">
              CRO
            </Badge>
          </div>
          <div>
            <p className="text-[9px] font-black text-stone-450 dark:text-stone-500 uppercase tracking-widest mb-1">
              Taux de Confirmation
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                {kpiStats.conversionRate.toFixed(1)}%
              </h3>
              <span className="text-[10px] font-bold text-stone-400">
                {kpiStats.confirmedCount} validés
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI: Financial Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 shadow-[0_4px_25px_rgb(0,0,0,0.01)] dark:shadow-[0_4px_25px_rgb(0,0,0,0.08)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl -mr-6 -mt-6" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
            <Badge className="bg-purple-50 dark:bg-purple-950/25 border-purple-100 dark:border-purple-900/30 text-purple-600 dark:text-purple-400 text-[9px] font-extrabold uppercase">
              Revenue
            </Badge>
          </div>
          <div>
            <p className="text-[9px] font-black text-stone-450 dark:text-stone-500 uppercase tracking-widest mb-1">
              Trésorerie Réelle
            </p>
            <div className="flex flex-col">
              <h3 className="text-xl font-black tracking-tight text-stone-900 dark:text-stone-100 truncate">
                {kpiStats.realizedRevenue.toLocaleString()} F
              </h3>
              <span className="text-[9px] font-bold text-stone-400">
                sur {kpiStats.projectedRevenue.toLocaleString()} F ({kpiStats.projectedRevenue > 0 ? ((kpiStats.realizedRevenue / kpiStats.projectedRevenue) * 100).toFixed(0) : 0}%)
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CHARTS CONTAINER (GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHART: Cumulative signup rate over time */}
        <div className="lg:col-span-8 rounded-3xl border border-stone-200/60 dark:border-stone-850 bg-white dark:bg-stone-900 shadow-sm">
          <div className="py-4 px-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Tendance temporelle des inscriptions
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Évolution journalière et cumulée des inscrits
            </p>
          </div>
          <div className="p-6 pt-0 h-[280px]">
            {trendChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCumul" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis dataKey="date" stroke={axisColor} fontSize={9} tickLine={false} />
                  <YAxis stroke={axisColor} fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', color: isDarkMode ? '#d6d3d1' : '#44403c' }} />
                  <Area name="Cumul Inscrits" type="monotone" dataKey="Cumul Inscrits" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCumul)" />
                  <Area name="Inscriptions par jour" type="monotone" dataKey="Inscriptions" stroke="#10b981" strokeWidth={1.5} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs font-bold text-stone-400">Aucune donnée disponible pour les filtres actifs</div>
            )}
          </div>
        </div>

        {/* CHART: Format breakdown (Pie chart) */}
        <div className="lg:col-span-4 rounded-3xl border border-stone-200/60 dark:border-stone-850 bg-white dark:bg-stone-900 shadow-sm flex flex-col">
          <div className="py-4 px-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Format de formation
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Répartition Présentiel vs Online (cliquez pour filtrer)
            </p>
          </div>
          <div className="p-6 pt-0 h-[280px] flex flex-col items-center justify-center relative flex-1">
            {formatChartData.length > 0 ? (
              <>
                <div className="w-full h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={formatChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                        onClick={(data) => handleChartClick('format', data.name)}
                        className="cursor-pointer focus:outline-none"
                      >
                        {formatChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getFormatColor(entry.name)} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} inscrits`, 'Format']} contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Labels Legend */}
                <div className="flex gap-4 mt-2">
                  {formatChartData.map((item, idx) => (
                    <div 
                      key={item.name} 
                      onClick={() => handleChartClick('format', item.name)}
                      className={`flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity px-2 py-1 rounded-lg ${
                        selectedFormat.toLowerCase() === (item.name.toLowerCase() === 'présentiel' ? 'presentiel' : 'online') 
                          ? 'bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-200 dark:ring-stone-700' 
                          : ''
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getFormatColor(item.name) }} />
                      <span className="text-[10px] font-black text-stone-600 dark:text-stone-400">
                        {item.name} ({((item.value / kpiStats.totalCount) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-xs font-bold text-stone-400">Aucune donnée disponible</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART: Group Saturation */}
        <div className="lg:col-span-6 rounded-3xl border border-stone-200/60 dark:border-stone-850 bg-white dark:bg-stone-900 shadow-sm">
          <div className="py-4 px-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Occupation des Groupes (G1, G2, G3)
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Remplissage dynamique comparé à la capacité maximale (20 places)
            </p>
          </div>
          <div className="p-6 pt-0 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" stroke={axisColor} fontSize={9} tickLine={false} />
                <YAxis stroke={axisColor} fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', color: isDarkMode ? '#d6d3d1' : '#44403c' }} />
                <Bar name="Inscrits Totaux" dataKey="Inscrits Totaux" fill="#8b5cf6" radius={[4, 4, 0, 0]} onClick={(data) => handleChartClick('group', data.name)} className="cursor-pointer" />
                <Bar name="Inscrits Confirmés" dataKey="Inscrits Confirmés" fill="#10b981" radius={[4, 4, 0, 0]} onClick={(data) => handleChartClick('group', data.name)} className="cursor-pointer" />
                <Bar name="Capacité max" dataKey="Capacité" fill={isDarkMode ? '#292524' : '#e7e5e4'} radius={[4, 4, 0, 0]} className="opacity-45" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART: Geographic ranking */}
        <div className="lg:col-span-6 rounded-3xl border border-stone-200/60 dark:border-stone-850 bg-white dark:bg-stone-900 shadow-sm">
          <div className="py-4 px-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Provenance Géographique
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Classement par pays des inscrits (cliquez pour filtrer)
            </p>
          </div>
          <div className="p-6 pt-0 h-[250px]">
            {geographicChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geographicChartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                  <XAxis type="number" stroke={axisColor} fontSize={9} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke={axisColor} fontSize={9} tickLine={false} width={80} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Inscrits" onClick={(data) => handleChartClick('country', data.name)} className="cursor-pointer">
                    {geographicChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCountryColor(index)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs font-bold text-stone-400">Aucune donnée géographique disponible</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART: Acquisition Channels (Donut Chart) */}
        <div className="lg:col-span-6 rounded-3xl border border-stone-200/60 dark:border-stone-850 bg-white dark:bg-stone-900 shadow-sm flex flex-col">
          <div className="py-4 px-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Canaux d'Acquisition (Source)
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              D'où proviennent vos inscrits (cliquez pour filtrer)
            </p>
          </div>
          <div className="p-6 pt-0 h-[250px] flex flex-col md:flex-row items-center justify-center gap-4 flex-1">
            {sourceChartData.length > 0 ? (
              <>
                <div className="w-full md:w-1/2 h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                        onClick={(data) => handleChartClick('source', data.name)}
                        className="cursor-pointer focus:outline-none"
                      >
                        {sourceChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getSourceColor(entry.name, index)} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} inscrits`, 'Canal']} contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Labels List */}
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-2 overflow-y-auto max-h-[200px]">
                  {sourceChartData.map((item, idx) => (
                    <div 
                      key={item.name} 
                      onClick={() => handleChartClick('source', item.name)}
                      className={`flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity px-1.5 py-0.5 rounded ${
                        selectedSource.toLowerCase() === item.name.toLowerCase() 
                          ? 'bg-stone-100 dark:bg-stone-850 ring-1 ring-stone-200 dark:ring-stone-700' 
                          : ''
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: getSourceColor(item.name, idx) }} />
                      <span className="text-[10px] font-bold text-stone-600 dark:text-stone-400 truncate" title={item.name}>
                        {item.name}: {item.value} ({((item.value / kpiStats.totalCount) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-xs font-bold text-stone-400">Aucune donnée disponible</div>
            )}
          </div>
        </div>

        {/* CHART: Profile Types */}
        <div className="lg:col-span-6 rounded-3xl border border-stone-200/60 dark:border-stone-850 bg-white dark:bg-stone-900 shadow-sm">
          <div className="py-4 px-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Typologie de Profil
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Comparaison Cadre, Freelance, Étudiant... (cliquez pour filtrer)
            </p>
          </div>
          <div className="p-6 pt-0 h-[250px]">
            {profileChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profileChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis dataKey="name" stroke={axisColor} fontSize={9} tickLine={false} />
                  <YAxis stroke={axisColor} fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar name="Inscrits" dataKey="count" radius={[4, 4, 0, 0]} onClick={(data) => handleChartClick('profile', data.name)} className="cursor-pointer">
                    {profileChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getProfileColor(entry.name)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs font-bold text-stone-400">Aucune donnée disponible</div>
            )}
          </div>
        </div>
      </div>

      {/* DETAILED DRAWERS PANEL */}
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
              className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 z-[101] shadow-2xl p-0 overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white text-base font-black shadow-lg shadow-indigo-500/20 flex-shrink-0">
                      {selectedParticipant.first_name[0]}{selectedParticipant.last_name[0]}
                    </div>
                    <div>
                      <h2 className="text-lg font-black tracking-tight text-stone-900 dark:text-stone-100">
                        {selectedParticipant.first_name} {selectedParticipant.last_name}
                      </h2>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold text-[10px] tracking-widest uppercase">
                        {selectedParticipant.profile_type} • {detectGender(selectedParticipant.first_name) === 'F' ? 'Femme' : 'Homme'}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedParticipant(null)}
                    variant="ghost"
                    className="w-9 h-9 p-0 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                  </Button>
                </div>

                {/* Information Sections */}
                <div className="space-y-6">
                  {/* Contact */}
                  <section className="space-y-3">
                    <h4 className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      Profil & Contact
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50">
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Email & Téléphone</p>
                        <p className="font-bold text-xs text-stone-900 dark:text-stone-100 break-all">{selectedParticipant.email}</p>
                        <p className="font-bold text-xs text-stone-900 dark:text-stone-100 mt-0.5">{selectedParticipant.phone || 'N/A'}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50">
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Entreprise & Poste</p>
                        <p className="font-bold text-xs text-stone-900 dark:text-stone-100">
                          {selectedParticipant.company || 'Indépendant'} <span className="text-indigo-500/30 mx-2">•</span> {selectedParticipant.position || 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50">
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Pays</p>
                          <p className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> {parseMetadata(selectedParticipant.message).country}
                          </p>
                        </div>
                        <div className="flex-1 p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50">
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider mb-1">Format</p>
                          <p className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-2">
                            <Laptop className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> {parseMetadata(selectedParticipant.message).format}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Financial Status */}
                  <section className="space-y-3">
                    <h4 className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      État Financier
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Frais d'inscription (30.000 F)", isPaid: selectedParticipant.registrations?.[0]?.registration_fee_paid },
                        { label: 'Frais de formation (125.000 F)', isPaid: selectedParticipant.registrations?.[0]?.training_fee_paid }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/50">
                          <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{item.label}</span>
                          <Badge className={item.isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-stone-50 text-stone-550 border border-stone-200 dark:bg-stone-850 dark:text-stone-400 dark:border-stone-750'}>
                            {item.isPaid ? 'Payé' : 'En attente'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Group & Program */}
                  <section className="space-y-3">
                    <h4 className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      Affectation de Programme
                    </h4>
                    <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs">
                      <p className="font-black text-stone-900 dark:text-stone-100 text-sm">
                        {selectedParticipant.registrations?.[0]?.groups?.name || 'Groupe non assigné'}
                      </p>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mt-0.5">
                        {selectedParticipant.registrations?.[0]?.groups?.time_slot || 'Créneau horaire non défini'}
                      </p>
                      <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-500/20 text-[9px] font-black text-stone-450 dark:text-stone-400 uppercase tracking-widest">
                        Acquisition via: {selectedParticipant.source}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
