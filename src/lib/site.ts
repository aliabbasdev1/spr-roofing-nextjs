/**
 * Single source of truth for business details.
 * Everything here is rendered into the static HTML at build time,
 * so search engines and visitors without JavaScript always see it.
 */
export const site = {
  name: 'SPR Roofing Group',
  shortName: 'SPR Roofing',
  url: 'https://sprroofing.com.au',
  slogan: 'Your roof. Our responsibility.',
  description:
    'Roofing and roof repair specialists for homes and businesses across Sydney. Your roof. Our responsibility.',

  phone: {
    display: '0420 150 956',
    e164: '+61420150956',
  },
  whatsapp: '61420150956', // wa.me format: country code, no +
  email: 'info@sprroofing.com.au',

  /** Add these when available. Empty values are hidden everywhere. */
  licence: '', // e.g. 'NSW Contractor Licence No. 123456C'
  abn: '', // e.g. 'ABN 12 345 678 901'

  locale: 'en_AU',
  region: 'NSW',
  city: 'Sydney',
} as const;

export const telHref = `tel:${site.phone.e164}`;
export const mailHref = `mailto:${site.email}`;
export const waHref = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const abs = (path = '/') => new URL(path, site.url).toString();
