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
};
let pendingEvolution = null;

// ── POKÉMON DATA ──
const POKEMON_BASE = {
  sproutex:{name:'SPROUTEX',emoji:'🌿',type:'Grass/Steel',level:5,maxHp:30,hp:30,atk:12,def:10,spd:9,moves:['Vine Whip','Harden','Blade Bloom','Iron Defense'],xp:0,xpNext:100},
  embrit:  {name:'EMBRIT',  emoji:'🔥',type:'Fire/Electric',level:5,maxHp:28,hp:28,atk:14,def:8,spd:12,moves:['Ember','Spark','Plasma Surge','Quick Attack'],xp:0,xpNext:100},
  aquibit: {name:'AQUIBIT', emoji:'💧',type:'Water/Psychic',level:5,maxHp:32,hp:32,atk:11,def:11,spd:10,moves:['Water Gun','Confusion','Mind Current','Protect'],xp:0,xpNext:100},
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
  zara_jolteon:{name:'SPARKVOLT',emoji:'⚡',type:'Electric',level:12,maxHp:52,hp:52,atk:18,def:10,spd:20,moves:['Thunderbolt','Quick Attack','Spark'],xp:0,xpNext:0},
  zara_ampere: {name:'AMPCORE', emoji:'🔌',type:'Electric/Steel',level:14,maxHp:60,hp:60,atk:20,def:15,spd:16,moves:['Thunderbolt','Iron Head','Volt Surge','Arc Beam'],xp:0,xpNext:0},
  // Ironhaven wilds
  rustmoth:  {name:'RUSTMOTH', emoji:'🦋',type:'Steel/Bug',  level:14,maxHp:48,hp:48,atk:15,def:14,spd:13,moves:['Metal Claw','Bug Bite','Iron Head'],xp:0,xpNext:180,wild:true,catchRate:130},
  gearoth:   {name:'GEAROTH',  emoji:'🔩',type:'Steel',      level:16,maxHp:58,hp:58,atk:18,def:22,spd:8, moves:['Iron Head','Metal Claw','Harden','Rock Slide'],xp:0,xpNext:200,wild:true,catchRate:90},
  drillcore:  {name:'DRILLCORE',emoji:'⛏️',type:'Ground/Steel',level:18,maxHp:66,hp:66,atk:22,def:26,spd:9,moves:['Dig','Iron Claw','Rock Slide','Harden'],xp:0,xpNext:220,wild:true,catchRate:70},
  // REX GYM TEAM
  rex_forgeant:{name:'FORGEANT',emoji:'⚙️',type:'Steel',    level:18,maxHp:72,hp:72,atk:22,def:26,spd:11,moves:['Iron Head','Metal Claw','Harden','Rock Slide'],xp:0,xpNext:0},
  rex_drillord:{name:'DRILLORD',emoji:'🔧',type:'Steel/Ground',level:21,maxHp:84,hp:84,atk:28,def:30,spd:13,moves:['Drill Run','Iron Head','Earthquake','Steel Beam'],xp:0,xpNext:0},
  // KAEL RIVAL TEAM
  kael_starter:{name:'RIVALMON',emoji:'🔥',type:'Fire/Electric',level:16,maxHp:64,hp:64,atk:22,def:14,spd:20,moves:['Plasma Surge','Thunderbolt','Quick Attack','Ember'],xp:0,xpNext:0},
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
  'Wild Charge':  {pwr:90,acc:100,type:'Electric',pp:15,effect:'recoil25',msg:'Took recoil damage!'},
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
  'Steel Beam':   {pwr:140,acc:95,type:'Steel',  pp:5, msg:'★ STEEL BEAM!',effect:'recoil50'},
  'Bug Bite':     {pwr:60,acc:100,type:'Bug',    pp:20},
  'Arc Beam':     {pwr:75,acc:95, type:'Electric',pp:15},
};

