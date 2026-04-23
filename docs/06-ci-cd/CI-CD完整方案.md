# CI/CD 完整方案
## Push → 30 秒上线 · Push → 自动测试 · 一键回滚

> 关联 ADR-0032
> 关联 RUNBOOK-01 / 03 / 04

---

## 一、架构总览

```
本地开发
   ↓ git push
GitHub
   ↓
   ├─→ Vercel (个人门户 / 案例 / 落地页)
   │       ↓
   │   全球 Edge CDN
   │
   ├─→ GitHub Actions
   │       ↓
   │   ├─→ Lighthouse 检查
   │   ├─→ SFTP 部署到 Hostinger (WordPress 客户站)
   │   └─→ 飞书通知
   │
   └─→ Release Tag
           ↓
       模板/库 发布
```

---

## 二、项目分类与对应策略

| 项目类型 | 部署目标 | 策略 |
|---|---|---|
| 个人主门户 | Vercel | Vercel 直连 GitHub,自动部署 |
| 客群落地页 | Vercel | 同上 |
| 案例 demo | Vercel | 同上,挂子域名 |
| 客户 WordPress 站 | Hostinger | GitHub Actions → SFTP |
| 客户 Headless 项目 | 前端 Vercel + 后端 Hostinger | 双部署 |
| 模板/库 | GitHub Packages | Release tag 触发 |

---

## 三、分支策略(GitHub Flow 简化版)

### 主分支

```
main
  ↑
  ├── feature/xxx       (新功能开发)
  ├── fix/xxx           (bug 修复)
  ├── hotfix/xxx        (紧急修复)
  └── docs/xxx          (文档更新)
```

### 大型项目可选

```
main (production)
  ↑
staging                  (预发,Bob 自己审)
  ↑
feature/xxx
```

### 强制规则

- ❌ 禁止直接 push main
- ✅ 必须通过 PR
- ✅ PR 描述必须包含:做了什么 / 为什么 / 如何测
- ✅ Conventional Commits(`feat: / fix: / docs: / refactor:`)

---

## 四、GitHub Actions 模板

### 模板 1: Vercel 项目(个人门户/案例/落地页)

**实际不需要 GitHub Action**, Vercel 直接监听 GitHub 即可。

只需在 Vercel 项目设置:
```
Production Branch:  main
Preview Branches:   *  (所有非 main 分支自动创建预览)
Build Command:      npm run build
Output Directory:   .next / dist / out
```

PR 提交时,Vercel 自动评论 Preview URL。

---

### 模板 2: 客户 WordPress 站(Hostinger SFTP)

