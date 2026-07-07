import { notFound } from 'next/navigation';
import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminShell } from '@/app/components/admin/AdminShell';
import { DraftEditor } from '@/app/components/admin/DraftEditor';
import { SourceCreateForm } from '@/app/components/admin/SourceCreateForm';
import { TopicActions } from '@/app/components/admin/TopicActions';
import { isAdminSession } from '@/src/lib/admin/auth';
import { getTopic } from '@/src/lib/admin/repository';

export default async function TopicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminSession())) return <AdminLogin />;
  const { id } = await params;
  const { topic, sources, drafts, jobs } = await getTopic(id);
  if (!topic) notFound();
  const defaultDate = new Date(Date.now() + 86400000).toISOString().slice(0, 16);

  return (
    <AdminShell>
      <div className="admin-head">
        <div>
          <h1>{topic.topic_title}</h1>
          <p>{topic.cluster} · {topic.status} · score {topic.quality_score}</p>
        </div>
      </div>
      <div className="grid-2">
        <article className="form-panel">
          <h2>Topic Brief</h2>
          <p><strong>Intent:</strong> {topic.search_intent}</p>
          <p><strong>JP keyword:</strong> {topic.jp_keyword || '-'}</p>
          <p><strong>ZH keyword:</strong> {topic.zh_keyword || '-'}</p>
          <p><strong>Risk:</strong> {topic.risk_level}</p>
          <p><strong>Product mapping:</strong> {topic.product_mapping}</p>
        </article>
        <TopicActions topicId={topic.id} defaultDate={defaultDate} />
      </div>
      <section className="page-section">
        <h2>Sources</h2>
        <SourceCreateForm topicId={topic.id} />
        <div className="grid-2">
          {sources.map((source) => (
            <article className="card" key={source.id}>
              <h3>{source.source_type}</h3>
              <p>{source.source_summary}</p>
              <a href={source.source_url}>{source.source_url}</a>
            </article>
          ))}
          {!sources.length ? <div className="notice">High-risk topics cannot generate without official sources.</div> : null}
        </div>
      </section>
      <section className="page-section">
        <h2>Drafts</h2>
        <div className="grid-2">
          {drafts.map((draft) => (
            <DraftEditor draft={draft} key={draft.id} />
          ))}
          {!drafts.length ? <div className="notice">Generate a draft to review and edit MDX content here.</div> : null}
        </div>
      </section>
      <section className="page-section">
        <h2>Publish Jobs</h2>
        {jobs.map((job) => (
          <div className="admin-row" key={job.id}>
            <span>{job.status}</span><span>{job.scheduled_at}</span><span>{job.published_at || '-'}</span>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
