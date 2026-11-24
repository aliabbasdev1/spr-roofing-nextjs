import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import Img from '@/components/Img';
import QuoteSection from '@/components/QuoteSection';
import { SplitTitle } from '@/components/Rich';
import { CtaBand, HeroCtas, Process, SecHead, ServiceGrid } from '@/components/sections';
import { signs } from '@/content/shared';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Roof Repairs Sydney | Leak, Tile & Metal Roofing | SPR Roofing',
  description:
    'Roof repairs Sydney-wide for homes and businesses: leak repairs, tile and metal roofing, restorations, gutters and storm damage. Send a few photos for a clear quote.',
  path: '/',
});

const trust: { icon: IconName; text: string }[] = [
  { icon: 'clock', text: 'Reliable service' },
  { icon: 'star', text: 'Professional workmanship' },
  { icon: 'dollar', text: 'Competitive pricing' },
  { icon: 'home', text: 'Homes & businesses' },
  { icon: 'pin', text: 'Sydney-wide' },
];

const why = ['Reliable service', 'Professional workmanship', 'Competitive pricing', 'Residential & commercial properties', 'Sydney-wide service'];

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hp-hero dk">
        <div className="hp-img">
          <div className="hp-img-in">
            <Img name="house-sunset" alt="Sydney home with a new charcoal metal roof" priority sizes="(max-width: 1080px) 100vw, 48vw" />
          </div>
        </div>
        <div className="hp-edge" aria-hidden="true" />
        <div className="wrap hp-grid">
          <div className="hp-copy">
            <p className="kicker hp-kicker">Sydney&apos;s roofing &amp; roof repair specialists</p>
            <h1 className="ph-title hp-title"><SplitTitle text="Roof repairs *Sydney* can rely on" /></h1>
            <p className="hp-lead">
              From a small leak or damaged tiles to a complete roof restoration, our team is ready to help. Your roof. Our responsibility.
            </p>
            <HeroCtas />
            <ul className="chips">
              {['Leak repairs', 'Tile & metal roofs', 'Gutters'].map(c => <li key={c}><Icon name="check" />{c}</li>)}
            </ul>
          </div>
        </div>
        <div className="hp-card">
          <b>Strength · Quality · Reliability</b>
          <span>Homes, strata and commercial properties across Sydney.</span>
        </div>
      </section>

      <section className="trustbar" aria-label="Why customers choose us">
        <ul className="wrap">
          {trust.map(t => (
            <li className="tb rv" key={t.text}><span><Icon name={t.icon} /></span>{t.text}</li>
          ))}
        </ul>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="sec" id="services">
        <div className="wrap">
          <SecHead
            kicker="Our services"
            title="Complete roofing *solutions*"
            text="Whether it's one cracked tile or a full re-roof, you get the same careful work and a clear quote before anything starts."
          />
          <ServiceGrid />
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="sec dk why-sec">
        <div className="wrap why">
          <div className="why-media rv">
            <Img name="house-sunset" alt="Sydney home with a charcoal metal roof" id="whyImg" sizes="(max-width: 1080px) 92vw, 600px" />
            <div className="float">
              <Icon name="realtor" />
              <div>
                <b>From the team behind Sydney Property Realtor</b>
                <span>We know Sydney property, and what a sound roof adds to it.</span>
              </div>
            </div>
          </div>
          <div className="why-copy">
            <p className="kicker rv">Why SPR Roofing Group</p>
            <h2 className="rv mt16">We treat every roof like <span className="gold">our own</span></h2>
            <p className="rv">
              We turn up when we say we will, explain what we find in plain English, and give you a written quote before any work starts.
            </p>
            <ul className="ticks rv">
              {why.map(w => <li key={w}><Icon name="check" />{w}</li>)}
            </ul>
            <a href="#quote" className="btn btn-gold rv">Talk to our team</a>
          </div>
        </div>
      </section>

      {/* ================= SIGNS ================= */}
      <section className="signs-sec" id="signsSec" aria-labelledby="signs-h">
        <div className="signs-pin">
          <div className="wrap signs-head">
            <div>
              <p className="kicker rv">Spot it early</p>
              <h2 className="rv" id="signs-h">Signs your roof <span className="gold">needs attention</span></h2>
            </div>
            <div>
              <p className="rv">
                Most roof problems start small. Notice any of these? Send us a few photos taken from the ground and we&apos;ll take a look.
              </p>
              <div className="signs-nav rv">
                <span className="signs-count" aria-hidden="true"><b id="signsNow">01</b> / {String(signs.length).padStart(2, '0')}</span>
                <div className="signs-btns">
                  <button type="button" className="prev" aria-label="Previous sign"><Icon name="arrow" /></button>
                  <button type="button" className="next" aria-label="Next sign"><Icon name="arrow" /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="signs-wrap" data-total={signs.length}>
            <ul className="signs" id="signs" style={{ listStyle: 'none' }}>
              {signs.map((s, i) => (
                <li key={s.title} style={{ display: 'contents' }}>
                  <Link
                    className={`sign${'art' in s ? ' bp' : ''}${'art' in s && s.art === 'rust' ? ' corr' : ''}`}
                    href={`/services/${s.slug}/`}
                  >
                    {'image' in s && (
                      <div className="bg"><Img name={s.image} alt={s.alt} sizes="400px" /></div>
                    )}
                    {'art' in s && s.art === 'rust' && <span className="rust" aria-hidden="true" />}
                    {'art' in s && s.art === 'blueprint' && (
                      <svg className="art" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                        <path d="M10 50 60 12l50 38" /><path d="M20 44v46h80V44" /><path d="M34 62c6-4 10 4 16 0s10 4 16 0 10 4 16 0" />
                        <path d="M60 26c-5 7-8 11-8 15a8 8 0 0 0 16 0c0-4-3-8-8-15z" /><circle cx="40" cy="78" r="2" /><circle cx="52" cy="82" r="1.5" /><circle cx="78" cy="76" r="2.5" />
                      </svg>
                    )}
                    <div className="top">
                      <span className="num">Sign {String(i + 1).padStart(2, '0')}</span>
                      <span className="svc-tag">{s.tag}</span>
                    </div>
                    <div className="t">
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                      <span className="go"><i><Icon name="arrow" strokeWidth={2.4} /></i>Learn more</span>
                    </div>
                  </Link>
                </li>
              ))}
              <li style={{ display: 'contents' }}>
                <div className="sign end">
                  <div>
                    <p className="kicker">Not sure?</p>
                    <h3>Send us a photo. We&apos;ll tell you what we see.</h3>
                  </div>
                  <div>
                    <p>Your suburb, a short description and a few photos from the ground is all we need.</p>
                    <a href="#quote" className="btn btn-dark" style={{ marginTop: 18 }}>Get a Free Quote</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="wrap"><div className="signs-progress" aria-hidden="true"><i id="signsBar" /></div></div>
        </div>
      </section>

      <Process text="No pushy sales, just a clear process and a team that keeps you updated." />
      <CtaBand />
      <QuoteSection />
    </>
  );
}
