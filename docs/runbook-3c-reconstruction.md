# Runbook: 3C 品牌独立站重构与二次建构工作流

**Author:** Manus AI  
**Date:** April 2026  
**Context:** 本文档记录了从大牌 3C 网站（Apple, DJI, Sony, Bose, Insta360, Teenage Engineering）提取设计语言，并基于 React/Vite/TS 进行二次建构的完整标准操作程序（SOP）。

## 1. 核心理念与目标

在进行个人作品集（Portfolio）的案例展示时，直接克隆（Clone）现有网站往往缺乏深度。本工作流的核心在于**「解构与二次建构」**：
通过提取顶级品牌的视觉资产和交互模式，结合用户体验旅程图（User Journey Map），使用现代前端技术栈（React + Framer Motion）重新设计出具有独立叙事弧线的虚构品牌案例。

> **注意：** 所有提取的素材和设计模式仅用于个人学习、作品集展示和非商业用途（Non-commercial use）。

## 2. 工作流 SOP

### 阶段一：素材解压与资产提取 (Asset Extraction)

1. **获取源码与素材**：获取目标网站的静态 HTML/CSS/JS 源码及图片资源压缩包。
2. **目录结构梳理**：解压后，按品牌分类建立独立的素材目录。
3. **图片格式统一化 (WebP)**：
   - 编写 Python 脚本（使用 `Pillow` 库）遍历所有图片。
   - 过滤掉尺寸过小（如宽/高 < 80px）的无用图标。
   - 将所有有效图片（JPG/PNG）统一转换为 `WebP` 格式（Quality=85），以优化加载性能。
   - 处理 RGBA 通道和调色板（P 模式）图片的兼容性转换。
4. **资产入库**：将转换后的 WebP 素材统一存放到公共素材库（如 `client/public/3c-assets/`），按品牌分子目录管理。

### 阶段二：设计语言解构 (Design Deconstruction)

1. **CSS 模式提取**：
   - 分析目标网站的 CSS 文件，提取核心排版网格（如 Apple 的 Bento Grid、DJI 的全屏 Swiper）。
   - 记录品牌的主题色（Accent Color）、字体排印（Typography）和空间留白（Whitespace）规则。
2. **交互模式分析**：
   - 观察滚动侦听（Scroll Spy）、视差效果（Parallax）和元素揭示（Reveal Animations）。
   - 记录特殊交互组件（如 Bose 的降噪滑块、TE 的产品配置器）。

### 阶段三：UX 旅程图规划 (Journey Mapping)

在编写代码前，必须为每个虚构品牌规划独立的用户体验旅程图：

| 品牌原型 | 虚构品牌 | 核心叙事与旅程图 | 关键交互设计 |
| :--- | :--- | :--- | :--- |
| **Apple** | LUMINOS | 极简美学 -> 核心卖点 -> 环保/回收决策 | 视差滚动、Bento Grid、Trade-in 计算器 |
| **DJI** | SKYVEX | 沉浸场景 -> 性能参数 -> 套装对比 | 横向滑动产品展示、Hover 数据揭示 |
| **Insta360** | ORBIVIEW | 极限运动 -> 场景适配 -> 捆绑销售 | 活动卡片展开、Bundle 动态计价 |
| **Bose** | RESONIQ | 听觉痛点 -> 降噪体验 -> 个性化配置 | ANC 实时波形动画、颜色配置器 |
| **Sony** | NEXARA | 品牌历史 -> 多品类矩阵 -> 情感共鸣 | 品类切换 Tab、时间轴视差滚动 |
| **TE** | FORMWERK | 工业极简 -> 模块化组合 -> 极客参数 | 等宽字体排版、配件叠加计算器 |

### 阶段四：React/Vite 二次建构 (Reconstruction)

1. **工程脚手架**：使用 `Vite + React + TypeScript` 搭建多页面或单页路由工程。
2. **样式与动效**：
   - 引入 `Tailwind CSS v4` 进行原子化样式管理。
   - 引入 `Framer Motion` 实现复杂的滚动动画（`useScroll`, `useTransform`）和组件过渡（`AnimatePresence`）。
3. **组件化开发**：
   - 提取公共组件（如统一的 Navigation、Footer、ScrollReveal Hook）。
   - 针对每个品牌的特殊交互（如波形图、配置器）开发独立组件。
4. **数据驱动**：将产品信息、规格参数、价格等提取为常量数组，通过 `map` 渲染，保持 JSX 结构清晰。

### 阶段五：构建与集成 (Build & Integration)

1. **本地验证**：运行 `pnpm dev` 验证所有页面的路由跳转、图片加载和交互动效。
2. **静态构建**：配置 `vite.config.ts`，将构建产物（`dist`）输出到主站工程的 `public` 目录下。
3. **路由适配**：确保使用 `HashRouter` 或正确配置服务器的 fallback 路由，以支持静态文件服务器的 SPA 访问。
4. **版本控制**：将源码和构建产物提交至 GitHub，触发自动化部署（如 Vercel）。

## 3. 总结

通过这一套标准化的工作流，我们不仅能够高效地处理大量零散的网页素材，还能在重构过程中深度学习顶级品牌的设计精髓。最终产出的不再是简单的 HTML 仿站，而是具备完整交互逻辑、工程化结构和独立叙事的高质量 React 应用。
