import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Ce client utilise la clé SERVICE_ROLE et ignore les cookies.
// Il a TOUS les droits sur la base de données et contourne RLS.
// À utiliser UNIQUEMENT dans des routes API sécurisées (ex: /api/admin/*)
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
