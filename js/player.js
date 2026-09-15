// GAMEReP player: CC0 Kenney pixel character.
// Source: https://kenney.nl/assets/simplified-platformer-pack
const CHARACTER_ASSETS={
  robot:{name:'REP-01',idle:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_idle.png',walk1:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_walk1.png',walk2:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_walk2.png',jump:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_jump.png'},
  neon:{name:'NEON',idle:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_stand.png',walk1:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_walk1.png',walk2:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_walk2.png',jump:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_jump.png'},
  pixel:{name:'PIXEL',idle:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_idle.png',walk1:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_walk1.png',walk2:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_walk2.png',jump:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_simplifiedplatformer/PNG/Characters/platformChar_jump.png'},
  classic:{name:'CLASSIC',idle:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_stand.png',walk1:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_walk1.png',walk2:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_walk2.png',jump:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_jump.png'}
};
export const CHARACTER_LIST=CHARACTER_ASSETS;
function load(src){const i=new Image();i.decoding='async';i.src=src;return i}
export class Player{
 constructor(x,y,character='robot'){
  this.x=x;this.y=y;this.w=46;this.h=72;this.vx=0;this.vy=0;this.speed=5.3;this.jump=-13.5;this.grounded=false;this.facing=1;this.hp=3;this.maxHp=3;this.music=100;this.inv=0;this.dash=0;this.attackCd=0;this.state='idle';this.animTime=0;this.setCharacter(character)
 }
 setCharacter(id){this.character=id;const a=CHARACTER_ASSETS[id]||CHARACTER_ASSETS.robot;this.sprite={idle:load(a.idle),walk1:load(a.walk1),walk2:load(a.walk2),jump:load(a.jump)};this.filter=id==='neon'?'hue-rotate(90deg) saturate(1.35)':id==='pixel'?'hue-rotate(210deg) saturate(1.3)':id==='classic'?'sepia(.25) saturate(1.15)':'none'}
 update(dt,keys,world){
  const left=!!(keys.a||keys.arrowleft),right=!!(keys.d||keys.arrowright);
  if(left){this.vx-=.8;this.facing=-1} if(right){this.vx+=.8;this.facing=1}
  if(!left&&!right)this.vx*=Math.pow(.18,dt);
  this.vx=Math.max(-this.speed,Math.min(this.speed,this.vx));
  if((keys.w||keys.space||keys.arrowup)&&this.grounded){this.vy=this.jump;this.grounded=false}
  if(keys.shift&&this.dash<=0){this.vx=this.facing*14;this.vy*=.25;this.dash=.55;this.inv=.22}
  this.dash-=dt;this.inv-=dt;this.attackCd-=dt;
  const prevBottom=this.y+this.h;this.vy+=.65;this.x+=this.vx;this.y+=this.vy;this.grounded=false;
  for(const p of world.platforms){if(this.x+this.w>p.x&&this.x<p.x+p.w&&prevBottom<=p.y+8&&this.y+this.h>=p.y&&this.vy>=0){this.y=p.y-this.h;this.vy=0;this.grounded=true}}
  if(this.x<0)this.x=0;if(this.x+this.w>world.width)this.x=world.width-this.w;
  const moving=Math.abs(this.vx)>.25;this.state=!this.grounded?(this.vy<0?'jump':'fall'):(moving?'walk':'idle');
  if(moving&&this.grounded)this.animTime+=dt*10;else this.animTime+=dt*3;
 }
 draw(ctx){ctx.save();ctx.translate(this.x+this.w/2,this.y+this.h);ctx.scale(this.facing,1);ctx.imageSmoothingEnabled=false;ctx.filter=this.filter;const img=this.state==='jump'||this.state==='fall'?this.sprite.jump:this.state==='walk'?(Math.floor(this.animTime)%2?this.sprite.walk1:this.sprite.walk2):this.sprite.idle;if(img.complete&&img.naturalWidth){ctx.drawImage(img,-32,-68,64,64)}else{ctx.fillStyle='#5de1ff';ctx.fillRect(-18,-58,36,52)}ctx.filter='none';if(this.inv>0){ctx.globalAlpha=.4;ctx.strokeStyle='#5de1ff';ctx.lineWidth=3;ctx.strokeRect(-28,-72,56,72)}ctx.restore()}
}
