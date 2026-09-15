const ground=(width)=>({x:0,y:700,w:width,h:200});
export const LEVELS={
 home:{name:'ДОМ',width:1400,bg:'home',platforms:[ground(1400)],objects:[{x:350,y:700,type:'computer'},{x:1050,y:700,type:'exit',label:'ВЫХОД В ГОРОД',target:'city'}]},
 city:{name:'ГОРОД',width:3200,bg:'city',platforms:[ground(3200)],objects:[{x:500,y:700,type:'bench'},{x:920,y:700,type:'alley'},{x:1370,y:700,type:'shop'},{x:1750,y:700,type:'studio'},{x:2100,y:700,type:'friend'},{x:2850,y:700,type:'exit',label:'В ПОДВАЛ',target:'basement'},{x:80,y:700,type:'exit',label:'ДОМОЙ',target:'home'}]},
 basement:{name:'ПОДВАЛ',width:1800,bg:'basement',platforms:[ground(1800)],objects:[{x:1180,y:700,type:'computer'},{x:1660,y:700,type:'exit',label:'В ГОРОД',target:'city'}]},
 boss:{name:'BOSS ARENA',width:1600,bg:'arena',platforms:[ground(1600)],objects:[{x:1480,y:700,type:'exit',label:'ПОКИНУТЬ АРЕНУ',target:'city'}]}
};
export function drawBackground(ctx,level,w,h,camera){
 ctx.fillStyle=level.bg==='city'?'#10162b':level.bg==='basement'?'#111':level.bg==='home'?'#151321':'#241322';ctx.fillRect(0,0,w,h);
 ctx.save();ctx.translate(-camera,0);
 if(level.bg==='city'){
  for(let x=0;x<level.width;x+=180){let bh=100+((x*17)%240);ctx.fillStyle=x%360?'#151c31':'#1c2440';ctx.fillRect(x,700-bh,150,bh);for(let yy=720-bh;yy<680;yy+=35){ctx.fillStyle='#f6c75a55';ctx.fillRect(x+20,yy,12,15);ctx.fillRect(x+65,yy,12,15)}}
  for(let x=100;x<level.width;x+=360){ctx.strokeStyle='#f7dc72aa';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,700);ctx.lineTo(x,510);ctx.stroke();ctx.fillStyle='#ffe37a';ctx.beginPath();ctx.arc(x,505,10,0,7);ctx.fill()}
 }
 if(level.bg==='home'){ctx.fillStyle='#25233b';ctx.fillRect(0,0,level.width,700);ctx.fillStyle='#35314e';for(let x=0;x<level.width;x+=80)ctx.fillRect(x,100,2,600)}
 if(level.bg==='basement'){ctx.fillStyle='#252525';ctx.fillRect(0,0,level.width,700);for(let x=0;x<level.width;x+=100){ctx.fillStyle='#303030';ctx.fillRect(x,0,2,700)}}
 ctx.restore()
}
