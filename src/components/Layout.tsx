import type { CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'
import { SageGradient } from './SageGradient'
import { useArtboardScale } from '../hooks/useArtboardScale'
import { useFocusScroll } from '../hooks/useFocusScroll'

export function Layout() {
  const { scale, height } = useArtboardScale()
  useFocusScroll()

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
          <Nav />
          <main
            id="main-content"
            className="app-main"
            data-testid="main-content"
            tabIndex={-1}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
