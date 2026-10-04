/** DOM order — the scroll spy walks this list in sequence. */
export const SECTION_IDS = [
  'home',
  'experience',
  'projects',
  'about',
  'engagement',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value)
}

export function getScrollRoot() {
  return document.querySelector<HTMLElement>('.app-main')
}

/** Offset in artboard px — the frame is CSS-scaled, so client rects don't match scrollTop. */
export function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

export function scrollToSection(
  id: SectionId,
  { smooth = true, focus = true }: { smooth?: boolean; focus?: boolean } = {},
) {
  const root = getScrollRoot()
  const el = document.getElementById(id)
  if (!root || !el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  root.scrollTo({
    top: id === 'home' ? 0 : offsetWithin(el, root),
    behavior: smooth && !reduce ? 'smooth' : 'auto',
  })
  window.history.replaceState(null, '', id === 'home' ? '/' : `#${id}`)
  if (focus) el.focus({ preventScroll: true })
}
