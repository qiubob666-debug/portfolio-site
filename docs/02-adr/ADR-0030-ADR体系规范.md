# ADR-0030: ADR 体系本身的规范

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Engineering Culture
**关联 ADR:** ADR-0031 (关联) / ADR-0034 (关联)

---

## 背景（Context）

Bob 的工作模式（独立工作者 + 多 AI Agent）的致命弱点是：AI 没有持续记忆，Bob 会忘，新合作者完全没有上下文。
需要一套标准化的 ADR 体系，让所有决策有据可查，让所有 Agent 读同一份"决策真相源"。

## 决策（Decision）

建立并严格遵守以下 ADR 规范：

**文件规范：**
- 所有 ADR 放在 `docs/02-adr/` 目录
- 命名：`ADR-XXXX-{kebab-case-title}.md`
- 编号永不复用（即使 ADR 被废弃）
- 状态：`Proposed` → `Accepted` → (`Deprecated` | `Superseded by ADR-YYYY`)

**修改规则：**
- 已 `Accepted` 的 ADR **不可被修改**，只能被新 ADR Supersede
- 新 ADR 在头部明确写 `Supersedes ADR-XXXX`
- 旧 ADR 状态改为 `Superseded by ADR-YYYY`
- 修改 ADR 索引表

**AI Agent 操作规则：**
- 任何任务开始前，读 `docs/02-adr/` 下所有相关 ADR
- 发现新决策需要记录时，起草 ADR 草稿（状态：`Proposed`）
- 提交给 Bob 审阅，Bob 改为 `Accepted` 才生效
- AI **不能直接修改已 Accepted 的 ADR**
- ADR **永远不删除**（历史是资产）

## 后果（Consequences）

### 正面
- 所有决策有据可查，减少重复讨论
- AI Agent 有统一的"决策真相源"
- 半年后翻得到"我当时为什么这样选"

### 负面 / 已知风险
- 需要 Bob 养成写 ADR 的习惯
- ADR 数量增多后，查找成本增加（需要好的索引）

## 实施清单（Implementation）

- [x] 建立 ADR 目录结构和命名规范
- [x] 建立 ADR 模板（见 `docs/02-adr/README.md`）
- [x] 完成 25 个核心 ADR
- [ ] 建立 ADR 索引自动生成脚本
