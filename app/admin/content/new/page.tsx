import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { TopicCreateForm } from '@/app/components/admin/TopicCreateForm';
import { isAdminSession } from '@/src/lib/admin/auth';

export default async function NewTopicPage() {
  if (!(await isAdminSession())) return <AdminLogin />;
  return (
    <AdminShell>
      <h1>New Topic</h1>
      <TopicCreateForm />
    </AdminShell>
  );
}
