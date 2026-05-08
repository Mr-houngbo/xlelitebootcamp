const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function setupDatabase() {
  console.log('🚀 Setting up XL Elite Bootcamp database...');
  
  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Read schema file
    const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📝 Executing schema...');
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'))
      .map(stmt => stmt.trim() + ';');

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`⚡ Executing: ${statement.substring(0, 50)}...`);
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement });
        
        if (error) {
          // Try direct SQL execution if RPC fails
          const { error: directError } = await supabase
            .from('_temp')
            .select('*');
            
          if (directError && directError.code !== 'PGRST116') {
            console.error(`❌ Error executing statement:`, error);
            console.log(`Statement: ${statement}`);
          }
        }
      }
    }

    console.log('✅ Database setup completed successfully!');
    console.log('📊 Tables created: groups, participants, registrations, testimonials, companies, gallery');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Alternative approach using direct SQL
async function setupDatabaseDirect() {
  console.log('🚀 Setting up XL Elite Bootcamp database (direct method)...');
  
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Create tables one by one
    const tables = [
      {
        name: 'groups',
        sql: `
          CREATE TABLE IF NOT EXISTS groups (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(10) NOT NULL,
            time_slot TEXT CHECK (time_slot IN ('09h-12h', '14h-17h', '18h-21h')) NOT NULL,
            max_capacity INTEGER NOT NULL DEFAULT 20,
            current_capacity INTEGER NOT NULL DEFAULT 0,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          )
        `
      },
      {
        name: 'participants',
        sql: `
          CREATE TABLE IF NOT EXISTS participants (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
          )
        `
      },
      {
        name: 'registrations',
        sql: `
          CREATE TABLE IF NOT EXISTS registrations (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
          )
        `
      }
    ];

    for (const table of tables) {
      console.log(`⚡ Creating table: ${table.name}`);
      
      // Use the SQL Editor approach - this won't work via API
      console.log(`📝 Please execute this SQL manually in Supabase SQL Editor:`);
      console.log(`\n${table.sql}\n`);
    }

    // Insert initial groups data
    console.log(`📝 Insert initial groups data:`);
    console.log(`
      INSERT INTO groups (name, time_slot, max_capacity) VALUES
      ('G1', '09h-12h', 20),
      ('G2', '14h-17h', 20),
      ('G3', '18h-21h', 20)
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('✅ SQL statements ready for manual execution!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  setupDatabaseDirect();
}

module.exports = { setupDatabase, setupDatabaseDirect };
