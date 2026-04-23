# ADR-0026: CDN 与性能优化基线

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Technical
**关联 ADR:** ADR-0021 (关联) / ADR-0022 (关联)

---

## 背景（Context）

海外用户对页面加载速度极其敏感，超过 3 秒的加载时间会导致大量流失。
Google 的 Core Web Vitals 也直接影响 SEO 排名。
Bob 需要一套标准化的性能优化基线，确保所有项目都达到最低性能要求。

## 决策（Decision）

所有项目默认采用以下 CDN 和性能优化策略：

**CDN 策略：**

| 场景 | CDN 选型 | 说明 |
|---|---|---|
| 默认（所有项目） | Cloudflare 免费版 | DDoS 防护 + 全球加速 |
| 高流量项目 | Vercel Edge Network | 与 Vercel 部署深度集成 |
| 企业级项目 | Cloudflare Pro | 高级分析 + 更多规则 |

**性能优化必备清单：**
- WebP 格式图片（自动转换）
- 字体子集化（仅加载使用到的字符）
- Critical CSS 内联（首屏样式）
- Lazy Loading（图片和非关键组件）
- 代码分割（React.lazy + Suspense）

**性能目标（最低要求）：**

| 指标 | 目标值 |
|---|---|
| LCP（最大内容绘制） | < 2.5s |
| CLS（累积布局偏移） | < 0.1 |
| FID / INP | < 200ms |
| Lighthouse Performance | > 85 |

## 备选方案（Alternatives Considered）

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| 无 CDN | 简单 | 性能差，无 DDoS 防护 | 不可接受 |
| AWS CloudFront | 功能强大 | 配置复杂，成本高 | 超出单人运营能力 |
| Cloudflare（本方案） | 免费版功能完整，配置简单 | 部分高级功能需付费 | 已接受 |

## 后果（Consequences）

### 正面
- 全球用户访问速度大幅提升
- SEO 排名因 Core Web Vitals 改善而提升
- DDoS 防护保护客户站点安全

### 负面 / 已知风险
- Cloudflare 免费版有流量限制（对早期项目足够）
- 部分 Cloudflare 功能与 Vercel 有冲突（需要配置 Proxy 模式）

### 触发重新评估的条件
- 当项目流量超过 Cloudflare 免费版限制时
- 当 Vercel + Cloudflare 集成出现问题时

## 实施清单（Implementation）

- [x] portfolio-site 已配置 Cloudflare + Vercel
- [ ] 建立性能监控自动化（Lighthouse CI）
- [ ] 建立图片自动 WebP 转换流程
- [ ] 建立字体子集化标准流程
