import React, {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ShaderBackground} from './ShaderBackground';
import {sections} from './sections';
import './style.css';
import SignaturePenFooter from './SignaturePenFooter';
function App(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{const onScroll=()=>{const d=document.documentElement;setProgress((d.scrollTop/(d.scrollHeight-innerHeight||1))*100)};window.addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>window.removeEventListener('scroll',onScroll)},[]);
 return <><div className="progress" style={{width:`${progress}%`}}/><nav><a className="brand" href="#top">MAFIA<span>✳</span></a><div className="links"><a href="#p02">Санаа</a><a href="#p11">Дугаарууд</a><a href="#p10">Оролцогчид</a><a href="#p17">Хамтрах</a></div><a className="nav-cta" href="#p17">ХАМТРАХ ↗</a></nav><main>{sections.map((section:string,i:number)=> <div key={i} className={'section-wrap '+(i===0?'first':'')}>
 {(i===0)&&<div className="shader-layer"><ShaderBackground className="shader-canvas"/></div>}
 <div className="section-content" dangerouslySetInnerHTML={{__html:section}}/>
 </div>)}</main><SignaturePenFooter word="Баярлалаа" title="Хамтдаа хийе." description="Эхний дугаарыг хамтран бүтээх саналтай байна." brand="MAFIA · ТӨСЛИЙН ТАНИЛЦУУЛГА" links={[{label:'Эхлэл рүү',href:'#top'},{label:'Оролцогчид',href:'#casting'},{label:'Хамтын ажиллагаа',href:'#sponsors'}]} actions={[{label:'Санааг үзэх',href:'#concept',variant:'secondary'},{label:'Эхлэл рүү',href:'#top',variant:'primary'}]} legal="2026 · Төслийн эхний танилцуулга" stamp="" trigger="view" theme="light" background="#faf8ef" foreground="#1e2432" accent="#628df2" inkFrom="#83b0ff" inkTo="#3468dc" height="min(85svh, 760px)" /></>
}
createRoot(document.getElementById('root')!).render(<App/>);
