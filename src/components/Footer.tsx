import Link from 'next/link';
import { services } from '@/content/services';
import { logo } from '@/lib/images';
import { mailHref, site, telHref } from '@/lib/site';
import Icon from './Icon';

export default function Footer() {
  const first = services.slice(0, 5);
  const rest = services.slice(5);
  return (
    <>
      <footer className="dk">
        <div className="wrap">
          <div className="f-grid">
            <div>
              <img className="f-logo" src={logo.src} srcSet={logo.srcSet} width={logo.width} height={logo.height} alt={site.name} loading="lazy" decoding="async" />
              <p>{site.description}</p>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                {first.map(s => (
                  <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2>More</h2>
              <ul>
                {rest.map(s => (
                  <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.name}</Link></li>
                ))}
                <li><Link href="/about/">About Us</Link></li>
                <li><Link href="/service-areas/">Service Areas</Link></li>
                <li><Link href="/contact/">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                <li><a href={telHref}>{site.phone.display}</a></li>
                <li><a href={mailHref}>{site.email}</a></li>
                <li>Servicing all of Sydney</li>
                {site.licence && <li>{site.licence}</li>}
              </ul>
            </div>
          </div>
          <div className="f-bottom">
            <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
            {site.abn && <span>{site.abn}</span>}
          </div>
        </div>
      </footer>
      <div className="callbar">
        <a href={telHref}><Icon name="phone" />Call Now</a>
        <a href="#quote">Free Quote</a>
      </div>
    </>
  );
}
