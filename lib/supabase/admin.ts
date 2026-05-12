import { createClient } from '@supabase/supabase-js';
import { Agent } from 'undici';
import { Database } from '@/types/database';

const insecureAgent =
  process.env.NODE_ENV !== 'production'
    ? new Agent({ connect: { rejectUnauthorized: false } })
    : undefined;

const fetchWithOptionalAgent: typeof fetch = (input, init) => {
  if (!insecureAgent) {
    return fetch(input, init);
  }

  const initWithAgent = {
    ...init,
    dispatcher: insecureAgent,
  } as RequestInit & { dispatcher: Agent };

  return fetch(input, initWithAgent);
};

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
    global: {
      fetch: fetchWithOptionalAgent,
    },
  }
);
