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

type SectionListener = (id: SectionId) => void
const sectionListeners = new Set<SectionListener>()

/** Nav highlight follows this, not just native scroll (which can lag a frame). */
export function subscribeActiveSection(fn: SectionListener) {
  sectionListeners.add(fn)
  return () => {
    sectionListeners.delete(fn)
  }
}

function emitActiveSection(id: SectionId) {
  sectionListeners.forEach((fn) => fn(id))
}

export function scrollToSection(
  id: SectionId,
  { focus = true }: { smooth?: boolean; focus?: boolean } = {},
) {
  const root = getScrollRoot()
  const el = document.getElementById(id)
  if (!root || !el) return
  const top = id === 'home' ? 0 : offsetWithin(el, root)
  root.scrollTop = top
  emitActiveSection(id)
  root.dispatchEvent(new Event('scroll'))
  window.history.replaceState(null, '', id === 'home' ? '/' : `#${id}`)
  if (focus) el.focus({ preventScroll: true })
}

/** Park a block inside a section, and highlight that section immediately. */
export function scrollToAnchor(id: SectionId, anchor: string) {
  const root = getScrollRoot()
  const el = document.getElementById(anchor)
  if (!root || !el) {
    scrollToSection(id)
    return
  }
  root.scrollTop = offsetWithin(el, root)
  emitActiveSection(id)
  root.dispatchEvent(new Event('scroll'))
  window.history.replaceState(null, '', `#${anchor}`)
  el.focus({ preventScroll: true })
}
