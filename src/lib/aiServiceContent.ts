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
    title: '社内文書を、探せる・使える・承認できる AI 業務フローへ',
    description: '規程、議事録、要項、申請書、通知文が散らばった状態から、引用付き回答、レビュー、承認、記録保存までを一つの運用に整えます。',
    updatedAt: '2026-07-08',
    primaryCta: '文書フローを相談する',
    secondaryCta: 'RAG 導入を見る',
    bullets: ['文書棚卸しと分類', '引用付き AI 回答', 'レビューと承認の設計', '利用記録と改善指標'],
    metrics: [
      { value: '検索時間', label: '資料探しの時間を削減する設計' },
      { value: '承認履歴', label: '誰が確認したかを残す' },
      { value: '段階導入', label: '小さな文書群から開始' }
    ],
    sections: [
      {
        title: '誰のためのサービスか',
        body: '社内文書はあるのに、必要な時に見つからない。AI を入れても、どの資料を根拠にした回答なのか説明できない。KirokuFlow は、管理部門、教育機関、委員会、研究費運用、小規模法人のために、文書と業務判断をつなぐ導入支援を行います。',
        items: ['管理部門の問い合わせ対応', '学校・研究費の要項確認', '委員会や小規模法人の引き継ぎ']
      },
      {
        title: '何を納品するのか',
        body: '単なるチャットボットではなく、文書棚卸し表、対象文書リスト、RAG 試作、回答レビュー基準、承認フロー、利用ログの見方までをセットで作ります。AI が答えた後に、人が確認し、業務として使える状態にすることが目的です。',
        items: ['文書分類表', 'RAG 試作画面', 'レビュー・承認ルール']
      },
      {
        title: '導入後にどう変わるのか',
        body: '担当者はメールやフォルダを探し回る代わりに、根拠付き回答から確認を始められます。管理者は、どの質問が多いか、どの文書が古いか、どの回答がレビュー待ちかを確認できます。',
        items: ['問い合わせの傾向把握', '古い文書の発見', 'レビュー待ち案件の可視化']
      }
    ],
    flow: [
      { title: '棚卸し', body: '文書、台帳、通知文、規程を集め、用途と所有者を整理します。' },
      { title: '試作', body: '限定した文書群で、引用付き AI 回答の MVP を作ります。' },
      { title: '審査', body: '回答をそのまま使わず、人が確認する条件を決めます。' },
      { title: '運用', body: '利用ログ、更新日、問い合わせ傾向を見ながら改善します。' }
    ],
    related: ['rag-knowledge-base', 'ai-governance', 'content-factory'],
    faq: [
      { question: '社内文書が整理されていなくても始められますか。', answer: '始められます。最初の作業はシステム導入ではなく、文書の棚卸しと対象範囲の限定です。' },
      { question: 'AI が間違った回答をした場合はどうしますか。', answer: '重要な回答はレビュー待ちにし、引用元、確認者、利用判断を残します。完全自動化を前提にしません。' },
      { question: 'どのくらい小さく始められますか。', answer: '一部署、一つの業務、一つの文書カテゴリから始められます。最初は短期間の MVP が現実的です。' }
    ]
  },
  'government-ai-trends': {
    slug: 'government-ai-trends',
    layer: 'trend',
    eyebrow: 'Government AI Trends',
    title: 'AI 政策ニュースを、企業の実務判断に変えるトレンドデータベース',
    description: '日本の生成 AI 政策、自治体の AI 利用指針、海外規制、企業が確認すべき論点を、公式出典ベースで整理します。',
    updatedAt: '2026-07-08',
    primaryCta: 'トレンド資料を相談する',
    secondaryCta: 'AI ガバナンスを見る',
    bullets: ['日本政府・自治体 AI 動向', '海外 AI 規制の要点', '企業導入への影響整理', '公式出典と確認日管理'],
    metrics: [
      { value: '公式出典', label: '一次情報を優先して整理' },
      { value: '比較表', label: '国・自治体・企業論点を比較' },
      { value: '実務化', label: '社内ルールと FAQ に転換' }
    ],
    sections: [
      {
        title: 'ニュースを読んだだけでは、社内導入は進まない',
        body: 'AI 政策の発表は増えていますが、現場が知りたいのは「自社の文書、個人情報、顧客対応、社内規程にどう影響するのか」です。このページは、政策情報を実務チェックリストに変える入口です。',
        items: ['政策発表の要約', '企業への影響', '確認すべき社内ルール']
      },
      {
        title: '日本市場で見落としやすい論点',
        body: '生成 AI の利用可否だけでなく、説明責任、個人情報、委託先管理、ログ保存、職員・社員教育まで含めて整理する必要があります。KirokuFlow は、AI 導入前の論点を資料化します。',
        items: ['個人情報と機密文書', '利用ログと説明責任', '研修・社内 FAQ']
      },
      {
        title: 'コンテンツと営業資料にも再利用する',
        body: '整理した政策トレンドは、社内研修、顧客説明資料、ホワイトペーパー、SEO 記事、FAQ に再利用できます。単発の調査ではなく、資産として蓄積する設計にします。',
        items: ['ホワイトペーパー化', '営業資料化', '記事テーマ化']
      }
    ],
    flow: [
      { title: '収集', body: '政府、自治体、国際機関、規制当局の公式資料を集めます。' },
      { title: '整理', body: '企業実務に関係する論点だけを抽出します。' },
      { title: '翻訳', body: 'ニュースではなく、導入判断に使える言葉へ変換します。' },
      { title: '更新', body: '確認日、出典、更新履歴を残します。' }
    ],
    related: ['ai-governance', 'resources', 'content-factory'],
    faq: [
      { question: '政策情報はどの頻度で更新すべきですか。', answer: '重要テーマは月次、制度変更や新ガイドラインが出た時は随時確認する設計が現実的です。' },
      { question: '海外規制も対象にできますか。', answer: 'できます。ただし日本企業への影響に翻訳する視点が必要です。単なる翻訳ではなく、実務論点へ整理します。' },
      { question: 'このページはニュースメディアですか。', answer: 'いいえ。目的は速報ではなく、AI 導入の判断材料として使えるトレンドデータベースです。' }
    ]
  },
  'rag-knowledge-base': {
    slug: 'rag-knowledge-base',
    layer: 'service',
    eyebrow: 'RAG Knowledge Base',
    title: '根拠を示せる RAG ナレッジベースを、小さく安全に導入する',
    description: 'PDF、Google Docs、Sheets、Web ページを取り込み、引用表示、権限管理、更新運用、利用ログまで含めた RAG 基盤を設計します。',
    updatedAt: '2026-07-08',
    primaryCta: 'RAG 試作を相談する',
    secondaryCta: 'AI 文書フローへ',
    bullets: ['対象文書の選定', 'チャンク設計と検索精度', '引用表示と出典管理', '権限・ログ・更新運用'],
    metrics: [
      { value: '引用', label: '回答根拠を確認できる' },
      { value: '権限', label: '見せてよい文書だけ検索' },
      { value: '更新', label: '古い資料を放置しない' }
    ],
    sections: [
      {
        title: 'RAG の失敗は、モデルより文書設計で起きる',
        body: '文書名が曖昧、版管理がない、古い資料と新しい資料が混在している状態では、RAG の回答品質は安定しません。まず、検索対象にしてよい文書、除外すべき文書、更新責任者を決めます。',
        items: ['検索対象リスト', '除外文書リスト', '更新責任者']
      },
      {
        title: '引用表示は信頼の入口であって、ゴールではない',
        body: '引用があっても、その文書が古ければ判断を誤ります。KirokuFlow は、出典、更新日、版、確認者、回答の利用ログまで含めて、業務で使える RAG を設計します。',
        items: ['出典 URL / ファイル名', '更新日と版', '利用ログ']
      },
      {
        title: '部署ごとの権限を前提にする',
        body: '人事、財務、研究費、営業資料を同じ検索対象にするのは危険です。部署、案件、機密区分ごとに検索範囲を分け、誰が何を見たかを後から追える状態にします。',
        items: ['部署別コレクション', '機密区分', '監査ログ']
      }
    ],
    flow: [
      { title: 'Scope', body: '最初に扱う部署、文書種類、質問パターンを決めます。' },
      { title: 'Prepare', body: '文書を整理し、チャンク、タグ、出典情報を設計します。' },
      { title: 'Search', body: '引用付き回答を試し、検索精度と回答品質を確認します。' },
      { title: 'Operate', body: '権限、更新、ログ、レビューを運用に組み込みます。' }
    ],
    related: ['ai-workflow', 'ai-governance', 'resources'],
    faq: [
      { question: '最初から全社文書を入れるべきですか。', answer: 'おすすめしません。まず一つの部署や文書カテゴリから始め、品質と運用ルールを確認します。' },
      { question: 'RAG と通常のチャットボットは何が違いますか。', answer: 'RAG は社内文書を検索し、回答の根拠を示す設計です。業務利用では出典と更新管理が重要になります。' },
      { question: 'Google Drive と連携できますか。', answer: '構成次第で可能です。まずは対象文書、権限、更新方法を決めてから連携方法を選びます。' }
    ]
  },
  'content-factory': {
    slug: 'content-factory',
    layer: 'service',
    eyebrow: 'Content Factory',
    title: 'AI 記事を量産するのではなく、審査できるコンテンツ生産ラインを作る',
    description: 'SEO / GEO / GAI を意識したテーマ設計、出典管理、AI 下書き、レビュー、予約投稿、公開後改善までを運用化します。',
    updatedAt: '2026-07-08',
    primaryCta: 'コンテンツ運用を相談する',
    secondaryCta: 'Resources を見る',
    bullets: ['テーマ管理', '出典登録', 'AI 下書き', 'レビュー・予約投稿'],
    metrics: [
      { value: '公開本数', label: '継続発信を管理' },
      { value: 'レビュー', label: '高リスク記事を止める' },
      { value: '改善', label: '検索意図と成果を見直す' }
    ],
    sections: [
      {
        title: 'AI で記事を書く前に、テーマ設計が必要',
        body: '検索に強いサイトは、思いつきの記事では育ちません。誰に向けて、どの課題を、どの順番で説明するかを決め、支柱ページ、関連記事、FAQ、CTA を設計します。',
        items: ['トピッククラスター', '検索意図', '内部リンク']
      },
      {
        title: '制度・補助金・税務記事は自動公開しない',
        body: '高リスク領域では、AI 下書きよりも出典とレビューが重要です。公式資料、確認日、レビュー担当、公開可否を残し、誤情報や過度な断定を防ぎます。',
        items: ['公式出典', 'レビュー担当', '公開前チェック']
      },
      {
        title: 'KirokuFlow の後台を運用基盤にする',
        body: '現在の KirokuFlow には、テーマ登録、下書き生成、レビュー編集、予約投稿、リード管理の MVP があります。次段階では AI API、DB、GitHub 公開をつなぎます。',
        items: ['テーマ管理', '下書き編集', '予約投稿']
      }
    ],
    flow: [
      { title: 'Plan', body: 'テーマ、検索意図、対象読者、リスクを登録します。' },
      { title: 'Source', body: '公式資料や参考 URL を出典として保存します。' },
      { title: 'Draft', body: 'AI で構成、本文、FAQ、CTA の下書きを作ります。' },
      { title: 'Review', body: '人が確認し、予約投稿または差し戻しを行います。' }
    ],
    related: ['resources', 'government-ai-trends', 'ai-governance'],
    faq: [
      { question: 'AI で作った記事をそのまま公開しますか。', answer: 'しません。特に制度、補助金、税務、法務に関わる内容はレビュー必須にします。' },
      { question: 'GEO / GAI 対策とは何ですか。', answer: '生成 AI が理解しやすいよう、要約、FAQ、構造化データ、出典、更新日を整える情報設計です。' },
      { question: '既存の Blog とどうつながりますか。', answer: 'Blog は公開面、Content Factory はテーマ管理から公開後改善までの運用面です。' }
    ]
  },
  'case-studies': {
    slug: 'case-studies',
    layer: 'case',
    eyebrow: 'Case Studies',
    title: '導入後に何が変わるのかを、業務別ケースで見る',
    description: '学校、委員会、小規模法人を想定し、文書検索、確認待ち、問い合わせ、引き継ぎがどう改善されるかを具体化します。',
    updatedAt: '2026-07-08',
    primaryCta: '自社ケースを相談する',
    secondaryCta: 'AI Workflow を見る',
    bullets: ['Before / After', '業務別シナリオ', '測定指標', '導入範囲の提案'],
    metrics: [
      { value: '検索時間', label: '資料を探す時間を測る' },
      { value: '問い合わせ', label: '同じ質問の削減を見る' },
      { value: '引き継ぎ', label: '担当交代時の説明負荷を下げる' }
    ],
    sections: [
      {
        title: 'ケース 1：学校・研究費プロジェクト',
        body: '要項、申請書、証憑、支払い通知が分散し、年度末に確認が集中するケース。RAG とレビュー履歴により、対象経費、必要資料、確認済み状態を追いやすくします。',
        items: ['要項検索', '証憑チェック', '年度末報告']
      },
      {
        title: 'ケース 2：委員会・イベント運営',
        body: '担当者が毎年変わり、過去の判断理由や通知履歴が残りにくいケース。議事録、名簿、支出、通知を案件単位で整理し、引き継ぎ資料を作りやすくします。',
        items: ['議事録整理', '通知履歴', '担当交代']
      },
      {
        title: 'ケース 3：小規模法人の管理部門',
        body: '社内規程、FAQ、請求書処理、顧客対応資料が散らばり、確認が属人化しているケース。社内ナレッジベースとレビュー運用で、回答品質を安定させます。',
        items: ['社内 FAQ', '請求・支払い', '顧客対応資料']
      }
    ],
    flow: [
      { title: 'Before', body: '分散文書、確認待ち、同じ質問を洗い出します。' },
      { title: 'Pilot', body: '限定した文書と業務で MVP を作ります。' },
      { title: 'Measure', body: '検索時間、問い合わせ、レビュー時間を測ります。' },
      { title: 'Expand', body: '効果が出た範囲から別業務へ広げます。' }
    ],
    related: ['ai-workflow', 'rag-knowledge-base', 'content-factory'],
    faq: [
      { question: '実名顧客の事例がなくても掲載できますか。', answer: 'できます。初期段階では業務別の想定ケースを示し、導入後に匿名事例へ更新します。' },
      { question: 'どの成果を測るべきですか。', answer: '検索時間、問い合わせ件数、レビュー時間、差し戻し、公開本数、引き継ぎ時間が分かりやすいです。' },
      { question: 'ケースページの目的は何ですか。', answer: '機能説明では伝わりにくい導入後の変化を、読者の業務に近い形で見せることです。' }
    ]
  },
  'ai-governance': {
    slug: 'ai-governance',
    layer: 'service',
    eyebrow: 'AI Governance',
    title: 'AI を安全に使うための権限、レビュー、利用ログを設計する',
    description: '誰が、どの文書を、どの目的で AI に使えるのかを定義し、重要判断には人のレビューと記録を残します。',
    updatedAt: '2026-07-08',
    primaryCta: 'AI ガバナンスを相談する',
    secondaryCta: '政策トレンドを見る',
    bullets: ['利用ルール策定', '権限と禁止データ', 'レビュー基準', '利用ログと監査'],
    metrics: [
      { value: '権限', label: '見せる文書を制御' },
      { value: 'レビュー', label: '高リスク回答を確認' },
      { value: 'ログ', label: '利用と判断を追跡' }
    ],
    sections: [
      {
        title: 'AI 導入前に、禁止事項を決める',
        body: 'AI を使ってよい文書、入れてはいけない文書、個人情報や顧客情報の扱い、社外ツール利用の条件を先に決めます。ルールがないまま使い始めると、便利さよりリスクが先に広がります。',
        items: ['禁止データ', '利用可能ツール', '社外共有ルール']
      },
      {
        title: '重要判断には人のレビューを残す',
        body: '制度、税務、補助金、契約、個人情報に関わる回答は、AI の文章をそのまま使わず、確認者と判断理由を残します。これにより、後から説明できる運用になります。',
        items: ['高リスク分類', '確認者', '判断理由']
      },
      {
        title: 'ログを監視ではなく改善に使う',
        body: '利用ログは社員を縛るためだけのものではありません。よく聞かれる質問、古い文書、回答品質の低い領域を見つけ、ナレッジベースを改善する材料になります。',
        items: ['質問傾向', '古い文書の発見', '回答品質改善']
      }
    ],
    flow: [
      { title: 'Policy', body: '利用目的、禁止事項、対象データを決めます。' },
      { title: 'Access', body: '部署、役割、案件ごとに権限を分けます。' },
      { title: 'Review', body: '高リスク回答を人が確認します。' },
      { title: 'Audit', body: '利用ログと改善点を定期的に見ます。' }
    ],
    related: ['government-ai-trends', 'rag-knowledge-base', 'ai-administration-governance'],
    faq: [
      { question: '小規模組織でも AI ガバナンスは必要ですか。', answer: '必要です。人数が少ないほど属人化しやすいため、最低限の利用ルールとレビュー基準が効きます。' },
      { question: 'ログを残すと社員が使いにくくなりませんか。', answer: '監視目的だけでなく、回答品質と文書改善のために使うと説明すれば、運用しやすくなります。' },
      { question: '既存規程がなくても始められますか。', answer: '始められます。まず AI 利用ガイドラインの簡易版を作り、運用しながら更新します。' }
    ]
  },
  resources: {
    slug: 'resources',
    layer: 'resource',
    eyebrow: 'Resources',
    title: 'AI 文書ワークフローを学び、比較し、導入準備する資料センター',
    description: 'ガイド、トレンド解説、テンプレート、ホワイトペーパー、既存の行政 DX 支柱ページをまとめた KirokuFlow の資料センターです。',
    updatedAt: '2026-07-08',
    primaryCta: '資料活用を相談する',
    secondaryCta: 'Blog を読む',
    bullets: ['導入ガイド', 'トレンド解説', 'テンプレート', 'ホワイトペーパー'],
    metrics: [
      { value: 'Guides', label: '深く読める支柱ページ' },
      { value: 'Trends', label: '政策と市場の解説' },
      { value: 'Templates', label: '導入準備に使う資料' }
    ],
    sections: [
      {
        title: 'Resources はリンク集ではなく、導入前の学習導線',
        body: '読者が AI 文書ワークフローを理解し、自社に必要な範囲を判断できるように、ガイド、トレンド、テンプレート、事例を役割別に整理します。',
        items: ['初めて読む人向け', '技術検討者向け', '管理者・責任者向け']
      },
      {
        title: '既存の行政 DX コンテンツを捨てずに活かす',
        body: '行政 DX、監査証跡、補助金管理、Sheets + GAS、支払い通知の支柱ページは、AI ワークフローの応用領域として残します。検索資産を維持しながら、新しいサービス導線へつなげます。',
        items: ['行政 DX', '監査証跡', '支払い通知']
      },
      {
        title: '今後追加すべき資料',
        body: 'RAG 導入チェックリスト、AI 利用ガイドライン雛形、文書棚卸しシート、政府 AI トレンド月次レポートを追加すると、問い合わせ前の信頼形成に効きます。',
        items: ['RAG チェックリスト', 'AI 利用ガイドライン', '月次トレンドレポート']
      }
    ],
    flow: [
      { title: 'Learn', body: '基礎ガイドで全体像を理解します。' },
      { title: 'Compare', body: '技術、政策、事例を比較します。' },
      { title: 'Prepare', body: 'チェックリストやテンプレートで準備します。' },
      { title: 'Consult', body: '必要な範囲が見えたら相談へ進みます。' }
    ],
    related: ['backoffice-dx-guide', 'audit-trail-guide', 'government-ai-trends'],
    faq: [
      { question: 'Resources と Blog は何が違いますか。', answer: 'Blog は記事一覧、Resources は導入準備に使うガイド、テンプレート、トレンド、支柱ページの入口です。' },
      { question: 'ホワイトペーパーはありますか。', answer: '現時点では入口を整備し、次段階で PDF 資料やダウンロード導線を追加する想定です。' },
      { question: '既存の行政 DX ページは残しますか。', answer: '残します。新しい AI サービスの応用領域として、Resources から読めるようにします。' }
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
      primaryCta: '預約導入討論',
      secondaryCta: '查看相關服務'
    }
  ])
) as Record<string, AiServicePage>;

