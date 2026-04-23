# RUNBOOK-30: 周日学习整理(INSPIRE → DISTILL)

**频率:** 周频(每周日 1 小时)
**预计时间:** 60 分钟
**执行者:** Bob (主) + Claude (辅)
**前置 RUNBOOK:** 无
**关联 ADR:** ADR-0035

---

## 为什么必须做

学习如果不沉淀,等于没学。

> 看过的顶级网站 3 个月后想不起细节,收藏的 UI 素材库永远在收藏夹吃灰。

每周 1 小时的整理,换来一年后 200+ inspiration、50+ distill 的可调用资产。

---

## 前置条件

- [ ] 本周已收集到的素材(浏览器收藏 / 截图 / 笔记)
- [ ] 一个安静的 1 小时块(避免被打断)

---

## 步骤

### Step 1: 收集本周吸收(15 min)

打开本周记录的所有源:
- 浏览器收藏夹 / Bookmarks
- 桌面 / 截图文件夹
- 微信收藏
- Twitter 收藏
- 任何"我看到觉得不错"的东西

**目标:** 把它们全部转移到 `05-capability-library/inspiration/` 目录。

**命名规范:**
```
YYYY-MM-DD-{type}-{name}.md
```

`type` 取值:
- `website` - 整站灵感
- `interaction` - 单个交互模式
- `tool` - 新工具/库
- `tech` - 新技术/方法
- `ui-library` - UI 素材库
- `article` - 文章/教程

**示例:**
- `2026-04-23-website-cartier-jewelry.md`
- `2026-04-23-tool-framer-motion-3.md`

---

### Step 2: 用最小 INSPIRE 模板填写(20 min)

每个 inspiration 文件最少包含:

```markdown
---
source_url: https://...
captured_at: 2026-04-23
type: website
tags: [jewelry, luxury, editorial]
distilled: false
---

# {简短标题}

## 一句话:为什么我觉得它值得记下

[一句话即可,真的就一句话]

## 截图

![hero](./screenshots/2026-04-23-cartier-hero.png)
```

**关键纪律:**
- 不要追求完美,先存下来
- 一句话足够,详细分析放到 DISTILL 阶段
- 截图必须有,文字描述不替代视觉

---

### Step 3: 选 1-3 条做 DISTILL(20 min)

不是所有 inspiration 都需要 DISTILL,只挑**最有可能用上的 1-3 条**。

DISTILL 用完整模板:

```markdown
---
inspiration_ref: 2026-04-23-website-cartier-jewelry.md
distilled_at: 2026-04-23
distilled_by: Bob + Claude
---

# DISTILL · Cartier.com

## Visual Characteristics
- 主色:#A8001D (Cartier Red)
- 字体:类 Didot
- 网格:12 列,大量留白
- 摄影:产品居中 + 黑色背景 + 顶光

## Interaction Patterns
- Hover:产品图缓慢放大 1.05x,2s
- 滚动:Lenis 平滑滚动
- 加载:5s 品牌 logo 动画

## Content Architecture
- Hero:大图 + 一句诗意标语
- About:5 段历史叙事
- Product:每款产品 1500+ 字故事

## Score (1-10)
- Visual: 9
- Interaction: 7
- Content Architecture: 10
- Tech Implementation: 8

## What to Borrow
- 产品摄影质感
- 编辑式排版
- 留白尺度

## What to Avoid
- 过度缓慢的加载动画(小品牌不适用)
- 5 段历史叙事(只适合 100 年品牌)

## Code Snippets (if any)
\`\`\`css
/* 提取的关键样式 */
\`\`\`
```

完成后,把对应 inspiration 文件 frontmatter 的 `distilled: false` 改为 `true`。

---

### Step 4: 标记本周输出(5 min)

更新 `05-capability-library/weekly-log.md`:

```markdown
## Week of 2026-04-21

### INSPIRE 新增 (X 条)
- 2026-04-23-website-cartier-jewelry.md
- 2026-04-23-tool-framer-motion-3.md
- ...

### DISTILL 完成 (X 条)
- DISTILL-cartier.md
- ...

### 本周关注主题
[简短描述这周看的东西的共同主题,如果有]

### 下周想探索
[一句话]
```

---

## 预期产出

每周稳定:
- 5-15 条 INSPIRE
- 1-3 条 DISTILL
- 1 条 weekly-log

一年(50 周):
- 250-750 条 INSPIRE
- 50-150 条 DISTILL
- 完整学习时间线

---

## 失败处理

| 失败现象 | 解决方案 |
|---|---|
| 一周内忘了收集 | 周日整理时回忆,能想起多少算多少,不强迫 |
| 收集了 30 条没时间 INSPIRE 模板填写 | 分两周做完,优先填截图清晰的 |
| DISTILL 写不出来 | 说明 INSPIRE 时还不够清楚为什么留它,可以暂时跳过 |
| 周日没空 | 顺延到周一上午,但绝不超过周二 |

---

## 月度复盘

每月最后一个周日,额外花 30 分钟:

1. 回看本月所有 DISTILL,找出共性
2. 是否能提炼出一个"设计模式"?(如:"奢侈品站的 Hero 都用全屏黑色 + 单一字体")
3. 写到 `05-capability-library/patterns/` 目录

3 个月后会有 3-9 个设计模式。1 年后可能 12-30 个。
**这些模式直接可以应用到任何新案例。**

---

## 自动化进度

- [ ] 当前:全手动
- [ ] 短期目标:写浏览器扩展,一键截图 + 保存到本地 inspiration 目录
- [ ] 中期目标:周日 Claude 自动整理 + 提示 Bob 哪些值得 DISTILL
- [ ] 长期目标:学习行为日志化,可视化展示
