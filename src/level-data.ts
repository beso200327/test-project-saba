export const palette={grass:0x8acb50,edge:0x598c3e,soil:0x866848,trunk:0x796044,leaves:[0x3f924c,0x52a750,0x66b651,0x79c35a],rock:0xa2b2a1};
// South (+Z) to north (-Z). Widths are usable half-widths, before decoration.
export const areas=[{name:'Starting area',z:64,x:0,r:8},{name:'First combat arena',z:44,x:-3,r:15},{name:'Winding forest corridor',z:23,x:4,r:6.6},{name:'Mini-boss arena',z:3,x:-5,r:16},{name:'Treasure area',z:-19,x:3,r:10},{name:'Connecting passage',z:-36,x:0,r:6.8},{name:'Final boss arena',z:-54,x:0,r:18}];
const controls=[[71,0,2],[66,0,7],[60,-1,8],[54,-3,12],[46,-3,15],[40,-3,14],[34,-1,10],[28,3,7],[22,5,6.6],[16,1,7],[11,-4,12],[4,-5,16],[-3,-5,15],[-10,-1,10],[-17,3,10],[-23,4,9],[-29,2,7],[-35,-1,6.8],[-40,-3,9],[-45,-2,15],[-53,0,18],[-60,0,17],[-66,0,12],[-71,0,2]];
function smooth(t:number){return t*t*(3-2*t)}
export function crossSection(z:number){for(let i=0;i<controls.length-1;i++){const a=controls[i],b=controls[i+1];if(z<=a[0]&&z>=b[0]){const t=smooth((a[0]-z)/(a[0]-b[0]));return {x:a[1]+(b[1]-a[1])*t,r:a[2]+(b[2]-a[2])*t}}}return {x:0,r:0}}
export function inside(x:number,z:number,margin=0){const s=crossSection(z);return Math.abs(x-s.x)<s.r+margin&&Math.abs(z)<71+margin}
export function random(seed=7241){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
