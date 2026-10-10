export type StoryCard = {
  title: string
  line?: string
  body?: string[]
  clips?: string[]
}

export type StoryCopy = {
  greeting: string
  whisper: string
  cards: StoryCard[]
}

export const projectsCopy: StoryCopy = {
  greeting: 'Projects',
  whisper: 'TWO THINGS I BUILT',
  cards: [
    {
      title: 'Is This For Real',
      line: 'A question I had to test, not just ask.',
    },
    {
      title: 'Cyber Shield',
      line: 'Protection, made visible.',
      clips: [
        '/projects/cyber-shield/clip-1.mp4',
        '/projects/cyber-shield/clip-2.mp4',
      ],
      body: [
        'I am a cyber student, not a games-tech one. Games design still sits close to me, so this module project is dear: I built the Unreal skills for it, and I am proud of that.',
        'Nottinghamshire Police asked for a formative educational game for teenagers — mini games that teach cyber security by playing it. I sat on both the design and development teams and built the third level, the closer.',
        'The level is ransomware. You have fallen victim to an attack and have to recover a stolen directory folder while bots patrol, catch, and eliminate you. Capture the objective, get out, and the game moves on. I designed the level, characters, environment, animations, camera, start and end UI, and the scripting — movement, win and lose, the fade-and-respawn when you are caught.',
        'I started as group leader: planning, splitting the teams, assigning Trello tasks, weekly meetings, Teams updates. Every level had a demo the whole team playtested; I also tested and debugged my own.',
      ],
    },
  ],
}

export const projectLines: Record<string, string> = Object.fromEntries(
  projectsCopy.cards.map((card) => [card.title, card.line ?? '']),
)

export const experienceRole = {
  title: 'Test Engineer',
  company: 'Thrive Learning',
  dates: 'June 2025 – present',
  tenure: 'fourteen months',
}

export const engagementCopy = {
  greeting: 'Engagement',
  whisper: 'THIS PART IS STILL GROWING',
}

export type EngagementKind =
  | 'Hackathon'
  | 'Conference'
  | 'Initiative'
  | 'Community'

export type EngagementEntry = {
  id: string
  /** Month and year, shown in place of a running number */
  date: string
  title: string
  kind: EngagementKind
  /** The one line a closed row carries */
  summary: string
  where: string
  did: string
  took: string
  /** Empty photo slots until the real shots land */
  shots: number
}

/** Newest first. */
export const engagementEntries: EngagementEntry[] = [
  {
    id: 'list-1',
    date: 'Mar 2026',
    title: 'List 1',
    kind: 'Hackathon',
    summary: 'One line on what the weekend turned into.',
    where: 'Placeholder venue, placeholder city.',
    did: 'Placeholder for what I actually built or ran on the day.',
    took: 'Placeholder for the one idea worth repeating.',
    shots: 3,
  },
  {
    id: 'list-2',
    date: 'Jan 2026',
    title: 'List 2',
    kind: 'Conference',
    summary: 'One line on the talk or the room that stuck.',
    where: 'Placeholder venue, placeholder city.',
    did: 'Placeholder for the sessions I sat in and who I spoke to.',
    took: 'Placeholder for a discussion point worth bringing home.',
    shots: 3,
  },
  {
    id: 'list-3',
    date: 'Nov 2025',
    title: 'List 3',
    kind: 'Initiative',
    summary: 'One line on something I started rather than attended.',
    where: 'Placeholder for the project it belonged to.',
    did: 'Placeholder for the thing I set up and kept running.',
    took: 'Placeholder for what it is reusable for next.',
    shots: 2,
  },
  {
    id: 'list-4',
    date: 'Sep 2025',
    title: 'List 4',
    kind: 'Hackathon',
    summary: 'One line on the idea that did not survive the night.',
    where: 'Placeholder venue, placeholder city.',
    did: 'Placeholder for the half I owned and the half I handed over.',
    took: 'Placeholder for what I would scope differently.',
    shots: 2,
  },
  {
    id: 'list-5',
    date: 'Jul 2025',
    title: 'List 5',
    kind: 'Community',
    summary: 'One line on the people side of it.',
    where: 'Placeholder for the group or society.',
    did: 'Placeholder for the part I played.',
    took: 'Placeholder for what changed afterwards.',
    shots: 2,
  },
]

/** Chip order follows first appearance, so the data stays the source of truth. */
export const engagementKinds: EngagementKind[] = [
  ...new Set(engagementEntries.map((entry) => entry.kind)),
]
