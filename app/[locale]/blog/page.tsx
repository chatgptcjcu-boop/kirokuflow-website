import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/src/lib/blog';
import { getSiteUrl } from '@/src/lib/siteUrl';
import { normalizeLocale, publicLocale, siteContent } from '@/src/lib/siteContent';
import { SiteChrome } from '@/app/components/SiteChrome';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const title = locale === 'ja-JP' ? 'コラム｜KirokuFlow' : '專欄｜KirokuFlow';
  const description = locale === 'ja-JP' ? '行政 DX、監査証跡、経費フローに関する KirokuFlow の記事一覧。' : '行政 DX、稽核留痕、經費流程相關文章。';
  return {
    title,
    description,
    alternates: {
      canonical: `${getSiteUrl()}/${localePath}/blog`,
      languages: {
        ja: `${getSiteUrl()}/ja/blog`,
        'zh-TW': `${getSiteUrl()}/zh-TW/blog`
      }
    },
    openGraph: { title, description }
  };
}

export default async function BlogList({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const t = siteContent[locale];
  const posts = getBlogPosts(locale);

  return (
    <SiteChrome locale={locale}>
      <main>
        <section className="container page-hero">
          <div className="eyebrow">Content Hub</div>
          <h1>{t.pages.blog[0]}</h1>
          <p>{t.pages.blog[1]}</p>
        </section>
        <section className="container page-section">
          <div className="grid-3">
            {posts.map((post, index) => (
              <article className="blog-card" key={post.slug}>
                <Image src={index === 0 ? '/assets/kf-blog-cover-audit-trail-zh.png' : '/assets/kf-flow-illustration-soft.png'} alt={post.title} width={1536} height={864} />
                <div className="blog-card-content">
                  <span className="badge">{post.cluster}</span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link className="button secondary" href={`/${localePath}/blog/${post.slug}`}>
                    {locale === 'ja-JP' ? '読む' : '閱讀'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
