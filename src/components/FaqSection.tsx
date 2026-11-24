import { faqSchema } from '@/lib/seo';
import Faq from './Faq';
import JsonLd from './JsonLd';

export default function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="sec sec-alt faq-sec">
      <div className="wrap faq-grid">
        <div>
          <p className="kicker rv">FAQs</p>
          <h2 className="rv mt16">Frequently asked <span className="gold">questions</span></h2>
          <p className="rv muted mt18">Can&apos;t find your answer? Send us a message and our team will help.</p>
          <a href="#quote" className="btn btn-line rv" style={{ marginTop: 26 }}>Ask a question</a>
        </div>
        <Faq items={items} />
      </div>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
