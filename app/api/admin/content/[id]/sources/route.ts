import { NextRequest, NextResponse } from 'next/server';
import { isAdminSession } from '@/src/lib/admin/auth';
import { createSource, getTopic } from '@/src/lib/admin/repository';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { topic } = await getTopic(id);
  if (!topic) return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  const body = await request.json();
  if (!body.source_url || !body.source_title || !body.source_summary) {
    return NextResponse.json({ error: 'source_url, source_title and source_summary are required' }, { status: 400 });
  }
  const source = await createSource({
    topic_id: id,
    source_url: String(body.source_url),
    source_title: String(body.source_title),
    source_type: String(body.source_type || 'official'),
    source_summary: String(body.source_summary)
  });
  return NextResponse.json({ source }, { status: 201 });
}
