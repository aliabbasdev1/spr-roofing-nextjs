import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import Icon from '@/components/Icon';
import QuoteSection from '@/components/QuoteSection';
import { PageHero } from '@/components/sections';
import { contactFaqs } from '@/content/shared';
import { pageMetadata } from '@/lib/seo';
import { mailHref, site, telHref, waHref } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact SPR Roofing Group | Free Roofing Quote Sydney',
  description:
    'Contact SPR Roofing Group for a free roofing quote Sydney-wide. Call, WhatsApp or email us with your suburb and a few roof photos and our team will get back to you.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        short
        ctas={false}
        image="roof-dusk"
        alt="Metal roof at dusk"
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }]}
        kicker="Contact us"
        title="Let's talk about *your roof*"
        lead="Call, WhatsApp or email our team, or use the form below to prepare your quote request in a couple of minutes."
      />
      <section className="sec contact-cards-sec" aria-label="Contact options">
        <div className="wrap cc-grid">
          <a className="cc rv" href={telHref}>
            <span className="cc-ic"><Icon name="phone" /></span>
            <small>Call us</small>
            <b>{site.phone.display}</b>
            <span className="cc-go">Call now <Icon name="arrow" /></span>
          </a>
          <a className="cc rv" href={waHref()} target="_blank" rel="noopener noreferrer">
            <span className="cc-ic"><Icon name="whatsapp" /></span>
            <small>WhatsApp</small>
            <b>Message our team</b>
            <span className="cc-go">Open WhatsApp <Icon name="arrow" /></span>
          </a>
          <a className="cc rv" href={mailHref}>
            <span className="cc-ic"><Icon name="mail" /></span>
            <small>Email</small>
            <b>{site.email}</b>
            <span className="cc-go">Send email <Icon name="arrow" /></span>
          </a>
          <Link className="cc rv" href="/service-areas/">
            <span className="cc-ic"><Icon name="pin" /></span>
            <small>Service area</small>
            <b>All of Sydney</b>
            <span className="cc-go">See areas <Icon name="arrow" /></span>
          </Link>
        </div>
      </section>
      <QuoteSection title="Request your *free quote*" />
      <FaqSection items={contactFaqs} />
    </>
  );
}
