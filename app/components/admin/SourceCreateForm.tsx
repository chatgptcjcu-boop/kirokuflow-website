'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SourceCreateForm({ topicId }: { topicId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function submit(formData: FormData) {
    setMessage('Saving source...');
    const response = await fetch(`/api/admin/content/${topicId}/sources`, {
      method: 'POST',
      body: JSON.stringify({
        source_url: formData.get('source_url'),
        source_title: formData.get('source_title'),
        source_type: formData.get('source_type'),
        source_summary: formData.get('source_summary')
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setMessage(result.error || 'Could not save source.');
      return;
    }
    setMessage('Source saved.');
    router.refresh();
  }

  return (
    <form action={submit} className="compact-form">
      <input name="source_url" placeholder="Official source URL" required />
      <input name="source_title" placeholder="Source title" required />
      <select name="source_type" defaultValue="official">
        <option value="official">official</option>
        <option value="law">law</option>
        <option value="subsidy">subsidy</option>
        <option value="tax">tax</option>
        <option value="reference">reference</option>
      </select>
      <textarea name="source_summary" placeholder="Short source note" rows={3} required />
      <button className="button secondary" type="submit">Add Source</button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
