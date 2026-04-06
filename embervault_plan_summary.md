# Embervault Location and Fire Gym (Ignis) Implementation Plan

## Context
The Nexus RPG game currently has 4 locations implemented: Bootville, Gridlock City, Ironhaven, and Aquacore. According to the project status, Embervault should be the 5th location with a Fire-type gym led by Ignis. This implementation will add the Embervault map location, connect it to the existing world, implement the Fire Gym with leader Ignis, and add appropriate Fire-type wild encounters.

## Problem Statement
Aquacore was reported as inaccessible due to a missing connection tile. This has been fixed by adding the appropriate EAST exit from Route 2 to Aquacore.

## Proposed Solution: Embervault Implementation
Following the established patterns from existing locations, I will implement Embervault by:

### 1. Map Data Addition (`data_game.js`)
- Add Embervault 2D array to the `MAPS` object with fire/volcanic theme
- Design layout with paths, buildings, and appropriate environmental features
- Connect to Route 2 via south exit (continuing the southern progression)

### 2. NPC Definitions (`data_game.js`)
- Add Gym Guide at entrance with Fire-type battle tips
- Add Nurse Joy at Pokémon Center  
- Add Shop Keeper at item shop
- Add optional story NPCs for SYNTEK plot development

### 3. Wild Encounter Table (`data_game.js`)
- Add Fire-type encounters appropriate for volcanic area
- Include existing Fire-types: Embrit line, Sparkit, Voltfang
- Consider adding new Fire-type wild Pokémon for variety
- Set balanced encounter weights

### 4. Fire-type Gym Leader Pokémon (`data_game.js`)
- Add Ignis's Fire-type team to `POKEMON_BASE`
- Appropriate levels and stats for mid-game gym challenge
- Fire-type moves: Ember, Flamethrower, Fire Spin, etc.
- Consider secondary typing for strategic depth

### 5. Building Definitions (`data_game.js`)
- Gym: `{x:, y:, key:'gym', w:3, h:2}`
- Center: `{x:, y:, key:'center', w:3, h:3}`  
- Shop: `{x:, y:, key:'shop', w:2, h:2}`

### 6. Map Visual Theme (`data_game.js`)
- Add to `MAP_TINT.embervault`: Fire-themed colors (reds, oranges, dark grays)
- Add to `MAP_ACCENT.embervault`: Optional lava glow effects

### 7. Travel Functions (`engine.js`)
- Add `travelToEmbervault()` following established pattern
- Add return function or modify existing Route 2 logic
- Add movement logic: `if(G.map==='route2'&&tile===TILE.EXIT_S){travelToEmbervault();return;}`

### 8. Gym Battle Functions (`engine.js`)
- Add `openGym4()` for Embervault Fire Gym
- Add `startGym4Battle()` with Ignis's Pokémon team
- Add gym victory handling in `endBattle()`:
  - Set `G.flags.beatGym4=true`
  - Add 'fire' badge to `G.badges`
  - Call `showGym4VictoryScene()`

### 9. Victory Scene Functions
- Add `showGym4VictoryScene()` with Ignis's dialogue
- Award Fire Badge with appropriate flavor text
- Set up continuation callback to return to overworld

### 10. Save Game Initialization
- Initialize `G.flags.visitedEmbervault = false`
- Initialize `G.flags.beatGym4 = false`

## Verification Approach
- Test travel from Route 2 to Embervault and back
- Verify first-time visit shows narrative introduction
- Confirm wild encounters are primarily Fire-type
- Check that all buildings (Gym, Center, Shop) are accessible
- Validate Gym Guide provides appropriate Fire-type tips
- Test gym battle sequence triggers correctly
- Confirm Ignis uses appropriate Fire-type Pokémon
- Verify Fire Badge is awarded upon victory
- Check victory scene displays correctly
- Ensure return travel works after completion
- Validate save/load preserves Embervault state

## Implementation Benefits
- Follows exact patterns from existing gyms (1,2,3) ensuring consistency
- Reuses existing Fire-type Pokémon where appropriate for balance
- Uses established NPC dialogue patterns for familiarity
- Applies proven map design principles from other locations
- Maintains consistent flag naming and save game structure

## Risk Mitigation
- Start with simple Embervault map design, iterate based on testing
- Use existing Fire-type moves to ensure battle balance
- Follow coordinate conventions for reliable transitions
- Test all connections thoroughly to prevent softlocks
- Maintain backward compatibility with existing save games