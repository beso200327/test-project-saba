import * as T from 'three';import {crossSection} from './level-data';
export const PLAYER_RADIUS=.48;
export function createCollision(root:T.Group){root.updateMatrixWorld(true);const obstacles:{x:number,z:number,r:number}[]=[];root.traverse(n=>{if(n instanceof T.InstancedMesh&&['Trunks','Boundary stones'].includes(n.name)){const m=new T.Matrix4(),p=new T.Vector3(),q=new T.Quaternion(),s=new T.Vector3();for(let i=0;i<n.count;i++){n.getMatrixAt(i,m);m.premultiply(n.matrixWorld);m.decompose(p,q,s);obstacles.push({x:p.x,z:p.z,r:n.name==='Trunks'?.34:Math.max(s.x,s.z)})}}});const chest=root.getObjectByName('Treasure chest')!;const inverse=chest.matrixWorld.clone().invert();
 function valid(x:number,z:number){if(z>71-PLAYER_RADIUS||z< -71+PLAYER_RADIUS)return false;
 // Sample the player's perimeter rather than shrinking only horizontal sections.
 for(let i=0;i<16;i++){const a=i*Math.PI/8,px=x+Math.cos(a)*PLAYER_RADIUS,pz=z+Math.sin(a)*PLAYER_RADIUS,s=crossSection(pz);if(Math.abs(px-s.x)>=s.r||Math.abs(pz)>=71)return false}
 if(obstacles.some(o=>(x-o.x)**2+(z-o.z)**2<(o.r+PLAYER_RADIUS)**2))return false;const local=new T.Vector3(x,0,z).applyMatrix4(inverse);const dx=Math.max(Math.abs(local.x)-.94,0),dz=Math.max(Math.abs(local.z)-.69,0);return dx*dx+dz*dz>=PLAYER_RADIUS**2}
 function move(position:T.Vector3,dx:number,dz:number){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.08));dx/=steps;dz/=steps;for(let i=0;i<steps;i++){if(valid(position.x+dx,position.z+dz)){position.x+=dx;position.z+=dz;continue} // Tangent search provides sliding even on steep curved edges.
 const length=Math.hypot(dx,dz);let best=0,bx=0,bz=0;for(let j=0;j<32;j++){const a=j*Math.PI/16,x=Math.cos(a),z=Math.sin(a),projection=dx*x+dz*z;if(projection>best&&projection>length*.08&&valid(position.x+x*projection,position.z+z*projection)){best=projection;bx=x*projection;bz=z*projection}}position.x+=bx;position.z+=bz}}
 return{valid,move,obstacles};
}
