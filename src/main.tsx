import React, {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ShaderBackground} from './ShaderBackground';
import {sections} from './sections';
import './style.css';
import SignaturePenFooter from './SignaturePenFooter';
function App(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{const onScroll=()=>{const d=document.documentElement;setProgress((d.scrollTop/(d.scrollHeight-innerHeight||1))*100)};window.addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>window.removeEventListener('scroll',onScroll)},[]);
 return <><div className="progress" style={{width:`${progress}%`}}/><nav><a className="brand" href="#top">MAFIA<span>✳</span></a><div className="links"><a href="#concept">Concept</a><a href="#series">Series</a><a href="#casting">Casting</a><a href="#sponsors">Sponsors</a></div><a className="nav-cta" href="#next">LET'S TALK ↗</a></nav><main>{sections.map((section:string,i:number)=> <div key={i} className={'section-wrap '+(i===0?'first':'')}>
 {(i===0||i===6||i===11)&&<div className="shader-layer"><ShaderBackground className="shader-canvas"/></div>}
 <div className="section-content" dangerouslySetInnerHTML={{__html:section}}/>
 </div>)}</main><SignaturePenFooter word="Thank you" title="Ready to play?" description="One table. Ten players. A thousand possibilities. Let's bring MAFIA to Mongolia." brand="MAFIA · CONCEPT PITCH" links={[{label:'Back to top',href:'#top'},{label:'Casting',href:'#casting'},{label:'Sponsors',href:'#sponsors'}]} actions={[{label:'Explore the concept',href:'#concept',variant:'secondary'},{label:'Back to top',href:'#top',variant:'primary'}]} legal="2026 · Working concept · All partnerships subject to agreement" stamp="" trigger="view" theme="light" background="#faf8ef" foreground="#1e2432" accent="#628df2" inkFrom="#83b0ff" inkTo="#3468dc" height="min(85svh, 760px)" /></>
}
createRoot(document.getElementById('root')!).render(<App/>);
