import type { IconName } from '@/components/Icon';

/** Content shared by several pages. */

export type Step = { title: string; text: string };
export const stepIcons: IconName[] = ['camera', 'search', 'doc', 'homecheck'];

export const defaultSteps: Step[] = [
  { title: 'Send details', text: 'Your suburb, a short description and a few photos from the ground.' },
  { title: 'We inspect', text: 'We book a time that suits you and take a proper look.' },
  { title: 'Clear quote', text: 'A written quote explaining what is needed and why.' },
  { title: 'Job done right', text: 'We finish, clean up and walk you through the work.' },
];

export const formServices = [
  'Roof leak repair',
  'Tile roof repair / replacement',
  'Metal roofing',
  'Roof restoration',
  'Roof painting',
  'Gutter repair / replacement',
  'Storm or wind damage',
  'Maintenance / inspection',
  'Commercial roofing',
  'Not sure',
] as const;

export const contactFaqs = [
  {
    q: 'What do you need from me for a quote?',
    a: 'Your suburb, a short description of the job and a few photos of the roof taken from the ground. That helps us understand the job before we inspect.',
  },
  {
    q: 'Do you charge for quotes?',
    a: 'No. Quotes are free and there is no obligation to go ahead. You get a clear, written quote before any work starts.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'We service homes and businesses across all of Sydney, from the Northern Beaches to the Sutherland Shire and out to Penrith. See our service areas page for the regions we cover.',
  },
  {
    q: 'Do you work on commercial properties?',
    a: 'Yes. We work on strata buildings, shops, offices and warehouses as well as homes.',
  },
];

export const signs = [
  { slug: 'roof-leak-repairs', tag: 'Leak repairs', title: 'Ceiling stains', text: 'A new water mark usually means water is getting in somewhere above it.', image: 'ceiling-leak', alt: 'Brown water stain on a ceiling' },
  { slug: 'gutter-repairs', tag: 'Gutter repairs', title: 'Overflowing gutters', text: 'Water spilling over when it rains points to blocked or failing gutters.', image: 'gutter-rain', alt: 'Gutter overflowing in heavy rain' },
  { slug: 'tile-roof-repairs', tag: 'Tile roof repairs', title: 'Cracked or slipped tiles', text: 'Even one broken or slipped tile can let water into the roof space.', image: 'tile-texture', alt: 'Terracotta roof tiles close-up' },
  { slug: 'tile-roof-repairs', tag: 'Ridge capping', title: 'Loose ridge caps', text: 'Cracked bedding or pointing lets ridge caps move and water get under them.', image: 'tile-ridge', alt: 'Terracotta ridge caps on a tiled roof' },
  { slug: 'storm-damage-repairs', tag: 'Storm damage', title: 'After a storm', text: 'Lifted sheets, loose flashing or debris are worth a check before the next downpour.', image: 'roof-dusk', alt: 'Metal roof at dusk after a storm' },
  { slug: 'metal-roofing', tag: 'Metal roofing', title: 'Rust or loose sheets', text: 'Rust spots, lifting edges or popped screws on a metal roof get worse with every storm.', art: 'rust' },
  { slug: 'roof-restoration', tag: 'Restoration & painting', title: 'Faded, tired roof', text: 'Chalky, faded or patchy colour means the protective coating is wearing thin.', image: 'house-sunset', alt: 'Home with an ageing roof in afternoon sun' },
  { slug: 'roof-inspections', tag: 'Roof inspections', title: 'Damp roof space', text: 'A musty smell, damp insulation or mould in the ceiling space is a sign water is getting in.', art: 'blueprint' },
] as const;
