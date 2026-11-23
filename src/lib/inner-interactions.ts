// @ts-nocheck
import {mountContactLinks, configureQuoteLinks} from './contact-links';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
/** Original inner-page UI and motion, mounted after React renders. */
export function mountInnerInteractions(){
/* =========================================================
   SPR Roofing Group – shared site script (inner pages)
   ========================================================= */

const $$ = s => document.querySelectorAll(s);

/* ---------- contact details ---------- */
mountContactLinks();

/* ---------- header + mobile menu ---------- */
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('solid', scrollY > 60), { passive: true });
document.getElementById('burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
$$('#mnav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

/* ---------- quote forms -> WhatsApp / Email ---------- */
$$('.quoteForm').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f)); let ok = true;
  f.querySelectorAll('[data-req]').forEach(el => { const bad = !el.value.trim(); el.style.borderColor = bad ? '#d4553f' : ''; if (bad) ok = false; });
  if (!ok) return;
  const msg = `Quote request - SPR Roofing Group\n\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || '-'}\nSuburb: ${d.suburb}\nService: ${d.service}\n\nJob details:\n${d.message || '-'}`;
  configureQuoteLinks(f.querySelector('.sendWa'), f.querySelector('.sendMail'), msg, String(d.suburb || ''));
  f.querySelector('.sent').classList.add('show');
}));

/* ---------- FAQ accordion ---------- */
$$('.faq-item').forEach(it => it.querySelector('.faq-q').addEventListener('click', () => {
  const open = !it.classList.contains('open');
  it.parentElement.querySelectorAll('.faq-item').forEach(x => { x.classList.remove('open'); x.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
  if (open) { it.classList.add('open'); it.querySelector('.faq-q').setAttribute('aria-expanded', 'true'); }
}));
const firstFaq = document.querySelector('.faq-item'); if (firstFaq) { firstFaq.classList.add('open'); firstFaq.querySelector('.faq-q').setAttribute('aria-expanded', 'true'); }

/* ---------- motion ---------- */
function showAll() {
  $$('.rv').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
  $$('.step').forEach(e => e.classList.add('on'));
  $$('.ph-line').forEach(e => e.style.transform = 'scaleX(1)');
}
function motion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { showAll(); return; }
  gsap.registerPlugin(ScrollTrigger);

  if (Lenis) {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', ev => {
      const id = a.getAttribute('href'); if (id.length > 1) { const t = document.querySelector(id); if (t) { ev.preventDefault(); lenis.scrollTo(t, { offset: -80 }); } }
    }));
  }

  /* hero: split title into words, cinematic entrance */
  const title = document.querySelector('.ph-title');
  if (title) {
    const wrap = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3 && n.textContent.trim()) {
          const t = n.textContent, f = document.createElement('span');
          f.innerHTML = (/^\s/.test(t) ? ' ' : '') + t.trim().split(/\s+/).map(w => `<span class="w"><span>${w}</span></span>`).join(' ') + (/\s$/.test(t) ? ' ' : '');
          n.replaceWith(f);
        } else if (n.nodeType === 1 && n.classList.contains('gold')) {
          const f = document.createElement('span');
          f.innerHTML = n.textContent.trim().split(/\s+/).map(w => `<span class="w"><span class="gold">${w}</span></span>`).join(' ');
          n.replaceWith(f);
        } else if (n.nodeType === 1 && !n.classList.contains('w')) wrap(n);
      });
    };
    wrap(title);
    const tl = gsap.timeline({ delay: .1 });
    tl.from('.ph-bg img', { scale: 1.35, duration: 2.2, ease: 'power3.out' })
      .from('.ph-title .w>span', { yPercent: 115, rotateX: -50, duration: 1, stagger: .05, ease: 'power4.out' }, .15)
      .from(['.crumbs', '.page-hero .kicker', '.ph-lead', '.ph-ctas', '.chips span'], { opacity: 0, y: 24, duration: .8, stagger: .07, ease: 'power3.out' }, .45)
      .to('.ph-line', { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, .6);
    gsap.to('.ph-bg', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.ph-in', { y: -80, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* reveals */
  ScrollTrigger.batch('.rv', { start: 'top 90%', once: true, onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1, stagger: .08, ease: 'power3.out' }) });

  /* 3D entrance for card grids */
  ScrollTrigger.batch('.inc, .val, .area, .cc', { start: 'top 92%', once: true, onEnter: b => gsap.fromTo(b, { rotateX: -35, transformPerspective: 900, transformOrigin: '50% 100%' }, { rotateX: 0, duration: 1.1, stagger: .08, ease: 'power3.out' }) });

  /* process timeline (scroll-scrubbed) */
  $$('.tl-lite').forEach(tlEl => {
    const steps = [...tlEl.querySelectorAll('.step')], fill = tlEl.querySelector('.fill');
    const light = p => steps.forEach((el, i) => el.classList.toggle('on', p >= (i / steps.length) + .02));
    const mm = gsap.matchMedia();
    mm.add('(min-width: 761px)', () => gsap.fromTo(fill, { scaleX: 0, scaleY: 1 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: tlEl, start: 'top 75%', end: 'bottom 45%', scrub: .6, onUpdate: s => light(s.progress) } }));
    mm.add('(max-width: 760px)', () => gsap.fromTo(fill, { scaleY: 0, scaleX: 1 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tlEl, start: 'top 65%', end: 'bottom 65%', scrub: .6, onUpdate: s => light(s.progress) } }));
  });

  /* image parallax */
  $$('.cta-img').forEach(img => gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('.about-media img').forEach(img => gsap.to(img, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
motion();
setTimeout(() => { if (false) showAll(); }, 6000);

return ()=>{document.body.classList.remove('menu-open');ScrollTrigger.getAll().forEach(t=>t.kill());};
}
