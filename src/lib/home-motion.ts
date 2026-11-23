// @ts-nocheck
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
export function mountHomeMotion(){
 const $$=s=>document.querySelectorAll(s);
 let active=true;
 let smooth;
 
const ready=()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){$$('.rv').forEach(e=>{e.style.opacity=1;e.style.transform='none'});$$('.step,#procCta').forEach(e=>e.classList.add('on'));return;}
  gsap.registerPlugin(ScrollTrigger);
  if(Lenis){
    const lenis=new Lenis({duration:1.15,smoothWheel:true});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a=>a.addEventListener('click',ev=>{const id=a.getAttribute('href');if(id.length>1){const t=document.querySelector(id);if(t){ev.preventDefault();lenis.scrollTo(t,{offset:-80});}}}));
  }
  ScrollTrigger.batch('.rv',{start:'top 90%',once:true,onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:1,stagger:.08,ease:'power3.out'})});
  gsap.to('#whyImg',{yPercent:-8,ease:'none',scrollTrigger:{trigger:'.why',start:'top bottom',end:'bottom top',scrub:true}});
  gsap.fromTo('#ctaImg',{scale:1.25},{scale:1,ease:'none',scrollTrigger:{trigger:'.cta',start:'top bottom',end:'bottom top',scrub:true}});
  /* signs horizontal scroll (desktop) */
  const sm=gsap.matchMedia();
  sm.add('all',()=>{
    const track=document.getElementById('signs');
    const dist=()=>Math.max(0,track.scrollWidth-innerWidth);
    const tw=gsap.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#signsSec',start:'top top',end:()=>'+='+dist(),pin:'.signs-pin',scrub:.8,invalidateOnRefresh:true,
      onUpdate:s=>{document.getElementById('signsBar').style.transform=`scaleX(${s.progress})`;document.getElementById('signsNow').textContent=String(Math.min(8,1+Math.floor(s.progress*8))).padStart(2,'0');}}});
    gsap.utils.toArray('#signs .bg').forEach(bg=>gsap.fromTo(bg,{xPercent:6},{xPercent:-6,ease:'none',scrollTrigger:{trigger:bg.parentElement,containerAnimation:tw,start:'left right',end:'right left',scrub:true}}));
    gsap.utils.toArray('#signs .sign').forEach(c=>gsap.from(c,{rotateY:-18,y:40,opacity:.35,transformPerspective:1000,ease:'none',scrollTrigger:{trigger:c,containerAnimation:tw,start:'left 105%',end:'left 70%',scrub:true}}));
  });

  /* process timeline */
  const stepEls=[...document.querySelectorAll('#steps .step')], cta=document.getElementById('procCta');
  const light=p=>{stepEls.forEach((el,i)=>el.classList.toggle('on',p>=(i/stepEls.length)+.02));cta.classList.toggle('on',p>.97);};
  const pm=gsap.matchMedia();
  pm.add('(min-width: 761px)',()=>{
    const tl=gsap.timeline({scrollTrigger:{trigger:'#process',start:'top top',end:'+=170%',pin:'.proc-pin',scrub:.8,onUpdate:s=>light(s.progress)}});
    tl.fromTo('#procFill',{scaleX:0},{scaleX:1,ease:'none',duration:1},0)
      .fromTo('#procSpark',{left:'0%',opacity:1},{left:'100%',opacity:1,ease:'none',duration:1},0)
      .to('#procSpark',{opacity:0,duration:.05},1);
  });
  pm.add('(max-width: 760px)',()=>{
    gsap.fromTo('#procFill',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:'#steps',start:'top 65%',end:'bottom 65%',scrub:.6,onUpdate:s=>light(s.progress)}});
  });
  requestAnimationFrame(()=>ScrollTrigger.refresh());
};
window.addEventListener('spr:ready',ready);
// if 3D never loads, still reveal content
setTimeout(()=>{ if(false){$$('.rv').forEach(e=>{e.style.opacity=1;e.style.transform='none'});$$('.step,#procCta').forEach(e=>e.classList.add('on'));} },7500);

 return ()=>{ active=false;window.removeEventListener('spr:ready',ready);gsap.killTweensOf('*');ScrollTrigger.getAll().forEach(t=>t.kill()); };
}
