import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/src/lib/admin/auth';
import { generateDraft } from '@/src/lib/admin/generator';

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const result = await generateDraft(String(body.topic_id));
    return NextResponse.json({
      ok: true,
      topic_id: body.topic_id,
      draft_ids: result.drafts.map((draft) => draft.id),
      status: result.reviewRequired ? 'review_required' : 'draft',
      quality_score: result.qualityScore,
      review_required: result.reviewRequired
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Failed to generate draft' }, { status: 400 });
  }
}