**文件:** `.github/workflows/deploy-production.yml`

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [main]
  workflow_dispatch:  # 允许手动触发

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Auraloop Sync (HTML → PHP)
        run: npm run auraloop:sync

      - name: PHP Lint
        run: |
          find . -name "*.php" -not -path "./node_modules/*" -exec php -l {} \;

      - name: Build assets
        run: npm run build

      - name: Deploy to Hostinger via SFTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.HOSTINGER_HOST }}
          username: ${{ secrets.HOSTINGER_USER }}
          password: ${{ secrets.HOSTINGER_PASS }}
          protocol: ftps
          local-dir: ./wp-content/themes/${{ vars.THEME_NAME }}/
          server-dir: /public_html/wp-content/themes/${{ vars.THEME_NAME }}/
          exclude: |
            **/node_modules/**
            **/.git*/**
            **/.env
            **/tests/**

      - name: Notify Feishu
        if: always()
        run: |
          STATUS="${{ job.status }}"
          EMOJI=$([ "$STATUS" = "success" ] && echo "✅" || echo "❌")
          curl -X POST -H "Content-Type: application/json" \
            -d "{\"msg_type\":\"text\",\"content\":{\"text\":\"$EMOJI 部署 ${{ github.repository }} → $STATUS by ${{ github.actor }}\"}}" \
            ${{ secrets.FEISHU_WEBHOOK }}
```

---

### 模板 3: Lighthouse PR 检查

**文件:** `.github/workflows/lighthouse-pr.yml`

```yaml
name: Lighthouse on PR

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Wait for Vercel preview
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        id: vercel
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          max_timeout: 180

      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            ${{ steps.vercel.outputs.url }}
            ${{ steps.vercel.outputs.url }}/portfolio
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Format Lighthouse score
        id: format
        run: |
          # 解析 Lighthouse 结果,生成 PR 评论
          # ...
```

---

### 模板 4: 案例 demo 自动子域名

**文件:** `.github/workflows/deploy-case.yml`

```yaml
name: Deploy Case to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        id: vercel
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          alias-domains: |
            ${{ vars.CASE_NAME }}.bobqiushao.online

      - name: Update main portal cases.json
        run: |
          # 触发主门户仓库的 webhook,自动重新构建作品集
          curl -X POST \
            -H "Authorization: token ${{ secrets.MAIN_PORTAL_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/bobqiushao/portal/dispatches \
            -d '{"event_type":"case_added","client_payload":{"case_name":"${{ vars.CASE_NAME }}"}}'
```

---

## 五、Secrets 配置清单

在 GitHub Settings → Secrets 配置(每个仓库或 organization 级别):

```
# Hostinger
HOSTINGER_HOST           # ftp.yourhost.com
HOSTINGER_USER           # u123456789
HOSTINGER_PASS           # ****
HOSTINGER_PATH           # /public_html

# Vercel
VERCEL_TOKEN             # 个人 token
VERCEL_ORG_ID            # 你的 Vercel org id
VERCEL_PROJECT_ID        # 各项目独立

# 通知
FEISHU_WEBHOOK           # 飞书机器人 webhook URL

# AI
ANTHROPIC_API_KEY        # 给自动化内容生成
OPENAI_API_KEY           # 备用

# 第三方
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY     # 服务端 only

# 主门户联动
MAIN_PORTAL_TOKEN        # PAT,用于跨仓库触发
```

---

## 六、回滚机制

### Vercel 项目回滚(30 秒)

```
1. vercel.com/dashboard
2. 选项目 → Deployments
3. 找到上一个稳定版本
4. ⋯ → Promote to Production
5. 30 秒生效
```

### Hostinger WordPress 回滚

```bash
# SSH 进 Hostinger
ssh u123@your-server.hostinger.com

# 进主题目录
cd ~/public_html/wp-content/themes/{theme}

# 切换到上一个稳定 tag
git checkout v1.2.3

# 清缓存
wp cache flush
wp w3-total-cache flush all

# 验证
curl -I https://yourclient.com
```

---

## 七、CI/CD 实施路线图

### Phase 1(本周)— 最小可行
- [ ] 个人主门户接入 Vercel(已可能存在,验证)
- [ ] 写第一个 RUNBOOK-04(回滚)
- [ ] 跑通"push → 30 秒上线"流程

### Phase 2(2 周内)— 案例自动化
- [ ] 案例 demo 模板仓库
- [ ] 子域名挂载流程标准化
- [ ] 主门户 cases.json 联动

### Phase 3(1 个月内)— 客户站化
- [ ] 第一个客户 WordPress 站完整跑通
- [ ] Lighthouse PR 检查
- [ ] 飞书通知

### Phase 4(3 个月内)— 全自动
- [ ] 所有客户站统一仓库模板
- [ ] 自动化测试(基础 smoke test)
- [ ] 监控告警(Better Stack)

---

## 八、长期价值

**没有 CI/CD 的 Bob:**
- 1 个客户站手动维护没问题
- 5 个客户站开始手忙脚乱
- 10 个客户站只能拒单或扩团队

**有 CI/CD 的 Bob:**
- 1 个人维护 30+ 客户站完全可行
- 部署从 30 分钟变成 30 秒
- 真正实现"AI 工厂化建站"的工程基础

**这就是为什么 CI/CD 不是"做不做"的问题,是"什么时候做"的问题。**
