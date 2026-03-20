// ═══════════════════════════════════════════════
// NEXUS — engine.js
// Core systems: overworld, battle, save/load
// ═══════════════════════════════════════════════

// ── STATE ──
let currentDialogue=[],dialogueIndex=0,dialogueCallback=null;
let selectedStarter=null;
let battleState={};
let npcDialogue=[],npcIndex=0,npcCallback=null;
let canvas,ctx,TILE_SIZE;
let bagContext='overworld'; // 'overworld' or 'battle'
let prevScreen='overworld';

// ── SCREEN ──
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById('screen-'+id);
  if(el) el.classList.add('active');
}

function notify(msg,color){
  const n=document.createElement('div');
  n.className='notif';
  if(color) n.style.borderColor=color,n.style.color=color;
  n.textContent=msg;
  document.body.appendChild(n);
  setTimeout(()=>n.remove(),3000);
}

// ── SAVE/LOAD ──
function startGame(){
  Object.assign(G,{playerName:'ALEX',starter:null,party:[],badges:[],location:'BOOTVILLE',
    steps:0,x:7,y:8,map:'bootville',bag:{nexball:5,superball:0,healpack:3,revive:1},
    flags:{metAda:false,beatGym1:false,visitedGridlock:false}});
  runIntro();
}
function saveGame(){localStorage.setItem('nexus_v3',JSON.stringify(G));notify('GAME SAVED ◈');}
function loadGame(){
  const s=localStorage.getItem('nexus_v3')||localStorage.getItem('nexus_v2');
  if(!s){notify('NO SAVE DATA FOUND');return;}
  const data=JSON.parse(s);
  Object.assign(G,data);
  initOverworld();showScreen('overworld');
}

