#Portfolio

Vite + React + TypeScript portfolio scaffold.

## Run

```bash
cd /Users/sejalbansod/mini-portfolio
npm install
npm run dev
```

## Structure

- `src/components/Nav.tsx` — sticky top nav; links scroll to page sections
- `src/components/SageGradient.tsx` — animated WebGL background behind every section
- `src/pages/OnePage.tsx` — single scrolling page: Home → Experience → Projects → About → Engagement
- `src/pages/Engagement.tsx` — engagement log: filter chips, entry list on the left as a vertical tablist, detail panel on the right. Entries live in `engagementEntries` in `src/pages/copy.ts`
- `designs/` — Figma PNG exports

## Figma

File: https://www.figma.com/design/cGXi7VlAdpaLg8y6wBI8UG/mini-portfolio?node-id=0-1

MCP was configured at `~/.cursor/mcp.json`. Authenticate in **Cursor Settings → Tools & MCP → Figma → Connect**, then ask the agent to match hero + nav to the frames.
