import { useEffect } from 'react'
import {
  getScrollRoot,
  isSectionId,
  offsetWithin,
  scrollToSection,
} from '../lib/sections'
import { About } from './About'
import { projectsCopy } from './copy'
import { Engagement } from './Engagement'
import { Experience } from './Experience'
import { Home } from './Home'
import { StoryPage } from './StoryPage'

export function OnePage() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    const raf = requestAnimationFrame(() => {
      if (isSectionId(id)) {
        scrollToSection(id, { focus: false })
        return
      }
      if (id !== 'tracelab' && id !== 'cyber-shield') return
      const root = getScrollRoot()
      const el = document.getElementById(id)
      if (!root || !el) return
      root.scrollTop = offsetWithin(el, root)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="onepage">
      <Home />
      <Experience />
      <StoryPage id="projects" {...projectsCopy} />
      <About />
      <Engagement />
    </div>
  )
}
