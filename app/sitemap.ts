import type { MetadataRoute } from 'next';
import { getAllAiServiceSlugs } from '@/src/lib/aiServiceContent';
import { getAllBlogPosts } from '@/src/lib/blog';
import { getGenaiArticles } from '@/src/lib/genai';
import { getSiteUrl } from '@/src/lib/siteUrl';
import { publicLocale } from '@/src/lib/siteContent';

const pageSlugs = [
  '',
  'blog',
  'templates',
  'contact',
  ...getAllAiServiceSlugs(),
  'backoffice-dx-guide',
  'audit-trail-guide',
  'subsidy-management-guide',
  'google-sheets-gas-workflow',
  'payment-notification-workflow',
  'ai-administration-governance',
  'japan-government-ai-genai',
  'legal/tokushoho'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const pages = ['ja', 'zh-TW'].flatMap((locale) =>
    pageSlugs.map((slug) => ({
      url: `${site}/${locale}${slug ? `/${slug}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: slug === '' ? 1 : 0.7
    }))
  );
  const posts = getAllBlogPosts().map((post) => ({
    url: `${site}/${publicLocale(post.locale)}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));
  const genaiArticles = ['ja', 'zh-TW'].flatMap((locale) =>
    getGenaiArticles().map((article) => ({
      url: `${site}/${locale}/japan-government-ai-genai/articles/${article.slug}`,
      lastModified: article.lastReviewed ? new Date(article.lastReviewed) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.82
    }))
  );
  return [...pages, ...posts, ...genaiArticles];
}
