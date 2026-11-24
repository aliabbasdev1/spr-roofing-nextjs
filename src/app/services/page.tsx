import JsonLd from '@/components/JsonLd';
import QuoteSection from '@/components/QuoteSection';
import { CtaBand, PageHero, Process, ServiceGrid } from '@/components/sections';
import { services } from '@/content/services';
import { pageMetadata } from '@/lib/seo';
import { abs } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Roofing Services Sydney | Repairs, Restoration & Re-Roofing | SPR',
  description:
    'Roofing services Sydney-wide from one team: leak repairs, tile and metal roofing, restoration, painting, gutters, storm damage and inspections. Find the right service.',
  path: '/services/',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        short
        image="roof-dusk"
        alt="Metal roof at dusk"
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }]}
        kicker="What we do"
        title="Roofing services *Sydney*"
        lead="One team for every kind of roof job, from a single cracked tile to a complete re-roof. Choose a service to see how we handle it."
      />
      <section className="sec" aria-label="All roofing services">
        <div className="wrap"><ServiceGrid headingLevel={2} /></div>
      </section>
      <Process text="A clear process and a team that keeps you updated." />
      <CtaBand />
      <QuoteSection />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Roofing services in Sydney',
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: abs(`/services/${s.slug}/`) })),
        }}
      />
    </>
  );
}
