import { getBlogPosts } from '@/src/lib/blog';
import { getSiteUrl } from '@/src/lib/siteUrl';

export function GET() {
  const site = getSiteUrl();
  const pages = ['', 'blog', 'templates', 'contact', 'backoffice-dx-guide', 'audit-trail-guide', 'subsidy-management-guide', 'google-sheets-gas-workflow', 'payment-notification-workflow', 'ai-administration-governance']
    .map((slug) => `<url><loc>${site}/ja${slug ? `/${slug}` : ''}</loc></url>`)
    .join('');
  const posts = getBlogPosts('ja-JP').map((post) => `<url><loc>${site}/ja/blog/${post.slug}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}${posts}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
