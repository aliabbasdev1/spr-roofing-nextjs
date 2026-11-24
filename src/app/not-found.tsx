import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | SPR Roofing Group' },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="nf dk">
      <div className="wrap">
        <p className="kicker">Error 404</p>
        <h1>This page has <span className="gold">blown away</span></h1>
        <p>The page you were looking for doesn&apos;t exist or has moved. Try one of these instead, or get in touch and we&apos;ll help.</p>
        <div className="btn-row">
          <Link href="/" className="btn btn-gold">Back to home</Link>
          <Link href="/contact/" className="btn btn-line">Contact us</Link>
        </div>
        <nav className="nf-links" aria-label="Popular pages">
          {services.map(s => <Link key={s.slug} href={`/services/${s.slug}/`}>{s.name}</Link>)}
        </nav>
      </div>
    </section>
  );
}
