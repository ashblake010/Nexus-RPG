// ═══════════════════════════════════════════════
// NEXUS — data.js
// All static data: state, Pokémon, moves, maps
// ═══════════════════════════════════════════════

const G = {
  playerName:'ALEX', starter:null, party:[], badges:[],
  location:'BOOTVILLE', steps:0, x:7, y:8, map:'bootville',
  bag:{ nexball:5, superball:0, healpack:3, revive:1 },
  money: 500,
  flags:{ metAda:false, beatGym1:false, visitedGridlock:false, beatKael:false, visitedIronhaven:false, beatGym2:false }
};

// ── EVOLUTION CHAINS ──
const EVOLUTIONS = {
  sproutex: { into:'thornex',  level:16, emoji:'🌳', name:'THORNEX',   type:'Grass/Steel',  hpBonus:18, atkBonus:8,  defBonus:10 },
  thornex:  { into:'vegithorn',level:32, emoji:'🌲', name:'VEGITHORN', type:'Grass/Steel',  hpBonus:25, atkBonus:12, defBonus:14 },
  embrit:   { into:'flamcore', level:16, emoji:'🔥', name:'FLAMCORE',  type:'Fire/Electric',hpBonus:16, atkBonus:12, defBonus:6  },
  flamcore: { into:'infernox', level:32, emoji:'💥', name:'INFERNOX',  type:'Fire/Electric',hpBonus:22, atkBonus:18, defBonus:8  },
  aquibit:  { into:'hydrobit', level:16, emoji:'🌊', name:'HYDROBIT',  type:'Water/Psychic',hpBonus:20, atkBonus:6,  defBonus:12 },
  hydrobit: { into:'tidalcore',level:32, emoji:'🔵', name:'TIDALCORE', type:'Water/Psychic',hpBonus:28, atkBonus:10, defBonus:16 },
  glitchling:{into:'glitchwraith',level:24,emoji:'👻',name:'GLITCHWRAITH',type:'Electric/Ghost',hpBonus:20,atkBonus:14,defBonus:8},
  coglet:   { into:'gearoth',  level:20, emoji:'🔩', name:'GEAROTH',   type:'Steel',        hpBonus:22, atkBonus:10, defBonus:18 },
  sparkit:  { into:'voltfang', level:18, emoji:'🦊', name:'VOLTFANG',  type:'Electric/Fire',hpBonus:18, atkBonus:14, defBonus:6  },
  slagmole: { into:'drillcore',level:30, emoji:'⛏️', name:'DRILLCORE', type:'Ground/Steel',  hpBonus:26, atkBonus:16, defBonus:20 },

  // AQUACORE EVOLUTIONS
  finchen: { into:'tidaloon',level:16, emoji:'🐬', name:'TIDALOON',   type:'Water/Ice',   hpBonus:23, atkBonus:5,  defBonus:5  },
  tidaloon:{ into:'cetacean',level:32, emoji:'🐋', name:'CETACEAN',    type:'Water/Psychic', hpBonus:40, atkBonus:8,  defBonus:6  },
  coralle: { into:'reeffist',level:18, emoji:'🪼', name:'REEFIST',     type:'Water/Steel', hpBonus:29, atkBonus:8,  defBonus:8  },
  reeffist:{ into:'oceanaut',level:36, emoji:'🌊⚡',name:'OCEANAUT',   type:'Water/Electric',hpBonus:20, atkBonus:6,  defBonus:2  },
};
let pendingEvolution = null;

