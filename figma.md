# Figma + Cursor rules

File: [mini-portfolio](https://www.figma.com/design/cGXi7VlAdpaLg8y6wBI8UG/mini-portfolio) (`cGXi7VlAdpaLg8y6wBI8UG`)

**Source of truth:** Frame **28** (`165:92`) on Page 1. Tokens live in `src/design-tokens.css` and `DESIGN.md`.

## Never overwrite without permission

- **Do not** edit, restyle, rename, move, lock/unlock, hide, delete, or replace any existing Figma frame, layer, component, page, style, variable, or the Figma file itself unless the user **explicitly** says to change that named thing.
- **Do not** run `figma_execute` or other write tools “to tidy up,” “fix alignment,” or “just add a token” on existing designs.
- **Do not** treat “build a design system” or “match the design” as permission to mutate Figma.
- Read-only extract is always OK (`figma_get_*`, screenshots, status).
- Creating **new** nodes is OK only when the user asked to create them, they sit on empty canvas (never overlapping existing work), and existing frames stay untouched.
- If unsure whether a change is a write: **ask first**.

## Connectors

- **Figma Console MCP** (Desktop Bridge): tokens, styles, fonts, file structure. Keep the plugin running in this file.
- **Official Figma MCP**: screenshots / design-to-code only. Starter quota is tiny — do not burn it on inventory.
- If Bridge is down, use REST reads. Do not invent hex/fonts from a screenshot.

## Design direction

- UI builds follow the global Cursor skill `~/.cursor/skills/design-lane/SKILL.md`.
- Follow Frame 28 + `DESIGN.md`. Do not invent a second palette, type ramp, or artboard size.
- Use CSS tokens (`var(--*)`). No new raw hex or one-off font families in UI code.
- Artboard language is **1280-wide** scaled frames, not a fluid marketing layout.
- Ignore older numbered frames (1–27, Home duplicates) unless the user points at one.

## When implementing a frame

1. Extract that frame (structure, fills, text styles, spacing).
2. Map to existing tokens. Add a token only if Frame 28 uses a new value.
3. Implement in code. Do not write back to Figma unless asked.

## Safety

- Never put a Figma PAT in the repo.
- Never run untrusted Plugin API from chat.
- After any Figma write (only when permitted), say exactly what changed and what was left alone.
