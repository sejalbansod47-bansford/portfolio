import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon, DownloadIcon } from './NavIcons'
import './ResumeViewer.css'

const RESUME_SRC = '/Sejal-Bansod-CV.pdf'

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

export function ResumeViewer({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      // aria-modal alone does not stop Tab reaching the page behind
      const stops = [
        ...(windowRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ]
      if (stops.length === 0) return
      const first = stops[0]
      const last = stops[stops.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || !windowRef.current?.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previous?.focus?.()
    }
  }, [onClose])

  return createPortal(
    <div className="resume-viewer">
      {/* Click-away only — Escape and the Close button cover the keyboard */}
      <div
        className="resume-viewer__backdrop"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={windowRef}
        className="resume-viewer__window"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="resume-viewer__chrome">
          <span id={titleId} className="resume-viewer__title">
            Resume — Sejal Bansod
          </span>
          <div className="resume-viewer__actions">
            {/* Frame 37: Menu item · Download (default) */}
            <div className="resume-viewer__menu-item">
              <a
                className="resume-viewer__action"
                href={RESUME_SRC}
                download="Sejal-Bansod-CV.pdf"
              >
                <span className="resume-viewer__action-icon" aria-hidden="true">
                  <DownloadIcon />
                </span>
                Download
              </a>
            </div>
            {/* Frame 37: Menu item · Close (hover prototype = default hover wash) */}
            <div className="resume-viewer__menu-item">
              <button
                ref={closeRef}
                type="button"
                className="resume-viewer__action"
                onClick={onClose}
              >
                <span className="resume-viewer__action-icon resume-viewer__action-icon--close" aria-hidden="true">
                  <CloseIcon />
                </span>
                Close
              </button>
            </div>
          </div>
        </div>
        <div className="resume-viewer__body">
          <iframe
            className="resume-viewer__frame"
            title="Sejal Bansod resume"
            src={`${RESUME_SRC}#view=FitH`}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
