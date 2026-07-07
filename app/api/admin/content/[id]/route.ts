import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/src/lib/admin/auth';
import { updateTopic } from '@/src/lib/admin/repository';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const topic = await updateTopic(id, body);
  if (!topic) return NextResponse.json({ ok: false, error: 'Topic not found' }, { status: 404 });
  return NextResponse.json({ ok: true, topic });
}
