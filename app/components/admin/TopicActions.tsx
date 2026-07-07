'use client';

import { useState } from 'react';

export function TopicActions({ topicId, defaultDate }: { topicId: string; defaultDate: string }) {
  const [message, setMessage] = useState('');

  async function generate() {
    setMessage('Generating...');
    const response = await fetch('/api/admin/generate-draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic_id: topicId, locales: ['ja-JP', 'zh-TW'], mode: 'draft' })
    });
    const data = await response.json();
    setMessage(data.ok ? `Generated ${data.draft_ids.length} drafts. Status: ${data.status}` : data.error || 'Failed');
    if (data.ok) setTimeout(() => window.location.reload(), 700);
  }

  async function patch(status: string) {
    const response = await fetch(`/api/admin/content/${topicId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    setMessage(data.ok ? `Updated to ${status}` : data.error || 'Failed');
    if (data.ok) setTimeout(() => window.location.reload(), 500);
  }

  async function schedule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic_id: topicId, scheduled_at: form.get('scheduled_at'), publish_pair: true })
    });
    const data = await response.json();
    setMessage(data.ok ? `Scheduled: ${data.job_id}` : data.error || 'Failed');
    if (data.ok) setTimeout(() => window.location.reload(), 700);
  }

  return (
    <div className="form-panel form-grid">
      <h2>Generation / Review / Schedule</h2>
      <div className="hero-actions">
        <button className="button primary" type="button" onClick={generate}>
          Generate Draft
        </button>
        <button className="button secondary" type="button" onClick={() => patch('approved')}>
          Mark approved
        </button>
        <button className="button secondary" type="button" onClick={() => patch('archived')}>
          Archive
        </button>
      </div>
      <form className="form-grid" onSubmit={schedule}>
        <label>
          scheduled_at
          <input name="scheduled_at" type="datetime-local" defaultValue={defaultDate} required />
        </label>
        <button className="button primary" type="submit">
          Schedule
        </button>
      </form>
      {message ? <div className="notice">{message}</div> : null}
    </div>
  );
}
