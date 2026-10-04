export type StoryCard = {
  title: string
  line?: string
}

export type StoryCopy = {
  greeting: string
  whisper: string
  cards: StoryCard[]
}

export const projectsCopy: StoryCopy = {
  greeting: 'Projects',
  whisper: 'TWO THINGS I BUILT',
  cards: [],
}

export const projectLines: Record<string, string> = {
  'Is This For Real': 'A question I had to test, not just ask.',
  'Cyber Shield': 'Protection, made visible.',
}

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
