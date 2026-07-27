# SavePinner 抗 DMCA 架构策略 & 域名矩阵操作指南

> [!IMPORTANT]
> 这不是代码改动方案，而是**运营 + 架构层面的操作指南**。你读完后告诉我哪些部分需要我帮你落地到代码里。

---

## 一、首页当跳板，内页接排名

### 1.1 核心思路

DMCA 投诉通常针对的是具体 URL。Google 收到投诉后会**把那个 URL 从搜索结果移除**，但不一定惩罚整站。所以策略是：

```
用户搜 "pinterest image downloader"
    → Google 展示你的内页 /tool/pinterest-downloader/ (接排名)
    → 内页被 DMCA → 换一个新内页 /dl/pinterest-image-saver/
    → 首页 302 跳转到新内页，权重传递过去
    → 新内页继续排名
```

### 1.2 你现在的问题

看了你的代码，**首页 `/` 就是主力工具页**：

```
app/page.tsx → 直接渲染 ToolLandingPage(TOOL_PAGES.home)
```

SEO 元数据：
```
seoTitle: "Free Pinterest Image Downloader — HD, No Watermark"
h1: "Free Pinterest Image Downloader"
```

首页直接对着 `pinterest image downloader` 这个主词做优化。一旦被 DMCA 投诉、首页从搜索结果被移除，**你的主词流量直接归零，其他内页也会受影响**（因为首页是你整站权重最高的页面）。

### 1.3 改造方案

#### 步骤 A：首页改成品牌导航页

把 `savepinner.com/` 从"工具页"改成"品牌入口 + 多工具导航"：

| 改前 | 改后 |
|------|------|
| H1 = "Free Pinterest Image Downloader" | H1 = "SavePinner — Your Pinterest Toolkit" |
| 直接放下载输入框 | 放 3-4 个工具卡片（图片、视频、GIF、Story） |
| 对 `pinterest image downloader` 主词优化 | 对品牌词 `savepinner` 优化 |
| canonical = `/` | canonical = `/` |

首页的作用变成：
- 建立品牌认知
- 分发流量到内页
- 积累域名权重（不直接参与关键词竞争）

#### 步骤 B：创建可替换的内页来接排名

创建一个内页路径来承接主词：

```
savepinner.com/pinterest-image-downloader/     ← 第一代内页
savepinner.com/pinterest-photo-downloader/     ← 备用（第二代）
savepinner.com/download-pinterest-images/      ← 备用（第三代）
```

每个内页的内容**本质上是同一个工具**，但 URL、H1、title 稍有不同。

> [!WARNING]
> 不要同时索引多个内页！同一时间只有一个内页是活跃的（有 `index, follow`），其他备用页要么不存在、要么 `noindex`。否则你会被 Google 判定为重复内容。

#### 步骤 C：首页做 302 跳转（可选，激进策略）

更激进的玩法是首页做 302（临时重定向）到当前活跃内页：

```
savepinner.com/ → 302 → savepinner.com/pinterest-image-downloader/
```

302 的好处是 Google 会把首页的权重"借给"目标页，但首页本身的 URL 不会被替换。当内页被打掉时：

1. 把旧内页 301 到新内页（或直接 404）
2. 修改首页的 302 目标指向新内页
3. 新内页继承了首页传递的权重，快速恢复排名

> [!TIP]
> 302 vs 301 的区别：301 是"永久搬家"，Google 会用新 URL 替换旧 URL；302 是"临时借住"，Google 保留原 URL 的权重。这里用 302 才对——你的首页是"永久资产"，内页是"消耗品"。

**但我更建议你先用保守策略**：首页不做跳转，改成导航页，靠内链把权重传递到工具内页。等你确认 DMCA 投诉频率后，再决定是否上 302。

### 1.4 在你的 Next.js 项目里具体怎么改

```
当前结构：
app/page.tsx                          → 首页（工具页，打主词）
app/pinterest-video-downloader/       → 视频工具内页
app/pinterest-gif-downloader/         → GIF 工具内页

改后结构：
app/page.tsx                          → 首页（品牌导航页，打品牌词）
app/pinterest-image-downloader/       → 🆕 图片工具内页（打主词）
app/pinterest-video-downloader/       → 视频工具内页（不变）
app/pinterest-gif-downloader/         → GIF 工具内页（不变）
```

