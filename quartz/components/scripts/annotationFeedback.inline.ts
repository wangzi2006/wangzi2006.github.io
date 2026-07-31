interface AnnotationSelection {
  quote: string
  prefix: string
  suffix: string
  pageTitle: string
  pageUrl: string
  pageSlug: string
  headingText: string | null
  headingLevel: string | null
  headingId: string | null
  textStart: number
  textEnd: number
}

interface AnnotationHistoryEntry extends AnnotationSelection {
  id: string
  comment: string
  name: string | null
  sentAt: string
}

interface AnnotationSubmitResponse {
  ok?: boolean
  id?: string
  receivedAt?: string
  error?: string
}

const annotationHistoryKey = "quartz.annotation-feedback.history.v1"
const annotationSessionKey = "quartz.annotation-feedback.session.v1"
const turnstileScriptId = "quartz-annotation-turnstile"
const contextLength = 160
let turnstileLoadPromise: Promise<void> | undefined

function getTurnstileApi() {
  return (
    window as typeof window & {
      turnstile?: {
        render: (
          container: HTMLElement,
          options: {
            sitekey: string
            action: string
            appearance: string
            theme: string
            callback: (token: string) => void
            "expired-callback": () => void
            "error-callback": () => void
          },
        ) => string
        reset: (widgetId: string) => void
        remove: (widgetId: string) => void
      }
    }
  ).turnstile
}

function loadTurnstile() {
  if (getTurnstileApi()) return Promise.resolve()
  if (turnstileLoadPromise) return turnstileLoadPromise

  turnstileLoadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(turnstileScriptId) as HTMLScriptElement | null
    const script = existing ?? document.createElement("script")

    const handleLoad = () => resolve()
    const handleError = () => reject(new Error("验证服务加载失败，请稍后重试。"))

    script.addEventListener("load", handleLoad, { once: true })
    script.addEventListener("error", handleError, { once: true })

    if (!existing) {
      script.id = turnstileScriptId
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  })

  return turnstileLoadPromise
}

function readHistory(): AnnotationHistoryEntry[] {
  try {
    const value = sessionStorage.getItem(annotationHistoryKey)
    return value ? (JSON.parse(value) as AnnotationHistoryEntry[]) : []
  } catch {
    return []
  }
}

function writeHistory(entries: AnnotationHistoryEntry[]) {
  sessionStorage.setItem(annotationHistoryKey, JSON.stringify(entries))
}

function getSessionId() {
  const existing = sessionStorage.getItem(annotationSessionKey)
  if (existing) return existing

  const sessionId = crypto.randomUUID()
  sessionStorage.setItem(annotationSessionKey, sessionId)
  return sessionId
}

function selectedHeading(article: HTMLElement, startNode: Node) {
  let current: HTMLHeadingElement | null = null
  const headings = article.querySelectorAll<HTMLHeadingElement>("h1, h2, h3, h4, h5, h6")

  for (const heading of headings) {
    if (heading.contains(startNode)) {
      current = heading
      break
    }

    const position = heading.compareDocumentPosition(startNode)
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
      current = heading
    }
  }

  return current
}

function captureSelection(article: HTMLElement): AnnotationSelection | null {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null

  const range = selection.getRangeAt(0)
  const common =
    range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? (range.commonAncestorContainer as Element)
      : range.commonAncestorContainer.parentElement
  if (!common || !article.contains(common)) return null

  const quote = range.toString()
  if (!quote.trim()) return null

  const beforeRange = document.createRange()
  beforeRange.selectNodeContents(article)
  beforeRange.setEnd(range.startContainer, range.startOffset)
  const beforeText = beforeRange.toString()

  const afterRange = document.createRange()
  afterRange.selectNodeContents(article)
  afterRange.setStart(range.endContainer, range.endOffset)
  const afterText = afterRange.toString()

  const heading = selectedHeading(article, range.startContainer)
  const pageTitle =
    document.querySelector<HTMLElement>(".article-title")?.innerText.trim() ||
    document.title.replace(/\s*[|-]\s*[^|-]+$/, "")

  return {
    quote,
    prefix: beforeText.slice(-contextLength),
    suffix: afterText.slice(0, contextLength),
    pageTitle,
    pageUrl: `${location.origin}${location.pathname}`,
    pageSlug: document.body.dataset.slug ?? location.pathname,
    headingText: heading?.innerText.trim() ?? null,
    headingLevel: heading?.tagName ?? null,
    headingId: heading?.id || null,
    textStart: beforeText.length,
    textEnd: beforeText.length + quote.length,
  }
}

