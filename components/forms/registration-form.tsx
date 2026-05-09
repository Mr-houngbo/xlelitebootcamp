'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { registrationSchema } from '@/lib/validations';
import type { RegistrationFormData } from '@/types/database';
import { createRegistration, getGroups, checkGroupAvailability } from '@/lib/actions/registration';
import { motion } from 'framer-motion';

export function RegistrationForm() {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Groups depuis Supabase avec vrais UUIDs
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les groupes depuis Supabase
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const result = await getGroups();
        
        if (result.success) {
          setGroups(result.data);
        } else {
          // Fallback avec UUIDs simulés
          setGroups([
            { id: '00000000-0000-0000-0000-000000000001', name: 'G1', time_slot: '09h-12h', max_capacity: 20, current_capacity: 0 },
            { id: '00000000-0000-0000-0000-000000000002', name: 'G2', time_slot: '14h-17h', max_capacity: 20, current_capacity: 0 },
            { id: '00000000-0000-0000-0000-000000000003', name: 'G3', time_slot: '18h-21h', max_capacity: 20, current_capacity: 0 },
          ]);
        }
      } catch (error) {
        console.log('Erreur chargement groupes, fallback:', error);
        setGroups([
          { id: '00000000-0000-0000-0000-000000000001', name: 'G1', time_slot: '09h-12h', max_capacity: 20, current_capacity: 0 },
          { id: '00000000-0000-0000-0000-000000000002', name: 'G2', time_slot: '14h-17h', max_capacity: 20, current_capacity: 0 },
          { id: '00000000-0000-0000-0000-000000000003', name: 'G3', time_slot: '18h-21h', max_capacity: 20, current_capacity: 0 },
        ]);
      }
      setIsLoading(false);
    };

    loadGroups();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      profileType: 'cadre',
      source: 'direct',
      agreedToTerms: false,
      agreedToPrivacy: false,
    },
  });

  const watchedGroup = watch('groupId');

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      if (!data.groupId) {
        alert('Veuillez sélectionner un groupe');
        return;
      }

      if (!data.agreedToTerms || !data.agreedToPrivacy) {
        alert('Veuillez accepter les conditions générales et la politique de confidentialité');
        return;
      }

      const result = await createRegistration(data);

      if (result.success) {
        setSubmitSuccess(true);
      } else {
        // Afficher le vrai message d'erreur Supabase
        alert(result.error || 'Une erreur est survenue lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId);
    setValue('groupId', groupId);
    trigger('groupId');
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto glass-card p-12 text-center border-gray-100 shadow-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Chargement des groupes disponibles...</p>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto glass-card p-12 text-center border-gray-100 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green to-brand-orange"></div>
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
          Inscription <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">Réussie !</span>
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Félicitations ! Votre place pour l'élite est réservée. Nous vous contacterons dans les plus brefs délais.
        </p>
        <div className="bg-slate-50 border border-gray-100 p-6 rounded-2xl mb-8 text-left">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Prochaines étapes :</h3>
          <ul className="text-sm space-y-3 font-medium text-gray-600">
            <li className="flex items-center gap-3"><span className="text-brand-green text-xl">✅</span> Confirmation email envoyée</li>
            <li className="flex items-center gap-3"><span className="text-brand-green text-xl">✅</span> Appel téléphonique sous 24h</li>
            <li className="flex items-center gap-3"><span className="text-brand-green text-xl">✅</span> Paiement frais d'inscription (25.000 FCFA)</li>
            <li className="flex items-center gap-3"><span className="text-brand-green text-xl">✅</span> Accès matériel préparatoire</li>
          </ul>
        </div>
        <Button onClick={() => setSubmitSuccess(false)} variant="outline" className="w-full sm:w-auto font-semibold">
          Nouvelle inscription
        </Button>
      </motion.div>
    );
  }

  const InputClass = "w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all shadow-sm text-base"; // text-base = 16px (évite le zoom iOS)
  const LabelClass = "block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2 uppercase tracking-wide";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-1 md:px-0"
    >
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white border border-gray-100 shadow-md mb-4 md:mb-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-orange/10"></div>
           <span className="text-gray-900 font-extrabold tracking-tighter z-10 text-xl md:text-2xl">XL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight leading-tight">
          Rejoignez <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">l'Élite</span>
        </h1>
        <p className="text-sm md:text-xl text-gray-500 max-w-2xl mx-auto font-medium px-4">
          Session du{' '}
          <span className="text-gray-900 font-bold">09 Juin</span>
          {' '}au{' '}
          <span className="text-gray-900 font-bold">13 Juin 2026</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
        {/* Informations Personnelles */}
        <div className="glass-card p-5 md:p-10 border border-gray-100/50 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 pb-3 md:pb-4 border-b border-gray-100">
            Informations Personnelles
          </h2>
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className={LabelClass}>Prénom *</label>
                <input {...register('firstName')} type="text" className={InputClass} placeholder="Votre prénom" />
                {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className={LabelClass}>Nom *</label>
                <input {...register('lastName')} type="text" className={InputClass} placeholder="Votre nom" />
                {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className={LabelClass}>Email *</label>
              <input {...register('email')} type="email" className={InputClass} placeholder="votre.email@exemple.com" />
              {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className={LabelClass}>Téléphone *</label>
                <input {...register('phone')} type="tel" className={InputClass} placeholder="+226 XX XX XX XX" />
                {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className={LabelClass}>Pays *</label>
                <select {...register('country')} className={InputClass}>
                  <option value="">Sélectionnez votre pays</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Mali">Mali</option>
                  <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                  <option value="Niger">Niger</option>
                  <option value="Sénégal">Sénégal</option>
                  <option value="Togo">Togo</option>
                  <option value="Bénin">Bénin</option>
                  <option value="France">France</option>
                  <option value="Autre">Autre...</option>
                </select>
                {errors.country && <p className="text-red-500 text-[10px] mt-1">{errors.country.message}</p>}
              </div>
            </div>

            <div>
              <label className={LabelClass}>Format souhaité *</label>
              <div className="flex gap-3 md:gap-4 h-[44px] md:h-[50px]">
                <label className={`flex-1 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all text-sm md:text-base ${watch('format') === 'presentiel' ? 'border-brand-green bg-brand-green/5 font-bold' : 'border-gray-200'}`}>
                  <input type="radio" value="presentiel" {...register('format')} className="hidden" />
                  Présentiel
                </label>
                <label className={`flex-1 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all text-sm md:text-base ${watch('format') === 'online' ? 'border-brand-green bg-brand-green/5 font-bold' : 'border-gray-200'}`}>
                  <input type="radio" value="online" {...register('format')} className="hidden" />
                  Online
                </label>
              </div>
              {errors.format && <p className="text-red-500 text-[10px] mt-1">{errors.format.message}</p>}
            </div>
          </div>
        </div>

        {/* Sélection du Groupe */}
        <div className="glass-card p-5 md:p-10 border border-gray-100/50 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 pb-3 md:pb-4 border-b border-gray-100">
            Choisissez votre groupe *
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {groups.map((group) => {
              const isFull = group.current_capacity >= group.max_capacity;
              const isSelected = selectedGroup === group.id;
              
              return (
                <div
                  key={group.id}
                  onClick={() => !isFull && handleGroupSelect(group.id)}
                  className={`relative p-5 md:p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isFull
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'border-brand-green bg-brand-green/5 shadow-md'
                      : 'border-gray-200 hover:border-brand-green/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg md:text-xl text-gray-900">{group.name}</h3>
                    {isFull ? (
                      <Badge variant="destructive">Complet</Badge>
                    ) : isSelected ? (
                      <Badge className="bg-brand-green text-white">✓</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">{group.max_capacity - group.current_capacity} places</Badge>
                    )}
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100 mb-2 text-center text-sm md:text-base font-bold text-gray-900">
                    {group.time_slot}
                  </div>
                  <div className="text-[10px] font-medium text-gray-500 text-center">
                    {group.current_capacity}/{group.max_capacity} inscrits
                  </div>
                </div>
              );
            })}
          </div>
          {errors.groupId && <p className="text-red-500 text-[10px] mt-4 font-medium">{errors.groupId.message}</p>}
          <input {...register('groupId')} type="hidden" />
        </div>

        {/* Profil et Source */}
        <div className="glass-card p-5 md:p-10 border border-gray-100/50 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 pb-3 md:pb-4 border-b border-gray-100">
            Profil
          </h2>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className={LabelClass}>Type de profil *</label>
              <select {...register('profileType')} className={InputClass}>
                <option value="cadre">Cadre</option>
                <option value="etudiant">Étudiant</option>
                <option value="freelance">Freelance</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className={LabelClass}>Comment avez-vous connu XL Elite ?</label>
              <select {...register('source')} className={InputClass}>
                <option value="direct">Recherche directe</option>
                <option value="linkedin">LinkedIn</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="referral">Recommandation</option>
                <option value="colleague">Collègue</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="glass-card p-5 border border-gray-100/50 shadow-md">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input {...register('agreedToTerms')} type="checkbox" className="mt-1 w-5 h-5 text-brand-green border-gray-300 rounded focus:ring-brand-green" />
              <label className="text-[11px] md:text-sm text-gray-600 font-medium leading-tight pt-0.5">
                J'accepte les{" "}
                <a href="/conditions-generales-de-vente" className="text-brand-green hover:underline font-bold">conditions générales de vente</a>
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <input {...register('agreedToPrivacy')} type="checkbox" className="mt-1 w-5 h-5 text-brand-green border-gray-300 rounded focus:ring-brand-green" />
              <label className="text-[11px] md:text-sm text-gray-600 font-medium leading-tight pt-0.5">
                J'accepte la{" "}
                <a href="/politique-confidentialite" className="text-brand-green hover:underline font-bold">politique de confidentialité</a>
              </label>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || !selectedGroup}
            className="premium-button w-full px-6 py-6 md:py-8 text-lg md:text-2xl font-bold shadow-xl transition-all duration-300"
          >
            {isSubmitting ? 'Traitement...' : 'Valider mon inscription'}
          </Button>
          <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Paiement 100% Sécurisé
          </p>
        </div>
      </form>
    </motion.div>
  );
}
