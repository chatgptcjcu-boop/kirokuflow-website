import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'KirokuFlow｜紀錄流',
  description: '輕量行政與經費流程管理工具，協助團隊整理紀錄、串接流程、留下可信任的稽核軌跡。',
  openGraph: {
    title: 'KirokuFlow｜紀錄流',
    description: '讓行政紀錄自然流動，讓經費流程清楚留痕。',
    images: ['/assets/kf-og-home-zh-tw-v1.svg']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
