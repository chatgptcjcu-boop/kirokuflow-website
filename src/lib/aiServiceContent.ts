import { Locale } from './siteContent';

export type AiServicePage = {
  slug: string;
  layer: 'service' | 'trend' | 'case' | 'resource';
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  primaryCta: string;
  secondaryCta: string;
  bullets: string[];
  metrics: Array<{ value: string; label: string }>;
  sections: Array<{ title: string; body: string; items: string[] }>;
  flow: Array<{ title: string; body: string }>;
  related: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const aiServiceSlugs = [
  'ai-workflow',
  'government-ai-trends',
  'rag-knowledge-base',
  'content-factory',
  'case-studies',
  'ai-governance',
  'resources'
] as const;

const jaPages: Record<string, AiServicePage> = {
  'ai-workflow': {
    slug: 'ai-workflow',
    layer: 'service',
    eyebrow: 'AI Document Workflow',
    title: 'AI 文書ワークフローで、社内文書と行政業務を一つの流れにする',
    description: 'KirokuFlow は、文書の取り込み、RAG、内部ナレッジベース、承認、通知、記録保存をつなぐ AI 業務フロー設計サービスです。',
    updatedAt: '2026-07-08',
    primaryCta: 'AI 導入を相談する',
    secondaryCta: 'RAG 構成を見る',
    bullets: ['AI 文書整理と要約', 'RAG / 引用付き回答', '承認とレビューの証跡', '内部ナレッジベース化'],
    metrics: [
      { value: '3層', label: '文書・知識・審査の設計' },
      { value: '7頁', label: 'AI サービス入口' },
      { value: 'FAQ', label: 'GEO / GAI 対応' }
    ],
    sections: [
      {
        title: '文書が増えるほど、探す時間と確認コストが増える',
        body: '社内規程、会議資料、補助金要項、経費資料、メール通知が分散すると、AI を導入しても正しい文脈にたどり着けません。KirokuFlow はまず文書の種類、権限、更新責任、引用來源を整理します。',
        items: ['文書カテゴリと所有者を定義', '検索対象と非対象を分離', '更新日とレビュー担当を記録']
      },
      {
        title: 'AI 回答を業務フローに接続する',
        body: 'AI が回答して終わりではなく、その回答を申請、承認、通知、保存にどう接続するかが重要です。回答の根拠、利用者、判断者、最終処理を同じ案件に残します。',
        items: ['回答來源の引用', 'レビュー必須条件', '承認履歴と利用ログ']
      },
      {
        title: '小さく始めて、運用ルールを育てる',
        body: '最初は限定された文書群と部署から始め、回答品質、問い合わせ削減、レビュー時間を測定します。制度や税務に関わる内容は review_required とし、全自動公開を避けます。',
        items: ['対象文書を限定', 'レビュー基準を明文化', '成果指標を月次確認']
      }
    ],
    flow: [
      { title: '文書棚卸し', body: '既存ファイル、URL、台帳、通知文を分類します。' },
      { title: '知識化', body: '要約、タグ、引用、権限を付与して検索できる状態にします。' },
      { title: 'AI 利用', body: 'RAG で根拠付き回答、下書き、チェックリストを生成します。' },
      { title: '審査保存', body: '人間レビュー、承認、通知、保存の証跡を残します。' }
    ],
    related: ['rag-knowledge-base', 'content-factory', 'ai-governance'],
    faq: [
      { question: '既存の Google Drive や Sheets から始められますか。', answer: 'はい。まずは対象文書を限定し、権限と更新責任を整理したうえで段階的に RAG 化できます。' },
      { question: 'AI の回答ミスはどう防ぎますか。', answer: '引用來源、レビュー必須条件、更新日、利用ログを残し、高リスク領域は人間承認を必須にします。' },
      { question: 'KirokuFlow はシステム開発ですか、運用設計ですか。', answer: '両方です。軽量 MVP から始め、文書設計、AI フロー、管理画面、審査運用をまとめて整えます。' }
    ]
  },
  'government-ai-trends': {
    slug: 'government-ai-trends',
    layer: 'trend',
    eyebrow: 'Government AI Trends',
    title: '政府・自治体・企業が学ぶべき AI 政策トレンド',
    description: '日本 GENAI、各国 AI 政策、行政 AI 活用、企業が取り入れるべきガバナンス観点を整理するトレンド入口です。',
    updatedAt: '2026-07-08',
    primaryCta: 'トレンド解析を相談する',
    secondaryCta: 'AI ガバナンスを見る',
    bullets: ['日本 GENAI / 行政 AI', '各国 AI 政策比較', '企業向け実務ポイント', '公式來源ベースの更新'],
    metrics: [
      { value: '政策', label: '公式來源を重視' },
      { value: '比較', label: '日本・海外・企業' },
      { value: '審稿', label: '高リスク内容は確認必須' }
    ],
    sections: [
      {
        title: '政策トレンドは「ニュース」ではなく「業務要件」になる',
        body: '生成 AI 政策、自治体の AI 利用指針、個人情報保護、調達ルールは、企業の AI 導入にも影響します。KirokuFlow では、トレンドを実務で使えるチェックポイントに変換します。',
        items: ['公式資料の確認日を保存', '企業への影響を要約', '実務チェックリスト化']
      },
      {
        title: '日本市場で必要な説明可能性',
        body: 'AI 活用は便利さだけでなく、なぜその回答を使ったのか、どの資料を参照したのか、誰が確認したのかを説明できる必要があります。',
        items: ['引用來源', '利用ログ', 'レビュー担当']
      },
      {
        title: 'トレンド資料をコンテンツ資産にする',
        body: '政策解析は一度読んで終わりではなく、FAQ、白皮書、社内研修、営業資料、記事生成の來源として再利用できます。',
        items: ['白皮書化', '記事テーマ化', '社内ナレッジ化']
      }
    ],
    flow: [
      { title: '公式資料収集', body: '政策、ガイドライン、発表資料を來源として登録します。' },
      { title: '要点抽出', body: '企業・行政業務に関係する観点へ変換します。' },
      { title: 'リスク分類', body: '法務、制度、個人情報などの高リスク領域を分けます。' },
      { title: '知識化', body: 'Resources や社内ナレッジとして再利用します。' }
    ],
    related: ['ai-governance', 'resources', 'content-factory'],
    faq: [
      { question: '政策情報は自動更新できますか。', answer: '収集は自動化できますが、制度解釈や企業への影響は人間レビューを挟むべきです。' },
      { question: '日本以外の政策も扱えますか。', answer: 'はい。国別に來源、更新日、企業への示唆を整理する資料庫として拡張できます。' },
      { question: 'トレンドページは SEO に効きますか。', answer: '継続更新、公式來源、FAQ、比較表が揃うと、検索と生成 AI 参照の両方で資産になりやすいです。' }
    ]
  },
  'rag-knowledge-base': {
    slug: 'rag-knowledge-base',
    layer: 'service',
    eyebrow: 'RAG Knowledge Base',
    title: '引用できる社内ナレッジベースと RAG 構築',
    description: '文書匯入、チャンク化、ベクトル化、引用來源、権限、更新レビューを含む RAG 導入サービスページです。',
    updatedAt: '2026-07-08',
    primaryCta: 'RAG 導入を相談する',
    secondaryCta: 'AI ワークフローへ',
    bullets: ['文書取り込み', 'ベクトル検索', '引用付き回答', '部署・役割別権限'],
    metrics: [
      { value: 'RAG', label: '根拠付き回答' },
      { value: 'ACL', label: '権限別アクセス' },
      { value: 'Logs', label: '利用記録' }
    ],
    sections: [
      {
        title: 'RAG の価値は、答えよりも根拠にある',
        body: '社内 AI が信頼されるには、回答本文だけでなく、参照した文書、版、更新日、該当箇所を確認できることが必要です。',
        items: ['引用 URL / ファイル名', '文書バージョン', '回答根拠の表示']
      },
      {
        title: '権限を無視した AI 検索は危険',
        body: '全社員が全資料を検索できる状態は、多くの組織で現実的ではありません。部署、案件、役割、機密区分に応じて検索対象を制限します。',
        items: ['部署別 collection', '機密区分', 'ログ監査']
      },
      {
        title: '更新されない RAG はすぐ古くなる',
        body: '文書の追加、削除、版管理、再ベクトル化、レビューを運用に含めることで、AI 回答の鮮度を保ちます。',
        items: ['更新ワークフロー', '再インデックス', '期限切れ警告']
      }
    ],
    flow: [
      { title: 'Import', body: 'PDF、Docs、Sheets、URL を取り込みます。' },
      { title: 'Index', body: '分割、タグ付け、ベクトル化を行います。' },
      { title: 'Answer', body: '質問に対して引用付き回答を返します。' },
      { title: 'Review', body: '利用ログと回答品質を確認します。' }
    ],
    related: ['ai-workflow', 'ai-governance', 'resources'],
    faq: [
      { question: 'どの形式の文書を扱えますか。', answer: 'PDF、Google Docs、Sheets、Markdown、Web URL などから段階的に始める設計が可能です。' },
      { question: '引用があれば完全に安全ですか。', answer: 'いいえ。引用は信頼性を上げますが、重要判断にはレビューと権限管理が必要です。' },
      { question: '既存システムと連携できますか。', answer: 'API、Webhook、定期同期、CSV/Sheets 連携など、既存環境に合わせて設計できます。' }
    ]
  },
  'content-factory': {
    slug: 'content-factory',
    layer: 'service',
    eyebrow: 'Content Factory',
    title: 'SEO / GEO / GAI に対応する AI コンテンツ生成器',
    description: '記事テーマ、來源登録、AI 下書き、審稿、排程、GitHub 公開までを管理するコンテンツ運用サービスです。',
    updatedAt: '2026-07-08',
    primaryCta: '内容生産を相談する',
    secondaryCta: 'Resources を見る',
    bullets: ['題庫管理', 'AI 下書き', '審稿フロー', '排程公開'],
    metrics: [
      { value: '9状態', label: '記事ステータス管理' },
      { value: 'MDX', label: '構造化記事' },
      { value: 'FAQ', label: '生成 AI 最適化' }
    ],
    sections: [
      {
        title: '記事を単発制作ではなく、工場として運用する',
        body: '検索や生成 AI に強いサイトは、思いつきの記事ではなく、テーマ設計、内部リンク、FAQ、更新、審稿を継続します。',
        items: ['Topic cluster', 'Internal links', '品質スコア']
      },
      {
        title: '高リスク内容は自動公開しない',
        body: '法規、補助金、税務、制度に関わる記事は review_required に入り、公式來源と人間レビューを通します。',
        items: ['來源白名單', '審稿メモ', '公開前チェック']
      },
      {
        title: '後台 MVP はすでに実装済み',
        body: 'KirokuFlow には /admin/content、生成、審稿編集、排程、leads、analytics の MVP があり、今後 DB と AI API に接続できます。',
        items: ['/admin/content', '/admin/calendar', '/api/admin/generate-draft']
      }
    ],
    flow: [
      { title: '題材登録', body: 'キーワード、検索意図、リスクを登録します。' },
      { title: '來源登録', body: '公式資料や参照 URL を保存します。' },
      { title: 'AI 生成', body: 'MDX、FAQ、CTA、内部リンクを生成します。' },
      { title: '審稿公開', body: '承認後に排程し、公開履歴を残します。' }
    ],
    related: ['resources', 'government-ai-trends', 'ai-governance'],
    faq: [
      { question: '既存の Blog と何が違いますか。', answer: 'Blog は表示面、Content Factory はテーマ管理、生成、審稿、排程まで含む運用基盤です。' },
      { question: 'AI 文章をそのまま公開しますか。', answer: 'いいえ。高リスクテーマは必ず審稿に入り、低リスクでも品質チェックを通す設計です。' },
      { question: 'GitHub 公開まで自動化できますか。', answer: 'はい。現在は API と GitHub Actions の土台があり、DB と token を接続すれば拡張できます。' }
    ]
  },
  'case-studies': {
    slug: 'case-studies',
    layer: 'case',
    eyebrow: 'Case Studies',
    title: 'AI 文書ワークフローの導入ケース入口',
    description: '時間削減、文書量、確認品質、問い合わせ削減を軸に、KirokuFlow の導入効果を見せるケーススタディページです。',
    updatedAt: '2026-07-08',
    primaryCta: '自社ケースを相談する',
    secondaryCta: 'AI Workflow を見る',
    bullets: ['Before / After', '時間削減', '文書量整理', '品質レビュー'],
    metrics: [
      { value: '30-50%', label: '確認時間削減の仮説' },
      { value: '100+', label: '文書整理単位' },
      { value: '1画面', label: '案件の状態確認' }
    ],
    sections: [
      {
        title: 'ケースは機能説明より強い',
        body: 'AI、RAG、行政 DX は抽象的になりがちです。ケーススタディでは、導入前の混乱、導入後の流れ、測定指標を具体的に示します。',
        items: ['導入前課題', '導入後フロー', '数値指標']
      },
      {
        title: '最初は仮想ケースでもよい',
        body: '正式顧客事例がない段階では、学校、委員会、研究費、小規模法人のシナリオ別ケースを用意し、問い合わせ導線につなげます。',
        items: ['学校プロジェクト', '委員会運営', '小規模法人']
      },
      {
        title: '測るべき成果',
        body: 'AI 導入では生成数だけでなく、確認時間、問い合わせ数、差し戻し、文書検索時間、レビュー漏れを測ります。',
        items: ['検索時間', 'レビュー時間', '問い合わせ件数']
      }
    ],
    flow: [
      { title: '課題整理', body: '分散文書、確認待ち、問い合わせを把握します。' },
      { title: 'MVP 導入', body: '限定範囲で文書ワークフローを作ります。' },
      { title: '効果測定', body: '時間、品質、漏れを比較します。' },
      { title: '横展開', body: '部署や用途を広げます。' }
    ],
    related: ['ai-workflow', 'rag-knowledge-base', 'content-factory'],
    faq: [
      { question: '実績が少ない段階でもケースページは必要ですか。', answer: '必要です。仮想ケースでも、誰のどの課題を解くかを明確にできます。' },
      { question: 'どんな数字を載せるべきですか。', answer: '時間削減、文書量、レビュー回数、問い合わせ件数、公開本数などが分かりやすいです。' },
      { question: '顧客名を出せない場合はどうしますか。', answer: '匿名ケース、業界別ケース、課題別ケースとして掲載できます。' }
    ]
  },
  'ai-governance': {
    slug: 'ai-governance',
    layer: 'service',
    eyebrow: 'AI Governance',
    title: 'AI 活用のためのデータ安全・権限・審査・利用記録',
    description: 'AI を安心して業務に組み込むために、データ安全、アクセス権限、レビュー、監査ログを設計します。',
    updatedAt: '2026-07-08',
    primaryCta: 'AI ガバナンスを相談する',
    secondaryCta: '政策トレンドを見る',
    bullets: ['データ安全', '権限管理', '人間レビュー', '利用ログ'],
    metrics: [
      { value: 'ACL', label: '権限管理' },
      { value: 'Logs', label: '利用証跡' },
      { value: 'Review', label: '人間審査' }
    ],
    sections: [
      {
        title: 'AI 導入で最初に決めるべきルール',
        body: 'どの文書を AI に読ませるか、誰が使えるか、回答をどう確認するか、ログをどこまで残すかを先に決めます。',
        items: ['利用範囲', '禁止データ', 'レビュー基準']
      },
      {
        title: '権限とログはセットで設計する',
        body: '権限だけでは不十分で、誰がどの情報にアクセスし、どの回答を使ったかを後から確認できる必要があります。',
        items: ['ユーザー別ログ', '検索対象ログ', '回答利用履歴']
      },
      {
        title: '高リスク判断は人が責任を持つ',
        body: '制度、税務、法務、補助金、個人情報に関わる判断は AI に委ねず、人間レビューと承認を必須にします。',
        items: ['risk_level', 'review_required', 'approval flow']
      }
    ],
    flow: [
      { title: '分類', body: 'データと用途をリスク別に分類します。' },
      { title: '制御', body: '権限、禁止事項、利用範囲を設定します。' },
      { title: '審査', body: '高リスク回答をレビューします。' },
      { title: '記録', body: '利用ログと承認履歴を保存します。' }
    ],
    related: ['government-ai-trends', 'rag-knowledge-base', 'ai-administration-governance'],
    faq: [
      { question: 'AI ガバナンスは大企業だけの話ですか。', answer: 'いいえ。小規模組織でも個人情報、制度文書、顧客資料を扱うなら最低限のルールが必要です。' },
      { question: 'ログはどこまで残すべきですか。', answer: '利用者、日時、対象文書、回答、レビュー結果、公開/利用判断を残すと運用しやすくなります。' },
      { question: '既存の支柱頁とどう違いますか。', answer: '既存の AI 行政治理ページは知識記事、このページはサービス導入と相談導線に寄せたページです。' }
    ]
  },
  resources: {
    slug: 'resources',
    layer: 'resource',
    eyebrow: 'Resources',
    title: 'AI 行政ワークフローの知識庫',
    description: '白皮書、教學文、趨勢解析、行政 DX 支柱頁、Blog をまとめる KirokuFlow の知識庫入口です。',
    updatedAt: '2026-07-08',
    primaryCta: '資料を相談する',
    secondaryCta: 'Blog を読む',
    bullets: ['白皮書', '教學文', '趨勢解析', '既存支柱頁'],
    metrics: [
      { value: '6+', label: '既存支柱頁' },
      { value: 'MDX', label: '記事資産' },
      { value: 'LLMs', label: 'AI 参照対応' }
    ],
    sections: [
      {
        title: '既存 SEO 資産を一か所に集める',
        body: '行政 DX、監査証跡、補助金管理、Sheets + GAS、支払い通知、AI 行政治理の支柱頁を Resources の下に整理します。',
        items: ['支柱頁リンク', 'Blog 記事', 'FAQ']
      },
      {
        title: '白皮書とトレンド解析へ拡張する',
        body: '今後は政策資料、RAG 導入チェックリスト、AI ガバナンステンプレートを資料として提供できます。',
        items: ['PDF whitepaper', 'チェックリスト', 'テンプレート']
      },
      {
        title: 'GEO / GAI 時代の情報設計',
        body: '人が読むだけでなく、生成 AI が参照しやすいように、要約、FAQ、構造化データ、更新日を揃えます。',
        items: ['要約', 'FAQ schema', 'llms.txt']
      }
    ],
    flow: [
      { title: 'Learn', body: '支柱頁と Blog で基本を理解します。' },
      { title: 'Compare', body: '政策、技術、ケースを比較します。' },
      { title: 'Plan', body: '導入チェックリストに落とし込みます。' },
      { title: 'Contact', body: '必要に応じて相談へ進みます。' }
    ],
    related: ['backoffice-dx-guide', 'audit-trail-guide', 'government-ai-trends'],
    faq: [
      { question: 'Resources と Blog の違いは何ですか。', answer: 'Blog は記事一覧、Resources は支柱頁、白皮書、トレンド、テンプレートをまとめる知識庫入口です。' },
      { question: '白皮書は今ありますか。', answer: '現時点では入口を用意し、次段階で PDF やダウンロード資料として拡張する想定です。' },
      { question: '既存の行政 DX ページは残しますか。', answer: '残します。新 AI サービス層の下に置く SEO 資産として活用します。' }
    ]
  }
};

const zhPages: Record<string, AiServicePage> = Object.fromEntries(
  Object.values(jaPages).map((page) => [
    page.slug,
    {
      ...page,
      eyebrow: page.eyebrow,
      title: zhTitle(page.slug),
      description: zhDescription(page.slug),
      primaryCta: '預約改版與導入討論',
      secondaryCta: '查看相關服務'
    }
  ])
) as Record<string, AiServicePage>;

function zhTitle(slug: string) {
  const titles: Record<string, string> = {
    'ai-workflow': 'AI 文件工作流服務',
    'government-ai-trends': '政府與企業 AI 趨勢資料庫',
    'rag-knowledge-base': 'RAG 與內部知識庫建置',
    'content-factory': 'SEO / GEO / GAI 內容生成工廠',
    'case-studies': 'AI 文件流程案例入口',
    'ai-governance': 'AI 治理、權限與審核設計',
    resources: 'AI 行政工作流知識庫'
  };
  return titles[slug] || slug;
}

function zhDescription(slug: string) {
  const descriptions: Record<string, string> = {
    'ai-workflow': '把文件匯入、RAG、內部知識庫、審核、通知與留痕整合成可落地的 AI 工作流。',
    'government-ai-trends': '整理日本 GENAI、各國 AI 政策與企業可學習的治理重點。',
    'rag-knowledge-base': '建立可引用來源、可控權限、可追蹤使用紀錄的內部知識庫。',
    'content-factory': '將題庫、AI 草稿、審稿、排程與 GitHub 發布整合成內容生產流程。',
    'case-studies': '用時間節省、文件量、品質與查詢成本呈現導入成果。',
    'ai-governance': '設計 AI 使用規則、資料安全、權限、人工審核與使用紀錄。',
    resources: '集中白皮書、教學文、趨勢解析、Blog 與既有 SEO 支柱頁。'
  };
  return descriptions[slug] || '';
}

export function getAiServicePage(locale: Locale, slug: string) {
  return (locale === 'ja-JP' ? jaPages : zhPages)[slug] || null;
}

export function getAllAiServiceSlugs() {
  return [...aiServiceSlugs];
}
