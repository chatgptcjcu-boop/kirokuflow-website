import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { isAdminSession } from '@/src/lib/admin/auth';

export default async function AnalyticsPage() {
  if (!(await isAdminSession())) return <AdminLogin />;
  return (
    <AdminShell>
      <h1>Analytics</h1>
      <div className="grid-2">
        <article className="card">
          <h2>Search Console CSV MVP</h2>
          <p>Second phase will connect Search Console and GA4 APIs. MVP keeps article performance fields ready for manual import.</p>
        </article>
        <article className="card">
          <h2>Tracked metrics</h2>
          <p>Pageviews, impressions, clicks, CTR, average position, leads by article, and conversion rate.</p>
        </article>
      </div>
    </AdminShell>
  );
}
