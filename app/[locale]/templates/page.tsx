import type { Metadata } from 'next';
import { getSiteUrl } from '@/src/lib/siteUrl';
import { normalizeLocale, publicLocale, siteContent } from '@/src/lib/siteContent';
import { SiteChrome } from '@/app/components/SiteChrome';
import { LeadForm } from '@/app/components/LeadForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const title = siteContent[locale].pages.templates[0];
  const description = siteContent[locale].pages.templates[1];
  return {
    title: `${title}｜KirokuFlow`,
    description,
    alternates: {
      canonical: `${getSiteUrl()}/${localePath}/templates`,
      languages: { ja: `${getSiteUrl()}/ja/templates`, 'zh-TW': `${getSiteUrl()}/zh-TW/templates` }
    }
  };
}

export default async function TemplatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = siteContent[locale];
  const templates =
    locale === 'ja-JP'
      ? ['出席者名簿テンプレート', '経費申請チェックリスト', '監査証跡フィールド一覧', 'Google Sheets + GAS 事務フロー']
      : ['出席名單模板', '經費申請檢核表', '稽核留痕欄位清單', 'Google Sheets + GAS 行政流程'];

  return (
    <SiteChrome locale={locale}>
      <main>
        <section className="container page-hero">
          <div className="eyebrow">Templates</div>
          <h1>{t.pages.templates[0]}</h1>
          <p>{t.pages.templates[1]}</p>
        </section>
        <section className="container page-section grid-2">
          <div className="grid-2">
            {templates.map((item) => (
              <article className="card" key={item}>
                <span className="icon">✓</span>
                <h3>{item}</h3>
                <p>{locale === 'ja-JP' ? 'MVP では相談フォーム経由で提供します。' : 'MVP 階段先透過表單索取與導入討論。'}</p>
              </article>
            ))}
          </div>
          <LeadForm locale={locale} inquiryType="template_download" />
        </section>
      </main>
    </SiteChrome>
  );
}
