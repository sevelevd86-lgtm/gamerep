const ground=(width)=>({x:0,y:700,w:width,h:200});
export const LEVELS={
 home:{name:'ДОМ',width:1500,bg:'home',platforms:[ground(1500)],objects:[{x:350,y:700,type:'computer'},{x:760,y:700,type:'mic'},{x:1320,y:700,type:'exit',label:'В ГОРОД',target:'city'}]},
 city:{name:'ГОРОД',width:3400,bg:'city',platforms:[ground(3400)],objects:[{x:480,y:700,type:'bench'},{x:920,y:700,type:'alley'},{x:1370,y:700,type:'shop'},{x:1740,y:700,type:'studio'},{x:2110,y:700,type:'friend'},{x:2750,y:700,type:'pvz',label:'REP ПВЗ',target:'pvz'},{x:80,y:700,type:'exit',label:'ДОМОЙ',target:'home'}]},
 pvz:{name:'REP ПВЗ',width:1900,bg:'pvz',platforms:[ground(1900)],objects:[{x:420,y:700,type:'computer'},{x:950,y:700,type:'counter'},{x:1700,y:700,type:'exit',label:'В ГОРОД',target:'city'}]},
 basement:{name:'REP ПВЗ',width:1900,bg:'pvz',platforms:[ground(1900)],objects:[{x:420,y:700,type:'computer'},{x:950,y:700,type:'counter'},{x:1700,y:700,type:'exit',label:'В ГОРОД',target:'city'}]},
 boss:{name:'BOSS ARENA',width:1600,bg:'arena',platforms:[ground(1600)],objects:[{x:1480,y:700,type:'exit',label:'ПОКИНУТЬ АРЕНУ',target:'city'}]}
};
export function drawBackground(ctx,level,w,h,camera){
 ctx.fillStyle=level.bg==='city'?'#10162b':level.bg==='pvz'?'#10151f':level.bg==='home'?'#151321':level.bg==='arena'?'#241322':'#111';ctx.fillRect(0,0,w,h);ctx.save();ctx.translate(-camera,0);
 if(level.bg==='city'){for(let x=0;x<level.width;x+=180){const bh=100+((x*17)%240);ctx.fillStyle=x%360?'#151c31':'#1c2440';ctx.fillRect(x,700-bh,150,bh);for(let yy=720-bh;yy<680;yy+=35){ctx.fillStyle='#f6c75a55';ctx.fillRect(x+20,yy,12,15);ctx.fillRect(x+65,yy,12,15)}}for(let x=100;x<level.width;x+=360){ctx.strokeStyle='#f7dc72aa';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,700);ctx.lineTo(x,510);ctx.stroke();ctx.fillStyle='#ffe37a';ctx.beginPath();ctx.arc(x,505,10,0,7);ctx.fill()}}
 if(level.bg==='home'){ctx.fillStyle='#25233b';ctx.fillRect(0,0,level.width,700);ctx.fillStyle='#35314e';for(let x=0;x<level.width;x+=80)ctx.fillRect(x,100,2,600);ctx.fillStyle='#403954';ctx.fillRect(0,600,level.width,100)}
 if(level.bg==='pvz'){ctx.fillStyle='#182332';ctx.fillRect(0,0,level.width,700);for(let x=0;x<level.width;x+=48){ctx.fillStyle=x%96?'#243246':'#2b3a50';ctx.fillRect(x,0,2,700)}ctx.fillStyle='#0c1119';ctx.fillRect(0,570,level.width,130);for(let x=0;x<level.width;x+=140){ctx.fillStyle='#27374d';ctx.fillRect(x,100,110,28);ctx.fillStyle='#41d1a5';ctx.fillRect(x+8,108,94,8)}}
 if(level.bg==='arena'){ctx.fillStyle='#351a2d';ctx.fillRect(0,0,level.width,700);ctx.fillStyle='#5a2845';for(let x=0;x<level.width;x+=100)ctx.fillRect(x,610,70,90)}
 ctx.restore()
}
