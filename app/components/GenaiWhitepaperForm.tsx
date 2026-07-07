'use client';

import { useState } from 'react';

const needs = [
  '社內ナレッジベース / 內部知識庫',
  'RAG 文書検索 / RAG 文件檢索',
  'AI 文書自動化 / 文件自動化',
  'AI ガバナンス / AI 治理',
  'SEO・GEO・GAI コンテンツ生成 / 內容生成'
];

export function GenaiWhitepaperForm({ sourceArticleSlug = 'japan-government-ai-genai' }: { sourceArticleSlug?: string }) {
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/leads/genai-whitepaper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: form.get('company_name'),
        company_location: form.get('company_location'),
        department: form.get('department'),
        job_title: form.get('job_title'),
        full_name: form.get('full_name'),
        business_email: form.get('business_email'),
        phone: form.get('phone'),
        ai_need: form.getAll('ai_need'),
        timeline: form.get('timeline'),
        consent: form.get('consent') === 'on',
        source_article_slug: sourceArticleSlug
      })
    });
    const data = await response.json();
    setSubmitting(false);
    if (!response.ok || !data.ok) {
      setStatus(data.error || '送信できませんでした。必須項目をご確認ください。');
      return;
    }
    window.location.href = data.redirect_url || '/thank-you/genai-whitepaper';
  }

  return (
    <form className="genai-form" onSubmit={submit}>
      <div className="form-grid two">
        <label>
          会社・組織名 / 公司組織
          <input name="company_name" required />
        </label>
        <label>
          所在地 / 所在地
          <select name="company_location" required defaultValue="">
            <option value="" disabled>選択してください</option>
            <option value="Japan">Japan</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Korea">Korea</option>
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          部署 / 部門
          <input name="department" required />
        </label>
        <label>
          役職 / 職稱
          <input name="job_title" required />
        </label>
        <label>
          お名前 / 姓名
          <input name="full_name" required />
        </label>
        <label>
          Business Email
          <input name="business_email" type="email" required />
        </label>
        <label>
          電話番号 / 電話
          <input name="phone" />
        </label>
        <label>
          導入時期 / 導入時程
          <select name="timeline" required defaultValue="">
            <option value="" disabled>選択してください</option>
            <option value="0-3 months">0-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6-12 months">6-12 months</option>
            <option value="research only">Research only</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend>関心のあるテーマ / 感興趣的主題</legend>
        <div className="checkbox-grid">
          {needs.map((need) => (
            <label key={need}>
              <input name="ai_need" type="checkbox" value={need} />
              <span>{need}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="consent-row">
        <input name="consent" type="checkbox" required />
        <span>白皮書下載與後續聯絡之個資使用に同意します。</span>
      </label>
      {status ? <p className="form-message">{status}</p> : null}
      <button className="button primary" type="submit" disabled={submitting}>
        {submitting ? '送信中...' : '白皮書をダウンロード / 下載白皮書'}
      </button>
    </form>
  );
}
