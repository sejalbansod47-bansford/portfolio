import { useEffect, useRef, useState } from 'react'
import './SequentialClips.css'

type SequentialClipsProps = {
  clips: string[]
  label: string
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Plays a short list of muted clips in order, then the next, while on screen. */
export function SequentialClips({ clips, label }: SequentialClipsProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const indexRef = useRef(0)
  const userPlayingRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduce, setReduce] = useState(prefersReducedMotion)

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
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35)
      },
      { threshold: [0, 0.35, 0.6, 1] },
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
    const shouldPlay = userPlayingRef.current || !reduce
    if (!shouldPlay) return
    video.muted = true
    void video.play().catch(() => {
      /* Autoplay can be blocked; native controls stay available. */
    })
  }, [index, inView, reduce])

  if (clips.length === 0) return null

  return (
    <div className="seq-clips" ref={wrapRef}>
      <video
        ref={videoRef}
        className="seq-clips__video"
        src={clips[index]}
        muted
        playsInline
        controls
        preload="metadata"
        onLoadedData={() => {
          const video = videoRef.current
          if (!video || !inView) return
          if (!(userPlayingRef.current || !reduce)) return
          void video.play().catch(() => {})
        }}
        onPlay={() => {
          userPlayingRef.current = true
        }}
        onEnded={() => {
          const next = indexRef.current + 1
          if (next < clips.length) {
            setIndex(next)
            return
          }
          if (reduce) {
            userPlayingRef.current = false
            setIndex(0)
            return
          }
          setIndex(0)
        }}
        aria-label={`${label}, clip ${index + 1} of ${clips.length}`}
      />
      <p className="seq-clips__count" aria-live="polite">
        Clip {index + 1} of {clips.length}
      </p>
    </div>
  )
}
