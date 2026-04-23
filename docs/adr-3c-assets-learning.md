# ADR: 3C 案例素材拓展与学习架构决策记录

**Author:** Manus AI  
**Date:** April 2026  
**Status:** Accepted  

## 1. 背景 (Context)

在构建个人作品集（Portfolio）的 3C 数码品类案例时，最初的方案是使用纯 CSS 几何图形（如手机轮廓、耳机线框）来模拟产品。这种方式虽然轻量，但缺乏真实感和视觉冲击力，无法达到顶级 3C 品牌（如 Apple, DJI, Sony）的沉浸式体验标准。

为了提升案例的视觉完成度和交互深度，我们需要引入真实的高清产品摄影图，并基于这些素材重构整个前端架构。同时，我们需要建立一套可持续的素材处理和学习机制，以便未来扩展更多品牌案例。

## 2. 决策 (Decision)

我们决定采用以下架构和工作流来处理 3C 案例的素材拓展与学习：

### 2.1 素材处理与存储策略

- **统一格式**：所有提取的图片素材（JPG/PNG）必须通过 Python 脚本批量转换为 `WebP` 格式（Quality=85）。
- **目录结构**：在 `client/public/` 下建立独立的 `3c-assets/` 目录，与现有的 `jewelry-cases/` 并列。按品牌（如 `apple/`, `dji/`, `sony/`）分子目录管理。
- **过滤机制**：在转换过程中，自动过滤掉尺寸过小（宽/高 < 80px）的无用图标，仅保留高质量的产品图和场景图。

### 2.2 前端架构升级

- **技术栈迁移**：从纯 HTML/CSS 静态页面升级为 `Vite + React + TypeScript` 单页应用（SPA）。
- **样式方案**：引入 `Tailwind CSS v4` 进行原子化样式管理，提高开发效率和样式复用率。
- **动效引擎**：使用 `Framer Motion` 实现复杂的滚动侦听（Scroll Spy）、视差效果（Parallax）和组件过渡动画。
- **路由方案**：使用 `HashRouter`（而非 `BrowserRouter`），以确保构建产物在静态文件服务器（如 GitHub Pages, Vercel 静态托管）上能够正确处理路由跳转。

### 2.3 学习与重构方法论

- **交叉学习 (Cross-Learning)**：不局限于单一品牌的克隆。例如，在设计虚构品牌 SKYVEX（DJI 风格）时，可以借鉴 Insta360 的全屏沉浸式视频布局；在设计 RESONIQ（Bose 风格）时，可以引入类似 Apple 的滚动揭示动画。
- **体验旅程图驱动 (Journey Map Driven)**：每个案例必须基于特定的消费者购买旅程（认知 -> 兴趣 -> 评估 -> 决策）来设计叙事弧线，而不仅仅是堆砌组件。
- **非商业用途声明**：在所有案例的 Footer 明确标注虚构品牌声明，并说明图片素材来源于真实品牌网站，仅用于非商业学习和作品集展示。

## 3. 结果 (Consequences)

### 3.1 积极影响 (Positive)

- **视觉质量飞跃**：引入真实高清 WebP 素材后，案例的沉浸感和专业度大幅提升，达到了甚至超越了现有珠宝案例的水准。
- **交互体验增强**：React + Framer Motion 的组合使得实现复杂的交互（如 Bose 的 ANC 波形动画、TE 的产品配置器）变得简单且流畅。
- **工程化沉淀**：建立了一套标准化的素材处理脚本和 React 组件库，未来新增品牌案例的开发成本将显著降低。
- **知识库积累**：将整个工作流沉淀为 Runbook 和 ADR，丰富了个人知识库，体现了系统性的思考和架构能力。

### 3.2 消极影响与风险 (Negative & Risks)

- **包体积增加**：引入 React 和 Framer Motion 会增加 JS Bundle 的体积（目前约 450KB）。需要配置 Vite 的代码分割（Code Splitting）和 Gzip 压缩来优化加载速度。
- **素材版权风险**：虽然声明了非商业用途，但直接使用大牌产品图仍存在潜在的版权争议。未来可考虑使用 AI 生成（如 Midjourney）的高质量虚构产品图来替代。

## 4. 参考文献 (References)

- [1] [Vite Documentation](https://vitejs.dev/guide/)
- [2] [Framer Motion API](https://www.framer.com/motion/)
- [3] [WebP Image Format](https://developers.google.com/speed/webp)