// ── INTRO ──
// ── OVERWORLD ──
function initOverworld(){
  canvas=document.getElementById('map-canvas');
  const cont=document.getElementById('screen-overworld');
  const hH=cont.querySelector('.ow-header').offsetHeight||40;
  const cH=cont.querySelector('.ow-controls').offsetHeight||120;
  const W=cont.offsetWidth||480,H=(cont.offsetHeight||720)-hH-cH;
  canvas.width=W;canvas.height=H;
  TILE_SIZE=Math.floor(Math.min(W/11,H/10));
  ctx=canvas.getContext('2d');
  updateOWHeader();drawMap();
  document.addEventListener('keydown',e=>{
    const m={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',' ':'a'};
    if(m[e.key]){e.preventDefault();if(m[e.key]==='a')interact();else move(m[e.key]);}
  });
}
function updateOWHeader(){
  document.getElementById('ow-location').textContent=G.location;
  const p=G.party[0];
  if(p) document.getElementById('ow-party-info').textContent=
    p.emoji+' '+p.name+' Lv.'+p.level+' HP:'+p.hp+'/'+p.maxHp+' 💰'+G.money;
}
function getCurrentMap(){return MAPS[G.map]||MAPS.bootville;}
function getCurrentNPCs(){return NPCS_BY_MAP[G.map]||[];}
function drawMap(){
  if(!ctx)return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const map=getCurrentMap();
  const offX=Math.floor(canvas.width/2-G.x*TILE_SIZE-TILE_SIZE/2);
  const offY=Math.floor(canvas.height/2-G.y*TILE_SIZE-TILE_SIZE/2);
  for(let r=0;r<map.length;r++){
    for(let c=0;c<map[r].length;c++){
      const tx=c*TILE_SIZE+offX,ty=r*TILE_SIZE+offY;
      if(tx>canvas.width||ty>canvas.height||tx<-TILE_SIZE||ty<-TILE_SIZE)continue;
      const t=map[r][c];
      ctx.fillStyle=TILE_COLOR[t]||'#111';ctx.fillRect(tx,ty,TILE_SIZE,TILE_SIZE);
      ctx.strokeStyle=TILE_BORDER[t]||'#222';ctx.lineWidth=1;ctx.strokeRect(tx+.5,ty+.5,TILE_SIZE-1,TILE_SIZE-1);
      ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=Math.floor(TILE_SIZE*.55)+'px serif';
      if(t===TILE.TALL){ctx.fillStyle='#1a5a1a';ctx.fillText('꧁',tx+TILE_SIZE/2,ty+TILE_SIZE/2);}
      if(t===TILE.TREE){ctx.font=Math.floor(TILE_SIZE*.7)+'px serif';ctx.fillText('🌲',tx+TILE_SIZE/2,ty+TILE_SIZE/2);}
      if(t===TILE.CENTER){ctx.font=Math.floor(TILE_SIZE*.55)+'px serif';ctx.fillText('🏥',tx+TILE_SIZE/2,ty+TILE_SIZE/2);}
      if(t===TILE.GYM){ctx.font=Math.floor(TILE_SIZE*.55)+'px serif';ctx.fillText('🏟',tx+TILE_SIZE/2,ty+TILE_SIZE/2);}
      if(t===TILE.SIGN){ctx.font=Math.floor(TILE_SIZE*.55)+'px serif';ctx.fillText('📋',tx+TILE_SIZE/2,ty+TILE_SIZE/2);}
      if(t===TILE.EXIT_N||t===TILE.EXIT_S){ctx.fillStyle='#00ffff33';ctx.fillRect(tx+2,ty+2,TILE_SIZE-4,TILE_SIZE-4);}
    }
  }
  for(const npc of getCurrentNPCs()){
    const tx=npc.x*TILE_SIZE+offX,ty=npc.y*TILE_SIZE+offY;
    ctx.font=Math.floor(TILE_SIZE*.7)+'px serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(npc.emoji,tx+TILE_SIZE/2,ty+TILE_SIZE/2);
  }
  // player
  const px=G.x*TILE_SIZE+offX,py=G.y*TILE_SIZE+offY;
  ctx.shadowColor='#00ffff';ctx.shadowBlur=10;
  ctx.fillStyle='#00ffff22';ctx.fillRect(px+2,py+2,TILE_SIZE-4,TILE_SIZE-4);
  ctx.shadowBlur=0;
  ctx.font=Math.floor(TILE_SIZE*.65)+'px serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText('🧑',px+TILE_SIZE/2,py+TILE_SIZE/2);
}
function canWalk(x,y){
  const map=getCurrentMap();
  if(y<0||y>=map.length||x<0||x>=map[0].length)return false;
  const t=map[y][x];
  return t!==TILE.WALL&&t!==TILE.TREE&&t!==TILE.WATER;
}
function move(dir){
  if(!document.getElementById('screen-overworld').classList.contains('active'))return;
  let nx=G.x,ny=G.y;
  if(dir==='up')ny--;if(dir==='down')ny++;if(dir==='left')nx--;if(dir==='right')nx++;
  // NPC collision
  for(const npc of getCurrentNPCs()){if(npc.x===nx&&npc.y===ny){handleNPCTouch(npc);return;}}
  if(!canWalk(nx,ny))return;
  G.x=nx;G.y=ny;G.steps++;
  // Map transitions
  const map=getCurrentMap();
  const tile=map[ny]?map[ny][nx]:null;
  if(G.map==='bootville'&&tile===TILE.EXIT_S){travelToGridlock();return;}
  if(G.map==='gridlock'&&tile===TILE.EXIT_N){travelToBootville();return;}
  if(G.map==='gridlock'&&tile===TILE.EXIT_S){travelToRoute2();return;}
  if(G.map==='route2'&&tile===TILE.EXIT_N){setMap('gridlock',7,12);return;}
  if(G.map==='route2'&&tile===TILE.EXIT_S){travelToIronhaven();return;}
  if(G.map==='ironhaven'&&tile===TILE.EXIT_N){setMap('route2',7,12);return;}
  // Enter buildings
  if(tile===TILE.CENTER){openPokemonCenter();return;}
  if(tile===TILE.GYM){openGym();return;}
  drawMap();updateOWHeader();
  // Wild encounter
  if(map[ny]&&map[ny][nx]===TILE.TALL&&Math.random()<0.2)setTimeout(triggerWildBattle,300);
  if(G.steps%25===0)saveGame();
}
function travelToGridlock(){
  if(!G.flags.visitedGridlock){
    G.flags.visitedGridlock=true;
    currentDialogue=[{emoji:'🌆',speaker:'NARRATOR',text:'You arrive at GRIDLOCK CITY — a neon-soaked metropolis of hover-cars and electric billboards. The Gym is here. So is the Pokémon Center.'}];
    dialogueIndex=0;dialogueCallback=()=>{setMap('gridlock',7,1);};
    showScreen('intro');renderDialogue();
  } else setMap('gridlock',7,1);
}
function travelToBootville(){setMap('bootville',7,13);}
function travelToRoute2(){
  if(!G.flags.beatGym1){notify('Beat Gym 1 first! ZARA is waiting.','#ff3355');setMap('gridlock',7,12);return;}
  currentDialogue=[{emoji:'🌿',speaker:'NARRATOR',text:'You step onto ROUTE 2 — IRON PASS. The air smells of rust and exhaust. Steel-type Pokémon prowl the tall grass. Ironhaven City lies ahead.'}];
  dialogueIndex=0;dialogueCallback=()=>{setMap('route2',7,1);};
  showScreen('intro');renderDialogue();
}
function travelToIronhaven(){
  if(!G.flags.visitedIronhaven){
    G.flags.visitedIronhaven=true;
    currentDialogue=[{emoji:'🏭',speaker:'NARRATOR',text:'IRONHAVEN CITY. Factories and smokestacks stretch into the smog. SYNTEK\'s smelting plant looms at the edge of town. The Gym Leader REX is said to be unbeatable.'}];
    dialogueIndex=0;dialogueCallback=()=>{setMap('ironhaven',7,1);};
    showScreen('intro');renderDialogue();
  } else setMap('ironhaven',7,1);
}
function setMap(mapId,x,y){
  G.map=mapId;G.x=x;G.y=y;
  const names={bootville:'BOOTVILLE',gridlock:'GRIDLOCK CITY',route2:'ROUTE 2 — IRON PASS',ironhaven:'IRONHAVEN CITY'};
  G.location=names[mapId]||mapId.toUpperCase();
  showScreen('overworld');initOverworld();
}
function interact(){
  const dirs=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];
  for(const d of dirs){
    for(const npc of getCurrentNPCs()){
      if(npc.x===G.x+d.x&&npc.y===G.y+d.y){handleNPCTouch(npc);return;}
    }
  }
  // Check tile under player
  const map=getCurrentMap();
  const tile=map[G.y]?map[G.y][G.x]:null;
  if(tile===TILE.CENTER){openPokemonCenter();return;}
  if(tile===TILE.GYM){openGym();return;}
  notify('NOTHING NEARBY');
}
function handleNPCTouch(npc){
  if(npc.isCenter){openPokemonCenter();return;}
  if(npc.isGym){openGym();return;}
  if(npc.isKael){triggerKaelBattle();return;}
  if(npc.isShop){openShop();return;}
  talkToNPC(npc);
}

