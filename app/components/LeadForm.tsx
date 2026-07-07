'use client';

import { useState } from 'react';
import { Locale } from '@/src/lib/siteContent';

export function LeadForm({ locale, sourceArticleSlug, inquiryType }: { locale: Locale; sourceArticleSlug?: string; inquiryType?: string }) {
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        company: form.get('company'),
        email: form.get('email'),
        message: form.get('message'),
        locale,
        inquiry_type: inquiryType || form.get('inquiry_type') || 'consultation',
        source_article_slug: sourceArticleSlug || ''
      })
    });
    const data = await response.json();
    setMessage(data.ok ? (locale === 'ja-JP' ? '送信しました。' : '已送出。') : data.error || 'Error');
    if (data.ok) event.currentTarget.reset();
  }

  return (
    <form className="form-panel form-grid" onSubmit={submit}>
      <label>
        {locale === 'ja-JP' ? 'お名前' : '姓名'}
        <input name="name" required />
      </label>
      <label>
        {locale === 'ja-JP' ? '会社・組織' : '公司 / 組織'}
        <input name="company" />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        {locale === 'ja-JP' ? '相談内容' : '需求內容'}
        <textarea name="message" required />
      </label>
      {message ? <div className="notice">{message}</div> : null}
      <button className="button primary" type="submit">
        {locale === 'ja-JP' ? '送信する' : '送出'}
      </button>
    </form>
  );
}
