# Bob Qiushao Operating System
## bobqiushao-os v1.0

> 一套帮助 Bob Qiushao 用 AI 高强度协作模式,
> 把"建站"做成可复利的方案体系的完整工程文化与执行框架。

**版本:** v1.0
**生效日期:** 2026-04-23
**作者:** Bob Qiushao + Claude(战略对话)

---

## 这是什么

这不是一个"项目方案",是一个 **"个人操作系统"**。

它包含:
- **一个根世界观**(Charter)
- **一套战略决策记录**(ADR)
- **一套标准化操作手册**(RUNBOOK)
- **一套主门户 + 客群落地页架构**
- **一套能力库与产品化路径**
- **一套 CI/CD 工程化方案**
- **三个 AI Agent 的协作提示词**(Claude / Manus / Cursor)

**目标:** 让 Bob 可以一个人 + AI 协作,服务 30+ 客户,持续学习,长期复利。

---

## 包结构

```
bobqiushao-os/
│
├── README.md                              # 你正在读的这个
│
├── 00-charter/                            # 【根】世界观
│   └── CHARTER.md                         # 一切之上的总宪章
│
├── 01-priority-now/                       # 【P0】立刻执行
│   └── P0立刻执行.md                       # 本周必完成的 3 个任务
│
├── 02-adr/                                # 【架构决策记录】
│   ├── README.md                          # ADR 索引(25 个 ADR)
│   ├── ADR-0001-个人门户作为方案展示中心.md
│   ├── ADR-0002-能力库开放架构.md
│   ├── ADR-0003-Auraloop作为实战样板.md
│   ├── ADR-0011-客群分层与落地页策略.md
│   ├── ADR-0021-Vercel多前缀域名方案.md
│   ├── ADR-0035-学习吸收标准化流程.md
│   └── ADR-其余编号摘要.md                # 其余 ADR 待 Manus 展开
│
├── 03-runbook/                            # 【标准化操作手册】
│   ├── README.md                          # RUNBOOK 索引
│   ├── RUNBOOK-01-add-subdomain.md        # 添加新子域名(完整版)
│   ├── RUNBOOK-10-add-new-case.md         # 添加新案例 30 分钟流程(完整版)
│   ├── RUNBOOK-30-weekly-learning.md      # 周日学习整理(完整版)
│   └── RUNBOOK-其余索引.md                # 其余 RUNBOOK 待 Manus 展开
│
├── 04-portfolio-system/                   # 【主门户架构】
│   └── 主门户信息架构.md                   # 主门户 + 客群落地页 + cases.json
│
├── 05-capability-library/                 # 【能力库】
│   └── README.md                          # 4 类能力 + 开放扩展
│
├── 06-ci-cd/                              # 【工程化】
│   └── CI-CD完整方案.md                    # GitHub Actions + Vercel + Hostinger
│
└── 07-prompts/                            # 【AI 协作】
    ├── claude/Claude战略对话提示词.md     # 给战略对话的 Claude
    ├── manus/Manus执行提示词.md           # 给工程执行的 Manus
    ├── manus/Manus验收清单.md             # Bob 验收 Manus 的清单
    └── cursor/Cursor工作提示词.md         # 给编码的 Cursor / Claude Code
```

---

## 核心心智模型(必读)

### 1. 个人门户而非产品销售页

bobqiushao.online 是 **Bob 个人能力的总展示中心**,不是某个产品的销售页。

通过子域名前缀(ecom / factory / brand / personal),为不同客群提供专属落地页。

详见:**ADR-0001 / ADR-0011**

### 2. 能力库开放架构

Bob 已实战 4 类能力,**未来会持续扩展**(选品 / BI / AI Agent 等)。

任何"固定产品 SKU"或"包装产品名"(如 "Auraloop X")都被禁止。

详见:**ADR-0002 / ADR-0003**

### 3. Auraloop = 实战样板,不是产品

Auraloop 是 Bob 的个人品牌实战项目,作为"Live"案例展示,**绝不**作为对外产品命名。

详见:**ADR-0003**

### 4. Vercel 多前缀域名 = 低成本扩展引擎

主域名 + 通配符 CNAME + Vercel 多项目挂载 = 30 个案例总成本 ¥80/年(主域名)+ Vercel 免费版。

新案例 30 秒上线。

详见:**ADR-0021 / RUNBOOK-01**

### 5. INSPIRE → DISTILL → REMIX

学习不沉淀等于没学。每周 1 小时整理,一年后 200+ inspiration / 50+ distill / 12+ REMIX 案例。

详见:**ADR-0035 / RUNBOOK-30**

### 6. 复利资产 5 层

```
Layer 5: 客户实战 (CASE)
Layer 4: 落地页 (LANDING)
Layer 3: 能力库 (CAPABILITY)
Layer 2: 工程基础 (FOUNDATION: ADR / RUNBOOK / CI/CD)
Layer 1: 学习吸收 (INPUT)
```

每个上层任务**自动**产生下层资产。这才是长期主义的真正含义。

---

## 给 Bob 的使用指南

### 第 1 步:自己先通读(60 分钟)

按这个顺序看:

1. `00-charter/CHARTER.md` — 30 分钟,这是世界观
2. `01-priority-now/P0立刻执行.md` — 5 分钟,看本周要做什么
3. `02-adr/README.md` + 几个核心 ADR(0001/0002/0003/0011/0021)— 20 分钟
4. `04-portfolio-system/主门户信息架构.md` — 5 分钟,看主门户长什么样

**任何不同意的地方,直接修改文档**。这些是给你的草稿,不是定本。

### 第 2 步:启动 P0 任务

打开 `07-prompts/manus/Manus执行提示词.md`:

