import {Vector2} from 'three';
export function createInput(joystick:HTMLElement){const keys=new Set<string>();const touch=new Vector2();let active=false,pointer:number|null=null;const knob=joystick.querySelector<HTMLElement>('span')!;
 const typing=()=>{const el=document.activeElement as HTMLElement|null;return !!el&&(el.matches('input,textarea,select')||el.isContentEditable)};
 function clear(){keys.clear();touch.set(0,0);pointer=null;knob.style.transform='translate(0px,0px)'}
 window.addEventListener('keydown',e=>{if(active&&!typing()&&['KeyW','KeyA','KeyS','KeyD'].includes(e.code)){keys.add(e.code);e.preventDefault()}});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)clear()});document.addEventListener('focusin',()=>{if(typing())clear()});
 function move(e:PointerEvent){if(e.pointerId!==pointer)return;const b=joystick.getBoundingClientRect();touch.set((e.clientX-b.x-b.width/2)/38,(e.clientY-b.y-b.height/2)/38).clampLength(0,1);knob.style.transform=`translate(${touch.x*38}px,${touch.y*38}px)`;e.preventDefault()}
 joystick.addEventListener('pointerdown',e=>{if(!active||pointer!==null)return;pointer=e.pointerId;joystick.setPointerCapture(pointer);move(e)});joystick.addEventListener('pointermove',move);for(const type of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(type,clear);
 return{clear,setActive(value:boolean){active=value;clear();joystick.classList.toggle('enabled',value)},read(){if(!active||typing())return new Vector2();const v=new Vector2(Number(keys.has('KeyD'))-Number(keys.has('KeyA')),Number(keys.has('KeyS'))-Number(keys.has('KeyW'))).add(touch);return v.clampLength(0,1)}};
}
