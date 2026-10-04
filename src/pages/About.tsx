import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { GlyphText } from '../components/GlyphText'
import { getScrollRoot, offsetWithin } from '../lib/sections'
import './About.css'

type CardId = 'art' | 'design' | 'pics' | 'singing' | 'sports'

const CARD_BACK: Record<CardId, string> = {
  art: 'I enjoy making digital art. It is what I do in my free time, and easily my favourite hobby.',
  design:
    'I started designing back when putting aesthetic photos on Instagram was the trend. I got into colour palettes, and into matching the text against the colours already in a photo — that was the start of it. Not long after, I picked up Figma, and here we are: this portfolio was designed in it.',
  pics: 'I love capturing how beautiful nature is, especially sunrises and sunsets. A camera never quite does them justice, but I try anyway and add them to my gallery. I like holding on to serene moments and showing the world — well, my Instagram followers — how I see it.',
  singing:
    'I have been singing ever since I discovered Ariana Grande. Mum used to tell me off for disturbing the neighbours with my screaming, but after moving to the UK I finally gave those screams a platform. I joined the NTU choir and performed with the BBC orchestra at the Royal Concert Hall in Nottingham in 2025, and I have been part of it ever since :)',
  sports:
    'Sports came back into my life when I started playing again at uni. Badminton, table tennis and swimming are my favourites, and that love for it led to a ‘Global Sports Champion 26/27’ role at uni.',
}

const CARD_TITLE: Record<CardId, string> = {
  art: 'Digital Art',
  design: 'Designing',
  pics: 'Pictures',
  singing: 'Singing',
  sports: 'Sports',
}

function PicsGallery() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const dragRef = useRef<{ y: number; start: number } | null>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const maxOffset = () =>
      Math.max(0, track.offsetHeight - viewport.clientHeight)

    const apply = (next: number) => {
      const clamped = Math.min(maxOffset(), Math.max(0, next))
      offsetRef.current = clamped
      track.style.transform = `translate3d(0, ${-clamped}px, 0)`
    }

    const onWheel = (e: WheelEvent) => {
      if (maxOffset() <= 0) return
      const rect = viewport.getBoundingClientRect()
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return
      }
      if (viewport.closest('.about__card.is-flipped')) return
      // At either end, let the page keep scrolling
      if (
        (e.deltaY < 0 && offsetRef.current <= 0) ||
        (e.deltaY > 0 && offsetRef.current >= maxOffset())
      ) {
        return
      }

      e.preventDefault()
      e.stopPropagation()
      apply(offsetRef.current + e.deltaY)
    }

    const onKey = (e: KeyboardEvent) => {
      const page = viewport.clientHeight * 0.85
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        apply(offsetRef.current + (e.key === 'PageDown' ? page : 80))
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        apply(offsetRef.current - (e.key === 'PageUp' ? page : 80))
      } else if (e.key === 'Home') {
        e.preventDefault()
        apply(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        apply(maxOffset())
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      dragRef.current = { y: e.clientY, start: offsetRef.current }
      viewport.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      e.preventDefault()
      apply(drag.start - (e.clientY - drag.y))
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!dragRef.current) return
      dragRef.current = null
      if (viewport.hasPointerCapture(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId)
      }
    }

    const onResize = () => apply(offsetRef.current)
    const onImgLoad = () => apply(offsetRef.current)

    apply(0)
    // Window capture + hit rect — avoids broken hit-testing inside 3D cards
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    viewport.addEventListener('keydown', onKey)
    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove)
    viewport.addEventListener('pointerup', onPointerUp)
    viewport.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('resize', onResize)
    track.querySelectorAll('img').forEach((img) => {
      img.addEventListener('load', onImgLoad)
    })

    return () => {
      window.removeEventListener('wheel', onWheel, true)
      viewport.removeEventListener('keydown', onKey)
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', onPointerUp)
      viewport.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('resize', onResize)
      track.querySelectorAll('img').forEach((img) => {
        img.removeEventListener('load', onImgLoad)
      })
    }
  }, [])

  return (
    <div
      ref={viewportRef}
      className="about__pics-scroll"
      role="region"
      aria-label="Photo gallery, scroll with the mouse or trackpad"
    >
      <div ref={trackRef} className="about__pics-track">
        <img src="/about/sunset.png" alt="Sunset over a city rooftop" />
        <img
          src="/about/sunset-pink.png"
          alt="Pink dusk over a plaza and glass building"
        />
        <img
          src="/about/sunset-past.png"
          alt="Twilight over houses and trees"
        />
      </div>
    </div>
  )
}

