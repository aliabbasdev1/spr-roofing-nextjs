import { SPR } from './siteDetails';

/** Hydrate contact data; never emit a fake phone or WhatsApp destination. */
export function mountContactLinks() {
  document.querySelectorAll<HTMLElement>('[data-phone-text]').forEach(el => {
    el.textContent = SPR.phoneDisplay;
  });
  document.querySelectorAll<HTMLElement>('[data-email-text]').forEach(el => {
    el.textContent = SPR.email;
  });
  document.querySelectorAll<HTMLAnchorElement>('[data-tel]').forEach(el => {
    el.href = SPR.phoneTel ? `tel:${SPR.phoneTel}` : '/contact/#quote';
    if (!SPR.phoneTel) el.title = 'Request a quote';
  });
  document.querySelectorAll<HTMLAnchorElement>('[data-mail]').forEach(el => {
    el.href = `mailto:${SPR.email}`;
  });
  document.querySelectorAll<HTMLAnchorElement>('[data-wa]').forEach(el => {
    if (SPR.whatsapp) {
      el.href = `https://wa.me/${SPR.whatsapp}`;
    } else {
      el.href = '/contact/#quote';
      el.removeAttribute('target');
      const action = el.querySelector<HTMLElement>('.cc-go');
      if (action) {
        const firstText = [...action.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
        if (firstText) firstText.textContent = 'Request a quote ';
      }
    }
  });
  document.querySelectorAll<HTMLElement>('[data-licence]').forEach(el => {
    el.textContent = SPR.licence;
    if (!SPR.licence) el.style.display = 'none';
  });
  document.querySelectorAll<HTMLElement>('[data-abn]').forEach(el => {
    el.textContent = SPR.abn;
    if (!SPR.abn) el.style.display = 'none';
  });
  const year = document.getElementById('yr');
  if (year) year.textContent = String(new Date().getFullYear());
}

/** Quote form links are only shown for configured channels. */
export function configureQuoteLinks(wa: HTMLAnchorElement | null, mail: HTMLAnchorElement | null, message: string, suburb: string) {
  if (wa) {
    if (SPR.whatsapp) {
      wa.href = `https://wa.me/${SPR.whatsapp}?text=${encodeURIComponent(message)}`;
      wa.style.display = '';
    } else {
      wa.removeAttribute('href');
      wa.style.display = 'none';
    }
  }
  if (mail) mail.href = `mailto:${SPR.email}?subject=${encodeURIComponent(`Quote request - ${suburb}`)}&body=${encodeURIComponent(message)}`;
}
