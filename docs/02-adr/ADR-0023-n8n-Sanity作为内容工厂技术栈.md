# ADR-0023: n8n + Sanity 作为内容工厂技术栈

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Technical
**关联 ADR:** ADR-0003 (上游) / ADR-0035 (关联)

---

## 背景（Context）

内容是 SEO 和客户信任的核心资产，但手动生产内容效率极低。
Bob 需要一套可以自动化内容生产、多平台分发的工作流，同时保持内容质量的人工审核。
已在 Auraloop 项目中验证了 n8n + Sanity 的组合可行性。

## 决策（Decision）

所有需要持续内容生产的客户项目，默认使用 **n8n 工作流 + Sanity CMS**。

**工作流架构：**

```
触发器（定时 / 手动 / Webhook）
    ↓
n8n 工作流
    ├── AI 内容生成（Claude API / GPT）
    ├── 人工审核节点（飞书通知 → Bob 审批）
    └── 自动发布
            ├── WordPress / WooCommerce
            ├── 社交媒体（小红书 / Instagram / LinkedIn）
            ├── 邮件列表（Mailchimp / Brevo）
            └── RSS / Sitemap 更新
```

**Sanity 作为内容真相源：**
- 结构化内容（Schema 定义）
- 版本历史（可回滚）
- 多语言支持（zh / en / ja）
- 实时预览

## 备选方案（Alternatives Considered）

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| WordPress 原生编辑器 | 简单易用 | 无自动化，无结构化 | 无法扩展 |
| Contentful | 成熟的 Headless CMS | 价格高，与 n8n 集成复杂 | 成本问题 |
| n8n + Sanity（本方案） | 已验证，自动化程度最高，开源可自托管 | 需要维护 n8n 实例 | 已接受 |

## 后果（Consequences）

### 正面
- 内容生产效率提升 5-10 倍
- 多平台分发，最大化内容价值
- 人工审核节点保证内容质量
- Sanity 结构化数据，未来可迁移到任何前端

### 负面 / 已知风险
- n8n 自托管需要维护成本（可用 n8n Cloud 降低）
- 工作流复杂，调试成本高
- 依赖 AI API，有成本和可用性风险

### 触发重新评估的条件
- 当出现更好的工作流自动化工具时
- 当 n8n 定价大幅上升时

## 实施清单（Implementation）

- [x] Auraloop 项目已验证 n8n + Sanity 架构
- [ ] 提取标准工作流模板（内容生成 / 发布 / 报告）
- [ ] 建立 Sanity Schema 标准库
- [ ] 建立 n8n 工作流版本管理规范
