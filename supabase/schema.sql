-- ========================================
-- XL ELITE BOOTCAMP DATABASE SCHEMA
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- GROUPS TABLE
-- ========================================
CREATE TABLE groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  time_slot TEXT CHECK (time_slot IN ('09h-12h', '14h-17h', '18h-21h')) NOT NULL,
  max_capacity INTEGER NOT NULL DEFAULT 20,
  current_capacity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- PARTICIPANTS TABLE
-- ========================================
CREATE TABLE participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  company VARCHAR(100),
  position VARCHAR(100),
  profile_type TEXT CHECK (profile_type IN ('cadre', 'etudiant', 'freelance', 'autre')),
  source TEXT CHECK (source IN ('direct', 'linkedin', 'facebook', 'instagram', 'referral', 'colleague', 'autre')) NOT NULL,
  message TEXT,
  status TEXT CHECK (status IN ('lead', 'confirmed', 'cancelled', 'completed')) DEFAULT 'lead',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- REGISTRATIONS TABLE
-- ========================================
CREATE TABLE registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  registration_fee_amount DECIMAL(10,2) DEFAULT 25000.00,
  training_fee_amount DECIMAL(10,2) DEFAULT 150000.00,
  total_amount DECIMAL(10,2) GENERATED ALWAYS AS (registration_fee_amount + training_fee_amount) STORED,
  payment_status TEXT CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')) DEFAULT 'pending',
  registration_fee_paid BOOLEAN DEFAULT false,
  training_fee_paid BOOLEAN DEFAULT false,
  payment_method TEXT CHECK (payment_method IN ('mobile_money', 'bank_transfer', 'cash')),
  payment_reference VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TESTIMONIALS TABLE
-- ========================================
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant_name VARCHAR(100) NOT NULL,
  participant_photo TEXT,
  company VARCHAR(100),
  position VARCHAR(100),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- COMPANIES TABLE
-- ========================================
CREATE TABLE companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo TEXT,
  website TEXT,
  description TEXT,
  is_partner BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  participants_trained INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- GALLERY TABLE
-- ========================================
CREATE TABLE gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT CHECK (category IN ('training', 'certification', 'venue', 'team')) NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES
-- ========================================
CREATE INDEX idx_participants_email ON participants(email);
CREATE INDEX idx_participants_status ON participants(status);
CREATE INDEX idx_registrations_participant ON registrations(participant_id);
CREATE INDEX idx_registrations_group ON registrations(group_id);
CREATE INDEX idx_registrations_status ON registrations(payment_status);
CREATE INDEX idx_groups_active ON groups(is_active);

-- ========================================
-- TRIGGERS FOR UPDATED_AT
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- RLS (ROW LEVEL SECURITY)
-- ========================================
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Groups policies
CREATE POLICY "Groups are viewable by everyone" ON groups
  FOR SELECT USING (true);

CREATE POLICY "Groups can be managed by authenticated users" ON groups
  FOR ALL USING (auth.role() = 'authenticated');

-- Participants policies
-- SELECT : authentifiés uniquement (données personnelles sensibles)
CREATE POLICY "Participants viewable by authenticated users only" ON participants
  FOR SELECT USING (auth.role() = 'authenticated');

-- INSERT : tout le monde peut s'inscrire (formulaire public)
CREATE POLICY "Participants can be inserted by anyone" ON participants
  FOR INSERT WITH CHECK (true);

-- UPDATE/DELETE : authentifiés uniquement
CREATE POLICY "Participants can be updated by authenticated users" ON participants
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Participants can be deleted by authenticated users" ON participants
  FOR DELETE USING (auth.role() = 'authenticated');

-- Registrations policies
-- SELECT : authentifiés uniquement
CREATE POLICY "Registrations viewable by authenticated users only" ON registrations
  FOR SELECT USING (auth.role() = 'authenticated');

-- INSERT : tout le monde peut créer une inscription
CREATE POLICY "Registrations can be inserted by anyone" ON registrations
  FOR INSERT WITH CHECK (true);

-- UPDATE/DELETE : authentifiés uniquement
CREATE POLICY "Registrations can be updated by authenticated users" ON registrations
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Registrations can be deleted by authenticated users" ON registrations
  FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials policies
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Testimonials can be managed by authenticated users" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- Companies policies
CREATE POLICY "Companies are viewable by everyone" ON companies
  FOR SELECT USING (is_active = true);

CREATE POLICY "Companies can be managed by authenticated users" ON companies
  FOR ALL USING (auth.role() = 'authenticated');

-- Gallery policies
CREATE POLICY "Gallery is viewable by everyone" ON gallery
  FOR SELECT USING (is_active = true);

CREATE POLICY "Gallery can be managed by authenticated users" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');

-- ========================================
-- INSERT INITIAL DATA
-- ========================================
INSERT INTO groups (name, time_slot, max_capacity) VALUES
('G1', '09h-12h', 20),
('G2', '14h-17h', 20),
('G3', '18h-21h', 20);

-- ========================================
-- RPC : Incrémentation atomique de la capacité d'un groupe
-- Évite les race conditions lors d'inscriptions simultanées
-- ========================================
CREATE OR REPLACE FUNCTION increment_group_capacity(p_group_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE groups
  SET current_capacity = current_capacity + 1
  WHERE id = p_group_id
    AND is_active = true
    AND current_capacity < max_capacity;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Group not found, inactive, or at full capacity (id: %)', p_group_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Accorder l'exécution au rôle service_role uniquement
REVOKE ALL ON FUNCTION increment_group_capacity(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION increment_group_capacity(UUID) TO service_role;

