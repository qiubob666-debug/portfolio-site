# ADR-0021: Vercel 多前缀域名挂载方案

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Technical
**关联 ADR:** 上游 ADR-0011 / 关联 ADR-0020

---

## 背景

Bob 已在 Auraloop 实战验证了"Vercel 多前缀域名挂载"作为多门户/多子品牌的技术方案。

需要把这个方案 **正式作为基础设施**,服务于:

1. **个人门户的客群落地页**(ecom / factory / brand / personal)
2. **案例库的独立展示**(每个案例一个子域名)
3. **客户项目的低成本搭建**(客户自己选前缀)
4. **快速测品 / A/B 测试**(临时挂载新主张)

Bob 原话:
> "我使用域名购买甚至一个域名以前缀的方式加域名用 vercel 挂载的方式,成本或许不会很高,选了域名库后我们在 vercel 挂载项目后直接在前缀为客户希望用的前缀。"

## 决策

**采用统一的 Vercel 多前缀子域名挂载架构。**

### 架构

```
DNS 层 (Cloudflare)
└── *.{root-domain}   通配符 CNAME → cname.vercel-dns.com

Vercel 层
├── 项目 1 (主门户)
│   └── 域名: bobqiushao.online
├── 项目 2 (ecom 落地页)
│   └── 域名: ecom.bobqiushao.online
├── 项目 3 (factory 落地页)
│   └── 域名: factory.bobqiushao.online
├── 项目 N (案例 1)
│   └── 域名: case-{name}.bobqiushao.online
└── 项目 M (客户专属)
    └── 域名: {客户选的前缀}.bobqiushao.online
              或
              {客户选的前缀}.{客户买的域名}
```

### 客户域名挂载流程(标准化)

**场景:客户已经买了自己的域名(如 client.com),想要用 Vercel 挂载多个站点。**

```
1. 客户域名 DNS 配置
   *.client.com  CNAME → cname.vercel-dns.com

2. 客户选择前缀(由 Bob 提供选项库或自由命名)
   - shop.client.com
   - blog.client.com
   - support.client.com
   - any-prefix.client.com

3. Vercel 创建新项目,绑定该子域名

4. 30 秒内上线
```

### 域名选项库(给客户参考)

为帮助客户选择前缀,提供推荐选项:

| 用途 | 推荐前缀 |
|---|---|
| 主商城 | `shop` / `store` / `mall` |
| 子品牌 | 子品牌名 / `brand-{name}` |
| 内容/博客 | `blog` / `journal` / `insights` |
| 帮助中心 | `help` / `support` / `docs` |
| 测试/landing | `try` / `new` / `lp` |
| 多语言 | `en` / `de` / `jp` 等 |
| 区域 | `us` / `eu` / `asia` |

---

## 备选方案

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| A. **Vercel 多前缀(选定)** | 免费、快速、易管理、Bob 已熟悉 | 单点依赖 Vercel | 性价比最优 |
| B. Cloudflare Pages 多域名 | 免费、CF 生态强 | Bob 不熟、迁移成本 | Bob 已在 Vercel 形成肌肉记忆 |
| C. 自托管 Nginx + VPS | 完全控制 | 维护成本高、需要运维 | 与"AI 高效协作"模式冲突 |
| D. 每客户独立 Hosting 账号 | 隔离性好 | 成本高、管理复杂 | 不必要的复杂度 |

## 后果

### 正面
- 新增子域名/客户域名挂载成本接近零
- 部署速度极快(git push → 30 秒上线)
- Vercel 自动 HTTPS / Edge CDN
- 客户可保留自己的域名所有权
- A/B 测试 / 临时活动页 / 测品场景全覆盖

### 负面 / 已知风险
- 单点依赖 Vercel(若 Vercel 出问题影响所有项目)
- Vercel 免费版限制(100GB 带宽/月,200 项目)
- 若客户站点突然爆量需要升级 Pro($20/月)
- 风险缓解:**关键客户项目**保留迁移到 Hostinger 自托管的可能

### 触发重新评估的条件
- 当 Vercel 项目数接近 200 时(需要分账号或 Pro)
- 当 Vercel 出现严重稳定性问题或重大政策变更
- 当某客户单站月流量超 100GB 时(需要单独评估方案)
- 每年 4 月份审视整体方案

## 实施清单

- [ ] Cloudflare 配置 `*.bobqiushao.online` 通配符 CNAME
- [ ] 在 Vercel 验证子域名挂载流程
- [ ] 创建 4 个 Vercel 项目模板:
  - [ ] 静态 HTML 模板(单页落地页)
  - [ ] React/Next 模板(主门户/复杂落地页)
  - [ ] Headless WC 前端模板(电商客户)
  - [ ] 案例 demo 模板
- [ ] 写 `03-runbook/RUNBOOK-add-subdomain.md` 标准操作流程
- [ ] 写 `03-runbook/RUNBOOK-client-domain-setup.md` 帮客户配置 DNS 的流程
- [ ] 编写"客户前缀选择指南"PDF(销售物料)