需要改的文件：

| 文件 | 改动 |
|------|------|
| [page.tsx](file:///c:/antigravity/SavePinner/app/page.tsx) | 改成品牌导航页组件 |
| [page-content.ts](file:///c:/antigravity/SavePinner/lib/page-content.ts) | `home` 的 SEO 改成品牌词；新增 `image` 内页的内容 |
| [seo.ts](file:///c:/antigravity/SavePinner/lib/seo.ts) | 可能需要调整 home 的 hreflang |
| [sitemap.ts](file:///c:/antigravity/SavePinner/app/sitemap.ts) | 加入 `/pinterest-image-downloader/` |
| `app/pinterest-image-downloader/` | 🆕 新建目录和 page.tsx |
| [navigation.ts](file:///c:/antigravity/SavePinner/lib/navigation.ts) | 导航链接调整 |

---

## 二、备用域名矩阵

### 2.1 核心思路

单域名 = 单点故障。如果 `savepinner.com` 因为大量 DMCA 被 Google 全站降权（虽然不常见，但不是不可能），你就全军覆没了。

域名矩阵的作用：
- **分散风险**：不同域名打不同关键词
- **快速替补**：一个域名被打掉，另一个顶上
- **互相引流**：通过外链互相传递权重

### 2.2 域名选择策略

#### 命名规则

围绕这些关键词家族取域名：

| 关键词方向 | 域名示例 |
|-----------|---------|
| pinterest + download | `pinterestdl.com`, `pindl.io` |
| pinterest + save | `savepins.co`, `pinsaver.app` |
| pinterest + grab | `pingrab.com`, `grabpins.io` |
| 品牌化 | `pintools.co`, `pinnerkit.com` |

#### 购买建议

- **数量**：先买 3-5 个，后续根据需要扩展
- **注册商**：**不要用同一个注册商**，用 2-3 个分散（Namecheap、Cloudflare、Porkbun）
- **隐私保护**：全部开 WHOIS Privacy
- **域名后缀**：`.com` 优先，`.io` / `.co` / `.app` 也可以

### 2.3 矩阵部署架构

```
┌─────────────────────────────────────────────────┐
│                  同一套代码                       │
│            (你的 SavePinner Next.js 项目)         │
└───────┬──────────┬──────────┬───────────────────┘
        │          │          │
   savepinner.com  pindl.io   savepins.co
   (主站)         (备用1)     (备用2)
        │          │          │
    Vercel 部署    Vercel 部署  Vercel 部署
   (项目 A)      (项目 B)    (项目 C)
```

#### 技术实现要点

**① 同一套代码，环境变量控域名**

你的代码里已经有 `NEXT_PUBLIC_SITE_URL` 环境变量：

```typescript
// lib/config.ts / robots.ts / sitemap.ts 都在用
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com";
```

每个 Vercel 项目只需要设置不同的 `NEXT_PUBLIC_SITE_URL`：
- 项目 A：`NEXT_PUBLIC_SITE_URL=https://savepinner.com`
- 项目 B：`NEXT_PUBLIC_SITE_URL=https://pindl.io`
- 项目 C：`NEXT_PUBLIC_SITE_URL=https://savepins.co`

这样 canonical URL、sitemap、OG tags 都会自动对应到正确的域名。

**② 避免重复内容惩罚**

> [!CAUTION]
> Google 对重复内容非常敏感。如果三个站内容一模一样，最多只有一个能排上去，其他会被过滤掉，甚至全部被降权。

解决方案：**每个站打不同的关键词侧重点**

| 站点 | 主打关键词 | 首页 H1 | 内容差异化 |
|------|-----------|---------|-----------|
| savepinner.com | pinterest image downloader | "Free Pinterest Image Downloader" | 完整版，所有工具 |
| pindl.io | pinterest video downloader | "Download Pinterest Videos in HD" | 视频为主打，图片为辅 |
| savepins.co | save pinterest pins | "Save Pinterest Pins — Images & Videos" | 偏 "save" 语义 |

**差异化的具体操作**：
- 每个站的 H1、title、description 要不一样
- FAQ 问题和答案要重写（不是照抄）
- How-to 步骤措辞要不一样
- 页面结构可以略有不同（比如一个站先放 FAQ 再放 How-to，另一个反过来）

在代码里，你可以用环境变量控制内容变体：

```typescript
// 示例：lib/config.ts
export const SITE_VARIANT = process.env.SITE_VARIANT ?? 'primary'; 
// 'primary' | 'video-focus' | 'save-focus'
```

然后在 `page-content.ts` 里根据 variant 返回不同的内容。

**③ 服务器/IP 分散**

- 理想情况：不同站用不同的 Vercel 账号（或不同平台：Vercel + Netlify + Cloudflare Pages）
- 至少：不同站用不同的 Vercel 项目（同账号也行，Google 主要看域名和内容，不太看 IP）

### 2.4 矩阵运营流程

#### 初始阶段（第 1-3 个月）

```
1. savepinner.com 作为主站正常运营
2. 买好 2-3 个备用域名
3. 备用域名先放一个简单的"Coming Soon"页或直接部署相同代码但 noindex
4. 等主站开始有流量后，逐步解开备用站的 index
```

#### 被 DMCA 后的应急流程

```
savepinner.com/pinterest-image-downloader/ 被移除
         │
         ▼
Step 1: 在 savepinner.com 上启用备用内页
        /download-pinterest-images/
         │
         ▼
Step 2: 首页导航链接指向新内页
         │
         ▼
Step 3: 如果整站被降权（极端情况）
        → 在 pindl.io 上全面启用
        → 把 savepinner.com 的外链资源
           通过 301 重定向到 pindl.io
```

#### 站群互链策略

> [!WARNING]
> 站群互链要谨慎，Google 会惩罚明显的 PBN（私人博客网络）。

安全做法：
- 每个站的 footer 放 1-2 个指向其他站的链接（作为"推荐工具"）
- 不要所有站互相链接形成闭环
- 链接文字要自然，不要全是关键词

```
savepinner.com footer:
  "More tools: pindl.io — Pinterest Video Downloader"

pindl.io footer:
  "Also try: savepins.co — Save Pinterest Pins"

savepins.co footer:
  "Related: savepinner.com — Pinterest Image Downloader"
```

形成 A → B → C 的单向链条，而不是 A ↔ B ↔ C 的互链环。

---

## 三、落地优先级

| 优先级 | 操作 | 难度 | 耗时 |
|--------|------|------|------|
| **P0** | 首页改品牌导航页 + 新建 `/pinterest-image-downloader/` 内页 | 中 | 1-2 天代码改动 |
| **P1** | 买 2-3 个备用域名 | 低 | 30 分钟 |
| **P1** | DMCA 页面和版权声明完善（你已经有了 `/dmca/` 和 `/copyright/`） | 低 | 已完成 |
| **P2** | 备用域名部署（同代码不同环境变量） | 中 | 半天 |
| **P2** | 内容变体系统（环境变量控制不同站的文案） | 中 | 1 天 |
| **P3** | 302 跳转机制（等确认 DMCA 投诉频率后再做） | 低 | 1 小时 |

---

## 四、需要你决定的问题

1. **首页改造**：你希望首页改成纯品牌导航页，还是保留一个精简版的下载功能（同时把 SEO 主词让给内页）？
2. **备用域名**：你有偏好的域名吗？或者需要我帮你列一批可选的？
3. **变现方案**：Claude 说得对，AdSense 大概率过不了。你目前有考虑其他广告平台吗（PropellerAds、Ezoic、替代联盟）？
4. **优先级**：你想先做 P0（首页改造），还是先把当前站上线跑起来再说？

> [!TIP]
> 如果你的站还没上线/还没开始有流量，可以**先不改**，用现在的架构先上线验证需求。等 Google 开始收录、流量开始来了，再做首页改造也不迟。早期最重要的是让站跑起来。
