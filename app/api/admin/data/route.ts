import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

// GET /api/admin/data?table=participants
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get('table');
    const query = searchParams.get('query');

    if (!table) {
      return NextResponse.json({ error: 'Missing table' }, { status: 400 });
    }

    let q = (supabaseAdmin as any).from(table).select(query || '*');

    const { data, error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/admin/data  — body: { table, filter: {col, val}, payload }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { table, filter, payload } = body;

    if (!table || !payload) {
      return NextResponse.json({ error: 'Missing table or payload' }, { status: 400 });
    }

    let q = (supabaseAdmin as any).from(table).update(payload);

    if (filter) {
      q = q.eq(filter.col, filter.val);
    }

    const { data, error } = await q.select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data, success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
