import { NextRequest, NextResponse } from 'next/server';

// Routes publiques dans le groupe /admin (pas de protection)
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

function getSupabaseSessionCookieName(supabaseUrl?: string) {
  if (!supabaseUrl) return null;

  try {
    const { hostname } = new URL(supabaseUrl);
    const projectRef = hostname.split('.')[0];

    if (!projectRef) return null;

    return `sb-${projectRef}-auth-token`;
  } catch (error) {
    console.error('[Middleware] Invalid Supabase URL:', supabaseUrl, error);
    return null;
  }
}

function hasSupabaseSession(request: NextRequest, cookieName: string) {
  const sessionCookie = request.cookies.get(cookieName);

  return Boolean(sessionCookie?.value);
}

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si les variables d'environnement ne sont pas configurées, rediriger vers login
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    console.error('[Middleware] Supabase environment variables not configured');
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const sessionCookieName = getSupabaseSessionCookieName(supabaseUrl);

  if (!sessionCookieName) {
    console.error('[Middleware] Unable to resolve Supabase session cookie name');
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!hasSupabaseSession(request, sessionCookieName)) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
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
