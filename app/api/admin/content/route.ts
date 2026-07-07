import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/src/lib/admin/auth';
import { createTopic, listTopics } from '@/src/lib/admin/repository';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = request.nextUrl;
  const topics = await listTopics({
    status: searchParams.get('status') || undefined,
    cluster: searchParams.get('cluster') || undefined,
    locale: searchParams.get('locale') || undefined,
    q: searchParams.get('q') || undefined
  });
  return NextResponse.json({ ok: true, topics });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const topic = await createTopic(body);
  return NextResponse.json({ ok: true, topic });
}
