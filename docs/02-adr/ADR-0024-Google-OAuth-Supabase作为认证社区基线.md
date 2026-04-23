# ADR-0024: Google OAuth + Supabase 作为认证社区基线

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Technical
**关联 ADR:** ADR-0022 (关联)

---

## 背景（Context）

海外用户对注册流程极其敏感，复杂的注册表单会导致大量流失。
Bob 需要一套标准化的认证方案，既能快速集成到任何项目，又能提供最佳用户体验。
已在 Auraloop 项目中验证了 Google OAuth + Supabase 的组合。

## 决策（Decision）

所有需要用户体系的项目，默认使用 **Google OAuth（主）+ Apple Sign In（辅）+ Supabase（用户数据库）**。

**技术架构：**

| 组件 | 选型 | 说明 |
|---|---|---|
| 主认证 | Google OAuth 2.0 | 海外用户首选，一键登录 |
| 辅助认证 | Apple Sign In | iOS 用户必备 |
| 用户数据库 | Supabase | Auth + DB + Realtime + Storage 一体化 |
| 邮件验证 | Supabase Auth | 内置邮件模板 |
| 权限管理 | Supabase RLS | 行级安全策略 |

## 备选方案（Alternatives Considered）

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| Auth0 | 功能完善 | 价格高，超出个人项目预算 | 成本问题 |
| Firebase Auth | Google 生态 | 数据在 Google 云，迁移困难 | 数据主权 |
| 自建 JWT | 完全控制 | 开发和维护成本极高 | 超出单人能力 |
| Google OAuth + Supabase（本方案） | 已验证，成本低，功能完整 | 依赖 Supabase 平台 | 已接受 |

## 后果（Consequences）

### 正面
- 海外用户注册转化率提升 30%+（Google 一键登录）
- Supabase 免费版足够支撑早期项目
- 数据存储在自己控制的 Supabase 实例中
- Bob 已有完整的配置经验

### 负面 / 已知风险
- 依赖 Supabase 平台（有停服风险，但可自托管）
- Google Cloud Console 配置需要一定学习成本
- Apple Sign In 需要 Apple Developer 账号（$99/年）

### 触发重新评估的条件
- 当 Supabase 定价大幅上升时
- 当出现更好的 BaaS 方案时

## 实施清单（Implementation）

- [x] Auraloop 项目已完整验证此架构
- [ ] 提取 Google OAuth + Supabase 集成为可复用模板
- [ ] 建立 Supabase Schema 标准库
- [ ] 文档化 Google Cloud Console 配置流程
