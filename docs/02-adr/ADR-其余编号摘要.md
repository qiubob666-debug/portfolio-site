# 其余 ADR 摘要(按编号合并)
## 全部为 Accepted 状态 · 2026-04-23

> 完整 ADR 文件可由 Manus 在执行 P1 任务时按模板逐一展开。
> 本文档作为索引摘要,确保关键决策不遗漏。

---

## ADR-0004: 长期主义优先于短期成交
**层级:** Strategic

**决策:** 任何"快速成交 vs 可复用资产"的二选一,默认选可复用资产。

**触发例外:** 现金流告急(账上 < 3 个月生活费)时,可短期切换为成交优先。

**实施:** 所有 P0/P1 任务的设计标准都包含"是否产出可复用资产"。

---

## ADR-0010: 定价分层结构
**层级:** Commercial · 完整版另立独立文档

**决策:**
| 档位 | 价格 | 适用 |
|---|---|---|
| 基础 | ¥8,800 起 | 单一能力交付(如展示站) |
| 推荐 | ¥22,800 起 | 能力组合(如电商 + Auth) |
| 高端 | ¥58,000 起 | 矩阵 / 多门户 / 完整方案 |
| 月度运维 | ¥1,980/月起 | 持续服务订阅 |
| 年度增长包 | ¥28,800/年起 | 含内容工厂 |
| 能力加购 | ¥9,800 起 | 单项能力(如 Auth) |

**触发重新评估:** 第 5 个客户成交后根据真实数据校准。

---

## ADR-0012: 锚定物从假对比改为真竞争对手
**层级:** Commercial

**决策:** 销售文案中的对比锚不再使用"自建团队 ¥79 万",改为对比真实市场对手:
- 瑞诺/三行外贸建站:¥30,000-80,000/年
- Shopify+插件+开发:¥25,000-40,000/年
- 普通接单个人:¥3,000-8,000

**理由:** 真实对手对比可验证、可信、不被买家挑战。

---

## ADR-0013: 月度运维订阅作为现金流核心
**层级:** Commercial

**决策:** 把月度运维 ¥1,980/月起作为核心现金流入口,而非附加产品。

**理由:**
- 单次建站是一锤子买卖,运维订阅是持续复利
- 30 个运维客户 × ¥1,980 = ¥59,400/月 稳定收入
- 客户粘性极高,几乎不流失

**实施:** 所有主产品销售时主动提及运维,并提供首月折扣激励。

---

## ADR-0020: 主域名策略
**层级:** Technical

**决策:**
- 主域名继续使用 **bobqiushao.online**(已有积累,不换)
- 子域名按客群/案例/能力命名
- 客户域名由客户自行购买,Bob 协助挂载

**未来可选:** 当个人品牌发展到一定阶段,可购买 1-2 个短域名作为辅助(如 bob.work / qiushao.io),但不强求。

---

## ADR-0022: Headless WC + WP 作为电商技术基线
**层级:** Technical

**决策:** 所有电商类客户项目,默认使用 Headless WordPress + WooCommerce 架构。

**实施栈:**
- 后端:WordPress + WooCommerce + 必要插件
- 前端:Next.js + Tailwind + Framer Motion
- API:WC REST API / GraphQL via WPGraphQL
- 部署:后端 Hostinger,前端 Vercel
- CDN:Cloudflare 全局

**理由:** 已在 Auraloop 实战验证,零成本平替 Shopify,客户拥有数据。

---

## ADR-0023: n8n + Sanity 作为内容工厂技术栈
**层级:** Technical

**决策:** 所有需要持续内容生产的客户项目,默认使用 n8n 工作流 + Sanity CMS。

**实施流程:**
- Sanity 作为内容真相源(结构化、版本化、多语言)
- n8n 编排:AI 生成 → 人工审 → 自动发布到多平台
- 目标平台:WordPress / 社媒 / 邮件 / RSS / Sitemap

**理由:** 已在 Auraloop 实战验证,自动化程度最高。

---

## ADR-0024: Google OAuth + Supabase 作为认证社区基线
**层级:** Technical

**决策:** 所有需要用户体系的项目,默认使用 Google OAuth(主) + Apple Sign In(辅) + Supabase(用户数据库)。

**理由:**
- Bob 已熟练 Google Cloud Console 配置
- Supabase 提供 Auth + DB + Realtime + Storage 一体化
- 海外用户极喜欢 Google 一键登录,提升 30%+ 注册转化

---

## ADR-0025: Auraloop Sync 作为 HTML→PHP 同步基础
**层级:** Technical

