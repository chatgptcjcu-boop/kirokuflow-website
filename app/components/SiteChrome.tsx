import Image from 'next/image';
import Link from 'next/link';
import { Locale, siteContent } from '@/src/lib/siteContent';

export function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = siteContent[locale];
  const otherLocale = locale === 'ja-JP' ? 'zh-TW' : 'ja-JP';

  return (
    <div className="site-shell">
      <header className="nav">
        <div className="container nav-inner">
          <Link href={`/${locale}`} aria-label="KirokuFlow home">
            <Image className="brand-logo" src="/assets/kf-logo-primary-a.svg" alt="KirokuFlow" width={360} height={96} priority />
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <Link href={`/${locale}/features`}>{t.nav.features}</Link>
            <Link href={`/${locale}/use-cases`}>{t.nav.useCases}</Link>
            <Link href={`/${locale}/pricing`}>{t.nav.pricing}</Link>
            <Link href={`/${locale}/blog`}>{t.nav.blog}</Link>
            <Link href={`/${locale}/about`}>{t.nav.about}</Link>
          </nav>
          <div className="nav-actions">
            <Link className="lang-link" href={`/${otherLocale}`}>
              {t.nav.otherLocale}
            </Link>
            <Link className="button primary" href={`/${locale}/pricing`}>
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
            <Link href={`/${locale}/privacy`}>{locale === 'ja-JP' ? 'プライバシー' : '隱私權'}</Link>
            <Link href={`/${locale}/terms`}>{locale === 'ja-JP' ? '利用規約' : '服務條款'}</Link>
            <Link href={`/${locale}/legal/tokushoho`}>{locale === 'ja-JP' ? '特商法表記' : '特商法表示'}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
