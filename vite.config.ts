import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Lightning CSS rewrites backdrop-filter into the Safari-only prefix and
    // drops the standard property. Chrome then paints the glass as a flat wash.
    cssMinify: false,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store',
    },
  },
})
