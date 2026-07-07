export const locales = ['zh-TW', 'ja-JP'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja-JP';

export function normalizeLocale(locale: string): Locale {
  return locale === 'ja' || locale === 'ja-JP' ? 'ja-JP' : 'zh-TW';
}

export function publicLocale(locale: Locale) {
  return locale === 'ja-JP' ? 'ja' : 'zh-TW';
}

export function oppositeLocale(locale: Locale) {
  return locale === 'ja-JP' ? 'zh-TW' : 'ja';
}

const sharedPlans = [
  {
    id: 'ai_workflow_audit',
    price: 'JPY 150,000',
    featuresZh: ['文件與流程盤點', 'AI 導入風險整理', '初步導入路線圖'],
    featuresJa: ['文書と業務フローの棚卸し', 'AI 導入リスクの整理', '初期導入ロードマップ']
  },
  {
    id: 'rag_pilot',
    price: 'JPY 380,000',
    featuresZh: ['限定文件集 RAG 試作', '引用來源與權限設計', '審核與使用紀錄設計'],
    featuresJa: ['限定文書群での RAG 試作', '出典表示と権限設計', 'レビューと利用ログ設計']
  },
  {
    id: 'content_governance_ops',
    price: 'JPY 680,000',
    featuresZh: ['內容工廠與審稿流程', 'AI 治理與來源白名單', '月度改善與報告'],
    featuresJa: ['コンテンツ生成ラインとレビュー運用', 'AI ガバナンスと出典管理', '月次改善レポート']
  }
];

export const siteContent = {
  'zh-TW': {
    nav: {
      features: '功能',
      useCases: '使用情境',
      pricing: '方案',
      blog: '專欄',
      templates: '模板',
      services: 'AI 服務',
      trends: '趨勢',
      resources: '資料中心',
      cases: '案例',
      about: '關於',
      contact: '聯絡',
      cta: '查看方案',
      otherLocale: '日本語'
    },
    hero: {
      eyebrow: 'AI 文件工作流與行政 DX 服務',
      title: '把文件、知識庫、審核與留痕，串成可用的 AI 工作流。',
      description:
        'KirokuFlow 協助團隊整理內部文件、行政流程、RAG 知識庫、內容生成與審核紀錄，讓 AI 不只是回答問題，而是進入可追蹤的工作流程。',
      primaryCta: '查看 AI 服務',
      secondaryCta: '了解知識庫'
    },
    trust: [
      ['引用來源', 'AI 回答能回到原始文件'],
      ['人工審核', '高風險內容不自動放行'],
      ['權限控管', '不同角色看到不同知識範圍'],
      ['使用紀錄', '留下誰問了什麼、如何使用']
    ],
    problems: [
      ['文件分散', '規章、會議紀錄、補助要點、通知與表單散落在不同雲端資料夾。'],
      ['AI 回答無法採信', '如果沒有引用來源與更新日期，AI 回答很難進入正式流程。'],
      ['審核與使用沒有紀錄', '誰確認過、誰使用過、是否適合公開，常常沒有留下證據。']
    ],
    features: [
      ['文件盤點', '整理文件類型、擁有者、更新日期與是否可進入 AI 搜尋。'],
      ['RAG 試作', '以限定文件集建立可引用來源的 AI 回答 MVP。'],
      ['權限設計', '依部門、角色、機密等級限制可查詢的文件範圍。'],
      ['人工審核', '制度、補助、法務、稅務等高風險內容進入人工確認。'],
      ['內容生成', '把主題、來源、AI 草稿、審稿與排程整理成生產線。'],
      ['使用留痕', '記錄問題、引用文件、審核者與最後使用判斷。']
    ],
    flow: [
      ['盤點', '整理現有文件、資料來源、使用者與高風險內容。'],
      ['知識化', '建立標籤、引用來源、更新日期與檢索範圍。'],
      ['AI 使用', '透過 RAG、草稿生成、FAQ 生成支援實務作業。'],
      ['審核留痕', '記錄人工確認、公開判斷、使用紀錄與改善方向。']
    ],
    useCases: [
      ['學校計畫', '處理活動名單、核銷資料、補助經費與校內審核流程。'],
      ['委員會', '管理會議出席、經費動支、委員資料與年度交接。'],
      ['研究補助', '串接助理、受款人、支出項目與查核所需文件。'],
      ['活動行政', '讓短期專案也能保有清楚的申請、支出與通知軌跡。']
    ],
    plans: [
      { ...sharedPlans[0], name: 'AI Workflow Audit', summary: '適合尚未確定導入範圍，先盤點文件與風險。', features: sharedPlans[0].featuresZh },
      { ...sharedPlans[1], name: 'RAG Pilot', summary: '適合用限定文件集建立可驗證的 RAG MVP。', features: sharedPlans[1].featuresZh },
      { ...sharedPlans[2], name: 'Content & Governance Ops', summary: '適合同時建立內容生成、審稿與 AI 治理流程。', features: sharedPlans[2].featuresZh }
    ],
    blog: [
      ['行政流程與稽核留痕', '如何把申請、審核、撥款與通知串成一條可信任的紀錄流。'],
      ['從 Google Sheets 開始的行政系統', '先用輕量工具建立流程，再視需求升級資料庫與後台。'],
      ['日本市場準備期的官網內容策略', '用長週期內容累積信任、搜尋能見度與商業可信度。']
    ],
    pages: {
      features: ['功能', '把出席、預算、支出、收款、通知與稽核留痕放進同一條可追蹤流程。'],
      'use-cases': ['使用情境', '適合學校、委員會、研究補助、活動行政與跨單位合作。'],
      pricing: ['方案與價格', '先以服務方案下單，逐步擴充成更完整的線上結帳與維護合約。'],
      blog: ['專欄', '用行政數位化、稽核留痕與日本市場準備內容建立長期搜尋能見度。'],
      about: ['關於 KirokuFlow', 'KirokuFlow 是為日本新公司長週期鋪陳而建立的品牌官網與服務入口。'],
      contact: ['聯絡我們', '想討論導入、客製模板或年度行政流程，可以先留下需求。'],
      checkout: ['下單結帳', '選擇服務方案後，系統會導向 Stripe Checkout。'],
      privacy: ['隱私權政策', '我們僅為聯絡、服務提供、交易處理與必要維運使用資料。'],
      terms: ['服務條款', '服務範圍、交付內容、付款與取消規則以雙方確認之方案為準。'],
      templates: ['行政模板', '下載或試用出席、經費、稽核欄位與 Google Sheets + GAS 流程範本。'],
      'ai-workflow': ['AI 文件工作流', '把文件匯入、RAG、審核、通知與留痕整合成可落地的 AI 工作流程。'],
      'government-ai-trends': ['政府 AI 趨勢資料庫', '整理日本 GENAI、各國 AI 政策與企業可學習的治理重點。'],
      'rag-knowledge-base': ['RAG 知識庫', '建立可引用來源、可控權限、可追蹤使用紀錄的內部知識庫。'],
      'content-factory': ['內容生成工廠', '將題庫、AI 草稿、審稿、排程與發布整合成內容生產流程。'],
      'case-studies': ['案例入口', '用時間節省、文件量、品質與查詢成本呈現導入成果。'],
      'ai-governance': ['AI 治理', '設計 AI 使用規則、資料安全、權限、人工審核與使用紀錄。'],
      resources: ['知識庫', '集中白皮書、教學文、趨勢解析、Blog 與既有 SEO 支柱頁。'],
      'backoffice-dx-guide': ['行政 DX 指南', '小型組織可先從記錄、審核、通知與留存流程開始整理行政 DX。'],
      'audit-trail-guide': ['稽核留痕指南', '建立可交接、可查核的行政與經費流程紀錄。'],
      'subsidy-management-guide': ['補助案管理指南', '補助案文章屬高風險內容，應保留官方來源並經人工審稿。'],
      'google-sheets-gas-workflow': ['Google Sheets + GAS 流程', '用輕量工具先建立可追蹤的行政流程 MVP。'],
      'payment-notification-workflow': ['匯款通知流程', '整理付款前後的收款資料、通知與留痕。'],
      'ai-administration-governance': ['AI 行政治理', 'AI 產文與行政流程設計都需要來源、責任鏈與審稿機制。'],
      'legal/tokushoho': ['特定商取引法表示', '日本市場正式營運前，本頁作為揭露資訊模板，正式資料需於公司成立後補齊。']
    },
    checkout: {
      name: '姓名或公司名稱',
      email: 'Email',
      plan: '服務方案',
      note: '需求備註',
      submit: '前往付款',
      missingStripe: '尚未設定 STRIPE_SECRET_KEY，因此目前會保留需求表單版型，不會真的建立付款連結。'
    }
  },
  'ja-JP': {
    nav: {
      features: '機能',
      useCases: '活用シーン',
      pricing: '料金',
      blog: 'コラム',
      templates: 'テンプレート',
      services: 'AI サービス',
      trends: 'トレンド',
      resources: '資料',
      cases: '事例',
      about: '準備室',
      contact: '問い合わせ',
      cta: '料金を見る',
      otherLocale: '繁體中文'
    },
    hero: {
      eyebrow: 'AI 文書ワークフローと行政 DX サービス',
      title: '文書、ナレッジ、審査、記録をつなぐ AI 業務フローを作る。',
      description:
        'KirokuFlow は、社内文書、行政フロー、RAG ナレッジベース、AI コンテンツ生成、審査記録を一つの流れとして設計します。',
      primaryCta: 'AI サービスを見る',
      secondaryCta: '資料センターを見る'
    },
    trust: [
      ['出典を示す', 'AI 回答を元文書に戻せる'],
      ['人が確認する', '高リスク回答を自動化しない'],
      ['権限を分ける', '見せてよい文書だけ検索する'],
      ['利用を残す', '誰がどう使ったかを追える']
    ],
    problems: [
      ['文書が分散する', '規程、議事録、要項、申請書、通知文が複数のフォルダやツールに分かれています。'],
      ['AI 回答を信頼しにくい', 'どの資料を根拠にしたのか、いつ更新された情報なのかが見えないと業務では使えません。'],
      ['レビューと利用が残らない', '誰が確認し、どの回答を使い、何を公開したのかが残らないと説明できません。']
    ],
    features: [
      ['文書棚卸し', '文書種類、所有者、更新日、AI 検索対象にできるかを整理します。'],
      ['RAG 試作', '限定した文書群から、引用付き回答の MVP を作ります。'],
      ['権限設計', '部署、役割、機密区分ごとに検索できる範囲を分けます。'],
      ['レビュー運用', '制度、補助金、法務、税務などの高リスク回答を人が確認します。'],
      ['コンテンツ生成', 'テーマ管理、出典管理、AI 下書き、レビュー、予約投稿を運用化します。'],
      ['利用ログ', '質問、引用文書、確認者、利用判断を記録し、改善に使います。']
    ],
    flow: [
      ['棚卸し', '既存文書、出典、利用者、高リスク領域を整理します。'],
      ['知識化', 'タグ、引用、更新日、権限を付けて検索できる状態にします。'],
      ['AI 利用', 'RAG、下書き、FAQ、チェックリスト生成に活用します。'],
      ['レビュー保存', '人の確認、公開判断、利用ログを残して改善します。']
    ],
    useCases: [
      ['学校プロジェクト', '活動名簿、精算資料、助成金、校内承認を整理します。'],
      ['委員会', '会議出席、支出、委員情報、年度引き継ぎを管理します。'],
      ['研究助成', '助手、受取人、支出項目、確認資料をつなぎます。'],
      ['イベント運営', '短期プロジェクトでも申請、支出、通知の流れを残せます。']
    ],
    plans: [
      { ...sharedPlans[0], name: 'AI Workflow Audit', summary: '導入範囲がまだ曖昧な段階で、文書とリスクを棚卸しします。', features: sharedPlans[0].featuresJa },
      { ...sharedPlans[1], name: 'RAG Pilot', summary: '限定文書群で、引用付き AI 回答の MVP を検証します。', features: sharedPlans[1].featuresJa },
      { ...sharedPlans[2], name: 'Content & Governance Ops', summary: 'コンテンツ生成、レビュー、AI ガバナンスを運用化します。', features: sharedPlans[2].featuresJa }
    ],
    blog: [
      ['事務フローと監査証跡', '申請、確認、支払い、通知を信頼できる記録の流れにする方法。'],
      ['Google Sheets から始める事務システム', '軽量な仕組みから始め、必要に応じて拡張します。'],
      ['日本市場準備期のコンテンツ戦略', '長期的な信頼、検索流入、商業的な信用を積み上げます。']
    ],
    pages: {
      features: ['機能', '出席、予算、支出、振込先、通知、監査証跡を一つの流れで管理します。'],
      'use-cases': ['活用シーン', '学校、委員会、研究助成、イベント運営、共同プロジェクトに適しています。'],
      pricing: ['料金プラン', 'まずはサービスプランとして申し込み、将来的にオンライン決済と保守契約へ拡張します。'],
      blog: ['コラム', '事務DX、監査証跡、日本市場準備の内容で長期的な検索接点を作ります。'],
      about: ['KirokuFlow について', 'KirokuFlow は、日本での新会社設立準備に向けたブランドサイトとサービス窓口です。'],
      contact: ['お問い合わせ', '導入、テンプレート作成、年間事務フローについてご相談ください。'],
      checkout: ['お申し込み・決済', 'サービスプランを選択後、Stripe Checkout へ進みます。'],
      privacy: ['プライバシーポリシー', 'お問い合わせ、サービス提供、取引処理、必要な運用のために情報を利用します。'],
      terms: ['利用規約', 'サービス範囲、納品内容、支払い、キャンセル条件は確認済みプランに基づきます。'],
      templates: ['テンプレート', '出席、経費、監査項目、Google Sheets + GAS の軽量フローを試せるテンプレート入口です。'],
      'ai-workflow': ['AI 文書ワークフロー', '文書取り込み、RAG、審査、通知、証跡保存を一つの AI 業務フローにします。'],
      'government-ai-trends': ['政府 AI トレンド', '日本 GENAI、各国 AI 政策、企業が学ぶべき実務ポイントを整理します。'],
      'rag-knowledge-base': ['RAG ナレッジベース', '文書取り込み、ベクトル化、出典表示、権限、利用ログを含む内部ナレッジベース。'],
      'content-factory': ['コンテンツ生成ライン', 'SEO / GEO / GAI 記事のテーマ管理、生成、レビュー、予約投稿を支援します。'],
      'case-studies': ['導入事例', '時間削減、文書量、確認品質、問い合わせ削減を示す事例入口。'],
      'ai-governance': ['AI ガバナンス', 'データ安全、権限、審査、使用記録を設計する AI ガバナンスページ。'],
      resources: ['資料センター', 'ホワイトペーパー、導入ガイド、トレンド解説、支柱ページ、Blog をまとめる資料入口。'],
      'backoffice-dx-guide': ['バックオフィス DX ガイド', '小さな組織の行政 DX は、記録、確認、通知、保存の流れから始められます。'],
      'audit-trail-guide': ['監査証跡ガイド', '引き継ぎと確認に耐えられる事務・経費フローの記録設計。'],
      'subsidy-management-guide': ['補助金管理ガイド', '補助金記事は高リスク内容として、公式出典と人によるレビューを必須にします。'],
      'google-sheets-gas-workflow': ['Google Sheets + GAS フロー', '軽量な仕組みから追跡可能な事務フローを作る方法。'],
      'payment-notification-workflow': ['支払い通知フロー', '振込先情報、通知、確認状態を残す支払い前後の業務整理。'],
      'ai-administration-governance': ['AI 行政治理', 'AI 生成と行政業務には、出典、責任範囲、レビュープロセスが必要です。'],
      'legal/tokushoho': ['特定商取引法に基づく表記', '日本での正式運営前のテンプレートです。会社設立後に正式情報を記載します。']
    },
    checkout: {
      name: '氏名または会社名',
      email: 'Email',
      plan: 'サービスプラン',
      note: '相談内容',
      submit: '決済へ進む',
      missingStripe: 'STRIPE_SECRET_KEY が未設定のため、現在はフォーム表示のみで決済リンクは作成されません。'
    }
  }
} as const;
