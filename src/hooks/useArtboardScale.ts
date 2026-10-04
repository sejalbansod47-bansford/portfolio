import { useEffect, useState } from 'react'

const ARTBOARD_W = 1280

function readViewport() {
  if (typeof window === 'undefined') {
    return { scale: 1, width: ARTBOARD_W, height: 832 }
  }
  const view = window.visualViewport
  const viewW = view?.width ?? window.innerWidth
  const viewH = view?.height ?? window.innerHeight
  const scale = viewW / ARTBOARD_W
  return {
    scale,
    width: ARTBOARD_W,
    height: viewH / scale,
  }
}

/** Fill the viewport: 1280 design units span 100vw, height matches 100dvh. */
export function useArtboardScale() {
  const [stage, setStage] = useState(readViewport)

  useEffect(() => {
    const update = () => setStage(readViewport())
    update()
    window.addEventListener('resize', update)
    window.visualViewport?.addEventListener('resize', update)
    window.visualViewport?.addEventListener('scroll', update)
    return () => {
      window.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('scroll', update)
    }
  }, [])

  return stage
}
