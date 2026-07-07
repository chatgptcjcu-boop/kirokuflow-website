import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { getAdminPassword, isAdminSession } from '@/src/lib/admin/auth';

export default async function SettingsPage() {
  if (!(await isAdminSession())) return <AdminLogin />;
  const usingDefault = getAdminPassword() === 'kiroku-admin';
  return (
    <AdminShell>
      <h1>Settings</h1>
      <div className="grid-2">
        <article className="card">
          <h2>Official source whitelist</h2>
          <ul>
            <li>Digital Agency</li>
            <li>METI</li>
            <li>IT 導入補助金</li>
            <li>NTA</li>
          </ul>
        </article>
        <article className="card">
          <h2>Security</h2>
          <p>MVP uses ADMIN_PASSWORD. Production should migrate to NextAuth or Clerk with role-based access control.</p>
          {usingDefault ? <div className="notice">ADMIN_PASSWORD is not set. Default local MVP password is active.</div> : null}
        </article>
      </div>
    </AdminShell>
  );
}
