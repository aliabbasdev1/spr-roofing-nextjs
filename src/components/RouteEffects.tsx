"use client";
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

/** Mount the original interactive behaviors on the corresponding React route. */
export default function RouteEffects(){
  const pathname=usePathname();
  useEffect(()=>{
    let disposed=false;
    let cleanup:Array<()=>void>=[];
    const run=async()=>{
      if(pathname==='/' || pathname===''){
        const [ui,motion,scene]=await Promise.all([
          import('@/lib/home-interactions'),
          import('@/lib/home-motion'),
          import('@/lib/home-scene')
        ]);
        if(disposed)return;
        cleanup=[ui.mountHomeInteractions(),motion.mountHomeMotion(),scene.mountHomeScene()];
      }else{
        const {mountInnerInteractions}=await import('@/lib/inner-interactions');
        if(disposed)return;
        cleanup=[mountInnerInteractions()];
      }
    };
    void run().catch(e=>{
      console.error('SPR animation initialization:',e);
      if(pathname==='/' || pathname===''){
        document.documentElement.classList.add('no-webgl');
        window.finishLoader?.();
        document.querySelectorAll<HTMLElement>('.rv').forEach(el=>{el.style.opacity='1';el.style.transform='none';});
      }else{
        document.querySelectorAll<HTMLElement>('.rv').forEach(el=>{el.style.opacity='1';el.style.transform='none';});
      }
    });
    return ()=>{disposed=true;cleanup.forEach(fn=>{try{fn();}catch{}});};
  },[pathname]);
  return null;
}
