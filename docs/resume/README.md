# 个人简历与作品集 (Personal Portfolio & Resume)

欢迎来到我的个人简历与作品集仓库。本仓库记录了我的技术能力、项目经验以及开源贡献。

## 👨‍💻 关于我

我是一名全栈开发者，专注于构建高性能、可扩展的 Web 应用与自动化系统。我擅长使用现代前端框架（React, Next.js, TypeScript）、后端服务（Python, FastAPI, Node.js）以及无头 CMS（Sanity）和数据库（Supabase, PostgreSQL）来打造完整的生态系统。

同时，我对自动化工作流（n8n）和基础设施部署（Docker, Vercel, GitHub Actions）有深入的实践经验。

## 🛠️ 技术栈 (Tech Stack)

### 前端开发 (Frontend)
- **核心框架**: React, Next.js, Astro
- **语言**: TypeScript, JavaScript, HTML5, CSS3
- **样式与 UI**: Tailwind CSS, Styled Components
- **状态管理与数据获取**: tRPC, React Query

### 后端开发 (Backend)
- **语言**: Python, Node.js, PHP
- **框架**: FastAPI, Express
- **CMS 与电商**: Sanity (Headless CMS), WordPress, WooCommerce

### 数据库与存储 (Database & Storage)
- **关系型数据库**: PostgreSQL, Supabase, SQLite
- **其他**: Vercel Blob, Redis (Upstash)

### 自动化与基础设施 (Automation & DevOps)
- **自动化引擎**: n8n (工作流编排)
- **容器化**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **部署平台**: Vercel, Railway, Hostinger

## 🚀 核心项目作品集 (Featured Projects)

### 1. AuraLoop 生态系统 (AuraLoop Ecosystem)
AuraLoop 是一个集成了内容展示、社区互动、电商订单和自动化订阅的完整生态系统。
- **前端展示层 (`auraloop.space`)**: 基于 React 和 Vite 构建，提供 3D 星盘、交互式 Dashboard 和多栏目聚合页。
- **占星计算服务 (`uraloop-astro-api-service`)**: 基于 Python 和 FastAPI 构建的微服务，提供核心星象数据计算。
- **自动化引擎 (`auraloop-n8n-workflows`)**: 使用 n8n 编排自动化工作流，实现数据抓取、大模型内容生成与 Sanity CMS 自动推送。
- **内容管理 (`auraloop-sanity-studio`)**: 使用 Sanity 作为 Headless CMS，管理官方生成的结构化内容（PGC）。
- **用户与社区 (Supabase)**: 集成 Supabase Auth (Google OAuth) 和 PostgreSQL，管理用户身份与社区互动（UGC）。

### 2. Terra Sigil (AI 占卜与分析平台)
- **核心应用 (`terra-sigil-v4`)**: 基于 React 和 TypeScript 构建，集成了 AI 分析功能。
- **架构优化**: 使用 Vercel Serverless Functions 代理 AI 请求，保护 API Key 安全，并优化了移动端 SVG 渲染。

### 3. 轻量级 BI 分析系统 (`mlta-bi-system`)
- **技术栈**: Node.js, Express, SQLite (sql.js), Chart.js
- **功能**: Amazon 产品销售数据可视化分析系统，采用纯 JS 实现的 SQLite，便于轻量级部署。

## 📈 架构设计与工程实践

我注重系统的可维护性与扩展性，在项目中推行以下工程实践：
- **三层架构分治**: 严格区分 PGC（Sanity）、订单（WooCommerce）和 UGC（Supabase）的数据存储。
- **规范化分支管理**: 采用主干开发与功能分支策略，结合 GitHub Actions 实现自动化测试与 CI/CD。
- **架构决策记录 (ADR)**: 记录核心架构演进过程，确保技术决策的可追溯性。

## 🌐 个人网站

我的个人网站正在构建中，将通过 Vercel 自动部署，并绑定自定义域名。敬请期待！

---
*最后更新于: 2026-04-22*
