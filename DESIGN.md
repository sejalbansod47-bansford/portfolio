# Design system — Frame 28

Source: Figma [mini-portfolio](https://www.figma.com/design/cGXi7VlAdpaLg8y6wBI8UG/mini-portfolio?node-id=165-92) · node `165:92` · Page 1.

Extracted read-only via Figma Console MCP (REST). **Nothing in Figma was changed.**

Code: `src/design-tokens.css`. Rules: `figma.md`.

## Direction

Muted sage + cream portfolio. One 1280-wide artboard language. Display face is chunky; UI is Mona Sans. Cards sit on the cream field and overlap the sage bands.

Instrument Serif / Jost appear only inside a **screenshot on the Designing card**. They are not product fonts.

## Color

| Primitive | Hex | Frame 28 use |
|-----------|-----|----------------|
| `--a` | `#2A534C` | Ink / active nav. Softened from `#12372F` — too harsh on the sage gradient |
| `--b` | `#6B827A` | Hero + footer bands |
| `--c` | `#BBCAC5` | Older frames only |
| `--d` | `#DFDFD7` | Cards; “Hello!” and lede on sage |
| `--e` | `#F8F5EE` | Page background |
| `--f` | `#FFFFFF` | Canvas swatch |

Semantics: `--color-page`, `--color-band`, `--color-card`, `--color-on-band`, `--color-ink`.

Selection blue on Manga in the editor is Figma’s selection ring, not a brand token.

## Type

| Role | Family | Size / leading / tracking | Sample |
|------|--------|---------------------------|--------|
| Display | **Monomaniac One** Regular | 100 / 10px / 10px | Hello! |
| Lede | **Mona Sans** Regular | 20 / 30 | I Draw, I Shoot, I Notice |
| Nav / labels | **Mona Sans** Regular | 20 / ~20–30 | Resume, Digital Art, Coming Soon |

Nav and card labels were 20× / 30× text boxes; REST 429 blocked a second style read. Treat as Mona Sans 20 until Bridge confirms.

Icons: existing `public/figma/*.svg` + Material Symbols for misc chrome. Do not mix both on one control.

## Layout

- Device preset: MacBook Air **1280×832**. Every route uses this stage, scaled by `useArtboardScale`.
- Frame 28 composition is **1280×1273**. That extra height is **in-artboard scroll** inside About, not a second scale. Figma canvas X/Y (e.g. 3099 / 2939) is not CSS.
- Grid: **18** columns, gutter **20**, inset **40**. Content width is `1280 − 80` (`--content-w`).
- Nav: full content width × 66, padding 20×10, gap 40, item height 44. Top offset 35. Shared Layout nav stays pinned. Glass: 10px radius, 18px blur, translucent cream/white. Home icon 33×31; contact person 16×19.
- Sage band: full-bleed 1280×402, starts **10px below the nav** (`--nav-top` + `--nav-height` + `--nav-band-gap` = 111). Footer sage 197.
- Keyboard `:focus-visible` on pills uses `--color-focus` (`--c` / `#BBCAC5`), not ink.
- Experience (Frame 36 brief): title **Test Engineer** on the sage band; loupe scans each letter then parks to the right. Blog on a cream card. `prefers-reduced-motion` skips the scan.
- About stack: 56px between nav, Hello/lede, and the card grid.
- Cards: fill `--content-w` in three columns, height **364**, radius **10**, padding 16×17, row gap 42.
- Card titles: top-left. Media fills the rest.

## Motion

One quiet language for the whole site. Tokens: `--ease`, `--duration` (220ms), `--duration-enter` (260ms).

1. Transform + opacity only. No bounce, loops, or rainbow.
2. Hover / `:focus-visible` on controls; cards lift 3px.
3. Menus rise 6px and fade in.
4. Page enter: fade + 8px rise on the route root.
5. `prefers-reduced-motion: reduce` turns motion off.
6. Experience title: one-shot loupe scan (transform only), then park. No loop.

## Do / don’t

- Use `var(--*)` from `design-tokens.css`. No new hex or font families.
- Do not copy Figma fractional widths (`207.972px`) into tokens.
- Do not restyle Figma Frame 28 to “match code.”
- Older numbered frames are history. New UI follows 28.
