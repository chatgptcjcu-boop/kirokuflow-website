import { NextRequest, NextResponse } from 'next/server';
import { publishDueJobs } from '@/src/lib/admin/repository';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (process.env.CRON_SECRET && body.secret !== process.env.CRON_SECRET && bearer !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 });
  }
  const jobs = await publishDueJobs();
  return NextResponse.json({
    ok: true,
    published_jobs: jobs.map((job) => job.id),
    note: 'MVP marks due jobs as published. GitHub commit writing is reserved for the next integration phase.'
  });
}
