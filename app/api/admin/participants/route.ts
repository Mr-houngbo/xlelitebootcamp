import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

// GET /api/admin/participants  — returns participants joined with registrations and groups
export async function GET() {
  try {
    const { data: participants, error: pErr } = await (supabaseAdmin as any)
      .from('participants')
      .select('*')
      .order('created_at', { ascending: false });

    if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

    const { data: registrations, error: rErr } = await (supabaseAdmin as any)
      .from('registrations')
      .select('*, groups(name, time_slot)');

    if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 });

    const joined = (participants || []).map((p: any) => ({
      ...p,
      registrations: (registrations || []).filter((r: any) => r.participant_id === p.id),
    }));

    return NextResponse.json({ data: joined });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// PATCH /api/admin/participants  — update participant status
export async function PATCH(req: NextRequest) {
  try {
    const { id, payload } = await req.json();

    const { data, error } = await (supabaseAdmin as any)
      .from('participants')
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
