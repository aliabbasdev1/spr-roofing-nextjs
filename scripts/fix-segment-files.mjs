/**
 * Next 16 static export writes link-prefetch files as `__next.<segment>.<...>.txt`.
 * When building on Windows, path separators leak into those names and the files
 * end up in nested folders (`__next.services/__PAGE__.txt`), so prefetches 404.
 * This flattens them back to the dotted names the client requests.
 * On Linux (e.g. Hostinger's build servers) there is nothing to fix: no-op.
 */
import { readdir, rename, rm, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const out = join(process.cwd(), 'out');
let moved = 0;

async function filesIn(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await filesIn(p)));
    else result.push(p);
  }
  return result;
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const p = join(dir, entry.name);
    if (entry.name.startsWith('__next.')) {
      for (const file of await filesIn(p)) {
        const dotted = [entry.name, ...relative(p, file).split(sep)].join('.');
        await rename(file, join(dir, dotted));
        moved++;
      }
      await rm(p, { recursive: true, force: true });
    } else if (entry.name !== '_next') {
      await walk(p);
    }
  }
}

if ((await stat(out).catch(() => null))?.isDirectory()) {
  await walk(out);
  if (moved) console.log(`Flattened ${moved} prefetch segment files (Windows build).`);
}
