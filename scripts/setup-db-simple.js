const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local
const fs = require('fs');
const path = require('path');

// Read .env.local file
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const envVars = {};

envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key] = value.replace(/"/g, '');
  }
});

async function setupDatabase() {
  console.log('🚀 Setting up XL Elite Bootcamp database...');
  
  try {
    const supabase = createClient(
      envVars.NEXT_PUBLIC_SUPABASE_URL,
      envVars.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('📝 SQL statements to execute manually in Supabase SQL Editor:');
    console.log('\n' + '='.repeat(80));
    
    // Output SQL statements
    const sqlStatements = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- GROUPS TABLE
CREATE TABLE IF NOT EXISTS groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  time_slot TEXT CHECK (time_slot IN ('09h-12h', '14h-17h', '18h-21h')) NOT NULL,
  max_capacity INTEGER NOT NULL DEFAULT 20,
  current_capacity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PARTICIPANTS TABLE
CREATE TABLE IF NOT EXISTS participants (
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

-- REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  registration_fee_amount DECIMAL(10,2) DEFAULT 25000.00,
  training_fee_amount DECIMAL(10,2) DEFAULT 150000.00,
  total_amount DECIMAL(10,2) DEFAULT 175000.00,
  payment_status TEXT CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')) DEFAULT 'pending',
  registration_fee_paid BOOLEAN DEFAULT false,
  training_fee_paid BOOLEAN DEFAULT false,
  payment_method TEXT CHECK (payment_method IN ('mobile_money', 'bank_transfer', 'cash')),
  payment_reference VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial groups data
INSERT INTO groups (name, time_slot, max_capacity) VALUES
('G1', '09h-12h', 20),
('G2', '14h-17h', 20),
('G3', '18h-21h', 20)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON participants FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON registrations FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON groups FOR SELECT USING (true);
    `;

    console.log(sqlStatements);
    console.log('\n' + '='.repeat(80));
    console.log('✅ Copy the SQL above and execute it in Supabase SQL Editor:');
    console.log('🔗 https://supabase.com/dashboard/project/descvtwedjbxxrgaecww/sql');
    console.log('\n⚠️  IMPORTANT: Execute these steps:');
    console.log('1. Go to the URL above');
    console.log('2. Click "New query"');
    console.log('3. Paste the entire SQL code');
    console.log('4. Click "Run" or "Execute"');
    console.log('5. Wait for completion');
    console.log('\n🎯 After execution, the form should work properly!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

setupDatabase();
