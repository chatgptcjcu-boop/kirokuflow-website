import Image from 'next/image';
import Link from 'next/link';
import { Locale, oppositeLocale, publicLocale, siteContent } from '@/src/lib/siteContent';

export function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = siteContent[locale];
  const currentLocale = publicLocale(locale);
  const otherLocale = oppositeLocale(locale);

  return (
    <div className="site-shell">
      <header className="nav">
        <div className="container nav-inner">
          <Link href={`/${currentLocale}`} aria-label="KirokuFlow home">
            <Image className="brand-logo" src="/assets/brand/kirokuflow-group-logo-lockup.png" alt="KirokuFlow Group" width={1161} height={283} priority />
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <Link href={`/${currentLocale}/ai-workflow`}>{t.nav.services}</Link>
            <Link href={`/${currentLocale}/government-ai-trends`}>{t.nav.trends}</Link>
            <Link href={`/${currentLocale}/resources`}>{t.nav.resources}</Link>
            <Link href={`/${currentLocale}/case-studies`}>{t.nav.cases}</Link>
            <Link href={`/${currentLocale}/contact`}>{t.nav.contact}</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <div className="nav-actions">
            <Link className="lang-link" href={`/${otherLocale}`}>
              {t.nav.otherLocale}
            </Link>
            <Link className="button primary" href={`/${currentLocale}/contact`}>
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Image src="/assets/brand/kirokuflow-group-footer-bar.png" alt="KirokuFlow Group" width={407} height={81} />
            <p>{locale === 'ja-JP' ? '記録、フロー、信頼をつなぐ事務管理ツール。' : '記錄、流程、信任，讓管理更流暢。'}</p>
          </div>
          <div className="nav-links">
            <Link href={`/${currentLocale}/privacy`}>{locale === 'ja-JP' ? 'プライバシー' : '隱私權'}</Link>
            <Link href={`/${currentLocale}/terms`}>{locale === 'ja-JP' ? '利用規約' : '服務條款'}</Link>
            <Link href={`/${currentLocale}/blog`}>{t.nav.blog}</Link>
            <Link href={`/${currentLocale}/legal/tokushoho`}>{locale === 'ja-JP' ? '特商法表記' : '特商法表示'}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