// ── KAEL RIVAL BATTLE ──
function talkToNPC(npc){
  npcDialogue=npc.dialogue;npcIndex=0;
  document.getElementById('npc-emoji').textContent=npc.emoji;
  document.getElementById('npc-speaker').textContent=npc.name;
  document.getElementById('npc-choices').innerHTML='';
  document.getElementById('npc-continue').style.display='block';
  showScreen('npc');renderNPC();
}
function renderNPC(){typeText('npc-text',npcDialogue[npcIndex]);}
function advanceNPC(){
  npcIndex++;
  if(npcIndex>=npcDialogue.length){showScreen('overworld');drawMap();}
  else renderNPC();
}

// ── POKÉMON CENTER ──
function openPokemonCenter(){showScreen('center');}
function healParty(){
  G.party.forEach(p=>{p.hp=p.maxHp;});
  updateOWHeader();
  notify('All Pokémon restored to full HP! 💊','#ff99cc');
  setTimeout(()=>{showScreen('overworld');drawMap();},1800);
}

// ── GYM ──
function openGym(){
  if(G.map==='ironhaven'){openGym2();return;}
  if(G.flags.beatGym1){
    notify('You already have the VOLT BADGE! ⚡','#ffdd00');return;
  }
  document.getElementById('gym-title').textContent='GRIDLOCK GYM';
  document.getElementById('gym-subtitle').textContent='LEADER: ZARA — ELECTRIC TYPE';
  document.getElementById('gym-leader-emoji').textContent='👩';
  document.getElementById('gym-leader-name').textContent='ZARA';
  document.getElementById('gym-badge-emoji').textContent='⚡';
  document.getElementById('gym-dialogue-text').textContent=
    '"Welcome to Gridlock Gym. I\'m Zara. My Electric Pokémon rule the circuits of this city. Think you can keep up? I\'ve been the Gym Leader here for six years — no one has ever made it easy."';
  showScreen('gym');
}
function openGym2(){
  if(G.flags.beatGym2){
    notify('You already have the FORGE BADGE! ⚙️','#aabbcc');return;
  }
  if(!G.flags.beatGym1){notify('You need the Volt Badge first!','#ff3355');return;}
  document.getElementById('gym-title').textContent='IRONHAVEN GYM';
  document.getElementById('gym-subtitle').textContent='LEADER: REX — STEEL TYPE';
  document.getElementById('gym-leader-emoji').textContent='👨‍🏭';
  document.getElementById('gym-leader-name').textContent='REX';
  document.getElementById('gym-badge-emoji').textContent='⚙️';
  document.getElementById('gym-dialogue-text').textContent=
    '"You made it to Ironhaven. Most trainers turn back on Route 2. My Steel Pokémon are forged from the same iron as this city — unbreakable. Prove me wrong."';
  document.getElementById('gym-btn-battle').onclick=startGym2Battle;
  showScreen('gym');
}
function startGymBattle(){
  // Check party health
  const alive=G.party.filter(p=>p.hp>0);
  if(alive.length===0){notify('Your Pokémon are all fainted! Heal first!','#ff3355');return;}
  const zaraPoke=[
    JSON.parse(JSON.stringify(POKEMON_BASE.zara_jolteon)),
    JSON.parse(JSON.stringify(POKEMON_BASE.zara_ampere))
  ];
  battleState._gymQueue=zaraPoke;
  battleState._gymIndex=0;
  battleState._gymLeader={name:'ZARA',emoji:'👩'};
  const firstEnemy=zaraPoke[0];
  startBattle(firstEnemy,true,true);
}

