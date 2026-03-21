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
const PIXEL_SPRITES = {
  sproutex:{pal:["#1e5c1e","#3a8c3a","#5cb85c","#aabbcc","#ccdde8","#ffffff","#111111","#2d6e2d"],px:["0000000000000000","0000400000400000","0004540004540000","0004840004840000","0000811118000000","0008122222800000","0008123322800000","0008126762800000","0008127272800000","0008123332800000","0008122222800000","0000811118000000","0000040040000000","0000040040000000","0000000000000000","0000000000000000"]},
  embrit:{pal:["#8b1a00","#cc3300","#ff5500","#ff8800","#ffcc00","#ffee88","#111111","#3333aa","#6688ff"],px:["0000000099000000","0000000989000000","0000000989000000","0000009829000000","0000112331100000","0001234443210000","0001245544210000","0001267567210000","0001255555210000","0001234543210000","0000123332100000","0001200002100000","0012000000210000","0011000000110000","0000000000000000","0000000000000000"]},
  aquibit:{pal:["#0d3d6e","#1a6eaa","#3399cc","#66bbdd","#aaeeff","#ffffff","#220044","#aa44ff","#00ccff"],px:["0000009890000000","0000098789000000","0000087778000000","0000092229000000","0000123332100000","0001234443210000","0001245544210000","0001267567210000","0001244444210000","0001234543210000","0000123332100000","0000011111000000","0000120021000000","0001200002100000","0000000000000000","0000000000000000"]},
  glitchling:{pal:["#2a0044","#440066","#660099","#ff00ff","#ffee00","#ffffff","#00ffff","#111111"],px:["0000122221000000","0001233332100000","0012333333210000","0123433334321000","0123358358321000","0123333333321000","0127333333721000","0123343343321000","0123335533321000","0012333333210000","0012323323210000","0001202202100000","0001001100100000","0000000000000000","0000000000000000","0000000000000000"]},
  coglet:{pal:["#445566","#667788","#889aaa","#aabbcc","#ccdde8","#00eeff","#111111"],px:["0000022220000000","0000134431000000","0002345543200000","0023455554320000","0134555555431000","0235556655532000","0235557755532000","0235544445532000","0235555555532000","0134555555431000","0023455554320000","0002344443200000","0000134431000000","0000022220000000","0000000000000000","0000000000000000"]},
  sparkit:{pal:["#886600","#ccaa00","#ffdd00","#ffee88","#ff8800","#ffffff","#111111","#ff4400"],px:["0033000000330000","0023200002320000","0012320023210000","0012232232210000","0001233332100000","0001267367100000","0001344443100000","0001335533100000","0001383383100000","0000133331000000","0000012210000000","0000120021000000","0001200002100000","0002100001200000","0000000000000000","0000000000000000"]},
  rivalmon:{pal:["#771100","#aa2200","#dd3300","#ff5500","#ff8800","#ffdd00","#111111","#3344aa"],px:["0011000000110000","0021200002120000","0002320023200000","0000123321000000","0001234432100000","0001246464100000","0001247474100000","0001234443100000","0001266662100000","0000123321000000","0001280082100000","0012800008210000","0028000000820000","0000000000000000","0000000000000000","0000000000000000"]},
  sparkvolt:{pal:["#0033aa","#1155cc","#3377ee","#66aaff","#aaccff","#ffffff","#111111","#ffdd00"],px:["0000110001100000","0001210012100000","0001231132100000","0000123321000000","0001234432100000","0001246363100000","0001247474100000","0001234843100000","0001288882100000","0000123321000000","0001200002100000","0012000000210000","0011000000110000","0000000000000000","0000000000000000","0000000000000000"]},
  ampcore:{pal:["#112233","#224455","#336688","#4488aa","#00ccff","#aaddff","#ffffff","#ffdd00","#111111"],px:["0000555555000000","0000123321000000","0011234432110000","0123456654321000","1234567765432100","1234675957432100","1234696669432100","1234568865432100","1234555555432100","0123444444321000","0012300003210000","0012000000210000","0021000000120000","0000000000000000","0000000000000000","0000000000000000"]},
  forgeant:{pal:["#334455","#556677","#778899","#99aabb","#ccdde8","#aabbcc","#ffffff","#111111","#223344"],px:["0001111111100000","0012333333210000","0123455554321000","1234555555432100","1235578578532100","1235555555532100","1235555555532100","1234511115432100","1234555555432100","0123455554321000","0012344443210000","0001233332100000","0002300003200000","0002300003200000","0001100001100000","0000000000000000"]},
  drillord:{pal:["#223344","#334455","#556677","#778899","#99aabb","#aaddff","#111111","#cc8833","#ffaa44"],px:["0098700000000000","0987650000000000","9876543000000000","0034554300000000","0001234543210000","0001235553210000","0001245754210000","0001245554210000","0001234543210000","0001233333210000","0000123332100000","0001230003210000","0012300000321000","0012000000021000","0011000000011000","0000000000000000"]},
};

function setSprite(elementId, pokemonName) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const key = pokemonName.toLowerCase().replace(/[\s\-]/g, '');
  const sd = PIXEL_SPRITES[key];
  if (sd) {
    // Create canvas and draw pixel art scaled to fill container
    const SIZE = 80; // canvas size in px
    const GRID = 16;
    const PX = SIZE / GRID;
    el.innerHTML = '';
    const cv = document.createElement('canvas');
    cv.width = SIZE; cv.height = SIZE;
    cv.style.cssText = 'width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges;';
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, SIZE, SIZE);
    for (let row = 0; row < GRID; row++) {
      const rowStr = sd.px[row];
      for (let col = 0; col < GRID; col++) {
        const ci = parseInt(rowStr[col], 16);
        if (ci === 0) continue;
        ctx.fillStyle = sd.pal[ci - 1];
        ctx.fillRect(col * PX, row * PX, PX, PX);
      }
    }
    el.appendChild(cv);
  } else {
    // Fallback: emoji
    const emoji = (() => {
      for (const p of Object.values(POKEMON_BASE)) {
        if (p.name === pokemonName) return p.emoji;
      }
      return '❓';
    })();
    el.innerHTML = `<div style="font-size:62px;line-height:1;">${emoji}</div>`;
  }
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = ''; });
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
const TILE_COLOR={0:'#1a3a1a',1:'#0a1628',2:'#0d2a0d',3:'#0a2a3a',4:'#2a2a1a',5:'#0d3a0d',6:'#1a0a2a',7:'#2a0a0a',8:'#2a2a0a',9:'#1a1a3a',10:'#1a1a3a'};
const TILE_BORDER={0:'#1e401e',1:'#1a3050',2:'#112211',3:'#0d3a50',4:'#333320',5:'#164816',6:'#3a1a5a',7:'#5a1a1a',8:'#3a3a10',9:'#2a2a5a',10:'#2a2a5a'};

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