// ── SPRITES ──
const SPRITES = {
  sproutex:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="13" ry="11" fill="#2d7d2d"/><ellipse cx="24" cy="29" rx="10" ry="8" fill="#4cb84c"/><polygon points="15,22 11,5 20,18" fill="#99aabb"/><polygon points="33,22 37,5 28,18" fill="#99aabb"/><circle cx="19" cy="28" r="3.5" fill="#fff"/><circle cx="29" cy="28" r="3.5" fill="#fff"/><circle cx="20" cy="28" r="2" fill="#0a1a0a"/><circle cx="30" cy="28" r="2" fill="#0a1a0a"/><path d="M20,33 Q24,36 28,33" fill="none" stroke="#1a5a1a" stroke-width="1.5" stroke-linecap="round"/><rect x="18" y="40" width="4" height="5" rx="2" fill="#99aabb"/><rect x="26" y="40" width="4" height="5" rx="2" fill="#99aabb"/></svg>`,

  thornex:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="15" ry="13" fill="#1e661e"/><polygon points="13,20 8,3 21,17" fill="#88aaaa"/><polygon points="35,20 40,3 27,17" fill="#88aaaa"/><polygon points="10,30 5,22 14,26" fill="#88aaaa"/><polygon points="38,30 43,22 34,26" fill="#88aaaa"/><ellipse cx="24" cy="28" rx="10" ry="7" fill="#2d882d"/><circle cx="19" cy="27" r="4" fill="#fff"/><circle cx="29" cy="27" r="4" fill="#fff"/><circle cx="20" cy="27" r="2.5" fill="#0a1a0a"/><circle cx="30" cy="27" r="2.5" fill="#0a1a0a"/><rect x="16" y="41" width="5" height="5" rx="2" fill="#88aaaa"/><rect x="27" y="41" width="5" height="5" rx="2" fill="#88aaaa"/></svg>`,

  vegithorn:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="28" rx="17" ry="15" fill="#154d15"/><polygon points="10,16 4,1 18,14" fill="#77aabb"/><polygon points="38,16 44,1 30,14" fill="#77aabb"/><polygon points="7,28 1,18 12,24" fill="#77aabb"/><polygon points="41,28 47,18 36,24" fill="#77aabb"/><polygon points="10,36 4,28 14,32" fill="#77aabb"/><polygon points="38,36 44,28 34,32" fill="#77aabb"/><ellipse cx="24" cy="26" rx="11" ry="8" fill="#1e7a1e"/><circle cx="17" cy="25" r="5" fill="#fff"/><circle cx="31" cy="25" r="5" fill="#fff"/><circle cx="18" cy="25" r="3" fill="#050f05"/><circle cx="32" cy="25" r="3" fill="#050f05"/><rect x="14" y="41" width="6" height="5" rx="2" fill="#77aabb"/><rect x="28" y="41" width="6" height="5" rx="2" fill="#77aabb"/></svg>`,

  embrit:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="23" cy="31" rx="12" ry="10" fill="#cc4400"/><ellipse cx="23" cy="29" rx="9" ry="7" fill="#ff6622"/><circle cx="35" cy="28" r="5" fill="#bb3300"/><path d="M36,23 Q43,19 41,13 Q38,20 36,21Z" fill="#ffaa00"/><ellipse cx="19" cy="20" rx="3.5" ry="2.5" fill="#aa3300"/><ellipse cx="28" cy="20" rx="3.5" ry="2.5" fill="#aa3300"/><circle cx="18" cy="28" r="3.5" fill="#ffee00"/><circle cx="28" cy="28" r="3.5" fill="#ffee00"/><circle cx="18" cy="28" r="2" fill="#330000"/><circle cx="28" cy="28" r="2" fill="#330000"/><rect x="17" y="40" width="4" height="5" rx="1" fill="#993300"/><rect x="25" y="40" width="4" height="5" rx="1" fill="#993300"/></svg>`,

  flamcore:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="23" cy="30" rx="14" ry="12" fill="#bb3300"/><ellipse cx="23" cy="27" rx="10" ry="9" fill="#ee5500"/><path d="M32,16 Q41,8 37,2 Q38,11 34,13 Q43,6 39,1 Q37,12 32,15Z" fill="#ffaa00"/><path d="M14,18 Q9,12 11,6 Q13,13 15,14Z" fill="#ffcc00"/><ellipse cx="17" cy="18" rx="4.5" ry="3" fill="#991f00"/><ellipse cx="27" cy="18" rx="4.5" ry="3" fill="#991f00"/><circle cx="18" cy="26" r="4.5" fill="#ffee00"/><circle cx="28" cy="26" r="4.5" fill="#ffee00"/><circle cx="18" cy="26" r="2.5" fill="#200000"/><circle cx="28" cy="26" r="2.5" fill="#200000"/><rect x="16" y="40" width="5" height="6" rx="2" fill="#882200"/><rect x="25" y="40" width="5" height="6" rx="2" fill="#882200"/></svg>`,

  infernox:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="29" rx="15" ry="13" fill="#991100"/><ellipse cx="24" cy="26" rx="11" ry="10" fill="#cc3300"/><path d="M34,13 Q44,4 39,0 Q40,8 36,10 Q46,3 41,0 Q38,9 33,12Z" fill="#ff8800"/><path d="M14,13 Q4,4 9,0 Q8,8 12,10 Q2,3 7,0 Q10,9 15,12Z" fill="#ff8800"/><path d="M40,26 Q46,20 44,28 Q46,23 44,30Z" fill="#ff6600"/><path d="M8,26 Q2,20 4,28 Q2,23 4,30Z" fill="#ff6600"/><ellipse cx="18" cy="17" rx="5" ry="3" fill="#770000"/><ellipse cx="30" cy="17" rx="5" ry="3" fill="#770000"/><circle cx="18" cy="25" r="5" fill="#ffcc00"/><circle cx="30" cy="25" r="5" fill="#ffcc00"/><circle cx="18" cy="25" r="3" fill="#110000"/><circle cx="30" cy="25" r="3" fill="#110000"/><rect x="14" y="40" width="6" height="6" rx="2" fill="#771100"/><rect x="28" y="40" width="6" height="6" rx="2" fill="#771100"/></svg>`,

  aquibit:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="32" rx="11" ry="12" fill="#1a6eaa"/><ellipse cx="24" cy="30" rx="8" ry="9" fill="#3399cc"/><polygon points="24,8 20,20 28,20" fill="#00ccff" opacity="0.9"/><polygon points="24,10 21,18 27,18" fill="#aaeeff"/><path d="M13,34 Q10,41 15,43" fill="none" stroke="#1a6eaa" stroke-width="3" stroke-linecap="round"/><circle cx="19" cy="30" r="3.5" fill="#fff"/><circle cx="29" cy="30" r="3.5" fill="#fff"/><circle cx="19" cy="31" r="2" fill="#330055"/><circle cx="29" cy="31" r="2" fill="#330055"/><ellipse cx="24" cy="36" rx="6" ry="2" fill="#0e4a77"/></svg>`,

  hydrobit:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="13" ry="14" fill="#0d4d88"/><ellipse cx="24" cy="29" rx="10" ry="10" fill="#2277bb"/><polygon points="24,5 19,19 29,19" fill="#00ddff" opacity="0.95"/><polygon points="22,7 20,16 24,14Z" fill="#aaeeff"/><polygon points="26,7 28,16 24,14Z" fill="#aaeeff"/><path d="M11,33 Q8,42 13,44" fill="none" stroke="#0d4d88" stroke-width="4" stroke-linecap="round"/><path d="M37,33 Q40,42 35,44" fill="none" stroke="#0d4d88" stroke-width="4" stroke-linecap="round"/><circle cx="19" cy="29" r="4" fill="#fff"/><circle cx="29" cy="29" r="4" fill="#fff"/><circle cx="19" cy="30" r="2.5" fill="#220044"/><circle cx="29" cy="30" r="2.5" fill="#220044"/><ellipse cx="24" cy="36" rx="7" ry="2.5" fill="#093d6e"/></svg>`,

  tidalcore:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="16" ry="15" fill="#093d6e"/><ellipse cx="24" cy="28" rx="12" ry="11" fill="#1a6eaa"/><polygon points="24,3 18,18 30,18" fill="#00eeff"/><polygon points="21,5 19,15 24,12Z" fill="#aaffff"/><polygon points="27,5 29,15 24,12Z" fill="#aaffff"/><polygon points="14,8 10,16 17,14Z" fill="#00ddff" opacity="0.7"/><polygon points="34,8 38,16 31,14Z" fill="#00ddff" opacity="0.7"/><path d="M8,32 Q5,42 10,45" fill="none" stroke="#093d6e" stroke-width="5" stroke-linecap="round"/><path d="M40,32 Q43,42 38,45" fill="none" stroke="#093d6e" stroke-width="5" stroke-linecap="round"/><circle cx="18" cy="27" r="5" fill="#fff"/><circle cx="30" cy="27" r="5" fill="#fff"/><circle cx="18" cy="28" r="3" fill="#110033"/><circle cx="30" cy="28" r="3" fill="#110033"/><circle cx="19" cy="27" r="1" fill="#00eeff"/><circle cx="31" cy="27" r="1" fill="#00eeff"/><ellipse cx="24" cy="35" rx="9" ry="3" fill="#072e53"/></svg>`,

  glitchling:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M10,8 H38 L38,28 Q30,24 24,30 Q18,24 10,28Z" fill="#440066"/><path d="M10,28 Q18,24 24,30 Q30,24 38,28 L36,38 L28,34 L24,40 L20,34 L12,38Z" fill="#330055" opacity="0.85"/><rect x="8" y="10" width="32" height="3" fill="#ffee00" opacity="0.18"/><rect x="8" y="18" width="32" height="2" fill="#ff00ff" opacity="0.12"/><rect x="14" y="24" width="20" height="2" fill="#00ffff" opacity="0.15"/><polygon points="24,13 21,20 24,18 27,20" fill="#ffee00"/><circle cx="17" cy="17" r="4" fill="#ffee00" opacity="0.9"/><circle cx="31" cy="17" r="4" fill="#ffee00" opacity="0.9"/><circle cx="17" cy="17" r="2" fill="#220033"/><circle cx="31" cy="17" r="2" fill="#220033"/><rect x="18" y="11" width="4" height="2" fill="#ff00ff" opacity="0.6"/><rect x="26" y="13" width="6" height="1" fill="#00ffff" opacity="0.6"/></svg>`,

  glitchwraith:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M8,5 H40 L40,26 Q32,20 24,28 Q16,20 8,26Z" fill="#550077"/><path d="M8,26 Q16,20 24,28 Q32,20 40,26 L38,40 L30,34 L24,44 L18,34 L10,40Z" fill="#3d0066" opacity="0.85"/><rect x="6" y="8" width="36" height="3" fill="#ffee00" opacity="0.22"/><rect x="6" y="16" width="36" height="2" fill="#ff00ff" opacity="0.18"/><polygon points="24,10 20,18 24,15 28,18" fill="#ffee00"/><polygon points="17,5 14,9 17,8Z" fill="#ffee00" opacity="0.7"/><polygon points="31,5 34,9 31,8Z" fill="#ffee00" opacity="0.7"/><circle cx="17" cy="15" r="5" fill="#ffee00"/><circle cx="31" cy="15" r="5" fill="#ffee00"/><circle cx="17" cy="15" r="3" fill="#110022"/><circle cx="31" cy="15" r="3" fill="#110022"/><circle cx="18" cy="14" r="1.2" fill="#ff00ff"/><circle cx="32" cy="14" r="1.2" fill="#ff00ff"/></svg>`,

  coglet:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="26" r="13" fill="#7a8a99"/><circle cx="24" cy="26" r="8" fill="#9aabb8"/><circle cx="24" cy="26" r="4" fill="#556677"/><rect x="21" y="9" width="6" height="5" rx="1" fill="#7a8a99"/><rect x="21" y="38" width="6" height="5" rx="1" fill="#7a8a99"/><rect x="9" y="23" width="5" height="6" rx="1" fill="#7a8a99"/><rect x="34" y="23" width="5" height="6" rx="1" fill="#7a8a99"/><rect x="12" y="12" width="5" height="4" rx="1" fill="#7a8a99" transform="rotate(45 14 14)"/><rect x="31" y="12" width="5" height="4" rx="1" fill="#7a8a99" transform="rotate(-45 34 14)"/><rect x="12" y="30" width="5" height="4" rx="1" fill="#7a8a99" transform="rotate(-45 14 32)"/><rect x="31" y="30" width="5" height="4" rx="1" fill="#7a8a99" transform="rotate(45 34 32)"/><circle cx="20" cy="24" r="2.5" fill="#fff"/><circle cx="28" cy="24" r="2.5" fill="#fff"/><circle cx="20" cy="24" r="1.2" fill="#222"/><circle cx="28" cy="24" r="1.2" fill="#222"/><path d="M20,29 Q24,32 28,29" fill="none" stroke="#445566" stroke-width="1.5" stroke-linecap="round"/></svg>`,

  gearoth:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="25" r="15" fill="#667788"/><circle cx="24" cy="25" r="9" fill="#889aaa"/><circle cx="24" cy="25" r="4" fill="#445566"/><rect x="20" y="6" width="8" height="6" rx="1" fill="#667788"/><rect x="20" y="37" width="8" height="6" rx="1" fill="#667788"/><rect x="7" y="21" width="6" height="8" rx="1" fill="#667788"/><rect x="35" y="21" width="6" height="8" rx="1" fill="#667788"/><rect x="10" y="9" width="6" height="5" rx="1" fill="#667788" transform="rotate(45 13 11)"/><rect x="32" y="9" width="6" height="5" rx="1" fill="#667788" transform="rotate(-45 35 11)"/><rect x="10" y="29" width="6" height="5" rx="1" fill="#667788" transform="rotate(-45 13 31)"/><rect x="32" y="29" width="6" height="5" rx="1" fill="#667788" transform="rotate(45 35 31)"/><circle cx="12" cy="13" r="5" fill="#667788"/><circle cx="36" cy="13" r="5" fill="#667788"/><circle cx="12" cy="13" r="3" fill="#889aaa"/><circle cx="36" cy="13" r="3" fill="#889aaa"/><circle cx="19" cy="23" r="3.5" fill="#00eeff"/><circle cx="29" cy="23" r="3.5" fill="#00eeff"/><circle cx="19" cy="23" r="2" fill="#001122"/><circle cx="29" cy="23" r="2" fill="#001122"/></svg>`,

  sparkit:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="11" ry="9" fill="#ddbb00"/><ellipse cx="24" cy="28" rx="8" ry="7" fill="#ffdd22"/><polygon points="15,20 12,5 19,18" fill="#ffdd22"/><polygon points="33,20 36,5 29,18" fill="#ffdd22"/><polygon points="15,21 10,9 16,19" fill="#eecc00"/><polygon points="33,21 38,9 32,19" fill="#eecc00"/><path d="M33,30 Q38,25 43,30 Q38,27 36,32 Q41,29 43,34 Q37,30 33,35Z" fill="#ffee44"/><polygon points="22,23 20,27 24,25 22,30 26,25 24,28 26,23" fill="#ff8800"/><circle cx="19" cy="28" r="3" fill="#fff"/><circle cx="29" cy="28" r="3" fill="#fff"/><circle cx="19" cy="28" r="1.5" fill="#220000"/><circle cx="29" cy="28" r="1.5" fill="#220000"/></svg>`,

  voltfang:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="23" cy="29" rx="13" ry="11" fill="#cc8800"/><ellipse cx="23" cy="27" rx="10" ry="8" fill="#ffbb22"/><polygon points="13,17 9,2 17,15" fill="#ffdd22"/><polygon points="20,16 16,3 22,14" fill="#ffdd22"/><polygon points="33,17 37,2 29,15" fill="#ffdd22"/><polygon points="26,16 30,3 24,14" fill="#ffdd22"/><path d="M35,28 Q43,21 46,27 L43,24 Q46,22 46,28 L43,25Z" fill="#ffcc00"/><polygon points="21,22 18,27 23,25 20,31 25,26 23,29 26,22" fill="#ff6600"/><polygon points="27,22 24,27 27,25 25,31 29,25 27,29 30,22" fill="#ff6600"/><circle cx="17" cy="26" r="4" fill="#fff"/><circle cx="29" cy="26" r="4" fill="#fff"/><circle cx="17" cy="26" r="2.5" fill="#1a0000"/><circle cx="29" cy="26" r="2.5" fill="#1a0000"/><path d="M19,33 Q23,37 27,33" fill="none" stroke="#884400" stroke-width="2" stroke-linecap="round"/></svg>`,

  fumewing:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24,22 Q10,17 6,27 Q14,23 20,29Z" fill="#443355"/><path d="M24,22 Q38,17 42,27 Q34,23 28,29Z" fill="#443355"/><path d="M6,27 Q3,34 7,36 Q10,29 13,27Z" fill="#224433" opacity="0.8"/><path d="M42,27 Q45,34 41,36 Q38,29 35,27Z" fill="#224433" opacity="0.8"/><ellipse cx="24" cy="30" rx="8" ry="10" fill="#331144"/><ellipse cx="24" cy="28" rx="5" ry="6" fill="#553366"/><polygon points="22,17 24,12 26,17" fill="#553366"/><circle cx="20" cy="27" r="3" fill="#aa2244"/><circle cx="28" cy="27" r="3" fill="#aa2244"/><circle cx="20" cy="27" r="1.5" fill="#fff"/><circle cx="28" cy="27" r="1.5" fill="#fff"/><path d="M22,32 L24,35 L26,32" fill="none" stroke="#553366" stroke-width="1.5"/></svg>`,

  nullbot:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="13" y="18" width="22" height="22" rx="3" fill="#dde8ee"/><rect x="16" y="21" width="16" height="10" rx="2" fill="#aabbcc"/><rect x="18" y="33" width="5" height="7" rx="1" fill="#aabbcc"/><rect x="25" y="33" width="5" height="7" rx="1" fill="#aabbcc"/><rect x="8" y="22" width="5" height="8" rx="2" fill="#dde8ee"/><rect x="35" y="22" width="5" height="8" rx="2" fill="#dde8ee"/><rect x="20" y="10" width="8" height="8" rx="2" fill="#dde8ee"/><circle cx="24" cy="14" r="2" fill="#aabbcc"/><circle cx="24" cy="26" r="4" fill="#ff2222" opacity="0.9"/><circle cx="24" cy="26" r="2" fill="#ff8888"/><path d="M17,26 Q19,23 21,26" fill="none" stroke="#889aaa" stroke-width="1.5"/><path d="M27,26 Q29,23 31,26" fill="none" stroke="#889aaa" stroke-width="1.5"/><rect x="16" y="14" width="3" height="2" rx="1" fill="#ff4444"/><rect x="29" y="14" width="3" height="2" rx="1" fill="#ff4444"/></svg>`,

  slagmole:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="31" rx="14" ry="12" fill="#445566"/><ellipse cx="24" cy="29" rx="11" ry="9" fill="#667788"/><ellipse cx="24" cy="26" rx="8" ry="6" fill="#778899"/><ellipse cx="12" cy="35" rx="6" ry="4" fill="#334455" transform="rotate(-20 12 35)"/><ellipse cx="36" cy="35" rx="6" ry="4" fill="#334455" transform="rotate(20 36 35)"/><rect x="9" y="32" width="7" height="3" rx="1" fill="#99aabb"/><rect x="32" y="32" width="7" height="3" rx="1" fill="#99aabb"/><rect x="10" y="30" width="5" height="2" rx="1" fill="#99aabb"/><rect x="33" y="30" width="5" height="2" rx="1" fill="#99aabb"/><circle cx="19" cy="26" r="2.5" fill="#000022" opacity="0.8"/><circle cx="29" cy="26" r="2.5" fill="#000022" opacity="0.8"/><ellipse cx="24" cy="22" rx="5" ry="3" fill="#556677"/></svg>`,

  drillcore:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="26" cy="30" rx="14" ry="12" fill="#334455"/><ellipse cx="26" cy="28" rx="11" ry="9" fill="#556677"/><path d="M12,27 Q6,23 4,29 Q7,25 9,26 Q5,25 4,31 Q8,26 10,28 Q7,27 7,33 Q11,28 13,30Z" fill="#99aaaa"/><ellipse cx="38" cy="34" rx="7" ry="5" fill="#445566" transform="rotate(20 38 34)"/><ellipse cx="14" cy="34" rx="7" ry="5" fill="#445566" transform="rotate(-20 14 34)"/><rect x="34" y="31" width="8" height="3" rx="1" fill="#99aabb"/><rect x="6" y="31" width="8" height="3" rx="1" fill="#99aabb"/><circle cx="22" cy="26" r="2.5" fill="#001122" opacity="0.8"/><circle cx="32" cy="26" r="2.5" fill="#001122" opacity="0.8"/><ellipse cx="26" cy="21" rx="6" ry="3" fill="#445566"/></svg>`,

  rustmoth:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24,20 Q8,12 6,24 Q12,17 18,23Z" fill="#8b5a2b"/><path d="M24,20 Q40,12 42,24 Q36,17 30,23Z" fill="#8b5a2b"/><path d="M6,24 Q4,34 10,36 Q12,28 16,26Z" fill="#6b4423"/><path d="M42,24 Q44,34 38,36 Q36,28 32,26Z" fill="#6b4423"/><ellipse cx="7" cy="20" rx="3" ry="2" fill="#cc7733" opacity="0.7"/><ellipse cx="41" cy="20" rx="3" ry="2" fill="#cc7733" opacity="0.7"/><circle cx="15" cy="18" r="3" fill="#99aabb" opacity="0.6"/><circle cx="33" cy="18" r="3" fill="#99aabb" opacity="0.6"/><ellipse cx="24" cy="28" rx="6" ry="9" fill="#7a4a22"/><ellipse cx="24" cy="26" rx="4" ry="5" fill="#aa6633"/><path d="M22,16 Q20,12 21,10" fill="none" stroke="#7a4a22" stroke-width="1.5" stroke-linecap="round"/><path d="M26,16 Q28,12 27,10" fill="none" stroke="#7a4a22" stroke-width="1.5" stroke-linecap="round"/><circle cx="21" cy="25" r="2" fill="#ff4400" opacity="0.8"/><circle cx="27" cy="25" r="2" fill="#ff4400" opacity="0.8"/></svg>`,

  sparkvolt:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="23" cy="30" rx="13" ry="10" fill="#1144aa"/><ellipse cx="23" cy="28" rx="10" ry="8" fill="#3366cc"/><polygon points="13,17 9,2 17,15" fill="#aaccff"/><polygon points="33,17 37,2 29,15" fill="#aaccff"/><path d="M35,26 Q44,19 47,26 L44,22 Q47,21 47,27 L44,24Z" fill="#aaccff"/><path d="M11,26 Q2,19 -1,26 L2,22 Q-1,21 -1,27 L2,24Z" fill="#aaccff"/><polygon points="21,21 19,26 23,23 21,29 25,24 23,27 25,21" fill="#ffffff" opacity="0.9"/><polygon points="27,21 25,26 28,23 26,29 30,24 28,27 30,21" fill="#ffffff" opacity="0.9"/><circle cx="17" cy="27" r="4" fill="#88bbff"/><circle cx="29" cy="27" r="4" fill="#88bbff"/><circle cx="17" cy="27" r="2" fill="#000022"/><circle cx="29" cy="27" r="2" fill="#000022"/><path d="M19,34 Q23,37 27,34" fill="none" stroke="#2244aa" stroke-width="2" stroke-linecap="round"/></svg>`,

  ampcore:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="12" y="16" width="24" height="26" rx="4" fill="#224466"/><rect x="14" y="18" width="20" height="12" rx="3" fill="#336688"/><ellipse cx="8" cy="22" rx="4" ry="8" fill="#224466"/><ellipse cx="40" cy="22" rx="4" ry="8" fill="#224466"/><path d="M4,16 Q6,18 8,16 Q6,20 8,22" fill="none" stroke="#aaddff" stroke-width="2"/><path d="M44,16 Q42,18 40,16 Q42,20 40,22" fill="none" stroke="#aaddff" stroke-width="2"/><rect x="17" y="30" width="6" height="10" rx="2" fill="#224466"/><rect x="25" y="30" width="6" height="10" rx="2" fill="#224466"/><circle cx="19" cy="23" r="5" fill="#00ccff"/><circle cx="29" cy="23" r="5" fill="#00ccff"/><circle cx="19" cy="23" r="3" fill="#001133"/><circle cx="29" cy="23" r="3" fill="#001133"/><circle cx="20" cy="22" r="1" fill="#00ffff"/><circle cx="30" cy="22" r="1" fill="#00ffff"/><rect x="19" y="12" width="10" height="6" rx="2" fill="#224466"/><polygon points="22,9 24,5 26,9" fill="#aaddff"/></svg>`,

  forgeant:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="34" rx="10" ry="8" fill="#556677"/><ellipse cx="24" cy="24" rx="12" ry="9" fill="#667788"/><ellipse cx="24" cy="15" rx="8" ry="7" fill="#778899"/><ellipse cx="14" cy="28" rx="4" ry="7" fill="#556677" transform="rotate(-30 14 28)"/><ellipse cx="34" cy="28" rx="4" ry="7" fill="#556677" transform="rotate(30 34 28)"/><ellipse cx="10" cy="37" rx="3" ry="6" fill="#445566" transform="rotate(-15 10 37)"/><ellipse cx="38" cy="37" rx="3" ry="6" fill="#445566" transform="rotate(15 38 37)"/><path d="M16,12 Q8,7 6,13" fill="none" stroke="#99aaaa" stroke-width="3" stroke-linecap="round"/><path d="M32,12 Q40,7 42,13" fill="none" stroke="#99aaaa" stroke-width="3" stroke-linecap="round"/><circle cx="19" cy="14" r="4" fill="#aabbcc"/><circle cx="29" cy="14" r="4" fill="#aabbcc"/><circle cx="19" cy="14" r="2" fill="#000011"/><circle cx="29" cy="14" r="2" fill="#000011"/><rect x="17" y="20" width="14" height="4" rx="2" fill="#99aabb" opacity="0.5"/><rect x="19" y="27" width="10" height="3" rx="1" fill="#99aabb" opacity="0.5"/></svg>`,

  drillord:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="27" cy="29" rx="15" ry="13" fill="#334455"/><ellipse cx="27" cy="27" rx="12" ry="10" fill="#556677"/><path d="M12,27 Q7,21 4,28 Q8,24 10,25 Q5,24 4,31 Q9,25 11,27 Q7,26 7,33 Q11,27 13,29 Q9,28 10,35 Q13,28 15,31Z" fill="#889aaa"/><ellipse cx="42" cy="34" rx="7" ry="5" fill="#445566" transform="rotate(25 42 34)"/><ellipse cx="42" cy="22" rx="7" ry="5" fill="#445566" transform="rotate(-25 42 22)"/><ellipse cx="12" cy="38" rx="6" ry="4" fill="#445566" transform="rotate(-15 12 38)"/><rect x="38" y="31" width="8" height="3" rx="1" fill="#99aabb"/><rect x="38" y="22" width="8" height="3" rx="1" fill="#99aabb"/><circle cx="23" cy="25" r="3.5" fill="#001122" opacity="0.8"/><circle cx="33" cy="25" r="3.5" fill="#001122" opacity="0.8"/><circle cx="23.5" cy="24.5" r="1" fill="#aaddff"/><circle cx="33.5" cy="24.5" r="1" fill="#aaddff"/><ellipse cx="27" cy="19" rx="7" ry="4" fill="#445566"/><rect x="23" y="10" width="8" height="5" rx="2" fill="#667788"/></svg>`,

  rivalmon:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="13" ry="11" fill="#992200"/><ellipse cx="24" cy="28" rx="10" ry="8" fill="#cc3300"/><polygon points="14,17 10,2 18,15" fill="#cc3300"/><polygon points="34,17 38,2 30,15" fill="#cc3300"/><path d="M14,17 Q16,12 18,15" fill="#ff5500"/><path d="M34,17 Q32,12 30,15" fill="#ff5500"/><polygon points="22,22 20,27 24,25 22,29 26,25 24,27 26,22" fill="#ffee00"/><polygon points="28,22 26,26 29,24 27,28 31,24 29,26 32,22" fill="#ffee00"/><path d="M33,30 Q41,25 44,31 L40,28 Q43,27 43,33 L39,30Z" fill="#ff4400"/><path d="M35,30 Q40,36 39,41 Q36,37 34,33Z" fill="#ff3300"/><circle cx="18" cy="26" r="4" fill="#ffcc00"/><circle cx="30" cy="26" r="4" fill="#ffcc00"/><circle cx="18" cy="26" r="2" fill="#110000"/><circle cx="30" cy="26" r="2" fill="#110000"/><circle cx="19" cy="25" r="0.8" fill="#ff8800"/><circle cx="31" cy="25" r="0.8" fill="#ff8800"/><path d="M20,33 Q24,36 28,33" fill="none" stroke="#771100" stroke-width="2" stroke-linecap="round"/></svg>`,
};

function setSprite(elementId, pokemonName){
  const el = document.getElementById(elementId);
  if(!el) return;
  const key = pokemonName.toLowerCase().replace(/[\s-]/g,'');
  if(SPRITES[key]){
    el.innerHTML = SPRITES[key];
  } else {
    // Fallback: emoji in a centered div
    const emoji = (()=>{
      for(const p of Object.values(POKEMON_BASE)){
        if(p.name===pokemonName) return p.emoji;
      }
      return '❓';
    })();
    el.innerHTML = `<div style="font-size:62px;line-height:1;">${emoji}</div>`;
  }
  // Re-trigger entrance animation
  el.style.animation='none';
  requestAnimationFrame(()=>{ el.style.animation=''; });
}
function hitSprite(elementId){
  const el=document.getElementById(elementId);
  if(!el) return;
  el.classList.remove('sprite-hit','sprite-shake');
  void el.offsetWidth;
  el.classList.add('sprite-hit');
  setTimeout(()=>el.classList.remove('sprite-hit'),400);
}
function shakeSprite(elementId){
  const el=document.getElementById(elementId);
  if(!el) return;
  el.classList.remove('sprite-shake');
  void el.offsetWidth;
  el.classList.add('sprite-shake');
  setTimeout(()=>el.classList.remove('sprite-shake'),400);
}
const TILE={GRASS:0,WALL:1,TREE:2,WATER:3,PATH:4,TALL:5,CENTER:6,GYM:7,SIGN:8,EXIT_N:9,EXIT_S:10};
// Cyberpunk pixel art palette
const TILE_COLOR={
  0:'#0d1f0d',  // grass - dark green base
  1:'#060e1a',  // wall - near black blue
  2:'#091508',  // tree base
  3:'#060f1f',  // water - dark blue
  4:'#141410',  // path - dark asphalt
  5:'#0a1a0a',  // tall grass
  6:'#0d0820',  // center - dark purple
  7:'#150508',  // gym - dark red
  8:'#141208',  // sign
  9:'#080818',  // exit N
  10:'#080818', // exit S
};
const TILE_BORDER={
  0:'#1a3d1a',  // grass border
  1:'#0d1e35',  // wall border
  2:'#102210',  // tree border
  3:'#0a1a35',  // water border
  4:'#222218',  // path border
  5:'#133013',  // tall grass border
  6:'#1e0e3a',  // center border
  7:'#2a0a10',  // gym border
  8:'#282412',  // sign border
  9:'#0e0e28',  // exit
  10:'#0e0e28',
};

const MAPS = {
  bootville:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [9,4,4,4,4,4,4,4,4,4,4,4,4,4,9],
    [1,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,1,1,0,6,0,0,1,1,0,0,4,1],
    [1,4,0,1,1,0,0,0,0,1,1,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,2,0,8,0,0,2,0,0,0,4,1],
    [1,4,0,0,0,0,4,4,0,0,0,0,0,4,1],
    [1,4,0,0,0,4,4,4,4,0,0,0,0,4,1],
    [1,4,0,0,5,5,5,5,5,0,0,0,0,4,1],
    [1,4,0,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,0,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,0,0,5,5,5,5,5,0,0,0,0,4,1],
    [1,4,4,0,0,0,0,0,0,0,0,4,4,4,1],
    [1,1,1,1,1,1,10,1,1,1,1,1,1,1,1],
  ],
  gridlock:[
    [1,1,1,1,1,1,9,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,1,1,0,7,0,0,1,1,0,0,4,1],
    [1,4,0,1,1,0,0,0,0,1,1,0,0,4,1],
    [1,4,0,0,0,0,6,0,0,0,0,8,0,4,1],
    [1,4,0,0,2,0,0,0,0,2,0,0,0,4,1],
    [1,4,0,0,0,4,4,4,4,0,0,0,0,4,1],
    [1,4,0,0,5,5,5,5,5,0,0,0,0,4,1],
    [1,4,0,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,0,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,0,0,5,5,5,5,5,0,0,0,0,4,1],
    [1,4,4,0,0,0,0,0,0,0,4,4,4,4,1],
    [1,1,1,1,1,1,10,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  route2:[
    [1,1,1,1,1,1,9,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,5,5,5,0,0,0,0,5,5,5,0,4,1],
    [1,4,5,5,5,0,0,0,0,5,5,5,0,4,1],
    [1,4,0,0,0,0,8,0,0,0,0,0,0,4,1],
    [1,4,5,5,0,0,0,0,0,0,5,5,0,4,1],
    [1,4,5,5,0,0,2,0,0,0,5,5,0,4,1],
    [1,4,0,0,0,4,4,4,4,0,0,0,0,4,1],
    [1,4,5,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,5,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,0,2,0,0,0,0,2,0,0,0,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,1,1,1,1,1,10,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  ironhaven:[
    [1,1,1,1,1,1,9,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,0,0,0,0,0,0,0,0,0,0,0,4,1],
    [1,4,0,1,1,0,7,0,0,1,1,0,0,4,1],
    [1,4,0,1,1,0,0,0,0,1,1,0,0,4,1],
    [1,4,0,0,0,0,6,0,8,0,0,0,0,4,1],
    [1,4,0,0,2,0,0,0,0,2,0,0,0,4,1],
    [1,4,0,0,0,4,4,4,4,0,0,0,0,4,1],
    [1,4,0,0,5,5,5,5,5,0,0,0,0,4,1],
    [1,4,0,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,0,5,5,5,5,5,5,5,0,0,0,4,1],
    [1,4,0,0,5,5,5,5,5,0,0,0,0,4,1],
    [1,4,4,0,0,0,0,0,0,0,4,4,4,4,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]
};

const NPCS_BY_MAP = {
  bootville:[
    {x:6,y:3,emoji:'👩‍🔬',name:'PROF. ADA',dialogue:["Welcome to Nexus, "+G.playerName+"! Your journey starts here in Bootville.","Head south through the tall grass toward Gridlock City — that's where the first Gym is.","I gave you some NexBalls — use them to catch wild Pokémon in the tall grass!","There's a Pokémon Center in Gridlock City where you can heal your team for free."]},
    {x:6,y:6,emoji:'📋',name:'SIGN',dialogue:["ROUTE 1 → SOUTH","Wild Pokémon lurk in the tall grass!","GRIDLOCK CITY lies ahead.","Population: 50,000 | Type: ELECTRIC"]},
    {x:4,y:6,emoji:'🧓',name:'OLD TRAINER',dialogue:["In my day Pokémon roamed free here.","Now SYNTEK tags every wild one they find.","If you see a Pokémon with a red circuit mark — run. That's a SYNTH implant."]},
    {x:9,y:4,emoji:'🧑',name:'KAEL',dialogue:["So we meet again.","Gridlock City has the first Gym — Leader Zara. She uses Electric types.","Ground-type moves are super effective against Electric. Keep that in mind.","...Not that I'm helping you. Just stating facts."]},
  ],
  gridlock:[
    {x:6,y:3,emoji:'⚡',name:'GYM GUIDE',dialogue:["Welcome to GRIDLOCK GYM!","Leader ZARA uses Electric-type Pokémon.","Ground moves are super effective! Steel types resist Electric.","Make sure you've trained before challenging her — she's tough!"],isGym:true},
    {x:6,y:5,emoji:'👩‍⚕️',name:'NURSE JOY',dialogue:["Welcome to the Pokémon Center!","Your Pokémon will be restored to full health here — free of charge!"],isCenter:true},
    {x:3,y:3,emoji:'🧑‍💼',name:'SYNTEK EXEC',dialogue:["SYNTEK Corp is building a better tomorrow!","...Don't look too closely at what's behind that facility door.","Nothing to see there. Absolutely nothing. Move along."]},
    {x:10,y:3,emoji:'👧',name:'YOUNG TRAINER',dialogue:["I just beat the Gym! ZARA is no joke.","Her AMPCORE hits SO hard with Volt Surge.","Use Potions to keep your HP up during the fight!"]},
    {x:11,y:5,emoji:'🛒',name:'SHOP',dialogue:null,isShop:true},
  ],
  route2:[
    {x:6,y:4,emoji:'📋',name:'SIGN',dialogue:["ROUTE 2 — IRON PASS","Danger: Wild Steel-types ahead!","IRONHAVEN CITY lies to the south.","Recommended level: 15+"]},
    {x:7,y:6,emoji:'🧑',name:'KAEL',dialogue:null,isKael:true},
    {x:3,y:2,emoji:'🧑‍🦯',name:'HIKER',dialogue:["I've been hiking Route 2 for years.","The steel Pokémon here are tough — bring Fire or Ground moves.","Rex in Ironhaven Gym is a beast. His DRILLORD hits like a freight train."]},
    {x:10,y:9,emoji:'👩',name:'TRAINER',dialogue:["SYNTEK installed cameras all along Route 2 last week.","They say it's for 'monitoring wild Pokémon populations'... sure.","Keep your Pokémon close. Something feels wrong out here."]},
  ],
  ironhaven:[
    {x:6,y:3,emoji:'⚙️',name:'GYM GUIDE',dialogue:["Welcome to IRONHAVEN GYM!","Leader REX uses Steel-type Pokémon.","Fire and Ground moves are super effective against Steel!","Rex has never lost here. He's been undefeated for 4 years."],isGym:true},
    {x:6,y:5,emoji:'👩‍⚕️',name:'NURSE JOY',dialogue:["Welcome to Ironhaven Pokémon Center!","Rest up — Rex is the toughest Gym Leader in the early routes!"],isCenter:true},
    {x:8,y:5,emoji:'📋',name:'SIGN',dialogue:["IRONHAVEN CITY","The City of Iron and Smoke.","Pokémon Gym: STEEL TYPE","SYNTEK Smelting Plant: CLOSED TO PUBLIC"]},
    {x:3,y:3,emoji:'👴',name:'OLD MINER',dialogue:["I worked the SYNTEK smelting plant for 20 years.","Then they started bringing in those... machines. SYNTH Pokémon.","They don't sleep. They don't eat. They just work. It's not right."]},
    {x:10,y:3,emoji:'👦',name:'BOY',dialogue:["Rex is SO cool! He forged his own badge with a blowtorch!","His Pokémon are made of actual metal. How do they even move?!"]},
    {x:11,y:5,emoji:'🛒',name:'SHOP',dialogue:null,isShop:true},
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
    {id:'slagmole',weight:35},{id:'coglet',weight:30},{id:'rustmoth',weight:20},{id:'fumewing',weight:15}
  ],
  ironhaven:[
    {id:'gearoth',weight:30},{id:'rustmoth',weight:30},{id:'slagmole',weight:25},{id:'drillcore',weight:15}
  ]
};
