#!/usr/bin/env node

/**
 * Test de connexion Supabase avec plus de détails
 */

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔌 Test de connexion détaillé à Supabase...\n');
console.log('URL:', supabaseUrl);
console.log('');

async function testConnection() {
  try {
    console.log('1️⃣ Test de résolution DNS...');
    const url = new URL(supabaseUrl);
    console.log('   Host:', url.hostname);
    
    console.log('\n2️⃣ Test de connexion HTTP...');
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    console.log('   Status:', response.status, response.statusText);
    console.log('   Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok || response.status === 404 || response.status === 401) {
      console.log('\n✅ Connexion réussie! Supabase est accessible.\n');
      
      console.log('3️⃣ Test d\'authentification...');
      const authResponse = await fetch(`${supabaseUrl}/auth/v1/health`, {
        headers: {
          'apikey': supabaseAnonKey
        }
      });
      
      console.log('   Auth Status:', authResponse.status);
      const authData = await authResponse.text();
      console.log('   Auth Response:', authData);
      
      if (authResponse.ok) {
        console.log('\n✅ Service d\'authentification opérationnel!\n');
      }
    } else {
      console.log('\n⚠️  Réponse inattendue du serveur\n');
    }
    
  } catch (error) {
    console.error('\n❌ Erreur de connexion:', error.message);
    console.error('   Type:', error.constructor.name);
    
    if (error.cause) {
      console.error('   Cause:', error.cause);
    }
    
    console.log('\n🔍 Diagnostics possibles:');
    console.log('   • Vérifiez votre connexion internet');
    console.log('   • Vérifiez que le projet Supabase n\'est pas en pause');
    console.log('   • Vérifiez les paramètres proxy/firewall');
    console.log('   • Essayez d\'accéder à', supabaseUrl, 'dans votre navigateur\n');
  }
}

testConnection();
