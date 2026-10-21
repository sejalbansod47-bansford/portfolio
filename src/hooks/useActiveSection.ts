import { SECTION_IDS, offsetWithin, type SectionId } from '../lib/sections'

/** Section whose top has reached the bar under the nav. Home until then. */
export function sectionFromScroll(root: HTMLElement): SectionId {
  const styles = getComputedStyle(root)
  const navPad = Number.parseFloat(styles.getPropertyValue('--nav-top'))
  const navH = Number.parseFloat(styles.getPropertyValue('--nav-height'))
  const line =
    root.scrollTop +
    (Number.isFinite(navPad) ? navPad : 0) +
    (Number.isFinite(navH) ? navH : 56) +
    8
  let current: SectionId = 'home'
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (el && offsetWithin(el, root) <= line) current = id
  }
  if (root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
    current = SECTION_IDS[SECTION_IDS.length - 1]
  }
  return current
}
