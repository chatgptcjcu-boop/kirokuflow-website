import Image from 'next/image';
import Link from 'next/link';
import { normalizeLocale, publicLocale, siteContent } from '@/src/lib/siteContent';
import { getBlogPosts } from '@/src/lib/blog';
import { SiteChrome } from '../components/SiteChrome';
import { getSiteUrl } from '@/src/lib/siteUrl';

export function generateStaticParams() {
  return [{ locale: 'zh-TW' }, { locale: 'ja' }, { locale: 'ja-JP' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const t = siteContent[locale];
  const heroImage = locale === 'ja-JP' ? '/assets/kf-hero-ja.png' : '/assets/kf-hero-zh.png';
  const posts = getBlogPosts(locale).slice(0, 3);

  return (
    <SiteChrome locale={locale}>
      <main>
        <section className="container hero">
          <div>
            <div className="eyebrow">{t.hero.eyebrow}</div>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.description}</p>
            <div className="hero-actions">
              <Link className="button primary" href={`/${localePath}/ai-workflow`}>
                {t.hero.primaryCta}
              </Link>
              <Link className="button secondary" href={`/${localePath}/resources`}>
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
              <h2>{locale === 'ja-JP' ? 'AI を入れる前に、文書と判断の流れを整える。' : '導入 AI 之前，先整理文件與判斷流程。'}</h2>
              <p>
                {locale === 'ja-JP'
                  ? '文書が散らばったままでは、AI の回答も業務判断も安定しません。まず検索、引用、レビュー、記録の流れを設計します。'
                  : '文件散落各處時，AI 回答與業務判斷都難以穩定。先把搜尋、引用、審核與紀錄流程設計好。'}
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
              <h2>{locale === 'ja-JP' ? '文書棚卸しから AI 利用記録まで' : '從文件盤點到 AI 使用紀錄'}</h2>
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
              <h2>{locale === 'ja-JP' ? 'AI を業務で使うために必要な設計' : '讓 AI 能進入工作流程的必要設計'}</h2>
              <p>
                {locale === 'ja-JP'
                  ? '回答を生成するだけでなく、根拠、権限、レビュー、利用ログまで確認できる状態を作ります。'
                  : '不只生成回答，也要能確認來源、權限、審核與使用紀錄。'}
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
                  <Link className="button primary" href={`/${localePath}/checkout?plan=${plan.id}`}>
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
              <Link className="button secondary" href={`/${localePath}/blog`}>
                {locale === 'ja-JP' ? 'すべて見る' : '閱讀更多'}
              </Link>
            </div>
            <div className="grid-3">
              {posts.map((post, index) => (
                <article className="blog-card" key={post.slug}>
                  <Image
                    src={index === 0 ? '/assets/kf-blog-cover-audit-trail-zh.png' : '/assets/kf-flow-illustration-soft.png'}
                    alt={post.title}
                    width={1536}
                    height={864}
                  />
                  <div className="blog-card-content">
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <Link href={`/${localePath}/blog/${post.slug}`}>{locale === 'ja-JP' ? '読む' : '閱讀'}</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'KirokuFlow',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description:
                'KirokuFlow｜紀錄流 是一套面向台灣與日本市場的輕量行政與經費流程管理工具，協助會議、委員會、學校計畫、研究補助、協會活動與專案型工作建立可追蹤、可交接、可稽核的數位流程。',
              url: `${getSiteUrl()}/${localePath}`
            })
          }}
        />
      </main>
    </SiteChrome>
  );
}
