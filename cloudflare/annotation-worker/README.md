# Quartz annotation Worker

Production backend for private Quartz text annotations. The current architecture,
configuration, recovery boundary, and operator workflow are documented in
[`docs/annotation-feedback-setup.md`](../../docs/annotation-feedback-setup.md).

Run commands from this directory. Required Worker secrets are
`TURNSTILE_SECRET_KEY` and `RESEND_API_KEY`; never commit their values.

```powershell
npx --yes wrangler@latest whoami
npx --yes wrangler@latest d1 migrations apply quartz-annotations --remote
npx --yes wrangler@latest deploy
npx --yes wrangler@latest d1 execute quartz-annotations --remote --command 'select * from annotation_inbox;'
```
