import type { NextConfig } from 'next';

/**
 * Fully static build: `npm run build` writes plain HTML/CSS/JS to `out/`,
 * which Hostinger serves directly (no Node server needed at runtime).
 * trailingSlash keeps URLs as /about/, /services/roof-leak-repairs/ etc.,
 * matching the URLs Google has already indexed.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true }, // images are pre-optimised by scripts/build-images.mjs
};

export default nextConfig;
