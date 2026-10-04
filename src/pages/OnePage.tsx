import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isSectionId, scrollToSection } from '../lib/sections'
import { About } from './About'
import { projectLines, projectsCopy } from './copy'
import { Engagement } from './Engagement'
import { Experience } from './Experience'
import { Home } from './Home'
import { StoryPage } from './StoryPage'

const projectCards = Object.entries(projectLines).map(([title, line]) => ({
  title,
  line,
}))

export function OnePage() {
  const { hash } = useLocation()

  useEffect(() => {
    const id = hash.slice(1)
    if (!isSectionId(id)) return
    const raf = requestAnimationFrame(() =>
      scrollToSection(id, { smooth: false, focus: false }),
    )
    return () => cancelAnimationFrame(raf)
  }, [hash])

  return (
    <div className="onepage">
      <Home />
      <Experience />
      <StoryPage id="projects" {...projectsCopy} cards={projectCards} />
      <About />
      <Engagement />
    </div>
  )
}
