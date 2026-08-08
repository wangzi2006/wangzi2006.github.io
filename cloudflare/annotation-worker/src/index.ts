interface D1RunResult {
  success: boolean
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T>(): Promise<T | null>
  run(): Promise<D1RunResult>
}

interface D1Database {
  prepare(query: string): D1PreparedStatement
}

interface Env {
  DB: D1Database
  ALLOWED_ORIGINS: string
  TURNSTILE_SECRET_KEY: string
  RESEND_API_KEY: string
  RESEND_FROM: string
  ANNOTATION_NOTIFY_EMAIL: string
}

interface AnnotationRequest {
  submissionId: string
  anonymousSessionId: string
  quote: string
  prefix: string
  suffix: string
  comment: string
  name: string | null
  pageTitle: string
  pageUrl: string
  pageSlug: string
  headingText: string | null
  headingLevel: string | null
  headingId: string | null
  textStart: number
  textEnd: number
  clientSentAt: string
  clientTimeZone: string
  turnstileToken: string
}

interface AnnotationRecord {
  id: string
  email_status: "pending" | "sent" | "failed"
  created_at: string
}

interface TurnstileResponse {
  success: boolean
  action?: string
  hostname?: string
  "error-codes"?: string[]
}

function allowedOrigins(env: Env) {
  return new Set(
    env.ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
}

function requestOrigin(request: Request, env: Env) {
  const origin = request.headers.get("Origin")
  return origin && allowedOrigins(env).has(origin) ? origin : null
}

function json(body: Record<string, unknown>, status: number, origin: string | null) {
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8" })
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin)
    headers.set("Access-Control-Allow-Headers", "content-type")
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    headers.set("Vary", "Origin")
  }
  return new Response(JSON.stringify(body), { status, headers })
}

function visitorIp(request: Request) {
  return request.headers.get("CF-Connecting-IP") ?? "未知"
}

function requireString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`缺少字段：${field}`)
  }
  return value
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null
}

function parseRequest(value: unknown): AnnotationRequest {
  if (!value || typeof value !== "object") throw new Error("请求格式无效")
  const body = value as Record<string, unknown>

  const textStart = Number(body.textStart)
  const textEnd = Number(body.textEnd)
  if (
    !Number.isInteger(textStart) ||
    !Number.isInteger(textEnd) ||
    textStart < 0 ||
    textEnd < textStart
  ) {
    throw new Error("文字位置无效")
  }

  return {
    submissionId: requireString(body.submissionId, "submissionId"),
    anonymousSessionId: requireString(body.anonymousSessionId, "anonymousSessionId"),
    quote: requireString(body.quote, "quote"),
    prefix: typeof body.prefix === "string" ? body.prefix : "",
    suffix: typeof body.suffix === "string" ? body.suffix : "",
    comment: requireString(body.comment, "comment"),
    name: optionalString(body.name),
    pageTitle: requireString(body.pageTitle, "pageTitle"),
    pageUrl: requireString(body.pageUrl, "pageUrl"),
    pageSlug: requireString(body.pageSlug, "pageSlug"),
    headingText: optionalString(body.headingText),
    headingLevel: optionalString(body.headingLevel),
    headingId: optionalString(body.headingId),
    textStart,
    textEnd,
    clientSentAt: requireString(body.clientSentAt, "clientSentAt"),
    clientTimeZone: requireString(body.clientTimeZone, "clientTimeZone"),
    turnstileToken: requireString(body.turnstileToken, "turnstileToken"),
  }
}

async function validateTurnstile(body: AnnotationRequest, ip: string, env: Env) {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: body.turnstileToken,
      remoteip: ip === "未知" ? undefined : ip,
      idempotency_key: body.submissionId,
    }),
  })
  const result = (await response.json()) as TurnstileResponse
  return result.success && result.action === "submit_annotation"
}

