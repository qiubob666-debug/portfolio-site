# ADR-0025: Auraloop Sync 作为 HTML→PHP 同步基础

**日期:** 2026-04-23
**状态:** Accepted
**决策者:** Bob Qiushao
**层级:** Technical
**关联 ADR:** ADR-0022 (上游) / ADR-0003 (关联)

---

## 背景（Context）

在 Headless WP + WC 架构中，设计师通常先用 HTML/CSS 完成视觉设计，再转换为 WordPress PHP 主题文件。
这个转换过程重复、易出错，且难以保持同步。
Bob 在 Auraloop 项目中自建了 Auraloop Sync 工具来解决这个问题。

## 决策（Decision）

静态 HTML 设计 → WordPress 主题 PHP 文件，统一通过 **Auraloop Sync** 工具同步。

**工具特性：**
- 单向同步（HTML→PHP），不会被数据库内容覆盖
- 自动插入 WordPress 钩子（`wp_head` / `wp_body_open` / `wp_footer`）
- 自动生成对应的 PHP 模板片段（`header.php` / `footer.php` / `page-{slug}.php`）
- 支持 Tailwind CSS 的 JIT 编译集成
- 变更检测（仅同步修改的文件）

**工作流：**
```
设计师 → HTML/CSS 静态文件
    ↓ Auraloop Sync
WordPress 主题 PHP 文件
    ↓ git push
Hostinger 自动部署
```

## 备选方案（Alternatives Considered）

| 方案 | 优点 | 缺点 | 为什么没选 |
|---|---|---|---|
| 手动转换 | 无需工具 | 重复劳动，易出错，难同步 | 效率太低 |
| 使用现成 WP 主题框架 | 有文档 | 限制设计自由度 | 与高审美目标冲突 |
| Auraloop Sync（本方案） | 已验证，完全自动化 | 需要维护工具本身 | 已接受 |

## 后果（Consequences）

### 正面
- 设计到上线时间从 2 天缩短到 30 分钟
- 设计师可以专注于 HTML/CSS，无需了解 WordPress
- 同步过程可重复，减少人为错误

### 负面 / 已知风险
- 工具本身需要维护（Bob 是唯一维护者）
- 对非标准 WordPress 结构支持有限

### 触发重新评估的条件
- 当 WordPress 主题架构发生重大变化时
- 当出现更好的 HTML→WP 转换工具时

## 实施清单（Implementation）

- [x] Auraloop Sync 工具已在 Auraloop 项目中验证
- [ ] 将 Auraloop Sync 提取为独立工具库
- [ ] 编写 Auraloop Sync 使用文档
- [ ] 建立 Auraloop Sync 的测试套件
