import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildArticleJsonLd, buildFaqJsonLd, extractFaq, getAllBlogPosts, getBlogPost, getPostUrl } from '@/src/lib/blog';
import { MarkdownRenderer } from '@/src/lib/blog/MarkdownRenderer';
import { getSiteUrl } from '@/src/lib/siteUrl';
import { normalizeLocale, publicLocale } from '@/src/lib/siteContent';
import { SiteChrome } from '@/app/components/SiteChrome';
import { LeadForm } from '@/app/components/LeadForm';

export function generateStaticParams() {
  return getAllBlogPosts().flatMap((post) => [
    { locale: publicLocale(post.locale), slug: post.slug },
    ...(post.locale === 'ja-JP' ? [{ locale: 'ja-JP', slug: post.slug }] : [])
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const post = getBlogPost(locale, slug);
  if (!post) return {};
  const localePath = publicLocale(locale);
  const pairedLocalePath = locale === 'ja-JP' ? 'zh-TW' : 'ja';
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${getSiteUrl()}/${localePath}/blog/${post.slug}`,
      languages: {
        [locale === 'ja-JP' ? 'ja' : 'zh-TW']: `${getSiteUrl()}/${localePath}/blog/${post.slug}`,
        [locale === 'ja-JP' ? 'zh-TW' : 'ja']: `${getSiteUrl()}/${pairedLocalePath}/blog/${post.pairedSlug || post.slug}`
      }
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: ['/assets/kf-blog-cover-audit-trail-zh.png']
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const post = getBlogPost(locale, slug);
  if (!post) notFound();

  const faq = extractFaq(post.body);
  const faqJsonLd = buildFaqJsonLd(post);
  const related = getAllBlogPosts().filter((item) => item.locale === post.locale && item.slug !== post.slug).slice(0, 3);

  return (
    <SiteChrome locale={locale}>
      <main>
        <article className="container article-shell">
          <nav className="breadcrumb">
            <Link href={`/${localePath}`}>KirokuFlow</Link>
            <span>/</span>
            <Link href={`/${localePath}/blog`}>{locale === 'ja-JP' ? 'コラム' : '專欄'}</Link>
          </nav>
          <header className="article-header">
            <span className="badge">{post.cluster}</span>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div className="article-meta">
              <span>{post.publishedAt}</span>
              <span>Updated {post.updatedAt}</span>
              <span>Score {post.qualityScore}</span>
            </div>
          </header>
          <aside className="toc">
            <strong>{locale === 'ja-JP' ? '目次' : '目錄'}</strong>
            <p>{locale === 'ja-JP' ? '結論、課題、実務フロー、FAQ、CTA' : '結論、痛點、實務流程、FAQ、CTA'}</p>
          </aside>
          <MarkdownRenderer body={post.body} />
          {faq.length ? (
            <section className="faq-panel">
              <h2>FAQ</h2>
              {faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </section>
          ) : null}
          <section className="cta-panel">
            <h2>{locale === 'ja-JP' ? 'KirokuFlow で事務フローを整理する' : '用 KirokuFlow 整理行政流程'}</h2>
            <p>
              {locale === 'ja-JP'
                ? '現在の記録、承認、支払い通知、保存の流れを一緒に棚卸しできます。'
                : '可以一起盤點目前的紀錄、審核、匯款通知與留存流程。'}
            </p>
            <LeadForm locale={locale} sourceArticleSlug={post.slug} inquiryType={post.ctaType} />
          </section>
          <section className="related-panel">
            <h2>{locale === 'ja-JP' ? '関連記事' : '相關文章'}</h2>
            <div className="grid-3">
              {related.map((item) => (
                <Link className="card" key={item.slug} href={`/${localePath}/blog/${item.slug}`}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(post)) }} />
        {faqJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'KirokuFlow', item: getSiteUrl() },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${getSiteUrl()}/${localePath}/blog` },
                { '@type': 'ListItem', position: 3, name: post.title, item: getPostUrl(post) }
              ]
            })
          }}
        />
      </main>
    </SiteChrome>
  );
}
