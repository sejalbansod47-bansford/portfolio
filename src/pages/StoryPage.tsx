import { useEffect, useId, useRef, useState } from 'react'
import { GlyphText } from '../components/GlyphText'
import { SequentialClips } from '../components/SequentialClips'
import { cyberShieldCopy, traceLabCopy, type StoryCopy } from './copy'
import './StoryPage.css'

export function StoryPage({
  id,
  greeting,
}: StoryCopy & { id: string }) {
  const titleId = `${id}-title`
  const panelId = useId()
  const plusRef = useRef<HTMLButtonElement>(null)
  const minusRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const setOpenAndFocus = (next: boolean) => {
    setOpen(next)
    queueMicrotask(() => {
      if (next) minusRef.current?.focus()
      else plusRef.current?.focus()
    })
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpenAndFocus(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section
      id={id}
      className="story"
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <div className="story__screen" id="cyber-shield" tabIndex={-1}>
      <header className="story__header">
        <h2 id={titleId} className="story__greeting" aria-label={greeting}>
          <GlyphText text={greeting} />
        </h2>
      </header>

      <div className="story__board">
        <div className="story__stage">
          <SequentialClips
            variant="stage"
            clips={cyberShieldCopy.clips}
            label={`${cyberShieldCopy.title} gameplay`}
            key={cyberShieldCopy.clips.join('|')}
          />
          <button
            ref={plusRef}
            type="button"
            className="story__plus"
            hidden={open}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label="More about Cyber Shield"
            onClick={() => setOpenAndFocus(true)}
          >
            <svg
              className="story__plus-svg"
              viewBox="0 0 16 16"
              width="50"
              height="50"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
              />
            </svg>
          </button>
          <div
            id={panelId}
            className="story__depth"
            hidden={!open}
            role="region"
            aria-label={`${cyberShieldCopy.title} explained`}
          >
            {cyberShieldCopy.explain.map((fact) => (
              <h4 key={fact.label} className="story__depth-label">
                {fact.label}
              </h4>
            ))}
            <div className="story__depth-rule" />
            {cyberShieldCopy.explain.map((fact) => (
              <p key={`${fact.label}-body`} className="story__depth-body">
                {fact.body}
              </p>
            ))}
          </div>
          <button
            ref={minusRef}
            type="button"
            className="story__minus"
            hidden={!open}
            aria-label="Hide Cyber Shield details"
            onClick={() => setOpenAndFocus(false)}
          >
            <svg
              className="story__plus-svg"
              viewBox="0 0 16 16"
              width="50"
              height="50"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"
              />
            </svg>
          </button>
        </div>

        <aside className="story__aside" aria-labelledby="cyber-shield-name">
          <h3 id="cyber-shield-name" className="story__aside-title">
            <GlyphText text="Cyber" />
            <span className="story__aside-break">
              <GlyphText text="Shield" />
            </span>
          </h3>
          <div
            className="story__aside-scroll"
            tabIndex={0}
            role="region"
            aria-label="Cyber Shield details, scroll for more"
          >
            <ul className="story__aside-list">
              {cyberShieldCopy.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h4 className="story__aside-kicker">{cyberShieldCopy.stillsLabel}</h4>
            <ul className="story__stills">
              {cyberShieldCopy.stills.map((shot) => (
                <li key={shot.src}>
                  <figure className="story__still-figure">
                    <img
                      className="story__still"
                      src={shot.src}
                      alt={shot.alt}
                      width={1024}
                      height={640}
                      loading="lazy"
                    />
                    <figcaption className="story__still-name">
                      {shot.name}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <h4 className="story__aside-kicker">{cyberShieldCopy.future.label}</h4>
            <p className="story__aside-future">{cyberShieldCopy.future.body}</p>
          </div>
        </aside>
      </div>
      </div>

      <div className="story__screen story__screen--next" id="tracelab" tabIndex={-1}>
        <TraceLabBoard />
      </div>
    </section>
  )
}

const LIVE_HEIGHT: Record<string, number> = {
  '/': 1900,
  '/how': 4000,
  '/why': 4000,
  '/app': 1600,
}

function livePath(src: string) {
  try {
    const path = new URL(src).pathname
    if (path.startsWith('/how')) return '/how'
    if (path.startsWith('/why')) return '/why'
    if (path.startsWith('/app')) return '/app'
  } catch {
    /* keep the home height */
  }
  return '/'
}

function TraceLabBoard() {
  const openRef = useRef<HTMLAnchorElement>(null)
  const noteRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hintTimer = useRef<number | null>(null)
  const [src, setSrc] = useState(traceLabCopy.href)
  const [navAway, setNavAway] = useState(false)

  useEffect(
    () => () => {
      if (hintTimer.current !== null) window.clearTimeout(hintTimer.current)
    },
    [],
  )

  useEffect(() => {
    const viewport = scrollRef.current
    if (!viewport) return

    const maxOffset = () =>
      Math.max(0, viewport.scrollHeight - viewport.clientHeight)

    const onWheel = (event: WheelEvent) => {
      if (maxOffset() <= 0) return
      const rect = viewport.getBoundingClientRect()
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return
      }
      if (
        (event.deltaY < 0 && viewport.scrollTop <= 0) ||
        (event.deltaY > 0 && viewport.scrollTop >= maxOffset() - 1)
      ) {
        return
      }
      event.preventDefault()
      event.stopPropagation()
      viewport.scrollTop += event.deltaY
    }

    const onScroll = () => setNavAway(viewport.scrollTop > 24)

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    viewport.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      viewport.removeEventListener('scroll', onScroll)
    }
  }, [])

  const highlightOpen = () => {
    const link = openRef.current
    if (!link) return
    link.classList.remove('is-hint')
    void link.offsetWidth
    link.classList.add('is-hint')
    if (noteRef.current) {
      noteRef.current.textContent = ''
      noteRef.current.textContent = 'Open TraceLab to use the tool.'
    }
    const clear = () => link.classList.remove('is-hint')
    link.addEventListener('animationend', clear, { once: true })
    if (hintTimer.current !== null) window.clearTimeout(hintTimer.current)
    hintTimer.current = window.setTimeout(clear, 1300)
  }

  const go = (next: string) => {
    setSrc(next)
    const viewport = scrollRef.current
    if (viewport) viewport.scrollTop = 0
    setNavAway(false)
  }

  const step = (direction: number) => {
    const viewport = scrollRef.current
    if (!viewport) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    viewport.scrollBy({
      top: direction * viewport.clientHeight * 0.8,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="story__board story__board--mirror">
      <aside className="story__aside" aria-labelledby="tracelab-name">
        <h3 id="tracelab-name" className="story__aside-title" aria-label="TraceLab">
          <GlyphText text="TraceLab" />
        </h3>
        <div
          className="story__aside-scroll"
          tabIndex={0}
          role="region"
          aria-label="TraceLab details, scroll for more"
        >
          <ul className="story__aside-list">
            {traceLabCopy.highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <a
            ref={openRef}
            className="story__app-rect"
            href={traceLabCopy.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="story__app-text">{traceLabCopy.linkLabel}</span>
            <span className="story__app-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 17 17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </span>
            <span className="story__sr"> (opens in a new tab)</span>
          </a>
          <p className="story__live-note" ref={noteRef} aria-live="polite" />
          <h4 className="story__aside-kicker">{traceLabCopy.future.label}</h4>
          <p className="story__aside-future">{traceLabCopy.future.body}</p>
        </div>
      </aside>

      <div className="story__stage">
        <div
          ref={scrollRef}
          className="story__live-scroll"
          tabIndex={0}
          role="region"
          aria-label="TraceLab preview. Scroll to read the page."
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            if (event.clientX > rect.right - 18) return
            highlightOpen()
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              step(1)
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()
              step(-1)
            }
          }}
        >
          <iframe
            className="story__live"
            style={{ height: LIVE_HEIGHT[livePath(src)] }}
            src={src}
            title="TraceLab pages you can look through. Open TraceLab to use the tool."
            loading="lazy"
            // Scripts stay off so the tool cannot run inside the portfolio.
            sandbox=""
          />
        </div>
        <nav
          className={navAway ? 'story__live-nav is-away' : 'story__live-nav'}
          aria-label="TraceLab"
        >
          <button type="button" onClick={() => go(traceLabCopy.href)}>
            TraceLab home
          </button>
          <div className="story__live-nav-links">
            <button type="button" onClick={() => go(`${traceLabCopy.href}/how`)}>
              How it works
            </button>
            <button type="button" onClick={() => go(`${traceLabCopy.href}/why`)}>
              Why TraceLab
            </button>
            <button type="button" onClick={() => go(`${traceLabCopy.href}/app`)}>
              Open app
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