// ── POKÉMON DATA ──
const POKEMON_BASE = {
  sproutex:{name:'SPROUTEX',emoji:'🌿',type:'Grass/Steel',level:5,maxHp:30,hp:30,atk:12,def:10,spd:9,moves:['Vine Whip','Harden','Blade Bloom','Iron Defense'],xp:0,xpNext:100,catchRate:100},
  embrit:  {name:'EMBRIT',  emoji:'🔥',type:'Fire/Electric',level:5,maxHp:28,hp:28,atk:14,def:8,spd:12,moves:['Ember','Spark','Plasma Surge','Quick Attack'],xp:0,xpNext:100,catchRate:100},
  aquibit: {name:'AQUIBIT', emoji:'💧',type:'Water/Psychic',level:5,maxHp:32,hp:32,atk:11,def:11,spd:10,moves:['Water Gun','Confusion','Mind Current','Protect'],xp:0,xpNext:100,catchRate:100},
  glitchling:{name:'GLITCHLING',emoji:'👾',type:'Electric/Ghost',level:3,maxHp:20,hp:20,atk:8,def:6,spd:10,moves:['Spark','Hex'],xp:0,xpNext:80,wild:true,catchRate:180},
  coglet:    {name:'COGLET',emoji:'⚙️',type:'Steel',level:4,maxHp:24,hp:24,atk:9,def:12,spd:6,moves:['Metal Claw','Harden'],xp:0,xpNext:90,wild:true,catchRate:150},
  sparkit:   {name:'SPARKIT',emoji:'⚡',type:'Electric',level:3,maxHp:22,hp:22,atk:10,def:6,spd:13,moves:['Thunder Shock','Quick Attack'],xp:0,xpNext:80,wild:true,catchRate:190},
  fumewing:  {name:'FUMEWING',emoji:'🦅',type:'Poison/Flying',level:6,maxHp:30,hp:30,atk:12,def:7,spd:14,moves:['Air Slash','Toxic'],xp:0,xpNext:110,wild:true,catchRate:120},
  nullbot:   {name:'NULLBOT',emoji:'🤖',type:'SYNTH',level:5,maxHp:26,hp:26,atk:11,def:9,spd:8,moves:['Circuit Slam','Override'],xp:0,xpNext:100,wild:true,catchRate:100},
  glitchwraith:{name:'GLITCHWRAITH',emoji:'👻',type:'Electric/Ghost',level:24,maxHp:72,hp:72,atk:26,def:18,spd:22,moves:['Hex','Thunderbolt','Shadow Ball','Spark'],xp:0,xpNext:280,wild:false,catchRate:75},
  // Gridlock City wilds
  voltfang:  {name:'VOLTFANG',emoji:'🦊',type:'Electric/Fire',level:10,maxHp:44,hp:44,atk:16,def:10,spd:17,moves:['Thunderbolt','Flamethrower','Wild Charge'],xp:0,xpNext:160,wild:true,catchRate:90},
  slagmole:  {name:'SLAGMOLE',emoji:'🦔',type:'Ground/Steel',level:9,maxHp:40,hp:40,atk:14,def:16,spd:7,moves:['Dig','Iron Claw','Rock Slide'],xp:0,xpNext:150,wild:true,catchRate:110},
  // GYM TEAM
  zara_jolteon:{name:'SPARKVOLT',emoji:'⚡',type:'Electric',level:12,maxHp:52,hp:52,atk:18,def:10,spd:20,moves:['Thunderbolt','Quick Attack','Spark'],xp:0,xpNext:0,catchRate:5},
  zara_ampere: {name:'AMPCORE', emoji:'🔌',type:'Electric/Steel',level:14,maxHp:60,hp:60,atk:20,def:15,spd:16,moves:['Thunderbolt','Iron Head','Volt Surge','Arc Beam'],xp:0,xpNext:0,catchRate:5},
  // Ironhaven wilds
  rustmoth:  {name:'RUSTMOTH', emoji:'🦋',type:'Steel/Bug',  level:14,maxHp:48,hp:48,atk:15,def:14,spd:13,moves:['Metal Claw','Bug Bite','Iron Head'],xp:0,xpNext:180,wild:true,catchRate:130},
  gearoth:   {name:'GEAROTH',  emoji:'🔩',type:'Steel',      level:16,maxHp:58,hp:58,atk:18,def:22,spd:8, moves:['Iron Head','Metal Claw','Harden','Rock Slide'],xp:0,xpNext:200,wild:true,catchRate:90},
  drillcore:  {name:'DRILLCORE',emoji:'⛏️',type:'Ground/Steel',level:18,maxHp:66,hp:66,atk:22,def:26,spd:9,moves:['Dig','Iron Claw','Rock Slide','Harden'],xp:0,xpNext:220,wild:true,catchRate:70},
  // REX GYM TEAM
  rex_forgeant:{name:'FORGEANT',emoji:'⚙️',type:'Steel',    level:18,maxHp:72,hp:72,atk:22,def:26,spd:11,moves:['Iron Head','Metal Claw','Harden','Rock Slide'],xp:0,xpNext:0,catchRate:5},
  rex_drillord:{name:'DRILLORD',emoji:'🔧',type:'Steel/Ground',level:21,maxHp:84,hp:84,atk:28,def:30,spd:13,moves:['Drill Run','Iron Head','Earthquake','Steel Beam'],xp:0,xpNext:0,catchRate:5},
  // Mid-stage evolutions (reached via starter evolution at lv16)
  thornex:  {name:'THORNEX', emoji:'🌳',type:'Grass/Steel', level:16,maxHp:48,hp:48,atk:20,def:20,spd:11,moves:['Vine Whip','Blade Bloom','Iron Defense','Harden'],xp:0,xpNext:160,catchRate:45},
  flamcore: {name:'FLAMCORE',emoji:'🔥',type:'Fire/Electric',level:16,maxHp:44,hp:44,atk:26,def:14,spd:18,moves:['Ember','Plasma Surge','Spark','Wild Charge'],xp:0,xpNext:160,catchRate:45},
  hydrobit: {name:'HYDROBIT',emoji:'🌊',type:'Water/Psychic',level:16,maxHp:52,hp:52,atk:17,def:23,spd:14,moves:['Water Gun','Mind Current','Confusion','Protect'],xp:0,xpNext:160,catchRate:45},
  // KAEL RIVAL TEAM
  kael_starter:{name:'RIVALMON',emoji:'🔥',type:'Fire/Electric',level:16,maxHp:64,hp:64,atk:22,def:14,spd:20,moves:['Plasma Surge','Thunderbolt','Quick Attack','Ember'],xp:0,xpNext:0,catchRate:5},

  // AQUACORE WILD POKÉMON
  finchen:{name:'FINCHEN',emoji:'🐧',type:'Water',level:3,maxHp:22,hp:22,atk:9,def:7,spd:11,moves:['Water Gun','Tail Whip'],xp:0,xpNext:80,wild:true,catchRate:180},
  tidaloon:{name:'TIDALOON',emoji:'🐬',type:'Water/Ice',level:13,maxHp:45,hp:45,atk:14,def:12,spd:10,moves:['Water Gun','Powder Snow','Aqua Jet','Ice Shard'],xp:0,xpNext:140,wild:true,catchRate:120},
  cetacean:{name:'CETACEAN',emoji:'🐋',type:'Water/Psychic',level:25,maxHp:85,hp:85,atk:22,def:18,spd:14,moves:['Surf','Psychic','Aqua Tail','Calm Mind'],xp:0,xpNext:240,wild:false,catchRate:60},

  coralle:{name:'CORALLE',emoji:'🪸',type:'Water/Rock',level:4,maxHp:26,hp:26,atk:8,def:14,spd:6,moves:['Water Gun','Rock Throw','Harden'],xp:0,xpNext:90,wild:true,catchRate:150},
  reeffist:{name:'REEFIST',emoji:'🪼',type:'Water/Steel',level:16,maxHp:55,hp:55,atk:16,def:22,spd:8,moves:['Water Gun','Iron Head','Aqua Jet','Metal Claw'],xp:0,xpNext:160,wild:true,catchRate:100},
  oceanaut:{name:'OCEANAUT',emoji:'🌊⚡',type:'Water/Electric',level:28,maxHp:75,hp:75,atk:20,def:16,spd:22,moves:['Surf','Thunderbolt','Aqua Tail','Volt Switch'],xp:0,xpNext:260,wild:false,catchRate:50},
};

