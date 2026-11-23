import { existsSync } from 'node:fs';
import { join } from 'node:path';
const required = ['index.html', 'contact/index.html', 'services/index.html', 'sitemap.xml', 'robots.txt'];
const missing = required.filter(file => !existsSync(join(process.cwd(), 'out', file)));
if (missing.length) {
  console.error('Static export validation failed: missing out/' + missing.join(', out/'));
  console.error('Confirm next.config.ts contains output: "export" and trailingSlash: true.');
  process.exit(1);
}
console.log('Static export OK: out/index.html, out/contact/index.html, services, sitemap and robots.');
