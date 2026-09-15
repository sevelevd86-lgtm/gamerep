const SPRITES={
  stand:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_stand.png',
  walk1:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_walk1.png',
  walk2:'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_platformercharacters/PNG/Player/Poses/player_walk2.png'
};
function load(src){const i=new Image();i.src=src;return i}
export class Player{
 constructor(x,y){this.x=x;this.y=y;this.w=42;this.h=70;this.vx=0;this.vy=0;this.speed=5;this.jump=-13;this.grounded=false;this.facing=1;this.hp=3;this.maxHp=3;this.music=100;this.inv=0;this.dash=0;this.attackCd=0;this.state='idle';this.animTime=0;this.sprite=Object.fromEntries(Object.entries(SPRITES).map(([k,v])=>[k,load(v)]))}
 update(dt,keys,world){
  const left=keys.a||keys.arrowleft,right=keys.d||keys.arrowright;
  if(left){this.vx-=.72;this.facing=-1} if(right){this.vx+=.72;this.facing=1}
  if(!left&&!right)this.vx*=.78;
  this.vx=Math.max(-this.speed,Math.min(this.speed,this.vx));
  if((keys.w||keys.space||keys.arrowup)&&this.grounded){this.vy=this.jump;this.grounded=false}
  if(keys.shift&&this.dash<=0){this.vx=this.facing*14;this.vy*=.25;this.dash=.5;this.inv=.22}
  this.dash-=dt;this.inv-=dt;this.attackCd-=dt;
  const prevBottom=this.y+this.h;
  this.vy+=.65;this.x+=this.vx;this.y+=this.vy;this.grounded=false;
  for(const p of world.platforms){
   if(this.x+this.w>p.x&&this.x<p.x+p.w&&prevBottom<=p.y+8&&this.y+this.h>=p.y&&this.vy>=0){this.y=p.y-this.h;this.vy=0;this.grounded=true}
  }
  if(this.x<0)this.x=0;if(this.x+this.w>world.width)this.x=world.width-this.w;
  const moving=Math.abs(this.vx)>.35;
  this.state=!this.grounded?(this.vy<0?'jump':'fall'):(moving?'walk':'idle');
  if(moving&&this.grounded)this.animTime+=dt*9;else this.animTime+=dt*3;
 }
 draw(ctx){
  ctx.save();ctx.translate(this.x+this.w/2,this.y+this.h);ctx.scale(this.facing,1);
  const bob=this.state==='walk'?Math.sin(this.animTime*1.8)*1.5:0;
  const img=this.state==='walk'?(Math.floor(this.animTime)%2?this.sprite.walk1:this.sprite.walk2):this.sprite.stand;
  if(img.complete&&img.naturalWidth){ctx.imageSmoothingEnabled=false;ctx.drawImage(img,-24,-66+bob,48,48)}
  else{ctx.fillStyle='#5de1ff';ctx.fillRect(-15,-52,30,42)}
  if(this.inv>0){ctx.globalAlpha=.45;ctx.strokeStyle='#5de1ff';ctx.lineWidth=3;ctx.strokeRect(-25,-70,50,70)}
  ctx.restore()
 }
}
