import { useEffect, useId, useRef, useState } from 'react'
import { GlyphText } from '../components/GlyphText'
import { engagementCopy, engagementEntries } from './copy'
import type { EngagementEntry } from './copy'
import './Engagement.css'

/** Frame 49 closed, Frame 50 open. One glass tile, copy fades in. */
export function Engagement() {
  return (
    <section
      id="engagement"
      className="engage"
      aria-labelledby="engagement-title"
      tabIndex={-1}
    >
      <header className="engage__header">
        <h2
          id="engagement-title"
          className="engage__greeting"
          aria-label={engagementCopy.greeting}
        >
          <GlyphText text={engagementCopy.greeting} />
        </h2>
      </header>

      <ul className="engage__cards">
        {engagementEntries.map((entry) => (
          <StoryCard key={entry.id} entry={entry} />
        ))}
      </ul>
    </section>
  )
}

function StoryCard({ entry }: { entry: EngagementEntry }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const storyId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
      queueMicrotask(() => buttonRef.current?.focus())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <li className="engage__card">
      <div className={open ? 'engage__plate is-open' : 'engage__plate'}>
        <div className="engage__face">
          <h3 className="engage__name" aria-label={entry.title}>
            {entry.nameLines.map((line) => (
              <span key={line} className="engage__name-line">
                <GlyphText text={line} />
              </span>
            ))}
          </h3>
          <div id={storyId} className="engage__copy" aria-hidden={!open} inert={!open}>
            <p className="engage__summary">{entry.summary}</p>
            {open && entry.link ? (
              <a
                className="engage__link"
                href={entry.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.link.label}
                <span className="engage__sr"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
          <p className="engage__when" aria-label={entry.when}>
            <GlyphText text={entry.when} />
          </p>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="engage__glass-btn"
          aria-expanded={open}
          aria-controls={storyId}
          aria-label={
            open
              ? `Close the note on ${entry.title}`
              : `Open the note on ${entry.title}`
          }
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <Minus /> : <Plus />}
        </button>
      </div>
    </li>
  )
}

function Plus() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 3.5a.5.5 0 0 1 .5.5v3.5H12a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  )
}

function Minus() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 7.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1 0-1z"
      />
    </svg>
  )
}
