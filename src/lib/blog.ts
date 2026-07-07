import fs from 'fs';
import path from 'path';
import { Locale, normalizeLocale, publicLocale } from './siteContent';
import { getSiteUrl } from './siteUrl';

export type BlogPost = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  cluster: string;
  articleType: string;
  keywords: string[];
  sourceUrls: string[];
  schemaType: string;
  ctaType: string;
  publishedAt: string;
  updatedAt: string;
  pairedSlug?: string;
  qualityScore: number;
  body: string;
};

type FrontmatterValue = string | string[] | number;

const blogRoot = path.join(process.cwd(), 'content', 'blog');

function parseValue(value: string): FrontmatterValue {
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^"|"$/g, ''))
      .filter(Boolean);
  }
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/^"|"$/g, '');
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith('---')) {
    return { data: {} as Record<string, FrontmatterValue>, body: raw };
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {} as Record<string, FrontmatterValue>, body: raw };
  }
  const lines = raw.slice(3, end).trim().split('\n');
  const data: Record<string, FrontmatterValue> = {};
  for (const line of lines) {
    const index = line.indexOf(':');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1);
    data[key] = parseValue(value);
  }
  return { data, body: raw.slice(end + 4).trim() };
}

function readPostFile(locale: Locale, slug: string): BlogPost | null {
  const file = path.join(blogRoot, locale, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, body } = parseFrontmatter(raw);
  return {
    slug: String(data.slug || slug),
    locale,
    title: String(data.title || slug),
    description: String(data.description || ''),
    cluster: String(data.cluster || ''),
    articleType: String(data.article_type || 'long_tail'),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    sourceUrls: Array.isArray(data.source_urls) ? data.source_urls : [],
    schemaType: String(data.schema_type || 'Article'),
    ctaType: String(data.cta_type || 'contact'),
    publishedAt: String(data.published_at || ''),
    updatedAt: String(data.updated_at || data.published_at || ''),
    pairedSlug: data.paired_slug ? String(data.paired_slug) : undefined,
    qualityScore: Number(data.quality_score || 0),
    body
  };
}

export function getBlogPosts(localeInput: string): BlogPost[] {
  const locale = normalizeLocale(localeInput);
  const dir = path.join(blogRoot, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => readPostFile(locale, file.replace(/\.mdx$/, '')))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(localeInput: string, slug: string) {
  return readPostFile(normalizeLocale(localeInput), slug);
}

export function getAllBlogPosts() {
  return [...getBlogPosts('ja-JP'), ...getBlogPosts('zh-TW')];
}

export function getPostUrl(post: BlogPost) {
  return `${getSiteUrl()}/${publicLocale(post.locale)}/blog/${post.slug}`;
}

export function extractFaq(body: string) {
  const faqSection = body.split(/^## FAQ$/m)[1] || '';
  const matches = [...faqSection.matchAll(/^### (.+)\n\n([\s\S]*?)(?=\n### |\n## |$)/gm)];
  return matches.map((match) => ({
    question: match[1].trim(),
    answer: match[2].trim().replace(/\n/g, ' ')
  }));
}

export function buildArticleJsonLd(post: BlogPost) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'KirokuFlow' },
    publisher: {
      '@type': 'Organization',
      name: 'KirokuFlow',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/kf-logo-primary-a.svg` }
    },
    mainEntityOfPage: getPostUrl(post)
  };
}

export function buildFaqJsonLd(post: BlogPost) {
  const faq = extractFaq(post.body);
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };
}
