import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckoutForm } from '@/app/components/CheckoutForm';
import { SiteChrome } from '@/app/components/SiteChrome';
import { Locale, normalizeLocale, publicLocale, siteContent } from '@/src/lib/siteContent';

const pageSlugs = [
  'features',
  'use-cases',
  'pricing',
  'checkout',
  'blog',
  'about',
  'privacy',
  'terms',
  'legal/tokushoho',
  'backoffice-dx-guide',
  'audit-trail-guide',
  'subsidy-management-guide',
  'google-sheets-gas-workflow',
  'payment-notification-workflow',
  'ai-administration-governance'
];

export function generateStaticParams() {
  return pageSlugs.flatMap((slug) => [
    { locale: 'zh-TW', slug: slug.split('/') },
    { locale: 'ja', slug: slug.split('/') },
    { locale: 'ja-JP', slug: slug.split('/') }
  ]);
}

export default async function ContentPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string; slug: string[] }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const [{ locale: rawLocale, slug }, query] = await Promise.all([params, searchParams]);
  const locale = normalizeLocale(rawLocale);
  const path = slug.join('/');
  const t = siteContent[locale];
  const page = t.pages[path as keyof typeof t.pages];

  if (!page) notFound();

  return (
    <SiteChrome locale={locale}>
      <main>
        <section className="container page-hero">
          <div className="eyebrow">KirokuFlow</div>
          <h1>{page[0]}</h1>
          <p>{page[1]}</p>
          {path === 'features' ? <Image src="/assets/kf-hero-zh.png" alt="KirokuFlow features" width={1800} height={900} /> : null}
          {path === 'use-cases' ? <Image src="/assets/kf-flow-illustration-soft.png" alt="KirokuFlow use cases" width={1536} height={864} /> : null}
        </section>
        {renderPage(path, locale, query.plan)}
      </main>
    </SiteChrome>
  );
}

function renderPage(path: string, locale: Locale, selectedPlan?: string) {
  const t = siteContent[locale];
  const localePath = publicLocale(locale);

  if (path === 'features') {
    return (
      <section className="container page-section">
        <div className="grid-3">
          {t.features.map(([title, body]) => (
            <article className="card" key={title}>
              <span className="icon">✓</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (path === 'use-cases') {
    return (
      <section className="container page-section">
        <div className="grid-2">
          {t.useCases.map(([title, body]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (path === 'pricing') {
    return (
      <section className="container page-section">
        <div className="plans">
          {t.plans.map((plan) => (
            <article className="plan" key={plan.id}>
              <h3>{plan.name}</h3>
              <p>{plan.summary}</p>
              <div className="price">{plan.price}</div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link className="button primary" href={`/${localePath}/checkout?plan=${plan.id}`}>
                {locale === 'ja-JP' ? '申し込む' : '選擇方案'}
              </Link>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (path === 'checkout') {
    return (
      <section className="container page-section grid-2">
        <div>
          <h2>{locale === 'ja-JP' ? 'サービス内容を確認する' : '確認服務內容'}</h2>
          <p>{locale === 'ja-JP' ? '決済前に導入目的、必要なテンプレート、運用範囲を整理できます。' : '付款前可先整理導入目標、模板需求與維護範圍，後續可接 Stripe Checkout。'}</p>
          <div className="notice">{t.checkout.missingStripe}</div>
        </div>
        <CheckoutForm locale={locale} selectedPlan={selectedPlan} />
      </section>
    );
  }

  if (path === 'blog') {
    return (
      <section className="container page-section">
        <div className="grid-3">
          {t.blog.map(([title, body], index) => (
            <article className="blog-card" key={title}>
              <Image
                src={index === 0 ? '/assets/kf-blog-cover-audit-trail-zh.png' : '/assets/kf-flow-illustration-soft.png'}
                alt={title}
                width={1536}
                height={864}
              />
              <div className="blog-card-content">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container page-section grid-2">
      <article className="card">
        <h2>{t.pages[path as keyof typeof t.pages][0]}</h2>
        <p>{t.pages[path as keyof typeof t.pages][1]}</p>
        <p>
          KirokuFlow｜紀錄流 是一套面向台灣與日本市場的輕量行政與經費流程管理工具，協助會議、委員會、學校計畫、研究補助、協會活動與專案型工作建立可追蹤、可交接、可稽核的數位流程。
        </p>
      </article>
      <article className="card">
        <h3>{locale === 'ja-JP' ? '関連する導線' : '相關導線'}</h3>
        <p>{locale === 'ja-JP' ? '記事、テンプレート、導入相談へつなげるための支柱ページです。' : '此頁作為文章、模板與導入諮詢之間的支柱頁。'}</p>
        <div className="hero-actions">
          <Link className="button primary" href={`/${localePath}/blog`}>
            Blog
          </Link>
          <Link className="button secondary" href={`/${localePath}/templates`}>
            Templates
          </Link>
        </div>
      </article>
    </section>
  );
}
