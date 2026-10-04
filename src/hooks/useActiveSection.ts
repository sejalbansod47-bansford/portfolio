import { useEffect, useState } from 'react'
import {
  SECTION_IDS,
  getScrollRoot,
  offsetWithin,
  type SectionId,
} from '../lib/sections'

/** Section whose top has passed ~40% down the viewport. */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const root = getScrollRoot()
    if (!root) return

    let raf = 0
    const update = () => {
      raf = 0
      const line = root.scrollTop + root.clientHeight * 0.4
      let current: SectionId = 'home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && offsetWithin(el, root) <= line) current = id
      }
      // The last section can be too short to reach the line
      if (root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
        current = SECTION_IDS[SECTION_IDS.length - 1]
      }
      setActive(current)
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

  return active
}
