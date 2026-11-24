import Link from 'next/link';
import { notFound } from 'next/navigation';
import FaqSection from '@/components/FaqSection';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import QuoteSection from '@/components/QuoteSection';
import { Rich } from '@/components/Rich';
import { CtaBand, PageHero, Process, RealtorBox, SecHead, ServiceCard } from '@/components/sections';
import { serviceBySlug, services } from '@/content/services';
import { pageMetadata, serviceSchema } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map(s => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}/` });
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}/`;
  const related = s.related.map(serviceBySlug).filter(Boolean) as typeof services;

  return (
    <>
      <PageHero
        image={s.hero.image}
        alt={s.hero.alt}
        flip={s.hero.flip}
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: s.name, path }]}
        kicker={s.hero.kicker}
        title={s.hero.title}
        lead={s.hero.lead}
        chips={['Residential & commercial', 'Sydney-wide', 'Clear written quotes']}
      />

      <section className="sec">
        <div className="wrap intro-split">
          <div>
            <p className="kicker rv">{s.name}</p>
            <h2 className="rv mt16"><Rich text={s.intro.title} /></h2>
            {s.intro.paragraphs.map(p => <p className="rv body-p" key={p.slice(0, 24)}>{p}</p>)}
            <RealtorBox />
          </div>
          <aside className="signs-card rv" aria-labelledby="when-h">
            <h3 id="when-h">When to <span className="gold">call us</span></h3>
            <ul>
              {s.intro.signs.map(sign => (
                <li key={sign.title}>
                  <span className="si" aria-hidden="true"><Icon name="check" /></span>
                  <div><b>{sign.title}</b><span>{sign.text}</span></div>
                </li>
              ))}
            </ul>
            <a href="#quote" className="btn btn-gold btn-block">Send us photos</a>
          </aside>
        </div>
      </section>

      <section className="sec incl-sec dk">
        <div className="wrap">
          <SecHead kicker="What's included" title="How we *handle it*" text="Every job is different. Your written quote lists exactly what your roof needs." />
          <ul className="inc-grid">
            {s.included.map((item, i) => (
              <li className="inc rv" key={item.title}>
                <span className="inc-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process title="How it *works*" text="A clear process and a team that keeps you updated." steps={s.steps} />
      <FaqSection items={s.faqs} />

      <section className="sec related-sec">
        <div className="wrap">
          <SecHead kicker="Related services" title="You might *also need*">
            <Link href="/services/" className="btn btn-line rv">All services</Link>
          </SecHead>
          <div className="svc-grid">
            {related.map(r => <ServiceCard key={r.slug} s={r} />)}
          </div>
        </div>
      </section>

      <CtaBand image="roof-dusk" text="Whatever the job, our team is ready to help. Send a message and we'll come back to you with next steps." />
      <QuoteSection title={s.quoteTitle} defaultService={s.formService} />
      <JsonLd data={serviceSchema({ name: s.name, description: s.metaDescription, path })} />
    </>
  );
}
