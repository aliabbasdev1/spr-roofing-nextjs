/**
 * SPR Roofing business contact details.
 *
 * Confirmed SPR Roofing phone number supplied by client: 0479 083 101.
 * If WhatsApp uses a different number, set whatsappNumber below.
 * When whatsappNumber is blank, the same mobile is used for WhatsApp links.
 * Confirm that this mobile is WhatsApp-enabled before publishing.
 */
const phoneNumber = '0479 083 101'; // SPR Roofing contact number (Australia)
const whatsappNumber = ''; // Optional; for an Australian mobile, blank uses phoneNumber

function normalizeAustralianNumber(input: string): string {
  const cleaned = input.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+61')) return cleaned.slice(1);
  if (cleaned.startsWith('61')) return cleaned;
  if (cleaned.startsWith('0')) return `61${cleaned.slice(1)}`;
  return '';
}
const telephone = normalizeAustralianNumber(phoneNumber);
const validPhone = /^61[23478]\d{8}$/.test(telephone);
const whatsappCandidate = normalizeAustralianNumber(whatsappNumber || phoneNumber);
const validWhatsapp = /^614\d{8}$/.test(whatsappCandidate);

export const SPR = {
  phoneDisplay: validPhone ? phoneNumber : 'Contact Us',
  phoneTel: validPhone ? `+${telephone}` : '',
  whatsapp: validWhatsapp ? whatsappCandidate : '',
  email: 'info@sprroofing.com.au', // Confirm mailbox is active before launch
  licence: '', // Add verified NSW contractor licence when available
  abn: '',     // Add verified business ABN when available
} as const;
