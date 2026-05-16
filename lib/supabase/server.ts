import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
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

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // En dehors d'une Server Action ou d'un Route Handler,
            // Next.js 15 interdit l'écriture de cookies.
            // Cette erreur est ignorée ici car la vérification de session
            // reste faite en lecture seule (getAll).
            // Le middleware se chargera du rafraîchissement si nécessaire.
          }
        },
      },
      global: {
        fetch: fetchWithOptionalAgent,
      },
    }
  );
}
