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
        <strong>KirokuFlow 2.0</strong>
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