function setupAnnotationFeedback() {
  const root = document.querySelector<HTMLElement>(".annotation-feedback")
  const article = document.querySelector<HTMLElement>("article")
  if (!root || !article) return

  const endpoint = root.dataset.endpoint
  const turnstileSiteKey = root.dataset.turnstileSiteKey
  if (!endpoint || !turnstileSiteKey) return

  const selectionButton = root.querySelector<HTMLButtonElement>(".annotation-selection-button")!
  const historyButton = root.querySelector<HTMLButtonElement>(".annotation-history-button")!
  const historyCount = historyButton.querySelector("span")!
  const composeOverlay = root.querySelector<HTMLElement>(".annotation-compose-overlay")!
  const historyOverlay = root.querySelector<HTMLElement>(".annotation-history-overlay")!
  const form = root.querySelector<HTMLFormElement>(".annotation-form")!
  const commentInput = form.elements.namedItem("comment") as HTMLTextAreaElement
  const nameInput = form.elements.namedItem("name") as HTMLInputElement
  const quote = root.querySelector<HTMLElement>(".annotation-quote > p")!
  const error = root.querySelector<HTMLElement>(".annotation-error")!
  const submitButton = root.querySelector<HTMLButtonElement>(".annotation-submit")!
  const turnstileContainer = root.querySelector<HTMLElement>(".annotation-turnstile")!
  const historyList = root.querySelector<HTMLOListElement>(".annotation-history-list")!
  const toast = root.querySelector<HTMLElement>(".annotation-toast")!

  let pendingSelection: AnnotationSelection | null = null
  let turnstileWidgetId: string | undefined
  let turnstileToken = ""
  let toastTimeout: number | undefined
  let selectionFrame: number | undefined

  const setOverlay = (overlay: HTMLElement, visible: boolean) => {
    overlay.hidden = !visible
    overlay.setAttribute("aria-hidden", visible ? "false" : "true")
    document.body.style.overflow = visible ? "hidden" : ""
  }

  const showError = (message: string) => {
    error.innerText = message
    error.hidden = false
  }

  const clearError = () => {
    error.innerText = ""
    error.hidden = true
  }

  const showToast = (message: string) => {
    if (toastTimeout !== undefined) window.clearTimeout(toastTimeout)
    toast.innerText = message
    toast.hidden = false
    toastTimeout = window.setTimeout(() => {
      toast.hidden = true
    }, 3200)
  }

  const renderHistory = () => {
    const entries = readHistory()
    historyCount.textContent = String(entries.length)
    historyButton.hidden = entries.length === 0
    historyList.replaceChildren()

    for (const entry of entries.toReversed()) {
      const item = document.createElement("li")
      const quoted = document.createElement("blockquote")
      const comment = document.createElement("p")
      const meta = document.createElement("time")

      quoted.textContent = entry.quote
      comment.textContent = entry.comment
      meta.dateTime = entry.sentAt
      meta.textContent = new Date(entry.sentAt).toLocaleString()

      item.append(quoted, comment, meta)
      historyList.appendChild(item)
    }
  }

  const updateSelectionButton = () => {
    selectionFrame = undefined
    const captured = captureSelection(article)
    if (!captured) {
      selectionButton.hidden = true
      return
    }

    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    if (!range) return
    const rects = range.getClientRects()
    const rect = rects.length > 0 ? rects[rects.length - 1] : range.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) return

    pendingSelection = captured
    selectionButton.hidden = false

    const halfWidth = 40
    const left = Math.min(
      window.innerWidth - halfWidth,
      Math.max(halfWidth, rect.left + rect.width / 2),
    )
    const preferredTop = rect.top - 42
    selectionButton.style.left = `${left}px`
    selectionButton.style.top = `${preferredTop > 8 ? preferredTop : rect.bottom + 8}px`
  }

  const scheduleSelectionUpdate = () => {
    if (selectionFrame !== undefined) cancelAnimationFrame(selectionFrame)
    selectionFrame = requestAnimationFrame(updateSelectionButton)
  }

  const resetTurnstile = () => {
    turnstileToken = ""
    submitButton.disabled = true
    if (turnstileWidgetId) getTurnstileApi()?.reset(turnstileWidgetId)
  }

  const prepareTurnstile = async () => {
    clearError()
    submitButton.disabled = true

    try {
      await loadTurnstile()
      const api = getTurnstileApi()
      if (!api) throw new Error("验证服务暂时不可用。")

      if (turnstileWidgetId) {
        api.reset(turnstileWidgetId)
        return
      }

      turnstileWidgetId = api.render(turnstileContainer, {
        sitekey: turnstileSiteKey,
        action: "submit_annotation",
        appearance: "interaction-only",
        theme: "auto",
        callback: (token) => {
          turnstileToken = token
          submitButton.disabled = false
          clearError()
        },
        "expired-callback": resetTurnstile,
        "error-callback": () => {
          resetTurnstile()
          showError("验证失败，请稍后重试。")
        },
      })
    } catch (cause) {
      showError(cause instanceof Error ? cause.message : "验证服务暂时不可用。")
    }
  }

  const closeComposer = () => {
    setOverlay(composeOverlay, false)
    form.reset()
    clearError()
    resetTurnstile()
  }

  const closeHistory = () => setOverlay(historyOverlay, false)

  const openComposer = () => {
    if (!pendingSelection) return
    selectionButton.hidden = true
    quote.innerText = pendingSelection.quote
    setOverlay(composeOverlay, true)
    commentInput.focus()
    void prepareTurnstile()
  }

  const openHistory = () => {
    renderHistory()
    setOverlay(historyOverlay, true)
  }

  const onSelectionPointerDown = (event: PointerEvent) => event.preventDefault()

  const onOverlayClick = (event: MouseEvent) => {
    if (event.target === composeOverlay) closeComposer()
    if (event.target === historyOverlay) closeHistory()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (!event.key.startsWith("Esc")) return
    if (!composeOverlay.hidden) closeComposer()
    if (!historyOverlay.hidden) closeHistory()
  }

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    if (!pendingSelection || !commentInput.value.trim() || !turnstileToken) return

    clearError()
    submitButton.disabled = true
    submitButton.innerText = "发送中…"
    const submissionId = crypto.randomUUID()
    const sentAt = new Date().toISOString()

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pendingSelection,
          submissionId,
          anonymousSessionId: getSessionId(),
          comment: commentInput.value,
          name: nameInput.value.trim() || null,
          clientSentAt: sentAt,
          clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          turnstileToken,
        }),
      })
      const result = (await response.json()) as AnnotationSubmitResponse
      if (!response.ok || !result.ok || !result.id) {
        throw new Error(result.error || "发送失败，请稍后重试。")
      }

      const entries = readHistory()
      entries.push({
        ...pendingSelection,
        id: result.id,
        comment: commentInput.value,
        name: nameInput.value.trim() || null,
        sentAt: result.receivedAt || sentAt,
      })
      writeHistory(entries)

      closeComposer()
      renderHistory()
      window.getSelection()?.removeAllRanges()
      showToast("评论已发送")
    } catch (cause) {
      showError(cause instanceof Error ? cause.message : "发送失败，请稍后重试。")
      resetTurnstile()
    } finally {
      submitButton.innerText = "发送"
    }
  }

  selectionButton.addEventListener("pointerdown", onSelectionPointerDown)
  selectionButton.addEventListener("click", openComposer)
  historyButton.addEventListener("click", openHistory)
  composeOverlay.addEventListener("click", onOverlayClick)
  historyOverlay.addEventListener("click", onOverlayClick)
  form.addEventListener("submit", onSubmit)
  document.addEventListener("selectionchange", scheduleSelectionUpdate)
  document.addEventListener("keydown", onKeyDown)

  for (const closeButton of root.querySelectorAll<HTMLButtonElement>(".annotation-close")) {
    closeButton.addEventListener("click", () => {
      if (closeButton.closest(".annotation-compose-panel")) closeComposer()
      if (closeButton.closest(".annotation-history-panel")) closeHistory()
    })
  }
  root
    .querySelector<HTMLButtonElement>(".annotation-cancel")!
    .addEventListener("click", closeComposer)

  renderHistory()

  window.addCleanup(() => {
    selectionButton.removeEventListener("pointerdown", onSelectionPointerDown)
    selectionButton.removeEventListener("click", openComposer)
    historyButton.removeEventListener("click", openHistory)
    composeOverlay.removeEventListener("click", onOverlayClick)
    historyOverlay.removeEventListener("click", onOverlayClick)
    form.removeEventListener("submit", onSubmit)
    document.removeEventListener("selectionchange", scheduleSelectionUpdate)
    document.removeEventListener("keydown", onKeyDown)
    if (selectionFrame !== undefined) cancelAnimationFrame(selectionFrame)
    if (toastTimeout !== undefined) window.clearTimeout(toastTimeout)
    if (turnstileWidgetId) getTurnstileApi()?.remove(turnstileWidgetId)
    document.body.style.overflow = ""
  })
}

document.addEventListener("nav", setupAnnotationFeedback)