function zhTitle(slug: string) {
  const titles: Record<string, string> = {
    'ai-workflow': '把內部文件變成可搜尋、可審核、可留痕的 AI 工作流',
    'government-ai-trends': '把 AI 政策新聞轉成企業可用的趨勢資料庫',
    'rag-knowledge-base': '建立能顯示來源、控管權限的 RAG 內部知識庫',
    'content-factory': '建立可審稿、可排程、可改善的 AI 內容生產線',
    'case-studies': '用案例看 AI 文件工作流導入後的變化',
    'ai-governance': '設計 AI 使用權限、人工審核與使用紀錄',
    resources: 'AI 文件工作流資料中心'
  };
  return titles[slug] || slug;
}

function zhDescription(slug: string) {
  const descriptions: Record<string, string> = {
    'ai-workflow': '從文件盤點、RAG 試作、人工審核到紀錄保存，建立能被團隊真正使用的 AI 文件流程。',
    'government-ai-trends': '整理日本與海外 AI 政策、自治體 AI 應用與企業導入時需要注意的治理重點。',
    'rag-knowledge-base': '針對 PDF、Docs、Sheets 與網頁內容，設計引用來源、權限控管、更新流程與使用紀錄。',
    'content-factory': '把主題設計、來源管理、AI 草稿、人工審稿與發布排程整合成可持續的內容營運。',
    'case-studies': '用學校、委員會、小型企業等情境，呈現搜尋時間、詢問成本與交接負擔如何改善。',
    'ai-governance': '先定義哪些資料能被 AI 使用、誰能使用、哪些回答需要人工確認，以及如何留下紀錄。',
    resources: '集中導入指南、趨勢解析、模板、白皮書與既有行政 DX 深度頁。'
  };
  return descriptions[slug] || '';
}

export function getAiServicePage(locale: Locale, slug: string) {
  return (locale === 'ja-JP' ? jaPages : zhPages)[slug] || null;
}

export function getAllAiServiceSlugs() {
  return [...aiServiceSlugs];
}
