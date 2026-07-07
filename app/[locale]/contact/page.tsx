import type { Metadata } from 'next';
import { LeadForm } from '@/app/components/LeadForm';
import { getSiteUrl } from '@/src/lib/siteUrl';
import { normalizeLocale, publicLocale, siteContent } from '@/src/lib/siteContent';
import { SiteChrome } from '@/app/components/SiteChrome';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const localePath = publicLocale(locale);
  const title = siteContent[locale].pages.contact[0];
  const description = siteContent[locale].pages.contact[1];
  return {
    title: `${title}｜KirokuFlow`,
    description,
    alternates: {
      canonical: `${getSiteUrl()}/${localePath}/contact`,
      languages: { ja: `${getSiteUrl()}/ja/contact`, 'zh-TW': `${getSiteUrl()}/zh-TW/contact` }
    }
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = siteContent[locale];
  return (
    <SiteChrome locale={locale}>
      <main>
        <section className="container page-hero">
          <div className="eyebrow">Contact</div>
          <h1>{t.pages.contact[0]}</h1>
          <p>{t.pages.contact[1]}</p>
        </section>
        <section className="container page-section grid-2">
          <article className="card">
            <h2>{locale === 'ja-JP' ? '導入相談・テンプレート相談' : '導入討論與模板需求'}</h2>
            <p>
              {locale === 'ja-JP'
                ? '学校、委員会、研究費、補助金、イベント運営の事務フローを一緒に整理します。'
                : '可針對學校、委員會、研究補助、活動行政與跨單位專案一起盤點流程。'}
            </p>
          </article>
          <LeadForm locale={locale} inquiryType="consultation" />
        </section>
      </main>
    </SiteChrome>
  );
}
