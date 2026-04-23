# Capability Library
## 能力库 · 实战于 Auraloop,可复用于任何项目

> 4 类已实战 + N 类待扩展。
> 每一类能力都有完整的"实战样板 → 复用方法 → 客户场景 → 报价范围"。

---

## 索引

### 已实战能力(4 类)

| # | 能力域 | 实战样板 | 文档 |
|---|---|---|---|
| 01 | Auth + Community + Inquiry | Auraloop | `auth-community/` |
| 02 | Brand Matrix / Multi-Portal | Auraloop | `brand-matrix/` |
| 03 | Content Factory | Auraloop | `content-factory/` |
| 04 | Frontend + CDN Performance | All Projects | `frontend-cdn/` |

### 规划中能力(开放)

| # | 能力域 | 状态 | 预计 |
|---|---|---|---|
| 05 | Selection / Sourcing System | 已有原型,待产品化 | Q3 2026 |
| 06 | BI / Data Management | 已有原型,待产品化 | Q3 2026 |
| 07 | AI Agent Orchestration | 调研中 | Q4 2026 |
| 08 | Marketing Automation | 调研中 | Q4 2026 |
| 09+ | (开放,按客户需求触发) | - | - |

---

## 每个能力域的标准文档结构

```
05-capability-library/
├── auth-community/
│   ├── README.md           # 能力概述
│   ├── tech-stack.md       # 技术栈细节
│   ├── auraloop-impl.md    # 在 Auraloop 中的实现
│   ├── reuse-guide.md      # 在新项目中如何复用
│   ├── customer-scenarios.md # 客户场景与适配
│   ├── pricing.md          # 报价模型
│   └── case-studies/       # 该能力的案例
└── ...
```

---

## 能力库的销售逻辑

**单一能力交付:** ¥8,800 起 — 适合预算有限的客户
**两项能力组合:** ¥22,800 起 — 主推
**三项以上组合:** ¥58,000 起 — 全方位方案

**销售话术示例:**
> "你需要的其实不是一个网站,是认证+社区+内容这三项能力的组合。我可以单独做认证 ¥9,800,
> 也可以三项打包 ¥58,000(节省 ¥XX),还可以加月度运维 ¥1,980/月让它持续优化。
> 你倾向哪种?"

---

## 给 Manus 的能力库构建任务

按以下顺序构建每个能力的完整文档:

### Phase 1(首要):前 4 类已实战能力

每类能力创建一个目录,目录内填充以下文件:

#### auth-community/
- README.md(参考下方模板)
- tech-stack.md(Google OAuth + Supabase 详细技术细节)
- auraloop-impl.md(在 Auraloop 中如何实现,带架构图)
- reuse-guide.md(给新项目用时的步骤清单)
- customer-scenarios.md(适合什么客户场景,不适合什么)
- pricing.md(单独售卖 ¥9,800,组合时多少)

#### brand-matrix/
同上结构

#### content-factory/
同上结构

#### frontend-cdn/
同上结构

### Phase 2(后续):每个新能力实战完成后,补充对应文档

---

## 能力 README 模板

```markdown
# Capability: {Name}

**Status:** Production-Ready · Validated in Auraloop
**First Deployed:** 2024-XX
**Last Updated:** 2026-XX

## What This Capability Does

[一段话,客户能听懂的语言]

## Tech Stack

- ...
- ...

## Customer Pain Points Solved

1. ...
2. ...
3. ...

## Best For

- 客群 A:理由
- 客群 B:理由

## Not For

- 客群 X:不适合的理由

## Pricing

- 单独交付:¥9,800 起
- 组合中包含:可降至 ¥6,000 摊销
- 月度持续维护:¥xxx/月

## Live Demo

[Auraloop link]

## Related Cases

- [Case 1](../case-studies/case1.md)
- ...
```

---

## 能力之间的组合矩阵

```
        | Auth+Comm | Matrix | Content | Frontend |
--------|-----------|--------|---------|----------|
跨境电商 |    ★★    |  ★★★ |  ★★★  |   ★★★   |
工厂B2B |    ★★    |  ★★   |  ★★★  |   ★★★   |
品牌方  |    ★★★   |  ★★★ |  ★★★  |   ★★★   |
个人/顾问|    ★    |  ★    |  ★★    |   ★★★   |
```

★ 越多代表对该客群越关键。

**销售时根据客群快速推荐能力组合:**
- 跨境 → 推 Matrix + Content + Frontend
- 工厂 → 推 Content + Frontend(+ Auth 加购)
- 品牌 → 推全套 4 项
- 个人 → 推 Frontend(+ 简化版其他)
