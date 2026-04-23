# ADR-0031: RUNBOOK 体系规范

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Engineering Culture
**关联 ADR:** ADR-0030 (关联) / ADR-0034 (关联)

---

## 背景（Context）

重复性操作（如添加子域名、部署新案例、周度学习整理）如果不沉淀为 RUNBOOK，每次都需要重新思考步骤，浪费时间且容易出错。
AI Agent 在执行操作时也需要有标准化的操作手册可以遵循。

## 决策（Decision）

**触发条件：** 任何手动操作执行 3 次以上，**必须**沉淀为 RUNBOOK。

**文件规范：**
- 所有 RUNBOOK 放在 `docs/03-runbook/` 目录
- 命名：`RUNBOOK-{NN}-{action}.md`（NN 为两位数编号）
- 每个 RUNBOOK 必须包含以下章节：
  - 前置条件（Prerequisites）
  - 步骤（Steps）
  - 预期产出（Expected Output）
  - 失败处理（Failure Handling）
  - 回滚（Rollback）

**版本管理：**
- RUNBOOK 可以直接修改（与 ADR 不同）
- 修改时在文件头部更新版本号和修改日期
- 重大变更需要在 RUNBOOK 内注明变更原因

## 后果（Consequences）

### 正面
- 重复操作标准化，减少出错概率
- AI Agent 可以直接按 RUNBOOK 执行，减少沟通成本
- 新合作者（未来助手）可以快速上手

### 负面 / 已知风险
- 需要 Bob 养成写 RUNBOOK 的习惯
- RUNBOOK 需要随工具和流程变化而更新

## 实施清单（Implementation）

- [x] 建立 RUNBOOK 目录结构和命名规范
- [x] 完成 RUNBOOK-01（添加子域名）
- [x] 完成 RUNBOOK-10（添加新案例）
- [x] 完成 RUNBOOK-30（周度学习整理）
- [ ] 完成其余 17 个 RUNBOOK（见 `docs/03-runbook/RUNBOOK-其余索引.md`）
