import fs from 'fs/promises';
import path from 'path';
import { AdminStore, ArticleDraft, ContentSource, ContentTopic, Lead, PublishJob } from './types';

const storePath = path.join(process.cwd(), 'data', 'admin-store.json');

function now() {
  return new Date().toISOString();
}

function id(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function readStore(): Promise<AdminStore> {
  const raw = await fs.readFile(storePath, 'utf8');
  return JSON.parse(raw) as AdminStore;
}

async function writeStore(store: AdminStore) {
  await fs.writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`);
}

export async function listTopics(filters?: { status?: string; cluster?: string; locale?: string; q?: string }) {
  const store = await readStore();
  return store.topics
    .filter((topic) => (!filters?.status || topic.status === filters.status))
    .filter((topic) => (!filters?.cluster || topic.cluster === filters.cluster))
    .filter((topic) => (!filters?.locale || topic.locale_primary === filters.locale))
    .filter((topic) => (!filters?.q || topic.topic_title.toLowerCase().includes(filters.q.toLowerCase())))
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export async function getTopic(id: string) {
  const store = await readStore();
  return {
    topic: store.topics.find((topic) => topic.id === id) || null,
    sources: store.sources.filter((source) => source.topic_id === id),
    drafts: store.drafts.filter((draft) => draft.topic_id === id),
    jobs: store.publishJobs.filter((job) => job.topic_id === id)
  };
}

export async function createTopic(input: Partial<ContentTopic>) {
  const store = await readStore();
  const timestamp = now();
  const topic: ContentTopic = {
    id: id('topic'),
    topic_title: input.topic_title || 'Untitled topic',
    locale_primary: input.locale_primary || 'ja-JP',
    cluster: input.cluster || '行政 DX',
    article_type: input.article_type || 'long_tail',
    search_intent: input.search_intent || '入門',
    jp_keyword: input.jp_keyword || '',
    zh_keyword: input.zh_keyword || '',
    product_mapping: input.product_mapping || '出席名單、支出登錄、稽核留痕',
    cta_type: input.cta_type || 'contact',
    risk_level: input.risk_level || 'low',
    status: input.status || 'idea',
    quality_score: Number(input.quality_score || 0),
    canonical_slug: input.canonical_slug || '',
    scheduled_at: input.scheduled_at || '',
    published_at: '',
    created_at: timestamp,
    updated_at: timestamp
  };
  store.topics.unshift(topic);
  store.auditLogs.unshift({ id: id('audit'), actor: 'admin', action: 'create_topic', target_type: 'content_topic', target_id: topic.id, metadata: {}, created_at: timestamp });
  await writeStore(store);
  return topic;
}

export async function updateTopic(topicId: string, patch: Partial<ContentTopic>) {
  const store = await readStore();
  const topic = store.topics.find((item) => item.id === topicId);
  if (!topic) return null;
  Object.assign(topic, patch, { updated_at: now() });
  store.auditLogs.unshift({ id: id('audit'), actor: 'admin', action: 'update_topic', target_type: 'content_topic', target_id: topicId, metadata: patch, created_at: now() });
  await writeStore(store);
  return topic;
}

export async function createSource(input: Omit<ContentSource, 'id' | 'checked_at' | 'created_at'>) {
  const store = await readStore();
  const source: ContentSource = { ...input, id: id('source'), checked_at: now(), created_at: now() };
  store.sources.unshift(source);
  await writeStore(store);
  return source;
}

export async function createDrafts(topicId: string, drafts: Omit<ArticleDraft, 'id' | 'created_at' | 'updated_at' | 'version'>[]) {
  const store = await readStore();
  const timestamp = now();
  const saved = drafts.map((draft) => ({ ...draft, id: id('draft'), version: 1, created_at: timestamp, updated_at: timestamp }));
  store.drafts = [...saved, ...store.drafts.filter((draft) => draft.topic_id !== topicId)];
  await writeStore(store);
  return saved;
}

export async function updateDraft(draftId: string, patch: Partial<Pick<ArticleDraft, 'title' | 'meta_description' | 'body_mdx'>>) {
  const store = await readStore();
  const draft = store.drafts.find((item) => item.id === draftId);
  if (!draft) return null;
  Object.assign(draft, patch, { version: draft.version + 1, updated_at: now() });
  store.auditLogs.unshift({ id: id('audit'), actor: 'admin', action: 'update_draft', target_type: 'article_draft', target_id: draftId, metadata: { fields: Object.keys(patch) }, created_at: now() });
  await writeStore(store);
  return draft;
}

export async function createPublishJob(input: Pick<PublishJob, 'topic_id' | 'scheduled_at'>) {
  const store = await readStore();
  const job: PublishJob = {
    id: id('job'),
    topic_id: input.topic_id,
    status: 'scheduled',
    scheduled_at: input.scheduled_at,
    published_at: '',
    error_message: '',
    github_commit_sha: '',
    created_at: now(),
    updated_at: now()
  };
  store.publishJobs.unshift(job);
  await writeStore(store);
  return job;
}

export async function createLead(input: Omit<Lead, 'id' | 'status' | 'created_at' | 'updated_at'>) {
  const store = await readStore();
  const lead: Lead = { ...input, id: id('lead'), status: 'new', created_at: now(), updated_at: now() };
  store.leads.unshift(lead);
  await writeStore(store);
  return lead;
}

export async function listLeads() {
  const store = await readStore();
  return store.leads.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function listCalendarItems() {
  const store = await readStore();
  return store.topics
    .filter((topic) => ['draft', 'review_required', 'scheduled', 'published'].includes(topic.status))
    .sort((a, b) => (a.scheduled_at || a.updated_at).localeCompare(b.scheduled_at || b.updated_at));
}

export async function publishDueJobs() {
  const store = await readStore();
  const timestamp = now();
  const due = store.publishJobs.filter((job) => job.status === 'scheduled' && job.scheduled_at <= timestamp);
  for (const job of due) {
    job.status = 'published';
    job.published_at = timestamp;
    job.updated_at = timestamp;
    const topic = store.topics.find((item) => item.id === job.topic_id);
    if (topic) {
      topic.status = 'published';
      topic.published_at = timestamp;
      topic.updated_at = timestamp;
    }
  }
  await writeStore(store);
  return due;
}
