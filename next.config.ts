import type { NextConfig } from 'next';
const nextConfig:NextConfig={
  // Static export for Netlify Drop / Netlify Publish directory = out.
  output:'export',
  images:{unoptimized:true},
  trailingSlash:true,
};
export default nextConfig;
