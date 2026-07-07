import { getAllBlogPosts } from '@/src/lib/blog';
import { getSiteUrl } from '@/src/lib/siteUrl';
import { publicLocale } from '@/src/lib/siteContent';

export function GET() {
  const site = getSiteUrl();
  const items = getAllBlogPosts()
    .map(
      (post) => `<item>
  <title><![CDATA[${post.title}]]></title>
  <description><![CDATA[${post.description}]]></description>
  <link>${site}/${publicLocale(post.locale)}/blog/${post.slug}</link>
  <guid>${site}/${publicLocale(post.locale)}/blog/${post.slug}</guid>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
</item>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>KirokuFlow Blog</title>
  <description>KirokuFlow administrative DX, audit trail, and budget workflow articles.</description>
  <link>${site}</link>
  ${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
