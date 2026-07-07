import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { isAdminSession } from '@/src/lib/admin/auth';
import { listCalendarItems } from '@/src/lib/admin/repository';

export default async function CalendarPage() {
  if (!(await isAdminSession())) return <AdminLogin />;
  const items = await listCalendarItems();
  return (
    <AdminShell>
      <h1>Publishing Calendar</h1>
      <div className="admin-table">
        <div className="admin-row admin-row-head"><span>Topic</span><span>Status</span><span>Scheduled</span><span>Published</span></div>
        {items.map((item) => (
          <div className="admin-row" key={item.id}>
            <span>{item.topic_title}</span><span className={`status status-${item.status}`}>{item.status}</span><span>{item.scheduled_at || '-'}</span><span>{item.published_at || '-'}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
