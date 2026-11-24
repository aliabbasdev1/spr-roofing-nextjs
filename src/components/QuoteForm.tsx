'use client';

import { useRef, useState, type FormEvent } from 'react';
import { formServices } from '@/content/shared';
import { site, waHref } from '@/lib/site';
import Icon from './Icon';

type Field = 'name' | 'phone' | 'email' | 'suburb';
type Errors = Partial<Record<Field, string>>;

function validate(d: Record<string, string>): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = 'Please enter your name.';
  const digits = d.phone.replace(/\D/g, '');
  if (!digits) e.phone = 'Please enter a phone number.';
  else if (digits.length < 8 || digits.length > 13) e.phone = 'Please check your phone number.';
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Please check your email address.';
  if (!d.suburb.trim()) e.suburb = 'Please enter your suburb.';
  return e;
}

export default function QuoteForm({ defaultService = 'Not sure' }: { defaultService?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [links, setLinks] = useState<{ wa: string; mail: string } | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs = validate(d);
    setErrors(errs);
    const first = (Object.keys(errs) as Field[])[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setLinks(null);
      return;
    }
    const msg = [
      `Quote request - ${site.name}`,
      '',
      `Name: ${d.name.trim()}`,
      `Phone: ${d.phone.trim()}`,
      `Email: ${d.email.trim() || '-'}`,
      `Suburb: ${d.suburb.trim()}`,
      `Service: ${d.service}`,
      '',
      'Job details:',
      d.message.trim() || '-',
    ].join('\n');
    setLinks({
      wa: waHref(msg),
      mail: `mailto:${site.email}?subject=${encodeURIComponent(`Quote request - ${d.suburb.trim()}`)}&body=${encodeURIComponent(msg)}`,
    });
    requestAnimationFrame(() => sentRef.current?.focus());
  }

  const fieldProps = (name: Field) => ({
    id: `q-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `q-${name}-err` : undefined,
    onInput: () => errors[name] && setErrors(e => ({ ...e, [name]: undefined })),
  });
  const err = (name: Field) => errors[name] && <span className="err" id={`q-${name}-err`}>{errors[name]}</span>;

  return (
    <form className="quote-form" noValidate onSubmit={onSubmit} aria-label="Quote request">
      <div className="row">
        <div className="field">
          <label htmlFor="q-name">Full name <span className="req" aria-hidden="true">*</span></label>
          <input {...fieldProps('name')} autoComplete="name" required />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="q-phone">Phone <span className="req" aria-hidden="true">*</span></label>
          <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" required />
          {err('phone')}
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="q-email">Email</label>
          <input {...fieldProps('email')} type="email" autoComplete="email" />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor="q-suburb">Suburb <span className="req" aria-hidden="true">*</span></label>
          <input {...fieldProps('suburb')} autoComplete="address-level2" required />
          {err('suburb')}
        </div>
      </div>
      <div className="field">
        <label htmlFor="q-service">Service needed</label>
        <select id="q-service" name="service" defaultValue={defaultService}>
          {formServices.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-message">Describe the job</label>
        <textarea id="q-message" name="message" placeholder="E.g. water stain in the bedroom ceiling after last week's rain" />
      </div>
      <button className="btn btn-gold btn-block" type="submit">Prepare My Quote Request <Icon name="arrow" /></button>
      <p className="note">You can attach your photos in WhatsApp or email in the next step.</p>
      <div aria-live="polite">
        {links && (
          <div className="sent" ref={sentRef} tabIndex={-1}>
            <p><b>Almost done.</b> Choose how you&apos;d like to send it:</p>
            <div className="btn-row">
              <a className="btn btn-gold" href={links.wa} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />Send via WhatsApp</a>
              <a className="btn btn-line" href={links.mail}><Icon name="mail" />Send via Email</a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
