# ADR-0033: Git Flow 与分支策略

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Engineering Culture
**关联 ADR:** ADR-0032 (关联)

---

## 背景（Context）

Bob 独立工作 + AI Agent 协作的模式下，需要一套简单但严格的 Git 分支策略。
过于复杂的 Git Flow 会增加认知负担，过于宽松则会导致生产环境意外损坏。

## 决策（Decision）

采用**简化版 GitHub Flow**：

**分支结构：**

| 分支 | 用途 | 保护规则 |
|---|---|---|
| `main` | 生产环境 | 禁止直接 push，必须经过 PR |
| `staging` | 预发环境（大型项目可选） | 可直接 push |
| `feature/*` | 新功能开发 | 无限制 |
| `fix/*` | Bug 修复 | 无限制 |
| `hotfix/*` | 紧急生产修复 | 无限制，但需快速 PR |
| `docs/*` | 文档更新 | 无限制 |

**PR 规则（强制）：**
- 直接 push `main` 禁止
- 所有合并必须经过 PR
- PR 描述必须包含：做什么 / 为什么 / 如何测试
- AI Agent 提交的 PR 必须由 Bob 审阅后合并

**Commit 规范（Conventional Commits）：**

| 类型 | 用途 | 示例 |
|---|---|---|
| `feat:` | 新功能 | `feat: add cases section` |
| `fix:` | Bug 修复 | `fix: mobile layout overflow` |
| `docs:` | 文档更新 | `docs: add ADR-0033` |
| `refactor:` | 重构（无功能变化） | `refactor: extract hero component` |
| `chore:` | 构建/工具变更 | `chore: update pnpm lockfile` |

## 后果（Consequences）

### 正面
- 生产环境受到保护，不会被意外 push 损坏
- Commit 历史清晰，便于追溯
- AI Agent 的变更有明确的审阅机制

### 负面 / 已知风险
- PR 流程增加了一定的摩擦（对个人项目来说可以接受）
- 需要 Bob 养成 PR 审阅习惯

## 实施清单（Implementation）

- [ ] 在 GitHub 仓库设置 `main` 分支保护规则
- [ ] 配置 PR 模板（`.github/pull_request_template.md`）
- [ ] 配置 Commit lint（可选，通过 husky）
