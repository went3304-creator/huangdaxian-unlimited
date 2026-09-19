# 黄大仙线上抽签（无限版）

这是允许重复抽签的静态网站版本。网页文件均位于 `public/`。

## Cloudflare Workers 部署

1. 在 Cloudflare Workers 创建名为 `huangdaxian-unlimited` 的 Worker。
2. 在该 Worker 的 **Settings → Builds** 连接此 GitHub 仓库的 `main` 分支。
3. 每次推送代码到 GitHub，Cloudflare 会自动发布。

本项目不存储用户资料或抽签记录。
