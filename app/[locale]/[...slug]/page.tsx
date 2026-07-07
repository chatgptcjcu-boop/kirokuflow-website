import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckoutForm } from '@/app/components/CheckoutForm';
import { LeadForm } from '@/app/components/LeadForm';
import { SiteChrome } from '@/app/components/SiteChrome';
import { AiServicePage, getAiServicePage } from '@/src/lib/aiServiceContent';
import { getPillarPage, PillarPage } from '@/src/lib/pillarContent';
import { Locale, normalizeLocale, publicLocale, siteContent } from '@/src/lib/siteContent';
import { getSiteUrl } from '@/src/lib/siteUrl';

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
  'ai-workflow',
  'government-ai-trends',
  'rag-knowledge-base',
  'content-factory',
  'case-studies',
  'ai-governance',
  'resources',
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const path = slug.join('/');
  const pillar = getPillarPage(locale, path);
  const service = getAiServicePage(locale, path);
  const t = siteContent[locale];
  const page = t.pages[path as keyof typeof t.pages];
  if (!pillar && !service && !page) return {};
  const localePath = publicLocale(locale);
  const title = service?.title || pillar?.title || page[0];
  const description = service?.description || pillar?.description || page[1];
  return {
    title,
    description,
    alternates: {
      canonical: `${getSiteUrl()}/${localePath}/${path}`,
      languages: {
        [locale === 'ja-JP' ? 'ja' : 'zh-TW']: `${getSiteUrl()}/${localePath}/${path}`,
        [locale === 'ja-JP' ? 'zh-TW' : 'ja']: `${getSiteUrl()}/${locale === 'ja-JP' ? 'zh-TW' : 'ja'}/${path}`
      }
    },
    openGraph: {
      title,
      description,
      images: ['/assets/kf-og-home-zh-tw-v1.svg']
    }
  };
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
  const pillar = getPillarPage(locale, path);
  const service = getAiServicePage(locale, path);

  if (!page && !pillar && !service) notFound();

  return (
    <SiteChrome locale={locale}>
      <main>
        {service ? (
          <AiServiceLanding page={service} locale={locale} />
        ) : pillar ? (
          <PillarGuide page={pillar} locale={locale} />
        ) : (
          <>
            <section className="container page-hero">
              <div className="eyebrow">KirokuFlow</div>
              <h1>{page[0]}</h1>
              <p>{page[1]}</p>
              {path === 'features' ? <Image src="/assets/kf-hero-zh.png" alt="KirokuFlow features" width={1800} height={900} /> : null}
              {path === 'use-cases' ? <Image src="/assets/kf-flow-illustration-soft.png" alt="KirokuFlow use cases" width={1536} height={864} /> : null}
            </section>
            {renderPage(path, locale, query.plan)}
          </>
        )}
      </main>
    </SiteChrome>
  );
}

