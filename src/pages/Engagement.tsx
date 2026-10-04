import { useRef, useState, type KeyboardEvent } from 'react'
import { GlyphText } from '../components/GlyphText'
import { engagementCopy, engagementEntries, engagementKinds } from './copy'
import type { EngagementEntry, EngagementKind } from './copy'
import './Engagement.css'

type Filter = 'All' | EngagementKind

const filters: Filter[] = ['All', ...engagementKinds]

/**
 * Titles on the left, one entry open on the right — the same shape as the
 * Experience studio. Every row is in the tab order; arrows still move between
 * them once one has focus.
 */
export function Engagement() {
  const [filter, setFilter] = useState<Filter>('All')
  const [picked, setPicked] = useState<string | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const shown =
    filter === 'All'
      ? engagementEntries
      : engagementEntries.filter((entry) => entry.kind === filter)
  const active = shown.find((entry) => entry.id === picked) ?? shown[0]

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key) || shown.length === 0) return
    const focusedId =
      shown.find((entry) => `${entry.id}-tab` === document.activeElement?.id)
        ?.id ?? active?.id
    if (!focusedId) return
    event.preventDefault()
    const index = shown.findIndex((entry) => entry.id === focusedId)
    const next =
      event.key === 'ArrowDown'
        ? (index + 1) % shown.length
        : event.key === 'ArrowUp'
          ? (index - 1 + shown.length) % shown.length
          : event.key === 'Home'
            ? 0
            : shown.length - 1
    setPicked(shown[next].id)
    listRef.current
      ?.querySelector<HTMLElement>(`#${shown[next].id}-tab`)
      ?.focus()
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

      <div className="engage__chips" role="group" aria-label="Filter by kind">
        {filters.map((value) => (
          <button
            key={value}
            type="button"
            className={filter === value ? 'engage__chip is-on' : 'engage__chip'}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="engage__split">
        <ul
          className="engage__list"
          aria-label="Engagement entries"
          ref={listRef}
          onKeyDown={onKeyDown}
        >
          {shown.map((entry) => {
            const selected = entry.id === active?.id
            return (
              <li key={entry.id}>
                <button
                  type="button"
                  id={`${entry.id}-tab`}
                  className={selected ? 'engage__tab is-on' : 'engage__tab'}
                  aria-current={selected ? 'true' : undefined}
                  aria-controls={`${entry.id}-panel`}
                  onClick={() => setPicked(entry.id)}
                >
                  <span className="engage__tab-date">{entry.date}</span>
                  <span className="engage__tab-title">{entry.title}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {active ? (
          <div
            className="engage__panel"
            id={`${active.id}-panel`}
            aria-labelledby={`${active.id}-tab`}
          >
            <p className="engage__panel-meta">
              <span>{active.date}</span>
              <span className="engage__panel-kind">{active.kind}</span>
            </p>
            <h3 className="engage__panel-title">{active.title}</h3>
            <p className="engage__panel-summary">{active.summary}</p>
            <Facts entry={active} />
            <ul className="engage__shots" aria-label="Photos to come">
              {Array.from({ length: active.shots }, (_, i) => (
                <li key={i} className="engage__shot" />
              ))}
            </ul>
          </div>
        ) : (
          <p className="engage__empty">Nothing under that filter yet.</p>
        )}
      </div>
    </section>
  )
}

function Facts({ entry }: { entry: EngagementEntry }) {
  return (
    <dl className="engage__facts">
      <div className="engage__fact">
        <dt>Where</dt>
        <dd>{entry.where}</dd>
      </div>
      <div className="engage__fact">
        <dt>What I did</dt>
        <dd>{entry.did}</dd>
      </div>
      <div className="engage__fact">
        <dt>What I took</dt>
        <dd>{entry.took}</dd>
      </div>
    </dl>
  )
}
