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
  ],
}

export const projectLines: Record<string, string> = {
  'Is This For Real': 'A question I had to test, not just ask.',
  'Cyber Shield': 'Protection, made visible.',
}

export const cyberShieldCopy = {
  title: 'Cyber Shield',
  clips: [
    '/projects/cyber-shield/clip-3.mp4',
    '/projects/cyber-shield/clip-1.mp4',
    '/projects/cyber-shield/clip-2.mp4',
  ],
  /** Right panel. Scan friendly proof for a hiring manager. */
  highlights: [
    'Client: Nottinghamshire Police. A ransomware closer for teenagers, not a lecture.',
    'Owned the third mini game end to end: map, characters, animation, camera, UI, and scripts.',
    'Taught myself Unreal Engine 5 to ship catch and respawn, then playtested it with the team.',
    'Group lead: sat on design and development, planned the work, and unblocked people.',
  ],
  /** Overlay. Ransomware as a chase, for schools and anyone new to security. */
  explain: [
    {
      label: 'The idea',
      body: 'Ransomware holds your files hostage until you pay. This game lets you see that chase. You already got hit. The folder is what they stole, and you have to get it back.',
    },
    {
      label: 'How you play',
      body: 'Pick up the folder and the Defender.exe sword, then leave through the exit. If the bots see you, the screen fades. They caught you. Then you try again.',
    },
    {
      label: 'In real life',
      body: 'The folder is your files. Defender.exe is antivirus, the tool that fights back. The bots are the malware. Fade then retry is restoring a backup.',
    },
  ],
  future: {
    label: 'Future scope',
    body: 'Grab the sword, fight the bots, beat the ransomware. This version only lets you take the items and leave.',
  },
  stillsLabel: 'When you finish the level',
  stills: [
    {
      src: '/projects/cyber-shield/exit.jpg',
      name: 'The exit',
      alt: 'The player at the exit door under a glowing Cyber Shield Up sign, with the prompt Press F to open or close the door.',
    },
    {
      src: '/projects/cyber-shield/complete.jpg',
      name: 'Certified Cyber Defender',
      alt: 'The win screen: You are now a Certified Cyber Defender. Protecting your files and defenses early is the key to staying safe.',
    },
  ],
}

export const experienceRole = {
  title: 'Test Engineer',
  company: 'Thrive Learning',
  dates: 'June 2025 to present',
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
