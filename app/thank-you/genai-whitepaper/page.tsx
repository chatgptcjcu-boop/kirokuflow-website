import Link from 'next/link';

export const metadata = {
  title: '白皮書下載ありがとうございます｜KirokuFlow',
  description: 'KirokuFlow 日本 Government AI GENAI 對照白皮書下載頁。'
};

export default function GenaiWhitepaperThankYouPage() {
  return (
    <main className="standalone-thankyou">
      <section className="download-card">
        <span className="badge">KirokuFlow Whitepaper</span>
        <h1>送信ありがとうございます。</h1>
        <p>
          日本 Government AI GENAI 對照白皮書已可下載。內容包含企業 AI 工作流、RAG 知識庫、文件自動化與治理儀表板的導入檢核表。
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/downloads/kirokuflow-genai-whitepaper.pdf">
            PDF をダウンロード
          </Link>
          <Link className="button secondary" href="/ja/japan-government-ai-genai">
            特集ページへ戻る
          </Link>
        </div>
      </section>
    </main>
  );
}
