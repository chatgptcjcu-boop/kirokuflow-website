import Image from 'next/image';
import Link from 'next/link';

const nav = [
  ['/admin', 'Dashboard'],
  ['/admin/content', 'Content'],
  ['/admin/content/new', 'New Topic'],
  ['/admin/calendar', 'Calendar'],
  ['/admin/leads', 'Leads'],
  ['/admin/analytics', 'Analytics'],
  ['/admin/settings', 'Settings']
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin" aria-label="KirokuFlow admin dashboard">
          <Image src="/assets/brand/kirokuflow-group-footer-bar.png" alt="KirokuFlow Group" width={407} height={81} priority />
        </Link>
        <nav>
          {nav.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
