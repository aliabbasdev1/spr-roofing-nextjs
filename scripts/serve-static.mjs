// Local preview of the static build (`npm run build && npm start`).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve('out');
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};
const isFile = async p => (await stat(p).catch(() => null))?.isFile() ?? false;

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url || '/', 'http://x').pathname);
  let file = resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + sep)) return res.writeHead(400).end();
  if (!(await isFile(file))) file = join(file, 'index.html');
  const found = await isFile(file);
  if (!found) file = join(root, '404.html');
  const type = types[extname(file)] || 'application/octet-stream';
  let body = await readFile(file);
  const headers = { 'Content-Type': type };
  // gzip text like a real host does, so local Lighthouse numbers are realistic
  if (/text|javascript|json|xml|svg|manifest/.test(type) && /\bgzip\b/.test(String(req.headers['accept-encoding']))) {
    body = gzipSync(body);
    headers['Content-Encoding'] = 'gzip';
  }
  res.writeHead(found ? 200 : 404, headers);
  res.end(body);
}).listen(port, () => console.log(`SPR Roofing preview: http://localhost:${port}`));
