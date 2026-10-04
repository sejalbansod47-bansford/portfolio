import { GlyphText } from '../components/GlyphText'
import './Home.css'

export function Home() {
  return (
    <section id="home" className="hero" aria-label="Home" tabIndex={-1}>
      <h1
        className="hero__name"
        data-testid="hero-name"
        aria-label="Sejal Bansod"
      >
        <GlyphText text="Sejal" />
        <br />
        <GlyphText text="Bansod" />
      </h1>
    </section>
  )
}
