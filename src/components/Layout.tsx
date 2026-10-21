import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'
import { SageGradient } from './SageGradient'
import { useArtboardScale } from '../hooks/useArtboardScale'
import { useFocusScroll } from '../hooks/useFocusScroll'
import { sectionFromScroll } from '../hooks/useActiveSection'
import { subscribeActiveSection, type SectionId } from '../lib/sections'

export function Layout() {
  const { scale, height } = useArtboardScale()
  useFocusScroll()
  const [active, setActive] = useState<SectionId>('home')
  const bind = useCallback((el: HTMLElement | null) => {
    if (el) setActive(sectionFromScroll(el))
  }, [])

  useEffect(() => subscribeActiveSection(setActive), [])

  return (
    <div
      className="app-shell"
      style={
        {
          '--artboard-scale': scale,
          '--frame-h': `${height}px`,
        } as CSSProperties
      }
    >
      <div className="app-scale">
        <div
          className="app-frame"
          style={{ height, transform: `scale(${scale})` }}
        >
          <div className="app-bg" aria-hidden="true">
            <SageGradient className="app-bg__canvas" />
          </div>
          <a className="app-skip" href="#home">
            Skip to content
          </a>
          <Nav active={active} />
          <main
            ref={bind}
            id="main-content"
            className="app-main"
            data-testid="main-content"
            tabIndex={-1}
            onScroll={(event) => setActive(sectionFromScroll(event.currentTarget))}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
