import type { Metadata } from 'next';
import { areas } from '@/content/areas';
import { abs, site } from './site';

const OG_IMAGE = {
  url: '/images/og-default.jpg',
  width: 1200,
  height: 630,
  alt: `${site.name} – roofing and roof repairs across Sydney`,
};

/** Page metadata: title, description, canonical, Open Graph and Twitter card. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  };
}

const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;

/** Sitewide business + website entities (rendered once in the root layout). */
export function businessSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'RoofingContractor',
      '@id': BUSINESS_ID,
      name: site.name,
      alternateName: site.shortName,
      url: abs('/'),
      logo: abs('/images/spr-logo.png'),
      image: abs(OG_IMAGE.url),
      description: site.description,
      slogan: site.slogan,
      telephone: site.phone.e164,
      email: site.email,
      address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: 'AU' },
      areaServed: [
        { '@type': 'City', name: 'Sydney', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
        ...areas.map(a => ({ '@type': 'Place', name: `${a.name}, Sydney` })),
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone.e164,
        email: site.email,
        contactType: 'customer service',
        areaServed: 'AU',
        availableLanguage: ['English'],
      },
      ...(site.abn ? { taxID: site.abn } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: abs('/'),
      name: site.name,
      inLanguage: 'en-AU',
      publisher: { '@id': BUSINESS_ID },
    },
  ];
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceSchema(s: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${s.name} Sydney`,
    serviceType: s.name,
    description: s.description,
    url: abs(s.path),
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Sydney' },
  };
}
