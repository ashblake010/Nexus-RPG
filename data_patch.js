// ═══════════════════════════════════════════════
// NEXUS — data_patch.js  v3.4
// Load order: data.js → new_assets_b64.js → data_patch.js → engine.js → ui.js
// ═══════════════════════════════════════════════

// ── 1. MOVE_DATA PATCH ──────────────────────────────────────────────────────
(function patchMoveData(){
  if(typeof MOVE_DATA==='undefined')return;
  const patch={
    'Vine Whip':    {type:'Grass',    pwr:45,  acc:100,pp:25,effect:null,     recoil:0},
    'Harden':       {type:'Normal',   pwr:0,   acc:100,pp:30,effect:'def+1',  recoil:0},
    'Blade Bloom':  {type:'Grass',    pwr:90,  acc:95, pp:10,effect:null,     recoil:0},
    'Iron Defense': {type:'Steel',    pwr:0,   acc:100,pp:15,effect:'def+2',  recoil:0},
    'Ember':        {type:'Fire',     pwr:40,  acc:100,pp:25,effect:'burn10', recoil:0},
    'Spark':        {type:'Electric', pwr:65,  acc:100,pp:20,effect:'para30', recoil:0},
    'Plasma Surge': {type:'Fire',     pwr:95,  acc:90, pp:10,effect:'para20', recoil:0},
    'Quick Attack': {type:'Normal',   pwr:40,  acc:100,pp:20,effect:null,     recoil:0},
    'Water Gun':    {type:'Water',    pwr:40,  acc:100,pp:25,effect:null,     recoil:0},
    'Confusion':    {type:'Psychic',  pwr:50,  acc:100,pp:25,effect:'conf10', recoil:0},
    'Mind Current': {type:'Psychic',  pwr:95,  acc:90, pp:10,effect:null,     recoil:0},
    'Protect':      {type:'Normal',   pwr:0,   acc:100,pp:10,effect:'protect',recoil:0},
    'Thunder Shock':{type:'Electric', pwr:40,  acc:100,pp:30,effect:'para10', recoil:0},
    'Hex':          {type:'Ghost',    pwr:65,  acc:100,pp:10,effect:null,     recoil:0},
    'Metal Claw':   {type:'Steel',    pwr:50,  acc:95, pp:35,effect:null,     recoil:0},
    'Thunderbolt':  {type:'Electric', pwr:90,  acc:100,pp:15,effect:'para10', recoil:0},
    'Flamethrower': {type:'Fire',     pwr:90,  acc:100,pp:15,effect:'burn10', recoil:0},
    'Wild Charge':  {type:'Electric', pwr:90,  acc:100,pp:15,effect:null,     recoil:0.25},
    'Circuit Slam': {type:'SYNTH',    pwr:60,  acc:100,pp:20,effect:null,     recoil:0},
    'Override':     {type:'SYNTH',    pwr:0,   acc:90, pp:15,effect:'para',   recoil:0},
    'Air Slash':    {type:'Flying',   pwr:75,  acc:95, pp:15,effect:null,     recoil:0},
    'Toxic':        {type:'Poison',   pwr:0,   acc:90, pp:10,effect:'toxic',  recoil:0},
    'Dig':          {type:'Ground',   pwr:80,  acc:100,pp:10,effect:null,     recoil:0},
    'Iron Claw':    {type:'Steel',    pwr:65,  acc:95, pp:20,effect:null,     recoil:0},
    'Rock Slide':   {type:'Rock',     pwr:75,  acc:90, pp:10,effect:null,     recoil:0},
    'Iron Head':    {type:'Steel',    pwr:80,  acc:100,pp:15,effect:null,     recoil:0},
    'Volt Surge':   {type:'Electric', pwr:120, acc:85, pp:5, effect:null,     recoil:0},
    'Drill Run':    {type:'Ground',   pwr:80,  acc:95, pp:10,effect:null,     recoil:0},
    'Earthquake':   {type:'Ground',   pwr:100, acc:100,pp:10,effect:null,     recoil:0},
    'Steel Beam':   {type:'Steel',    pwr:140, acc:95, pp:5, effect:null,     recoil:0.5},
    'Bug Bite':     {type:'Bug',      pwr:60,  acc:100,pp:20,effect:null,     recoil:0},
    'Arc Beam':     {type:'Electric', pwr:75,  acc:95, pp:15,effect:null,     recoil:0},
  };
  for(const [name,fields] of Object.entries(patch)){
    if(!MOVE_DATA[name])MOVE_DATA[name]={};
    Object.assign(MOVE_DATA[name],fields);
  }
  console.log('[NEXUS] MOVE_DATA patched.');
})();

