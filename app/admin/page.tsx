import Link from 'next/link';
import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { isAdminSession } from '@/src/lib/admin/auth';
import { listLeads, listTopics } from '@/src/lib/admin/repository';

export default async function AdminPage() {
  if (!(await isAdminSession())) return <AdminLogin />;
  const [topics, leads] = await Promise.all([listTopics(), listLeads()]);
  const scheduled = topics.filter((topic) => topic.status === 'scheduled').length;
  const review = topics.filter((topic) => topic.status === 'review_required').length;
  const lowScore = topics.filter((topic) => topic.quality_score > 0 && topic.quality_score < 80).length;
  const published = topics.filter((topic) => topic.status === 'published').length;

  return (
    <AdminShell>
      <div className="admin-head">
        <h1>Dashboard</h1>
        <Link className="button primary" href="/admin/content/new">
          New topic
        </Link>
      </div>
      <div className="admin-stats">
        <div className="card"><strong>{published}</strong><span>Published</span></div>
        <div className="card"><strong>{scheduled}</strong><span>Scheduled</span></div>
        <div className="card"><strong>{review}</strong><span>Review required</span></div>
        <div className="card"><strong>{lowScore}</strong><span>Low score</span></div>
        <div className="card"><strong>{leads.length}</strong><span>Leads</span></div>
      </div>
    </AdminShell>
  );
}
