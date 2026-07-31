# 私密文字评论功能：上线配置

前端组件和后端函数已经包含在仓库中。公开配置未填写时，Quartz 不会渲染评论按钮，因此可以安全地分步完成以下设置。

## 需要的服务

- Supabase：保存私密评论并运行 `submit-annotation` Edge Function。
- Cloudflare Turnstile：阻止自动化垃圾提交。
- Resend：将评论以纯文本邮件发送给站长。

## 1. Supabase

创建项目后，在仓库根目录执行：

```shell
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

设置函数所需的私密环境变量：

```shell
npx supabase secrets set TURNSTILE_SECRET_KEY=<turnstile-secret>
npx supabase secrets set RESEND_API_KEY=<resend-api-key>
npx supabase secrets set RESEND_FROM="Quartz <comment@your-domain.example>"
npx supabase secrets set ANNOTATION_NOTIFY_EMAIL=<your-email>
npx supabase secrets set ALLOWED_ORIGINS=https://wangzi2006.github.io
```

部署允许匿名访问、但由 Turnstile 保护的函数：

```shell
npx supabase functions deploy submit-annotation --no-verify-jwt
```

`SUPABASE_URL` 和 `SUPABASE_SERVICE_ROLE_KEY` 由托管的 Edge Function 环境提供，不要写入仓库或前端变量。

## 2. Turnstile

在 Cloudflare Turnstile 中创建 widget：

- Hostname：`wangzi2006.github.io`
- Widget mode：Managed

将 secret key 写入上一步的 Supabase secrets。Site key 将在下一步作为公开的构建变量使用。

## 3. Resend

验证用于发件的域名并创建 API key。邮件正文使用纯文本，其中包含：

- 页面标题、URL 和页面标识；
- 标题文字、标题层级和标题 ID；
- 引用文字、前后文和文章文字位置；
- 评论、署名、发送时间、时区和访问者 IP；
- 唯一提交 ID。

访问者 IP 不会写入前端历史，也不会保存到 `annotations` 数据表。

## 4. 前端公开配置

Supabase 函数地址和 Turnstile Site Key 已作为公开默认值配置在 `quartz.layout.ts`。这两个值本来就会发送到浏览器，不属于密钥。

如需在其他部署环境覆盖默认值，可在构建时设置：

- `ANNOTATION_ENDPOINT`
- `TURNSTILE_SITE_KEY`

下一次推送到 `v4` 后，GitHub Pages 构建会启用评论组件。

## 5. 可选控制

要在单篇 Markdown 页面关闭该功能，可在 frontmatter 中加入：

```yaml
annotationFeedback: false
```

## 本地测试

本地预览时可以临时设置公开变量：

```powershell
$env:ANNOTATION_ENDPOINT = "http://127.0.0.1:8787"
$env:TURNSTILE_SITE_KEY = "<turnstile-test-site-key>"
npm run dev
```

不要把 Turnstile secret、Resend API key 或 Supabase service role key 放进 `quartz.layout.ts`、GitHub Actions Variables 或任何浏览器代码。
