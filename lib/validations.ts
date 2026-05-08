import { z } from 'zod';

// ========================================
// FORM VALIDATION SCHEMAS
// ========================================

export const registrationSchema = z.object({
  firstName: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne peut contenir que des lettres'),
  
  lastName: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres'),
  
  email: z.string()
    .email('Adresse email invalide')
    .max(100, 'L\'email ne peut pas dépasser 100 caractères'),
  
  phone: z.string()
    .min(8, 'Le numéro de téléphone doit contenir au moins 8 chiffres')
    .max(20, 'Le numéro de téléphone ne peut pas dépasser 20 caractères')
    .regex(/^[+]?[\d\s-]+$/, 'Numéro de téléphone invalide'),
  
  company: z.string()
    .max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères')
    .optional(),
  
  position: z.string()
    .max(100, 'Le poste ne peut pas dépasser 100 caractères')
    .optional(),
  
  profileType: z.enum(['cadre', 'etudiant', 'freelance', 'autre'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un type de profil' })
  }),
  
  source: z.enum(['direct', 'linkedin', 'facebook', 'instagram', 'referral', 'colleague', 'autre'], {
    errorMap: () => ({ message: 'Veuillez indiquer comment vous nous avez connus' })
  }),
  
  groupId: z.string()
    .min(1, 'Veuillez sélectionner un groupe'),
  
  country: z.string()
    .min(2, 'Le pays est requis'),

  format: z.enum(['online', 'presentiel'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un format' })
  }),
  
  agreedToTerms: z.boolean()
    .refine((val) => val === true, 'Vous devez accepter les conditions générales'),
  
  agreedToPrivacy: z.boolean()
    .refine((val) => val === true, 'Vous devez accepter la politique de confidentialité'),
});

export const loginSchema = z.object({
  email: z.string()
    .email('Adresse email invalide'),
  
  password: z.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export const groupSchema = z.object({
  name: z.string()
    .min(1, 'Le nom du groupe est requis')
    .max(10, 'Le nom du groupe ne peut pas dépasser 10 caractères'),
  
  timeSlot: z.enum(['09h-12h', '14h-17h', '18h-21h'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un créneau horaire valide' })
  }),
  
  maxCapacity: z.number()
    .min(1, 'La capacité minimale est de 1 participant')
    .max(50, 'La capacité maximale est de 50 participants'),
  
  isActive: z.boolean(),
});

export const testimonialSchema = z.object({
  participantName: z.string()
    .min(2, 'Le nom du participant doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  
  company: z.string()
    .max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères')
    .optional(),
  
  position: z.string()
    .max(100, 'Le poste ne peut pas dépasser 100 caractères')
    .optional(),
  
  testimonial: z.string()
    .min(10, 'Le témoignage doit contenir au moins 10 caractères')
    .max(1000, 'Le témoignage ne peut pas dépasser 1000 caractères'),
  
  rating: z.number()
    .min(1, 'La note minimale est 1')
    .max(5, 'La note maximale est 5'),
  
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

export const companySchema = z.object({
  name: z.string()
    .min(1, 'Le nom de l\'entreprise est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  
  website: z.string()
    .url('URL du site web invalide')
    .optional()
    .or(z.literal('')),
  
  description: z.string()
    .max(500, 'La description ne peut pas dépasser 500 caractères')
    .optional(),
  
  isPartner: z.boolean(),
  isActive: z.boolean(),
  participantsTrained: z.number()
    .min(0, 'Le nombre de participants ne peut pas être négatif'),
});

// ========================================
// API VALIDATION SCHEMAS
// ========================================

export const createRegistrationSchema = registrationSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  profileType: true,
  source: true,
  groupId: true,
  country: true,
  format: true,
});

export const updateParticipantStatusSchema = z.object({
  status: z.enum(['lead', 'confirmed', 'cancelled', 'completed']),
  notes: z.string().max(500).optional(),
});

export const updatePaymentStatusSchema = z.object({
  paymentStatus: z.enum(['pending', 'partial', 'paid', 'refunded']),
  registrationFeePaid: z.boolean(),
  trainingFeePaid: z.boolean(),
  paymentMethod: z.enum(['mobile_money', 'bank_transfer', 'cash']).optional(),
  paymentReference: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

// ========================================
// SEARCH & FILTER SCHEMAS
// ========================================

export const participantSearchSchema = z.object({
  search: z.string().max(100).optional(),
  status: z.enum(['lead', 'confirmed', 'cancelled', 'completed']).optional(),
  profileType: z.enum(['cadre', 'etudiant', 'freelance', 'autre']).optional(),
  source: z.enum(['direct', 'linkedin', 'facebook', 'instagram', 'referral', 'email']).optional(),
  groupId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(20),
});

export const analyticsSchema = z.object({
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  groupBy: z.enum(['day', 'week', 'month']).default('day'),
});

// ========================================
// TYPE INFERENCE
// ========================================

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type GroupFormData = z.infer<typeof groupSchema>;
export type TestimonialFormData = z.infer<typeof testimonialSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type CreateRegistrationData = z.infer<typeof createRegistrationSchema>;
export type UpdateParticipantStatusData = z.infer<typeof updateParticipantStatusSchema>;
export type UpdatePaymentStatusData = z.infer<typeof updatePaymentStatusSchema>;
export type ParticipantSearchParams = z.infer<typeof participantSearchSchema>;
export type AnalyticsParams = z.infer<typeof analyticsSchema>;

// ========================================
// CUSTOM VALIDATION FUNCTIONS
// ========================================

export const validateEmailUnique = async (email: string, excludeId?: string) => {
  // Implementation would check against database
  // This is a placeholder for the actual validation logic
  return true;
};

export const validateGroupCapacity = async (groupId: string) => {
  // Implementation would check if group has available capacity
  // This is a placeholder for the actual validation logic
  return true;
};

export const validatePhoneFormat = (phone: string) => {
  // Custom phone validation for Burkina Faso format
  const phoneRegex = /^(\+226)?[2-7]\d{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// ========================================
// ERROR MESSAGES
// ========================================

export const ERROR_MESSAGES = {
  REQUIRED: 'Ce champ est obligatoire',
  INVALID_EMAIL: 'Adresse email invalide',
  INVALID_PHONE: 'Numéro de téléphone invalide',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 6 caractères',
  TERMS_REQUIRED: 'Vous devez accepter les conditions générales',
  PRIVACY_REQUIRED: 'Vous devez accepter la politique de confidentialité',
  GROUP_FULL: 'Ce groupe est complet',
  EMAIL_EXISTS: 'Cette adresse email est déjà utilisée',
  INVALID_DATE: 'Date invalide',
  INVALID_FILE_TYPE: 'Type de fichier non supporté',
  FILE_TOO_LARGE: 'Le fichier est trop volumineux (max 5MB)',
  NETWORK_ERROR: 'Erreur de connexion, veuillez réessayer',
  UNKNOWN_ERROR: 'Une erreur est survenue, veuillez réessayer',
} as const;
