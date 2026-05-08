// ========================================
// DATABASE TYPES (SUPABASE)
// ========================================

export type Database = {
  public: {
    Tables: {
      groups: {
        Row: Group;
        Insert: Omit<Group, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Group>;
      };
      participants: {
        Row: Participant;
        Insert: Omit<Participant, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Participant>;
      };
      registrations: {
        Row: Registration;
        Insert: Omit<Registration, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Registration>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Testimonial>;
      };
      companies: {
        Row: Company;
        Insert: Omit<Company, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Company>;
      };
      gallery: {
        Row: Gallery;
        Insert: Omit<Gallery, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Gallery>;
      };
    };
  };
};

export interface User {
  id: string;
  email: string;
  role: 'admin';
  created_at: string;
  updated_at: string;
}

export interface Group {
  id: string;
  name: string;
  time_slot: '09h-12h' | '14h-17h' | '18h-21h';
  max_capacity: number;
  current_capacity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  profile_type?: 'cadre' | 'etudiant' | 'freelance' | 'autre';
  source: 'direct' | 'linkedin' | 'facebook' | 'instagram' | 'referral' | 'colleague' | 'autre';
  message?: string;
  status: 'lead' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  participant_id: string;
  group_id: string;
  registration_fee_amount: number;
  training_fee_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'partial' | 'paid' | 'refunded';
  registration_fee_paid: boolean;
  training_fee_paid: boolean;
  payment_method?: 'mobile_money' | 'bank_transfer' | 'cash';
  payment_reference?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  participant_name: string;
  participant_photo?: string;
  company?: string;
  position?: string;
  testimonial: string;
  rating: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  is_partner: boolean;
  is_active: boolean;
  participants_trained: number;
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  id: string;
  title: string;
  image_url: string;
  thumbnail_url?: string;
  category: 'training' | 'certification' | 'venue' | 'team';
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  description?: string;
  session_date: string;
  start_time: string;
  end_time: string;
  group_id?: string;
  location: string;
  is_online: boolean;
  meeting_link?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  to_email: string;
  subject: string;
  template_name: string;
  status: 'sent' | 'delivered' | 'bounced' | 'failed';
  sent_at: string;
  error_message?: string;
  metadata?: Record<string, any>;
}

// ========================================
// JOINED TYPES FOR QUERIES
// ========================================

export interface ParticipantWithRegistration extends Participant {
  registrations?: (Registration & {
    groups?: Group;
  })[];
}

export interface RegistrationWithDetails extends Registration {
  participant: Participant;
  group: Group;
}

export interface GroupStats extends Group {
  registrations_count: number;
  paid_count: number;
  fill_rate: number;
  group_revenue?: number;
}

export interface DashboardKPIs {
  total_participants: number;
  paid_participants: number;
  leads: number;
  total_revenue: number;
  conversion_rate: number;
}

export interface FunnelAnalytics {
  date: string;
  total_registrations: number;
  confirmed: number;
  paid: number;
  source: string;
}

// ========================================
// FORM TYPES
// ========================================

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileType: 'cadre' | 'etudiant' | 'freelance' | 'autre';
  source: 'direct' | 'linkedin' | 'facebook' | 'instagram' | 'referral' | 'colleague' | 'autre';
  groupId: string;
  country: string;
  format: 'online' | 'presentiel';
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

// ========================================
// API RESPONSE TYPES
// ========================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ========================================
// COMPONENT PROPS TYPES
// ========================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

export interface FormFieldProps extends BaseComponentProps {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
}

// ========================================
// BUSINESS LOGIC TYPES
// ========================================

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  outcomes: string[];
  price: number;
  certification: boolean;
}

export interface BootcampSession {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  groups: Group[];
  isActive: boolean;
}

export interface EmailTemplate {
  name: string;
  subject: string;
  html: string;
  variables: string[];
}

export interface Testimonial {
  id: string;
  participant_name: string;
  participant_photo?: string;
  company?: string;
  position?: string;
  testimonial: string;
  rating: number;
  video_url?: string;
  type: 'text' | 'video';
  linkedin_url?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
}
