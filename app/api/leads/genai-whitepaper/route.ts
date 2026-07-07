import { NextResponse } from 'next/server';
import { createLead } from '@/src/lib/admin/repository';

const requiredFields = ['company_name', 'company_location', 'department', 'job_title', 'full_name', 'business_email', 'timeline'];

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  for (const field of requiredFields) {
    if (!asString((body as Record<string, unknown>)[field])) {
      return NextResponse.json({ ok: false, error: `${field} is required` }, { status: 400 });
    }
  }

  const email = asString((body as Record<string, unknown>).business_email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Business email is invalid' }, { status: 400 });
  }

  if ((body as Record<string, unknown>).consent !== true) {
    return NextResponse.json({ ok: false, error: 'Consent is required' }, { status: 400 });
  }

  const aiNeed = Array.isArray((body as Record<string, unknown>).ai_need)
    ? ((body as Record<string, unknown>).ai_need as unknown[]).map(asString).filter(Boolean)
    : [];

  const lead = await createLead({
    name: asString((body as Record<string, unknown>).full_name),
    company: asString((body as Record<string, unknown>).company_name),
    email,
    locale: 'ja-JP',
    inquiry_type: 'genai_whitepaper',
    source_article_slug: asString((body as Record<string, unknown>).source_article_slug) || 'japan-government-ai-genai',
    message: JSON.stringify({
      company_location: asString((body as Record<string, unknown>).company_location),
      department: asString((body as Record<string, unknown>).department),
      job_title: asString((body as Record<string, unknown>).job_title),
      phone: asString((body as Record<string, unknown>).phone),
      ai_need: aiNeed,
      timeline: asString((body as Record<string, unknown>).timeline)
    })
  });

  return NextResponse.json({
    ok: true,
    id: lead.id,
    redirect_url: '/thank-you/genai-whitepaper',
    download_url: '/downloads/kirokuflow-genai-whitepaper.pdf'
  });
}
