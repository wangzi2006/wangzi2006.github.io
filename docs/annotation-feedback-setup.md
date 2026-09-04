# 私密文字评论：现役架构与运维

本文是评论系统的唯一现役运维说明。最后核对日期：2026-09-04。

## 当前架构

- 前端：`quartz/components/AnnotationFeedback.tsx`。访客选中文字后可填写评论与可选署名；发送后不会在公共页面留下批注痕迹。
- 接口：Cloudflare Worker `quartz-annotation-feedback`，公开地址为 `https://quartz-annotation-feedback.annotation-worker.workers.dev`。
- 存储：Cloudflare D1 数据库 `quartz-annotations`，绑定名为 `DB`。
- 人机验证：Cloudflare Turnstile，公开 Site Key 配置在 `quartz.layout.ts`，服务器 Secret 只保存在 Worker Secrets。
- 通知：Worker 通过 Resend 向站长邮箱发送纯文本邮件。
- 发布：推送 `v4` 会部署 Quartz 到 GitHub Pages；Worker 需要从 `cloudflare/annotation-worker/` 单独部署。

请求路径如下：

```text
访客选择文字 → Quartz 评论面板 → Turnstile → Cloudflare Worker
                                             ├─ 写入 D1
                                             └─ Resend 邮件通知
```

仓库中的 `supabase/` 是迁移前实现，仅作为人工回滚材料保留；生产前端不再调用它。D1 中迁移之后的新评论不会自动同步回 Supabase。

## 配置边界

公开、可提交到 Git 的配置位于 `cloudflare/annotation-worker/wrangler.jsonc`：

- `ALLOWED_ORIGINS`
- `RESEND_FROM`
- `ANNOTATION_NOTIFY_EMAIL`
- D1 数据库名称、ID 与绑定名

两个秘密只能保存在 Cloudflare：

- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`

从 Worker 目录交互式写入秘密：

```powershell
npx --yes wrangler@latest secret put TURNSTILE_SECRET_KEY
npx --yes wrangler@latest secret put RESEND_API_KEY
npx --yes wrangler@latest secret list
```

不要把秘密写入 `wrangler.jsonc`、`quartz.layout.ts`、GitHub Actions Variables、命令参数或浏览器代码。本地 `.dev.vars*`、D1 导出和迁移备份必须放在 Git 已忽略的位置。

当前发件人使用 `onboarding@resend.dev`。该测试域名只能向 Resend 账户绑定的邮箱发信；若以后更换收件人，须先在 Resend 验证自有域名并同步修改 `RESEND_FROM`。

## 部署 Worker

在仓库根目录执行：

```powershell
cd cloudflare/annotation-worker
npx --yes wrangler@latest whoami
npx --yes wrangler@latest deploy --dry-run
npx --yes wrangler@latest d1 migrations apply quartz-annotations --remote
npx --yes wrangler@latest deploy
```

修改 D1 结构时，应先用 `wrangler d1 migrations create` 新建迁移，不要改写已经应用的 `0001_create_annotations.sql`。部署完成后至少检查：

```powershell
npx --yes wrangler@latest deployments status
npx --yes wrangler@latest secret list
npx --yes wrangler@latest d1 execute quartz-annotations --remote --command "select count(*) as total from annotations;"
```

## 查看与导出评论

在 Cloudflare Dashboard 打开 **D1 → quartz-annotations → Console**，执行：

```sql
select * from annotation_inbox;
```

`annotation_inbox` 是站长使用的简洁视图，只显示：日期、文档、引用内容、评论、署名。原始 `annotations` 表还保留页面 URL、标题层级、引用前后文、文字位置、客户端时间与邮件状态等定位信息。

从 Worker 目录导出远端数据库到已忽略的 `private/`：

```powershell
npx --yes wrangler@latest d1 export quartz-annotations --remote --output ../../private/quartz-annotations.sql
```

## 邮件内容

邮件先展示引用内容、评论和署名，再附完整定位信息：文档、URL、页面标识、服务器与客户端时间、时区、标题层级、文字位置、引用前后文和提交 ID。访问者 IP 不写入 D1，也不出现在邮件中。

## 前端配置与本地测试

生产默认接口和 Turnstile Site Key 位于 `quartz.layout.ts`。其他构建环境可覆盖：

- `ANNOTATION_ENDPOINT`
- `TURNSTILE_SITE_KEY`

单篇 Markdown 可通过以下 frontmatter 关闭评论：

```yaml
annotationFeedback: false
```

本地联调时，在 Worker 目录创建不会提交的 `.dev.vars`，写入两个秘密，然后分别启动 Worker 与 Quartz：

```powershell
# 终端 1：cloudflare/annotation-worker
npx --yes wrangler@latest dev --local --port 8787

# 终端 2：仓库根目录
$env:ANNOTATION_ENDPOINT = "http://127.0.0.1:8787"
$env:TURNSTILE_SITE_KEY = "<turnstile-test-site-key>"
npm run dev
```

## 故障与回滚

评论保存成功但 Resend 失败时，接口返回 `502`，该行仍保存在 D1，`email_status` 为 `failed`。先修复密钥或发件域名，再根据 `submission_id` 人工处理通知；重复提交不会创建第二行。

需要紧急回滚时：

1. 先确认 Supabase 项目、旧表、Edge Function 和所需 Secrets 仍可用。
2. 把 `quartz.layout.ts` 中的默认 `ANNOTATION_ENDPOINT` 改回旧 Supabase 函数地址。
3. 运行 `npm test` 与 `npm run build`，提交并推送 `v4`。
4. 回滚后分别导出 D1 与 Supabase 数据；不要假定两边会自动合并。

删除 D1、Worker、Secrets 或 `supabase/` 都属于破坏性退役操作，必须在确认备份、数据归属和生产流量后单独执行。
