// Test client-side Supabase configuration
console.log('Environment variables check:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Test if we can import the client
import { supabase } from './lib/supabase/client.js';

console.log('Supabase client created:', !!supabase);

async function testClientAuth() {
  try {
    console.log('Testing client-side auth...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@xlbootcamp.com',
      password: 'q111qqq'
    });
    
    if (error) {
      console.error('❌ Client auth failed:', error.message);
      console.error('Error details:', error);
    } else {
      console.log('✅ Client auth successful:', data.user?.email);
    }
    
  } catch (error) {
    console.error('❌ Client test failed:', error);
  }
}

testClientAuth();
