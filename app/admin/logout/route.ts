import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
