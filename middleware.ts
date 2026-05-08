import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// Routes publiques dans le groupe /admin (pas de protection)
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne s'applique qu'aux routes /admin
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Laisser passer la page de login
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Permettre la route de logout (elle gère elle-même la déconnexion)
  if (pathname.startsWith('/admin/logout')) {
    return NextResponse.next();
  }

  // Vérification de la session Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() valide le JWT côté Edge Runtime (sécurisé)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Non authentifié → rediriger vers /admin/login
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vérification que c'est bien l'admin
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (adminEmail && user.email !== adminEmail) {
    // Authentifié mais pas admin → rediriger vers /admin/login avec erreur
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Appliquer le middleware à toutes les routes /admin sauf :
     * - les fichiers statiques (_next/static, _next/image, favicon.ico)
     */
    '/admin/:path*',
  ],
};
