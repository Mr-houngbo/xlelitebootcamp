'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Phone, Mail, MessageCircle, CheckCircle, XCircle,
  Clock, Search, ChevronDown, ChevronUp, DollarSign,
  Zap, PhoneCall, AlertCircle, RefreshCw,
} from 'lucide-react';

interface Registration {
  id: string;
  payment_status: string;
  registration_fee_paid: boolean;
  training_fee_paid: boolean;
  registration_fee_amount: number;
  training_fee_amount: number;
  total_amount: number;
  payment_reference?: string;
  notes?: string;
  group_id?: string;
}

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  profile_type?: string;
  company?: string;
  position?: string;
  status: string;
  message?: string;
  source: string;
  created_at: string;
  registrations?: Registration[];
}

type PaymentAction = 'paid_full' | 'pending' | null;

// Fetch all participants with their registrations (via server-side API)
async function fetchParticipantsAPI(): Promise<Participant[]> {
  const res = await fetch('/api/admin/participants', { cache: 'no-store' });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.data || [];
}

// Update a registration payment status (via server-side API)
async function updateRegistration(id: string, payload: Record<string, any>) {
  const res = await fetch('/api/admin/registrations', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, payload }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json;
}

// Update a participant (via server-side API)
async function updateParticipant(id: string, payload: Record<string, any>) {
  const res = await fetch('/api/admin/participants', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, payload }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json;
}

function parseMetadata(message?: string) {
  const country = message?.match(/\[PAYS:\s*(.*?)\]/)?.[1] || 'N/A';
  const format = message?.match(/\[FORMAT:\s*(.*?)\]/)?.[1] || 'N/A';
  return { country, format };
}

