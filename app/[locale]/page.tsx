import Image from 'next/image';
import Link from 'next/link';
import { Locale, normalizeLocale, siteContent } from '@/src/lib/siteContent';
import { SiteChrome } from '../components/SiteChrome';

export function generateStaticParams() {
  return [{ locale: 'zh-TW' }, { locale: 'ja-JP' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = siteContent[locale];
  const heroImage = locale === 'ja-JP' ? '/assets/kf-hero-ja.png' : '/assets/kf-hero-zh.png';

  return (
    <SiteChrome locale={locale}>
      <main>
        <section className="container hero">
          <div>
            <div className="eyebrow">{t.hero.eyebrow}</div>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.description}</p>
            <div className="hero-actions">
              <Link className="button primary" href={`/${locale}/pricing`}>
                {t.hero.primaryCta}
              </Link>
              <Link className="button secondary" href={`/${locale}/features`}>
                {t.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="hero-media">
            <Image src={heroImage} alt="KirokuFlow workflow illustration" width={1800} height={900} priority />
          </div>
        </section>

        <section className="container">
          <div className="trust-row">
            {t.trust.map(([title, body]) => (
              <div className="trust-item" key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>{locale === 'ja-JP' ? '分散した事務を、一つの流れへ。' : '把分散的行政，整理成一條流。'}</h2>
              <p>
                {locale === 'ja-JP'
                  ? '小さく始めても、記録、承認、支払い、保存の流れを最初から意識して設計します。'
                  : '即使從 Google Sheets 與 GAS 開始，也能先把記錄、審核、付款與留存的脈絡設計好。'}
              </p>
            </div>
            <div className="grid-3">
              {t.problems.map(([title, body], index) => (
                <article className="card" key={title}>
                  <span className="icon">{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container flow-band">
            <div>
              <div className="eyebrow">KirokuFlow</div>
              <h2>{locale === 'ja-JP' ? '申請から保存まで見える化' : '從申請到留存，一路清楚可追蹤'}</h2>
              <div className="steps">
                {t.flow.map(([title, body], index) => (
                  <div className="step" key={title}>
                    <span className="step-number">{index + 1}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Image src="/assets/kf-process-steps.png" alt="KirokuFlow process steps" width={1536} height={864} />
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <div className="section-head">
              <h2>{locale === 'ja-JP' ? '必要な機能を軽く、でも確実に。' : '需要的功能要輕，但不能漏。'}</h2>
              <p>
                {locale === 'ja-JP'
                  ? '事務担当、財務担当、承認者、次の担当者が同じ記録を見られる状態を作ります。'
                  : '讓承辦、財務、審核者與下一任接手的人，都能看見同一份可信任紀錄。'}
              </p>
            </div>
            <div className="grid-3">
              {t.features.map(([title, body], index) => (
                <article className="card" key={title}>
                  <span className="icon">✓</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>{locale === 'ja-JP' ? '導入プラン' : '導入方案'}</h2>
              <p>{locale === 'ja-JP' ? '正式な製品化前でも、サービス型の導入から始められます。' : '在正式產品化以前，可先用服務方案完成導入、模板與維護。'}</p>
            </div>
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
                  <Link className="button primary" href={`/${locale}/checkout?plan=${plan.id}`}>
                    {locale === 'ja-JP' ? '申し込む' : '選擇方案'}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>{locale === 'ja-JP' ? '最新コラム' : '最新專欄'}</h2>
              <Link className="button secondary" href={`/${locale}/blog`}>
                {locale === 'ja-JP' ? 'すべて見る' : '閱讀更多'}
              </Link>
            </div>
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
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
