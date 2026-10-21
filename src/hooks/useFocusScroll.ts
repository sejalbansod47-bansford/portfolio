import { useEffect } from 'react'
import { getScrollRoot, isSectionId, offsetWithin } from '../lib/sections'

const ABOUT_ORDER = ['art', 'design', 'pics', 'singing', 'sports'] as const
const NAV_PAD = 80

/**
 * The artboard is CSS-scaled, so native "scroll focused node into view" aims
 * at the wrong place. Walk artboard offsets instead. About cards also have to
 * drive the horizontal rail, which is tied to section scroll progress.
 */
export function useFocusScroll() {
  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return
      const root = getScrollRoot()
      if (!root?.contains(target)) return

      const aboutCard = target.closest('.about__card')
      if (aboutCard) {
        revealAboutCard(root, aboutCard)
        return
      }

      // Nav already parked the section at its start. Do not pull it back
      // under the previous page (that left titles mid-viewport).
      if (isSectionId(target.id)) return

      const top = offsetWithin(target, root)
      const height = Math.max(target.offsetHeight, 1)
      const viewTop = root.scrollTop
      const viewBottom = viewTop + root.clientHeight
      if (top >= viewTop + NAV_PAD && top + height <= viewBottom - 16) return
      snap(root, Math.max(0, top - NAV_PAD))
    }

    document.addEventListener('focusin', onFocusIn, true)
    return () => document.removeEventListener('focusin', onFocusIn, true)
  }, [])
}

function revealAboutCard(root: HTMLElement, card: Element) {
  const section = document.getElementById('about')
  if (!section) return
  const kind = [...card.classList]
    .find((c) => c.startsWith('about__card--'))
    ?.replace('about__card--', '')
  const index = ABOUT_ORDER.indexOf(
    kind as (typeof ABOUT_ORDER)[number],
  )
  if (index < 0) return
  const travel = Math.max(0, section.offsetHeight - root.clientHeight)
  const progress = (ABOUT_ORDER.length - 1) > 0 ? index / (ABOUT_ORDER.length - 1) : 0
  snap(root, offsetWithin(section, root) + progress * travel)
}

function snap(root: HTMLElement, top: number) {
  const apply = () => {
    root.scrollTop = top
  }
  apply()
  requestAnimationFrame(() => {
    apply()
    requestAnimationFrame(apply)
  })
}
