# 3C 品牌案例 UX 旅程图与设计策略

## 核心理念：从「页面展示」到「购买旅程」

每个 3C 品牌案例不再是简单的信息堆砌，而是基于**消费者购买旅程（Customer Journey Map）**设计的交互式叙事弧线。我们将使用 React + Framer Motion 实现这些交互。

### 旅程阶段定义
1. **Awareness（认知）**：Hero 区，强视觉冲击，建立品牌第一印象。
2. **Interest（兴趣）**：核心卖点区，通过滚动动画或交互式组件展示产品差异化。
3. **Consideration（评估）**：使用场景、技术规格、竞品对比，提供理性决策依据。
4. **Decision（决策）**：CTA、价格锚点、购买保障，促成转化。

---

## 6 个案例的差异化策略

### Case 1: LUMINOS (Apple 风格 - 智能手机)
- **叙事主题**：科技与魔法的交汇（Technology that feels like magic）
- **交互模式**：**视差滚动（Parallax Scrolling）**与**文字渐显（Text Reveal）**
- **UX 旅程**：
  - *Awareness*：极简白底，产品大图缓慢放大，标题逐字浮现。
  - *Interest*：滚动时，手机背面/正面平滑切换，展示不同颜色。
  - *Consideration*：网格化（Bento Grid）展示芯片、相机、电池等特性。
  - *Decision*：Trade-in（以旧换新）计算器交互，降低价格门槛。

### Case 2: SKYVEX (DJI 风格 - 航拍无人机)
- **叙事主题**：重新定义天空（Redefine the Sky）
- **交互模式**：**全屏沉浸（Full-screen Immersion）**与**视频/动图驱动**
- **UX 旅程**：
  - *Awareness*：深色背景，全屏航拍场景图，带轻微的缩放动效。
  - *Interest*：横向滚动（Horizontal Scroll）展示不同机型（旗舰、便携、专业）。
  - *Consideration*：悬停交互（Hover Effects）展示避障、图传距离等硬核数据。
  - *Decision*：套餐对比（单机 vs 畅飞套装），强调「Fly Confident」保障。

### Case 3: ORBIVIEW (Insta360 风格 - 运动相机)
- **叙事主题**：记录一切，不错过任何瞬间（See Everything. Miss Nothing.）
- **交互模式**：**卡片翻转（Card Flip）**与**动态网格（Dynamic Grid）**
- **UX 旅程**：
  - *Awareness*：户外极限运动背景，产品图悬浮（Floating Animation）。
  - *Interest*：瀑布流/不规则网格展示不同运动场景（骑行、潜水、滑雪），点击卡片展开详情。
  - *Consideration*：图标化展示防抖、防水、AI 剪辑等功能。
  - *Decision*：配件捆绑销售（Bundle & Save）交互，提升客单价。

### Case 4: RESONIQ (Bose 风格 - 降噪耳机)
- **叙事主题**：纯粹的沉浸，只听你想听的（Pure Immersion）
- **交互模式**：**音频可视化（Audio Visualization）**与**深色模式（Dark Mode）**
- **UX 旅程**：
  - *Awareness*：深空灰/金属质感背景，声波纹理动画。
  - *Interest*：拖动滑块（Slider）模拟降噪等级调节，背景图从嘈杂变清晰。
  - *Consideration*：3D 旋转或多角度展示耳机材质与佩戴舒适度。
  - *Decision*：沉浸式购买按钮，强调「30天试听」。

### Case 5: NEXARA (Sony 风格 - 全画幅微单)
- **叙事主题**：捕捉光影的极致（Master the Light）
- **交互模式**：**画廊模式（Gallery View）**与**精细排版（Editorial Layout）**
- **UX 旅程**：
  - *Awareness*：日系杂志排版，大面积留白，高对比度摄影作品。
  - *Interest*：点击镜头切换不同焦段的样张（交互式画廊）。
  - *Consideration*：对焦速度、连拍张数等参数的数字滚动动画（Number Counter）。
  - *Decision*：专业摄影师背书（Testimonials），引导购买机身+镜头套装。

### Case 6: FORMWERK (Teenage Engineering 风格 - 便携合成器)
- **叙事主题**：工业设计的玩具（Industrial Playfulness）
- **交互模式**：**像素风/等宽字体（Pixel/Monospace）**与**微交互（Micro-interactions）**
- **UX 旅程**：
  - *Awareness*：亮黄色/橙色高饱和背景，等宽字体排版，产品如玩具般展示。
  - *Interest*：点击按钮播放简短的合成器音效（如果有音频素材）或触发按键按下的 CSS 动画。
  - *Consideration*：爆炸图（Exploded View）或模块化展示内部结构。
  - *Decision*：极简的黑白购买按钮，强调限量或设计感。