function startGym2Battle(){
  const alive=G.party.filter(p=>p.hp>0);
  if(alive.length===0){notify('Your Pokémon are all fainted! Heal first!','#ff3355');return;}
  const rexPoke=[
    JSON.parse(JSON.stringify(POKEMON_BASE.rex_forgeant)),
    JSON.parse(JSON.stringify(POKEMON_BASE.rex_drillord))
  ];
  battleState._gymQueue=rexPoke;
  battleState._gymIndex=0;
  battleState._gymLeader={name:'REX',emoji:'👨‍🏭'};
  battleState._gym2=true;
  startBattle(rexPoke[0],true,true);
}
function openBag(){prevScreen='overworld';bagContext='overworld';renderBag();showScreen('bag');}
function closeBag(){showScreen(prevScreen);if(prevScreen==='overworld')drawMap();}
function openParty(){renderParty();showScreen('party');}
function closeParty(){showScreen('overworld');drawMap();}
function openMenu(){
  const opts=[
    {label:'💾 SAVE GAME',action:saveGame},
    {label:'🏅 BADGE CASE',action:renderBadges},
    {label:'💊 BAG',action:openBag},
    {label:'👥 PARTY',action:openParty},
  ];
  // Simple inline menu via NPC screen
  npcDialogue=['What would you like to do?'];
  npcIndex=0;
  document.getElementById('npc-emoji').textContent='📱';
  document.getElementById('npc-speaker').textContent='MENU';
  document.getElementById('npc-continue').style.display='none';
  showScreen('npc');
  typeText('npc-text','What would you like to do?');
  const ch=document.getElementById('npc-choices');ch.innerHTML='';
  opts.forEach(o=>{
    const btn=document.createElement('button');btn.className='choice-btn';btn.textContent=o.label;
    btn.onclick=()=>{showScreen('overworld');drawMap();o.action();};ch.appendChild(btn);
  });
  const back=document.createElement('button');back.className='choice-btn';back.textContent='← BACK';
  back.onclick=()=>{showScreen('overworld');drawMap();};ch.appendChild(back);
}
function renderBag(){
  const items={
    nexball:  {emoji:'🔵',name:'NEX BALL',  desc:'A basic ball for catching wild Pokémon.'},
    superball:{emoji:'🟣',name:'SUPER BALL',desc:'Better catch rate than a Nex Ball.'},
    healpack: {emoji:'💊',name:'HEAL PACK', desc:'Restores 40 HP to one Pokémon.'},
    revive:   {emoji:'💫',name:'REVIVE',    desc:'Revives a fainted Pokémon to 50% HP.'},
    fullheal: {emoji:'✨',name:'FULL HEAL', desc:'Fully restores one Pokémon.'},
  };
  const list=document.getElementById('bag-list');list.innerHTML='';
  let hasItems=false;
  for(const [key,count] of Object.entries(G.bag)){
    if(count<=0)continue;hasItems=true;
    const item=items[key]||{emoji:'?',name:key,desc:''};
    const div=document.createElement('div');div.className='bag-item';
    div.innerHTML=`<div><div class="bag-item-name">${item.emoji} ${item.name}</div><div class="bag-item-desc">${item.desc}</div></div><div class="bag-item-count">×${count}</div>`;
    if(bagContext==='overworld'){
      div.onclick=()=>{
        if(key==='healpack'){
          const wounded=G.party.find(p=>p.hp<p.maxHp&&p.hp>0);
          if(!wounded){notify('All Pokémon are at full HP!');return;}
          wounded.hp=Math.min(wounded.maxHp,wounded.hp+40);
          G.bag.healpack--;updateOWHeader();notify(wounded.name+' restored 40 HP! 💊','#00ff88');
          renderBag();
        } else if(key==='fullheal'){
          const wounded=G.party.find(p=>p.hp<p.maxHp&&p.hp>0)||G.party.find(p=>p.hp>0);
          if(!wounded){notify('All Pokémon are at full HP!');return;}
          wounded.hp=wounded.maxHp;G.bag.fullheal--;
          updateOWHeader();notify(wounded.name+' fully restored! ✨','#00ff88');renderBag();
        } else if(key==='revive'){
          const fainted=G.party.find(p=>p.hp<=0);
          if(!fainted){notify('No fainted Pokémon!');return;}
          fainted.hp=Math.floor(fainted.maxHp*.5);G.bag.revive--;
          notify(fainted.name+' was revived! 💫','#ffdd00');renderBag();
        } else {notify('Use balls in battle!');}
      };
    }
    list.appendChild(div);
  }
  if(!hasItems){
    const empty=document.createElement('div');empty.style.cssText='text-align:center;color:var(--textdim);padding:40px;font-size:12px;';
    empty.textContent='Your bag is empty.';list.appendChild(empty);
  }
}
function renderParty(){
  const list=document.getElementById('party-list');list.innerHTML='';
  G.party.forEach((p,i)=>{
    const hpPct=Math.max(0,p.hp/p.maxHp*100);
    const hpCol=hpPct>50?'var(--hp-green)':hpPct>25?'var(--hp-yellow)':'var(--hp-red)';
    const div=document.createElement('div');div.className='party-card'+(i===0?' lead':'');
    div.innerHTML=`<div class="party-emoji">${p.emoji}</div><div class="party-info">
      <div class="party-name">${p.name} ${i===0?'<span style="color:var(--accent);font-size:9px;">◈ LEAD</span>':''}</div>
      <div class="party-stats">Lv.${p.level} | ${p.type} | HP:${p.hp}/${p.maxHp}</div>
      <div class="party-hp-bar"><div class="party-hp-fill" style="width:${hpPct}%;background:${hpCol};"></div></div>
    </div>`;
    list.appendChild(div);
  });
  if(G.party.length===0){
    const e=document.createElement('div');e.style.cssText='text-align:center;color:var(--textdim);padding:40px;font-size:12px;';
    e.textContent='No Pokémon in party!';list.appendChild(e);
  }
}
function renderBadges(){
  const ALL_BADGES=[
    {name:'VOLT BADGE',emoji:'⚡',id:'volt'},
    {name:'FORGE BADGE',emoji:'⚙️',id:'forge'},
    {name:'DEPTH BADGE',emoji:'💧',id:'depth'},
    {name:'EMBER BADGE',emoji:'🔥',id:'ember'},
    {name:'MIND BADGE',emoji:'🔮',id:'mind'},
    {name:'VOID BADGE',emoji:'🌑',id:'void'},
    {name:'CHROME BADGE',emoji:'🤖',id:'chrome'},
    {name:'APEX BADGE',emoji:'🌐',id:'apex'},
  ];
  const grid=document.getElementById('badge-grid');grid.innerHTML='';
  ALL_BADGES.forEach(b=>{
    const earned=G.badges.includes(b.id);
    const div=document.createElement('div');div.className='badge-slot'+(earned?' earned':'');
    div.innerHTML=`<div class="badge-emoji">${b.emoji}</div><div class="badge-name">${b.name}</div>`;
    grid.appendChild(div);
  });
  showScreen('badges');
}

