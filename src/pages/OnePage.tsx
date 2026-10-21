import { useEffect } from 'react'
import { isSectionId, scrollToSection } from '../lib/sections'
import { About } from './About'
import { projectsCopy } from './copy'
import { Engagement } from './Engagement'
import { Experience } from './Experience'
import { Home } from './Home'
import { StoryPage } from './StoryPage'

export function OnePage() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!isSectionId(id)) return
    const raf = requestAnimationFrame(() =>
      scrollToSection(id, { focus: false }),
    )
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
