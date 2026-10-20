# ccy 的个人网站

基于 [AstroPaper v6.1.0](https://github.com/satnaing/astro-paper/releases/tag/v6.1.0) 改造的中文作品集与博客。原模板采用 MIT 许可，许可证见 [LICENSE](LICENSE)。网站地址：[2008ccy.github.io](https://2008ccy.github.io/)。

## 本地预览

需要 Node.js 22.12 及以上版本和 pnpm。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

浏览器打开 `http://localhost:4321`。发布前运行 `pnpm build`，再运行 `pnpm preview` 检查构建结果。搜索索引在构建时生成，因此本地开发模式不显示完整搜索结果。

## 修改网站内容

| 内容     | 文件位置                       | 编辑方式                |
| -------- | ------------------------------ | ----------------------- |
| 首页介绍 | `src/content/pages/home.md`    | 修改正文与标题、描述    |
| 关于我   | `src/content/pages/about.md`   | 修改正文                |
| 联系方式 | `src/content/pages/contact.md` | 修改正文与 `email` 字段 |
| 作品     | `src/content/projects/*.md`    | 每个文件对应一个作品    |
| 文章     | `src/content/posts/*.md`       | 每个文件对应一篇文章    |

新增作品时，可参照 `src/content/projects/qiushixixing.md`。作品的 `title` 和 `description` 必填；`url`、`status` 可选；`featured: true` 会将作品放到首页；`order` 数值越小越靠前；`draft: true` 会隐藏作品。作品详情来自 Markdown 正文。

新增文章时，在 `src/content/posts/` 建立 `.md` 文件，例如：

```md
---
title: "文章标题"
description: "一句话介绍文章内容。"
pubDatetime: 2026-10-19T12:00:00+08:00
tags: [学习记录]
draft: false
---

从这里开始写正文。
```

`pubDatetime`、`title` 和 `description` 必填。设置 `draft: true` 的文章不会出现在正式网站、搜索或 RSS 中。修改网站名称、社交链接等全局设置，请编辑 `astro-paper.config.ts`；修改导航文字，请编辑 `src/i18n/lang/zh-CN.ts`。

## 发布

此仓库的 `main` 分支推送后会运行 `.github/workflows/deploy.yml`，构建并部署到 GitHub Pages。首次使用工作流发布时，请在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。部署成功后访问 [https://2008ccy.github.io/](https://2008ccy.github.io/)。

### 发布故障排查

本项目使用 Astro 构建。在 Actions 中应查看 **Deploy to GitHub Pages** 工作流的结果。

如果出现 **pages build and deployment / build (dynamic)**，且日志提示 `.astro` 文件的 `Invalid YAML front matter`，说明旧的 Jekyll 发布流程正在把 Astro 源码当作 YAML 解析。请确认 Pages 的 **Source** 已选择 **GitHub Actions**，然后向 `main` 提交更新以验证新的发布流程。切换发布来源不会清除历史提交的失败记录。

需要手动部署时，在 **Actions → Deploy to GitHub Pages → Run workflow** 中选择 `main` 运行。
