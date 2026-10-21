import { useEffect, useRef, useState } from 'react'
import './SequentialClips.css'

type SequentialClipsProps = {
  clips: string[]
  label: string
  /** Frame 43 stage: fill the box, no chrome, autoplay in view. */
  variant?: 'default' | 'stage'
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Plays a short list of muted clips in order, then the next, while on screen. */
export function SequentialClips({
  clips,
  label,
  variant = 'default',
}: SequentialClipsProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduce, setReduce] = useState(prefersReducedMotion)
  const stage = variant === 'stage'

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2)
      },
      { threshold: [0, 0.2, 0.35, 0.6, 1] },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!inView) {
      video.pause()
      return
    }
    video.muted = true
    void video.play().catch(() => {
      /* Autoplay can be blocked; the stage has no play control by design. */
    })
  }, [index, inView])

  if (clips.length === 0) return null

  return (
    <div
      className={stage ? 'seq-clips seq-clips--stage' : 'seq-clips'}
      ref={wrapRef}
    >
      <video
        ref={videoRef}
        className="seq-clips__video"
        src={clips[index]}
        muted
        playsInline
        autoPlay
        preload="auto"
        controls={false}
        disablePictureInPicture
        onLoadedData={() => {
          const video = videoRef.current
          if (!video || !inView) return
          video.muted = true
          void video.play().catch(() => {})
        }}
        onEnded={() => {
          const next = indexRef.current + 1
          if (next < clips.length) {
            setIndex(next)
            return
          }
          if (reduce) {
            setIndex(0)
            videoRef.current?.pause()
            return
          }
          setIndex(0)
        }}
        aria-label={`${label}, clip ${index + 1} of ${clips.length}`}
      />
      <p className="seq-clips__count visually-hidden" aria-live="polite">
        Clip {index + 1} of {clips.length}
      </p>
    </div>
  )
}