// ── 2. ASSET INJECTION ──────────────────────────────────────────────────────
(function injectAssets(){
  function mkImg(b64,ext){
    const img=new Image();
    img.src='data:image/'+(ext||'png')+';base64,'+b64;
    return img;
  }

  // Tile images (JPEG)
  if(typeof TILE_IMAGES!=='undefined'){
    if(typeof ASSET_GRASS_BOOT!=='undefined') TILE_IMAGES['grass_boot']=mkImg(ASSET_GRASS_BOOT,'jpeg');
    if(typeof ASSET_PATH_BOOT !=='undefined') TILE_IMAGES['path_boot'] =mkImg(ASSET_PATH_BOOT, 'jpeg');
    if(typeof ASSET_GROUND_R2 !=='undefined') TILE_IMAGES['ground_r2'] =mkImg(ASSET_GROUND_R2, 'jpeg');
    console.log('[NEXUS] Tile images injected.');
  }

  // Building + prop images (PNG)
  if(typeof BUILDING_IMAGES!=='undefined'){
    const bmap={
      house_a:'ASSET_HOUSE_A', house_b:'ASSET_HOUSE_B',
      fountain:'ASSET_FOUNTAIN', street_lamp:'ASSET_STREET_LAMP',
      syntek_billboard:'ASSET_SYNTEK_BILLBOARD', boulder:'ASSET_BOULDER',
      dead_tree:'ASSET_DEAD_TREE', toxic_puddle:'ASSET_TOXIC_PUDDLE',
      metal_crate:'ASSET_METAL_CRATE', factory_iron:'ASSET_FACTORY_IRON',
      syntek_plant:'ASSET_SYNTEK_PLANT',
      // legacy from new_assets_b64.js if present
      fence:'ASSET_FENCE', neon_building:'ASSET_NEON_BUILDING', bridge:'ASSET_BRIDGE',
    };
    for(const [key,v] of Object.entries(bmap)){
      if(typeof window[v]!=='undefined') BUILDING_IMAGES[key]=mkImg(window[v]);
    }
    console.log('[NEXUS] Building/prop images injected.');
  }

  // Evolution sprite injection
  if(typeof SPRITE_IMAGES!=='undefined'){
    const smap={
      thornex:'ASSET_THORNEX', vegithorn:'ASSET_VEGITHORN',
      flamcore:'ASSET_FLAMCORE', infernox:'ASSET_INFERNOX',
      hydrobit:'ASSET_HYDROBIT', tidalcore:'ASSET_TIDALCORE',
      glitchwraith:'ASSET_GLITCHWRAITH',
      gearoth:'ASSET_GEAROTH', drillcore:'ASSET_DRILLCORE',
    };
    for(const [key,v] of Object.entries(smap)){
      if(typeof window[v]!=='undefined') SPRITE_IMAGES[key]=mkImg(window[v]);
    }
    console.log('[NEXUS] Evo sprites injected.');
  }
})();

