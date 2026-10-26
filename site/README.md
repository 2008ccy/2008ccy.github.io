# 网站骨架

基于 [AstroPaper v6.1.0](https://github.com/satnaing/astro-paper/releases/tag/v6.1.0) 改造，原模板采用 MIT 许可，见 [LICENSE](LICENSE)。

本目录包含网站源代码、静态资源、构建配置及本地依赖。作品、笔记和网站介绍分别读取同级的 `../projects/`、`../note/`、`../pages/`。

在本目录执行 `pnpm dev` 预览，执行 `pnpm build` 构建。完整说明见 [使用与发布说明](../使用与发布说明.md)。

## 推送前自动检查

首次使用或更换电脑后，在本目录执行 `npm run hooks:install`。配置只对当前仓库生效，
由仓库根目录的 `.githooks/pre-push` 执行检查。Git 的钩子配置不会随克隆自动启用。

此后使用终端 `git push` 或 VS Code 推送到远程 `main` 时，会自动运行 `npm run build`，
覆盖笔记头部解析、Astro 检查、网站生成和搜索索引生成。构建失败会阻止推送。
它与 `pnpm build` 执行同一个 `package.json` 构建脚本，钩子只需能找到 Node.js 和 npm，
无需单独安装全局 pnpm。钩子会补充 macOS 常见的 `/usr/local/bin` 和 `/opt/homebrew/bin`
路径，以兼容未继承终端 PATH 的图形界面；自定义 Node.js 安装位置仍需加入 PATH。

检查前需要提交所有工作区改动，并将准备发布的提交检出为当前 `HEAD`。
这能避免检查本地已修复的文件，却推送包含旧错误的提交；检查不会自动暂存或提交文件。
依赖尚未安装时，先执行 `pnpm install --frozen-lockfile`。
推送其他分支及删除远程分支不会触发构建。请保留正常的 Git 钩子执行流程，
`git push --no-verify` 会跳过本地检查。

执行 `npm run hooks:test` 可验证钩子的阻止和放行行为。
