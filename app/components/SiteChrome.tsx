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
            <Image className="brand-logo" src="/assets/kf-logo-primary-a.svg" alt="KirokuFlow" width={360} height={96} priority />
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <Link href={`/${currentLocale}/blog`}>{t.nav.blog}</Link>
            <Link href={`/${currentLocale}/templates`}>{t.nav.templates}</Link>
            <Link href={`/${currentLocale}/use-cases`}>{t.nav.useCases}</Link>
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
          <div>
            <strong>KirokuFlow｜紀錄流</strong>
            <p>{locale === 'ja-JP' ? '記録、フロー、信頼をつなぐ事務管理ツール。' : '記錄、流程、信任，讓管理更流暢。'}</p>
          </div>
          <div className="nav-links">
            <Link href={`/${currentLocale}/privacy`}>{locale === 'ja-JP' ? 'プライバシー' : '隱私權'}</Link>
            <Link href={`/${currentLocale}/terms`}>{locale === 'ja-JP' ? '利用規約' : '服務條款'}</Link>
            <Link href={`/${currentLocale}/legal/tokushoho`}>{locale === 'ja-JP' ? '特商法表記' : '特商法表示'}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