// ── 3. BUILDINGS_BY_MAP REDESIGN ────────────────────────────────────────────
// Props with h=1 are walkable (blocking formula: y >= b.y && y < b.y+h-1 = y<b.y → never)
// Props with h=2 block only their top row; front row is passable/triggerable
(function redesignBuildings(){
  if(typeof BUILDINGS_BY_MAP==='undefined')return;

  BUILDINGS_BY_MAP.bootville=[
    {x:7, y:2, key:'lab',              w:3, h:3},
    {x:2, y:2, key:'house_a',          w:2, h:2},
    {x:17,y:2, key:'house_a',          w:2, h:2},
    {x:2, y:6, key:'house_b',          w:2, h:2},
    {x:17,y:6, key:'house_b',          w:2, h:2},
    {x:12,y:8, key:'fountain',         w:1, h:2},
    {x:6, y:11,key:'fence',            w:3, h:1},
    {x:14,y:11,key:'fence',            w:3, h:1},
  ];

  BUILDINGS_BY_MAP.gridlock=[
    {x:7, y:2, key:'gym',              w:3, h:2},
    {x:13,y:4, key:'center',           w:3, h:3},
    {x:19,y:4, key:'shop',             w:2, h:2},
    {x:2, y:9, key:'neon_building',    w:2, h:3},
    {x:18,y:9, key:'neon_building',    w:2, h:3},
    {x:5, y:7, key:'street_lamp',      w:1, h:2},
    {x:16,y:7, key:'street_lamp',      w:1, h:2},
    {x:5, y:14,key:'street_lamp',      w:1, h:2},
    {x:16,y:14,key:'street_lamp',      w:1, h:2},
    {x:3, y:13,key:'syntek_billboard', w:2, h:1},
  ];

  BUILDINGS_BY_MAP.route2=[
    {x:2, y:3, key:'boulder',          w:2, h:2},
    {x:20,y:3, key:'boulder',          w:2, h:2},
    {x:2, y:14,key:'boulder',          w:2, h:2},
    {x:20,y:14,key:'boulder',          w:2, h:2},
    {x:5, y:5, key:'dead_tree',        w:2, h:2},
    {x:17,y:5, key:'dead_tree',        w:2, h:2},
    {x:8, y:12,key:'dead_tree',        w:2, h:2},
    {x:14,y:12,key:'dead_tree',        w:2, h:2},
    {x:4, y:9, key:'toxic_puddle',     w:1, h:1},
    {x:18,y:9, key:'toxic_puddle',     w:1, h:1},
    {x:6, y:17,key:'toxic_puddle',     w:1, h:1},
    {x:16,y:17,key:'toxic_puddle',     w:1, h:1},
  ];

  BUILDINGS_BY_MAP.ironhaven=[
    {x:7, y:2, key:'gym',              w:3, h:2},
    {x:13,y:4, key:'center',           w:3, h:3},
    {x:19,y:4, key:'shop',             w:2, h:2},
    {x:2, y:9, key:'factory_iron',     w:3, h:3},
    {x:18,y:9, key:'syntek_plant',     w:3, h:3},
    {x:6, y:13,key:'metal_crate',      w:1, h:1},
    {x:7, y:14,key:'metal_crate',      w:1, h:1},
    {x:16,y:13,key:'metal_crate',      w:1, h:1},
    {x:17,y:14,key:'metal_crate',      w:1, h:1},
    {x:3, y:14,key:'metal_crate',      w:1, h:1},
    {x:5, y:7, key:'street_lamp',      w:1, h:2},
    {x:16,y:7, key:'street_lamp',      w:1, h:2},
  ];

  console.log('[NEXUS] BUILDINGS_BY_MAP redesigned.');
})();

