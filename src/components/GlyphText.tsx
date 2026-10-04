import { Fragment } from 'react'

/**
 * The display face is Material Symbols, an icon font: a run of letters that
 * matches an icon name ("browser", "with") is substituted for a glyph. Turning
 * ligatures off in CSS is not honoured by every engine — Safari still swaps —
 * so each letter gets its own atomic box, which shaping cannot cross. Give the
 * host element an `aria-label` with the plain string.
 */
export function GlyphText({ text }: { text: string }) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          {w > 0 ? ' ' : null}
          <span className="glyph-word">
            {[...word].map((char, i) => (
              <span key={`${char}-${i}`} className="glyph-char">
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </>
  )
}
