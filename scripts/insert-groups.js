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

async function insertGroups() {
  console.log('🚀 Inserting initial groups data...');
  
  try {
    const supabase = createClient(
      envVars.NEXT_PUBLIC_SUPABASE_URL,
      envVars.SUPABASE_SERVICE_ROLE_KEY
    );

    // Insert groups data
    const { data, error } = await supabase
      .from('groups')
      .upsert([
        { name: 'G1', time_slot: '09h-12h', max_capacity: 20, current_capacity: 0, is_active: true },
        { name: 'G2', time_slot: '14h-17h', max_capacity: 20, current_capacity: 0, is_active: true },
        { name: 'G3', time_slot: '18h-21h', max_capacity: 20, current_capacity: 0, is_active: true }
      ], {
        onConflict: 'name'
      })
      .select();

    if (error) {
      console.error('❌ Error inserting groups:', error);
      return;
    }

    console.log('✅ Groups inserted successfully!');
    console.log('📊 Groups data:', data);
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

insertGroups();
