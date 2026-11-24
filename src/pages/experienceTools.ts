/** Tool windows for the Experience mini-browser (Frame 36). */

export type ToolId =
  | 'cypress'
  | 'insomnia'
  | 'mongodb'
  | 'aws'
  | 'browserstack'

export type ToolBullet = { title: string; body: string }
export type ToolLine = { kind: 'comment' | 'code'; text: string }

export type ToolWindow = {
  id: ToolId
  label: string
  title: string
  /** Left pane — what I did at Thrive. */
  placement: ToolBullet[]
  /** Right pane — what the tool is. */
  primer: ToolLine[]
}

export const TOOL_WINDOWS: ToolWindow[] = [
  {
    id: 'cypress',
    label: 'Cypress',
    title: 'Cypress',
    placement: [
      {
        title: 'Frontend E2E',
        body: 'I manually checked every acceptance criterion passed first, then wrote the Cypress tests for that frontend ticket.',
      },
      {
        title: 'Cucumber feature files',
        body: 'With Cucumber I wrote the scenario in plain Gherkin (Given / When / Then) so a product owner could read it. Step definitions mapped each sentence to the Cypress commands that actually ran.',
      },
      {
        title: 'Keeping the suite going',
        body: 'We had a whole E2E suite, so every ticket I passed got its tests added to it, one by one.',
      },
      {
        title: 'Morning ART triage',
        body: 'The automated run tests reran the full suite overnight, yesterday’s additions included. Cypress made the failures quick to read. You could see exactly where each one broke.',
      },
    ],
    primer: [
      { kind: 'comment', text: '// Cypress. What it is' },
      { kind: 'code', text: "const layer = 'end to end testing'" },
      { kind: 'comment', text: '// JS/TS tests that run in a real browser' },
      { kind: 'code', text: 'click · type · assert  // like a user' },
      { kind: 'comment', text: '// same run loop as the app' },
      { kind: 'code', text: 'timeTravel = snapshots + video on fail' },
      { kind: 'comment', text: '// waits for load and animation for you' },
      { kind: 'code', text: 'also: component · API · a11y checks' },
      { kind: 'comment', text: '// unlike Selenium, it is not a remote driver' },
      { kind: 'code', text: 'docs.cypress.io  // why cypress' },
    ],
  },
  {
    id: 'insomnia',
    label: 'Insomnia',
    title: 'Insomnia',
    placement: [
      {
        title: 'Backend APIs',
        body: 'I tested the API side of the same tickets in Insomnia before calling the frontend done.',
      },
      {
        title: 'Against the ticket',
        body: 'Status codes and payloads had to match the acceptance criteria, not only “it returned JSON”.',
      },
      {
        title: 'UI or API?',
        body: 'If the screen failed, Insomnia told me whether the backend had already broken.',
      },
      {
        title: 'Evidence on the ticket',
        body: 'I documented API bugs in Atlassian with the request and response, not just “it doesn’t work”.',
      },
    ],
    primer: [
      { kind: 'comment', text: '// Insomnia (Kong). What it is' },
      { kind: 'code', text: "const app = 'desktop API client'" },
      { kind: 'comment', text: '// Like Postman: design, debug, rerun' },
      { kind: 'code', text: 'REST · GraphQL · gRPC · WebSockets' },
      { kind: 'comment', text: '// collections + environments + auth helpers' },
      { kind: 'code', text: 'OpenAPI specs · mocks · request chaining' },
      { kind: 'comment', text: '// GUI locally, `inso` CLI in CI' },
      { kind: 'code', text: 'developer.konghq.com/insomnia' },
    ],
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    title: 'MongoDB',
    placement: [
      {
        title: 'Environments, tenant by tenant',
        body: 'Every environment the devs deployed to had its own database, with the records split by tenant. Querying a tenant by its domain told me which environment and which config a ticket was actually sitting on.',
      },
      {
        title: 'Flipping config for a ticket',
        body: 'Some tickets needed single sign on switched on or off for a domain, or an email verification code pulled out to verify a user.',
      },
      {
        title: 'Did the write land?',
        body: 'If the app said “saved”, I queried that collection and checked the document’s fields had actually changed.',
      },
      {
        title: 'Test data without the clicks',
        body: 'Finding or resetting a record was often quicker than clicking through the app to reach the state a ticket needed.',
      },
    ],
    primer: [
      { kind: 'comment', text: '// MongoDB. What it is' },
      { kind: 'code', text: "const kind = 'document database (NoSQL)'" },
      { kind: 'comment', text: '// JSON like docs in collections, not SQL rows' },
      { kind: 'code', text: 'filter queries · aggregation pipeline' },
      { kind: 'comment', text: '// $match  $group  $lookup' },
      { kind: 'code', text: 'Atlas = hosted cloud' },
      { kind: 'code', text: 'Compass = GUI' },
      { kind: 'comment', text: '// replica sets for failover; sharding to scale' },
      { kind: 'code', text: 'learn.mongodb.com  // data modeling' },
    ],
  },
  {
    id: 'aws',
    label: 'AWS CloudWatch',
    title: 'CloudWatch',
    placement: [
      {
        title: 'The error behind the error',
        body: 'When a screen only gave me a generic failure, I opened the CloudWatch log group for that service and read the exception the user never sees.',
      },
      {
        title: 'Filtering, not scrolling',
        body: 'I narrowed log streams down by time window and request id instead of reading everything, which pinned a failure to one service.',
      },
      {
        title: 'Is the environment healthy?',
        body: 'Metrics and alarms told me whether the environment was already struggling, so I did not raise a bug that was really infrastructure.',
      },
      {
        title: 'Evidence a dev can follow',
        body: 'The log line and its timestamp went on the Atlassian ticket, so a developer could find the exact same request.',
      },
    ],
    primer: [
      { kind: 'comment', text: '// AWS CloudWatch. What it is' },
      { kind: 'code', text: "const kind = 'observability for AWS'" },
      { kind: 'comment', text: '// logs, metrics and traces in one place' },
      { kind: 'code', text: 'log groups › log streams › events' },
      { kind: 'comment', text: '// Logs Insights = queries over the logs' },
      { kind: 'code', text: 'alarms = threshold + notification' },
      { kind: 'code', text: 'dashboards · retention · metric filters' },
      { kind: 'comment', text: '// X Ray adds request tracing' },
      { kind: 'code', text: 'docs.aws.amazon.com/cloudwatch' },
    ],
  },
  {
    id: 'browserstack',
    label: 'BrowserStack',
    title: 'BrowserStack',
    placement: [
      {
        title: 'Not only my Chrome',
        body: 'I checked frontend tickets on browsers I did not have installed locally, so “works on my laptop” was not the bar.',
      },
      {
        title: 'Browser DevTools',
        body: 'I got fluent in developer tools while chasing layout, console, and accessibility issues.',
      },
      {
        title: 'A11y in other engines',
        body: 'Some accessibility bugs only showed outside my machine. Those still went on the ticket.',
      },
      {
        title: 'A bug someone can reproduce',
        body: 'Browser, steps, screenshot, enough that the Atlassian ticket did not bounce back.',
      },
    ],
    primer: [
      { kind: 'comment', text: '// BrowserStack. What it is' },
      { kind: 'code', text: "const lab = 'cloud of real browsers + phones'" },
      { kind: 'comment', text: '// thousands of browser × OS combinations' },
      { kind: 'code', text: 'Live = manual debug with DevTools' },
      { kind: 'code', text: 'Automate = Selenium · Cypress · Playwright' },
      { kind: 'comment', text: '// real iOS/Android, not only emulators' },
      { kind: 'code', text: 'browserstack.com/live' },
    ],
  },
]
