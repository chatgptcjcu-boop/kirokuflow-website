'use client';

import { useState } from 'react';

export function TopicCreateForm() {
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (data.ok) {
      window.location.href = `/admin/content/${data.topic.id}`;
      return;
    }
    setMessage(data.error || 'Failed to create topic');
  }

  return (
    <form className="form-panel form-grid" onSubmit={submit}>
      <label>
        Topic title
        <input name="topic_title" required />
      </label>
      <label>
        Primary locale
        <select name="locale_primary" defaultValue="ja-JP">
          <option value="ja-JP">ja-JP</option>
          <option value="zh-TW">zh-TW</option>
        </select>
      </label>
      <label>
        Cluster
        <input name="cluster" defaultValue="行政 DX" required />
      </label>
      <label>
        Article type
        <select name="article_type" defaultValue="long_tail">
          <option value="pillar">pillar</option>
          <option value="long_tail">long_tail</option>
          <option value="faq">faq</option>
          <option value="template">template</option>
          <option value="policy_explainer">policy_explainer</option>
        </select>
      </label>
      <label>
        Search intent
        <input name="search_intent" defaultValue="入門" />
      </label>
      <label>
        JP keyword
        <input name="jp_keyword" />
      </label>
      <label>
        ZH keyword
        <input name="zh_keyword" />
      </label>
      <label>
        Product mapping
        <textarea name="product_mapping" defaultValue="支出登錄、稽核留痕、匯款通知" />
      </label>
      <label>
        CTA type
        <select name="cta_type" defaultValue="contact">
          <option value="template_download">template_download</option>
          <option value="contact">contact</option>
          <option value="consultation">consultation</option>
          <option value="audit_checklist">audit_checklist</option>
        </select>
      </label>
      <label>
        Risk level
        <select name="risk_level" defaultValue="low">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label>
      {message ? <div className="notice">{message}</div> : null}
      <button className="button primary" type="submit">
        Create topic
      </button>
    </form>
  );
}
