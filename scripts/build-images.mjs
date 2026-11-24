/**
 * One-off image pipeline (run with `npm run images` whenever assets-src/ changes).
 * Outputs are committed, so the Hostinger build never needs to run this.
 *
 *  - Photos  -> public/images/<name>-<width>.webp at several widths (srcset)
 *  - Logo    -> public/images/spr-logo-<width>.webp (+ a PNG for schema/social)
 *  - Icons   -> src/app/icon.png, src/app/apple-icon.png
 *  - Social  -> public/images/og-default.jpg (1200x630)
 *  - Manifest of intrinsic sizes -> src/content/images.json
 */
import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/images';
const PHOTO_WIDTHS = [480, 800, 1200, 1800];
const LOGO_WIDTHS = [240, 480];

await mkdir(OUT, { recursive: true });
const manifest = {};

for (const file of await readdir(SRC)) {
  const { name, ext } = parse(file);
  const input = join(SRC, file);
  const meta = await sharp(input).metadata();

  if (name === 'spr-logo') {
    for (const w of LOGO_WIDTHS) {
      await sharp(input).resize({ width: w }).webp({ quality: 80, alphaQuality: 80, effort: 6 }).toFile(join(OUT, `${name}-${w}.webp`));
    }
    await sharp(input).resize({ width: 480 }).png({ compressionLevel: 9, palette: true }).toFile(join(OUT, `${name}.png`));
    manifest[name] = { width: meta.width, height: meta.height, widths: LOGO_WIDTHS };
    continue;
  }
  if (!/\.(jpe?g|png)$/i.test(ext)) continue;

  const widths = PHOTO_WIDTHS.filter(w => w < meta.width);
  widths.push(Math.min(meta.width, 2000));
  const unique = [...new Set(widths)];
  for (const w of unique) {
    await sharp(input).resize({ width: w }).webp({ quality: 74, effort: 6 }).toFile(join(OUT, `${name}-${w}.webp`));
  }
  manifest[name] = { width: meta.width, height: meta.height, widths: unique };
}

/* ---------- favicon / app icons: house + SPR mark on black ---------- */
const mark = await sharp(join(SRC, 'spr-logo.png')).extract({ left: 60, top: 0, width: 600, height: 262 }).toBuffer();
async function icon(size, file, radius) {
  const pad = Math.round(size * 0.12);
  const inner = await sharp(mark).resize({ width: size - pad * 2, height: size - pad * 2, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#0b0b0d"/></svg>`);
  await sharp(bg).composite([{ input: inner, gravity: 'centre' }]).png({ compressionLevel: 9, palette: true }).toFile(file);
}
await icon(192, 'src/app/icon.png', 36);
await icon(180, 'src/app/apple-icon.png', 0);

/* ---------- default social share image ---------- */
const ogBg = await sharp(join(SRC, 'house-sunset.jpg')).resize(1200, 630, { fit: 'cover', position: 'right' }).toBuffer();
const shade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0b0b0d" stop-opacity=".96"/><stop offset=".55" stop-color="#0b0b0d" stop-opacity=".72"/><stop offset="1" stop-color="#0b0b0d" stop-opacity=".15"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect y="622" width="1200" height="8" fill="#e3a93c"/></svg>`);
const ogLogo = await sharp(join(SRC, 'spr-logo.png')).resize({ width: 520 }).toBuffer();
await sharp(ogBg).composite([{ input: shade }, { input: ogLogo, left: 80, top: 160 }]).jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, 'og-default.jpg'));

await writeFile('src/content/images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Images built:', Object.keys(manifest).join(', '));
