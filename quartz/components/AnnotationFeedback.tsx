import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/annotationFeedback.scss"
// @ts-ignore
import script from "./scripts/annotationFeedback.inline"

interface Options {
  endpoint: string
  turnstileSiteKey: string
}

export default ((opts: Options) => {
  const AnnotationFeedback: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const disabled =
      fileData.frontmatter?.annotationFeedback === false ||
      fileData.frontmatter?.annotationFeedback === "false"

    if (disabled || !opts.endpoint || !opts.turnstileSiteKey) {
      return null
    }

    return (
      <div
        class="annotation-feedback"
        data-endpoint={opts.endpoint}
        data-turnstile-site-key={opts.turnstileSiteKey}
      >
        <button class="annotation-selection-button" type="button" hidden>
          评论
        </button>

        <div class="annotation-overlay annotation-compose-overlay" aria-hidden="true" hidden>
          <section
            class="annotation-panel annotation-compose-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="annotation-compose-title"
          >
            <header>
              <h3 id="annotation-compose-title">评论这段文字</h3>
              <button class="annotation-close" type="button" aria-label="关闭">
                ×
              </button>
            </header>

            <blockquote class="annotation-quote">
              <p></p>
            </blockquote>

            <form class="annotation-form">
              <label>
                <span>评论</span>
                <textarea name="comment" rows={5} required autofocus></textarea>
              </label>
              <label>
                <span>署名（可选）</span>
                <input name="name" type="text" autocomplete="name" />
              </label>

              <div class="annotation-turnstile"></div>
              <p class="annotation-error" role="alert" hidden></p>

              <footer>
                <button class="annotation-cancel" type="button">
                  取消
                </button>
                <button class="annotation-submit" type="submit" disabled>
                  发送
                </button>
              </footer>
            </form>
          </section>
        </div>

        <button class="annotation-history-button" type="button" hidden>
          本次记录 <span>0</span>
        </button>

        <div class="annotation-overlay annotation-history-overlay" aria-hidden="true" hidden>
          <section
            class="annotation-panel annotation-history-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="annotation-history-title"
          >
            <header>
              <h3 id="annotation-history-title">本次发送</h3>
              <button class="annotation-close" type="button" aria-label="关闭">
                ×
              </button>
            </header>
            <ol class="annotation-history-list"></ol>
          </section>
        </div>

        <div class="annotation-toast" role="status" aria-live="polite" hidden></div>
      </div>
    )
  }

  AnnotationFeedback.css = style
  AnnotationFeedback.afterDOMLoaded = script

  return AnnotationFeedback
}) satisfies QuartzComponentConstructor<Options>
