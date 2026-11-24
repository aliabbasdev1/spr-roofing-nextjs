import { mailHref, site, telHref } from '@/lib/site';
import Icon from './Icon';
import QuoteForm from './QuoteForm';
import { Rich } from './Rich';

export default function QuoteSection({
  title = 'Get your *roofing quote*',
  defaultService,
}: { title?: string; defaultService?: string }) {
  return (
    <section className="sec" id="quote">
      <div className="wrap quote-grid">
        <div>
          <p className="kicker rv">Free quote</p>
          <h2 className="rv mt16"><Rich text={title} /></h2>
          <p className="rv muted mt18">Fill in the form, then send it to us by WhatsApp or email, whichever suits you.</p>
          <div className="check rv">
            <h3>Before you ask for a quote</h3>
            <ul className="ticks">
              <li><Icon name="check" />Your suburb</li>
              <li><Icon name="check" />A brief description of the job</li>
              <li><Icon name="check" />Photos taken from the ground</li>
            </ul>
          </div>
          <ul className="contact-list rv">
            <li><a href={telHref}><Icon name="phone" />{site.phone.display}</a></li>
            <li><a href={mailHref}><Icon name="mail" />{site.email}</a></li>
          </ul>
        </div>
        <div className="rv">
          <QuoteForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
