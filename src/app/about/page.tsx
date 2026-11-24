import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import Img from '@/components/Img';
import QuoteSection from '@/components/QuoteSection';
import { CtaBand, PageHero, RealtorBox, SecHead } from '@/components/sections';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About SPR Roofing Group | Sydney Roofers You Can Rely On',
  description:
    'About SPR Roofing Group: Sydney roofers you can rely on, from the team behind Sydney Property Realtor. Meet the team built on strength, quality and reliability.',
  path: '/about/',
});

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: 'shield', title: 'Strength', text: 'Roofs built and repaired to stand up to Sydney sun, wind and storms.' },
  { icon: 'award', title: 'Quality', text: 'Careful workmanship, quality materials and a clean site when we leave.' },
  { icon: 'timer', title: 'Reliability', text: 'We turn up when we say we will and keep you updated throughout.' },
];

const promise = [
  'A written quote before any work starts',
  'Plain-English explanations, with photos',
  'Respect for your home and a clean site',
  'Homes, strata and commercial properties',
  'Service across all of Sydney',
  'One team from first message to final clean-up',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        short
        image="house-sunset"
        alt="Sydney home with a charcoal metal roof"
        crumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }]}
        kicker="About us"
        title="Sydney roofers you can *rely on*"
        lead="SPR Roofing Group was built on a simple idea: treat every roof like it belongs to our own family. Your roof. Our responsibility."
      />

      <section className="sec">
        <div className="wrap about-split">
          <div className="about-media rv">
            <Img name="roof-dusk" alt="Finished metal roof at dusk" sizes="(max-width: 1080px) 92vw, 560px" />
            <div className="about-badge" aria-hidden="true"><b>Strength</b><b>Quality</b><b>Reliability</b></div>
          </div>
          <div>
            <p className="kicker rv">Our story</p>
            <h2 className="rv mt16">From Sydney property <span className="gold">to Sydney roofs</span></h2>
            <p className="rv body-p">
              SPR Roofing Group comes from the team behind Sydney Property Realtor. Years of working with Sydney homes showed us how often roof
              problems are left too long, and how hard it can be to find a roofer who turns up, explains things clearly and does the job properly.
            </p>
            <p className="rv body-p">
              So we built a roofing business around those basics. We handle leak repairs, tile and metal roofing, restorations, painting, gutters,
              storm damage and inspections for homes, strata and commercial properties across Sydney.
            </p>
            <RealtorBox />
          </div>
        </div>
      </section>

      <section className="sec vals-sec dk">
        <div className="wrap">
          <SecHead kicker="What we stand for" title="Strength. Quality. *Reliability.*" text="The three words on our logo are the standard we hold every job to." />
          <div className="val-grid">
            {values.map(v => (
              <div className="val rv" key={v.title}>
                <span className="val-ic"><Icon name={v.icon} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap promise">
          <div>
            <p className="kicker rv">Our promise</p>
            <h2 className="rv mt16">What you can <span className="gold">expect</span></h2>
            <p className="rv body-p">Whether it&apos;s a single cracked tile or a full re-roof, every customer gets the same approach.</p>
            <Link href="/services/" className="btn btn-line rv" style={{ marginTop: 10 }}>Explore our services</Link>
          </div>
          <ul className="promise-list">
            {promise.map(p => <li className="rv" key={p}><Icon name="check" />{p}</li>)}
          </ul>
        </div>
      </section>

      <CtaBand />
      <QuoteSection />
    </>
  );
}
