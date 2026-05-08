require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testAuth() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('groups').select('count');
    if (error) {
      console.error('Connection error:', error);
      return;
    }
    console.log('✅ Supabase connection successful');
    
    // Test login
    console.log('Testing admin login...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@xlbootcamp.com',
      password: 'q111qqq'
    });
    
    if (authError) {
      console.error('❌ Login failed:', authError.message);
      return;
    }
    
    console.log('✅ Login successful:', authData.user?.email);
    
    // Test sign up if user doesn't exist
    if (authError?.message?.includes('Invalid login credentials')) {
      console.log('Creating admin user...');
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@xlbootcamp.com',
        password: 'q111qqq'
      });
      
      if (signUpError) {
        console.error('❌ Sign up failed:', signUpError.message);
      } else {
        console.log('✅ Admin user created');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuth();
