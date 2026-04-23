# ADR-0022: Headless WC + WP 作为电商技术基线

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Technical
**关联 ADR:** ADR-0003 (上游) / ADR-0025 (下游) / ADR-0026 (关联)

---

## 背景（Context）

跨境电商客户需要一个既有 Shopify 级别体验、又能数据自有、成本可控的技术方案。
Bob 已在 Auraloop 项目中实战验证了 Headless WordPress + WooCommerce 架构的可行性。
需要将其标准化为所有电商类客户项目的默认技术栈。

## 决策（Decision）

所有电商类客户项目，默认使用 **Headless WordPress + WooCommerce** 架构。

**技术栈：**

| 层级 | 技术选型 | 说明 |
|---|---|---|
| 后端 CMS | WordPress + WooCommerce | 内容管理 + 电商后台 |
| API 层 | WC REST API / WPGraphQL | 数据接口 |
| 前端框架 | Next.js + Tailwind + Framer Motion | 高性能 + 高审美 |
| 认证 | Google OAuth + Supabase | 详见 ADR-0024 |
| 部署：后端 | Hostinger | 客户可自行管理 |
| 部署：前端 | Vercel | 全球 CDN，30 秒上线 |
| CDN | Cloudflare | 全局加速 + DDoS 防护 |

## 备选方案（Alternatives Considered）

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| Shopify | 生态完善，易用 | 平台抽成，数据不自有，定制受限 | 客户数据主权 |
| 纯 Next.js + Stripe | 极度灵活 | 开发成本高，无现成后台 | 超出单人维护能力 |
| Headless WP + WC（本方案） | 已验证，数据自有，零平台抽成 | 需要维护 WP 后端 | 已接受 |

## 后果（Consequences）

### 正面
- 客户数据完全自有，无平台抽成
- Bob 已有完整的实战经验（Auraloop 样板）
- 前端完全定制，审美无上限
- 可复用模板，降低每次项目的开发成本

### 负面 / 已知风险
- WordPress 维护成本（安全更新、插件兼容）
- 相比 Shopify，客户自运营学习曲线稍高
- 需要 Bob 维护 Auraloop Sync 工具

### 触发重新评估的条件
- 当出现更好的 Headless CMS 方案时（如 Payload CMS 成熟）
- 当 WordPress 生态出现重大安全问题时

## 实施清单（Implementation）

- [x] Auraloop 项目已完整验证此架构
- [x] RUNBOOK-10 包含此架构的部署流程
- [ ] 提取 Auraloop 前端为可复用模板
- [ ] 建立 WordPress 后端标准配置清单
