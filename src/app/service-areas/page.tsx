import Icon from '@/components/Icon';
import QuoteSection from '@/components/QuoteSection';
import { CtaBand, PageHero, SecHead } from '@/components/sections';
import { areas } from '@/content/areas';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Roofing Service Areas Sydney | Roofers Across Greater Sydney | SPR',
  description:
    'Roofing service areas Sydney-wide: SPR Roofing Group covers the Inner West, North Shore, Eastern Suburbs, Hills, Western Sydney, the Shire and more. Check your suburb.',
  path: '/service-areas/',
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        short
        image="house-sunset"
        alt="Sydney home with a metal roof"
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/service-areas/' }]}
        kicker="Where we work"
        title="Roofing service areas *Sydney*"
        lead="We service homes and businesses right across Sydney, from the Northern Beaches to the Sutherland Shire and out to Penrith."
      />
      <section className="sec">
        <div className="wrap">
          <SecHead
            kicker="Sydney-wide"
            title="Regions we *cover*"
            text="Suburbs listed are examples only. If your suburb isn't shown, send us a message. We cover all of Sydney."
          />
          <ul className="area-grid">
            {areas.map(a => (
              <li className="area rv" key={a.name}>
                <span className="area-ic" aria-hidden="true"><Icon name="pin" /></span>
                <h3>{a.name}</h3>
                <p>{a.suburbs}</p>
              </li>
            ))}
          </ul>
          <div className="area-cta rv">
            <div>
              <h3>Not sure if we cover your suburb?</h3>
              <p>Send us your suburb and a few photos of the roof and we&apos;ll get back to you.</p>
            </div>
            <a href="#quote" className="btn btn-dark">Check my suburb</a>
          </div>
        </div>
      </section>
      <CtaBand />
      <QuoteSection />
    </>
  );
}
