import React,{useEffect,useState,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {ShaderBackground} from './ShaderBackground';
import FoggedOpening from './FoggedOpening';
import {sections} from './sections';
import './style.css';
import SignaturePenFooter from './SignaturePenFooter';

const featureDetails:Record<string,string>={
 'Нэг ширээ':'Бүх оролцогч нэг ширээний ард нүүр тулан тоглоно.',
 'Тусгай студи':'Дулаан гэрэлтүүлэг, нэгдсэн тайз засал, тусдаа дуу бичлэг.',
 'Олон камер':'Ерөнхий кадр, дүрийн карт, тоглогчийн POV, хасагдсан хүний реакц.',
 'Сонирхолтой оролцогчид':'Цуврал бүр өөр салбарын танил хүмүүсийг нэгтгэнэ.'
};
function App(){
 const [slide,setSlide]=useState(()=>{
  const m=window.location.hash.match(/^#p(\d+)$/);return m?Math.max(1,Math.min(sections.length,Number(m[1]))):0;
 });
 const [feature,setFeature]=useState('Нэг ширээ');
 const touchX=useRef<number|null>(null);
 const go=(next:number)=>{
  const n=Math.max(0,Math.min(sections.length,next));setSlide(n);
  history.replaceState(null,'',n?'#p'+String(n).padStart(2,'0'):window.location.pathname);
 };
 useEffect(()=>{
  const onKey=(e:KeyboardEvent)=>{
   const t=e.target as HTMLElement;
   if(t?.closest('input,textarea,select,[contenteditable="true"]'))return;
   if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();go(slide+1)}
   if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(slide-1)}
   if(e.key==='Home'){e.preventDefault();go(0)}
   if(e.key==='End'){e.preventDefault();go(sections.length)}
  };
  const onHash=()=>{const m=location.hash.match(/^#p(\d+)$/);if(m)setSlide(Math.max(1,Math.min(sections.length,Number(m[1]))));else if(!location.hash)setSlide(0)};
  window.addEventListener('keydown',onKey);window.addEventListener('hashchange',onHash);
  return()=>{window.removeEventListener('keydown',onKey);window.removeEventListener('hashchange',onHash)};
 },[slide]);
 const handleClick=(e:React.MouseEvent<HTMLElement>)=>{
  const target=e.target as HTMLElement;
  const link=target.closest('a[href^="#p"]') as HTMLAnchorElement|null;
  if(link){e.preventDefault();const n=Number(link.getAttribute('href')?.slice(2));if(n)go(n);return}
  const btn=target.closest('[data-feature]') as HTMLElement|null;
  if(btn){setFeature(btn.dataset.feature||'Нэг ширээ')}
 };
 return <div className="presentation-shell" onClick={handleClick}>
  <nav className="deck-nav"><a className="brand" href="#p01">MAFIA<span>✳</span></a><div className="links"><a href="#p02">Санаа</a><a href="#p10">Дугаарууд</a><a href="#p09">Оролцогчид</a><a href="#p11">Модератор</a></div><a className="nav-cta" href="https://www.youtube.com/channel/UCROpmu3bahe8JtvZkUKtLPg" target="_blank" rel="noopener noreferrer">REFERENCES ↗</a></nav>
  <div className="deck-stage" onTouchStart={e=>{touchX.current=e.touches[0]?.clientX??null}} onTouchEnd={e=>{if(touchX.current===null)return;const dx=e.changedTouches[0].clientX-touchX.current;touchX.current=null;if(Math.abs(dx)>65)go(slide+(dx<0?1:-1))}}>
   {slide===0?<div className="deck-opening"><FoggedOpening/><button className="deck-enter" onClick={()=>go(1)}>Танилцуулгыг эхлүүлэх <span aria-hidden="true">→</span></button></div>:
   <main className="deck-main">
    <div key={slide} className={'section-wrap deck-slide '+(slide===1?'first':'')}>
     {([1,12,14].includes(slide))&&<div className="shader-layer"><ShaderBackground className="shader-canvas"/></div>}
     <div className="section-content" dangerouslySetInnerHTML={{__html:sections[slide-1]}}/>
     {slide===12&&<div className="deck-feature-panel" aria-live="polite">{featureDetails[feature]}</div>}
    </div>
   </main>}
  </div>
  <div className="deck-controls" aria-label="Танилцуулгын удирдлага">
   <button type="button" onClick={()=>go(slide-1)} disabled={slide===0} aria-label="Өмнөх хуудас">←</button>
   <span>{String(slide).padStart(2,'0')} / {String(sections.length).padStart(2,'0')}</span>
   <button type="button" onClick={()=>go(slide+1)} disabled={slide===sections.length} aria-label="Дараагийн хуудас">→</button>
  </div>
 </div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
