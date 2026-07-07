import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/src/lib/admin/auth';
import { createPublishJob, getTopic, updateTopic } from '@/src/lib/admin/repository';

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const topicId = String(body.topic_id);
  const scheduledAt = String(body.scheduled_at || '');
  const { topic } = await getTopic(topicId);
  if (!topic) return NextResponse.json({ ok: false, error: 'Topic not found' }, { status: 404 });
  if (topic.quality_score < 80) return NextResponse.json({ ok: false, error: 'quality_score must be >= 80' }, { status: 400 });
  if (topic.status === 'review_required') return NextResponse.json({ ok: false, error: 'Review-required content must be approved before scheduling' }, { status: 400 });
  if (!['approved', 'draft'].includes(topic.status)) return NextResponse.json({ ok: false, error: 'Topic must be approved or draft before scheduling' }, { status: 400 });
  const iso = scheduledAt.includes('T') ? new Date(scheduledAt).toISOString() : scheduledAt;
  const job = await createPublishJob({ topic_id: topicId, scheduled_at: iso });
  await updateTopic(topicId, { status: 'scheduled', scheduled_at: iso });
  return NextResponse.json({ ok: true, job_id: job.id, status: 'scheduled' });
}
