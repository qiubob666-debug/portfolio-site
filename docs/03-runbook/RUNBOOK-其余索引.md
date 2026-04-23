# 其余 RUNBOOK 索引摘要
## 待 Manus 在 P1/P2 阶段按模板逐一展开

> 本文件作为 RUNBOOK 的快速索引,完整 RUNBOOK 文件由 Manus 创建。
> 每个 RUNBOOK 必须使用统一模板(见 03-runbook/README.md)。

---

## 部署与上线类

### RUNBOOK-02: 客户域名 DNS 配置
**目的:** 帮助客户配置自己的域名指向 Vercel
**关键步骤:**
1. 客户提供域名 + 域名服务商账号
2. 在客户域名服务商配置 `*.{domain}` CNAME → cname.vercel-dns.com
3. 客户授权 Bob 访问 OR 客户自助按 Bob 提供的图文教程操作
4. Vercel 端绑定域名,等待 SSL
5. 验证 + 通知客户

### RUNBOOK-03: 部署到 Hostinger(WordPress 客户站)
**目的:** GitHub 代码推送 → Hostinger SFTP 自动部署
**关键步骤:**
1. 主题 PHP 代码在 GitHub repo
2. 配置 GitHub Action workflow(参考 06-ci-cd 完整模板)
3. Hostinger SFTP 凭据存 GitHub Secrets
4. push main → 触发 GitHub Action → 自动 SFTP 上传 → 飞书通知

### RUNBOOK-04: 紧急回滚
**目的:** 发现部署有严重问题时快速回滚
**Vercel 部分:**
- vercel.com/dashboard → Deployments → 选上一个稳定版本 → Promote to Production
- 30 秒完成

**Hostinger 部分:**
- SSH 进 Hostinger
- 主题目录 `git checkout v{previous-tag}`
- 清除 W3 Total Cache `wp cache flush`

---

## 案例与作品集类

### RUNBOOK-11: 案例迁移到独立子域名
**适用:** 已有但还未挂载子域名的案例
**步骤:** 调用 RUNBOOK-01 + 调用 RUNBOOK-12

### RUNBOOK-12: 更新主门户 cases.json
**目的:** 主门户作品集是从 cases.json 自动渲染的
**步骤:**
1. 在主门户仓库根目录找到 cases.json
2. 按规范格式追加新条目(参考 RUNBOOK-10 Step 7)
3. 验证 JSON 语法
4. 上传截图到 public/cases/
5. git commit + push → 主门户自动重新部署

---

## 客户全流程类

### RUNBOOK-20: 新客户咨询接入
**触发:** 表单提交 / 微信咨询 / 主动联系
**步骤:**
1. Notion CRM 创建客户卡片
2. 30 分钟内回复(微信/邮件)
3. 邀约 30 分钟体检电话(Cal.com 链接)
4. 体检前:用 Claude 自动分析客户现有网站(如果有)
5. 体检中:倾听 + 记录痛点
6. 体检后 24h 内:发出方案 PDF(基于能力库自动组装)
7. 跟进至签约 OR 标记为 Lost(写明原因)

### RUNBOOK-21: 客户项目启动
**触发:** 合同签订 + 首期款到账
**步骤:**
1. 创建客户专属 Notion Workspace
2. 启动 Kickoff 会议(30 min)
3. 收集客户素材(品牌资料 / 产品图 / 内容)
4. 在 GitHub 创建客户项目 repo(命名:client-{name})
5. 用对应模板初始化项目
6. 进入开发阶段

### RUNBOOK-22: 客户项目交付验收
**触发:** 开发完成,准备客户验收
**步骤:**
1. 内部完整跑一遍验收清单
2. 部署到 staging 域名
3. 邀请客户验收会议
4. 客户提出的问题分类:
   - Bug → 立刻修
   - 合理改动 → 在合同范围内修
   - 范围外需求 → 单独报价
5. 二次确认无误后 → 正式上线
6. 5. 收尾款
7. 邀请进入运维订阅

### RUNBOOK-23: 客户运维订阅启动
**触发:** 客户同意进入月度运维
**步骤:**
1. 签订运维协议(独立合同)
2. 在 Notion 创建运维客户管理页
3. 配置自动化监控(Better Stack / UptimeRobot)
4. 配置月度任务(在 n8n 或 GitHub Actions)
5. 第一个月发欢迎包 + 首份月报模板

---

## 学习与积累类

### RUNBOOK-31: 月度案例 REMIX 输出
**频率:** 每月最后一周
**步骤:**
1. 翻阅本月所有 DISTILL
2. 选 2-3 条做组合实验
3. 设计一个 REMIX 案例(可针对某个客群)
4. 实施 → 调用 RUNBOOK-10 上线
5. 加入主门户作品集

### RUNBOOK-32: 季度设计模式归纳
**频率:** 每季度最后一周
**步骤:**
1. 翻阅本季度所有 DISTILL
2. 找出 2-3 个共性模式
3. 写到 `05-capability-library/patterns/`
4. 一年后可考虑出版"设计模式手册"

---

## 月度运维(订阅交付)类

### RUNBOOK-40: 客户站月度内容更新
**频率:** 每月 15 号前
**步骤:**
1. n8n 工作流自动:
   - 拉取关键词排名变化(Search Console API)
   - Claude 生成 2 篇 SEO 内容初稿
2. Bob 审稿 + 微调(20 min)
3. 自动发布到客户 WordPress
4. 同步到 Sitemap

### RUNBOOK-41: 客户站月度 SEO 报告
**频率:** 每月 1 号
**步骤:**
1. n8n 自动拉取:GA4 / Search Console / Plausible 数据
2. Claude 生成月报初稿(基于客户行业模板)
3. Bob 审稿 + 添加洞察(15 min)
4. 导出 PDF
5. 邮件发给客户

### RUNBOOK-42: 客户站季度复盘
**频率:** 每季度
**步骤:**
1. 整合 3 个月数据
2. 30 分钟客户会议(线上)
3. 提出下季度优化建议
4. 续约 OR 调整方案

---

## 个人主门户维护类

### RUNBOOK-50: 主门户内容季度审视
**频率:** 每季度
**步骤:**
1. 检查所有文案是否还反映当前能力
2. 检查所有案例是否还在线 / 截图是否过期
3. 检查能力库是否有新增能力需要加入
4. 检查转化率(GA4)
5. 列优化清单 → 当周完成

### RUNBOOK-51: Auraloop 实战数据更新
**频率:** 每月
**步骤:**
1. 拉取 Auraloop 当月数据(用户增长 / 内容产出 / 站点性能)
2. 更新主门户 Auraloop Featured Case 区的展示数字
3. 保持"Live"标签的真实性

### RUNBOOK-52: ADR 季度审视
**频率:** 每季度
**步骤:**
1. 翻阅所有 ADR
2. 检查"触发重新评估的条件"是否有触发
3. 写新 ADR 来 supersede 过时的旧 ADR(不要修改旧 ADR)
4. 更新 ADR 索引
