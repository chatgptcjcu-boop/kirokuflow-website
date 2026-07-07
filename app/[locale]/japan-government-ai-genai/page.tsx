import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { GenaiWhitepaperForm } from '@/app/components/GenaiWhitepaperForm';
import { SiteChrome } from '@/app/components/SiteChrome';
import { MarkdownRenderer } from '@/src/lib/blog/MarkdownRenderer';
import {
  genaiBreadcrumbJsonLd,
  genaiTopicUrl,
  getGenaiArticles,
  getGenaiSources,
  getGenaiTopic
} from '@/src/lib/genai';
import { normalizeLocale, publicLocale } from '@/src/lib/siteContent';
import { getSiteUrl } from '@/src/lib/siteUrl';

export function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'ja-JP' }, { locale: 'zh-TW' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const topic = getGenaiTopic();
  return {
    title: topic.seoTitle,
    description: topic.seoDescription,
    alternates: {
      canonical: genaiTopicUrl(locale),
      languages: {
        ja: `${getSiteUrl()}/ja/japan-government-ai-genai`,
        'zh-TW': `${getSiteUrl()}/zh-TW/japan-government-ai-genai`
      }
    },
    openGraph: {
      title: topic.seoTitle,
      description: topic.seoDescription,
      images: ['/assets/genai/01.png']
    }
  };
}

export default async function JapanGovernmentAiGenaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const topic = getGenaiTopic();
  const articles = getGenaiArticles();
  const sources = getGenaiSources();
  const topicUrl = genaiTopicUrl(locale);
  const breadcrumbJsonLd = genaiBreadcrumbJsonLd(locale, [
    { name: 'KirokuFlow', url: `${getSiteUrl()}/${localePath}` },
    { name: topic.title, url: topicUrl }
  ]);
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: topic.title,
    description: topic.seoDescription,
    url: topicUrl,
    publisher: { '@type': 'Organization', name: 'KirokuFlow' },
    hasPart: articles.map((article) => ({
      '@type': 'Article',
      headline: article.title,
      url: `${topicUrl}/articles/${article.slug}`
    }))
  };

  return (
    <SiteChrome locale={locale}>
      <main>
        <article className="container genai-shell">
          <nav className="breadcrumb">
            <Link href={`/${localePath}`}>KirokuFlow</Link>
            <span>/</span>
            <span>日本 GENAI 比較特集</span>
          </nav>

          <header className="genai-hero">
            <div>
              <span className="badge">KirokuFlow 公式サイト 2.0</span>
              <h1>{topic.title}</h1>
              <p>{topic.seoDescription}</p>
              <div className="hero-actions">
                <Link className="button primary" href="#download">
                  白皮書をダウンロード
                </Link>
                <Link className="button secondary" href={`/${localePath}/ai-workflow`}>
                  AI 工作流健檢
                </Link>
              </div>
            </div>
            <div className="genai-hero-media">
              <Image src="/assets/genai/01.png" alt="日本數位廳 GENAI 主題視覺" width={1680} height={945} priority />
            </div>
          </header>

          <section className="genai-message">
            <div>
              <strong>核心定位</strong>
              <p>
                本專區把日本 Government AI GENAI、RAG、AI 文件流程與治理要求，轉成企業能採購、能導入、能追蹤成效的工作流方案。
              </p>
            </div>
            <div>
              <strong>內容支柱</strong>
              <p>{topic.primaryKeywords.join(' / ')}</p>
            </div>
          </section>

          <section className="genai-article-grid" aria-labelledby="genai-articles">
            <div className="section-head">
              <div>
                <span className="eyebrow">Topic Cluster</span>
                <h2 id="genai-articles">日本 GENAI 比較特集文章</h2>
              </div>
              <p>依照政策、內部知識庫、RAG、文件自動化、治理、儀表板、內容工廠等主題建立 12 篇可被 SEO / GEO / GAI 收錄的支柱內容。</p>
            </div>
            <div className="grid-3">
              {articles.map((article) => (
                <Link className="genai-card" href={`/${localePath}/japan-government-ai-genai/articles/${article.slug}`} key={article.slug}>
                  <Image src={article.thumbnail} alt={article.title} width={840} height={472} />
                  <span className="genai-number">{article.no}</span>
                  <h3>{article.title}</h3>
                  <p>{article.seoDescription}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="content-panel">
            <MarkdownRenderer body={topicBodyForPage(topic.body)} />
          </section>

          <EvidenceBlock sources={sources} />
          <WhitepaperCta sourceArticleSlug={topic.slug} />
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
    </SiteChrome>
  );
}

function topicBodyForPage(body: string) {
  return body
    .replace(/^# .+\n/, '')
    .replace(/\n## 文章列表[\s\S]*?(?=\n## 主要引用來源)/, '')
    .replace(/\n## 主要引用來源[\s\S]*$/, '')
    .trim();
}

function EvidenceBlock({ sources }: { sources: ReturnType<typeof getGenaiSources> }) {
  return (
    <section className="evidence-block" aria-labelledby="evidence-title">
      <div className="section-head">
        <div>
          <span className="eyebrow">Evidence</span>
          <h2 id="evidence-title">主要引用來源</h2>
        </div>
        <p>政策、標準與國際治理框架會直接影響企業 AI 工作流設計，因此每篇文章都保留可追溯的引用來源。</p>
      </div>
      <div className="source-list">
        {sources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" className="source-item" key={source.id}>
            <strong>{source.title}</strong>
            <span>{source.publisher} / {source.date}</span>
            <p>{source.notes}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function WhitepaperCta({ sourceArticleSlug }: { sourceArticleSlug: string }) {
  return (
    <section className="whitepaper-panel" id="download">
      <div>
        <span className="badge">Whitepaper</span>
        <h2>日本 Government AI GENAI 對照白皮書</h2>
        <p>
          下載完整對照報告，取得企業 AI 工作流導入檢核表、RAG 知識庫規劃欄位與治理儀表板指標。表單送出後會進入下載頁。
        </p>
      </div>
      <GenaiWhitepaperForm sourceArticleSlug={sourceArticleSlug} />
    </section>
  );
}
