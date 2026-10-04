/**
 * One-off diagnostic: run from mini-portfolio folder to log MCP workspace binding.
 * node scripts/figma-mcp-diagnostic.mjs
 */
import { appendFileSync } from 'node:fs'

const LOG = '/Users/sejalbansod/.cursor/debug-6c941f.log'
const entry = {
  sessionId: '6c941f',
  runId: 'user-repro',
  hypothesisId: 'H1',
  location: 'figma-mcp-diagnostic.mjs',
  message: 'User ran diagnostic from mini-portfolio cwd',
  data: {
    cwd: process.cwd(),
    expectedProject: 'Users-sejalbansod-mini-portfolio',
    miniPortfolioMcpsExists: true,
  },
  timestamp: Date.now(),
}
appendFileSync(LOG, JSON.stringify(entry) + '\n')
console.log('Logged to debug-6c941f.log — cwd:', process.cwd())
