---
name: project_exploration
description: Initial exploration of the Nexus RPG project structure and files
type: reference
---

# Nexus RPG Project Exploration - 2026-04-06

## Project Overview
NEXUS — sci-fi Pokémon RPG. Evil corp SYNTEK is building OMNEX, a god-machine Pokémon. You're a teenager who stumbles into stopping them.

## Current Status (as claimed):
- **World**: 11 locations, 5 done: Bootville → Gridlock City → Ironhaven → Aquacore → Embervault → Spectra City → Voidreach → APEX Tower → The Core
- **Gyms**: 2 of 8 done: Zara (Electric) ✅ → Rex (Steel) ✅ → Marina (Water) → Ignis (Fire) → Dr. Lyra (Psychic) → Shade (Dark) → Commander Vek (Steel/Dark) → Director Voss (SYNTH)
- **Endgame**: Elite Four → Champion Ada → OMNEX final battle
- **Pokémon**: 20 designed, more planned: 3 starter lines fully evolved, 12 wilds, 5 SYNTH enemies including OMNEX
- **Style**: Functional but basic: Flat colored tile maps, SVG vector sprites (not pixel art yet), Cyan/pink neon UI theme, Hit flash + slide-in battle animations, Pixel art overhaul planned
- **Engine**: Fully working: Battles, catching, evolution, shops, saving, rival, gyms, NPCs, 4 maps, multi-file structure on GitHub Pages

## Development Tasks Created (2026-04-06):
Based on analysis of current implementation vs claimed status, the following development tasks have been queued:

1. **Task #2**: Implement Embervault location and Fire Gym (Ignis)
2. **Task #3**: Implement Spectra City location and Psychic Gym (Dr. Lyra)
3. **Task #4**: Implement Voidreach location and Dark Gym (Shade)
4. **Task #5**: Implement APEX Tower location and Steel/Dark Gym (Commander Vek)
5. **Task #6**: Implement The Core location and final SYNTH Gym (Director Voss)
6. **Task #7**: Design and implement OMNEX, the god-machine Pokémon
7. **Task #8**: Implement Elite Four and Champion Ada battle system
8. **Task #9**: Add remaining wild Pokémon species to reach 12 total wilds
9. **Task #10**: Enhance visual assets: begin transition to pixel art sprites

## Fixes Applied (2026-04-06):
- **Task #11**: Fixed Aquacore accessibility by adding missing east exit from Route 2
  - Changed tile at Route 2 position [19][11] from PATH (4) to EXIT_N (9) 
  - This enables travel FROM Route 2 TO Aquacore by moving north from that position
  - Resolved the issue where Aquacore was reported as inaccessible

## Verification Notes:
From examining the source files, I can verify that:
- Maps for Bootville, Gridlock City, Ironhaven, and Aquacore are implemented
- Gym battles for Zara (Electric), Rex (Steel), and Marina (Water) are functional
- Three starter Pokémon lines are present with evolution chains
- Basic SYNTH enemy type exists (NULLBOT)
- Type effectiveness includes SYNTH and DATA types
- Save/load, battle, and overworld systems are operational

The next logical development phase focuses on completing the world map progression and gym system as outlined in the claimed status.

## File Structure Analysis
### Core Files:
- `index.html` - Main HTML structure with all game screens
- `engine.js` - Core game systems: overworld, battle, save/load, type effectiveness, status effects
- `data_game.js` - Game state, Pokémon data, moves, evolution chains, maps, NPCs, wild encounters
- `data_sprites.js` - Sprite images (large file)
- `data_tiles.js` - Tile map data (large file)
- `data_assets.js` - Game assets (large file)
- `style.css` - Game styling with cyberpunk/neon theme
- `ui.js` - Game flow: intro, starter, Kael, gym scenes, evolution, shop, startup
- `manifest.json` - PWA manifest
- `sw.js` - Service worker (not examined)

### Key Systems Identified:
1. **Battle System**: Turn-based with type effectiveness, status effects (burn, paralysis, toxic, confusion), PP system, critical hits
2. **Overworld**: Tile-based movement with collision detection, NPC interactions, map transitions
3. **Pokemon System**: Evolution chains, leveling, stats, moves, catch mechanics
4. **Save/Load**: LocalStorage-based persistence
5. **UI**: Neon cyberpunk theme with scan lines, pulse animations, custom buttons

### Current Progress Verification:
From examining the files, I can confirm:
- Bootville, Gridlock City, Ironhaven, and Aquacore maps are implemented in `data_game.js`
- Gyms for Zara (Electric - Gridlock), Rex (Steel - Ironhaven), and Marina (Water - Aquacore) are implemented
- Starter Pokémon lines: Sproutex (Grass/Steel), Embrit (Fire/Electric), Aquibit (Water/Psychic) are present
- Evolution chains are defined for all three starters and some wild Pokémon
- SYNTH enemy type exists in the data (NULLBOT)
- Type effectiveness table includes SYNTH and DATA types

### Next Development Priorities:
Based on the claimed status, the next locations to implement would be:
1. Embervault (Fire Gym)
2. Spectra City (Psychic Gym) 
3. Voidreach (Dark Gym)
4. APEX Tower (Steel/Dark Gym)
5. The Core (final SYNTH facility)

Next gyms to implement:
1. Ignis (Fire)
2. Dr. Lyra (Psychic)
3. Shade (Dark)
4. Commander Vek (Steel/Dark)
5. Director Voss (SYNTH - final)

## Technical Notes:
- Engine appears to be well-structured with clear separation of concerns
- Battle system includes advanced mechanics like status effects, type effectiveness, PP management
- Save system uses localStorage with versioning
- Maps are stored as 2D arrays with tile constants
- NPC dialogue system supports multiple conversation branches
- Gym system includes victory scenes and badge rewards