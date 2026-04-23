# Project: portfolio-site (bobqiushao.online 主门户)

> 本文件是给 Cursor / Claude Code 的工作约定文件，**任何代码变更前必须先读本文件**。
> 完整的战略背景和决策依据见 `docs/` 目录。

---

## 项目类型

- [x] 主门户 (bobqiushao.online)

## 技术栈

React 18 + TypeScript + Vite + Tailwind CSS + Wouter（路由）+ i18n（zh/en/ja 三语言）

## 关键链接

| 文档 | 路径 |
|---|---|
| 项目宪章（世界观） | `docs/00-charter/CHARTER.md` |
| ADR 索引 | `docs/02-adr/README.md` |
| RUNBOOK 索引 | `docs/03-runbook/README.md` |
| 主门户信息架构 | `docs/04-portfolio-system/主门户信息架构.md` |
| CI/CD 方案 | `docs/06-ci-cd/CI-CD完整方案.md` |
| Manus 验收清单 | `docs/07-prompts/manus/Manus验收清单.md` |

---

## 给 Cursor / Claude Code 的工作约定

### 1. 先读再写

任何代码变更前，先读：
- 本文件（CLAUDE.md）
- `docs/00-charter/CHARTER.md`（世界观，5 分钟）
- 与任务相关的 ADR（`docs/02-adr/` 目录）
- 与任务相关的 RUNBOOK（`docs/03-runbook/` 目录）

### 2. 核心禁令（来自 Charter + ADR）

以下 5 件事**永远不能做**，违反即打回：

| 禁令 | 来源 ADR |
|---|---|
| 自创产品名包装 Bob 的能力（如 Auraloop X / Bob OS Y） | ADR-0002 / ADR-0003 |
| 限制能力库在 4 类（能力库是开放的） | ADR-0002 |
| 重做已有资产（6 案例 / Auraloop / 1688 渠道 / Cursor 工作流） | ADR-0004 |
| 直接对客户说话（AI 永远不替 Bob 与真实客户沟通） | ADR-0034 |
| 跳过 ADR / RUNBOOK / 验收清单直接交付 | ADR-0030 / ADR-0031 |

### 3. 分支规范（来自 ADR-0033）

直接在 `main` 上写代码 = **禁止**。

```
main          ← 生产环境，禁止直接 push
feature/*     ← 新功能开发
fix/*         ← Bug 修复
hotfix/*      ← 紧急生产修复
docs/*        ← 文档更新
```

所有合并必须经过 PR，PR 描述必须包含：做什么 / 为什么 / 如何测试。

### 4. Commit 规范（Conventional Commits）

```
feat: 新功能
fix: Bug 修复
docs: 文档更新
refactor: 重构（无功能变化）
style: 样式调整
chore: 构建/工具变更
```

### 5. 三语言同步规范

所有面向用户的文案变更，必须同步更新 `client/src/i18n/translations.ts` 中的 zh / en / ja 三个语言版本。

### 6. 价格与时长规范（来自 ADR-0010）

当前已确定的价格体系，**不得随意修改**：

| 档位 | 价格 | 交付时长 |
|---|---|---|
| 基础 | ¥8,800 起 | 10 天起 |
| 推荐 | ¥22,800 起 | 28 天起 |
| 高端 | ¥58,000 起 | 60 天起 |
| 月度运维 | ¥1,980/月起 | 持续 |

如需修改价格，必须先起草新 ADR（Proposed 状态），经 Bob 审阅后方可执行。

### 7. 案例标注规范（来自 ADR-0040）

所有案例必须按类型标注，**绝对禁止**使用顶级品牌真实 Logo / 商标：

| 类型 | 标注格式 |
|---|---|
| 实战运营 | `Live · YYYY-Present` |
| 自创概念 | `Concept · Inspired by [style]` |
| 行业 Demo | `Demo · Industry Showcase` |

### 8. 凭据安全规范（来自 ADR-0041）

- 客户凭据 / API Key **绝不写入 Git**
- 必须使用 GitHub Secrets / Vercel Env Variables
- `.env` 文件已在 `.gitignore` 中，不得移除

### 9. 性能基线（来自 ADR-0026）

| 指标 | 目标值 |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| Lighthouse Performance | > 85 |

### 10. CDN 白名单

只能从以下域名加载第三方资源：
- `cdnjs.cloudflare.com`
- `cdn.jsdelivr.net`
- `fonts.googleapis.com` / `fonts.gstatic.com`（字体专用）

---

## 项目专用约定

### 这个项目的核心定位

bobqiushao.online 是 **Bob 个人能力的总展示中心**，不是某个产品的销售页。
当前面向跨境电商客群，未来通过子域名前缀扩展到其他客群。

### 设计风格

- 风格：深色 Editorial，Geometric Silence 设计哲学
- 字体：Fraunces（标题）+ Manrope（正文）
- 色调：深色背景 + 高对比度文字 + 克制的强调色
- 动效：克制、有意义，必须加 `prefers-reduced-motion` 保护

### 关键文件

| 文件 | 说明 |
|---|---|
| `client/src/i18n/translations.ts` | 三语言文案，所有文案变更必须同步 |
| `client/src/components/ServicesSection.tsx` | 价格区，变更需参考 ADR-0010 |
| `client/src/components/CasesSection.tsx` | 案例区，变更需参考 ADR-0040 |
| `client/src/components/CapabilitiesSection.tsx` | 能力区，变更需参考 ADR-0002 |
| `client/src/components/ROISection.tsx` | ROI 计算器，锚定物见 ADR-0012 |
| `client/public/jewelry-cases/` | 珠宝/手表案例静态 HTML |

---

## Claude Code 自检清单

每次完成代码任务前，内心走一遍：

- [ ] 我读过 CLAUDE.md 了吗？
- [ ] 我读过相关 ADR 了吗？
- [ ] 我遵守了 5 条核心禁令吗？
- [ ] 我创建了 feature 分支吗？
- [ ] 我的提交信息是 Conventional Commits 吗？
- [ ] 三语言文案是否同步更新了？
- [ ] 我有没有不小心暴露凭据？
- [ ] Lighthouse Performance 是否仍 > 85？

通过自检后再提交 PR。

---

## 相关文档

- 完整 ADR 体系：`docs/02-adr/`
- 操作手册：`docs/03-runbook/`
- 能力库：`docs/05-capability-library/`
- CI/CD 方案：`docs/06-ci-cd/CI-CD完整方案.md`
- AI 提示词：`docs/07-prompts/`
