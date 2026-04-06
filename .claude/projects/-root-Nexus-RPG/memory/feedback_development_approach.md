---
name: feedback_development_approach
description: Effective approach for continuing Nexus RPG development
type: feedback
---

When continuing development of the Nexus RPG project, it's most effective to:

**Focus on implementing one complete location/gym pair at a time**, including map data, NPCs, wild encounters, and gym battle systems. This approach ensures each new area is fully functional and integrated before moving to the next.

**Why**: The game's architecture is modular but interconnected - maps rely on tile data, NPCs reference specific locations, wild encounters are map-specific, and gyms require proper integration with the battle and badge systems. Implementing piecemeal elements leads to integration issues.

**How to apply**: 
1. Start with map tile data in data_game.js
2. Add NPC definitions for that map
3. Define wild encounter tables for the area
4. Implement gym leader dialogue and battle teams
5. Add any area-specific evolution or story elements
6. Test connectivity to/from adjacent areas
7. Update any required story flags or progression systems

This method was validated by examining the existing working implementations (Bootville-Gridlock-Ironhaven-Aquacore corridor) which follow this complete-feature pattern.