**决策:** 静态 HTML 设计 → WordPress 主题 PHP 文件,统一通过 Bob 自建的 Auraloop Sync 工具同步。

**特性:**
- 单向同步(HTML→PHP),不会被数据库内容覆盖
- 自动插入 WP 钩子(wp_head / wp_body_open / wp_footer)
- 自动生成对应的 PHP 模板片段

---

## ADR-0026: CDN 与性能优化基线
**层级:** Technical

**决策:**
- 默认 CDN:Cloudflare(免费版即可,绝大多数客户)
- 高流量项目:升级到 Vercel Edge Network 或 Cloudflare Pro
- 必备优化:WebP 图片 / 字体子集 / Critical CSS / Lazy loading
- 性能目标:LCP < 2.5s / CLS < 0.1 / Lighthouse Performance > 85

---

## ADR-0030: ADR 体系本身的规范
**层级:** Engineering Culture

**决策:**
- 所有 ADR 放在 `02-adr/` 目录
- 命名:`ADR-XXXX-{kebab-case-title}.md`
- 编号永不复用
- 状态:Proposed → Accepted → (Deprecated | Superseded)
- AI 不能直接修改已 Accepted 的 ADR,只能新建 supersede

---

## ADR-0031: RUNBOOK 体系规范
**层级:** Engineering Culture

**决策:**
- 任何手动操作 3 次以上,**必须**沉淀 RUNBOOK
- RUNBOOK 放在 `03-runbook/` 目录
- 命名:`RUNBOOK-{action}.md`
- 必须包含:前置条件 / 步骤 / 预期产出 / 失败处理 / 回滚

---

## ADR-0032: CI/CD 部署策略
**层级:** Engineering Culture · 完整版见 `06-ci-cd/`

**决策:**
- 个人门户 / 案例 / 落地页 → Vercel 自动部署(git push 触发)
- 客户 WordPress 站 → GitHub Actions → Hostinger SFTP
- 模板/库 → Release tag 触发
- 全部接入飞书部署通知

---

## ADR-0033: Git Flow 与分支策略
**层级:** Engineering Culture

**决策:** 采用简化版 GitHub Flow:
- `main` = 生产
- `staging` = 预发(可选,大型项目用)
- `feature/*` = 开发
- `hotfix/*` = 紧急修复

**强制规则:**
- 直接 push main 禁止
- 必须经过 PR
- PR 必须有描述(做什么 / 为什么 / 如何测)

---

## ADR-0034: AI Agent 协作边界与职责
**层级:** Engineering Culture · 完整版见 `07-prompts/`

**决策:**
| Agent | 角色 | 主导场景 |
|---|---|---|
| Claude (本对话) | 战略对话伙伴 | 战略/方法论讨论、ADR 起草 |
| Manus | 工程执行官 | P0/P1 任务的落地 |
| Cursor + Claude Code | 编码主力 | 实际代码实现 |
| n8n + Claude API | 内容工厂 | 自动化内容生产 |
| Bob 本人 | 终极决策者 | 所有 Accept / 客户沟通 |

**铁律:** AI 不直接对客户。

---

## ADR-0036: 复利资产 5 层模型
**层级:** Engineering Culture

**决策:** 把所有资产组织为 5 层,每一层的产出反哺上层。

```
Layer 5: 客户实战 (CASE)
Layer 4: 落地页 (LANDING)
Layer 3: 能力库 (CAPABILITY)
Layer 2: 工程基础 (FOUNDATION)
Layer 1: 学习吸收 (INPUT)
```

每完成一个上层任务,**自动**产生下层资产。

---

## ADR-0040: 案例展示的标注规范
**层级:** Legal & Compliance

**决策:**
| 类型 | 标注 | 命名规则 |
|---|---|---|
| 实战运营 | "Live · YYYY-Present" | 真实项目名 |
| 自创概念 | "Concept · Inspired by [style]" | 不用品牌真名 |
| 行业 Demo | "Demo · Industry Showcase" | 假想名 |
| 真实客户 | (征同意后)直接展示 | 客户真名 |

**绝对禁止:** 在客户可见处使用顶级品牌真实 Logo / 商标。

---

## ADR-0041: 客户数据与凭据保护规范
**层级:** Legal & Compliance

**决策:**
- 客户域名 / Hosting / 数据库凭据,绝不写入 Git
- 必须使用 GitHub Secrets / Vercel Env Variables
- 客户提供凭据时,通过 1Password / Bitwarden 等密码管理器接收
- AI Agent 处理客户凭据时,**全程禁止打印明文**
- 项目结束后,客户可申请凭据销毁
