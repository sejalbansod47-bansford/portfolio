import { useEffect, useId, useRef, useState } from 'react'
import { GlyphText } from '../components/GlyphText'
import { SequentialClips } from '../components/SequentialClips'
import { cyberShieldCopy, type StoryCopy } from './copy'
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
    </section>
  )
}