// ── 4. MAP REDESIGN ─────────────────────────────────────────────────────────
// 24 wide x 22 tall. Tile IDs: 0=GRASS 1=WALL 2=TREE 3=WATER 4=PATH
//   5=TALL_GRASS 6=CENTER_FLOOR 7=GYM_FLOOR 8=SIGN 9=EXIT_N 10=EXIT_S
(function redesignMaps(){
  if(typeof MAPS==='undefined')return;
  const G=0,W=1,T=2,WA=3,P=4,TG=5,C=6,GY=7,S=8,EN=9,ES=10;

  // BOOTVILLE — green suburb
  // Path spine: col 11. Horizontal paths: rows 4, 8, 13.
  // Tall grass encroaches from south. Trees cluster mid-map.
  // Pond top-right (cols 18-20, rows 2-3).
  // Key NPC tiles: Ada(8,4)=P, Sign(8,9)=S, OldTrainer(4,11)=G, Kael(16,7)=P
  // Spawn(11,10)=P  Arrival-S(11,19)=P  EXIT_S(11,20)
  MAPS.bootville=[
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,WA,WA,WA,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,P,P,P,G,G,G,G,G,WA,WA,WA,G,G,W],
    [W,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,G,G,W],
    [W,G,P,P,P,P,P,P,P,G,G,P,G,P,P,P,P,P,P,P,G,G,G,W],
    [W,G,G,G,G,G,G,G,S,G,G,P,G,G,G,G,G,G,G,G,G,S,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,T,T,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,T,T,T,G,G,W],
    [W,T,T,G,G,G,G,G,G,G,G,P,G,G,G,G,G,T,T,T,T,G,G,W],
    [W,TG,TG,P,P,P,P,P,P,P,P,P,P,P,P,P,TG,TG,TG,TG,TG,G,G,W],
    [W,TG,TG,TG,G,G,G,G,G,G,G,P,G,G,G,TG,TG,TG,TG,TG,TG,G,G,W],
    [W,TG,TG,TG,G,G,G,G,G,G,G,P,G,G,G,TG,TG,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,G,G,G,G,G,G,P,G,G,TG,TG,TG,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,TG,G,G,G,G,G,P,G,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,TG,TG,G,G,G,G,P,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,ES,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  ];

  // GRIDLOCK CITY — cyberpunk neon grid
  // GRASS(0) = dark asphalt (road_grid tile). PATH(4) = neon sidewalk.
  // Gym(7,2 h=2) entrance row 3. Center(13,4) entrance row 6.
  // GYM floor tiles at cols 7-9 row 3. CENTER floor at cols 13-15 row 5.
  // Key NPCs: GymGuide(8,3) → approach from(8,4). NurseJoy(8,5) → approach from(8,6).
  // SYNTEKExec(3,6) YoungTrainer(17,6) Shop(20,5)
  // EXIT_N(11,1)  Arrival-N(11,2)  Arrival-S(11,19)  EXIT_S(11,20)
  MAPS.gridlock=[
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
    [W,G,G,G,G,G,G,G,G,G,G,EN,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,GY,GY,GY,P,P,P,P,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,C,C,C,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,W],
    [W,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,ES,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  ];

  // ROUTE 2 — IRON PASS
  // GRASS(0) = cracked dark earth. TALL(5) = dead grass. PATH(4) = worn trail.
  // Tall grass flanks both sides, closing in toward the middle.
  // Boulders and dead trees block off shortcuts.
  // Key NPCs: Sign(8,4) Hiker(3,5) KaelRival(11,8) Trainer(18,9)
  // EXIT_N(11,1)  Arrival-N(11,2)  Arrival-S(11,19)  EXIT_S(11,20)
  MAPS.route2=[
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
    [W,G,G,G,G,G,G,G,G,G,G,EN,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,TG,TG,G,G,G,G,G,S,G,G,P,G,G,G,G,G,G,G,TG,TG,TG,TG,W],
    [W,TG,TG,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,TG,G,G,G,G,G,P,G,G,G,G,TG,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,TG,G,G,G,G,G,P,G,G,G,G,TG,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,G,G,G,G,G,G,G,P,G,G,G,G,G,G,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,G,G,G,G,G,G,P,G,G,G,G,G,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,G,G,G,G,G,G,P,G,G,G,G,G,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,TG,G,G,G,G,G,P,G,G,G,G,TG,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,TG,G,G,G,G,G,P,G,G,G,G,TG,TG,TG,TG,TG,TG,TG,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,TG,TG,TG,G,G,G,G,G,G,G,P,G,G,G,G,G,G,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,G,G,G,G,G,G,G,P,G,G,G,G,G,G,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,G,G,G,G,G,G,P,G,G,G,G,G,TG,TG,TG,TG,TG,TG,W],
    [W,TG,TG,TG,TG,TG,G,G,G,G,G,P,G,G,G,G,TG,TG,TG,TG,TG,TG,TG,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,ES,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  ];

  // IRONHAVEN CITY — factory/steel district
  // GRASS(0) = dark industrial metal (floor_iron tile when added). PATH(4) = walkway.
  // Three horizontal walkways divide the map. Factory and SYNTEK plant dominate south.
  // Key NPCs: GymGuide(8,3) NurseJoy(8,5) Sign(11,5)=P OldMiner(3,6) Boy(17,6) Shop(20,5)
  // EXIT_N(11,1)  Arrival-N(11,2)  Arrival-S(11,19)  EXIT_S(11,20)
  MAPS.ironhaven=[
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
    [W,G,G,G,G,G,G,G,G,G,G,EN,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,GY,GY,GY,P,P,P,P,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,C,C,C,G,G,G,G,G,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,G,G,G,G,P,G,G,G,G,P,G,G,G,G,P,G,G,G,P,G,G,W],
    [W,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,W],
    [W,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,W],
    [W,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,G,G,G,G,G,G,G,G,G,G,ES,G,G,G,G,G,G,G,G,G,G,G,W],
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  ];

  console.log('[NEXUS] All 4 maps redesigned.');
})();

// ── 5. PER-CITY TILE THEME PATCH (runs after engine.js defines MAP_TILE_THEMES) ──
window.addEventListener('load',()=>{
  if(typeof MAP_TILE_THEMES==='undefined')return;
  const TILE={GRASS:0,PATH:4,TALL:5};
  if(!MAP_TILE_THEMES.bootville) MAP_TILE_THEMES.bootville={};
  MAP_TILE_THEMES.bootville[TILE.GRASS]='grass_boot';
  MAP_TILE_THEMES.bootville[TILE.PATH] ='path_boot';
  if(!MAP_TILE_THEMES.route2) MAP_TILE_THEMES.route2={};
  MAP_TILE_THEMES.route2[TILE.GRASS]='ground_r2';
  MAP_TILE_THEMES.route2[TILE.PATH] ='ground_r2';
  // Gridlock + Ironhaven: tiles pending Batch 2 uploads
  console.log('[NEXUS] City tile themes patched.');
});

console.log('[NEXUS] data_patch.js v3.4 loaded.');
