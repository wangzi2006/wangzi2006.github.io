---
title: 本地预览与 GitHub Pages 发布
---


如果以后要改名：

```
git config core.ignorecase false
git mv -f content/current.md content/tmp.md
git mv -f content/tmp.md content/Current.md
git commit -m "chore: rename"
git push
```

----


本文用于记录两件事：
1) 更新内容/配置后，如何在本地查看效果；
2) 完成后，如何推送并发布到 GitHub Pages。

在开始之前先确认一件事：**是否要发布到公网**。

- 只在本地自用：不需要上传到 GitHub。
- 需要用 GitHub Pages 公开访问：需要把这份 Quartz 代码推到你自己的 GitHub 仓库（Actions 在云端构建并部署）。

## 0. 选择发布方式（根站点 vs 子路径站点）

GitHub Pages 有两种常见形态：

1) **用户站点（根站点）**：`https://<username>.github.io/`
  - 对应仓库名必须是：`<username>.github.io`
  - 你想要的 `https://wangzi2006.github.io/` 就属于这种
  - 注意：如果你已经有同名仓库/已有个人主页内容，这会覆盖掉原内容（除非你把原内容迁进 Quartz）

2) **项目站点（子路径）**：`https://<username>.github.io/<repo>/`
  - 仓库名可以任意
  - 适合你“先做一个子页面”的需求，不影响根站点现有内容

如果你不确定：
- **根站点现在还没内容** → 选“用户站点”
- **根站点已有内容/不想覆盖** → 选“项目站点（子路径）”

## 1. 更新之后如何在本地查看

### 1.1 安装/更新依赖（首次或依赖变更时）

在仓库根目录（包含 `package.json` 的那个 `quartz/` 目录）运行：

```powershell
npm i
```

### 1.2 本地预览（推荐）

启动本地预览服务（默认 `http://localhost:8080`）：

```powershell
npm run dev
```

- 修改 `content/` 下的 Markdown：会自动增量重建并刷新。
- 修改 `quartz.config.ts`/`quartz.layout.ts`：一般也能热重载；如遇到异常，`Ctrl+C` 停掉后重新 `npm run dev`。

### 1.3 只构建不启动服务（可选）

只生成静态站点文件到 `public/`：

```powershell
npm run build
```

> `public/` 默认在 `.gitignore` 里，不需要提交到 Git。

### 1.4 如果你不在仓库根目录（可选）

如果你的当前目录不是 `...\8-Quartz\quartz`，可以用 `--prefix` 指定路径：

```powershell
npm --prefix "E:\Ceva\Important\4-college\6-entertain\8-Quartz\quartz" run dev
```

## 2. 完成之后如何 push 到 GitHub Pages 上

Quartz 的 GitHub Pages 发布方式是：在 GitHub Actions 里构建（生成 `public/`），再把构建产物部署到 Pages。

### 2.1 设置 `baseUrl`（部署前必做）

编辑 `quartz.config.ts` 里的 `configuration.baseUrl`（影响 RSS / sitemap / 绝对链接生成；部署到 Pages 前务必配置正确）。

- **用户/组织站点**（仓库名必须是 `<username>.github.io`）：
  - `baseUrl: "<username>.github.io"`
- **项目站点**（最常见：仓库名任意）：
  - `baseUrl: "<username>.github.io/<repo>"`

你的目标如果是根站点：

```ts
configuration: {
  // ...
  baseUrl: "wangzi2006.github.io",
}
```

示例（项目站点）：

```ts
configuration: {
  // ...
  baseUrl: "yourname.github.io/your-repo",
}
```

### 2.2 新建 GitHub Pages 部署工作流

创建文件：`.github/workflows/deploy.yml`

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm ci

      - name: Build Quartz
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> 说明：仓库自带的一些 workflow 只在原仓库 `jackyzha0/quartz` 才会跑（有 `if: github.repository == ...` 条件）。你自己的仓库发布 Pages 建议用上面这个独立工作流。

### 2.3（第一次必做）在 GitHub 创建你自己的仓库

按你选择的发布方式创建仓库：

- **用户站点（根站点）**：创建仓库 **`wangzi2006.github.io`**
- **项目站点（子路径）**：创建任意仓库名（例如 `quartz-notes`）

建议：创建仓库时先不要勾选 “Add a README / .gitignore / License”（保持空仓库），这样本地 push 更省事。

### 2.4（第一次必做）把 remote 设置成你自己的仓库

你现在是从官方仓库 clone 的，当前 `origin` 仍指向 `jackyzha0/quartz`，你没有权限 push。

在本地仓库根目录运行：

```powershell
git remote -v
```

推荐做法是：把官方仓库改名为 `upstream`，再把你自己的仓库设为 `origin`。

```powershell
# 1) 把现有 origin 改名为 upstream（如果 upstream 已存在会报错，此时跳过）
git remote rename origin upstream

# 2) 添加你自己的仓库为 origin（把下面 URL 换成你自己的）
git remote add origin git@github.com:wangzi2006/wangzi2006.github.io.git

# 3) 确认 remote
git remote -v
```

如果你选的是“项目站点（子路径）”，把仓库地址换成你的项目仓库即可（例如 `git@github.com:wangzi2006/quartz-notes.git`）。

### 2.5 提交并推送到 GitHub

```powershell
git add -A
git commit -m "chore: update quartz content"
git push -u origin v4
```

之后的日常更新就用：

```powershell
git add -A
git commit -m "docs: update"
git push
```

### 2.6 在 GitHub 仓库启用 Pages

1. 进入 GitHub 仓库 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**

之后每次你 `git push` 到 `v4`，Actions 会自动构建并部署。

### 2.7 查看部署结果

- 打开仓库的 **Actions** 标签页，确认 `Deploy Quartz site to GitHub Pages` 工作流成功。
- 站点地址通常是：
  - 项目站点：`https://<username>.github.io/<repo>/`
  - 用户/组织站点：`https://<username>.github.io/`

> 如果页面 404 或资源路径不对，优先检查 `baseUrl` 是否和你的 Pages 地址一致。

### 2.8 常见报错：environment protection rules（部署被拒）

如果 Actions 里出现类似报错：

- `Branch "v4" is not allowed to deploy to github-pages due to environment protection rules.`
- `The deployment was rejected or didn't satisfy other protection rules.`

这是 GitHub 的 **Environment 保护规则** 把部署拦住了（不是 Quartz 构建失败）。按下面做：

1. 打开仓库页面 → **Settings**
2. 左侧找到 **Environments**
3. 点击 **github-pages**
4. 在 **Deployment branches**：
  - 选择允许所有分支，或把 `v4` 加入允许列表
5. 如果配置了 **Required reviewers**（需要人工审批）：先移除
6. 重新运行工作流：仓库 → **Actions** → 选中 `Deploy Quartz site to GitHub Pages` → **Re-run jobs**

> 如果你不小心创建了带保护规则的 `github-pages` 环境，最省事的做法通常是直接删除该 environment（垃圾桶图标），然后重新运行一次工作流，让 GitHub 自动重建正确的环境。