const MOVE_DATA = {
  'Vine Whip':    {pwr:45,acc:100,type:'Grass',  pp:25},
  'Harden':       {pwr:0, acc:100,type:'Normal', pp:30,effect:'def+1',msg:'Defense rose!'},
  'Blade Bloom':  {pwr:90,acc:95, type:'Grass',  pp:10,msg:'★ BLADE BLOOM!'},
  'Iron Defense': {pwr:0, acc:100,type:'Steel',  pp:15,effect:'def+2',msg:'Defense sharply rose!'},
  'Ember':        {pwr:40,acc:100,type:'Fire',   pp:25,effect:'burn10'},
  'Spark':        {pwr:65,acc:100,type:'Electric',pp:20,effect:'para30'},
  'Plasma Surge': {pwr:95,acc:90, type:'Fire',   pp:10,effect:'para20',msg:'★ PLASMA SURGE!'},
  'Quick Attack': {pwr:40,acc:100,type:'Normal', pp:20,effect:'priority'},
  'Water Gun':    {pwr:40,acc:100,type:'Water',  pp:25},
  'Confusion':    {pwr:50,acc:100,type:'Psychic',pp:25,effect:'conf10'},
  'Mind Current': {pwr:95,acc:90, type:'Psychic',pp:10,msg:'★ MIND CURRENT!'},
  'Protect':      {pwr:0, acc:100,type:'Normal', pp:10,effect:'protect',msg:'Protected itself!'},
  'Thunder Shock':{pwr:40,acc:100,type:'Electric',pp:30,effect:'para10'},
  'Hex':          {pwr:65,acc:100,type:'Ghost',  pp:10},
  'Metal Claw':   {pwr:50,acc:95, type:'Steel',  pp:35},
  'Thunderbolt':  {pwr:90,acc:100,type:'Electric',pp:15,effect:'para10'},
  'Flamethrower': {pwr:90,acc:100,type:'Fire',   pp:15,effect:'burn10'},
  'Wild Charge':  {pwr:90,acc:100,type:'Electric',pp:15,effect:'recoil25',recoil:0.25,msg:'Took recoil damage!'},
  'Circuit Slam': {pwr:60,acc:100,type:'SYNTH',  pp:20},
  'Override':     {pwr:0, acc:90, type:'SYNTH',  pp:15,effect:'para',msg:'Ability overridden!'},
  'Air Slash':    {pwr:75,acc:95, type:'Flying', pp:15,effect:'flinch30'},
  'Toxic':        {pwr:0, acc:90, type:'Poison', pp:10,effect:'toxic',msg:'Badly poisoned!'},
  'Dig':          {pwr:80,acc:100,type:'Ground', pp:10},
  'Iron Claw':    {pwr:65,acc:95, type:'Steel',  pp:20},
  'Rock Slide':   {pwr:75,acc:90, type:'Rock',   pp:10,effect:'flinch30'},
  'Iron Head':    {pwr:80,acc:100,type:'Steel',  pp:15,effect:'flinch30'},
  'Volt Surge':   {pwr:120,acc:85,type:'Electric',pp:5,msg:'VOLT SURGE!'},
  'Drill Run':    {pwr:80,acc:95, type:'Ground', pp:10,msg:'DRILL RUN!'},
  'Earthquake':   {pwr:100,acc:100,type:'Ground',pp:10,msg:'EARTHQUAKE!'},
  'Steel Beam':   {pwr:140,acc:95,type:'Steel',  pp:5, msg:'★ STEEL BEAM!',effect:'recoil50',recoil:0.5},
  'Bug Bite':     {pwr:60,acc:100,type:'Bug',    pp:20},
  'Arc Beam':     {pwr:75,acc:95, type:'Electric',pp:15},
  'Shadow Ball':  {pwr:80,acc:100,type:'Ghost',   pp:15,effect:'conf10'},
  'Struggle':     {pwr:50,acc:100,type:'Normal',  pp:1, effect:'recoil25',msg:'No PP left — struggling!'},
};


