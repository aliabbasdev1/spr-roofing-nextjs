import {SPR} from './siteDetails';

/** React-mounted conversion of the original home-page DOM interactions. */
export function mountHomeInteractions(){
  const $$ = <T extends Element = HTMLElement>(selector:string): T[] => [...document.querySelectorAll<T>(selector)];
  $$('[data-phone-text]').forEach(e=>e.textContent=SPR.phoneDisplay);
  $$('[data-email-text]').forEach(e=>e.textContent=SPR.email);
  $$<HTMLAnchorElement>('[data-tel]').forEach(e=>e.href='tel:'+SPR.phoneTel);
  $$<HTMLAnchorElement>('[data-mail]').forEach(e=>e.href='mailto:'+SPR.email);
  $$('[data-licence]').forEach(e=>e.textContent=SPR.licence);
  $$('[data-abn]').forEach(e=>e.textContent=SPR.abn);
  const yr=document.getElementById('yr');if(yr)yr.textContent=String(new Date().getFullYear());
  const burger=document.getElementById('burger');
  const toggleMenu=()=>document.body.classList.toggle('menu-open');
  burger?.addEventListener('click',toggleMenu);
  const closeMenu=()=>document.body.classList.remove('menu-open');
  const mobileLinks=$$<HTMLAnchorElement>('#mnav a');
  mobileLinks.forEach(a=>a.addEventListener('click',closeMenu));
  const header=document.getElementById('header');
  const onScroll=()=>header?.classList.toggle('solid',window.scrollY>60);
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  const form=document.getElementById('quoteForm') as HTMLFormElement|null;
  const onSubmit=(e:Event)=>{
    e.preventDefault();
    if(!form)return;
    const d=Object.fromEntries(new FormData(form)) as Record<string,FormDataEntryValue>;
    let ok=true;
    ['fName','fPhone','fSuburb'].forEach(id=>{
      const el=document.getElementById(id) as HTMLInputElement|null;
      if(!el)return;
      const bad=!el.value.trim();el.style.borderColor=bad?'#d4553f':'';if(bad)ok=false;
    });
    if(!ok)return;
    const msg=`Quote request - SPR Roofing Group\n\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email||'-'}\nSuburb: ${d.suburb}\nService: ${d.service}\n\nJob details:\n${d.message||'-'}`;
    const wa=document.getElementById('sendWa') as HTMLAnchorElement|null;
    const mail=document.getElementById('sendMail') as HTMLAnchorElement|null;
    if(wa)wa.href='https://wa.me/'+SPR.whatsapp+'?text='+encodeURIComponent(msg);
    if(mail)mail.href='mailto:'+SPR.email+'?subject='+encodeURIComponent('Quote request - '+d.suburb)+'&body='+encodeURIComponent(msg);
    document.getElementById('sent')?.classList.add('show');
  };
  form?.addEventListener('submit',onSubmit);

  let running=true, timeout: ReturnType<typeof setTimeout>|undefined;
  window.__ld={p:0,done:false};
  const tick=()=>{
    const L=window.__ld;if(!running||!L||L.done)return;
    L.p=Math.min(L.p+Math.random()*7,90);
    const bar=document.getElementById('ldBar');if(bar)bar.style.transform=`scaleX(${L.p/100})`;
    const pct=document.getElementById('ldPct');if(pct)pct.textContent=Math.round(L.p)+'%';
    timeout=setTimeout(tick,90);
  };tick();
  window.finishLoader=()=>{
    const L=window.__ld;if(!running||!L||L.done)return;
    L.done=true;
    const bar=document.getElementById('ldBar');if(bar)bar.style.transform='scaleX(1)';
    const pct=document.getElementById('ldPct');if(pct)pct.textContent='100%';
    const loader=document.getElementById('loader');
    timeout=setTimeout(()=>{
      if(!running)return;
      if(loader){loader.style.transition='opacity .8s, visibility .8s';loader.style.opacity='0';loader.style.visibility='hidden';}
      window.dispatchEvent(new Event('spr:ready'));
    },350);
  };
  const fallback=setTimeout(()=>{
    if(!window.__ld?.done){document.documentElement.classList.add('no-webgl');window.finishLoader?.();}
  },7000);
  return ()=>{
    running=false;if(timeout)clearTimeout(timeout);clearTimeout(fallback);
    document.body.classList.remove('menu-open');document.documentElement.classList.remove('no-webgl');
    burger?.removeEventListener('click',toggleMenu);
    mobileLinks.forEach(a=>a.removeEventListener('click',closeMenu));
    window.removeEventListener('scroll',onScroll);
    form?.removeEventListener('submit',onSubmit);
    window.finishLoader=undefined;
  };
}
