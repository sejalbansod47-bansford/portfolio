import { GlyphText } from '../components/GlyphText'
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
        {cards.map((card) => (
          <li key={card.title} className="story__card">
            <div className="story__card-head">
              <h3 className="story__card-title">{card.title}</h3>
              {card.line ? (
                <p className="story__card-line">{card.line}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
