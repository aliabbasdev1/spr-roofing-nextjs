import type { Metadata, Viewport } from 'next';
import { Manrope, Saira } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import Motion from '@/components/Motion';
import { services } from '@/content/services';
import { businessSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import './globals.css';

// Self-hosted at build time: no request to Google Fonts from the browser.
const display = Saira({ subsets: ['latin'], weight: ['600', '700', '800', '900'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false }, // we render our own tel: links
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
  width: 'device-width',
  initialScale: 1,
};

/*
 * Marks JS as available before first paint so scroll-reveal styles apply
 * without a flash. If the app bundle never starts, content is shown anyway.
 */
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__sprReady)document.documentElement.classList.remove('js')},4000);`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header services={services.map(({ slug, name, menuName }) => ({ slug, name, menuName }))} />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
        <JsonLd data={businessSchema()} />
      </body>
    </html>
  );
}
