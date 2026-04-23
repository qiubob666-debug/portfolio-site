# ADR-0003: Auraloop 作为实战样板而非产品包装

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Strategic
**关联 ADR:** 上游 ADR-0001 / ADR-0002

---

## 背景

Auraloop 是 Bob 个人的品牌实践,实战实现了:

- Google + Supabase 实现的社区认证 + 用户邮件 + 询盘信息 + 社区建设
- Headless WC + WP 电商系统(零成本平替 Shopify)
- Vercel 多前缀域名实现的多门户/多站点/多子品牌品牌矩阵能力
- n8n 内容生产工作流 + Sanity CMS 内容管理系统
- 高效高审美的前端设计 + CDN 方案

之前的思路曾经倾向于把 Auraloop **作为对外销售的产品名**(如 "Auraloop Commerce" / "Auraloop Growth")。

Bob 明确否定:
> "不用强调包装为 Auraloop 相关,Auraloop 只是我个人的一个品牌设计。"

## 决策

**Auraloop 是 Bob 的"实战样板间",不是对外销售的产品。**

### Auraloop 的角色

| 角色 | 说明 |
|---|---|
| ✅ 是 | Bob 个人品牌实践 |
| ✅ 是 | 所有能力的最强真实证据 |
| ✅ 是 | 可点击访问的"Live Production"案例 |
| ✅ 是 | 内部技术沉淀的母体 |
| ❌ 不是 | 对外销售的产品名 |
| ❌ 不是 | 客户购买的服务名 |
| ❌ 不是 | 服务包装的限定词 |

### 在主门户的展示方式

**正确表达:**
> "我已在 Auraloop(我的个人品牌实战)中实现了:Headless 电商架构、Google 认证社区、内容工厂..."
>
> [Visit Auraloop Live →]

**错误表达(禁止):**
> ❌ "Auraloop Commerce ¥58,000"
> ❌ "购买 Auraloop Growth 套餐"
> ❌ "Auraloop OS 包含 Auth / Content / Frontend 三大模块"

## 备选方案

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| A. Auraloop 作为产品组合 | 销售话术统一 | 锁死品牌叙事,客户认知混乱 | 与 ADR-0001/0002 冲突 |
| B. **Auraloop 作为样板间(选定)** | 真实、可访问、有说服力 | 需要 Auraloop 持续运营保持鲜活 | 最自然、最长期的展示方式 |
| C. 完全不提 Auraloop | 极简 | 浪费已有的最强信任锚 | 没有理由不利用现有资产 |

## 后果

### 正面
- 客户看到 Auraloop 是"真实在跑的项目",信任成本最低
- Bob 在 Auraloop 上的所有改进自动加强主门户说服力
- Auraloop 作为内部技术沉淀的母体,保持了创新空间
- 不会因为某个客户项目失败而连带损害"Auraloop 产品"声誉

### 负面 / 已知风险
- Auraloop 必须保持活跃运营状态,否则"Live"标签失真
- 需要定期更新 Auraloop 的实战数据(如:用户数、内容产出量等)以增强说服力
- 风险缓解:把 Auraloop 维护纳入月度 RUNBOOK

### 触发重新评估的条件
- 当 Auraloop 业务规模成长到需要独立团队时,可能演进为独立子品牌
- 当 Bob 决定真正商业化某个能力为标准产品时(可能 12+ 个月后)
- 每季度审视一次 Auraloop 的展示效果

## 实施清单

- [ ] 主门户案例区"Featured Live Case"位置,放 Auraloop
- [ ] 每个能力卡片下方注明:"实战于 Auraloop · 立即看演示"
- [ ] 在主门户文案中使用"我已在 Auraloop 中实现了..."这类表达
- [ ] **删除任何 "Auraloop X" 形式的产品命名**(如 Auraloop Commerce)
- [ ] 创建 `05-capability-library/auraloop-as-sample/` 目录,沉淀 Auraloop 的技术细节作为内部参考
- [ ] 月度运维 RUNBOOK 中加入"更新 Auraloop 展示数据"任务
