# ADR-0034: AI Agent 协作边界与职责

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Engineering Culture
**关联 ADR:** ADR-0030 (关联) / ADR-0031 (关联) / ADR-0041 (关联)

---

## 背景（Context）

Bob 使用多个 AI Agent（Claude / Manus / Cursor / n8n）协作完成工作。
如果没有明确的职责边界，会导致：Agent 越权操作、重复工作、决策混乱、客户数据泄露等风险。
需要一份所有 Agent 都必须遵守的协作规范。

## 决策（Decision）

**Agent 职责分工：**

| Agent | 角色 | 主导场景 | 禁止事项 |
|---|---|---|---|
| Claude（战略对话） | 思考放大器 | 战略讨论、ADR 起草、复盘决策 | 不执行代码、不操作仓库 |
| Manus（工程执行） | 工程执行官 | P0/P1 任务落地、文件操作、部署 | 不自创产品名、不跳过 ADR |
| Cursor + Claude Code（编码） | 编码主力 | 实际代码实现 | 不修改已 Accepted ADR |
| n8n + Claude API（内容工厂） | 内容自动化 | 内容生成、多平台分发 | 不直接对客户发布未审核内容 |
| Bob 本人 | 终极决策者 | 所有 Accept、客户沟通 | — |

**铁律（所有 Agent 必须遵守）：**

1. AI **不直接对客户**（所有客户沟通必须由 Bob 本人）
2. AI **不自创产品名**（如 Auraloop X / Bob OS Y）
3. AI **不跳过 ADR / RUNBOOK / 验收清单**直接交付
4. AI **不修改已 Accepted 的 ADR**（只能起草新 ADR）
5. AI **不将客户凭据写入 Git**（详见 ADR-0041）

**任务开始前必读清单：**
- `docs/00-charter/CHARTER.md`（世界观）
- `docs/02-adr/README.md`（ADR 索引）
- 与任务相关的具体 ADR

## 后果（Consequences）

### 正面
- 所有 Agent 有明确的职责边界，减少越权风险
- Bob 保持对所有决策的最终控制权
- 客户数据安全有制度保障

### 负面 / 已知风险
- Agent 需要在每次任务开始时读取大量文档
- 铁律可能在某些紧急情况下造成摩擦

## 实施清单（Implementation）

- [x] 建立 Agent 职责分工表
- [x] 建立铁律清单
- [x] 在各 Agent 提示词中嵌入此 ADR 引用
- [ ] 建立 Agent 违规记录机制（可选）
