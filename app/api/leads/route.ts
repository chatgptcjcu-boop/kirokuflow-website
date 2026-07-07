import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/src/lib/admin/repository';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.email) {
    return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
  }
  const lead = await createLead({
    name: String(body.name || ''),
    company: String(body.company || ''),
    email: String(body.email),
    locale: String(body.locale || ''),
    inquiry_type: String(body.inquiry_type || 'consultation'),
    source_article_slug: String(body.source_article_slug || ''),
    message: String(body.message || '')
  });
  return NextResponse.json({ ok: true, lead_id: lead.id });
}
