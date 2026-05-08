import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Supabase client for server-side
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Auth helper functions - for server-side usage
// NOTE: Use lib/supabase/server.ts createClient() + getUser() in Server Components.
// Les fonctions ci-dessous sont réservées aux usages Service Role côté serveur uniquement.

export async function getAuthenticatedUser() {
  // getUser() valide le JWT via l'API Supabase (contrairement à getSession() qui lit juste le cookie)
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Auth error:', error);
    return null;
  }

  return user;
}

export async function requireAuth() {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  // Vérifie l'email admin via la variable d'env correcte
  if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error('Admin access required');
  }

  return user;
}
