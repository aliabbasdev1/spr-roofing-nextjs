'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logo } from '@/lib/images';
import { site, telHref } from '@/lib/site';
import Icon from './Icon';

const isCurrent = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href);

export type NavLink = { slug: string; name: string; menuName: string };

export default function Header({ services }: { services: NavLink[] }) {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // Solid/compact header after scrolling
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll + Escape to close while the menu is open
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    window.dispatchEvent(new CustomEvent('spr:menu', { detail: open }));
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const cls = (href: string) => (isCurrent(pathname, href) ? 'cur' : undefined);
  const aria = (href: string) => (pathname === href ? ('page' as const) : undefined);
  const close = () => setOpen(false);

  return (
    <>
      <header className={`header dk${solid ? ' solid' : ''}`} id="header">
        <div className="topstrip">
          <div className="wrap">
            <span>
              Roofing &amp; roof repairs across <b>all of Sydney</b>
            </span>
            <span>Residential · Commercial · Strata</span>
          </div>
        </div>
        <div className="wrap hd-main">
          <Link href="/" className="logo" aria-label={`${site.name} home`}>
            <img src={logo.src} srcSet={logo.srcSet} width={logo.width} height={logo.height} alt={site.name} fetchPriority="high" />
          </Link>
          <nav className="nav" aria-label="Main">
            <Link href="/" className={cls('/')} aria-current={aria('/')}>Home</Link>
            <div className="has-drop">
              <Link href="/services/" className={cls('/services/')} aria-current={aria('/services/')}>
                Services <Icon name="chevron" />
              </Link>
              <div className="drop">
                <div className="drop-in">
                  {services.map(s => (
                    <Link key={s.slug} href={`/services/${s.slug}/`} className={cls(`/services/${s.slug}/`)} aria-current={aria(`/services/${s.slug}/`)}>
                      {s.menuName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/about/" className={cls('/about/')} aria-current={aria('/about/')}>About</Link>
            <Link href="/service-areas/" className={cls('/service-areas/')} aria-current={aria('/service-areas/')}>Areas</Link>
            <Link href="/contact/" className={cls('/contact/')} aria-current={aria('/contact/')}>Contact</Link>
          </nav>
          <div className="hd-right">
            <a className="hd-phone" href={telHref}>
              <Icon name="phone" />
              {site.phone.display}
            </a>
            <a href="#quote" className="btn btn-gold">Free Quote</a>
            <button
              className="burger"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mnav"
              onClick={() => setOpen(o => !o)}
            >
              <i /><i />
            </button>
          </div>
        </div>
      </header>

      <nav className={`mnav${open ? ' open' : ''}`} id="mnav" aria-label="Mobile" inert={!open}>
        <Link href="/" className={cls('/')} onClick={close}>Home</Link>
        <Link href="/services/" className={pathname === '/services/' ? 'cur' : undefined} onClick={close}>Services</Link>
        <div className="msub">
          {services.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}/`} className={cls(`/services/${s.slug}/`)} onClick={close}>
              {s.name}
            </Link>
          ))}
        </div>
        <Link href="/about/" className={cls('/about/')} onClick={close}>About</Link>
        <Link href="/service-areas/" className={cls('/service-areas/')} onClick={close}>Service Areas</Link>
        <Link href="/contact/" className={cls('/contact/')} onClick={close}>Contact</Link>
        <a
          href="#quote"
          className="btn btn-gold"
          onClick={e => {
            e.preventDefault();
            close();
            // wait for the menu to unlock scrolling, then go to the form
            window.setTimeout(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }), 60);
          }}
        >
          Get a Free Quote
        </a>
        <a href={telHref} className="m-phone" onClick={close}>Call {site.phone.display}</a>
      </nav>
    </>
  );
}
