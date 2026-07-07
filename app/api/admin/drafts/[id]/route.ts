import { NextRequest, NextResponse } from 'next/server';
import { isAdminSession } from '@/src/lib/admin/auth';
import { updateDraft } from '@/src/lib/admin/repository';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const draft = await updateDraft(id, {
    title: typeof body.title === 'string' ? body.title : undefined,
    meta_description: typeof body.meta_description === 'string' ? body.meta_description : undefined,
    body_mdx: typeof body.body_mdx === 'string' ? body.body_mdx : undefined
  });
  if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
  return NextResponse.json({ draft });
}
