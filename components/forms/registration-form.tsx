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

  const InputClass = "w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all shadow-sm";
  const LabelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-lg mb-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-orange/10"></div>
           <span className="text-gray-900 font-extrabold tracking-tighter z-10 text-2xl">XL</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Rejoignez <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">l'Élite</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          Session du{' '}
          <span className="text-gray-900 font-bold">
            09 Juin
          </span>
          {' '}au{' '}
          <span className="text-gray-900 font-bold">
            13 Juin 2026
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Informations Personnelles */}
        <div className="glass-card p-8 sm:p-10 border border-gray-100/50 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Informations Personnelles
          </h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={LabelClass}>Prénom *</label>
                <input
                  {...register('firstName')}
                  type="text"
                  className={InputClass}
                  placeholder="Votre prénom"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className={LabelClass}>Nom *</label>
                <input
                  {...register('lastName')}
                  type="text"
                  className={InputClass}
                  placeholder="Votre nom"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className={LabelClass}>Email *</label>
              <input
                {...register('email')}
                type="email"
                className={InputClass}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className={LabelClass}>Téléphone *</label>
              <input
                {...register('phone')}
                type="tel"
                className={InputClass}
                placeholder="+226 XX XX XX XX"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={LabelClass}>Pays *</label>
                <select
                  {...register('country')}
                  className={InputClass}
                >
                  <option value="">Sélectionnez votre pays</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option disabled>────────────────────</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Afrique du Sud">Afrique du Sud</option>
                  <option value="Albanie">Albanie</option>
                  <option value="Algérie">Algérie</option>
                  <option value="Allemagne">Allemagne</option>
                  <option value="Andorre">Andorre</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctique">Antarctique</option>
                  <option value="Antigua-et-Barbuda">Antigua-et-Barbuda</option>
                  <option value="Arabie Saoudite">Arabie Saoudite</option>
                  <option value="Argentine">Argentine</option>
                  <option value="Arménie">Arménie</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australie">Australie</option>
                  <option value="Autriche">Autriche</option>
                  <option value="Azerbaïdjan">Azerbaïdjan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahreïn">Bahreïn</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbade">Barbade</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Belize">Belize</option>
                  <option value="Bénin">Bénin</option>
                  <option value="Bermudes">Bermudes</option>
                  <option value="Bhoutan">Bhoutan</option>
                  <option value="Biélorussie">Biélorussie</option>
                  <option value="Bolivie">Bolivie</option>
                  <option value="Bosnie-Herzégovine">Bosnie-Herzégovine</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Brésil">Brésil</option>
                  <option value="Brunei">Brunei</option>
                  <option value="Bulgarie">Bulgarie</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodge">Cambodge</option>
                  <option value="Cameroun">Cameroun</option>
                  <option value="Canada">Canada</option>
                  <option value="Cap-Vert">Cap-Vert</option>
                  <option value="Chili">Chili</option>
                  <option value="Chine">Chine</option>
                  <option value="Chypre">Chypre</option>
                  <option value="Colombie">Colombie</option>
                  <option value="Comores">Comores</option>
                  <option value="Congo-Brazzaville">Congo-Brazzaville</option>
                  <option value="Congo-Kinshasa">Congo-Kinshasa</option>
                  <option value="Corée du Nord">Corée du Nord</option>
                  <option value="Corée du Sud">Corée du Sud</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                  <option value="Croatie">Croatie</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Curaçao">Curaçao</option>
                  <option value="Danemark">Danemark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominique">Dominique</option>
                  <option value="Égypte">Égypte</option>
                  <option value="Émirats arabes unis">Émirats arabes unis</option>
                  <option value="Équateur">Équateur</option>
                  <option value="Érythrée">Érythrée</option>
                  <option value="Espagne">Espagne</option>
                  <option value="Estonie">Estonie</option>
                  <option value="Eswatini">Eswatini</option>
                  <option value="États-Unis">États-Unis</option>
                  <option value="Éthiopie">Éthiopie</option>
                  <option value="Fidji">Fidji</option>
                  <option value="Finlande">Finlande</option>
                  <option value="France">France</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambie">Gambie</option>
                  <option value="Géorgie">Géorgie</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Grèce">Grèce</option>
                  <option value="Grenade">Grenade</option>
                  <option value="Groenland">Groenland</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernesey">Guernesey</option>
                  <option value="Guinée">Guinée</option>
                  <option value="Guinée équatoriale">Guinée équatoriale</option>
                  <option value="Guinée-Bissau">Guinée-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Guyane française">Guyane française</option>
                  <option value="Haïti">Haïti</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hongrie">Hongrie</option>
                  <option value="Île de Man">Île de Man</option>
                  <option value="Îles Caïmans">Îles Caïmans</option>
                  <option value="Îles Cook">Îles Cook</option>
                  <option value="Îles Féroé">Îles Féroé</option>
                  <option value="Îles Malouines">Îles Malouines</option>
                  <option value="Îles Marshall">Îles Marshall</option>
                  <option value="Îles Salomon">Îles Salomon</option>
                  <option value="Îles Vierges britanniques">Îles Vierges britanniques</option>
                  <option value="Îles Vierges des États-Unis">Îles Vierges des États-Unis</option>
                  <option value="Inde">Inde</option>
                  <option value="Indonésie">Indonésie</option>
                  <option value="Irak">Irak</option>
                  <option value="Iran">Iran</option>
                  <option value="Irlande">Irlande</option>
                  <option value="Islande">Islande</option>
                  <option value="Israël">Israël</option>
                  <option value="Italie">Italie</option>
                  <option value="Jamaïque">Jamaïque</option>
                  <option value="Japon">Japon</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordanie">Jordanie</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kirghizistan">Kirghizistan</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Koweït">Koweït</option>
                  <option value="Laos">Laos</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Lettonie">Lettonie</option>
                  <option value="Liban">Liban</option>
                  <option value="Libéria">Libéria</option>
                  <option value="Libye">Libye</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lituanie">Lituanie</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macédoine du Nord">Macédoine du Nord</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malaisie">Malaisie</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malte">Malte</option>
                  <option value="Maroc">Maroc</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Maurice">Maurice</option>
                  <option value="Mauritanie">Mauritanie</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexique">Mexique</option>
                  <option value="Micronésie">Micronésie</option>
                  <option value="Moldavie">Moldavie</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolie">Mongolie</option>
                  <option value="Monténégro">Monténégro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar (Birmanie)">Myanmar (Birmanie)</option>
                  <option value="Namibie">Namibie</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Népal">Népal</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigéria">Nigéria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norvège">Norvège</option>
                  <option value="Nouvelle-Calédonie">Nouvelle-Calédonie</option>
                  <option value="Nouvelle-Zélande">Nouvelle-Zélande</option>
                  <option value="Oman">Oman</option>
                  <option value="Ouganda">Ouganda</option>
                  <option value="Ouzbékistan">Ouzbékistan</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palaos">Palaos</option>
                  <option value="Palestine">Palestine</option>
                  <option value="Panama">Panama</option>
                  <option value="Papouasie-Nouvelle-Guinée">Papouasie-Nouvelle-Guinée</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Pays-Bas">Pays-Bas</option>
                  <option value="Pérou">Pérou</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pologne">Pologne</option>
                  <option value="Polynésie française">Polynésie française</option>
                  <option value="Porto Rico">Porto Rico</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Qatar">Qatar</option>
                  <option value="République centrafricaine">République centrafricaine</option>
                  <option value="République dominicaine">République dominicaine</option>
                  <option value="République tchèque">République tchèque</option>
                  <option value="Réunion">Réunion</option>
                  <option value="Roumanie">Roumanie</option>
                  <option value="Royaume-Uni">Royaume-Uni</option>
                  <option value="Russie">Russie</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Sahara occidental">Sahara occidental</option>
                  <option value="Saint-Barthélemy">Saint-Barthélemy</option>
                  <option value="Saint-Christophe-et-Niévès">Saint-Christophe-et-Niévès</option>
                  <option value="Saint-Marin">Saint-Marin</option>
                  <option value="Saint-Martin">Saint-Martin</option>
                  <option value="Saint-Pierre-et-Miquelon">Saint-Pierre-et-Miquelon</option>
                  <option value="Saint-Vincent-et-les-Grenadines">Saint-Vincent-et-les-Grenadines</option>
                  <option value="Sainte-Hélène">Sainte-Hélène</option>
                  <option value="Sainte-Lucie">Sainte-Lucie</option>
                  <option value="Salvador">Salvador</option>
                  <option value="Samoa">Samoa</option>
                  <option value="Samoa américaines">Samoa américaines</option>
                  <option value="Sao Tomé-et-Principe">Sao Tomé-et-Principe</option>
                  <option value="Sénégal">Sénégal</option>
                  <option value="Serbie">Serbie</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapour">Singapour</option>
                  <option value="Slovaquie">Slovaquie</option>
                  <option value="Slovénie">Slovénie</option>
                  <option value="Somalie">Somalie</option>
                  <option value="Soudan">Soudan</option>
                  <option value="Soudan du Sud">Soudan du Sud</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Suède">Suède</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Syrie">Syrie</option>
                  <option value="Tadjikistan">Tadjikistan</option>
                  <option value="Taïwan">Taïwan</option>
                  <option value="Tanzanie">Tanzanie</option>
                  <option value="Tchad">Tchad</option>
                  <option value="Thaïlande">Thaïlande</option>
                  <option value="Timor oriental">Timor oriental</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinité-et-Tobago">Trinité-et-Tobago</option>
                  <option value="Tunisie">Tunisie</option>
                  <option value="Turkménistan">Turkménistan</option>
                  <option value="Turquie">Turquie</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Vatican">Vatican</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viêt Nam">Viêt Nam</option>
                  <option value="Wallis-et-Futuna">Wallis-et-Futuna</option>
                  <option value="Yémen">Yémen</option>
                  <option value="Zambie">Zambie</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
              </div>

              <div>
                <label className={LabelClass}>Format souhaité *</label>
                <div className="flex gap-4 h-[50px]">
                  <label className={`flex-1 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all ${watch('format') === 'presentiel' ? 'border-brand-green bg-brand-green/5 font-bold' : 'border-gray-200'}`}>
                    <input type="radio" value="presentiel" {...register('format')} className="hidden" />
                    Présentiel
                  </label>
                  <label className={`flex-1 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all ${watch('format') === 'online' ? 'border-brand-green bg-brand-green/5 font-bold' : 'border-gray-200'}`}>
                    <input type="radio" value="online" {...register('format')} className="hidden" />
                    Online
                  </label>
                </div>
                {errors.format && <p className="text-red-500 text-sm mt-1">{errors.format.message}</p>}
              </div>
            </div>

          </div>
        </div>

        {/* Sélection du Groupe */}
        <div className="glass-card p-8 sm:p-10 border border-gray-100/50 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Choisissez votre groupe *
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {groups.map((group) => {
              const isFull = group.current_capacity >= group.max_capacity;
              const isSelected = selectedGroup === group.id;
              
              return (
                <div
                  key={group.id}
                  onClick={() => !isFull && handleGroupSelect(group.id)}
                  className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isFull
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'border-brand-green bg-brand-green/5 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-105'
                      : 'border-gray-200 hover:border-brand-green/50 hover:bg-slate-50'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 bg-brand-green text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg font-bold">
                      ✓
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-gray-900">{group.name}</h3>
                    {isFull ? (
                      <Badge variant="destructive">Complet</Badge>
                    ) : isSelected ? (
                      <Badge className="bg-brand-green text-white">Sélectionné</Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-300 text-gray-600">
                        {group.max_capacity - group.current_capacity} places
                      </Badge>
                    )}
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100 mb-3 text-center shadow-sm">
                    <p className="text-gray-900 font-bold">{group.time_slot}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-500 text-center">
                    {group.current_capacity}/{group.max_capacity} participants
                  </div>
                </div>
              );
            })}
          </div>
          {errors.groupId && <p className="text-red-500 text-sm mt-4 font-medium">{errors.groupId.message}</p>}
          <input {...register('groupId')} type="hidden" />
        </div>

        {/* Profil et Source */}
        <div className="glass-card p-8 sm:p-10 border border-gray-100/50 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Informations Complémentaires
          </h2>
          <div className="space-y-6">
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
              <label className={LabelClass}>Comment avez-vous connu la formation ?</label>
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
        <div className="glass-card p-8 border border-gray-100/50 shadow-md">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                {...register('agreedToTerms')}
                type="checkbox"
                className="mt-1 w-5 h-5 text-brand-green border-gray-300 rounded focus:ring-brand-green focus:ring-2"
              />
              <label className="text-sm text-gray-600 font-medium leading-tight pt-1">
                J'ai lu et j'accepte les{" "}
                <a href="/conditions-generales-de-vente" className="text-brand-green hover:underline font-bold">
                  conditions générales de vente
                </a>
              </label>
            </div>
            {errors.agreedToTerms && <p className="text-red-500 text-sm">{errors.agreedToTerms.message}</p>}
            
            <div className="flex items-start space-x-3">
              <input
                {...register('agreedToPrivacy')}
                type="checkbox"
                className="mt-1 w-5 h-5 text-brand-green border-gray-300 rounded focus:ring-brand-green focus:ring-2"
              />
              <label className="text-sm text-gray-600 font-medium leading-tight pt-1">
                J'ai lu et j'accepte la{" "}
                <a href="/politique-confidentialite" className="text-brand-green hover:underline font-bold">
                  politique de confidentialité
                </a>
              </label>
            </div>
            {errors.agreedToPrivacy && <p className="text-red-500 text-sm">{errors.agreedToPrivacy.message}</p>}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || !selectedGroup}
            className="premium-button w-full sm:w-auto px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] transform hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </span>
            ) : (
              'Valider mon inscription'
            )}
          </Button>
          <p className="mt-6 text-sm text-gray-400 font-semibold uppercase tracking-wider">
            Paiement 100% Sécurisé
          </p>
        </div>
      </form>
    </motion.div>
  );
}