export default function CallsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterPay, setFilterPay] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [paymentAction, setPaymentAction] = useState<Record<string, PaymentAction>>({});
  const [paymentNote, setPaymentNote] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saveError, setSaveError] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState<Record<string, boolean>>({});
  
  const [cancelParticipant, setCancelParticipant] = useState<Participant | null>(null);
  const [cancelConfirmText, setCancelConfirmText] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchParticipantsAPI();
      setParticipants(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    // Poll every 20 seconds
    const interval = setInterval(fetchAll, 20_000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const handleSavePayment = async (participant: Participant) => {
    const reg = participant.registrations?.[0];
    if (!reg) return;
    const action = paymentAction[participant.id];
    if (!action) return;

    setSaving(s => ({ ...s, [participant.id]: true }));
    setSaveError(s => ({ ...s, [participant.id]: '' }));
    setSaveSuccess(s => ({ ...s, [participant.id]: false }));

    try {
      const regPayload =
        action === 'paid_full'
          ? {
              registration_fee_paid: true,
              training_fee_paid: true,
              payment_status: 'paid',
              notes: paymentNote[participant.id] || reg.notes || null,
            }
          : {
              registration_fee_paid: false,
              training_fee_paid: false,
              payment_status: 'pending',
              notes: paymentNote[participant.id] || reg.notes || null,
            };

      await updateRegistration(reg.id, regPayload);

      if (action === 'paid_full') {
        await updateParticipant(participant.id, { status: 'confirmed' });
      }

      setSaveSuccess(s => ({ ...s, [participant.id]: true }));
      setPaymentAction(s => ({ ...s, [participant.id]: null }));
      await fetchAll();

      // Clear success after 3s
      setTimeout(() => setSaveSuccess(s => ({ ...s, [participant.id]: false })), 3000);
    } catch (e: any) {
      setSaveError(s => ({ ...s, [participant.id]: e.message }));
    } finally {
      setSaving(s => ({ ...s, [participant.id]: false }));
    }
  };

  const handleCancelPayment = async () => {
    if (!cancelParticipant || !cancelParticipant.registrations?.[0]) return;
    const reg = cancelParticipant.registrations[0];
    const expectedName = `${cancelParticipant.first_name} ${cancelParticipant.last_name}`;
    
    if (cancelConfirmText.trim().toLowerCase() !== expectedName.toLowerCase()) {
      alert("Le nom saisi ne correspond pas.");
      return;
    }

    setIsCancelling(true);
    try {
      await updateRegistration(reg.id, {
        payment_status: 'pending',
        registration_fee_paid: false,
        training_fee_paid: false,
        notes: `[Paiement annulé] ${reg.notes || ''}`
      });

      setCancelParticipant(null);
      setCancelConfirmText('');
      await fetchAll();
    } catch (e: any) {
      alert("Erreur lors de l'annulation : " + e.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const getPayStatus = (reg?: Registration) => {
    if (!reg) return { label: 'Non inscrit', color: 'text-slate-400', bg: 'bg-slate-50 border-slate-200', paid: false };
    if (reg.payment_status === 'paid') return { label: 'Payé ✓', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', paid: true };
    return { label: 'Non payé', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', paid: false };
  };

  const filtered = participants.filter(p => {
    const q = `${p.first_name} ${p.last_name} ${p.email} ${p.phone || ''}`.toLowerCase();
    const matchSearch = q.includes(search.toLowerCase());
    const reg = p.registrations?.[0];
    const matchPay =
      filterPay === 'all' ? true
      : filterPay === 'paid' ? reg?.payment_status === 'paid'
      : reg?.payment_status !== 'paid';
    return matchSearch && matchPay;
  });

  const total = participants.length;
  const paid = participants.filter(p => p.registrations?.[0]?.payment_status === 'paid').length;
  const pending = total - paid;

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            Call Center <span className="text-orange-500">.</span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            Contactez et convertissez chaque prospect en client confirmé.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-orange-50 border border-orange-100 shadow-sm">
            <PhoneCall className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-black text-orange-600">{pending} appels restants</span>
          </div>
          <button
            onClick={fetchAll}
            className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Global error */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <p className="text-sm font-bold text-red-400">{error}</p>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total inscrits', value: total, icon: <Phone className="w-4 h-4" />, color: 'text-slate-900', bg: 'bg-white border-slate-100 shadow-sm' },
          { label: 'Payés', value: paid, icon: <CheckCircle className="w-4 h-4" />, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100 shadow-sm' },
          { label: 'Non payés', value: pending, icon: <Clock className="w-4 h-4" />, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100 shadow-sm' },
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-3xl border flex items-center gap-4 ${stat.bg}`}>
            <div className={stat.color}>{stat.icon}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Rechercher par nom, email, téléphone..."
            className="pl-12 py-6 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-orange-500 font-bold text-slate-900"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'Tous' },
            { key: 'paid', label: '✅ Payés' },
            { key: 'pending', label: '⏳ Non payés' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterPay(f.key)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border shadow-sm ${
                filterPay === f.key
                  ? 'bg-orange-500 text-white border-orange-400 shadow-orange-500/20'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 border-4 border-orange-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Participant Cards */}
      {!loading && (
        <div className="space-y-3">
          {filtered.map((p, i) => {
            const reg = p.registrations?.[0];
            const payStatus = getPayStatus(reg);
            const { country, format } = parseMetadata(p.message);
            const isExpanded = expandedId === p.id;
            const action = paymentAction[p.id];

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className={`rounded-[2rem] border transition-all overflow-hidden ${
                  isExpanded ? 'border-orange-200 bg-white shadow-[0_8px_30px_rgb(249,115,22,0.06)]' : 'border-slate-100 bg-white hover:bg-slate-50 hover:shadow-sm'
                }`}
              >
                {/* Card Header */}
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                >
                  {/* Avatar + Identity */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0 ${
                      payStatus.paid ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}>
                      {p.first_name[0]}{p.last_name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base">{p.first_name} {p.last_name}</p>
                      <p className="text-[11px] text-slate-500">
                        {p.phone || 'Tél. non renseigné'} · <span className="text-orange-500/70">{country}</span> · {format}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center gap-4 md:gap-8">
                    <Badge className={`border text-[10px] font-black uppercase tracking-widest px-3 py-1 ${payStatus.bg} ${payStatus.color}`}>
                      {payStatus.label}
                    </Badge>
                    {saveSuccess[p.id] && (
                      <span className="text-emerald-400 text-[11px] font-black animate-pulse">✓ Enregistré</span>
                    )}
                  </div>

                  {/* Contact buttons + expand */}
                  <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                    {p.phone && (
                      <a href={`tel:${p.phone}`}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all group shadow-sm"
                        title="Appel Direct">
                        <Phone className="w-4 h-4 text-slate-400 group-hover:text-white" />
                      </a>
                    )}
                    {p.phone && (
                      <a href={`https://wa.me/${p.phone.replace(/\D/g, '')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all group shadow-sm"
                        title="WhatsApp">
                        <MessageCircle className="w-4 h-4 text-slate-400 group-hover:text-white" />
                      </a>
                    )}
                    <a href={`mailto:${p.email}`}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all group shadow-sm"
                      title="Email">
                      <Mail className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </a>
                    <div
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
                      onClick={() => setExpandedId(isExpanded ? null : p.id)}>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-8 border-t border-slate-100 pt-6 space-y-6">
                        {/* Contact info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: 'Email', value: p.email },
                            { label: 'Téléphone', value: p.phone || 'Non renseigné' },
                            { label: 'Profil', value: p.profile_type || 'N/A' },
                            { label: 'Source', value: p.source },
                          ].map((item, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">{item.label}</p>
                              <p className="font-bold text-slate-900 text-sm truncate">{item.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Current payment state */}
                        {reg ? (
                          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap gap-6 items-center">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Inscription (25 000 F)</p>
                              <div className={`flex items-center gap-2 text-sm font-bold ${reg.registration_fee_paid ? 'text-emerald-600' : 'text-slate-500'}`}>
                                {reg.registration_fee_paid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                {reg.registration_fee_paid ? 'Payé' : 'Non payé'}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Formation (125 000 F)</p>
                              <div className={`flex items-center gap-2 text-sm font-bold ${reg.training_fee_paid ? 'text-emerald-600' : 'text-slate-500'}`}>
                                {reg.training_fee_paid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                {reg.training_fee_paid ? 'Payé' : 'Non payé'}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">Statut global</p>
                              <Badge className={`text-[10px] font-black border ${payStatus.bg} ${payStatus.color}`}>{payStatus.label}</Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-400 text-sm font-bold">
                            ⚠️ Ce participant n'a pas encore de fiche d'inscription dans la base.
                          </div>
                        )}

                        {/* Payment Action Panel — only if registration exists */}
                        {reg && (
                          <div className="space-y-4">
                            {reg.payment_status === 'paid' ? (
                               <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-bold flex justify-between items-center shadow-sm">
                                  <div className="flex items-center gap-2">
                                     <CheckCircle className="w-5 h-5" />
                                     <span>Paiement validé et enregistré.</span>
                                  </div>
                                  <button onClick={() => setCancelParticipant(p)} className="px-4 py-2 rounded-xl bg-white border border-red-100 text-red-500 text-xs hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm">
                                     Annuler le paiement
                                  </button>
                               </div>
                            ) : (
                               <>
                                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                                   <DollarSign className="w-3 h-3 text-orange-500" /> Valider le paiement
                                 </p>

                                 {/* 2 buttons */}
                                 <div className="grid grid-cols-2 gap-3">
                                   <button
                                     onClick={() => setPaymentAction(s => ({ ...s, [p.id]: 'paid_full' }))}
                                     className={`py-4 px-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all ${
                                       action === 'paid_full'
                                         ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20 scale-[1.02]'
                                         : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm'
                                     }`}
                                   >
                                     ✅ A payé
                                   </button>
                                   <button
                                     onClick={() => setPaymentAction(s => ({ ...s, [p.id]: 'pending' }))}
                                     className={`py-4 px-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all ${
                                       action === 'pending'
                                         ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20 scale-[1.02]'
                                         : 'bg-white text-slate-500 border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 shadow-sm'
                                     }`}
                                   >
                                     ❌ N'a pas payé
                                   </button>
                                 </div>

                                 {/* Note */}
                                 <AnimatePresence>
                                   {action && (
                                     <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                                       <Input
                                         placeholder="Note optionnelle (ex: Mobile Money ref. #123, reçu le...)"
                                         className="py-5 rounded-2xl bg-white border-slate-200 focus:border-orange-500/50 shadow-sm"
                                         value={paymentNote[p.id] || ''}
                                         onChange={e => setPaymentNote(s => ({ ...s, [p.id]: e.target.value }))}
                                       />
                                     </motion.div>
                                   )}
                                 </AnimatePresence>
                               </>
                            )}
                            {/* Error display */}
                            {saveError[p.id] && (
                              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                <p className="text-xs text-red-400 font-bold">{saveError[p.id]}</p>
                              </div>
                            )}

                            {/* Confirm button */}
                            <AnimatePresence>
                              {action && (
                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}>
                                  <Button
                                    onClick={() => handleSavePayment(p)}
                                    disabled={saving[p.id]}
                                    className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-500 font-black uppercase tracking-[0.2em] text-sm shadow-lg shadow-orange-600/20 transition-all disabled:opacity-50"
                                  >
                                    {saving[p.id] ? (
                                      <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Enregistrement en cours...
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" /> Confirmer & Enregistrer
                                      </span>
                                    )}
                                  </Button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {!loading && filtered.length === 0 && (
            <div className="py-24 text-center text-slate-600 italic">
              {participants.length === 0
                ? 'Aucun participant dans la base de données.'
                : 'Aucun participant ne correspond à ces critères.'}
            </div>
          )}
        </div>
      )}

      {/* Cancel Payment Modal */}
      <AnimatePresence>
        {cancelParticipant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-8 rounded-3xl bg-white border border-slate-100 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Annuler le paiement ?</h3>
              <p className="text-sm font-bold text-slate-500 mb-6 leading-relaxed">
                Vous êtes sur le point de marquer <span className="text-slate-900 font-black">{cancelParticipant.first_name} {cancelParticipant.last_name}</span> comme "Non payé". 
                Veuillez taper son nom complet ci-dessous pour confirmer cette action irréversible.
              </p>
              
              <Input 
                placeholder={`Tapez "${cancelParticipant.first_name} ${cancelParticipant.last_name}"`}
                value={cancelConfirmText}
                onChange={e => setCancelConfirmText(e.target.value)}
                className="mb-6 h-12 bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500/20 font-bold text-slate-900"
              />

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl text-slate-600 font-bold"
                  onClick={() => {
                    setCancelParticipant(null);
                    setCancelConfirmText('');
                  }}
                  disabled={isCancelling}
                >
                  Fermer
                </Button>
                <Button 
                  className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                  disabled={isCancelling || cancelConfirmText.trim().toLowerCase() !== `${cancelParticipant.first_name} ${cancelParticipant.last_name}`.toLowerCase()}
                  onClick={handleCancelPayment}
                >
                  {isCancelling ? 'Annulation...' : 'Confirmer'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
