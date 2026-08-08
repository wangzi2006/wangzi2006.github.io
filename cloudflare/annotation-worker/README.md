# Quartz annotation Worker

Cloudflare Worker + D1 backend for private Quartz text annotations.

Required Worker secrets:

- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`

The public site origin, sender, and notification recipient are configured through
`ALLOWED_ORIGINS`, `RESEND_FROM`, and `ANNOTATION_NOTIFY_EMAIL` in `wrangler.jsonc`.

Useful commands:

```powershell
npx wrangler d1 migrations apply quartz-annotations --remote
npx wrangler deploy
npx wrangler d1 execute quartz-annotations --remote --command "select * from annotation_inbox order by 日期 desc"
npx wrangler d1 export quartz-annotations --remote --output private/quartz-annotations.sql
```
