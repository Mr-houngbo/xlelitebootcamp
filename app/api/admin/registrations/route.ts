import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

// GET /api/admin/registrations
export async function GET() {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from('registrations')
      .select('*, groups(name, time_slot)');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: data || [] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// PATCH /api/admin/registrations  — update payment status
export async function PATCH(req: NextRequest) {
  try {
    const { id, payload } = await req.json();

    const { data, error } = await (supabaseAdmin as any)
      .from('registrations')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) return NextResponse.json({ error: 'No row updated' }, { status: 404 });

    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
