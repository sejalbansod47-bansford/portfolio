import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GlyphText } from '../components/GlyphText'
import { engagementCopy, engagementEntries } from './copy'
import './Engagement.css'

type OpenPhoto = { entryId: string; index: number }

/**
 * Two short cards. Photos stay as a thumbnail row so the card does not grow
 * with every picture. A photo opens larger; Escape closes it.
 */
export function Engagement() {
  const [open, setOpen] = useState<OpenPhoto | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const openEntry = engagementEntries.find((entry) => entry.id === open?.entryId)
  const openPhoto = open && openEntry ? openEntry.photos[open.index] : undefined

  useEffect(() => {
    if (!openPhoto) return
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(null)
      triggerRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openPhoto])

  const close = () => {
    setOpen(null)
    triggerRef.current?.focus()
  }

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
        <p className="engage__whisper">{engagementCopy.whisper}</p>
      </header>

      <ul className="engage__cards">
        {engagementEntries.map((entry) => (
          <li key={entry.id} className="engage__card">
            <p className="engage__meta">
              <span>{entry.date}</span>
              <span className="engage__kind">{entry.kind}</span>
            </p>
            <h3 className="engage__title">{entry.title}</h3>
            <p className="engage__summary">{entry.summary}</p>
            <p className="engage__where">{entry.where}</p>
            {entry.link ? (
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
            <ul className="engage__shots" aria-label={`${entry.title} photos`}>
              {entry.photos.map((photo, index) => (
                <li key={photo.src}>
                  <button
                    type="button"
                    className="engage__shot"
                    aria-label={`View larger. ${photo.alt}`}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget
                      setOpen({ entryId: entry.id, index })
                    }}
                  >
                    <img src={photo.src} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {openPhoto
        ? createPortal(
            <div className="engage__lightbox" onClick={close}>
              <div
                className="engage__lightbox-dialog"
                role="dialog"
                aria-modal="true"
                aria-label={openPhoto.alt}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => {
                  if (event.key === 'Tab') event.preventDefault()
                }}
              >
                <button
                  ref={closeRef}
                  type="button"
                  className="engage__lightbox-close"
                  onClick={close}
                >
                  Close
                </button>
                <img src={openPhoto.src} alt={openPhoto.alt} />
              </div>
            </div>,
            document.querySelector('.app-frame') ?? document.body,
          )
        : null}
    </section>
  )
}
