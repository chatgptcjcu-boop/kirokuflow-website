export const contentStatuses = [
  'idea',
  'ready_to_generate',
  'generating',
  'draft',
  'review_required',
  'approved',
  'scheduled',
  'published',
  'archived',
  'failed'
] as const;

export type ContentStatus = (typeof contentStatuses)[number];
export type RiskLevel = 'low' | 'medium' | 'high';
export type LeadStatus = 'new' | 'qualified' | 'contacted' | 'proposal_sent' | 'won' | 'lost';

export type ContentTopic = {
  id: string;
  topic_title: string;
  locale_primary: 'ja-JP' | 'zh-TW';
  cluster: string;
  article_type: string;
  search_intent: string;
  jp_keyword: string;
  zh_keyword: string;
  product_mapping: string;
  cta_type: string;
  risk_level: RiskLevel;
  status: ContentStatus;
  quality_score: number;
  canonical_slug: string;
  scheduled_at: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type ContentSource = {
  id: string;
  topic_id: string;
  source_type: string;
  source_url: string;
  source_title: string;
  source_summary: string;
  checked_at: string;
  created_at: string;
};

export type ArticleDraft = {
  id: string;
  topic_id: string;
  locale: 'ja-JP' | 'zh-TW';
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  body_mdx: string;
  faq_json: Array<{ question: string; answer: string }>;
  schema_json: Record<string, unknown>;
  internal_links: string[];
  cta_copy: string;
  review_notes: string;
  version: number;
  created_at: string;
  updated_at: string;
};

export type PublishJob = {
  id: string;
  topic_id: string;
  status: 'scheduled' | 'published' | 'failed';
  scheduled_at: string;
  published_at: string;
  error_message: string;
  github_commit_sha: string;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  locale: string;
  inquiry_type: string;
  source_article_slug: string;
  message: string;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  target_type: string;
  target_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type AdminStore = {
  topics: ContentTopic[];
  sources: ContentSource[];
  drafts: ArticleDraft[];
  publishJobs: PublishJob[];
  leads: Lead[];
  auditLogs: AuditLog[];
};
