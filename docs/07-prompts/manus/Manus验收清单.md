# Manus 验收清单(独立版)
## Bob 用这个清单逐项验收 Manus 的产出

> 任何一项不通过,**整个任务标记为不通过**,不能"部分通过"。

---

## 阶段 P0 验收(本周必完成)

### Task 1: 首页价格调整

**视觉与内容**
- [ ] 三档价格已更新:¥8,800 / ¥22,800 / ¥58,000
- [ ] 月度运维板块已添加(¥1,980/月起)
- [ ] ROI 计算器锚定物已切换为真实对手
- [ ] 交付时长已调整(10/28/60 天)
- [ ] 推荐档卡片有视觉强调
- [ ] 所有 CTA 可点击

**全站一致性**
- [ ] Footer / FAQ / Meta 全部同步
- [ ] 没有"7 天交付"残留

**响应式**
- [ ] 桌面 1920px / 1440px 正常
- [ ] 移动 414px / 375px 正常,无横滚

**性能**
- [ ] Lighthouse Performance ≥ 85
- [ ] Lighthouse SEO ≥ 95
- [ ] 首屏 ≤ 2 秒

**部署**
- [ ] staging 已审 → production 已部署
- [ ] PR 记录完整

---

### Task 2: 案例区添加

**结构**
- [ ] Auraloop 作为 Featured Live Case 显眼位置
- [ ] 6 + 1 案例展示
- [ ] 6 个珠宝/手表案例已加入
- [ ] Harrow Demo 已加入

**标注合规(关键!)**
- [ ] Auraloop = "Live · 2024-Present"
- [ ] 6 案例 = "Concept · Inspired by [Style]"
- [ ] Harrow = "Demo · Industry Showcase"
- [ ] **零顶级品牌真实 Logo**
- [ ] **零顶级品牌真实名称作为项目名**

**链接**
- [ ] 每个案例可点击跳转
- [ ] Auraloop 跳转到 Live 站
- [ ] 无 404

---

### Task 3: 能力区改写

- [ ] 4 类能力卡片清晰
- [ ] 每张卡片标注"实战于 Auraloop · Live"
- [ ] 留"+ 更多能力"扩展卡
- [ ] **零产品包装名**(如 Auraloop Commerce)
- [ ] 文案反映"开放架构"

---

## 阶段 P1 验收(2 周内)

### Task 4: ADR 体系完整落地

**目录与索引**
- [ ] `docs/adr/` 目录已建
- [ ] `template.md` 已创建
- [ ] `README.md` 索引完整

**ADR 文件**
- [ ] 战略层 ADR-0001 至 0004 完整
- [ ] 商业层 ADR-0010 至 0013 完整
- [ ] 技术层 ADR-0020 至 0026 完整
- [ ] 工程文化层 ADR-0030 至 0036 完整
- [ ] 法律层 ADR-0040 至 0041 完整

**内容真实性(关键!)**
- [ ] 内容反映 Bob 与 Claude 真实讨论结果
- [ ] **没有 Manus 自创的决策内容**
- [ ] 每个 ADR 都有备选方案对比表

---

### Task 5: RUNBOOK 体系完整落地

- [ ] `docs/runbook/` 目录已建
- [ ] README 索引完整
- [ ] 已展开的 RUNBOOK:01 / 10 / 30 经 Bob 审阅
- [ ] 其余 RUNBOOK 按模板格式化输出
- [ ] 每个 RUNBOOK 包含:前置 / 步骤 / 产出 / 失败处理 / 回滚

---

### Task 6: 客群子域名落地页

- [ ] Cloudflare 通配符 CNAME 已配置
- [ ] 4 个 Vercel 项目模板已建
- [ ] `ecom.bobqiushao.online` 已上线(原主页内容迁移)
- [ ] `factory.bobqiushao.online` 已上线
- [ ] `personal.bobqiushao.online` 已上线(简版可)
- [ ] 主门户"客群入口"区清晰引导
- [ ] 各落地页 SEO canonical 配置正确

---

### Task 7: Auraloop 反哺主门户

- [ ] Featured Live Case 区已上线
- [ ] Auraloop 关键数据展示
- [ ] 月度数据自动更新机制(RUNBOOK-51)已建立

---

## 阶段 P2 验收(1 个月内)

### Task 8: GitHub 案例库基础设施

- [ ] `cases-portfolio` 仓库已建
- [ ] `inspiration-library` 目录已建
- [ ] 命名规范文档已写
- [ ] 6 个珠宝/手表案例迁移完成
- [ ] 每个案例配 INSPIRE / DISTILL / REMIX 文档
- [ ] 6 个子域名全部上线
- [ ] 主门户 cases.json 已同步

---

### Task 9: 能力库文档完整化

- [ ] auth-community/ 完整文档(7 个文件)
- [ ] brand-matrix/ 完整文档
- [ ] content-factory/ 完整文档
- [ ] frontend-cdn/ 完整文档
- [ ] 每个能力的 reuse-guide 可被 Manus 直接调用复用

---

### Task 10: CI/CD 最小可行版本

- [ ] 主门户 Vercel 自动部署验证
- [ ] 案例 demo GitHub Actions 模板已建
- [ ] 每项目有 RUNBOOK
- [ ] Bob 实测 push → 30 秒上线
- [ ] Bob 实测 5 分钟内回滚

---

## 阶段 P3 验收(3 个月内)

### Task 11: 客户站 CI/CD 标准化

- [ ] 第一个真实客户站完整跑通
- [ ] Lighthouse PR 检查配置完成
- [ ] 飞书部署通知配置完成
- [ ] 部署日志保留 30 天+

---

### Task 12: 案例库复利系统

- [ ] 每月新增 1-2 个 REMIX 案例
- [ ] inspiration library 累积 50+ 条
- [ ] 第一份"设计模式归纳"输出

---

### Task 13: 月度运维订阅交付

- [ ] 月度运维 SOP 文档化
- [ ] SEO 报告模板设计完成
- [ ] 内容更新流程模板化
- [ ] n8n / GitHub Actions 自动化部署
- [ ] 第一个运维客户成功交付一个完整月度

---

## 通用验收原则

### Manus 的 4 个不许

1. ❌ 不许跳过验收清单直接交付
2. ❌ 不许使用顶级品牌真实名称
3. ❌ 不许自行修改价格 / 产品定义 / 能力库
4. ❌ 不许覆盖 Bob 已有的 6 个案例的设计

### Bob 的 4 个保留权

1. ✅ 保留任何一项重做的权利(无理由)
2. ✅ 保留终止任务的权利(随时)
3. ✅ 保留增加要求的权利(合理范围内)
4. ✅ 保留拒绝交付物的权利(基于"我看了不舒服"也可以)

---

## 最终交付完成标准

当所有 P0-P2 任务通过验收后,Bob 应该能够:

- ✅ 一个 URL → 完整的更新后主门户
- ✅ 一个 GitHub 组织 → 所有案例仓库 + ADR + RUNBOOK
- ✅ 一个 Vercel 仪表盘 → 所有部署状态
- ✅ 4 个客群子域名 → 各自独立可访问
- ✅ 一个 cases.json → 所有案例的真相源
- ✅ 一个数字 ROI → **完成本次升级后,1 个月内成交至少 1 单 ¥22k+ 客户**

**这就是真正的"完成"。**
