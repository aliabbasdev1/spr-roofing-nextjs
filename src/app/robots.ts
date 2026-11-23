import type { MetadataRoute } from 'next';

// Required for metadata routes when using output: export.
export const dynamic = "force-static";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/'},sitemap:'https://sprroofing.com.au/sitemap.xml'};}