function emailText(body: AnnotationRequest, receivedAt: string) {
  return [
    "收到一条网站文字评论",
    "",
    "引用内容：",
    body.quote,
    "",
    "评论：",
    body.comment,
    "",
    `署名：${body.name ?? "匿名"}`,
    "",
    "──────── 完整信息 ────────",
    "",
    `文档：${body.pageTitle}`,
    `URL：${body.pageUrl}`,
    `页面标识：${body.pageSlug}`,
    `服务器接收时间：${receivedAt}`,
    `访问者发送时间：${body.clientSentAt}`,
    `访问者时区：${body.clientTimeZone}`,
    "",
    `标题：${body.headingText ?? "无"}`,
    `标题层级：${body.headingLevel ?? "无"}`,
    `标题 ID：${body.headingId ?? "无"}`,
    `文字位置：${body.textStart}–${body.textEnd}`,
    "",
    "引用前文：",
    body.prefix,
    "",
    "引用后文：",
    body.suffix,
    "",
    `提交 ID：${body.submissionId}`,
  ].join("\n")
}

async function getAnnotation(env: Env, submissionId: string) {
  return env.DB.prepare(
    "select id, email_status, created_at from annotations where submission_id = ?1",
  )
    .bind(submissionId)
    .first<AnnotationRecord>()
}

async function insertAnnotation(env: Env, body: AnnotationRequest, id: string, receivedAt: string) {
  return env.DB.prepare(
    `insert into annotations (
      id, submission_id, anonymous_session_id, page_title, page_url, page_slug,
      heading_text, heading_level, heading_id, quote, prefix, suffix, text_start,
      text_end, comment, display_name, client_sent_at, client_time_zone, created_at
    ) values (
      ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16,
      ?17, ?18, ?19
    ) on conflict(submission_id) do nothing`,
  )
    .bind(
      id,
      body.submissionId,
      body.anonymousSessionId,
      body.pageTitle,
      body.pageUrl,
      body.pageSlug,
      body.headingText,
      body.headingLevel,
      body.headingId,
      body.quote,
      body.prefix,
      body.suffix,
      body.textStart,
      body.textEnd,
      body.comment,
      body.name,
      body.clientSentAt,
      body.clientTimeZone,
      receivedAt,
    )
    .run()
}

async function handleRequest(request: Request, env: Env) {
  const origin = requestOrigin(request, env)
  if (!origin) return json({ error: "来源不被允许" }, 403, null)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: json({}, 200, origin).headers })
  }
  if (request.method !== "POST") return json({ error: "仅接受 POST 请求" }, 405, origin)

  let body: AnnotationRequest
  try {
    body = parseRequest(await request.json())
    if (!allowedOrigins(env).has(new URL(body.pageUrl).origin)) {
      return json({ error: "页面地址不被允许" }, 400, origin)
    }
  } catch (cause) {
    return json({ error: cause instanceof Error ? cause.message : "请求格式无效" }, 400, origin)
  }

  const ip = visitorIp(request)
  if (!(await validateTurnstile(body, ip, env))) {
    return json({ error: "人机验证失败，请重试" }, 400, origin)
  }

  try {
    const receivedAt = new Date().toISOString()
    await insertAnnotation(env, body, crypto.randomUUID(), receivedAt)
    const annotation = await getAnnotation(env, body.submissionId)

    if (!annotation) return json({ error: "评论保存失败" }, 500, origin)
    if (annotation.email_status === "sent") {
      return json({ ok: true, id: annotation.id, receivedAt: annotation.created_at }, 200, origin)
    }

    const subjectTitle = body.pageTitle.replace(/[\r\n]+/g, " ")
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": body.submissionId,
        "User-Agent": "quartz-annotation-feedback/2.0",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM,
        to: [env.ANNOTATION_NOTIFY_EMAIL],
        subject: `网站文字评论｜${subjectTitle}`,
        text: emailText(body, receivedAt),
      }),
    })

    if (!emailResponse.ok) {
      await env.DB.prepare("update annotations set email_status = 'failed' where id = ?1")
        .bind(annotation.id)
        .run()
      return json({ error: "评论已保存，但邮件通知发送失败" }, 502, origin)
    }

    await env.DB.prepare(
      "update annotations set email_status = 'sent', notified_at = ?1 where id = ?2",
    )
      .bind(receivedAt, annotation.id)
      .run()

    return json({ ok: true, id: annotation.id, receivedAt }, 200, origin)
  } catch (cause) {
    console.error("annotation submission failed", cause)
    return json({ error: "评论保存失败" }, 500, origin)
  }
}

export default {
  fetch(request: Request, env: Env) {
    return handleRequest(request, env)
  },
}
