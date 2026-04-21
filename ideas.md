# 个人作品集网站设计方案

## 设计背景
用户是一名全栈开发者，拥有 TypeScript/React 前端、Python/FastAPI 后端、Docker 基础设施、n8n 自动化等完整技术栈。网站需要向潜在客户展示技术能力与作品集，提升个人品牌形象。

---

<response>
<probability>0.07</probability>
<text>

## 方案 A：极简工程美学 (Minimal Engineering Aesthetic)

**Design Movement**: Swiss International Style + Brutalist Typography

**Core Principles**:
1. 信息密度优先——每个像素都服务于内容，拒绝装饰性元素
2. 网格即结构——使用严格的 12 列网格，所有元素对齐于基准线
3. 对比即层次——通过字重、尺寸和留白创造视觉层次，而非颜色
4. 代码即美学——代码片段、终端风格的排版作为装饰元素

**Color Philosophy**: 近乎单色调。背景 `#F5F4F0`（暖白纸张感），文字 `#1A1A1A`（近黑），唯一强调色 `#FF3B30`（工程警示红）。颜色传递精准与严肃。

**Layout Paradigm**: 非对称双栏布局。左侧 1/3 为固定导航与身份标识，右侧 2/3 为滚动内容区。Hero 区域使用超大字号（clamp 6vw-12vw）的职位标题打破常规。

**Signature Elements**:
1. 等宽字体（JetBrains Mono）用于所有技术标签和代码展示
2. 细线分割符（1px border）替代卡片阴影
3. 鼠标悬停时文字下划线动画（从左到右展开）

**Interaction Philosophy**: 克制的微交互。无滚动视差，无大型动画。只有精确的 hover 状态变化（颜色翻转、下划线）。

**Animation**: 页面加载时，内容从下方 20px 淡入（stagger 0.1s 间隔）。无其他动画。

**Typography System**: 
- 标题: `Space Grotesk Bold` (700)
- 正文: `Inter Regular` (400)  
- 代码: `JetBrains Mono`
- 层级: 72px / 48px / 32px / 20px / 16px / 14px

</text>
</response>

<response>
<probability>0.08</probability>
<text>

## 方案 B：暗夜技术美学 (Dark Tech Aesthetic) ← 选定方案

**Design Movement**: Cyberpunk Minimalism + Terminal Noir

**Core Principles**:
1. 深色背景营造专注感——深海蓝黑色背景，让代码和内容成为主角
2. 发光效果作为层次工具——微妙的 glow 效果替代传统阴影，传递数字感
3. 动态线条作为装饰——细线、网格、扫描线作为背景纹理
4. 渐变作为品牌语言——从电光蓝到青绿的渐变贯穿整个设计

**Color Philosophy**: 背景 `#0A0F1E`（深海蓝黑），主强调色 `#00D4FF`（电光青蓝），次强调色 `#7C3AED`（深紫），文字 `#E2E8F0`（冷白）。传递技术深度与前沿感。

**Layout Paradigm**: 全屏滚动式单页应用。Hero 区域占满视口，配合粒子/网格背景动画。各 Section 之间使用渐变过渡而非硬切割。左侧固定导航点（bullet navigation）。

**Signature Elements**:
1. 打字机效果的职位标题动画
2. 技术标签使用终端风格的 `<tag>` 样式
3. 项目卡片悬停时边框发光（box-shadow glow）

**Interaction Philosophy**: 沉浸式体验。滚动触发动画，鼠标移动影响背景粒子，hover 时卡片微微上浮并发光。

**Animation**: 
- Hero: 打字机效果 + 背景网格渐显
- Section 进入: 从左侧滑入（translateX -30px → 0）
- 卡片 hover: translateY -4px + glow shadow
- 技能条: 滚动触发宽度动画

**Typography System**:
- 标题: `Syne Bold` (700-800)
- 正文: `DM Sans Regular` (400)
- 代码: `Fira Code`
- 层级: 80px / 56px / 36px / 24px / 16px / 13px

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## 方案 C：有机现代主义 (Organic Modernism)

**Design Movement**: Bauhaus + Contemporary Editorial

**Core Principles**:
1. 几何形状作为装饰——圆形、半圆、矩形的有机组合
2. 大胆的色块分区——不同 Section 使用不同背景色块
3. 超大排版作为视觉锚点——职位名称以超大字号横跨整个宽度
4. 不对称平衡——内容左右交替排列，创造动态节奏感

**Color Philosophy**: 奶油白 `#FAFAF7` 为主背景，深赭石 `#2D1B00` 为文字，亮橙 `#FF6B2B` 为强调色，浅绿 `#B8E0C8` 为辅助色。温暖、有活力、与众不同。

**Layout Paradigm**: 杂志式布局。每个 Section 都有独特的排版结构，避免重复的卡片网格。使用 CSS Grid 创造不规则的内容区域。

**Signature Elements**:
1. 大号圆形头像配合几何装饰图形
2. 项目展示使用横向滚动的 Carousel
3. 技能展示使用气泡/标签云形式

**Interaction Philosophy**: 流畅自然。滚动时内容柔和淡入，hover 时颜色温和变化。强调内容的可读性而非炫技。

**Animation**: 
- 进入动画: opacity 0→1 + scale 0.95→1（弹性缓动）
- 色块背景: 滚动时颜色平滑过渡
- 卡片 hover: 背景色变化 + 轻微上浮

**Typography System**:
- 标题: `Playfair Display Bold` (700)
- 正文: `Source Sans 3 Regular` (400)
- 强调: `Playfair Display Italic`
- 层级: 96px / 64px / 40px / 28px / 18px / 14px

</text>
</response>

---

## 选定方案：方案 B — 暗夜技术美学

选择理由：与用户的技术背景（全栈开发、自动化、基础设施）高度契合，深色主题在技术圈中专业感强，能有效展示代码和技术栈，且与用户现有项目（AuraLoop、Terra Sigil）的视觉风格保持一致。
