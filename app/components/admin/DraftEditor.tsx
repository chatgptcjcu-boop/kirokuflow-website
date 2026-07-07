'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ArticleDraft } from '@/src/lib/admin/types';

export function DraftEditor({ draft }: { draft: ArticleDraft }) {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function save(formData: FormData) {
    setMessage('Saving draft...');
    const response = await fetch(`/api/admin/drafts/${draft.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: formData.get('title'),
        meta_description: formData.get('meta_description'),
        body_mdx: formData.get('body_mdx')
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setMessage(result.error || 'Could not save draft.');
      return;
    }
    setMessage('Draft saved.');
    router.refresh();
  }

  return (
    <form action={save} className="draft-editor">
      <span className="badge">{draft.locale}</span>
      <input name="title" defaultValue={draft.title} aria-label="Draft title" />
      <textarea name="meta_description" defaultValue={draft.meta_description} aria-label="Meta description" rows={3} />
      <textarea name="body_mdx" defaultValue={draft.body_mdx} aria-label="Draft MDX body" rows={18} />
      <div className="admin-row">
        <span>Version {draft.version}</span>
        <span>{draft.updated_at}</span>
        <button className="button secondary" type="submit">Save Draft</button>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