const TILE={GRASS:0,WALL:1,TREE:2,WATER:3,PATH:4,TALL:5,CENTER:6,GYM:7,SIGN:8,EXIT_N:9,EXIT_S:10};
const TILE_COLOR={0:'#1a3a1a',1:'#0a1628',2:'#0d2a0d',3:'#0a2a3a',4:'#2a2a1a',5:'#0d3a0d',6:'#1a0a2a',7:'#2a0a0a',8:'#2a2a0a',9:'#1a1a3a',10:'#1a1a3a'};
const TILE_BORDER={0:'#1e401e',1:'#1a3050',2:'#112211',3:'#0d3a50',4:'#333320',5:'#164816',6:'#3a1a5a',7:'#5a1a1a',8:'#3a3a10',9:'#2a2a5a',10:'#2a2a5a'};

const MAPS = {
    bootville:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,3,3,3,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,3,3,3,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,3,3,3,0,0,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,4,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,4,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,4,0,0,1],
    [1,0,4,4,4,4,4,4,0,0,0,4,0,0,4,4,4,4,4,4,4,0,0,1],
    [1,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,4,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,1],
    [1,5,5,5,5,0,0,0,0,0,0,4,0,0,0,0,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,0,0,0,0,0,0,4,0,0,0,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,0,0,0,0,0,4,0,0,5,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,0,0,0,0,4,0,5,5,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,1],
    [1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
    gridlock:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,4,4,9,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
    route2:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,1],
    [1,3,3,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,3,3,3,3,1],
    [1,3,3,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,3,3,3,3,1],
    [1,3,3,5,5,0,0,0,0,4,0,0,0,0,0,5,5,0,3,3,3,3,3,1],
    [1,3,5,5,5,0,0,0,0,4,0,0,0,0,5,5,5,0,3,3,3,3,3,1],
    [1,0,5,5,5,5,0,0,0,4,0,0,0,5,5,5,0,0,0,3,3,3,3,1],
    [1,0,0,5,5,5,0,0,0,4,0,0,5,5,5,0,0,0,0,0,3,3,3,1],
    [1,0,0,5,5,0,0,0,0,4,0,0,5,5,0,0,0,0,0,0,0,3,3,1],
    [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,3,3,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,3,3,0,1],
    [1,3,3,3,0,0,0,0,4,4,0,0,0,0,0,0,3,3,3,3,3,0,0,1],
    [1,3,3,0,5,5,0,0,4,0,0,0,0,0,5,5,0,3,3,3,0,0,0,1],
    [1,0,0,0,5,5,5,0,4,0,0,0,0,5,5,5,0,0,0,0,0,0,0,1],
    [1,0,0,0,5,5,5,0,0,4,0,0,5,5,5,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,5,5,0,0,4,0,5,5,5,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  ironhaven:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,4,4,9,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,4,4,4,0,0,0,0,0,4,0,0,0,4,4,4,0,0,0,0,4,1],
    [1,4,0,4,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,0,0,4,1],
    [1,4,0,4,4,4,0,0,0,0,0,4,0,0,0,4,4,4,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,4,1],
    [1,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,4,1],
    [1,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,4,1],
    [1,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  aquacore:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,9,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]
};
const NPCS_BY_MAP = {
  bootville:[
    {x:8, y:4, emoji:'👩‍🔬', name:'PROF. ADA', dialogue:[
      "Ah — you made it out there! I've been watching the wild Pokémon near Route 1.",
      "Something is wrong. Their behaviour patterns are... irregular. Erratic. Like something is overriding their instincts.",
      "I've flagged it to SYNTEK's regional office three times. They keep telling me it's 'natural adaptation'.",
      "It isn't. Keep your eyes open as you travel. And keep your Pokémon close.",
    ]},
    {x:8, y:9, emoji:'📋', name:'SIGN', dialogue:[
      "BOOTVILLE — Population: 312",
      "Gateway to Route 1 and Gridlock City.",
      "Warning: Wild Pokémon activity increasing in tall grass south of town.",
      "SYNTEK Corp thanks you for your cooperation. 🏙",
    ]},
    {x:4, y:11, emoji:'🧓', name:'OLD TRAINER', dialogue:[
      "Been a trainer for 40 years. Back then, wild Pokémon would run from you.",
      "Now? They charge. All at once. Like they're angry at something.",
      "Whatever's happening, it started about two years ago. Right when SYNTEK opened that new facility.",
      "Probably nothing. Probably.",
    ]},
    {x:16, y:7, emoji:'🧑', name:'KAEL', dialogue:[
      "...",
      "So you got a starter too. I heard you were leaving today.",
      "Don't expect me to go easy on you just because we grew up in the same town.",
      "I'll be ahead of you on Route 1. Don't fall behind.",
    ]},
  ],
  gridlock:[
    {x:4,y:3,emoji:'⚡',name:'GYM GUIDE',dialogue:["Welcome to GRIDLOCK GYM!","Leader ZARA uses Electric-type Pokémon.","Ground moves are super effective! Steel types resist Electric.","Make sure you've trained before challenging her — she's tough!"],isGym:true},
    {x:14,y:4,emoji:'👩‍⚕️',name:'NURSE JOY',dialogue:["Welcome to the Pokémon Center!","Your Pokémon will be restored to full health here — free of charge!"],isCenter:true},
    {x:3,y:9,emoji:'🧑‍💼',name:'SYNTEK EXEC',dialogue:["SYNTEK Corp is building a better tomorrow!","...Don't look too closely at what's behind that facility door.","Nothing to see there. Absolutely nothing. Move along."]},
    {x:19,y:9,emoji:'👧',name:'YOUNG TRAINER',dialogue:["I just beat the Gym! ZARA is no joke.","Her AMPCORE hits SO hard with Volt Surge.","Use Potions to keep your HP up during the fight!"]},
    {x:20,y:3,emoji:'🛒',name:'SHOP',dialogue:null,isShop:true},
  ],
  aquacore:[
    {x:4,y:3,emoji:'💧',name:'GYM GUIDE',dialogue:[
      "Welcome to AQUACORE GYM!",
      "Leader MARINA uses Water-type Pokémon.",
      "Electric and Grass moves are super effective! Water types resist Fire and Ice.",
      "Make sure you've trained before challenging her — she's swift!"
    ],isGym:true},
    {x:16,y:4,emoji:'👩‍⚕️',name:'NURSE JOY',dialogue:[
      "Welcome to the Aquacore Pokémon Center!",
      "Your Pokémon will be restored to full health here — free of charge!"
    ],isCenter:true},
    {x:22,y:3,emoji:'🛒',name:'SHOP',dialogue:null,isShop:true},
    {x:8,y:9,emoji:'👩‍🔬',name:'MARINA',dialogue:[
      "...I've been studying the strange readings from the SYNTEK ocean facility.",
      "The Water-type Pokémon here are showing unusual behavior patterns.",
      "Something in the runoff is affecting their natural rhythms.",
      "Be careful, trainer. The balance of this ecosystem is fragile."
    ]},
    {x:2,y:10,emoji:'👨‍⚓',name:'OLD FISHERMAN',dialogue:[
      "I've fished these waters for 40 years. Used to be teeming with life.",
      "Lately the catches are strange. Pokémon with odd markings, unusual aggression.",
      "SYNTEK says it's 'natural variation'. I know what I've seen.",
      "Trust your instincts, young one. The ocean doesn't lie."
    ]},
    {x:12,y:6,emoji:'👩‍🔬',name:'RESEARCHER',dialogue:[
      "Fascinating! The Coralle specimens show crystalline formations not seen in nature.",
      "These structures resemble SYNTEK's nano-technology patents...",
      "But that would be impossible. Wouldn't it?"
    ],isKael:true},
    {x:18,y:12,emoji:'🧑‍🚀',name:'SAILOR',dialogue:[
      "Just came from the southern routes. Things are getting stranger down there.",
      "Pokémon are avoiding certain areas, like they sense danger.",
      "SYNTEK's influence spreads like a current through the water.",
      "Keep your team strong. You'll need them for what's ahead."
    ]}
  ],
  route2:[
    {x:8,  y:4,  emoji:'📋', name:'SIGN', dialogue:[
      "ROUTE 2 — IRON PASS",
      "⚠ SYNTEK Corp active monitoring zone. Surveillance in effect.",
      "Wild Steel-type Pokémon ahead. Recommended trainer level: 12+",
      "IRONHAVEN CITY — 8km south. GRIDLOCK CITY — 8km north.",
    ]},
    {x:9,  y:8,  emoji:'🧑', name:'KAEL', dialogue:null, isKael:true},
    {x:2,  y:10, emoji:'🧑‍🦯', name:'HIKER', dialogue:[
      "I've walked this route for thirty years. Used to be green. Real green.",
      "The water started turning grey about two years back. Right when SYNTEK expanded the smelting plant south of here.",
      "And the wild Pokémon... they didn't charge at people before. Now they move like they're angry. Or afraid.",
      "I've seen SYNTEK drones flying at night. Low and quiet. They say it's environmental monitoring. I say it's something else.",
    ]},
    {x:11, y:10, emoji:'📋', name:'MIDPOINT SIGN', dialogue:[
      "IRON PASS — MIDPOINT",
      "Pokémon Center: GRIDLOCK CITY ↑ north",
      "Pokémon Center: IRONHAVEN CITY ↓ south",
      "⚠ Unauthorized access to SYNTEK infrastructure is strictly prohibited.",
    ]},
    {x:14, y:10, emoji:'👩‍🔬', name:'DR. KIRA', dialogue:[
      "Oh — a trainer! Good. I've been out here alone for three days.",
      "I'm Dr. Kira. Field researcher. I've been documenting changes in the wild Pokémon on this route.",
      "Last week I found a COGLET with a small metallic node on its spine. It wasn't natural — it was mechanical. Implanted.",
      "I filed a report with SYNTEK's regional office. They thanked me and I never heard back. That worries me more than the node did.",
    ]},
    {x:19, y:8,  emoji:'🧑‍💼', name:'SYNTEK AGENT', dialogue:[
      "This is a SYNTEK Corp monitoring zone. Please keep moving.",
      "Do not approach the eastern sensor arrays. Do not photograph the equipment.",
      "The researcher you may have spoken to is... confused about what she observed. Her findings have been reviewed and dismissed.",
      "Have a productive journey, trainer. SYNTEK is always watching out for you. 🏙",
    ]},
    {x:16, y:15, emoji:'👩', name:'TRAINER', dialogue:[
      "Watch yourself in the tall grass ahead — I almost lost my whole team.",
      "A RUSTMOTH came out of nowhere. Fast. Too fast. And it moved WRONG — like it anticipated every command I gave.",
      "I've battled hundreds of wild Pokémon. They don't behave like that. Something has changed on this route.",
      "There's a SYNTEK billboard back there. They're watching this whole stretch. Draw your own conclusions.",
    ]},
  ],
  ironhaven:[
    {x:8,y:3,emoji:'⚙️',name:'GYM GUIDE',dialogue:["Welcome to IRONHAVEN GYM!","Leader REX uses Steel-type Pokémon.","Fire and Ground moves are super effective against Steel!","Rex has never lost here. He's been undefeated for 4 years."],isGym:true},
    {x:14,y:4,emoji:'👩‍⚕️',name:'NURSE JOY',dialogue:["Welcome to Ironhaven Pokémon Center!","Rest up — Rex is the toughest Gym Leader in the early routes!"],isCenter:true},
    {x:11,y:5,emoji:'📋',name:'SIGN',dialogue:["IRONHAVEN CITY","The City of Iron and Smoke.","Pokémon Gym: STEEL TYPE","SYNTEK Smelting Plant: CLOSED TO PUBLIC"]},
    {x:3,y:6,emoji:'👴',name:'OLD MINER',dialogue:["I worked the SYNTEK smelting plant for 20 years.","Then they started bringing in those... machines. SYNTH Pokémon.","They don't sleep. They don't eat. They just work. It's not right."]},
    {x:17,y:6,emoji:'👦',name:'BOY',dialogue:["Rex is SO cool! He forged his own badge with a blowtorch!","His Pokémon are made of actual metal. How do they even move?!"]},
    {x:19,y:3,emoji:'🛒',name:'SHOP',dialogue:null,isShop:true},
  ]
};

const WILD_BY_MAP = {
  bootville:[
    {id:'glitchling',weight:40},{id:'sparkit',weight:35},{id:'coglet',weight:20},{id:'nullbot',weight:5}
  ],
  gridlock:[
    {id:'voltfang',weight:30},{id:'slagmole',weight:25},{id:'sparkit',weight:20},{id:'fumewing',weight:15},{id:'coglet',weight:10}
  ],
  route2:[
    {id:'slagmole',weight:33},{id:'coglet',weight:27},{id:'rustmoth',weight:20},{id:'fumewing',weight:15},{id:'nullbot',weight:5}
  ],
  ironhaven:[
    {id:'gearoth',weight:30},{id:'rustmoth',weight:30},{id:'slagmole',weight:25},{id:'drillcore',weight:15}
  ],
  aquacore:[
    {id:'finchen',weight:35},{id:'sparkit',weight:25},{id:'coglet',weight:15},{id:'coralle',weight:15},{id:'nullbot',weight:10}
  ]
};
