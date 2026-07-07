import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { isAdminSession } from '@/src/lib/admin/auth';
import { listLeads } from '@/src/lib/admin/repository';

export default async function LeadsPage() {
  if (!(await isAdminSession())) return <AdminLogin />;
  const leads = await listLeads();
  return (
    <AdminShell>
      <h1>Leads</h1>
      <div className="admin-table">
        <div className="admin-row admin-row-head"><span>Name</span><span>Company</span><span>Email</span><span>Locale</span><span>Source</span><span>Status</span></div>
        {leads.map((lead) => (
          <div className="admin-row" key={lead.id}>
            <span>{lead.name}</span><span>{lead.company || '-'}</span><span>{lead.email}</span><span>{lead.locale}</span><span>{lead.source_article_slug || '-'}</span><span>{lead.status}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
