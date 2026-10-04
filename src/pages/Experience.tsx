import { useEffect, useRef, useState } from 'react'
import { FigmaImg } from '../components/FigmaImg'
import { GlyphText } from '../components/GlyphText'
import { experienceRole } from './copy'
import { TOOL_WINDOWS, type ToolId } from './experienceTools'
import './Experience.css'

const TITLE = experienceRole.title
const LENS = 29
const SCAN_MS = 900
const GLASS = 58
/** Icons nav: logo box 28px, gap 24px — scroll bar matches logo height */
const ICON_SIZE = 28
const ICON_GAP = 24
const ICON_PAD = 24
const ICON_STEP = ICON_SIZE + ICON_GAP

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [parked, setParked] = useState(prefersReducedMotion)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [glassOpacity, setGlassOpacity] = useState(0)
  const [hotIndex, setHotIndex] = useState(-1)
  const [bulletsOn, setBulletsOn] = useState(prefersReducedMotion)
  const [tool, setTool] = useState<ToolId>('cypress')

  const active = TOOL_WINDOWS.find((t) => t.id === tool) ?? TOOL_WINDOWS[0]
  const toolIndex = TOOL_WINDOWS.findIndex((t) => t.id === tool)

  // Run the title scan + bullet entrance once the section scrolls into view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        io.disconnect()
      },
      { threshold: 0.3 },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  // Bullet entrance: first reveal waits for the title scan, tool switches replay quickly
  const bulletsRevealed = useRef(false)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setBulletsOn(true)
      return
    }
    if (!inView) return
    setBulletsOn(false)
    const delay = bulletsRevealed.current ? 40 : SCAN_MS + 120
    const id = window.setTimeout(() => {
      bulletsRevealed.current = true
      setBulletsOn(true)
    }, delay)
    return () => window.clearTimeout(id)
  }, [tool, inView])

  useEffect(() => {
    if (parked) {
      setHotIndex(-1)
      return
    }
    if (!inView) return

    let raf = 0
    let start = 0
    let cancelled = false

    // Layout offsets (artboard px), not client rects — the frame is CSS-scaled
    const measure = () => {
      const title = titleRef.current
      if (!title) return null
      // Start left of the first letter; leave past the last (no parking slot)
      const x0 = title.offsetLeft - GLASS - 4
      const y0 = title.offsetTop + title.offsetHeight / 2 - GLASS / 2
      const x1 = title.offsetLeft + title.offsetWidth + GLASS * 0.65
      const y1 = y0
      return { x0, y0, x1, y1 }
    }

    const finish = () => {
      if (cancelled) return
      setHotIndex(-1)
      setGlassOpacity(0)
      setParked(true)
    }

    const tick = (now: number) => {
      if (cancelled) return
      if (!start) start = now
      const t = Math.min(1, (now - start) / SCAN_MS)
      const p = easeOutCubic(t)
      const m = measure()
      if (m) {
        const x = m.x0 + (m.x1 - m.x0) * p
        const y = m.y0 + (m.y1 - m.y0) * p
        setPos({ x, y })
        setGlassOpacity(t < 0.78 ? 1 : Math.max(0, 1 - (t - 0.78) / 0.22))

        const lensX = x + LENS
        let best = -1
        let bestDist = Infinity
        letterRefs.current.forEach((el, i) => {
          if (!el || TITLE[i] === ' ') return
          const cx = el.offsetLeft + el.offsetWidth / 2
          const d = Math.abs(cx - lensX)
          if (d < bestDist && d < Math.max(28, el.offsetWidth * 1.6)) {
            bestDist = d
            best = i
          }
        })
        setHotIndex(best)
      }

      if (t < 1) raf = requestAnimationFrame(tick)
      else finish()
    }

    const kick = () => {
      if (cancelled) return
      const m = measure()
      if (m) {
        setPos({ x: m.x0, y: m.y0 })
        setGlassOpacity(1)
      }
      raf = requestAnimationFrame(tick)
    }

    const failsafe = window.setTimeout(finish, SCAN_MS + 250)
    if (document.fonts?.ready) document.fonts.ready.then(kick)
    else kick()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(failsafe)
    }
  }, [parked, inView])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="xp"
      aria-label="Experience"
      tabIndex={-1}
    >
      <div className="xp__canvas">
        <div className="xp__body">
          <header className="xp__intro">
            <div className="xp__heading">
              <h2
                className="xp__title"
                ref={titleRef}
                aria-label={TITLE}
              >
                {TITLE.split('').map((char, i) => (
                  <span
                    key={`${char}-${i}`}
                    ref={(node) => {
                      letterRefs.current[i] = node
                    }}
                    className={
                      i === hotIndex ? 'xp__letter is-hot' : 'xp__letter'
                    }
                  >
                    {char === ' ' ? '\u00a0' : char}
                  </span>
                ))}
              </h2>
              <span
                className="xp__glass"
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                  opacity: glassOpacity,
                }}
                aria-hidden="true"
              >
                <LoupeMark />
              </span>
            </div>
            <p className="xp__lede">
              {experienceRole.company} · {experienceRole.dates} ·{' '}
              {experienceRole.tenure}
            </p>
          </header>

          <div className="xp__studio-shell">
            <div
              className="xp__studio"
              role="region"
              aria-label={`${active.label} studio`}
            >
            <div className="xp__chrome" aria-hidden="true">
              <div className="xp__traffic">
                <span className="xp__dot xp__dot--a" />
                <span className="xp__dot xp__dot--b" />
                <span className="xp__dot xp__dot--c" />
              </div>
              <div className="xp__nav-btns">
                <span className="xp__chev xp__chev--back" />
                <span className="xp__chev xp__chev--fwd" />
              </div>
              <div className="xp__url">localhost:8080</div>
              <div className="xp__chrome-actions">
                <span className="xp__plus" />
                <span className="xp__grid" />
              </div>
            </div>

            <div className="xp__shell">
              <div className="xp__runner" aria-hidden="true">
                <div className="xp__runner-left">
                  <FigmaImg
                    src="/figma/experience/chrome.svg"
                    width={24}
                    height={24}
                  />
                  <span className="xp__runner-tab">localhost:3000/guild</span>
                  <span className="xp__pill">720x580</span>
                  <span className="xp__pill xp__pill--sm">100%</span>
                </div>
                <div className="xp__runner-right">
                  <span className="xp__studio-btn">
                    Studio
                    <span className="xp__menu-ico" />
                  </span>
                  <span className="xp__record">
                    <span className="xp__record-dot" />
                    Record
                  </span>
                </div>
              </div>

              <div className="xp__workspace">
                <nav className="xp__rail" aria-label="Tool windows">
                  <span
                    className="xp__scroll"
                    style={{
                      top: `${ICON_PAD + toolIndex * ICON_STEP}px`,
                      height: ICON_SIZE,
                    }}
                    aria-hidden="true"
                  />
                  <ul className="xp__icons" role="list">
                    {TOOL_WINDOWS.map((item) => {
                      const selected = item.id === tool
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            className={
                              selected ? 'xp__icon is-active' : 'xp__icon'
                            }
                            aria-label={item.label}
                            aria-pressed={selected}
                            onClick={() => setTool(item.id)}
                          >
                            <span className="xp__icon-glyph">
                              <ToolMark id={item.id} />
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Left: feature boxes */}
                <div className="xp__pane xp__pane--docs">
                  <div className="xp__docs-inner">
                    <h3 className="xp__tool-title" aria-label={active.title}>
                      <GlyphText text={active.title} />
                    </h3>
                    <ul
                      className="xp__bullets"
                      aria-label={`What I learned using ${active.label}`}
                    >
                      {active.placement.map((item, i) => (
                        <li
                          key={`${active.id}-b-${item.title}`}
                          className={
                            bulletsOn ? 'xp__bullet is-in' : 'xp__bullet'
                          }
                          style={{
                            transitionDelay: bulletsOn
                              ? `${i * 100}ms`
                              : '0ms',
                          }}
                        >
                          <p className="xp__bullet-title">{item.title}</p>
                          <p className="xp__bullet-body">{item.body}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: what the tool is */}
                <div className="xp__pane xp__pane--code">
                  <div className="xp__code-toolbar" aria-hidden="true">
                    <span className="xp__tool-ico">↶</span>
                    <span className="xp__tool-ico xp__tool-ico--flip">↶</span>
                    <span className="xp__reset">
                      <span aria-hidden="true">✕</span> Reset
                    </span>
                    <span className="xp__tool-ico">↻</span>
                    <span className="xp__save">Save</span>
                  </div>
                  <ol
                    className="xp__code xp__code--dark"
                    aria-label={`What ${active.label} is`}
                  >
                    {active.primer.map((line, i) => (
                      <li
                        key={`${active.id}-l-${i}`}
                        className={`xp__code-line is-${line.kind}`}
                      >
                        <span className="xp__ln" aria-hidden="true">
                          {i + 1}
                        </span>
                        <code>{line.text}</code>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ToolMark({ id }: { id: ToolId }) {
  if (id === 'cypress') return <CypressMark />
  if (id === 'insomnia') return <InsomniaMark />
  if (id === 'mongodb') return <MongoMark />
  if (id === 'aws') return <CloudWatchMark />
  return <BrowserStackMark />
}

function LoupeMark() {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" aria-hidden>
      <path
        d="M20.5382 10.9811C17.7349 11.089 15.2006 12.0895 13.8457 13.4461C13.696 13.5957 13.5183 13.7143 13.3228 13.7952C13.1272 13.8761 12.9177 13.9177 12.7061 13.9177C12.4945 13.9176 12.2849 13.8758 12.0894 13.7948C11.894 13.7137 11.7164 13.595 11.5668 13.4453C11.4172 13.2956 11.2986 13.1179 11.2177 12.9224C11.1367 12.7268 11.0951 12.5173 11.0952 12.3057C11.0953 12.094 11.137 11.8845 11.2181 11.689C11.2991 11.4936 11.4179 11.316 11.5676 11.1664C13.6572 9.07678 17.0598 7.89102 20.4125 7.76052C23.7878 7.63002 27.4724 8.55318 30.0534 11.1342C30.3554 11.4365 30.5251 11.8464 30.5249 12.2738C30.5248 12.7012 30.3549 13.111 30.0525 13.4131C29.7502 13.7152 29.3403 13.8848 28.9129 13.8846C28.4856 13.8845 28.0757 13.7146 27.7736 13.4123C26.0175 11.6545 23.3206 10.8715 20.5382 10.9795"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.9522 34.4518C40.1465 30.6766 41.8959 25.8895 41.8886 20.9443C41.8886 9.3766 32.512 0 20.9443 0C9.3766 0 0 9.3766 0 20.9443C0 32.512 9.3766 41.8886 20.9443 41.8886C26.0918 41.8886 30.8042 40.0326 34.4518 36.9522L33.8331 40.5095L45.9389 52.6153L52.6153 45.9389L40.5095 33.8331L36.9522 34.4518ZM20.9443 37.0553C29.8424 37.0553 37.0553 29.8424 37.0553 20.9443C37.0553 12.0462 29.8424 4.8333 20.9443 4.8333C12.0462 4.8333 4.8333 12.0462 4.8333 20.9443C4.8333 29.8424 12.0462 37.0553 20.9443 37.0553Z"
        fill="currentColor"
      />
      <path
        d="M48.2168 54.8932L54.8932 48.2168L57.0778 50.4014C58.3071 51.6307 58.3071 53.6236 57.0778 54.8513L54.8513 57.0778C53.622 58.3071 51.6291 58.3071 50.4014 57.0778L48.2168 54.8932Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CypressMark() {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M12.9979 0.0214844C12.0619 0.0214844 11.1757 0.140651 10.6752 0.230568V0.232734C7.67674 0.762586 4.9616 2.33413 3.00859 4.67025C1.05558 7.00637 -0.00988627 9.95705 6.91383e-05 13.002C6.91383e-05 14.2218 0.170152 15.4211 0.503819 16.5802C0.544986 16.7373 0.602403 16.9041 0.652236 17.0645C2.39315 22.3349 7.3949 25.976 12.9936 25.9781C13.064 25.9781 13.2666 25.9781 13.5374 25.9662C13.9944 25.9455 14.436 25.7948 14.8103 25.5319C15.1847 25.269 15.4763 24.9048 15.651 24.4821L16.1645 23.2319L22.1282 8.71307H20.1717L17.6627 15.0733L15.1342 8.71307H13.0662L16.613 17.3927L13.974 23.7952C13.9321 23.8982 13.8618 23.9871 13.7713 24.0516C13.6807 24.1161 13.5737 24.1534 13.4627 24.1592C13.3067 24.1646 13.1539 24.1701 12.9947 24.1701C8.02757 24.1701 3.6054 20.8442 2.23932 16.083C1.95243 15.0812 1.8073 14.0441 1.80815 13.002C1.80038 10.3587 2.73399 7.79894 4.44174 5.78132C6.14949 3.76371 8.5198 2.42003 11.1281 1.99098C11.3686 1.9509 12.0912 1.8339 12.9968 1.8339C17.7819 1.8339 21.9549 4.79357 23.5377 9.25257C23.5983 9.40857 23.6438 9.56998 23.6969 9.72923C24.0208 10.7844 24.1877 11.8829 24.1877 13.002C24.197 15.3996 23.43 17.7359 22.0014 19.6614C20.5728 21.587 18.5593 22.9984 16.262 23.6847L16.7885 25.4181C22.2972 23.7432 25.9968 18.7534 25.999 13.0031C25.999 11.3261 25.6762 9.8939 25.2948 8.78673L25.1529 8.39348H25.1507C23.2452 3.35273 18.4644 0.0214844 12.9979 0.0214844ZM9.1369 8.54732C7.8369 8.54732 6.78065 8.96548 5.90857 9.82132C5.03974 10.6728 4.60207 11.7431 4.60207 13.002C4.60207 14.2521 5.04299 15.3171 5.90749 16.1653C6.78065 17.0211 7.83582 17.4371 9.13582 17.4371C10.984 17.4371 12.5548 16.4026 13.2395 14.7407L13.2752 14.6519L11.5105 14.0517C11.3285 14.5457 10.6926 15.6637 9.1369 15.6637C8.40565 15.6637 7.78924 15.4102 7.30174 14.9054C6.80665 14.3962 6.55749 13.7549 6.55749 13.002C6.55749 12.2436 6.80124 11.6153 7.30174 11.0812C7.7914 10.5775 8.40674 10.3207 9.1369 10.3207C10.6947 10.3207 11.3285 11.4929 11.5127 11.9338L13.2752 11.3347L13.2395 11.2437C12.557 9.57973 10.984 8.54732 9.1369 8.54732Z"
        fill="currentColor"
      />
    </svg>
  )
}

function InsomniaMark() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden>
      {/* Clicked: disc --e, rings --c · Not clicked: disc --c, rings --b */}
      <circle cx="14" cy="14" r="13.3" className="xp__insomnia-disc" />
      <path
        className="xp__insomnia-ring"
        d="M14 0C6.26806 0 0 6.26806 0 14C0 21.7319 6.26806 28 14 28C21.7319 28 28 21.7319 28 14C28 6.26806 21.7319 0 14 0ZM14 1.42384C20.9458 1.42384 26.5764 7.05447 26.5764 14C26.5764 20.9455 20.9458 26.5764 14 26.5764C7.05425 26.5764 1.42362 20.9458 1.42362 14C1.42362 7.05425 7.05425 1.42384 14 1.42384Z"
      />
      <path
        className="xp__insomnia-ring"
        d="M14.1579 4.0337C19.6621 4.0337 24.1242 8.49576 24.1242 13.9999C24.1242 19.5041 19.6621 23.9662 14.1579 23.9662C8.65397 23.9662 4.1919 19.5041 4.1919 13.9999C4.19013 12.6968 4.44485 11.406 4.94156 10.2011C5.64681 11.1617 6.78453 11.7853 8.0675 11.7853C10.2082 11.7853 11.9433 10.0502 11.9433 7.90951C11.9433 6.62632 11.3199 5.48882 10.3591 4.78358C11.5639 4.28687 12.8547 4.03192 14.1579 4.0337Z"
      />
    </svg>
  )
}

function MongoMark() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"
        fill="currentColor"
      />
    </svg>
  )
}

function CloudWatchMark() {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M6.5 18.6A4 4 0 0 1 7.1 10.7A5.2 5.2 0 0 1 17.6 11.4A3.9 3.9 0 0 1 19.4 18.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 15.3h2.2l1.5-3 2.1 5.2 1.4-2.2H18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BrowserStackMark() {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M4.5 8.5c0-1.1.9-2 2-2h13c1.1 0 2 .9 2 2v1.2c0 .7-.4 1.3-1 1.6l-7.2 3.4c-.5.2-1.1.2-1.6 0L5.5 11.3c-.6-.3-1-.9-1-1.6V8.5z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M4.5 13.2c0-.4.2-.7.5-.9l7.2-3.4c.5-.2 1.1-.2 1.6 0l7.2 3.4c.3.2.5.5.5.9v1.3c0 .7-.4 1.3-1 1.6l-7.2 3.4c-.5.2-1.1.2-1.6 0l-7.2-3.4c-.6-.3-1-.9-1-1.6v-1.3z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M5 17.8l7.2 3.4c.5.2 1.1.2 1.6 0l7.2-3.4c.3-.2.5-.5.5-.9v-.2l-7.5 3.5c-.5.2-1.1.2-1.6 0L4.5 16.7v.2c0 .4.2.7.5.9z"
        fill="currentColor"
      />
    </svg>
  )
}
