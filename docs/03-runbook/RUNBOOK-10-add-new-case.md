# RUNBOOK-10: 添加新案例到作品集(30 分钟流程)

**频率:** 高
**预计时间:** 30 分钟
**执行者:** Bob (主) + Cursor (辅)
**前置 RUNBOOK:** RUNBOOK-01 (添加新子域名)

---

## 前置条件

- [ ] 案例代码已开发完成(可以是从 INSPIRE → DISTILL → REMIX 流程产出的)
- [ ] 案例的视觉/交互/内容已确认无误
- [ ] 已确认案例标注类型(Concept / Demo / Live)

---

## 步骤

### Step 1: 命名规范

按 ADR-0035 规范命名:
```
case-{industry}-{style-or-name}

industry: jewelry / watch / factory / ecommerce / personal / brand
style-or-name:
  - 风格化:cartier-style / rolex-style
  - 客户名:harrow / nordic-retailer
  - 项目名:moonbeam-jewelry
```

示例:
- `case-jewelry-cartier-style`
- `case-factory-harrow`
- `case-watch-modern-minimalist`

---

### Step 2: 创建 GitHub 仓库

```bash
# 用模板创建(假设已有模板仓库)
gh repo create bobqiushao/case-{name} \
  --template bobqiushao/template-static-html \
  --private  # 或 --public 看是否对外展示

# Clone
git clone git@github.com:bobqiushao/case-{name}.git
cd case-{name}
```

---

### Step 3: 项目结构标准化

每个案例仓库标准结构:

```
case-{name}/
├── docs/
│   ├── INSPIRE.md      # 灵感来源(从哪些站借鉴)
│   ├── DISTILL.md      # 特征提取分析
│   ├── REMIX.md        # 融合思路说明
│   └── case-study.md   # 给客户看的案例研究
├── src/                # 实际代码
├── public/
│   └── screenshots/    # 至少 3 张:hero / detail / mobile
├── README.md
└── package.json
```

---

### Step 4: 推送到 GitHub

```bash
git add .
git commit -m "feat: initial case launch"
git push origin main
```

---

### Step 5: Vercel 部署 + 子域名挂载

执行 **RUNBOOK-01** 添加子域名 `case-{name}.bobqiushao.online`。

---

### Step 6: 截图

在子域名挂载完成后,截至少 3 张图存到 `public/screenshots/`:

- `hero.png` - 首屏 1920×1080
- `detail.png` - 详情页或核心交互
- `mobile.png` - 移动端 414×800

**重要:** 这些截图后续会用在主门户作品集和销售物料。

---

### Step 7: 更新主门户 cases.json

执行 **RUNBOOK-12** 添加新案例条目。

cases.json 的新条目格式:

```json
{
  "id": "{name}",
  "industry": "Jewelry",
  "name": "Modern Cartier-style Jewelry Brand",
  "tagline": "Editorial luxury with contemporary buying flow",
  "url": "https://case-jewelry-cartier-style.bobqiushao.online",
  "screenshot": "/cases/jewelry-cartier-style.jpg",
  "tags": ["High-end", "Editorial", "DTC"],
  "year": 2026,
  "type": "concept-design",
  "live_status": "concept",
  "tech_stack": ["Next.js", "Tailwind", "Sanity"],
  "capabilities_demonstrated": ["frontend-design", "headless-commerce"]
}
```

`live_status` 取值:
- `concept` - 概念稿
- `demo` - 行业 demo
- `live` - 实际运营中
- `client` - 真实客户案例

---

### Step 8: 主门户重新部署

cases.json 更新后,主门户自动从中读取并重新构建。

```bash
# 在主门户仓库
git add cases.json public/cases/
git commit -m "feat(case): add {name}"
git push origin main
# Vercel 自动部署主门户
```

---

### Step 9: 验证

打开:
- ✅ 子域名 https://case-{name}.bobqiushao.online 可访问
- ✅ 主门户 bobqiushao.online/portfolio 出现新案例卡片
- ✅ 卡片可点击跳转到子域名
- ✅ 截图显示正常,不模糊不变形

---

## 预期产出

- 1 个新 GitHub 仓库
- 1 个新 Vercel 项目
- 1 个新子域名上线
- 主门户作品集 +1 卡片
- 4 份 docs(INSPIRE / DISTILL / REMIX / case-study)

---

## 失败处理

| 失败现象 | 解决方案 |
|---|---|
| 主门户没显示新案例 | 检查 cases.json 语法,重新部署 |
| 截图模糊 | 重新截图,DPR=2 高分辨率 |
| 卡片样式错乱 | 检查 industry / tags 字段值是否在预定义集合内 |
| 子域名 404 | 回到 RUNBOOK-01 排查 Vercel 部署 |

---

## 自动化进度

- [ ] 当前:全手动
- [ ] 短期目标:写 `tools/add-case.sh` 脚本,执行后自动:
  - [ ] 用模板创建 GitHub repo
  - [ ] 创建 Vercel 项目
  - [ ] 绑定子域名
  - [ ] 询问案例元数据,自动写入 cases.json
- [ ] 长期目标:做一个 Bob 内部小工具(Next.js 后台)统一管理

---

## 30 分钟拆解

| 时间 | 任务 |
|---|---|
| 0-5 min | Step 1-3: 命名 + 创建仓库 + 结构化 |
| 5-15 min | Step 4-5: 部署 + 子域名挂载 |
| 15-20 min | Step 6: 截图 |
| 20-28 min | Step 7-8: 更新 cases.json + 主门户部署 |
| 28-30 min | Step 9: 验证 |

**注:** 这是熟练后的时间。前 3 次可能需要 1 小时。