1. **完整复制**到 Manus 对话框
2. 等 Manus 回复"理解汇报"(它必须先汇报,不能直接动手)
3. 确认 Manus 理解正确后,让它开始 Task 1

### 第 3 步:验收

用 `07-prompts/manus/Manus验收清单.md` 逐项核对。

**任何一项不通过,整个任务打回。**

### 第 4 步:推进到 P1 / P2 / P3

P0 完成后,按 Manus 提示词的优先级顺序推进。

---

## 给 AI 的使用指南

### 给 Claude(战略对话)

把 `07-prompts/claude/Claude战略对话提示词.md` 完整复制到 Claude 新对话开头。

**Claude 的角色:** 思考的放大器 — 帮 Bob 起草 ADR、复盘决策、拆解复杂问题。

### 给 Manus(工程执行)

把 `07-prompts/manus/Manus执行提示词.md` 完整复制到 Manus 新任务开头。

**Manus 的角色:** 工程执行官 — 精确落地战略,严格按 RUNBOOK 执行。

### 给 Cursor / Claude Code(编码)

把 `07-prompts/cursor/Cursor工作提示词.md` 的内容放在每个项目的 `CLAUDE.md` 文件。

**Cursor 的角色:** 编码主力 — 在战略和 RUNBOOK 框架内,实际写代码。

---

## 与之前 Claude 资料的关系

如果你之前已经收到了 `manus-package.zip`:

- ✅ 那个包仍然有用,**作为参考资料**
- ✅ 当前这个 `bobqiushao-os` 是**新的、更准确的、反映你真实野心**的版本
- ❌ 之前包里"Auraloop X / Y / Z 产品包装"的部分**已被 ADR-0003 否决**
- ✅ 之前包里的工厂 demo / 价格调整 / 冷启动清单等**仍然有效**

**两个包的优先级:** bobqiushao-os 优先,manus-package 作为补充资料。

---

## 当前已完成的产出

### 已完整展开

| 文档 | 状态 |
|---|---|
| Charter | ✅ 完整 |
| P0 立刻执行 | ✅ 完整 |
| ADR-0001 / 0002 / 0003 / 0011 / 0021 / 0035 | ✅ 完整 |
| ADR 其余 19 个 | ⏳ 摘要,待 Manus 展开 |
| RUNBOOK-01 / 10 / 30 | ✅ 完整 |
| RUNBOOK 其余 17 个 | ⏳ 索引,待 Manus 展开 |
| 主门户信息架构 | ✅ 完整 |
| 能力库 README | ✅ 完整 |
| 4 类能力的详细文档 | ⏳ 待 Manus 创建 |
| CI/CD 完整方案 | ✅ 完整 |
| Claude 提示词 | ✅ 完整 |
| Manus 提示词 | ✅ 完整 |
| Manus 验收清单 | ✅ 完整 |
| Cursor 提示词 | ✅ 完整 |

---

## 关键认知(给所有合作者)

### 1. 这套系统是给"你 + AI"设计的,不是给"团队"设计的

Bob 是独立工作者。所有 ADR / RUNBOOK / 提示词都假设:
- 决策者只有 Bob 一人
- 执行者主要是 Bob + AI Agents
- 客户沟通**必须**由 Bob 本人

### 2. 这套系统是 **可演化**的

Charter / ADR / RUNBOOK 都不是写死的:
- 业务模型变化时,新 ADR Supersede 旧 ADR
- 操作流程优化后,RUNBOOK 直接更新版本
- 能力库扩展时,新能力直接加入

**唯一不变的是:任何变化都要留痕,有据可查。**

### 3. 这套系统是 **复利的**

短期看:每个任务花的时间比"直接做"长。
长期看:每个任务都为下次做减负。

3 个月后:Bob 接同样的客户,效率比现在高 2-3 倍。
1 年后:Bob 已积累的资产,新对手 1 年内追不上。
3 年后:Bob 的能力库 + 案例库 + 决策记录 = 真正的护城河。

---

## 反复强调的禁令

无论是 Claude / Manus / Cursor / 还是未来任何 AI Agent,以下 5 件事**永远不能做**:

1. ❌ **自创产品名** 包装 Bob 的真实能力(如 Auraloop X / Bob OS Y)
2. ❌ **限制能力库** 在 4 类(它是开放的,持续扩展)
3. ❌ **重做已有资产**(6 案例 / Auraloop / 1688 渠道 / Cursor 工作流)
4. ❌ **直接对客户说话**(AI 永远不替 Bob 与真实客户沟通)
5. ❌ **跳过 ADR / RUNBOOK / 验收清单** 直接交付

---

## 下一步

**立刻可做的事:**

1. 通读这份 README(你刚做完)
2. 通读 Charter
3. 修改任何不同意的地方
4. 启动 P0 任务(给 Manus 提示词)

**两周内可做的事:**

5. 完成 P0,3 个任务
6. 启动 P1,搭建 ADR / RUNBOOK / 客群落地页

**一个月内可做的事:**

7. 完成 P2,案例库基础设施
8. 第一个真实付费客户(用新价格)

**三个月内可做的事:**

9. 完成 P3,全自动 CI/CD
10. 月度运维订阅模型验证

---

## 致 Bob

> "我相信我的学习能力和执行能力。"

这句话是整个 Operating System 的精神注脚。

这套系统不是为了**限制**你的成长,
是为了**放大**你的学习和执行能力,
让一个人的智慧能够服务多个客户、覆盖多个客群、积累多年资产。

**祝你的方案体系如野草一般生长。**

---

> Built with Bob's vision and Claude's structuring assistance.
> All decisions, however, belong to Bob.
