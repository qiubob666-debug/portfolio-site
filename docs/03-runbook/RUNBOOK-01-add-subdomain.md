# RUNBOOK-01: 添加新子域名(Vercel + Cloudflare)

**频率:** 高
**预计时间:** 5-10 分钟
**执行者:** Bob / Manus / Cursor
**前置 RUNBOOK:** 无

---

## 前置条件

- [ ] 主域名 `bobqiushao.online` 已在 Cloudflare 托管
- [ ] Cloudflare 通配符 CNAME `*.bobqiushao.online` 已配置(一次性,以后所有子域名都走这条)
- [ ] Vercel 账号已登录,有创建项目权限
- [ ] 要部署的代码已在 GitHub 仓库

---

## 步骤

### Step 1: 一次性配置(只需做一次)

如果 `*.bobqiushao.online` 通配符 CNAME **还未配置**,先做:

```
Cloudflare Dashboard → bobqiushao.online → DNS
增加记录:
  Type:     CNAME
  Name:     *
  Target:   cname.vercel-dns.com
  Proxy:    ⚠️ 关闭(灰色云)
  TTL:      Auto
```

**重要:** Proxy 必须关闭(灰色云),否则 Vercel 无法验证域名所有权。

---

### Step 2: 在 Vercel 创建新项目

```
1. 登录 vercel.com → New Project
2. Import Git Repository → 选择目标 GitHub 仓库
3. Configure Project:
   - Framework Preset: 自动检测(Next.js / Static / 其他)
   - Build Command: npm run build (或自动)
   - Output Directory: dist / .next / out (根据框架)
4. Deploy → 等待首次部署完成(约 30-60 秒)
```

---

### Step 3: 绑定子域名

```
1. Vercel 项目页 → Settings → Domains
2. 输入子域名,如:
   case-jewelry-tiffany.bobqiushao.online
3. Add → Vercel 自动验证(因为通配符 CNAME 已存在,几乎瞬间通过)
4. 等待 SSL 证书签发(自动,通常 < 1 分钟)
5. 看到 ✅ Valid Configuration 即完成
```

---

### Step 4: 验证

```bash
# 终端验证 DNS 是否生效
dig case-jewelry-tiffany.bobqiushao.online

# 浏览器验证 HTTPS
curl -I https://case-jewelry-tiffany.bobqiushao.online
# 期望:HTTP/2 200
```

---

### Step 5: 加入主门户作品集(如适用)

如果这是一个案例项目,执行 RUNBOOK-12: 更新主门户 cases.json。

---

## 预期产出

- ✅ 子域名 `xxx.bobqiushao.online` 可访问
- ✅ HTTPS 自动启用
- ✅ Vercel 项目可独立部署
- ✅ 后续 git push 自动重新部署该子域名

---

## 失败处理

| 失败现象 | 排查步骤 | 解决方案 |
|---|---|---|
| Vercel 显示 "Invalid Configuration" | 检查 Cloudflare 通配符 CNAME 是否存在 | 重新配置 Step 1 |
| 浏览器显示证书错误 | 等 1-3 分钟后再试 | SSL 签发延迟,通常自动恢复 |
| DNS 不解析 | `dig` 检查记录 | TTL 影响,等 5 分钟,或手动 flush DNS |
| Cloudflare Proxy 开了(橙色云) | 改为灰色云(关闭 Proxy) | 必须关闭 |
| 子域名打开 404 | 检查 Vercel 项目是否首次部署成功 | 重新部署 |

---

## 回滚

如果需要移除该子域名:

```
1. Vercel 项目 → Settings → Domains → Remove
2. (可选)删除整个 Vercel 项目
```

注意:Cloudflare 通配符 CNAME 不要删,它服务于所有子域名。

---

## 自动化进度

- [x] 当前:手动(因为创建新项目需要 GitHub repo 已有,无法 100% 自动)
- [ ] 部分自动化目标:
  - 通过 Vercel CLI + GitHub API 实现 CLI 一键创建
  - `bob create-case <case-name>` → 自动创建 repo + Vercel 项目 + 绑定子域名
- [ ] 自动化脚本路径:`tools/scripts/create-subdomain.sh` (待开发)

---

## 客户域名版本

如果客户使用自己的域名(如 client.com),流程类似但 DNS 配置在客户的域名服务商:

```
客户域名服务商(如 Namecheap / GoDaddy / Cloudflare):
配置:
  Type:     CNAME
  Name:     *  (或具体前缀如 shop)
  Target:   cname.vercel-dns.com

Vercel:
  绑定 *.client.com 或 shop.client.com
```

参见 RUNBOOK-02: 客户域名 DNS 配置。
