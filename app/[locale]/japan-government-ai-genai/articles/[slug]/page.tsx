import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GenaiWhitepaperForm } from '@/app/components/GenaiWhitepaperForm';
import { SiteChrome } from '@/app/components/SiteChrome';
import { MarkdownRenderer } from '@/src/lib/blog/MarkdownRenderer';
import {
  genaiArticleUrl,
  genaiBreadcrumbJsonLd,
  genaiTopicUrl,
  getGenaiArticle,
  getGenaiArticles,
  getGenaiSources
} from '@/src/lib/genai';
import { normalizeLocale, publicLocale } from '@/src/lib/siteContent';
import { getSiteUrl } from '@/src/lib/siteUrl';

export function generateStaticParams() {
  return getGenaiArticles().flatMap((article) => [
    { locale: 'ja', slug: article.slug },
    { locale: 'ja-JP', slug: article.slug },
    { locale: 'zh-TW', slug: article.slug }
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const article = getGenaiArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: genaiArticleUrl(locale, article.slug),
      languages: {
        ja: `${getSiteUrl()}/ja/japan-government-ai-genai/articles/${article.slug}`,
        'zh-TW': `${getSiteUrl()}/zh-TW/japan-government-ai-genai/articles/${article.slug}`
      }
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.thumbnail]
    }
  };
}

export default async function GenaiArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const article = getGenaiArticle(slug);
  if (!article) notFound();

  const sources = getGenaiSources();
  const topicUrl = genaiTopicUrl(locale);
  const articleUrl = genaiArticleUrl(locale, article.slug);
  const breadcrumbJsonLd = genaiBreadcrumbJsonLd(locale, [
    { name: 'KirokuFlow', url: `${getSiteUrl()}/${localePath}` },
    { name: '日本 GENAI 比較特集', url: topicUrl },
    { name: article.title, url: articleUrl }
  ]);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.seoDescription,
    image: `${getSiteUrl()}${article.thumbnail}`,
    dateModified: article.lastReviewed,
    author: { '@type': 'Organization', name: 'KirokuFlow' },
    publisher: { '@type': 'Organization', name: 'KirokuFlow' },
    mainEntityOfPage: articleUrl,
    keywords: article.keywords.join(', ')
  };

  return (
    <SiteChrome locale={locale}>
      <main>
        <article className="container genai-article-shell">
          <nav className="breadcrumb">
            <Link href={`/${localePath}`}>KirokuFlow</Link>
            <span>/</span>
            <Link href={`/${localePath}/japan-government-ai-genai`}>日本 GENAI 比較特集</Link>
            <span>/</span>
            <span>{article.no}</span>
          </nav>

          <header className="genai-article-hero">
            <div>
              <span className="badge">{article.category} / {article.no}</span>
              <h1>{article.title}</h1>
              <p>{article.seoDescription}</p>
              <div className="article-meta">
                <span>Last reviewed {article.lastReviewed}</span>
                <span>{article.keywords.slice(0, 4).join(' / ')}</span>
              </div>
            </div>
            <Image src={article.thumbnail} alt={article.title} width={1680} height={945} priority />
          </header>

          <div className="genai-article-layout">
            <aside className="article-toc">
              <strong>GENAI 專題</strong>
              <Link href={`/${localePath}/japan-government-ai-genai`}>主題頁</Link>
              <a href="#download">白皮書下載</a>
              <a href="#sources">引用來源</a>
            </aside>
            <MarkdownRenderer body={article.body.replace(/^# .+\n/, '')} />
          </div>

          <section className="evidence-block compact" id="sources">
            <div className="section-head">
              <div>
                <span className="eyebrow">Evidence</span>
                <h2>主要引用來源</h2>
              </div>
              <p>本專區使用的政策與治理資料，保留原始來源連結，便於後續審稿與更新。</p>
            </div>
            <div className="source-list">
              {sources.slice(0, 8).map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" className="source-item" key={source.id}>
                  <strong>{source.title}</strong>
                  <span>{source.publisher} / {source.date}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="whitepaper-panel" id="download">
            <div>
              <span className="badge">Whitepaper CTA</span>
              <h2>完整白皮書與導入檢核表</h2>
              <p>若你正在評估 RAG、AI 文件流程、社內知識庫或 AI 治理，白皮書會把 12 篇文章的判斷框架整理成導入路線圖。</p>
            </div>
            <GenaiWhitepaperForm sourceArticleSlug={article.slug} />
          </section>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </SiteChrome>
  );
}
