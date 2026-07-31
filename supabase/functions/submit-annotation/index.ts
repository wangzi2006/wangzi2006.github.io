import { createClient } from "npm:@supabase/supabase-js@2"

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

interface TurnstileResponse {
  success: boolean
  action?: string
  hostname?: string
  "error-codes"?: string[]
}

const requiredEnvironment = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "TURNSTILE_SECRET_KEY",
  "RESEND_API_KEY",
  "RESEND_FROM",
  "ANNOTATION_NOTIFY_EMAIL",
] as const

function json(body: Record<string, unknown>, status: number, origin: string | null) {
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8" })
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin)
    headers.set("Access-Control-Allow-Headers", "authorization, content-type")
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    headers.set("Vary", "Origin")
  }
  return new Response(JSON.stringify(body), { status, headers })
}

function allowedOrigins() {
  return new Set(
    (Deno.env.get("ALLOWED_ORIGINS") ?? "https://wangzi2006.github.io")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
}

function requestOrigin(request: Request) {
  const origin = request.headers.get("Origin")
  return origin && allowedOrigins().has(origin) ? origin : null
}

function visitorIp(request: Request) {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    request.headers.get("X-Real-IP") ??
    "未知"
  )
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

async function validateTurnstile(body: AnnotationRequest, ip: string) {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: Deno.env.get("TURNSTILE_SECRET_KEY"),
      response: body.turnstileToken,
      remoteip: ip === "未知" ? undefined : ip,
      idempotency_key: body.submissionId,
    }),
  })
  const result = (await response.json()) as TurnstileResponse
  return result.success && result.action === "submit_annotation"
}

function emailText(body: AnnotationRequest, ip: string, receivedAt: string) {
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
    `访问者 IP：${ip}`,
    `提交 ID：${body.submissionId}`,
  ].join("\n")
}

Deno.serve(async (request) => {
  const origin = requestOrigin(request)
  if (!origin) return json({ error: "来源不被允许" }, 403, null)
  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: json({}, 200, origin).headers })
  if (request.method !== "POST") return json({ error: "仅接受 POST 请求" }, 405, origin)

  for (const name of requiredEnvironment) {
    if (!Deno.env.get(name)) return json({ error: `服务缺少配置：${name}` }, 500, origin)
  }

  let body: AnnotationRequest
  try {
    body = parseRequest(await request.json())
    const pageOrigin = new URL(body.pageUrl).origin
    if (!allowedOrigins().has(pageOrigin)) {
      return json({ error: "页面地址不被允许" }, 400, origin)
    }
  } catch (cause) {
    return json({ error: cause instanceof Error ? cause.message : "请求格式无效" }, 400, origin)
  }

  const ip = visitorIp(request)
  if (!(await validateTurnstile(body, ip))) {
    return json({ error: "人机验证失败，请重试" }, 400, origin)
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )

  let userId: string | null = null
  const authorization = request.headers.get("Authorization")
  if (authorization?.startsWith("Bearer ")) {
    const { data } = await supabase.auth.getUser(authorization.slice(7))
    userId = data.user?.id ?? null
  }

  const receivedAt = new Date().toISOString()
  const record = {
    submission_id: body.submissionId,
    user_id: userId,
    anonymous_session_id: body.anonymousSessionId,
    page_title: body.pageTitle,
    page_url: body.pageUrl,
    page_slug: body.pageSlug,
    heading_text: body.headingText,
    heading_level: body.headingLevel,
    heading_id: body.headingId,
    quote: body.quote,
    prefix: body.prefix,
    suffix: body.suffix,
    text_start: body.textStart,
    text_end: body.textEnd,
    comment: body.comment,
    display_name: body.name,
    client_sent_at: body.clientSentAt,
    client_time_zone: body.clientTimeZone,
  }

  const { data: inserted, error: insertError } = await supabase
    .from("annotations")
    .insert(record)
    .select("id, email_status, created_at")
    .single()

  let annotation = inserted
  if (insertError?.code === "23505") {
    const { data: existing, error: existingError } = await supabase
      .from("annotations")
      .select("id, email_status, created_at")
      .eq("submission_id", body.submissionId)
      .single()
    if (existingError) return json({ error: "无法读取已有评论" }, 500, origin)
    annotation = existing
  } else if (insertError) {
    return json({ error: "评论保存失败" }, 500, origin)
  }

  if (!annotation) return json({ error: "评论保存失败" }, 500, origin)
  if (annotation.email_status === "sent") {
    return json({ ok: true, id: annotation.id, receivedAt: annotation.created_at }, 200, origin)
  }

  const subjectTitle = body.pageTitle.replace(/[\r\n]+/g, " ")
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
      "Idempotency-Key": body.submissionId,
      "User-Agent": "quartz-annotation-feedback/1.0",
    },
    body: JSON.stringify({
      from: Deno.env.get("RESEND_FROM"),
      to: [Deno.env.get("ANNOTATION_NOTIFY_EMAIL")],
      subject: `网站文字评论｜${subjectTitle}`,
      text: emailText(body, ip, receivedAt),
    }),
  })

  if (!emailResponse.ok) {
    await supabase.from("annotations").update({ email_status: "failed" }).eq("id", annotation.id)
    return json({ error: "评论已保存，但邮件通知发送失败" }, 502, origin)
  }

  await supabase
    .from("annotations")
    .update({ email_status: "sent", notified_at: receivedAt })
    .eq("id", annotation.id)

  return json({ ok: true, id: annotation.id, receivedAt }, 200, origin)
})
