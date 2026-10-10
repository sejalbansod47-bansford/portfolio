import { GlyphText } from '../components/GlyphText'
import { SequentialClips } from '../components/SequentialClips'
import type { StoryCopy } from './copy'
import './StoryPage.css'

export function StoryPage({
  id,
  greeting,
  whisper,
  cards,
}: StoryCopy & { id: string }) {
  const titleId = `${id}-title`
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
        <p className="story__whisper">{whisper}</p>
      </header>
      <ul className="story__cards">
        {cards.map((card) => {
          const playable = Boolean(card.clips?.length)
          return (
            <li
              key={card.title}
              className={playable ? 'story__card story__card--play' : 'story__card'}
              tabIndex={playable ? undefined : 0}
            >
              <div className="story__card-head">
                <h3 className="story__card-title">{card.title}</h3>
                {card.line ? (
                  <p className="story__card-line">{card.line}</p>
                ) : null}
              </div>
              {card.clips?.length ? (
                <SequentialClips
                  clips={card.clips}
                  label={`${card.title} gameplay`}
                />
              ) : null}
              {card.body?.length ? (
                <div
                  className="story__card-copy"
                  tabIndex={0}
                  role="region"
                  aria-label={`${card.title} write-up`}
                >
                  {card.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