function FlipCard({
  id,
  flipped,
  onToggle,
  className,
  front,
}: {
  id: CardId
  flipped: boolean
  onToggle: () => void
  className: string
  front: ReactNode
}) {
  const baseId = useId()
  const backId = `${baseId}-back`
  const title = CARD_TITLE[id]
  const frontRef = useRef<HTMLButtonElement>(null)
  const backRef = useRef<HTMLButtonElement>(null)
  const handoff = useRef(false)

  // The face turning away goes inert, which drops focus — pass it to the face
  // now pointing at the reader.
  useEffect(() => {
    if (!handoff.current) return
    handoff.current = false
    const target = flipped ? backRef.current : frontRef.current
    target?.focus()
  }, [flipped])

  const toggle = () => {
    handoff.current = true
    onToggle()
  }

  return (
    <li
      className={`about__card ${className}${flipped ? ' is-flipped' : ''}`}
    >
      <div className="about__card-inner">
        <div
          className="about__card-face about__card-face--front"
          inert={flipped}
        >
          <button
            ref={frontRef}
            type="button"
            className="about__card-title"
            aria-expanded={flipped}
            aria-controls={backId}
            onClick={toggle}
          >
            {title}
          </button>
          {front}
        </div>

        <div
          className="about__card-face about__card-face--back"
          id={backId}
          inert={!flipped}
          aria-hidden={!flipped}
        >
          <button
            ref={backRef}
            type="button"
            className="about__card-title"
            aria-expanded={flipped}
            onClick={toggle}
          >
            {title}
          </button>
          <p className="about__card-back-text">{CARD_BACK[id]}</p>
        </div>
      </div>
    </li>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLUListElement>(null)
  const [flipped, setFlipped] = useState<Partial<Record<CardId, boolean>>>({})

  const toggle = (id: CardId) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      // Escape unflips every card, so focus on a back face has to come forward
      const back = (document.activeElement as HTMLElement | null)?.closest(
        '.about__card-face--back',
      )
      const front = back?.parentElement?.querySelector<HTMLElement>(
        '.about__card-face--front .about__card-title',
      )
      setFlipped({})
      if (front) requestAnimationFrame(() => front.focus())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Vertical page scroll through the pinned section drives the card rail sideways
  useEffect(() => {
    const root = getScrollRoot()
    const section = sectionRef.current
    const rail = railRef.current
    if (!root || !section || !rail) return

    let raf = 0
    const update = () => {
      raf = 0
      const travel = section.offsetHeight - root.clientHeight
      const into = root.scrollTop - offsetWithin(section, root)
      const progress = travel > 0 ? Math.min(1, Math.max(0, into / travel)) : 0
      const maxShift = Math.max(0, rail.scrollWidth - root.clientWidth)
      rail.style.marginLeft = `${-progress * maxShift}px`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    root.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about"
      aria-labelledby="about-title"
      tabIndex={-1}
    >
      <div className="about__pin-wrap">
        <div className="about__sticky">
          <div className="about__body">
            <div className="about__intro">
              <h2
                id="about-title"
                className="about__hello"
                aria-label="About me"
              >
                <GlyphText text="About me" />
              </h2>
            </div>

            <div className="about__viewport">
              <ul ref={railRef} className="about__rail">
                <FlipCard
                  id="art"
                  flipped={!!flipped.art}
                  onToggle={() => toggle('art')}
                  className="about__card--art"
                  front={
                    <>
                      <div className="about__blob" aria-hidden="true" />
                      <img
                        className="about__frog"
                        src="/about/frog.gif?v=8"
                        alt=""
                      />
                      <span className="about__ghost-wrap">
                        <img
                          className="about__ghost"
                          src="/about/ghost.gif?v=4"
                          alt=""
                        />
                      </span>
                    </>
                  }
                />

                <FlipCard
                  id="design"
                  flipped={!!flipped.design}
                  onToggle={() => toggle('design')}
                  className="about__card--design"
                  front={
                    <img
                      className="about__design"
                      src="/about/designing.png"
                      alt="Workspace showing Instrument Serif and Jost"
                    />
                  }
                />

                <FlipCard
                  id="pics"
                  flipped={!!flipped.pics}
                  onToggle={() => toggle('pics')}
                  className="about__card--pics"
                  front={<PicsGallery />}
                />

                <FlipCard
                  id="singing"
                  flipped={!!flipped.singing}
                  onToggle={() => toggle('singing')}
                  className="about__card--singing"
                  front={
                    <div className="about__singing" aria-hidden="true">
                      <img
                        className="about__conductor"
                        src="/about/singing/conductor.png"
                        alt=""
                      />
                      <span className="about__notes">
                        <img
                          className="about__note about__note--21"
                          src="/about/singing/note-21.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--20"
                          src="/about/singing/note-20.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--26a"
                          src="/about/singing/note-26.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--26b"
                          src="/about/singing/note-26.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--32a"
                          src="/about/singing/note-32.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--32b"
                          src="/about/singing/note-32.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--25a"
                          src="/about/singing/note-25.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--25b"
                          src="/about/singing/note-25.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--24a"
                          src="/about/singing/note-24.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--24b"
                          src="/about/singing/note-24.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--21b"
                          src="/about/singing/note-21.png"
                          alt=""
                        />
                        <img
                          className="about__note about__note--20b"
                          src="/about/singing/note-20.png"
                          alt=""
                        />
                      </span>
                    </div>
                  }
                />

                <FlipCard
                  id="sports"
                  flipped={!!flipped.sports}
                  onToggle={() => toggle('sports')}
                  className="about__card--sports"
                  front={
                    <>
                      <img
                        className="about__shuttle"
                        src="/about/shuttle.png"
                        alt=""
                      />
                      <img
                        className="about__paddles"
                        src="/about/paddles.png"
                        alt=""
                      />
                      <img
                        className="about__swimmers"
                        src="/about/swimmers.png"
                        alt=""
                      />
                    </>
                  }
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
