/* translations.ts — Considered Authority
   Supported: en, zh, ja
   Strategy: Boss-as-customer journey map
   Sections: hero → services → capabilities → process → trust → about → contact */

export type Locale = "en" | "zh" | "ja";

export interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface CapCategory {
  label: string;
  items: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface TrustItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Translations {
  nav: {
    services: string;
    process: string;
    about: string;
    contact: string;
    available: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    headline3: string;
    sub: string;
    cta_primary: string;
    cta_secondary: string;
    stat1_num: string; stat1_label: string;
    stat2_num: string; stat2_label: string;
    stat3_num: string; stat3_label: string;
    stat4_num: string; stat4_label: string;
    // legacy compat
    index: string;
    roles: string[];
    description: string;
    stats: Array<{ value: string; label: string }>;
    cta_stack: string;
    cta_github: string;
    scroll: string;
    graph_hint: string;
  };
  services: {
    index: string;
    headline: string;
    headline_em: string;
    sub: string;
    items: ServiceItem[];
    note: string;
  };
  capabilities: {
    index: string;
    headline: string;
    headline_em: string;
    sub: string;
    categories: CapCategory[];
  };
  process: {
    index: string;
    headline: string;
    headline_em: string;
    sub: string;
    steps: ProcessStep[];
    // legacy compat
    workflow_label: string;
    adr_label: string;
    workflow: ProcessStep[];
    decisions: any[];
  };
  trust: {
    index: string;
    headline: string;
    headline_em: string;
    items: TrustItem[];
    faq_label: string;
    faqs: FaqItem[];
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
    form_name: string;
    form_email: string;
    form_budget: string;
    form_message: string;
    form_submit: string;
    form_success: string;
    form_name_ph: string;
    form_email_ph: string;
    form_message_ph: string;
    budget_options: string[];
    cta: string;
    wechat: string;
    wechat_label: string;
    links: Array<{ label: string; href: string; external: boolean }>;
    footer_built: string;
    footer_source: string;
  };
  stack: {
    index: string;
    headline: string;
    headline_em: string;
    graph_hint: string;
    categories: CapCategory[];
  };
  graph: Record<string, string>;
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      services: "Services",
      process: "Process",
      about: "About",
      contact: "Contact",
      available: "Available for projects",
    },
    hero: {
      badge: "Full-Stack Engineer · Cross-Border E-Commerce Specialist",
      headline1: "Your brand deserves",
      headline2: "a website that",
      headline3: "actually converts.",
      sub: "I build high-performance websites and digital systems for cross-border e-commerce brands, independent sellers, and global businesses — from Shopify storefronts to custom brand portals.",
      cta_primary: "View Services",
      cta_secondary: "See My Stack",
      stat1_num: "6+", stat1_label: "Live Projects",
      stat2_num: "5", stat2_label: "Tech Domains",
      stat3_num: "3", stat3_label: "Languages",
      stat4_num: "24h", stat4_label: "Response Time",
      // legacy
      index: "01 — Identity",
      roles: ["Full-Stack Engineer", "E-Commerce Specialist", "Automation Builder", "Brand Web Consultant"],
      description: "Building high-performance websites and digital systems for cross-border brands.",
      stats: [
        { value: "6+", label: "Live Projects" },
        { value: "5", label: "Tech Domains" },
        { value: "24h", label: "Response Time" },
      ],
      cta_stack: "Explore Stack →",
      cta_github: "GitHub ↗",
      scroll: "Scroll",
      graph_hint: "Interactive tech graph below ↓",
    },
    services: {
      index: "01 — What I Deliver",
      headline: "Services built for",
      headline_em: "brands that sell globally",
      sub: "Every engagement is scoped, priced transparently, and delivered with full documentation. No surprises.",
      items: [
        {
          id: "brand-site",
          tag: "Most Popular",
          title: "Brand Website",
          desc: "A custom-designed, high-performance brand site that tells your story and converts visitors into buyers.",
          price: "From ¥8,000",
          priceNote: "One-time project fee",
          features: [
            "Custom design — no templates",
            "Mobile-first, sub-2s load time",
            "SEO-ready structure",
            "CMS for self-editing",
            "3 rounds of revision",
            "1 month post-launch support",
          ],
          cta: "Get a Quote",
          featured: false,
        },
        {
          id: "ecom-store",
          tag: "Best Value",
          title: "E-Commerce Store",
          desc: "Full-featured online store with product management, payment integration, and conversion-optimized checkout.",
          price: "From ¥15,000",
          priceNote: "One-time project fee",
          features: [
            "Shopify / WooCommerce / Custom",
            "Multi-currency & multi-language",
            "Payment gateway integration",
            "Inventory & order management",
            "Analytics dashboard",
            "3 months post-launch support",
          ],
          cta: "Get a Quote",
          featured: true,
        },
        {
          id: "automation",
          tag: "Save Time",
          title: "Workflow Automation",
          desc: "Connect your tools and automate repetitive tasks — order sync, inventory updates, customer notifications.",
          price: "From ¥5,000",
          priceNote: "Per automation project",
          features: [
            "n8n / Zapier / custom scripts",
            "API integrations (Shopify, WooCommerce, ERP)",
            "Scheduled & webhook-triggered",
            "Error monitoring & alerts",
            "Full documentation",
            "Ongoing maintenance available",
          ],
          cta: "Get a Quote",
          featured: false,
        },
        {
          id: "consulting",
          tag: "Strategic",
          title: "Tech Consulting",
          desc: "Architecture review, tech stack selection, or a one-time audit of your existing digital infrastructure.",
          price: "¥800 / hour",
          priceNote: "Minimum 2 hours",
          features: [
            "Tech stack audit & recommendations",
            "Performance & SEO review",
            "Security assessment",
            "Migration planning",
            "Written report delivered",
            "Follow-up Q&A included",
          ],
          cta: "Book a Call",
          featured: false,
        },
      ],
      note: "All prices in CNY. USD / HKD pricing available. Custom scopes welcome — let's talk.",
    },
    capabilities: {
      index: "02 — Technical Depth",
      headline: "The full stack,",
      headline_em: "end to end",
      sub: "Not a no-code assembler. Every layer of your digital product — from pixel to server — is built with production-grade code.",
      categories: [
        {
          label: "Frontend",
          items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "shadcn/ui", "Recharts", "Wouter"],
        },
        {
          label: "Backend",
          items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API", "Pydantic", "JWT Auth"],
        },
        {
          label: "E-Commerce",
          items: ["Shopify Liquid", "WooCommerce", "Custom Checkout", "Payment Gateways", "Multi-currency", "Product Feeds"],
        },
        {
          label: "Infrastructure",
          items: ["Docker Compose", "Nginx", "Vercel", "Railway", "Hostinger VPS", "GitHub Actions", "SSL/TLS", "CDN"],
        },
        {
          label: "Data & CMS",
          items: ["PostgreSQL", "Supabase", "MySQL", "Sanity CMS", "Row Level Security", "GROQ Queries"],
        },
        {
          label: "Automation",
          items: ["n8n Workflows", "Webhook Integrations", "Scheduled Pipelines", "API Sync", "Order Automation", "Inventory Alerts"],
        },
      ],
    },
    process: {
      index: "03 — How We Work Together",
      headline: "From brief",
      headline_em: "to live in 4 steps",
      sub: "A clear, predictable process. You always know where we are and what comes next.",
      steps: [
        { step: "01", title: "Discovery Call", desc: "30-minute call to understand your brand, goals, and timeline. I'll ask the right questions so nothing gets missed." },
        { step: "02", title: "Proposal & Scope", desc: "Written proposal with fixed price, deliverables, and timeline. No hourly billing surprises." },
        { step: "03", title: "Build & Review", desc: "I build in sprints with regular check-ins. You review at each milestone before we proceed." },
        { step: "04", title: "Launch & Handover", desc: "Full deployment, documentation, and a walkthrough so your team can manage the site independently." },
      ],
      // legacy compat
      workflow_label: "Development Workflow",
      adr_label: "Architecture Decisions",
      workflow: [
        { step: "01", title: "Discovery Call", desc: "30-minute call to understand your brand, goals, and timeline." },
        { step: "02", title: "Proposal & Scope", desc: "Written proposal with fixed price, deliverables, and timeline." },
        { step: "03", title: "Build & Review", desc: "Build in sprints with regular check-ins and milestone reviews." },
        { step: "04", title: "Launch & Handover", desc: "Full deployment, documentation, and team walkthrough." },
      ],
      decisions: [],
    },
    trust: {
      index: "04 — Why Work With Me",
      headline: "Built on",
      headline_em: "transparency & craft",
      items: [
        { icon: "🔒", title: "Fixed-Price Projects", desc: "No hourly billing. You get a written quote upfront — the price you see is the price you pay." },
        { icon: "📦", title: "Full Code Ownership", desc: "Every line of code is yours. Hosted on your own accounts. No lock-in, ever." },
        { icon: "🌐", title: "Multi-Language Ready", desc: "Sites built with i18n from day one. Chinese, English, Japanese — your customers feel at home." },
        { icon: "⚡", title: "Performance First", desc: "Sub-2s load times, 90+ Lighthouse scores, CDN-delivered. Fast sites sell more." },
        { icon: "🤝", title: "Long-Term Partnership", desc: "I'm not a one-project vendor. Ongoing maintenance, updates, and growth support available." },
        { icon: "📊", title: "Data-Driven Decisions", desc: "Analytics integrated from launch. You'll know exactly how your site performs." },
      ],
      faq_label: "Frequently Asked Questions",
      faqs: [
        { q: "How long does a project take?", a: "A brand website typically takes 2–3 weeks. An e-commerce store takes 3–5 weeks. Complex custom builds are scoped individually. I'll give you an exact timeline in the proposal." },
        { q: "Do I need to provide content?", a: "Yes — you provide your brand assets (logo, product images, copy). I can advise on structure and help with copywriting at an additional fee." },
        { q: "Can you work with my existing Shopify/WordPress site?", a: "Absolutely. I can redesign, extend, or optimize your existing store without starting from scratch." },
        { q: "What if I need changes after launch?", a: "All projects include 1–3 months of post-launch support. After that, maintenance retainers are available starting at ¥1,500/month." },
        { q: "Do you work with international clients?", a: "Yes. I work with clients in China, Hong Kong, Southeast Asia, and globally. Communication in Chinese and English." },
      ],
    },
    about: {
      index: "05 — About Us",
      headline: "The team behind",
      headline_em: "your brand store",
      bio1: "We are a cross-border e-commerce execution team led by Bob Qiushao. We specialize in brand website infrastructure — from content platforms to full e-commerce systems. Our team delivers what agencies quote 60+ days for, in 10 days.",
      bio2: "Our clients are brand founders and operators who need a fast, reliable technical partner — not a 3-month agency project. We care about your ROI as much as your launch date.",
      orbit_label: "Skill orbit — core to periphery",
      values: [
        { label: "Conversion-Focused", desc: "Beautiful sites that don't convert are expensive decorations. Every design decision is tied to a business outcome." },
        { label: "Automation First", desc: "If a task runs more than twice, it should be automated. Your team's time is too valuable for manual work." },
        { label: "Full Ownership", desc: "Self-hosted infrastructure, open-source tooling, your accounts. You own everything." },
        { label: "Clear Communication", desc: "No jargon. Regular updates. You always know the status of your project." },
      ],
    },
    contact: {
      index: "06 — Let's Talk",
      headline: "Ready to build",
      headline_em: "your next project?",
      description: "Tell us about your project. We'll respond within 24 hours with initial thoughts and a cost breakdown.",
      form_name: "Your Name",
      form_email: "Email Address",
      form_budget: "Project Budget",
      form_message: "Tell us about your project",
      form_submit: "Send Message →",
      form_success: "Message sent! We'll reply within 24 hours.",
      form_name_ph: "Jane Smith",
      form_email_ph: "jane@yourbrand.com",
      form_message_ph: "I'm looking to build a brand website for my cross-border store...",
      budget_options: ["Under ¥5,000", "¥5,000 – ¥15,000", "¥15,000 – ¥30,000", "¥30,000+", "Not sure yet"],
      cta: "contact@bobqiushao.online",
      wechat: "19063709709",
      wechat_label: "WeChat / Phone",
      links: [
        { label: "Email", href: "mailto:contact@bobqiushao.online", external: false },
        { label: "WeChat", href: "weixin://", external: false },
      ],
      footer_built: "React · TypeScript · Vite · Vercel",
      footer_source: "View Source ↗",
    },
    stack: {
      index: "Tech Stack",
      headline: "The constellation",
      headline_em: "of tools I build with",
      graph_hint: "Click any node to see depth — drag to explore",
      categories: [
        { label: "Frontend", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "shadcn/ui"] },
        { label: "Backend", items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API"] },
        { label: "Infrastructure", items: ["Docker Compose", "Nginx", "Vercel", "Railway", "GitHub Actions", "SSL/TLS"] },
        { label: "Data & CMS", items: ["PostgreSQL", "Supabase", "MySQL", "Sanity CMS", "GROQ Queries"] },
        { label: "Automation", items: ["n8n Workflows", "Webhook Integrations", "Scheduled Pipelines", "API Sync"] },
      ],
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
      services: "服务",
      process: "合作流程",
      about: "关于",
      contact: "联系",
      available: "可接项目",
    },
    hero: {
      badge: "全栈工程师 · 跨境电商网站专家",
      headline1: "你的品牌值得拥有",
      headline2: "一个真正能",
      headline3: "带来转化的网站。",
      sub: "我为跨境电商品牌、独立卖家和全球化业务构建高性能网站和数字系统——从 Shopify 店铺到定制品牌官网，全程负责到底。",
      cta_primary: "查看服务",
      cta_secondary: "了解技术栈",
      stat1_num: "6+", stat1_label: "上线项目",
      stat2_num: "5", stat2_label: "技术领域",
      stat3_num: "3", stat3_label: "服务语言",
      stat4_num: "24h", stat4_label: "响应时间",
      // legacy
      index: "01 — 身份",
      roles: ["全栈工程师", "跨境电商专家", "自动化构建者", "品牌网站顾问"],
      description: "为跨境品牌构建高性能网站和数字系统。",
      stats: [
        { value: "6+", label: "上线项目" },
        { value: "5", label: "技术领域" },
        { value: "24h", label: "响应时间" },
      ],
      cta_stack: "探索技术栈 →",
      cta_github: "GitHub ↗",
      scroll: "向下滚动",
      graph_hint: "下方有交互式技术图谱 ↓",
    },
    services: {
      index: "01 — 我能为你做什么",
      headline: "为全球销售的",
      headline_em: "品牌而生的服务",
      sub: "每个项目都有明确的范围、透明的报价和完整的交付文档。没有隐藏费用。",
      items: [
        {
          id: "brand-site",
          tag: "最受欢迎",
          title: "品牌官网",
          desc: "定制设计的高性能品牌网站，讲述你的品牌故事，将访客转化为买家。",
          price: "¥8,000 起",
          priceNote: "一次性项目费用",
          features: [
            "全定制设计，非模板",
            "移动端优先，加载 < 2s",
            "SEO 友好结构",
            "CMS 自主编辑",
            "3 轮修改",
            "上线后 1 个月支持",
          ],
          cta: "获取报价",
          featured: false,
        },
        {
          id: "ecom-store",
          tag: "最佳性价比",
          title: "电商独立站",
          desc: "功能完整的独立站，含商品管理、支付集成和转化率优化的结账流程。",
          price: "¥15,000 起",
          priceNote: "一次性项目费用",
          features: [
            "Shopify / WooCommerce / 定制开发",
            "多币种 & 多语言",
            "支付网关集成",
            "库存与订单管理",
            "数据分析看板",
            "上线后 3 个月支持",
          ],
          cta: "获取报价",
          featured: true,
        },
        {
          id: "automation",
          tag: "节省时间",
          title: "工作流自动化",
          desc: "连接你的工具，自动化重复任务——订单同步、库存更新、客户通知。",
          price: "¥5,000 起",
          priceNote: "每个自动化项目",
          features: [
            "n8n / Zapier / 自定义脚本",
            "API 集成（Shopify、WooCommerce、ERP）",
            "定时 & Webhook 触发",
            "错误监控 & 告警",
            "完整文档",
            "可持续维护",
          ],
          cta: "获取报价",
          featured: false,
        },
        {
          id: "consulting",
          tag: "战略咨询",
          title: "技术咨询",
          desc: "架构评审、技术选型，或对你现有数字基础设施的一次性审计。",
          price: "¥800 / 小时",
          priceNote: "最少 2 小时",
          features: [
            "技术栈审计 & 建议",
            "性能 & SEO 评审",
            "安全评估",
            "迁移规划",
            "书面报告交付",
            "包含后续答疑",
          ],
          cta: "预约通话",
          featured: false,
        },
      ],
      note: "以上价格为人民币。支持美元 / 港币结算。欢迎定制范围——来聊聊。",
    },
    capabilities: {
      index: "02 — 技术深度",
      headline: "全栈能力，",
      headline_em: "端到端覆盖",
      sub: "不是无代码拼接工具。你数字产品的每一层——从像素到服务器——都用生产级代码构建。",
      categories: [
        {
          label: "前端",
          items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "shadcn/ui", "Recharts", "Wouter"],
        },
        {
          label: "后端",
          items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API", "Pydantic", "JWT 认证"],
        },
        {
          label: "电商",
          items: ["Shopify Liquid", "WooCommerce", "自定义结账", "支付网关", "多币种", "商品数据流"],
        },
        {
          label: "基础设施",
          items: ["Docker Compose", "Nginx", "Vercel", "Railway", "Hostinger VPS", "GitHub Actions", "SSL/TLS", "CDN"],
        },
        {
          label: "数据 & CMS",
          items: ["PostgreSQL", "Supabase", "MySQL", "Sanity CMS", "行级安全", "GROQ 查询"],
        },
        {
          label: "自动化",
          items: ["n8n 工作流", "Webhook 集成", "定时任务", "API 同步", "订单自动化", "库存告警"],
        },
      ],
    },
    process: {
      index: "03 — 合作方式",
      headline: "从需求",
      headline_em: "到上线，4 步完成",
      sub: "清晰、可预期的流程。你随时知道我们在哪里，下一步是什么。",
      steps: [
        { step: "01", title: "需求沟通", desc: "30 分钟通话，了解你的品牌、目标和时间线。我会问对的问题，确保没有遗漏。" },
        { step: "02", title: "方案 & 报价", desc: "书面方案，含固定价格、交付物和时间线。没有按小时计费的意外。" },
        { step: "03", title: "构建 & 评审", desc: "分阶段构建，定期沟通。每个里程碑你都会审查，确认后再推进。" },
        { step: "04", title: "上线 & 交接", desc: "完整部署、文档和操作讲解，让你的团队能独立管理网站。" },
      ],
      workflow_label: "开发工作流",
      adr_label: "架构决策记录",
      workflow: [
        { step: "01", title: "需求沟通", desc: "了解你的品牌、目标和时间线。" },
        { step: "02", title: "方案 & 报价", desc: "书面方案，含固定价格和交付物。" },
        { step: "03", title: "构建 & 评审", desc: "分阶段构建，里程碑评审。" },
        { step: "04", title: "上线 & 交接", desc: "完整部署和团队操作讲解。" },
      ],
      decisions: [],
    },
    trust: {
      index: "04 — 为什么选择我",
      headline: "建立在",
      headline_em: "透明与专业之上",
      items: [
        { icon: "🔒", title: "固定报价项目", desc: "不按小时计费。提前给你书面报价——你看到的价格就是你付的价格。" },
        { icon: "📦", title: "代码完全归你", desc: "每一行代码都是你的。托管在你自己的账号上。永远不会被锁定。" },
        { icon: "🌐", title: "多语言原生支持", desc: "网站从第一天起就支持 i18n。中文、英文、日文——让你的客户感到亲切。" },
        { icon: "⚡", title: "性能优先", desc: "加载 < 2s，Lighthouse 90+，CDN 加速。快速的网站卖得更多。" },
        { icon: "🤝", title: "长期合作伙伴", desc: "我不是一次性供应商。提供持续维护、更新和增长支持。" },
        { icon: "📊", title: "数据驱动决策", desc: "上线即集成分析。你会清楚知道网站的表现。" },
      ],
      faq_label: "常见问题",
      faqs: [
        { q: "项目需要多长时间？", a: "品牌官网通常需要 2–3 周。电商独立站需要 3–5 周。复杂定制项目单独评估。方案中会给出精确时间线。" },
        { q: "我需要提供内容吗？", a: "是的——你提供品牌素材（Logo、产品图、文案）。我可以提供结构建议，文案撰写可额外收费。" },
        { q: "你能改造我现有的 Shopify/WordPress 网站吗？", a: "当然可以。我可以重新设计、扩展或优化你现有的店铺，不需要从零开始。" },
        { q: "上线后需要修改怎么办？", a: "所有项目包含 1–3 个月的上线后支持。之后可按月维护，起价 ¥1,500/月。" },
        { q: "你接受海外客户吗？", a: "接受。我服务中国、香港、东南亚及全球客户。中英文沟通均可。" },
      ],
    },
    about: {
      index: "05 — 关于我们",
      headline: "你品牌独立站背后的",
      headline_em: "执行团队",
      bio1: "我们是一支专注于跨境电商品牌建站的执行团队，由 Bob Qiushao 带队。从品牌内容平台到完整电商系统，我们把机构报价 60 天以上的项目，压缩到 10 天交付。",
      bio2: "我们的客户是需要快速、可靠技术合伙人的品牌创始人和运营者——而不是等待 3 个月的外包项目。我们对你的投资回报率的关注，不亚于对上线日期的关注。",
      orbit_label: "技能轨道——从核心到外围",
      values: [
        { label: "转化率导向", desc: "好看但不转化的网站是昂贵的装饰品。每个设计决策都与业务结果挂钩。" },
        { label: "自动化优先", desc: "如果一个任务运行超过两次，就应该自动化。你团队的时间太宝贵了。" },
        { label: "完全所有权", desc: "自托管基础设施，开源工具，你的账号。你拥有一切。" },
        { label: "清晰沟通", desc: "不说行话。定期更新。你随时知道项目的状态。" },
      ],
    },
    contact: {
      index: "06 — 开始合作",
      headline: "准备好构建",
      headline_em: "你的下一个项目了吗？",
      description: "告诉我们你的项目情况，我们会在 24 小时内回复，附上初步方案和成本估算。",
      form_name: "你的姓名",
      form_email: "邮箱地址",
      form_budget: "项目预算",
      form_message: "描述你的项目需求",
      form_submit: "发送消息 →",
      form_success: "消息已发送！我们会在 24 小时内回复。",
      form_name_ph: "张三",
      form_email_ph: "zhang@yourbrand.com",
      form_message_ph: "我想为我的跨境店铺建一个品牌官网...",
      budget_options: ["5,000 以下", "¥5,000 – ¥15,000", "¥15,000 – ¥30,000", "¥30,000 以上", "暂不确定"],
      cta: "contact@bobqiushao.online",
      wechat: "19063709709",
      wechat_label: "微信 / 电话",
      links: [
        { label: "邮件", href: "mailto:contact@bobqiushao.online", external: false },
        { label: "微信", href: "weixin://", external: false },
      ],
      footer_built: "React · TypeScript · Vite · Vercel 构建",
      footer_source: "查看源码 ↗",
    },
    stack: {
      index: "技术栈",
      headline: "我构建所用的",
      headline_em: "技术星座图",
      graph_hint: "点击节点查看深度 — 拖拽探索",
      categories: [
        { label: "前端", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "shadcn/ui"] },
        { label: "后端", items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API"] },
        { label: "基础设施", items: ["Docker Compose", "Nginx", "Vercel", "Railway", "GitHub Actions", "SSL/TLS"] },
        { label: "数据 & CMS", items: ["PostgreSQL", "Supabase", "MySQL", "Sanity CMS", "GROQ 查询"] },
        { label: "自动化", items: ["n8n 工作流", "Webhook 集成", "定时任务", "API 同步"] },
      ],
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
      services: "サービス",
      process: "プロセス",
      about: "について",
      contact: "連絡",
      available: "案件受付中",
    },
    hero: {
      badge: "フルスタックエンジニア · 越境EC専門家",
      headline1: "あなたのブランドには",
      headline2: "本当に売れる",
      headline3: "ウェブサイトが必要です。",
      sub: "越境ECブランド、個人セラー、グローバルビジネス向けに高性能なウェブサイトとデジタルシステムを構築します。",
      cta_primary: "サービスを見る",
      cta_secondary: "技術スタックを見る",
      stat1_num: "6+", stat1_label: "稼働中プロジェクト",
      stat2_num: "5", stat2_label: "技術ドメイン",
      stat3_num: "3", stat3_label: "対応言語",
      stat4_num: "24h", stat4_label: "返信時間",
      // legacy
      index: "01 — アイデンティティ",
      roles: ["フルスタックエンジニア", "越境EC専門家", "自動化ビルダー", "ブランドWebコンサルタント"],
      description: "越境ブランド向けに高性能なウェブサイトとデジタルシステムを構築します。",
      stats: [
        { value: "6+", label: "稼働中プロジェクト" },
        { value: "5", label: "技術ドメイン" },
        { value: "24h", label: "返信時間" },
      ],
      cta_stack: "技術スタックを見る →",
      cta_github: "GitHub ↗",
      scroll: "スクロール",
      graph_hint: "インタラクティブな技術グラフは下に ↓",
    },
    services: {
      index: "01 — 提供サービス",
      headline: "グローバルに売る",
      headline_em: "ブランドのためのサービス",
      sub: "すべての案件はスコープが明確で、価格は透明、完全なドキュメントで納品します。",
      items: [
        {
          id: "brand-site",
          tag: "人気No.1",
          title: "ブランドサイト",
          desc: "カスタムデザインの高性能ブランドサイト。あなたのストーリーを伝え、訪問者を購入者に変えます。",
          price: "¥8,000〜",
          priceNote: "一括プロジェクト料金",
          features: [
            "完全カスタムデザイン",
            "モバイルファースト、2秒以内読み込み",
            "SEO対応構造",
            "CMS自己編集機能",
            "3回の修正",
            "リリース後1ヶ月サポート",
          ],
          cta: "見積もりを取る",
          featured: false,
        },
        {
          id: "ecom-store",
          tag: "最高コスパ",
          title: "ECストア",
          desc: "商品管理、決済連携、コンバージョン最適化されたチェックアウトを備えたフル機能ECストア。",
          price: "¥15,000〜",
          priceNote: "一括プロジェクト料金",
          features: [
            "Shopify / WooCommerce / カスタム",
            "多通貨・多言語対応",
            "決済ゲートウェイ連携",
            "在庫・注文管理",
            "分析ダッシュボード",
            "リリース後3ヶ月サポート",
          ],
          cta: "見積もりを取る",
          featured: true,
        },
        {
          id: "automation",
          tag: "時間節約",
          title: "ワークフロー自動化",
          desc: "ツールを連携し、繰り返し作業を自動化。注文同期、在庫更新、顧客通知など。",
          price: "¥5,000〜",
          priceNote: "自動化プロジェクトごと",
          features: [
            "n8n / Zapier / カスタムスクリプト",
            "API連携（Shopify、WooCommerce、ERP）",
            "スケジュール・Webhookトリガー",
            "エラー監視・アラート",
            "完全ドキュメント",
            "継続メンテナンス可能",
          ],
          cta: "見積もりを取る",
          featured: false,
        },
        {
          id: "consulting",
          tag: "戦略的",
          title: "技術コンサルティング",
          desc: "アーキテクチャレビュー、技術スタック選定、または既存インフラの一回限りの監査。",
          price: "¥800 / 時間",
          priceNote: "最低2時間",
          features: [
            "技術スタック監査・推奨",
            "パフォーマンス・SEOレビュー",
            "セキュリティ評価",
            "移行計画",
            "書面レポート納品",
            "フォローアップQ&A含む",
          ],
          cta: "通話を予約する",
          featured: false,
        },
      ],
      note: "価格はCNY表示。USD / HKD対応可能。カスタムスコープ歓迎。",
    },
    capabilities: {
      index: "02 — 技術的深度",
      headline: "フルスタック、",
      headline_em: "エンドツーエンド",
      sub: "ノーコードの組み合わせではありません。ピクセルからサーバーまで、すべてプロダクションレベルのコードで構築します。",
      categories: [
        { label: "フロントエンド", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "shadcn/ui"] },
        { label: "バックエンド", items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API"] },
        { label: "EC", items: ["Shopify Liquid", "WooCommerce", "カスタムチェックアウト", "決済ゲートウェイ", "多通貨", "商品フィード"] },
        { label: "インフラ", items: ["Docker Compose", "Nginx", "Vercel", "Railway", "GitHub Actions", "SSL/TLS"] },
        { label: "データ & CMS", items: ["PostgreSQL", "Supabase", "MySQL", "Sanity CMS", "GROQ クエリ"] },
        { label: "自動化", items: ["n8n ワークフロー", "Webhook連携", "スケジュールパイプライン", "API同期"] },
      ],
    },
    process: {
      index: "03 — 一緒に進める方法",
      headline: "ブリーフから",
      headline_em: "リリースまで4ステップ",
      sub: "明確で予測可能なプロセス。常に現状と次のステップを把握できます。",
      steps: [
        { step: "01", title: "ディスカバリーコール", desc: "30分の通話でブランド、目標、スケジュールを把握します。" },
        { step: "02", title: "提案 & スコープ", desc: "固定価格、成果物、スケジュールを含む書面提案。時間単位の請求はありません。" },
        { step: "03", title: "構築 & レビュー", desc: "スプリントで構築し、定期的にチェックイン。各マイルストーンで確認してから進めます。" },
        { step: "04", title: "リリース & 引き渡し", desc: "完全なデプロイ、ドキュメント、チームがサイトを独自に管理できるウォークスルー。" },
      ],
      workflow_label: "開発ワークフロー",
      adr_label: "アーキテクチャ決定",
      workflow: [
        { step: "01", title: "ディスカバリーコール", desc: "ブランド、目標、スケジュールを把握。" },
        { step: "02", title: "提案 & スコープ", desc: "固定価格と成果物を含む書面提案。" },
        { step: "03", title: "構築 & レビュー", desc: "スプリント構築とマイルストーンレビュー。" },
        { step: "04", title: "リリース & 引き渡し", desc: "完全なデプロイとチームウォークスルー。" },
      ],
      decisions: [],
    },
    trust: {
      index: "04 — 選ばれる理由",
      headline: "透明性と",
      headline_em: "クラフトマンシップ",
      items: [
        { icon: "🔒", title: "固定価格プロジェクト", desc: "時間単位の請求なし。事前に書面で見積もり提示。表示価格が支払い価格です。" },
        { icon: "📦", title: "完全なコード所有権", desc: "すべてのコードはあなたのもの。自分のアカウントでホスト。ロックインなし。" },
        { icon: "🌐", title: "多言語ネイティブ対応", desc: "初日からi18n対応。中国語、英語、日本語。顧客が親しみを感じるサイト。" },
        { icon: "⚡", title: "パフォーマンスファースト", desc: "2秒以内読み込み、Lighthouse 90+、CDN配信。速いサイトはより売れます。" },
        { icon: "🤝", title: "長期パートナーシップ", desc: "一回限りのベンダーではありません。継続的なメンテナンスと成長サポートを提供。" },
        { icon: "📊", title: "データドリブンな意思決定", desc: "リリース時から分析を統合。サイトのパフォーマンスを正確に把握できます。" },
      ],
      faq_label: "よくある質問",
      faqs: [
        { q: "プロジェクトにはどのくらいかかりますか？", a: "ブランドサイトは通常2〜3週間。ECストアは3〜5週間。複雑なカスタムビルドは個別にスコープします。" },
        { q: "コンテンツは自分で用意する必要がありますか？", a: "はい。ブランドアセット（ロゴ、商品画像、コピー）をご提供ください。構造のアドバイスと追加料金でコピーライティングも対応可能です。" },
        { q: "既存のShopify/WordPressサイトに対応できますか？", a: "もちろんです。ゼロから始めることなく、既存ストアのリデザイン、拡張、最適化が可能です。" },
        { q: "リリース後に変更が必要な場合は？", a: "すべてのプロジェクトに1〜3ヶ月のリリース後サポートが含まれます。その後は月額¥1,500〜のメンテナンス契約が利用可能です。" },
        { q: "海外クライアントとも仕事できますか？", a: "はい。中国、香港、東南アジア、グローバルのクライアントと仕事しています。中国語・英語でのコミュニケーション対応。" },
      ],
    },
    about: {
      index: "05 — 私たちについて",
      headline: "あなたのブランドストアを支える",
      headline_em: "実行チーム",
      bio1: "私たちはBob Qiushaoが率いる越境EC特化の実行チームです。ブランドコンテンツプラットフォームからフルECシステムまで、エージェンシーが60日以上かかるプロジェクトを10日で納品します。",
      bio2: "私たちのクライアントは、3ヶ月待ちの外注ではなく、迅速で信頼できる技術パートナーを必要とするブランド創業者や運営者です。あなたのROIを、納期と同じくらい大切にしています。",
      orbit_label: "スキルオービット — コアから周辺へ",
      values: [
        { label: "コンバージョン重視", desc: "美しくても売れないサイトは高価な装飾品。すべてのデザイン決定はビジネス成果に結びついています。" },
        { label: "自動化優先", desc: "タスクが2回以上実行されるなら自動化すべき。チームの時間は貴重です。" },
        { label: "完全な所有権", desc: "セルフホストインフラ、オープンソースツール、あなたのアカウント。すべてを所有します。" },
        { label: "明確なコミュニケーション", desc: "専門用語なし。定期的な更新。プロジェクトの状況を常に把握できます。" },
      ],
    },
    contact: {
      index: "06 — お問い合わせ",
      headline: "次のプロジェクトを",
      headline_em: "一緒に作りましょう",
      description: "プロジェクトについて教えてください。24時間以内に初期提案とコスト見積もりをお伝えします。",
      form_name: "お名前",
      form_email: "メールアドレス",
      form_budget: "プロジェクト予算",
      form_message: "プロジェクトについて",
      form_submit: "メッセージを送る →",
      form_success: "送信しました！24時間以内にチームから返信します。",
      form_name_ph: "山田 太郎",
      form_email_ph: "yamada@yourbrand.com",
      form_message_ph: "越境ストアのブランドサイトを作りたいと思っています...",
      budget_options: ["¥5,000未満", "¥5,000〜¥15,000", "¥15,000〜¥30,000", "¥30,000以上", "未定"],
      cta: "contact@bobqiushao.online",
      wechat: "19063709709",
      wechat_label: "WeChat / 電話",
      links: [
        { label: "メール", href: "mailto:contact@bobqiushao.online", external: false },
        { label: "WeChat", href: "weixin://", external: false },
      ],
      footer_built: "React · TypeScript · Vite · Vercel で構築",
      footer_source: "ソースを見る ↗",
    },
    stack: {
      index: "技術スタック",
      headline: "私が使う",
      headline_em: "技術のコンステレーション",
      graph_hint: "ノードをクリックして深度を確認 — ドラッグして探索",
      categories: [
        { label: "フロントエンド", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "shadcn/ui"] },
        { label: "バックエンド", items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API"] },
        { label: "インフラ", items: ["Docker Compose", "Nginx", "Vercel", "Railway", "GitHub Actions", "SSL/TLS"] },
        { label: "データ & CMS", items: ["PostgreSQL", "Supabase", "MySQL", "Sanity CMS", "GROQ クエリ"] },
        { label: "自動化", items: ["n8n ワークフロー", "Webhook連携", "スケジュールパイプライン", "API同期"] },
      ],
    },
    graph: {
      react:      "本番グレードのSPAアーキテクチャ、カスタムフック、コンテキスト、パフォーマンス最適化",
      typescript: "ストリクトモード、ジェネリクス、ユーティリティ型、宣言ファイル",
      vite:       "カスタムプラグイン、SSR設定、ビルド最適化",
      tailwind:   "デザイントークン、カスタムテーマ、v4 OKLCHパレット",
      framer:     "ジェスチャーアニメーション、レイアウトトランジション、スクロール駆動エフェクト",
      python:     "FastAPIサービス、データパイプライン、自動化スクリプト",
      fastapi:    "REST + 非同期エンドポイント、Pydanticバリデーション、JWT認証",
      nodejs:     "Express API、サーバーレス関数、CLIツール",
      php:        "WordPressカスタムプラグイン、REST API拡張",
      docker:     "マルチサービスComposeスタック、カスタムイメージ、ネットワーク設定",
      vercel:     "エッジ関数、CI/CDパイプライン、ドメイン管理",
      nginx:      "リバースプロキシ、SSL終端、ロードバランシング設定",
      github:     "CI/CDワークフロー、自動テスト、デプロイパイプライン",
      n8n:        "300+ノードワークフロー、Webhook統合、スケジュール自動化",
      sanity:     "カスタムスキーマ、GROQクエリ、リアルタイムコンテンツ同期",
      supabase:   "PostgreSQL、行レベルセキュリティ、リアルタイムサブスクリプション",
      postgresql: "スキーマ設計、インデックス、クエリ最適化",
    },
  },
};
