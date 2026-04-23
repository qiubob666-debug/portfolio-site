# ADR · Architecture Decision Records
## 架构决策记录 · Bob Qiushao Operating System

---

## 什么是 ADR

**ADR 是"为什么这样选"的考古学。**

每个 ADR 是一份简短文档,记录:
- 当时面临什么决策?
- 选了什么?
- 为什么没选其他?
- 后果是什么?
- 什么条件下需要重新审视?

---

## 为什么 Bob 必须建 ADR

Bob 的工作模式 = 独立工作者 + 多 AI Agent(Claude / Manus / Cursor / 未来的)。

**这种模式的致命弱点:** AI 没有持续记忆,Bob 会忘,新合作者完全没有上下文。

ADR 就是解决方案:
- 让所有 Agent 都读同一份"决策真相源"
- 让 Bob 半年后翻得到"我当时为什么选 Vercel 不选 Cloudflare Pages"
- 让一年后回头时知道"哪些决策已被时间证伪,需要 supersede"

**ADR 是长期主义在工程文化层面的体现。**

---

## ADR 索引

### 战略层(Strategic)
| 编号 | 标题 | 状态 | 日期 |
|---|---|---|---|
| 0001 | 个人门户作为一切方案的展示中心 | Accepted | 2026-04-23 |
| 0002 | 能力库开放架构(不限制产品名) | Accepted | 2026-04-23 |
| 0003 | Auraloop 作为实战样板而非产品包装 | Accepted | 2026-04-23 |
| 0004 | 长期主义优先于短期成交 | Accepted | 2026-04-23 |

### 商业层(Commercial)
| 编号 | 标题 | 状态 | 日期 |
|---|---|---|---|
| 0010 | 定价分层结构(¥8.8k/¥22.8k/¥58k+订阅) | Accepted | 2026-04-23 |
| 0011 | 客群分层与对应落地页策略 | Accepted | 2026-04-23 |
| 0012 | 锚定物从假对比改为真竞争对手 | Accepted | 2026-04-23 |
| 0013 | 月度运维订阅作为现金流核心 | Accepted | 2026-04-23 |

### 技术层(Technical)
| 编号 | 标题 | 状态 | 日期 |
|---|---|---|---|
| 0020 | 主域名策略(bobqiushao.online + 子域名前缀) | Accepted | 2026-04-23 |
| 0021 | Vercel 多前缀域名挂载方案 | Accepted | 2026-04-23 |
| 0022 | Headless WC+WP 作为电商技术基线 | Accepted | 2026-04-23 |
| 0023 | n8n + Sanity 作为内容工厂技术栈 | Accepted | 2026-04-23 |
| 0024 | Google OAuth + Supabase 作为认证社区基线 | Accepted | 2026-04-23 |
| 0025 | Auraloop Sync 作为 HTML→PHP 同步基础 | Accepted | 2026-04-23 |
| 0026 | CDN 与性能优化基线(Cloudflare/Vercel) | Accepted | 2026-04-23 |

### 工程文化层(Engineering Culture)
| 编号 | 标题 | 状态 | 日期 |
|---|---|---|---|
| 0030 | ADR 体系本身的规范 | Accepted | 2026-04-23 |
| 0031 | RUNBOOK 体系规范 | Accepted | 2026-04-23 |
| 0032 | CI/CD 部署策略 | Accepted | 2026-04-23 |
| 0033 | Git Flow 与分支策略 | Accepted | 2026-04-23 |
| 0034 | AI Agent 协作边界与职责 | Accepted | 2026-04-23 |
| 0035 | 学习吸收的标准化流程(Inspiration→Distill→Remix) | Accepted | 2026-04-23 |
| 0036 | 复利资产 5 层模型 | Accepted | 2026-04-23 |

### 法律 / 合规层(Legal & Compliance)
| 编号 | 标题 | 状态 | 日期 |
|---|---|---|---|
| 0040 | 案例展示的标注规范(Concept/Demo/Live) | Accepted | 2026-04-23 |
| 0041 | 客户数据与凭据的保护规范 | Accepted | 2026-04-23 |

---

## ADR 模板

每个新 ADR 必须使用以下模板:

```markdown
# ADR-XXXX: [简短标题]

**日期:** YYYY-MM-DD
**状态:** Proposed | Accepted | Deprecated | Superseded by ADR-YYYY
**决策者:** Bob Qiushao
**层级:** Strategic | Commercial | Technical | Engineering Culture | Legal
**关联 ADR:** ADR-XXXX (上游) / ADR-XXXX (下游)

---

## 背景(Context)

[当时的真实情况是什么?有什么外部约束或触发事件?]

## 决策(Decision)

[一两句话清楚说出选了什么。]

## 备选方案(Alternatives Considered)

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| A | ... | ... | ... |
| B | ... | ... | ... |

## 后果(Consequences)

### 正面
- ...

### 负面 / 已知风险
- ...

### 触发重新评估的条件
- 当 X 发生时
- 当 Y 数据超过 Z 时
- 每年 1 月份强制审视

## 实施清单(Implementation)

- [ ] 具体行动 1
- [ ] 具体行动 2
```

---

## ADR 修改规则

1. **已 Accepted 的 ADR 不可被修改**,只能被新 ADR Supersede
2. 新 ADR 在头部明确写 `Supersedes ADR-XXXX`
3. 旧 ADR 状态改为 `Superseded by ADR-YYYY`
4. 修改 ADR 索引表

---

## 给 AI Agent 的 ADR 操作命令

### 读取
- 任何任务开始前,读 `02-adr/` 下所有相关 ADR
- 任务执行中遇到决策点,先查 ADR

### 创建
- 发现新决策需要记录时,**起草 ADR 草稿**
- 草稿状态写 `Proposed`
- 提交给 Bob 审阅,Bob 改为 `Accepted` 才生效

### 修改
- AI **不能直接修改已 Accepted 的 ADR**
- 只能起草新 ADR 来 Supersede

### 删除
- ADR **永远不删除**(即使过时)
- 历史是资产,不是负担