// ── WILD BATTLE ──
// ── WILD BATTLE ──
function triggerWildBattle(){
  const table=WILD_BY_MAP[G.map]||WILD_BY_MAP.bootville;
  const roll=Math.random()*table.reduce((a,b)=>a+b.weight,0);
  let cum=0,wildId='glitchling';
  for(const e of table){cum+=e.weight;if(roll<cum){wildId=e.id;break;}}
  const base=POKEMON_BASE[wildId];
  const leadLv=G.party[0]?G.party[0].level:5;
  const lvl=Math.max(2,Math.floor(leadLv*.8+Math.random()*4));
  const wild=JSON.parse(JSON.stringify(base));
  wild.level=lvl;
  const sc=1+(lvl-base.level)*0.08;
  wild.maxHp=Math.max(8,Math.floor(wild.maxHp*sc));wild.hp=wild.maxHp;
  wild.atk=Math.floor(wild.atk*Math.max(1,sc));
  startBattle(wild,false,false);
}

// ── BATTLE ENGINE ──
function startBattle(enemy,isTrainer,isGym){
  const player=G.party.find(p=>p.hp>0)||G.party[0];
  battleState={
    player:JSON.parse(JSON.stringify(player)),
    enemy:JSON.parse(JSON.stringify(enemy)),
    isTrainer,isGym,turn:'player',over:false,protecting:false,
    playerStatusDef:0,
    xpGain:Math.floor(enemy.level*10+15)+(isGym?50:0),
    catchRate:enemy.catchRate||100,
  };
  // Gym battle adjustments
  document.getElementById('btn-catch').style.display=isTrainer?'none':'';
  document.getElementById('btn-run').style.display=isGym?'none':'';
  // Update UI
  document.getElementById('enemy-name').textContent=enemy.name;
  document.getElementById('enemy-level').textContent='Lv.'+enemy.level;
  setSprite('enemy-sprite', enemy.name);
  document.getElementById('player-battle-name').textContent=player.name;
  document.getElementById('player-battle-level').textContent='Lv.'+player.level;
  setSprite('player-sprite', player.name);
  // Set battle bg for gym
  const bg=document.getElementById('battle-bg');
  bg.style.backgroundImage=isGym
    ?'linear-gradient(rgba(255,0,170,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,170,.07) 1px,transparent 1px)'
    :'linear-gradient(rgba(0,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,.05) 1px,transparent 1px)';
  updateBattleHPBars();
  setBattleLog(isGym?'ZARA sent out '+enemy.name+'!':'A wild '+enemy.name+' appeared!');
  showMainMenu();showScreen('battle');
}
function updateBattleHPBars(){
  const bs=battleState;
  const ep=Math.max(0,bs.enemy.hp/bs.enemy.maxHp*100);
  const pp=Math.max(0,bs.player.hp/bs.player.maxHp*100);
  document.getElementById('enemy-hp-bar').style.width=ep+'%';
  document.getElementById('enemy-hp-bar').style.background=ep>50?'var(--hp-green)':ep>25?'var(--hp-yellow)':'var(--hp-red)';
  document.getElementById('enemy-hp-text').textContent=Math.max(0,bs.enemy.hp)+'/'+bs.enemy.maxHp;
  document.getElementById('player-hp-bar').style.width=pp+'%';
  document.getElementById('player-hp-bar').style.background=pp>50?'var(--hp-green)':pp>25?'var(--hp-yellow)':'var(--hp-red)';
  document.getElementById('player-hp-text').textContent=Math.max(0,bs.player.hp)+'/'+bs.player.maxHp;
}
function setBattleLog(msg){document.getElementById('battle-log').textContent=msg;}
function showMainMenu(){
  document.getElementById('battle-actions').style.display='flex';
  document.getElementById('battle-moves').style.display='none';
  document.getElementById('battle-catch-menu').style.display='none';
  document.getElementById('battle-bag-menu').style.display='none';
  document.getElementById('battle-switch-menu').style.display='none';
}
function showMoveMenu(){
  document.getElementById('battle-actions').style.display='none';
  document.getElementById('battle-moves').style.display='flex';
  const grid=document.getElementById('move-grid');grid.innerHTML='';
  for(const mv of battleState.player.moves){
    const md=MOVE_DATA[mv]||{pwr:50,type:'Normal',pp:20};
    const btn=document.createElement('button');btn.className='move-btn';
    const typeClass='type-'+md.type.toLowerCase().split('/')[0];
    btn.innerHTML=`${mv}<span class="move-type ${typeClass}">${md.type} | PWR:${md.pwr||'—'}</span>`;
    btn.onclick=()=>executePlayerMove(mv);grid.appendChild(btn);
  }
}
function hideMoveMenu(){showMainMenu();}
function openCatchMenu(){
  document.getElementById('battle-actions').style.display='none';
  document.getElementById('battle-catch-menu').style.display='flex';
  const opts=document.getElementById('ball-options');opts.innerHTML='';
  const balls={nexball:{name:'NEX BALL',emoji:'🔵',mult:1},superball:{name:'SUPER BALL',emoji:'🟣',mult:1.5}};
  for(const[key,ball] of Object.entries(balls)){
    if((G.bag[key]||0)<=0)continue;
    const btn=document.createElement('button');btn.className='move-btn';
    btn.innerHTML=`${ball.emoji} ${ball.name} <span class="move-type">×${G.bag[key]}</span>`;
    btn.onclick=()=>throwBall(key,ball.mult);opts.appendChild(btn);
  }
  if(opts.children.length===0){opts.innerHTML='<div style="color:var(--textdim);font-size:12px;padding:10px;">No balls left! Buy more at a shop.</div>';}
}
function hideCatchMenu(){showMainMenu();}

