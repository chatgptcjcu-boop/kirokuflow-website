import Link from 'next/link';
import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { isAdminSession } from '@/src/lib/admin/auth';
import { listTopics } from '@/src/lib/admin/repository';

export default async function AdminContentPage() {
  if (!(await isAdminSession())) return <AdminLogin />;
  const topics = await listTopics();
  return (
    <AdminShell>
      <div className="admin-head">
        <h1>Content Topics</h1>
        <Link className="button primary" href="/admin/content/new">New topic</Link>
      </div>
      <div className="admin-table">
        <div className="admin-row admin-row-head">
          <span>Title</span><span>Locale</span><span>Cluster</span><span>Status</span><span>Score</span><span>Schedule</span>
        </div>
        {topics.map((topic) => (
          <Link className="admin-row" href={`/admin/content/${topic.id}`} key={topic.id}>
            <span>{topic.topic_title}</span>
            <span>{topic.locale_primary}</span>
            <span>{topic.cluster}</span>
            <span className={`status status-${topic.status}`}>{topic.status}</span>
            <span>{topic.quality_score}</span>
            <span>{topic.scheduled_at || '-'}</span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
