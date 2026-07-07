import { getBlogPosts } from '@/src/lib/blog';
import { getSiteUrl } from '@/src/lib/siteUrl';

export function GET() {
  const site = getSiteUrl();
  const pages = ['', 'blog', 'templates', 'contact']
    .map((slug) => `<url><loc>${site}/zh-TW${slug ? `/${slug}` : ''}</loc></url>`)
    .join('');
  const posts = getBlogPosts('zh-TW').map((post) => `<url><loc>${site}/zh-TW/blog/${post.slug}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}${posts}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
