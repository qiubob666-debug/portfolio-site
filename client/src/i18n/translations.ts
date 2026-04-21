/* i18n translations — Kinetic Precision
   Supported languages: en (English), zh (中文), ja (日本語)
   Auto-detected from navigator.language, manually switchable via LanguageSwitcher */

export type Locale = "en" | "zh" | "ja";

export interface Translations {
  nav: {
    stack: string;
    process: string;
    about: string;
    contact: string;
    available: string;
  };
  hero: {
    index: string;
    roles: string[];
    description: string;
    stats: Array<{ value: string; label: string }>;
    cta_stack: string;
    cta_github: string;
    scroll: string;
    graph_hint: string;
  };
  stack: {
    index: string;
    headline: string;
    headline_em: string;
    graph_hint: string;
    categories: Array<{ label: string; items: string[] }>;
  };
  process: {
    index: string;
    headline: string;
    headline_em: string;
    workflow_label: string;
    adr_label: string;
    workflow: Array<{ step: string; title: string; desc: string }>;
    decisions: Array<{
      id: string;
      title: string;
      category: string;
      tags: string[];
      summary: string;
      reasoning: string[];
      tradeoff: string;
    }>;
  };
  about: {
    index: string;
    headline: string;
    headline_em: string;
    bio1: string;
    bio2: string;
    orbit_label: string;
    values: Array<{ label: string; desc: string }>;
  };
  contact: {
    index: string;
    headline: string;
    headline_em: string;
    description: string;
    cta: string;
    links: Array<{ label: string; href: string; external: boolean }>;
    footer_built: string;
    footer_source: string;
  };
  graph: {
    react: string;
    typescript: string;
    vite: string;
    tailwind: string;
    framer: string;
    python: string;
    fastapi: string;
    nodejs: string;
    php: string;
    docker: string;
    vercel: string;
    nginx: string;
    github: string;
    n8n: string;
    sanity: string;
    supabase: string;
    postgresql: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      stack: "Stack",
      process: "Process",
      about: "About",
      contact: "Contact",
      available: "Available",
    },
    hero: {
      index: "01 — Identity",
      roles: [
        "Full-Stack Engineer",
        "Systems Architect",
        "Automation Builder",
        "UI/UX Implementer",
      ],
      description:
        "Building end-to-end systems — from React interfaces to Python APIs, Docker infrastructure, and n8n automation pipelines. This site is the portfolio. The interaction is the proof.",
      stats: [
        { value: "6+", label: "Repos in Production" },
        { value: "300+", label: "n8n Workflow Nodes" },
        { value: "5", label: "Tech Domains" },
      ],
      cta_stack: "Explore Stack →",
      cta_github: "GitHub ↗",
      scroll: "Scroll",
      graph_hint: "Interactive tech graph below ↓",
    },
    stack: {
      index: "02 — Technology Stack",
      headline: "The constellation",
      headline_em: "of tools I build with",
      graph_hint: "Click any node to see depth — drag to explore",
      categories: [
        {
          label: "Frontend",
          items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "Wouter", "shadcn/ui", "Recharts"],
        },
        {
          label: "Backend",
          items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API", "Pydantic", "JWT Auth"],
        },
        {
          label: "Infrastructure",
          items: ["Docker Compose", "Nginx", "Vercel", "Railway", "Hostinger VPS", "GitHub Actions", "SSL/TLS", "Reverse Proxy"],
        },
        {
          label: "Data & Storage",
          items: ["PostgreSQL", "Supabase", "MySQL", "Row Level Security", "GROQ Queries", "Real-time Subscriptions"],
        },
        {
          label: "Automation & CMS",
          items: ["n8n Workflows", "Sanity CMS", "Webhook Integrations", "Scheduled Pipelines", "Content Sync", "Custom Schemas"],
        },
      ],
    },
    process: {
      index: "03 — Engineering Process",
      headline: "How I think,",
      headline_em: "not just what I built",
      workflow_label: "Development Workflow",
      adr_label: "Architecture Decisions (ADR)",
      workflow: [
        { step: "01", title: "Requirement Analysis", desc: "Break down user needs into data models and API contracts before writing any code." },
        { step: "02", title: "Architecture Decision", desc: "Document tech choices with explicit tradeoffs. ADRs live in the repository." },
        { step: "03", title: "Infrastructure First", desc: "Docker Compose stack defined before application code. Environment parity from day one." },
        { step: "04", title: "API Contract", desc: "OpenAPI spec or TypeScript interfaces defined before implementation begins." },
        { step: "05", title: "Build & Iterate", desc: "Feature branches, PR reviews, automated deployment on merge to main." },
        { step: "06", title: "Monitor & Automate", desc: "n8n workflows handle recurring tasks. Logs and alerts configured from launch." },
      ],
      decisions: [
        {
          id: "adr-001",
          title: "Why Sanity over Contentful",
          category: "Architecture Decision",
          tags: ["CMS", "TypeScript", "GROQ"],
          summary: "Chose Sanity for its schema-as-code approach and GROQ query language, enabling type-safe content modeling and real-time sync with React frontends.",
          reasoning: [
            "Schema defined in TypeScript — version-controlled, reviewable, testable",
            "GROQ queries co-locate data requirements with components",
            "Real-time listener API enables live content preview without polling",
            "Studio customization allows client-specific editorial workflows",
          ],
          tradeoff: "Higher learning curve than Contentful, but full ownership of content model structure.",
        },
        {
          id: "adr-002",
          title: "Docker Compose over Kubernetes",
          category: "Infrastructure Decision",
          tags: ["Docker", "DevOps", "Scalability"],
          summary: "For current project scale (1–3 services), Compose provides 90% of K8s benefits with 10% of the operational complexity.",
          reasoning: [
            "Single-host deployments don't need orchestration overhead",
            "Compose files serve as executable infrastructure documentation",
            "Nginx reverse proxy handles routing and SSL termination cleanly",
            "Migration path to K8s is clear when horizontal scaling is needed",
          ],
          tradeoff: "No auto-scaling or self-healing. Acceptable for current traffic profiles.",
        },
        {
          id: "adr-003",
          title: "n8n for Automation over Custom Scripts",
          category: "Automation Decision",
          tags: ["n8n", "Automation", "Workflows"],
          summary: "Visual workflow builder reduces time-to-automation by 70% for integration tasks, while still allowing custom code nodes for complex logic.",
          reasoning: [
            "300+ built-in integrations eliminate boilerplate HTTP clients",
            "Visual debugger makes workflow state inspection intuitive",
            "Self-hosted on Docker — full data sovereignty",
            "Webhook triggers enable event-driven architecture without polling",
          ],
          tradeoff: "Not suitable for high-throughput data processing. Python scripts handle those cases.",
        },
        {
          id: "adr-004",
          title: "Supabase over Firebase",
          category: "Database Decision",
          tags: ["PostgreSQL", "Auth", "RLS"],
          summary: "PostgreSQL's relational model and Row Level Security provide stronger data integrity guarantees than Firebase's document model for structured data.",
          reasoning: [
            "SQL joins eliminate denormalization complexity",
            "Row Level Security enforces access control at database level",
            "Open-source — self-hostable, no vendor lock-in",
            "PostgREST auto-generates REST API from schema",
          ],
          tradeoff: "Cold start latency on free tier. Mitigated with connection pooling.",
        },
      ],
    },
    about: {
      index: "04 — About",
      headline: "Building systems",
      headline_em: "end to end",
      bio1: "Full-stack engineer with a systems mindset. I work across the entire stack — from crafting React interfaces to designing Python APIs, configuring Docker infrastructure, and building n8n automation pipelines.",
      bio2: "Based in China. Currently building AuraLoop — an astrology platform with Sanity CMS, Supabase, and a custom Kerykeion-based calculation service. Available for freelance projects and technical consulting.",
      orbit_label: "Skill orbit — core to periphery",
      values: [
        { label: "Systems Thinking", desc: "Every component is part of a larger system. I design for the whole, not just the part." },
        { label: "Automation First", desc: "If a task runs more than twice, it should be automated. n8n, scripts, CI/CD." },
        { label: "Ownership", desc: "Self-hosted infrastructure, open-source tooling, no vendor lock-in by default." },
        { label: "Clarity in Complexity", desc: "Good architecture makes complex systems understandable. Documentation is code." },
      ],
    },
    contact: {
      index: "05 — Contact",
      headline: "Let's build",
      headline_em: "something together",
      description: "Available for freelance projects, technical consulting, and full-time opportunities. Response within 24 hours.",
      cta: "contact@bobqiushao.online",
      links: [
        { label: "GitHub", href: "https://github.com/qiubob666-debug", external: true },
        { label: "Email", href: "mailto:contact@bobqiushao.online", external: false },
        { label: "Portfolio Repo", href: "https://github.com/qiubob666-debug/portfolio-site", external: true },
      ],
      footer_built: "React · TypeScript · Vite · Vercel",
      footer_source: "View Source ↗",
    },
    graph: {
      react:      "Production-grade SPA architecture, custom hooks, context, performance optimization",
      typescript: "Strict mode, generics, utility types, declaration files",
      vite:       "Custom plugins, SSR config, build optimization",
      tailwind:   "Design tokens, custom themes, v4 OKLCH palette",
      framer:     "Gesture animations, layout transitions, scroll-driven effects",
      python:     "FastAPI services, data pipelines, automation scripts",
      fastapi:    "REST + async endpoints, Pydantic validation, JWT auth",
      nodejs:     "Express APIs, serverless functions, CLI tools",
      php:        "WordPress custom plugins, REST API extensions",
      docker:     "Multi-service Compose stacks, custom images, networking",
      vercel:     "Edge functions, CI/CD pipelines, domain management",
      nginx:      "Reverse proxy, SSL termination, load balancing config",
      github:     "CI/CD workflows, automated testing, deployment pipelines",
      n8n:        "300+ node workflows, webhook integrations, scheduled automation",
      sanity:     "Custom schemas, GROQ queries, real-time content sync",
      supabase:   "PostgreSQL, Row Level Security, real-time subscriptions",
      postgresql: "Schema design, indexing, query optimization",
    },
  },

  zh: {
    nav: {
      stack: "技术栈",
      process: "工程思路",
      about: "关于",
      contact: "联系",
      available: "可接项目",
    },
    hero: {
      index: "01 — 身份",
      roles: [
        "全栈工程师",
        "系统架构师",
        "自动化构建者",
        "UI/UX 实现者",
      ],
      description:
        "构建端到端系统——从 React 界面到 Python API，从 Docker 基础设施到 n8n 自动化流水线。这个网站本身就是作品集，交互体验就是能力证明。",
      stats: [
        { value: "6+", label: "生产环境仓库" },
        { value: "300+", label: "n8n 工作流节点" },
        { value: "5", label: "技术领域" },
      ],
      cta_stack: "探索技术栈 →",
      cta_github: "GitHub ↗",
      scroll: "向下滚动",
      graph_hint: "下方有交互式技术图谱 ↓",
    },
    stack: {
      index: "02 — 技术栈",
      headline: "我构建所用的",
      headline_em: "技术星座图",
      graph_hint: "点击节点查看深度 — 拖拽探索",
      categories: [
        {
          label: "前端",
          items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "Wouter", "shadcn/ui", "Recharts"],
        },
        {
          label: "后端",
          items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API", "Pydantic", "JWT 认证"],
        },
        {
          label: "基础设施",
          items: ["Docker Compose", "Nginx", "Vercel", "Railway", "Hostinger VPS", "GitHub Actions", "SSL/TLS", "反向代理"],
        },
        {
          label: "数据与存储",
          items: ["PostgreSQL", "Supabase", "MySQL", "行级安全", "GROQ 查询", "实时订阅"],
        },
        {
          label: "自动化与 CMS",
          items: ["n8n 工作流", "Sanity CMS", "Webhook 集成", "定时任务", "内容同步", "自定义 Schema"],
        },
      ],
    },
    process: {
      index: "03 — 工程思路",
      headline: "我如何思考，",
      headline_em: "而不只是我做了什么",
      workflow_label: "开发工作流",
      adr_label: "架构决策记录（ADR）",
      workflow: [
        { step: "01", title: "需求分析", desc: "在写任何代码之前，将用户需求拆解为数据模型和 API 契约。" },
        { step: "02", title: "架构决策", desc: "记录技术选型及其明确的权衡取舍，ADR 文档存放在仓库中。" },
        { step: "03", title: "基础设施优先", desc: "在应用代码之前定义 Docker Compose 栈，从第一天起保证环境一致性。" },
        { step: "04", title: "API 契约", desc: "在实现开始之前定义 OpenAPI 规范或 TypeScript 接口。" },
        { step: "05", title: "构建与迭代", desc: "功能分支、PR 审查、合并到主分支后自动部署。" },
        { step: "06", title: "监控与自动化", desc: "n8n 工作流处理重复任务，日志和告警从上线起即配置完毕。" },
      ],
      decisions: [
        {
          id: "adr-001",
          title: "为何选 Sanity 而非 Contentful",
          category: "架构决策",
          tags: ["CMS", "TypeScript", "GROQ"],
          summary: "选择 Sanity 是因为其 Schema 即代码的方式和 GROQ 查询语言，实现了类型安全的内容建模和与 React 前端的实时同步。",
          reasoning: [
            "Schema 用 TypeScript 定义——可版本控制、可审查、可测试",
            "GROQ 查询将数据需求与组件共同定位",
            "实时监听 API 无需轮询即可实现内容实时预览",
            "Studio 定制化允许针对客户的编辑工作流",
          ],
          tradeoff: "学习曲线比 Contentful 更陡，但对内容模型结构拥有完全所有权。",
        },
        {
          id: "adr-002",
          title: "Docker Compose 而非 Kubernetes",
          category: "基础设施决策",
          tags: ["Docker", "DevOps", "可扩展性"],
          summary: "对于当前项目规模（1-3 个服务），Compose 以 10% 的运维复杂度提供了 K8s 90% 的收益。",
          reasoning: [
            "单主机部署不需要编排开销",
            "Compose 文件作为可执行的基础设施文档",
            "Nginx 反向代理干净地处理路由和 SSL 终止",
            "需要水平扩展时，迁移到 K8s 的路径清晰",
          ],
          tradeoff: "没有自动扩缩容或自愈能力，对当前流量规模可接受。",
        },
        {
          id: "adr-003",
          title: "用 n8n 替代自定义脚本做自动化",
          category: "自动化决策",
          tags: ["n8n", "自动化", "工作流"],
          summary: "可视化工作流构建器将集成任务的自动化时间缩短 70%，同时仍允许自定义代码节点处理复杂逻辑。",
          reasoning: [
            "300+ 内置集成消除了样板 HTTP 客户端代码",
            "可视化调试器使工作流状态检查直观",
            "在 Docker 上自托管——完全的数据主权",
            "Webhook 触发器无需轮询即可实现事件驱动架构",
          ],
          tradeoff: "不适合高吞吐量数据处理，这些情况由 Python 脚本处理。",
        },
        {
          id: "adr-004",
          title: "Supabase 而非 Firebase",
          category: "数据库决策",
          tags: ["PostgreSQL", "认证", "RLS"],
          summary: "PostgreSQL 的关系模型和行级安全为结构化数据提供了比 Firebase 文档模型更强的数据完整性保证。",
          reasoning: [
            "SQL 连接消除了反规范化的复杂性",
            "行级安全在数据库层面强制执行访问控制",
            "开源——可自托管，默认无供应商锁定",
            "PostgREST 从 Schema 自动生成 REST API",
          ],
          tradeoff: "免费层有冷启动延迟，通过连接池缓解。",
        },
      ],
    },
    about: {
      index: "04 — 关于",
      headline: "构建系统，",
      headline_em: "端到端全栈",
      bio1: "具有系统思维的全栈工程师。我跨越整个技术栈工作——从打造 React 界面到设计 Python API，配置 Docker 基础设施，构建 n8n 自动化流水线。",
      bio2: "目前在中国。正在构建 AuraLoop——一个使用 Sanity CMS、Supabase 和自定义 Kerykeion 计算服务的占星平台。欢迎自由职业项目和技术咨询合作。",
      orbit_label: "技能轨道——从核心到外围",
      values: [
        { label: "系统思维", desc: "每个组件都是更大系统的一部分，我为整体而设计，而不仅仅是局部。" },
        { label: "自动化优先", desc: "如果一个任务运行超过两次，它就应该被自动化——n8n、脚本、CI/CD。" },
        { label: "所有权", desc: "自托管基础设施，开源工具，默认无供应商锁定。" },
        { label: "化繁为简", desc: "好的架构让复杂系统变得可理解，文档即代码。" },
      ],
    },
    contact: {
      index: "05 — 联系",
      headline: "一起构建",
      headline_em: "有价值的东西",
      description: "欢迎自由职业项目、技术咨询和全职机会，24 小时内回复。",
      cta: "contact@bobqiushao.online",
      links: [
        { label: "GitHub", href: "https://github.com/qiubob666-debug", external: true },
        { label: "邮件", href: "mailto:contact@bobqiushao.online", external: false },
        { label: "项目仓库", href: "https://github.com/qiubob666-debug/portfolio-site", external: true },
      ],
      footer_built: "React · TypeScript · Vite · Vercel 构建",
      footer_source: "查看源码 ↗",
    },
    graph: {
      react:      "生产级 SPA 架构、自定义 Hooks、Context、性能优化",
      typescript: "严格模式、泛型、工具类型、声明文件",
      vite:       "自定义插件、SSR 配置、构建优化",
      tailwind:   "设计令牌、自定义主题、v4 OKLCH 调色板",
      framer:     "手势动画、布局过渡、滚动驱动效果",
      python:     "FastAPI 服务、数据管道、自动化脚本",
      fastapi:    "REST + 异步端点、Pydantic 验证、JWT 认证",
      nodejs:     "Express API、Serverless 函数、CLI 工具",
      php:        "WordPress 自定义插件、REST API 扩展",
      docker:     "多服务 Compose 栈、自定义镜像、网络配置",
      vercel:     "边缘函数、CI/CD 流水线、域名管理",
      nginx:      "反向代理、SSL 终止、负载均衡配置",
      github:     "CI/CD 工作流、自动化测试、部署流水线",
      n8n:        "300+ 节点工作流、Webhook 集成、定时自动化",
      sanity:     "自定义 Schema、GROQ 查询、实时内容同步",
      supabase:   "PostgreSQL、行级安全、实时订阅",
      postgresql: "Schema 设计、索引、查询优化",
    },
  },

  ja: {
    nav: {
      stack: "技術スタック",
      process: "プロセス",
      about: "について",
      contact: "連絡",
      available: "案件受付中",
    },
    hero: {
      index: "01 — アイデンティティ",
      roles: [
        "フルスタックエンジニア",
        "システムアーキテクト",
        "自動化ビルダー",
        "UI/UX 実装者",
      ],
      description:
        "React インターフェースから Python API、Docker インフラ、n8n 自動化パイプラインまで、エンドツーエンドのシステムを構築します。このサイト自体がポートフォリオです。インタラクションが証明です。",
      stats: [
        { value: "6+", label: "本番環境リポジトリ" },
        { value: "300+", label: "n8n ワークフローノード" },
        { value: "5", label: "技術ドメイン" },
      ],
      cta_stack: "技術スタックを見る →",
      cta_github: "GitHub ↗",
      scroll: "スクロール",
      graph_hint: "インタラクティブな技術グラフは下に ↓",
    },
    stack: {
      index: "02 — 技術スタック",
      headline: "私が使う",
      headline_em: "技術のコンステレーション",
      graph_hint: "ノードをクリックして深度を確認 — ドラッグして探索",
      categories: [
        {
          label: "フロントエンド",
          items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "Wouter", "shadcn/ui", "Recharts"],
        },
        {
          label: "バックエンド",
          items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API", "Pydantic", "JWT 認証"],
        },
        {
          label: "インフラ",
          items: ["Docker Compose", "Nginx", "Vercel", "Railway", "Hostinger VPS", "GitHub Actions", "SSL/TLS", "リバースプロキシ"],
        },
        {
          label: "データ & ストレージ",
          items: ["PostgreSQL", "Supabase", "MySQL", "行レベルセキュリティ", "GROQ クエリ", "リアルタイムサブスクリプション"],
        },
        {
          label: "自動化 & CMS",
          items: ["n8n ワークフロー", "Sanity CMS", "Webhook 統合", "スケジュールパイプライン", "コンテンツ同期", "カスタムスキーマ"],
        },
      ],
    },
    process: {
      index: "03 — エンジニアリングプロセス",
      headline: "私の考え方、",
      headline_em: "作ったものだけでなく",
      workflow_label: "開発ワークフロー",
      adr_label: "アーキテクチャ決定記録（ADR）",
      workflow: [
        { step: "01", title: "要件分析", desc: "コードを書く前に、ユーザーのニーズをデータモデルと API コントラクトに分解します。" },
        { step: "02", title: "アーキテクチャ決定", desc: "明示的なトレードオフを含む技術選択を文書化。ADR はリポジトリに保存。" },
        { step: "03", title: "インフラ優先", desc: "アプリケーションコードの前に Docker Compose スタックを定義。初日から環境の一致を確保。" },
        { step: "04", title: "API コントラクト", desc: "実装開始前に OpenAPI 仕様または TypeScript インターフェースを定義。" },
        { step: "05", title: "ビルド & イテレーション", desc: "フィーチャーブランチ、PR レビュー、main へのマージ後に自動デプロイ。" },
        { step: "06", title: "モニタリング & 自動化", desc: "n8n ワークフローが繰り返しタスクを処理。ログとアラートはローンチ時から設定済み。" },
      ],
      decisions: [
        {
          id: "adr-001",
          title: "Contentful より Sanity を選んだ理由",
          category: "アーキテクチャ決定",
          tags: ["CMS", "TypeScript", "GROQ"],
          summary: "スキーマをコードとして定義するアプローチと GROQ クエリ言語により、型安全なコンテンツモデリングと React フロントエンドとのリアルタイム同期が可能になります。",
          reasoning: [
            "TypeScript でスキーマを定義 — バージョン管理、レビュー、テストが可能",
            "GROQ クエリでデータ要件をコンポーネントと共置",
            "リアルタイムリスナー API でポーリングなしにコンテンツプレビューが可能",
            "Studio のカスタマイズでクライアント固有の編集ワークフローを実現",
          ],
          tradeoff: "Contentful より学習曲線が急だが、コンテンツモデル構造の完全な所有権を持つ。",
        },
        {
          id: "adr-002",
          title: "Kubernetes より Docker Compose を選んだ理由",
          category: "インフラ決定",
          tags: ["Docker", "DevOps", "スケーラビリティ"],
          summary: "現在のプロジェクト規模（1〜3 サービス）では、Compose は K8s の利点の 90% を 10% の運用複雑さで提供します。",
          reasoning: [
            "シングルホストデプロイにはオーケストレーションのオーバーヘッドは不要",
            "Compose ファイルが実行可能なインフラドキュメントとして機能",
            "Nginx リバースプロキシがルーティングと SSL 終端をクリーンに処理",
            "水平スケーリングが必要になったときの K8s への移行パスが明確",
          ],
          tradeoff: "自動スケーリングや自己修復なし。現在のトラフィックプロファイルには許容範囲。",
        },
        {
          id: "adr-003",
          title: "カスタムスクリプトより n8n を選んだ理由",
          category: "自動化決定",
          tags: ["n8n", "自動化", "ワークフロー"],
          summary: "ビジュアルワークフロービルダーにより、統合タスクの自動化時間が 70% 短縮され、複雑なロジックにはカスタムコードノードも使用できます。",
          reasoning: [
            "300+ の組み込み統合でボイラープレートの HTTP クライアントが不要",
            "ビジュアルデバッガーでワークフロー状態の検査が直感的",
            "Docker 上でセルフホスト — 完全なデータ主権",
            "Webhook トリガーでポーリングなしのイベント駆動アーキテクチャを実現",
          ],
          tradeoff: "高スループットのデータ処理には不向き。その場合は Python スクリプトで対応。",
        },
        {
          id: "adr-004",
          title: "Firebase より Supabase を選んだ理由",
          category: "データベース決定",
          tags: ["PostgreSQL", "認証", "RLS"],
          summary: "PostgreSQL のリレーショナルモデルと行レベルセキュリティにより、構造化データに対して Firebase のドキュメントモデルより強力なデータ整合性保証が得られます。",
          reasoning: [
            "SQL 結合で非正規化の複雑さを排除",
            "行レベルセキュリティでデータベースレベルのアクセス制御を強制",
            "オープンソース — セルフホスト可能、デフォルトでベンダーロックインなし",
            "PostgREST がスキーマから REST API を自動生成",
          ],
          tradeoff: "無料プランではコールドスタートレイテンシあり。コネクションプーリングで軽減。",
        },
      ],
    },
    about: {
      index: "04 — について",
      headline: "システムを構築する、",
      headline_em: "エンドツーエンドで",
      bio1: "システム思考を持つフルスタックエンジニア。React インターフェースの構築から Python API の設計、Docker インフラの設定、n8n 自動化パイプラインの構築まで、スタック全体にわたって作業します。",
      bio2: "中国在住。現在 AuraLoop を構築中 — Sanity CMS、Supabase、カスタム Kerykeion ベースの計算サービスを使用した占星術プラットフォーム。フリーランスプロジェクトと技術コンサルティングを受け付けています。",
      orbit_label: "スキルオービット — コアから周辺へ",
      values: [
        { label: "システム思考", desc: "すべてのコンポーネントはより大きなシステムの一部です。部分だけでなく全体のために設計します。" },
        { label: "自動化優先", desc: "タスクが 2 回以上実行されるなら、自動化すべきです。n8n、スクリプト、CI/CD。" },
        { label: "オーナーシップ", desc: "セルフホストインフラ、オープンソースツール、デフォルトでベンダーロックインなし。" },
        { label: "複雑さの中の明確さ", desc: "良いアーキテクチャは複雑なシステムを理解可能にします。ドキュメントはコードです。" },
      ],
    },
    contact: {
      index: "05 — 連絡",
      headline: "一緒に作りましょう、",
      headline_em: "価値あるものを",
      description: "フリーランスプロジェクト、技術コンサルティング、フルタイムの機会を受け付けています。24 時間以内に返信します。",
      cta: "contact@bobqiushao.online",
      links: [
        { label: "GitHub", href: "https://github.com/qiubob666-debug", external: true },
        { label: "メール", href: "mailto:contact@bobqiushao.online", external: false },
        { label: "リポジトリ", href: "https://github.com/qiubob666-debug/portfolio-site", external: true },
      ],
      footer_built: "React · TypeScript · Vite · Vercel で構築",
      footer_source: "ソースを見る ↗",
    },
    graph: {
      react:      "本番グレードの SPA アーキテクチャ、カスタムフック、コンテキスト、パフォーマンス最適化",
      typescript: "ストリクトモード、ジェネリクス、ユーティリティ型、宣言ファイル",
      vite:       "カスタムプラグイン、SSR 設定、ビルド最適化",
      tailwind:   "デザイントークン、カスタムテーマ、v4 OKLCH パレット",
      framer:     "ジェスチャーアニメーション、レイアウトトランジション、スクロール駆動エフェクト",
      python:     "FastAPI サービス、データパイプライン、自動化スクリプト",
      fastapi:    "REST + 非同期エンドポイント、Pydantic バリデーション、JWT 認証",
      nodejs:     "Express API、サーバーレス関数、CLI ツール",
      php:        "WordPress カスタムプラグイン、REST API 拡張",
      docker:     "マルチサービス Compose スタック、カスタムイメージ、ネットワーク設定",
      vercel:     "エッジ関数、CI/CD パイプライン、ドメイン管理",
      nginx:      "リバースプロキシ、SSL 終端、ロードバランシング設定",
      github:     "CI/CD ワークフロー、自動テスト、デプロイパイプライン",
      n8n:        "300+ ノードワークフロー、Webhook 統合、スケジュール自動化",
      sanity:     "カスタムスキーマ、GROQ クエリ、リアルタイムコンテンツ同期",
      supabase:   "PostgreSQL、行レベルセキュリティ、リアルタイムサブスクリプション",
      postgresql: "スキーマ設計、インデックス、クエリ最適化",
    },
  },
};
