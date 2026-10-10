# Cyber Shield

Portfolio name for the ransomware mini game I built on *Practical Project Management & Professional Development* (ISYS20182). The academic title is **Interactive Hacking Experience Game for Cyber Security Education Purposes**. Client: Nottinghamshire Police. Project provider: David Beach. Supervisor: Andreas Oikonomou.

I am a cyber student, not a games-tech one. I taught myself Unreal Engine for this module — layout, maps, scripting, animation, UI — and I am proud of that. Games design is something I already care about, so this project is dear to me. The clips on this page are gameplay from that closer, played back to back.

Facts below are from my individual reflective report. I have not added work I did not do.

## The brief

Nottinghamshire Police asked for a formative educational game aimed at teenagers. The team built it as a level-based set of mini games, so players meet cyber security ideas through progression and objectives rather than a lecture.

After brainstorming we split into a design team and a development team, and shipped small incremental builds. I sat on both.

## My level

I contributed the **third mini game** — the closer.

The concept is ransomware, told through play. The player has fallen victim to an attack and has to recover a stolen directory folder. Ransomware bots patrol the area; they catch and eliminate the player. The job is to capture the objective, make it out safely, and move on.

That closer included:

- complete level design
- character models
- environment buildings
- animation
- 3D camera movement
- start and end sequence UI
- the scripting for the tasks in the level

I worked with the rest of the team so the level still matched the brief we wrote from scratch. Every level had a demo the whole team playtested. I also tested and debugged my own, in both design and development.

## Design

Character design had to feel like a computerised world, and the surroundings had to follow that. The report walks the level through: start UI, an opening info screen that explains the concept and objective, the objective with player and enemy, the space itself, the end goal, and the winning sequence once both objectives are done.

## Development

A lot of the engine work was new, and done from scratch. One piece I am still proud of: when the player is caught, the screen fades and they are prompted to respawn and try again. The scripts cover player/enemy catch sequences, a second objective that grants clearance to the winning sequence, UI logic for those interactions, and the level’s blueprint directory.

## What I had to learn

The game request asked for skills I did not already have. I researched and then actually used:

- finding my way around Unreal Engine
- building map structure — what building and game design meant in that tool
- scripting character movement, base game logic, and win/lose
- importing character animations and scripting them to do what I needed (the biggest single learning jump)
- UI in the engine so a player can navigate the level

## Testing

Testing was mostly debugging scripts and character animation. Interactions were written from scratch, so concept and implementation had to be walked back and forth. The report shows enemies triggering on detection, the item-pick state, the escape door opening and closing after both objectives are collected, and the caught state with the correct UI.

## How I ran the work

I shared progress in our Teams chat while the mini game was in progress, kept a technical-dev-build note so the team could see what was landing, shared learning resources, posted level breakdowns when the map was final, and tracked the work on our Trello board.

On the management side I stepped up as **group leader**: initial planning documents, assigning tasks (people picked what matched their skill), splitting the group into development and designers while still taking both roles on my own level, drafting teams by speciality, Trello plus weekly meetings, and being available to unblock people.

What I did well, in my own reflection: organising the documents when both teams were stuck, assigning tasks people could actually own, and volunteering to design and build an entire mini game — the final level, meant to close the game.

## Honest limits

Learning Unreal from scratch and finishing a complete mini game was the highlight. I taught myself to debug and script from tutorials.

I could have pushed harder on stitching the mini games into one progression. Time ran out; that is a time-management lesson, not a pretend success. Inexperience with Unreal Engine 5 and debugging slowed me, and I had to change the original level idea rather than burn more weeks on it. In a team, not every idea ships. That stung, and it also taught me how collaborative projects actually decide.

What did not land for the group as a whole:

- the split mini games are not fully integrated as one progression
- weak communication on the development side blocked updates and that integration
- documentation of the whole concept and each subsection is thin
- experience in both development and design limited how far the final piece could go

If I took it further: more interactivity in the mini games, a leaderboard, a background story told through still art, difficulty levels, and timers so the educational game can also be speedrun.

What I would practise next: more of Unreal Engine 5, being stricter about what is in range before I spend time on it, and compromising earlier when the group has to lock an idea.
