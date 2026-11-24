import Link from 'next/link';
import type { ReactNode } from 'react';
import { services, type Service } from '@/content/services';
import { defaultSteps, stepIcons, type Step } from '@/content/shared';
import type { ImageName } from '@/lib/images';
import { breadcrumbSchema, type Crumb } from '@/lib/seo';
import { site, telHref } from '@/lib/site';
import Icon from './Icon';
import Img from './Img';
import JsonLd from './JsonLd';
import { Rich, SplitTitle } from './Rich';

/* ---------- Inner page hero (with breadcrumbs) ---------- */
export function PageHero({
  image, alt, flip = false, short = false, crumbs, kicker, title, lead, ctas = true, chips,
}: {
  image: ImageName; alt: string; flip?: boolean; short?: boolean; crumbs: Crumb[];
  kicker: string; title: string; lead: string; ctas?: boolean; chips?: readonly string[];
}) {
  return (
    <section className={`dk page-hero${short ? ' short' : ''}`}>
      <div className={`ph-bg${flip ? ' flip' : ''}`}>
        <Img name={image} alt={alt} priority sizes="100vw" />
      </div>
      <div className="wrap ph-in">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((c, i) =>
              i === crumbs.length - 1 ? (
                <li key={c.path}><span aria-current="page">{c.name}</span></li>
              ) : (
                <li key={c.path}><Link href={c.path}>{c.name}</Link></li>
              ),
            )}
          </ol>
        </nav>
        <p className="kicker">{kicker}</p>
        <h1 className="ph-title"><SplitTitle text={title} /></h1>
        <p className="ph-lead">{lead}</p>
        {ctas && <HeroCtas />}
        {chips && (
          <ul className="chips">
            {chips.map(c => <li key={c}><Icon name="check" />{c}</li>)}
          </ul>
        )}
      </div>
      <div className="ph-line" />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </section>
  );
}

export function HeroCtas() {
  return (
    <div className="ph-ctas">
      <a href="#quote" className="btn btn-gold">Get a Free Quote <Icon name="arrow" /></a>
      <a href={telHref} className="btn btn-line">Call {site.phone.display}</a>
    </div>
  );
}

/* ---------- Section heading (kicker + h2 + side text) ---------- */
export function SecHead({ kicker, title, text, children }: { kicker: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <div className="sec-head">
      <div>
        <p className="kicker rv">{kicker}</p>
        <h2 className="rv"><Rich text={title} /></h2>
      </div>
      {text && <p className="rv">{text}</p>}
      {children}
    </div>
  );
}

/* ---------- Service cards ---------- */
export function ServiceCard({ s, headingLevel = 3 }: { s: Service; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link className="svc rv" href={`/services/${s.slug}/`}>
      <div className={`media${s.cardFlip ? ' flip' : ''}`}>
        <Img name={s.cardImage} alt="" sizes="(max-width: 760px) 92vw, (max-width: 1080px) 46vw, 400px" />
        {s.slug === 'storm-damage-repairs' && <span className="rain" />}
        <span className="n" aria-hidden="true">{s.number}</span>
        <span className="arrow" aria-hidden="true"><Icon name="arrow" /></span>
      </div>
      <div className="body">
        <div className="ic"><Icon name={s.icon} /></div>
        <H>{s.name}</H>
        <p>{s.summary}</p>
      </div>
    </Link>
  );
}

export function ServiceGrid({ items = services, headingLevel = 3 }: { items?: Service[]; headingLevel?: 2 | 3 }) {
  return <div className="svc-grid">{items.map(s => <ServiceCard key={s.slug} s={s} headingLevel={headingLevel} />)}</div>;
}

/* ---------- Process timeline ---------- */
export function Process({ title = 'Simple from *start to finish*', text, steps = defaultSteps }: { title?: string; text: string; steps?: Step[] }) {
  return (
    <section className="process-lite sec">
      <div className="wrap">
        <SecHead kicker="The process" title={title} text={text} />
        <div className="timeline tl-lite">
          <div className="track" aria-hidden="true"><i className="fill" /></div>
          <ol className="steps">
            {steps.map((st, i) => (
              <li className="step on" key={st.title}>
                <span className="node" aria-hidden="true"><Icon name="check" strokeWidth={3.2} /></span>
                <div className="card">
                  <span className="ic" aria-hidden="true"><Icon name={stepIcons[i]} /></span>
                  <div className="n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dark CTA band ---------- */
export function CtaBand({ text = 'Whatever the job, our team is ready to help. Get in touch for a quote today.', image = 'house-sunset' }: { text?: string; image?: ImageName }) {
  return (
    <section className="cta dk">
      <Img name={image} alt="" className="cta-img" sizes="100vw" />
      <div className="in">
        <p className="kicker rv">Let&apos;s talk about your roof</p>
        <h2 className="rv">Small leak or <span className="gold">full restoration?</span></h2>
        <p className="rv">{text}</p>
        <div className="rv btn-row">
          <a href="#quote" className="btn btn-gold">Request a Quote</a>
          <a href={telHref} className="btn btn-line">Call {site.phone.display}</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- "From the team behind Sydney Property Realtor" ---------- */
export function RealtorBox() {
  return (
    <div className="realtor-box rv">
      <Icon name="realtor" />
      <div>
        <b>From the team behind Sydney Property Realtor</b>
        <span>We know Sydney property, and what a sound roof adds to it.</span>
      </div>
    </div>
  );
}
