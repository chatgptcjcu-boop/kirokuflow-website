import fs from 'fs';
import path from 'path';
import { publicLocale, type Locale } from './siteContent';
import { getSiteUrl } from './siteUrl';

const genaiDir = path.join(process.cwd(), 'content', 'genai');
const articlesDir = path.join(genaiDir, 'articles');

type FrontmatterValue = string | string[];

export type GenaiArticle = {
  no: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  language: string;
  status: string;
  keywords: string[];
  thumbnail: string;
  cta: string;
  lastReviewed: string;
  body: string;
};

export type GenaiTopic = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeywords: string[];
  body: string;
};

export type GenaiSource = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  notes: string;
};

function parseMarkdown(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {} as Record<string, FrontmatterValue>, body: raw };

  const frontmatter: Record<string, FrontmatterValue> = {};
  const lines = match[1].split('\n');
  let currentArrayKey = '';

  for (const line of lines) {
    const arrayItem = line.match(/^\s+-\s+(.+)$/);
    if (arrayItem && currentArrayKey) {
      const existing = frontmatter[currentArrayKey];
      frontmatter[currentArrayKey] = [...(Array.isArray(existing) ? existing : []), cleanValue(arrayItem[1])];
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;
    const [, key, value] = pair;
    if (!value) {
      frontmatter[key] = [];
      currentArrayKey = key;
      continue;
    }
    frontmatter[key] = cleanValue(value);
    currentArrayKey = '';
  }

  return { frontmatter, body: match[2].trim() };
}

function cleanValue(value: string) {
  return value.trim().replace(/^["']|["']$/g, '');
}

function stringValue(value: FrontmatterValue | undefined, fallback = '') {
  return Array.isArray(value) ? value[0] || fallback : value || fallback;
}

function stringArray(value: FrontmatterValue | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function getGenaiImage(no: string) {
  const padded = no.padStart(2, '0');
  const imagePath = path.join(process.cwd(), 'public', 'assets', 'genai', `${padded}.png`);
  if (fs.existsSync(imagePath)) return `/assets/genai/${padded}.png`;
  return '/assets/kf-og-home-ja-jp-v1.svg';
}

function articleFromFile(file: string): GenaiArticle {
  const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const { frontmatter, body } = parseMarkdown(raw);
  const no = stringValue(frontmatter.article_no, file.slice(0, 2));
  return {
    no,
    slug: stringValue(frontmatter.slug, file.replace(/^\d+-/, '').replace(/\.md$/, '')),
    title: stringValue(frontmatter.title),
    seoTitle: stringValue(frontmatter.seo_title, stringValue(frontmatter.title)),
    seoDescription: stringValue(frontmatter.seo_description),
    category: stringValue(frontmatter.category, '日本 GENAI 對照專區'),
    language: stringValue(frontmatter.language, 'zh-Hant'),
    status: stringValue(frontmatter.status, 'ready-for-publish'),
    keywords: stringArray(frontmatter.keywords),
    thumbnail: getGenaiImage(no),
    cta: stringValue(frontmatter.cta, 'download_whitepaper'),
    lastReviewed: stringValue(frontmatter.last_reviewed, '2026-07-08'),
    body
  };
}

export function getGenaiArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith('.md'))
    .map(articleFromFile)
    .sort((a, b) => Number(a.no) - Number(b.no));
}

export function getGenaiArticle(slug: string) {
  return getGenaiArticles().find((article) => article.slug === slug) || null;
}

export function getGenaiTopic(): GenaiTopic {
  const raw = fs.readFileSync(path.join(genaiDir, 'topic', 'japan-government-ai-genai.md'), 'utf8');
  const { frontmatter, body } = parseMarkdown(raw);
  return {
    slug: stringValue(frontmatter.slug, 'japan-government-ai-genai'),
    title: stringValue(frontmatter.title, '日本數位廳 Government AI GENAI 對照專區'),
    seoTitle: stringValue(frontmatter.seo_title, stringValue(frontmatter.title)),
    seoDescription: stringValue(frontmatter.seo_description),
    primaryKeywords: stringArray(frontmatter.primary_keywords),
    body
  };
}

export function getGenaiSources(): GenaiSource[] {
  const sourcePath = path.join(genaiDir, 'sources.json');
  if (!fs.existsSync(sourcePath)) return [];
  return JSON.parse(fs.readFileSync(sourcePath, 'utf8')) as GenaiSource[];
}

export function genaiTopicUrl(locale: Locale) {
  return `${getSiteUrl()}/${publicLocale(locale)}/japan-government-ai-genai`;
}

export function genaiArticleUrl(locale: Locale, slug: string) {
  return `${genaiTopicUrl(locale)}/articles/${slug}`;
}

export function genaiBreadcrumbJsonLd(locale: Locale, items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
