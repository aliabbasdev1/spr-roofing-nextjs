/**
 * Production build for Hostinger (`npm run build`).
 *
 * Hostinger's "Next.js" application preset can rewrite next.config.* while
 * staging the source (to run the app as a Node server), which silently turns
 * off `output: 'export'` and leaves `out/` empty. This wrapper:
 *   1. restores next.config.ts from git if it was changed, and reports the change
 *   2. removes any other next.config.* that would take precedence
 *   3. runs `next build`, then the post-build fix + verification steps
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const CONFIG = 'next.config.ts';
const log = msg => console.log(`[spr-build] ${msg}`);

function committedConfig() {
  try {
    return execFileSync('git', ['show', `HEAD:${CONFIG}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null; // no git available (e.g. ZIP upload) – fall back to a check
  }
}

// 1. next.config.ts must be the committed, static-export version
const current = existsSync(CONFIG) ? readFileSync(CONFIG, 'utf8') : '';
const committed = committedConfig();
const norm = s => s.replace(/\r\n/g, '\n'); // ignore Windows line endings
if (committed && norm(current) !== norm(committed)) {
  log(`${CONFIG} was modified before the build. Restoring the committed version.`);
  log('--- modified version (for reference) ---\n' + current + '\n--- end ---');
  writeFileSync(CONFIG, committed);
} else if (!committed && !/output:\s*['"]export['"]/.test(current)) {
  console.error(`[spr-build] ${CONFIG} does not contain output: 'export'. Aborting.`);
  process.exit(1);
}

// 2. Other config files take precedence over .ts in Next.js – remove injected ones
for (const f of ['next.config.js', 'next.config.mjs', 'next.config.cjs']) {
  if (existsSync(f)) {
    log(`Removing unexpected ${f} (contents below) so ${CONFIG} is used.`);
    console.log(readFileSync(f, 'utf8'));
    rmSync(f);
  }
}

// Diagnostic: Next-related environment variables provided by the host (names only)
const envNames = Object.keys(process.env).filter(k => /^(NEXT|__NEXT|HOSTINGER|VERCEL)/i.test(k));
if (envNames.length) log(`Host environment variables: ${envNames.join(', ')}`);

// 3. Build
const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};
rmSync('out', { recursive: true, force: true });
run('npx', ['next', 'build']);

if (!existsSync('out/index.html')) {
  console.error(
    '[spr-build] next build finished but did not write the static site to out/.\n' +
      '[spr-build] The host is overriding the static export. In Hostinger, change the\n' +
      '[spr-build] application type / framework preset from "Next.js" to "Static" or "Other",\n' +
      '[spr-build] keeping build command "npm run build" and output directory "out".',
  );
  process.exit(1);
}
run('node', ['scripts/fix-segment-files.mjs']);
run('node', ['scripts/verify-export.mjs']);