function AiServiceLanding({ page, locale }: { page: AiServicePage; locale: Locale }) {
  const localePath = publicLocale(locale);
  const pageUrl = `${getSiteUrl()}/${localePath}/${page.slug}`;
  const related = page.related.filter(Boolean);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': page.layer === 'service' ? 'Service' : 'Article',
    name: page.title,
    description: page.description,
    provider: { '@type': 'Organization', name: 'KirokuFlow' },
    url: pageUrl
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };

  return (
    <>
      <article className="container service-shell">
        <nav className="breadcrumb">
          <Link href={`/${localePath}`}>KirokuFlow</Link>
          <span>/</span>
          <span>{page.eyebrow}</span>
        </nav>
        <header className="service-hero">
          <div>
            <span className={`service-layer layer-${page.layer}`}>{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <div className="hero-actions">
              <Link className="button primary" href={`/${localePath}/contact`}>
                {page.primaryCta}
              </Link>
              <Link className="button secondary" href={`/${localePath}/${related[0] || 'resources'}`}>
                {page.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="service-map" aria-label="AI workflow diagram">
            {page.flow.map((step, index) => (
              <div className="service-map-node" key={step.title}>
                <span>{index + 1}</span>
                <strong>{step.title}</strong>
                <small>{step.body}</small>
              </div>
            ))}
          </div>
        </header>

        <section className="metric-strip" aria-label="Service metrics">
          {page.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="service-bullets">
          {page.bullets.map((bullet) => (
            <div key={bullet}><span>✓</span>{bullet}</div>
          ))}
        </section>

        <section className="service-sections">
          {page.sections.map((section) => (
            <article className="service-section-card" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {page.slug === 'resources' ? <ResourceIndex localePath={localePath} /> : null}

        {page.slug === 'case-studies' ? <CaseStudyGrid /> : null}

        <section className="related-panel">
          <h2>{locale === 'ja-JP' ? '関連ページ' : '相關頁面'}</h2>
          <div className="grid-3">
            {related.map((slug) => (
              <Link className="card" href={`/${localePath}/${slug}`} key={slug}>
                <h3>{slug.replaceAll('-', ' ')}</h3>
                <p>{locale === 'ja-JP' ? 'このテーマに関連する KirokuFlow のページです。' : '此頁與本主題相關，可接續閱讀。'}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="faq-panel">
          <h2>FAQ</h2>
          {page.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="cta-panel">
          <h2>{locale === 'ja-JP' ? 'AI 文書ワークフローを相談する' : '討論 AI 文件工作流導入'}</h2>
          <p>{locale === 'ja-JP' ? '現在の文書、知識庫、審査、公開フローを棚卸しし、段階的な導入案に落とし込めます。' : '可以先盤點目前的文件、知識庫、審核與發布流程，再規劃分階段導入。'}</p>
          <LeadForm locale={locale} sourceArticleSlug={page.slug} inquiryType={page.layer} />
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}

function ResourceIndex({ localePath }: { localePath: string }) {
  const resources = [
    ['backoffice-dx-guide', '行政 DX / Backoffice DX'],
    ['audit-trail-guide', '監査証跡 / Audit Trail'],
    ['subsidy-management-guide', '補助金・研究費管理'],
    ['google-sheets-gas-workflow', 'Google Sheets + GAS'],
    ['payment-notification-workflow', '支払通知フロー'],
    ['ai-administration-governance', 'AI 行政治理'],
    ['blog', 'Blog / MDX articles'],
    ['templates', 'Templates']
  ];
  return (
    <section className="resource-index">
      <h2>Resource Library</h2>
      <div className="grid-2">
        {resources.map(([slug, label]) => (
          <Link className="resource-link" href={`/${localePath}/${slug}`} key={slug}>
            <span>{label}</span>
            <strong>Read</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CaseStudyGrid() {
  const cases = [
    ['学校プロジェクト', '分散した要項、申請、謝金、通知を一つの AI 文書フローに整理。'],
    ['委員会運営', '年度交代時の引き継ぎ資料と承認理由をナレッジベース化。'],
    ['小規模法人', '社内規程、FAQ、支払い通知、問い合わせ対応を RAG 化。']
  ];
  return (
    <section className="case-grid">
      {cases.map(([title, body]) => (
        <article className="card" key={title}>
          <span className="badge">Case</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </article>
      ))}
    </section>
  );
}

function PillarGuide({ page, locale }: { page: PillarPage; locale: Locale }) {
  const localePath = publicLocale(locale);
  const url = `${getSiteUrl()}/${localePath}/${page.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.title,
    description: page.description,
    dateModified: page.updatedAt,
    author: { '@type': 'Organization', name: 'KirokuFlow' },
    publisher: { '@type': 'Organization', name: 'KirokuFlow' },
    mainEntityOfPage: url,
    keywords: page.keywords.join(', ')
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };

  return (
    <>
      <article className="container pillar-shell">
        <nav className="breadcrumb">
          <Link href={`/${localePath}`}>KirokuFlow</Link>
          <span>/</span>
          <span>{page.target}</span>
        </nav>
        <header className="pillar-hero">
          <div>
            <span className="badge">{page.target}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <div className="article-meta">
              <span>Updated {page.updatedAt}</span>
              <span>{page.readingTime}</span>
              <span>{page.keywords.join(' / ')}</span>
            </div>
          </div>
          <div className="pillar-visual" aria-label="KirokuFlow process diagram">
            {page.flow.map((step, index) => (
              <div className="pillar-node" key={step.title}>
                <span>{index + 1}</span>
                <strong>{step.title}</strong>
              </div>
            ))}
          </div>
        </header>

        <aside className="pillar-summary">
          <strong>このページの要点</strong>
          {page.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </aside>

        <section className="pillar-flow" aria-label="Flow chart">
          {page.flow.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </article>
          ))}
        </section>

        <div className="article-body">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="scenario-panel">
          <div>
            <span className="badge">Scenario</span>
            <h2>想定される利用シーン</h2>
          </div>
          <div className="grid-3">
            {page.scenario.map((item) => (
              <article className="card" key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="checklist-panel">
          <h2>導入前チェックリスト</h2>
          <div className="checklist-grid">
            {page.checklist.map((item) => (
              <div key={item}><span>✓</span>{item}</div>
            ))}
          </div>
        </section>

        <section className="faq-panel">
          <h2>FAQ</h2>
          {page.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="cta-panel">
          <h2>KirokuFlow で事務フローを整理する</h2>
          <p>現在の申請、確認、支払い通知、保存の流れを棚卸しし、軽量な導入案に落とし込めます。</p>
          <LeadForm locale={locale} sourceArticleSlug={page.slug} inquiryType="pillar_page" />
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
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
