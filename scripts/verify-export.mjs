// Post-build check: fail the deploy if key pages or SEO files are missing.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const out = join(process.cwd(), 'out');
const pages = [
  'index.html', '404.html', 'about/index.html', 'contact/index.html', 'services/index.html', 'service-areas/index.html',
  'services/roof-leak-repairs/index.html', 'services/tile-roof-repairs/index.html', 'services/metal-roofing/index.html',
  'services/roof-restoration/index.html', 'services/roof-painting/index.html', 'services/gutter-repairs/index.html',
  'services/storm-damage-repairs/index.html', 'services/roof-inspections/index.html', 'services/commercial-roofing/index.html',
];
const files = ['sitemap.xml', 'robots.txt', 'manifest.webmanifest', '.htaccess', 'images/og-default.jpg'];

const problems = [];
for (const f of [...pages, ...files]) if (!existsSync(join(out, f))) problems.push(`missing out/${f}`);
for (const f of pages) {
  const p = join(out, f);
  if (!existsSync(p)) continue;
  const html = readFileSync(p, 'utf8');
  if (!html.includes('0479 083 101')) problems.push(`${f}: phone number not in HTML`);
  if (!/<h1[\s>]/.test(html)) problems.push(`${f}: no <h1>`);
  if (f !== '404.html' && !html.includes('rel="canonical"')) problems.push(`${f}: no canonical`);
}

if (problems.length) {
  console.error('Static export check FAILED:\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log(`Static export OK: ${pages.length} pages + sitemap, robots, manifest and .htaccess in out/`);
