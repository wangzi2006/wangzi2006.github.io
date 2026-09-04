# Project instructions

- This is the personal `wangzi2006.github.io` Quartz v4 fork; the canonical site is `https://wangzi2006.github.io/`.
- Use Node.js 22+ and npm 10.9.2+. Run `npm ci`, `npm run dev`, `npm test`, `npm run check`, and `npm run build` from the repository root.
- The stack is Quartz/TypeScript/Preact/SCSS. Site content lives in `content/`; framework code in `quartz/`; operational documentation in `docs/`.
- Pushes to branch `v4` deploy the site through `.github/workflows/deploy.yml`. Do not stage, discard, move, or rewrite unrelated dirty content files.
- Private text comments use `quartz/components/AnnotationFeedback.tsx` and `cloudflare/annotation-worker/`: Cloudflare Worker + D1 is active; Turnstile protects submissions; Resend sends notifications.
- Treat `docs/annotation-feedback-setup.md` as the canonical annotation runbook. The tracked `supabase/` implementation is legacy rollback material, not the active backend.
- Run Worker commands from `cloudflare/annotation-worker/` with `npx --yes wrangler@latest`. Keep `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `.dev.vars*`, exports, and backups out of Git.
- Before changing the annotation schema or endpoint, verify D1 migrations, Worker deployment, the canonical site, and the rollback boundary. Never delete Supabase rollback material or private migration artifacts without explicit user approval.

Current status (2026-09-04): branch `v4` is live; the production annotation endpoint is `https://quartz-annotation-feedback.annotation-worker.workers.dev`; D1 database `quartz-annotations` is active.
