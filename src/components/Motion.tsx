'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window { __sprReady?: boolean; __sprInteracted?: boolean }
}

/**
 * Run `fn` on the visitor's first interaction (scroll, wheel, touch, key, pointer).
 * Scroll effects are only visible once someone scrolls, so the animation
 * libraries never compete with the first paint. Returns a cancel function.
 */
const INTERACTION_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
function onFirstInteraction(fn: () => void) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cancel();
    fn();
  };
  const cancel = () => INTERACTION_EVENTS.forEach(e => window.removeEventListener(e, run));
  INTERACTION_EVENTS.forEach(e => window.addEventListener(e, run, { passive: true, once: true }));
  // Already scrolled (back/forward cache, #anchor links, client-side navigation)
  if (window.scrollY > 0 || window.__sprInteracted) run();
  return cancel;
}

/* ---------- scroll reveals (no library) ---------- */
function setupReveals() {
  const els = [...document.querySelectorAll<HTMLElement>('.rv:not(.in)')];
  const finish = (el: HTMLElement) => {
    el.classList.remove('rv', 'in');
    el.style.removeProperty('--d');
  };
  if (!('IntersectionObserver' in window)) {
    els.forEach(finish);
    return () => {};
  }
  const io = new IntersectionObserver(
    entries => {
      const visible = entries.filter(e => e.isIntersecting).map(e => e.target as HTMLElement);
      visible.forEach((el, i) => {
        io.unobserve(el);
        const delay = Math.min(i, 6) * 0.08;
        el.style.setProperty('--d', `${delay}s`);
        el.classList.add('in');
        // hand the element back to its own hover/transition styles once revealed
        window.setTimeout(() => finish(el), 1100 + delay * 1000);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  els.forEach(el => io.observe(el));
  return () => io.disconnect();
}

/* ---------- signs carousel: native swipe + buttons + counter ---------- */
function setupSignsCarousel() {
  const wrap = document.querySelector<HTMLElement>('.signs-wrap');
  if (!wrap) return () => {};
  const sec = wrap.closest('.signs-sec');
  const bar = document.getElementById('signsBar');
  const now = document.getElementById('signsNow');
  const total = Number(wrap.dataset.total || 8);
  const update = () => {
    if (wrap.classList.contains('pinned')) return;
    const max = wrap.scrollWidth - wrap.clientWidth;
    const p = max > 0 ? wrap.scrollLeft / max : 0;
    if (bar) bar.style.transform = `scaleX(${p})`;
    if (now) now.textContent = String(Math.min(total, 1 + Math.floor(p * total * 0.999))).padStart(2, '0');
  };
  const step = (dir: number) => {
    const card = wrap.querySelector<HTMLElement>('.sign');
    wrap.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 22), behavior: 'smooth' });
  };
  const prev = sec?.querySelector<HTMLButtonElement>('.signs-btns .prev');
  const next = sec?.querySelector<HTMLButtonElement>('.signs-btns .next');
  const onPrev = () => step(-1);
  const onNext = () => step(1);
  wrap.addEventListener('scroll', update, { passive: true });
  prev?.addEventListener('click', onPrev);
  next?.addEventListener('click', onNext);
  update();
  return () => {
    wrap.removeEventListener('scroll', update);
    prev?.removeEventListener('click', onPrev);
    next?.removeEventListener('click', onNext);
  };
}

/* ---------- GSAP + Lenis (loaded lazily, skipped for reduced motion) ---------- */
async function setupScrollMotion(isActive: () => boolean) {
  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]);
  if (!isActive()) return () => {};
  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -96 } });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  const onMenu = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
  window.addEventListener('spr:menu', onMenu);

  const ctx = gsap.context(() => {
    const scrub = (trigger: string | Element, start = 'top top', end = 'bottom top') => ({ trigger, start, end, scrub: true });

    // Hero parallax
    if (document.querySelector('.page-hero')) {
      gsap.to('.ph-bg', { yPercent: 14, ease: 'none', scrollTrigger: scrub('.page-hero') });
      gsap.to('.ph-in', { y: -80, opacity: 0.2, ease: 'none', scrollTrigger: scrub('.page-hero') });
    }
    if (document.querySelector('.hp-hero')) {
      gsap.to('.hp-img-in', { yPercent: 10, ease: 'none', scrollTrigger: scrub('.hp-hero') });
    }
    // Image parallax
    gsap.utils.toArray<HTMLElement>('#whyImg, .about-media img').forEach(img =>
      gsap.to(img, { yPercent: -8, ease: 'none', scrollTrigger: scrub(img.parentElement!, 'top bottom', 'bottom top') }),
    );
    gsap.utils.toArray<HTMLElement>('.cta-img').forEach(img =>
      gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: scrub(img.parentElement!, 'top bottom', 'bottom top') }),
    );

    // Process timelines: scroll-scrubbed fill, steps light up in turn
    gsap.utils.toArray<HTMLElement>('.tl-lite').forEach(tl => {
      const steps = [...tl.querySelectorAll<HTMLElement>('.step')];
      const fill = tl.querySelector<HTMLElement>('.fill');
      const light = (p: number) => steps.forEach((el, i) => el.classList.toggle('on', p >= i / steps.length + 0.02));
      light(0);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 761px)', () => {
        gsap.fromTo(fill, { scaleX: 0, scaleY: 1 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 75%', end: 'bottom 45%', scrub: 0.6, onUpdate: s => light(s.progress) } });
      });
      mm.add('(max-width: 760px)', () => {
        gsap.fromTo(fill, { scaleY: 0, scaleX: 1 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 65%', end: 'bottom 65%', scrub: 0.6, onUpdate: s => light(s.progress) } });
      });
    });

    // Home "signs": pinned horizontal scroll on desktop
    const track = document.getElementById('signs');
    const wrap = document.querySelector<HTMLElement>('.signs-wrap');
    const sec = document.getElementById('signsSec');
    if (track && wrap && sec) {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 761px)', () => {
        wrap.scrollLeft = 0;
        wrap.classList.add('pinned');
        sec.classList.add('is-pinned');
        const bar = document.getElementById('signsBar');
        const now = document.getElementById('signsNow');
        const total = Number(wrap.dataset.total || 8);
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tw = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: sec, start: 'top top', end: () => `+=${dist()}`, pin: '.signs-pin', scrub: 0.8, invalidateOnRefresh: true,
            onUpdate: s => {
              if (bar) bar.style.transform = `scaleX(${s.progress})`;
              if (now) now.textContent = String(Math.min(total, 1 + Math.floor(s.progress * total))).padStart(2, '0');
            },
          },
        });
        gsap.utils.toArray<HTMLElement>('#signs .bg').forEach(bg =>
          gsap.fromTo(bg, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: bg.parentElement!, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } }),
        );
        return () => {
          wrap.classList.remove('pinned');
          sec.classList.remove('is-pinned');
        };
      });
    }
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);

  return () => {
    window.removeEventListener('load', onLoad);
    window.removeEventListener('spr:menu', onMenu);
    ctx.revert();
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}

/** Mounts page motion for every route (re-runs on client-side navigation). */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    window.__sprReady = true;
    document.documentElement.classList.add('js');
    let active = true;
    const cleanups: Array<() => void> = [setupReveals(), setupSignsCarousel()];

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      cleanups.push(
        onFirstInteraction(() => {
          window.__sprInteracted = true; // later client-side navigations start motion immediately
          if (!active) return;
          setupScrollMotion(() => active)
            .then(fn => (active ? cleanups.push(fn) : fn()))
            .catch(err => console.warn('Motion unavailable:', err));
        }),
      );
    }
    return () => {
      active = false;
      cleanups.forEach(fn => fn());
    };
  }, [pathname]);

  return null;
}
