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
      title: 'Cyber Shield',
      line: 'Protection, made visible.',
    },
    {
      title: 'TraceLab',
      line: 'Same photo. Different story.',
    },
  ],
}

export const projectLines: Record<string, string> = {
  'Cyber Shield': 'Protection, made visible.',
  TraceLab: 'Same photo. Different story.',
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
  whisper: 'THE ONE I SHIPPED',
}

export type EngagementKind =
  | 'Hackathon'
  | 'Conference'
  | 'Initiative'
  | 'Community'

export type EngagementPhoto = {
  src: string
  alt: string
}

export type EngagementEntry = {
  id: string
  /** Month and year, shown in place of a running number */
  date: string
  title: string
  kind: EngagementKind
  /** Short enough to sit in a half width card */
  summary: string
  where: string
  link?: { href: string; label: string }
  photos: EngagementPhoto[]
}

/** Newest first. */
export const engagementEntries: EngagementEntry[] = [
  {
    id: 'accel-tracelab',
    date: '15 Oct 2026',
    title: 'TraceLab at Accel',
    kind: 'Hackathon',
    summary:
      'Accel handed out credits from a lot of companies, and the task was a swarm of agents. That is where TraceLab came from. The digital investigations module made me want a way to gather evidence when a picture has been changed. You drop private copies of one photo. It shows which belong together and what changed. A separate sceptic can throw a claim out. The pictures stay in the tool. Next it can tell when a whole file is hidden inside another file, and when generative AI changed a picture.',
    where: '83 Rivington Street, London. One day, building long running Claude agents.',
    photos: [
      {
        src: '/engagement/accel-room.jpg',
        alt: 'The Accel AI Innovate London room, with the Accel title on the screen above the bar.',
      },
      {
        src: '/engagement/accel-habits.jpg',
        alt: 'A talk slide at Accel: four habits of agents that run for hours.',
      },
      {
        src: '/engagement/accel-build.jpg',
        alt: 'A talk slide at Accel: Build it. Let it run. Prove it worked.',
      },
      {
        src: '/engagement/tracelab-home.jpg',
        alt: 'The TraceLab site. Same photo, different story, with copies labelled A to D.',
      },
      {
        src: '/engagement/tracelab-drop.jpg',
        alt: 'The TraceLab screen where you drop picture copies, with the reference photo first.',
      },
    ],
  },
]

export const traceLabCopy = {
  title: 'TraceLab',
  href: 'https://tracelab-app.vercel.app',
  linkLabel: 'Open TraceLab',
  highlights: [
    'Accel AI Innovate London, 15 October 2026. The first hackathon I left with a finished product.',
    'Private copies of one photo. It shows which belong together and what changed.',
    'Code measures the files first. A separate sceptic can throw a claim out.',
    'Pictures stay in the tool. The model only reads the measurements.',
  ],
  future: {
    label: 'Future scope',
    body: 'This can be added. A whole file can sit hidden inside another file, and the tool would point that out. It can also tell when generative AI changed a picture.',
  },
}

/** Chip order follows first appearance, so the data stays the source of truth. */
export const engagementKinds: EngagementKind[] = [
  ...new Set(engagementEntries.map((entry) => entry.kind)),
]
