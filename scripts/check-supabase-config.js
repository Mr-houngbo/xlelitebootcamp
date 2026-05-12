#!/usr/bin/env node

/**
 * Script de diagnostic pour vérifier la configuration Supabase
 */

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Vérification de la configuration Supabase...\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let hasErrors = false;

// Vérifier NEXT_PUBLIC_SUPABASE_URL
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL n\'est pas définie');
  hasErrors = true;
} else if (supabaseUrl.includes('placeholder')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL contient "placeholder" - veuillez configurer une vraie URL');
  hasErrors = true;
} else if (!supabaseUrl.startsWith('https://')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL doit commencer par https://');
  hasErrors = true;
} else {
  console.log('✅ NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
}

// Vérifier NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY n\'est pas définie');
  hasErrors = true;
} else if (supabaseAnonKey.includes('placeholder')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY contient "placeholder" - veuillez configurer une vraie clé');
  hasErrors = true;
} else {
  console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: ' + supabaseAnonKey.substring(0, 20) + '...');
}

// Vérifier SUPABASE_SERVICE_ROLE_KEY
if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY n\'est pas définie');
  hasErrors = true;
} else if (supabaseServiceKey.includes('placeholder')) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY contient "placeholder" - veuillez configurer une vraie clé');
  hasErrors = true;
} else {
  console.log('✅ SUPABASE_SERVICE_ROLE_KEY: ' + supabaseServiceKey.substring(0, 20) + '...');
}

console.log('');

if (hasErrors) {
  console.error('⚠️  Des erreurs de configuration ont été détectées.');
  console.log('\n📝 Pour corriger:');
  console.log('1. Créez un fichier .env.local à la racine du projet');
  console.log('2. Copiez le contenu de .env.example');
  console.log('3. Remplacez les valeurs par vos vraies clés Supabase');
  console.log('4. Redémarrez le serveur de développement\n');
  process.exit(1);
} else {
  console.log('✅ Configuration Supabase OK!\n');
  
  // Test de connexion
  console.log('🔌 Test de connexion à Supabase...\n');
  
  fetch(`${supabaseUrl}/rest/v1/`, {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  })
    .then(response => {
      if (response.ok || response.status === 404) {
        console.log('✅ Connexion à Supabase réussie!\n');
      } else {
        console.error('❌ Erreur de connexion:', response.status, response.statusText);
        console.log('Vérifiez que votre URL et vos clés sont correctes.\n');
      }
    })
    .catch(error => {
      console.error('❌ Impossible de se connecter à Supabase:', error.message);
      console.log('Vérifiez votre connexion internet et que l\'URL Supabase est correcte.\n');
    });
}
