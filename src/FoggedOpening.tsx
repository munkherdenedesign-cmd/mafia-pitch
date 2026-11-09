import React,{useEffect,useRef} from 'react';

/** Fogged-glass opening, adapted for this Vite site from the supplied interaction reference. */
export default function FoggedOpening(){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  const ctx=el.getContext('2d');if(!ctx)return;
  const img=new Image();img.crossOrigin='anonymous';
  img.onerror=()=>{img.onerror=null;img.src='https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=85'};
  img.src='/images/studio-empty.jpg';
  let w=0,h=0,dpr=1,raf=0,down=false,radius=65,lastX=0,lastY=0;
  const strokes:{x:number;y:number;r:number;t:number}[]=[];
  const drops=Array.from({length:75},()=>({x:Math.random(),y:Math.random(),r:1+Math.random()*3,v:0.00003+Math.random()*0.00015}));
  const resize=()=>{const rect=el.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=rect.width;h=rect.height;el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)};
  const paint=(time:number)=>{
   if(!w||!h){raf=requestAnimationFrame(paint);return}
   ctx.clearRect(0,0,w,h);
   if(img.complete&&img.naturalWidth){
    const scale=Math.max(w/img.width,h/img.height),sw=img.width*scale,sh=img.height*scale,ox=(w-sw)/2,oy=(h-sh)/2;
    ctx.save();ctx.filter='blur(22px) brightness(.55) saturate(.75)';ctx.drawImage(img,ox-24,oy-24,sw+48,sh+48);ctx.restore();
    ctx.fillStyle='rgba(204,217,226,.43)';ctx.fillRect(0,0,w,h);
    ctx.save();ctx.beginPath();
    for(const s of strokes){const a=Math.max(0,1-(time-s.t)/17000);if(a<=0)continue;ctx.moveTo(s.x+s.r*a,s.y);ctx.arc(s.x,s.y,s.r*a,0,Math.PI*2)}
    ctx.clip();ctx.drawImage(img,ox,oy,sw,sh);ctx.restore();
   }else{const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#24334b');g.addColorStop(1,'#7a91a8');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
   ctx.fillStyle='rgba(238,247,255,.28)';
   for(const d of drops){d.y+=d.v*16;if(d.y>1)d.y=0;ctx.beginPath();ctx.ellipse(d.x*w,d.y*h,d.r,d.r*1.6,0,0,Math.PI*2);ctx.fill()}
   for(let i=strokes.length-1;i>=0;i--){if(time-strokes[i].t>17000)strokes.splice(i,1)}
   raf=requestAnimationFrame(paint);
  };
  const pos=(e:PointerEvent)=>{const b=el.getBoundingClientRect();return{x:e.clientX-b.left,y:e.clientY-b.top}};
  const wipe=(e:PointerEvent)=>{const p=pos(e);if(down){const dx=p.x-lastX,dy=p.y-lastY,dist=Math.hypot(dx,dy),n=Math.max(1,Math.ceil(dist/Math.max(8,radius/3)));for(let i=1;i<=n;i++)strokes.push({x:lastX+dx*i/n,y:lastY+dy*i/n,r:radius,t:performance.now()});}lastX=p.x;lastY=p.y};
  const onDown=(e:PointerEvent)=>{down=true;el.setPointerCapture(e.pointerId);const p=pos(e);lastX=p.x;lastY=p.y;strokes.push({...p,r:radius,t:performance.now()})};
  const onUp=()=>{down=false};
  let transitioned=false;
  const wheel=(e:WheelEvent)=>{if(e.ctrlKey||e.deltaY<=0||transitioned)return;transitioned=true;e.preventDefault();document.getElementById('p01')?.scrollIntoView({behavior:'smooth',block:'start'});};
  const key=(e:KeyboardEvent)=>{if((e.key==='ArrowDown'||e.key==='PageDown'||e.key===' ')&&!transitioned&&window.scrollY<80){transitioned=true;document.getElementById('p01')?.scrollIntoView({behavior:'smooth'});}if(e.key==='[')radius=Math.max(14,radius-8);if(e.key===']')radius=Math.min(180,radius+8)};
  resize();const observer=new ResizeObserver(resize);observer.observe(el);raf=requestAnimationFrame(paint);
  el.addEventListener('pointerdown',onDown);el.addEventListener('pointermove',wipe);el.addEventListener('pointerup',onUp);el.addEventListener('pointercancel',onUp);el.addEventListener('wheel',wheel,{passive:false});window.addEventListener('keydown',key);

  return()=>{cancelAnimationFrame(raf);observer.disconnect();el.removeEventListener('pointerdown',onDown);el.removeEventListener('pointermove',wipe);el.removeEventListener('pointerup',onUp);el.removeEventListener('pointercancel',onUp);el.removeEventListener('wheel',wheel);window.removeEventListener('keydown',key)};
 },[]);
 return <section className="fog-opening" id="top" aria-label="Interactive fogged glass opening">
  <canvas ref={canvas} className="fog-canvas" aria-label="Drag to wipe fog from the glass"/>

 </section>;
}