function throwBall(ballKey,mult){
  if(battleState.isTrainer){setBattleLog("Can't catch a trainer's Pokémon!");showMainMenu();return;}
  G.bag[ballKey]--;
  const bs=battleState;
  const hpRatio=bs.enemy.hp/bs.enemy.maxHp;
  // Catch formula: lower HP = better chance
  const catchChance=((bs.catchRate/255)*mult*(1-hpRatio*.7));
  // Ball throw animation
  const ballEl=document.getElementById('catch-ball');
  ballEl.textContent=ballKey==='nexball'?'🔵':'🟣';
  ballEl.style.display='block';
  ballEl.style.animation='none';
  setTimeout(()=>{ballEl.style.animation='ballBounce .8s ease';},50);

  document.getElementById('battle-catch-menu').style.display='none';

  setTimeout(()=>{
    ballEl.style.display='none';
    if(Math.random()<catchChance){
      // CAUGHT!
      setBattleLog('Gotcha! '+bs.enemy.name+' was caught! 🎉');
      setTimeout(()=>{
        if(G.party.length<6){
          const caught=JSON.parse(JSON.stringify(bs.enemy));
          caught.wild=false;caught.xp=0;caught.xpNext=Math.floor(caught.maxHp*3.5);
          G.party.push(caught);
          setBattleLog(bs.enemy.name+' was added to your party!');
        } else {
          setBattleLog(bs.enemy.name+' was caught but party is full!');
        }
        setTimeout(()=>{endBattle(true,true);},1500);
      },1200);
    } else {
      const shakes=Math.floor(Math.random()*3)+1;
      setBattleLog(bs.enemy.name+' broke free after '+shakes+(shakes===1?' shake':'  shakes')+'!');
      setTimeout(enemyTurn,1400);
    }
  },900);
}

function openBagInBattle(){
  document.getElementById('battle-actions').style.display='none';
  document.getElementById('battle-bag-menu').style.display='flex';
  const opts=document.getElementById('battle-bag-options');opts.innerHTML='';
  if((G.bag.healpack||0)>0){
    const btn=document.createElement('button');btn.className='move-btn';
    btn.innerHTML=`💊 HEAL PACK ×${G.bag.healpack} <span class="move-type">Restores 40 HP</span>`;
    btn.onclick=()=>{
      const bs=battleState;
      bs.player.hp=Math.min(bs.player.maxHp,bs.player.hp+40);
      G.bag.healpack--;G.party[0].hp=bs.player.hp;
      updateBattleHPBars();setBattleLog(bs.player.name+' restored 40 HP!');
      hideBagInBattle();setTimeout(enemyTurn,1200);
    };opts.appendChild(btn);
  }
  if((G.bag.revive||0)>0&&battleState.isGym){
    // show revive in gym battles
    const btn=document.createElement('button');btn.className='move-btn';
    btn.innerHTML=`💫 REVIVE ×${G.bag.revive} <span class="move-type">Revive fainted Pokémon</span>`;
    btn.onclick=()=>{notify('Use revives outside battle!');hideBagInBattle();};opts.appendChild(btn);
  }
  if(opts.children.length===0){opts.innerHTML='<div style="color:var(--textdim);font-size:12px;padding:10px;">No usable items!</div>';}
}
function hideBagInBattle(){
  document.getElementById('battle-bag-menu').style.display='none';
  document.getElementById('battle-actions').style.display='flex';
}

// ── SWITCH POKÉMON IN BATTLE ──
function openSwitchMenu(){
  document.getElementById('battle-actions').style.display='none';
  document.getElementById('battle-switch-menu').style.display='flex';
  const opts=document.getElementById('switch-options');
  opts.innerHTML='';
  if(G.party.length<=1){
    opts.innerHTML='<div style="color:var(--textdim);font-size:12px;padding:12px;text-align:center;">No other Pokémon in your party!<br><br>Catch more Pokémon in the tall grass.</div>';
    return;
  }
  G.party.forEach((p,i)=>{
    const isLead=(p.name===battleState.player.name&&i===0);
    const isFainted=p.hp<=0;
    const hpPct=Math.max(0,p.hp/p.maxHp*100);
    const hpCol=hpPct>50?'var(--hp-green)':hpPct>25?'var(--hp-yellow)':'var(--hp-red)';
    const card=document.createElement('div');
    card.className='switch-card'+(isLead?' active-lead':isFainted?' fainted':'');
    card.innerHTML=`
      <div class="switch-card-emoji">${p.emoji}</div>
      <div class="switch-card-info">
        <div class="switch-card-name">${p.name} ${isLead?'◈ ACTIVE':isFainted?'✕ FAINTED':''}</div>
        <div class="switch-card-stats">Lv.${p.level} | ${p.type} | HP: ${p.hp}/${p.maxHp}</div>
        <div class="switch-hp-bar"><div class="switch-hp-fill" style="width:${hpPct}%;background:${hpCol};"></div></div>
      </div>`;
    if(!isLead&&!isFainted) card.onclick=()=>doSwitch(i);
    opts.appendChild(card);
  });
}

function hideSwitchMenu(){
  document.getElementById('battle-switch-menu').style.display='none';
  document.getElementById('battle-actions').style.display='flex';
}

