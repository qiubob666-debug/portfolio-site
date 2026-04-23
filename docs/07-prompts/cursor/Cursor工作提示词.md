# Cursor + Claude Code 工作提示词
## 适用于:实际编码工作的协作

> 这份提示词放在每个项目根目录的 `CLAUDE.md` 文件里(Claude Code 会自动读取)。
> Cursor 用户可以放在 `.cursorrules` 或 Cursor 项目设置中。

---

## CLAUDE.md (放项目根目录)

# Project: {项目名}

## 项目类型

[勾选一个]
- [ ] 主门户 (bobqiushao.online)
- [ ] 客群落地页 (ecom / factory / brand / personal)
- [ ] 案例 demo (case-{name})
- [ ] 客户 WordPress 站
- [ ] 客户 Headless 项目
- [ ] 模板 / 库
- [ ] 学习实验项目

## 关键链接

- ADR 目录: `docs/adr/` (上层项目继承自 bobqiushao-os)
- RUNBOOK 目录: `docs/runbook/`
- Charter: `docs/CHARTER.md`(从 bobqiushao-os 链接过来)

---

## 给 Cursor / Claude Code 的工作约定

### 1. 先读再写

任何代码变更前,先读:
- 本项目的 README
- 相关 ADR(如有)
- 相关 RUNBOOK(如有)

### 2. 严格遵守 auraloop-frontend-spec

如果项目涉及 WordPress 前端开发,**必须**遵守 `auraloop-frontend-spec` 规范:
- HTML 设计文件场景 (A): 自由度最高
- PHP 模板场景 (B): 不能动 WC 钩子
- React Island 场景 (C): 只管自己挂载点

完整规范在 `docs/standards/auraloop-frontend-spec.md`(从 skill 同步)。

### 3. CDN 白名单

只能从这些域名加载第三方资源:
- `cdnjs.cloudflare.com` ✅
- `cdn.jsdelivr.net` ✅
- `esm.sh` ✅
- `unpkg.com` ✅
- `fonts.googleapis.com` / `fonts.gstatic.com` ✅(字体专用)

其他 CDN 必须先问 Bob。

### 4. 一个页面一个动效主库

不要同时引入 GSAP + AOS。

优先级:
1. GSAP(功能最强)
2. AOS(轻量,只需滚动入场)
3. Lenis(平滑滚动,通常配合 GSAP)
4. Anime.js(序列动画)
5. Three.js(3D)

### 5. prefers-reduced-motion 必须保护

所有动画:

```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // 禁用动画
}
```

### 6. 分支规范

- 直接在 main 上写代码 = 禁止
- 必须创建 feature/* 或 fix/* 分支
- PR 必须有描述(做什么 / 为什么 / 怎么测)

### 7. 提交信息

Conventional Commits:
```
feat: 新功能
fix: bug 修复
docs: 文档
refactor: 重构
style: 样式
test: 测试
chore: 杂项
```

### 8. 不要做的事

- ❌ 不要直接 push main
- ❌ 不要在代码注释里写 TODO 但不创建 issue
- ❌ 不要把客户凭据 / API key 写入代码
- ❌ 不要安装超过 5 个新依赖而不解释为什么
- ❌ 不要重写已通过的测试
- ❌ 不要在 Bob 没确认的情况下修改 ADR / RUNBOOK

---

## 上下文提供策略

### 给 Claude Code 的最佳上下文

新会话开始时,主动 `view` 以下文件:

1. `CLAUDE.md`(本文件)
2. `docs/CHARTER.md`(如已链接)
3. `docs/adr/README.md`(看相关 ADR)
4. `package.json`(看技术栈)
5. `README.md`(看项目说明)
6. **当前任务相关的源代码文件**

### 给 Cursor 的 .cursorrules

把以下内容放在项目根目录 `.cursorrules` 文件:

```
# Cursor Rules for this project

This project belongs to Bob Qiushao's bobqiushao-os.
Read docs/CHARTER.md and docs/adr/ before any major changes.
Follow auraloop-frontend-spec for all WordPress frontend work.
Only use CDN whitelisted in standards/cdn-whitelist.md.
Always include prefers-reduced-motion protection in animations.
Never push directly to main; use feature branches and PRs.
Commit messages must follow Conventional Commits.
Never write client credentials or API keys in code.
```

---

## 项目专用约定(在每个项目里填写)

### 这个项目的特殊点

[Bob 在这里写本项目的独特要求,例如:]

- 这是面向跨境电商客户的落地页,文案要强调"摆脱平台佣金"
- 设计风格:深色 editorial,字体 Fraunces + Manrope
- 不要用紫色(客户偏好)
- 主 CTA 必须出现在每一屏
- ...

### 这个项目的客户 / 受众

- 主要受众:[谁]
- 痛点:[列 3-5 个]
- 行动呼吁:[预期行为]

### 这个项目的关键文件

- 入口:`src/index.tsx`
- 主页面:`src/pages/index.tsx`
- 组件库:`src/components/`
- 样式系统:`src/styles/`
- 内容数据:`content/`

---

## Claude Code 自检清单

每次完成代码任务前,内心走一遍:

- [ ] 我读过 CLAUDE.md 了吗?
- [ ] 我遵守了 auraloop-frontend-spec 吗?
- [ ] 我用的 CDN 在白名单内吗?
- [ ] 我加了 prefers-reduced-motion 保护吗?
- [ ] 我创建了 feature 分支吗?
- [ ] 我的提交信息是 Conventional Commits 吗?
- [ ] 我有没有不小心暴露凭据?
- [ ] 我的代码符合项目专用约定吗?

通过自检后再提交 PR。

---

## 如何拓展这份模板

每个新项目可以根据需要添加:

- 业务领域专用约定(医疗 / 法律 / 教育要更小心)
- 团队协作约定(如多人项目)
- 性能预算(如必须 LCP < 1s)
- 安全要求(如必须 CSP)
- 国际化要求(如必须双语)
- 无障碍要求(如必须 WCAG 2.1 AA)

但不要把模板写得太长。**短而清晰 > 长而完整**。

---

## 相关文档

- ADR: `02-adr/` 目录
- RUNBOOK: `03-runbook/` 目录
- 能力库: `05-capability-library/` 目录
- CI/CD: `06-ci-cd/CI-CD完整方案.md`