function doSwitch(partyIndex){
  const bs=battleState;
  // Save current lead's HP back to party before swapping
  G.party[0].hp=bs.player.hp;
  // Swap chosen Pokémon to front of party
  const chosen=G.party.splice(partyIndex,1)[0];
  G.party.unshift(chosen);
  // Update battle state player
  bs.player=JSON.parse(JSON.stringify(chosen));
  bs.protecting=false;
  // Update battle UI
  document.getElementById('player-battle-name').textContent=chosen.name;
  document.getElementById('player-battle-level').textContent='Lv.'+chosen.level;
  setSprite('player-sprite', chosen.name);
  updateBattleHPBars();
  setBattleLog('Go, '+chosen.name+'!\n'+bs.enemy.name+' is watching...');
  document.getElementById('battle-switch-menu').style.display='none';
  // Switching costs a turn — enemy attacks
  setTimeout(enemyTurn,1400);
  updateOWHeader();
}

// ── BATTLE LOGIC ──
function calcDamage(atk,moveName,def){
  const md=MOVE_DATA[moveName]||{pwr:50};
  if(!md.pwr)return 0;
  const base=Math.floor((atk.level*.4+2)*md.pwr*atk.atk/(def.def*50)+2);
  return Math.max(1,Math.floor(base*(0.85+Math.random()*.15)));
}
function executePlayerMove(moveName){
  if(battleState.over)return;
  const md=MOVE_DATA[moveName]||{};
  const bs=battleState;
  document.getElementById('battle-actions').style.display='none';
  document.getElementById('battle-moves').style.display='none';
  let msg=bs.player.name+' used '+moveName+'!'+(md.msg?'\n'+md.msg:'');
  if(md.effect==='protect'){bs.protecting=true;setBattleLog(msg+'\n'+bs.player.name+' braced itself!');setTimeout(enemyTurn,1500);return;}
  if(md.effect==='def+1')bs.playerStatusDef=(bs.playerStatusDef||0)+1;
  if(md.effect==='def+2')bs.playerStatusDef=(bs.playerStatusDef||0)+2;
  const dmg=calcDamage(bs.player,moveName,bs.enemy);
  if(dmg>0){bs.enemy.hp=Math.max(0,bs.enemy.hp-dmg);msg+='\nDealt '+dmg+' damage!';hitSprite('enemy-sprite');}
  setBattleLog(msg);updateBattleHPBars();
  if(bs.enemy.hp<=0){
    // Gym: next Pokémon?
    if(bs.isGym&&battleState._gymQueue){
      battleState._gymIndex++;
      if(battleState._gymIndex<battleState._gymQueue.length){
        const next=battleState._gymQueue[battleState._gymIndex];
        setBattleLog('ZARA: "Don\'t think it\'s over!\nGo, '+next.name+'!"');
        setTimeout(()=>{
          bs.enemy=JSON.parse(JSON.stringify(next));
          document.getElementById('enemy-name').textContent=next.name;
          document.getElementById('enemy-level').textContent='Lv.'+next.level;
          setSprite('enemy-sprite', next.name);
          updateBattleHPBars();showMainMenu();
        },2000);
        return;
      }
    }
    setTimeout(()=>endBattle(true,false),1200);return;
  }
  setTimeout(enemyTurn,1400);
}
function enemyTurn(){
  const bs=battleState;
  const mv=bs.enemy.moves[Math.floor(Math.random()*bs.enemy.moves.length)];
  const md=MOVE_DATA[mv]||{};
  let msg=bs.enemy.name+' used '+mv+'!';
  if(bs.protecting){msg+='\n'+bs.player.name+' was protected!';bs.protecting=false;setBattleLog(msg);updateBattleHPBars();setTimeout(showMainMenu,1400);return;}
  const dmg=calcDamage(bs.enemy,mv,bs.player);
  if(dmg>0){bs.player.hp=Math.max(0,bs.player.hp-dmg);msg+='\nDealt '+dmg+' damage!';hitSprite('player-sprite');}
  setBattleLog(msg);updateBattleHPBars();bs.protecting=false;
  if(bs.player.hp<=0){
    // Check if any other party member is alive
    G.party[0].hp=0;
    const nextAlive=G.party.findIndex(p=>p.hp>0);
    if(nextAlive===-1){
      setTimeout(()=>endBattle(false,false),1200);
    } else {
      setBattleLog(bs.player.name+' fainted!\nChoose your next Pokémon!');
      setTimeout(()=>openSwitchMenu(),1400);
    }
    return;
  }
  setTimeout(showMainMenu,1400);
}
function tryRun(){
  if(battleState.isTrainer){setBattleLog("You can't run from a trainer battle!");return;}
  if(Math.random()>.35){setBattleLog('Got away safely!');setTimeout(()=>{showScreen('overworld');drawMap();},1200);}
  else{setBattleLog("Couldn't escape!\n"+battleState.enemy.name+' blocks the way!');setTimeout(enemyTurn,1400);}
}
function endBattle(won,caught){
  battleState.over=true;
  const bs=battleState;
  if(G.party[0])G.party[0].hp=bs.player.hp;
  if(won&&!caught){
    const lead=G.party[0];if(!lead)return;
    const moneyGain=bs.isGym?500:bs.isTrainer?120:Math.floor(bs.xpGain*0.8);
    G.money=(G.money||0)+moneyGain;
    lead.xp=(lead.xp||0)+bs.xpGain;
    let extra='';
    while(lead.xp>=(lead.xpNext||100)){
      lead.level++;lead.xp=0;lead.xpNext=Math.floor((lead.xpNext||100)*1.3);
      lead.maxHp=Math.floor(lead.maxHp*1.1);lead.hp=lead.maxHp;
      lead.atk=Math.floor(lead.atk*1.08);lead.def=Math.floor(lead.def*1.08);
      extra+='\n⬆ LEVEL UP! '+lead.name+' is now Lv.'+lead.level+'!';
      // Check evolution
      const evo=EVOLUTIONS[lead.name.toLowerCase()];
      if(evo&&lead.level>=evo.level&&!pendingEvolution){
        pendingEvolution={pokemon:lead,evo};
      }
    }
    // Kael win
    if(bs._isKael){
      G.flags.beatKael=true;
      document.getElementById('result-title').textContent='RIVAL DEFEATED!';
      document.getElementById('result-title').className='result-title result-win';
      document.getElementById('result-detail').textContent=
        'You beat KAEL!\n+'+bs.xpGain+' XP  +'+moneyGain+' NC'+extra;
      document.getElementById('result-btn').onclick=()=>{
        currentDialogue=[
          {emoji:'🧑',speaker:'KAEL',text:'"...Fine. You\'re better than me right now. That\'s all I\'ll admit."'},
          {emoji:'🧑',speaker:'KAEL',text:'"Rex is ahead. He\'s the real test. Don\'t lose to him before I get a rematch."'},
          {emoji:'🧑',speaker:'KAEL',text:'"...Take this."'},
          {emoji:'💊',speaker:'NARRATOR',text:'KAEL handed you 3 Heal Packs and walked away without another word.'},
        ];
        dialogueIndex=0;dialogueCallback=()=>{
          G.bag.healpack=(G.bag.healpack||0)+3;
          updateOWHeader();saveGame();showScreen('overworld');drawMap();
        };
        showScreen('intro');renderDialogue();
      };
      showScreen('result');return;
    }
    // Gym 2 win
    if(bs._gym2){
      G.flags.beatGym2=true;G.badges.push('forge');
      document.getElementById('result-title').textContent='GYM CLEARED!';
      document.getElementById('result-title').className='result-title result-win';
      document.getElementById('result-detail').textContent=
        'You defeated Leader REX!\n⚙️ You received the FORGE BADGE!\n+'+bs.xpGain+' XP  +'+moneyGain+' NC'+extra;
      document.getElementById('result-btn').onclick=()=>showGym2VictoryScene();
      showScreen('result');return;
    }
    // Gym 1 win
    if(bs.isGym){
      G.flags.beatGym1=true;G.badges.push('volt');
      document.getElementById('result-title').textContent='GYM CLEARED!';
      document.getElementById('result-title').className='result-title result-win';
      document.getElementById('result-detail').textContent=
        'You defeated Leader ZARA!\n⚡ You received the VOLT BADGE!\n+'+bs.xpGain+' XP  +'+moneyGain+' NC'+extra;
      document.getElementById('result-btn').onclick=()=>showGymVictoryScene();
    } else {
      document.getElementById('result-title').textContent='VICTORY!';
      document.getElementById('result-title').className='result-title result-win';
      document.getElementById('result-detail').textContent=
        bs.enemy.name+' was defeated!\n+'+bs.xpGain+' XP  +'+moneyGain+' NC'+extra;
      document.getElementById('result-btn').onclick=afterBattle;
    }
  } else if(caught){
    document.getElementById('result-title').textContent='CAUGHT!';
    document.getElementById('result-title').className='result-title result-win';
    document.getElementById('result-detail').textContent=
      bs.enemy.name+' joined your team!\nParty: '+G.party.length+'/6';
    document.getElementById('result-btn').onclick=afterBattle;
  } else {
    document.getElementById('result-title').textContent='BLACKED OUT';
    document.getElementById('result-title').className='result-title result-lose';
    if(G.party[0])G.party[0].hp=Math.floor(G.party[0].maxHp*.5);
    document.getElementById('result-detail').textContent=
      G.party[0]?G.party[0].name+' was defeated...\nRestored to 50% HP. Lost 100 NC.':'Your team is down...';
    G.money=Math.max(0,(G.money||0)-100);
    document.getElementById('result-btn').onclick=afterBattle;
  }
  showScreen('result');
}
function showGym2VictoryScene(){
  currentDialogue=[
    {emoji:'👨‍🏭',speaker:'REX',text:'"...I haven\'t lost in four years. You broke my streak. I\'m not angry — I\'m impressed."'},
    {emoji:'⚙️',speaker:'NARRATOR',text:'You received the FORGE BADGE! It\'s cold and heavy in your palm — forged from pure steel.'},
    {emoji:'👨‍🏭',speaker:'REX',text:'"Listen. SYNTEK came to me last month — wanted to \'partner\' with the Gym. I said no. They didn\'t like that."'},
    {emoji:'👨‍🏭',speaker:'REX',text:'"Whatever they\'re building in that smelting plant — it\'s not Pokémon equipment. Be careful heading north."'},
    {emoji:'🚪',speaker:'NARRATOR',text:'You leave Ironhaven Gym with 2 badges. The road ahead grows darker. SYNTEK\'s shadow is everywhere.'},
  ];
  dialogueIndex=0;dialogueCallback=()=>{updateOWHeader();showScreen('overworld');drawMap();saveGame();};
  showScreen('intro');renderDialogue();
}

// ── EVOLUTION SYSTEM ──