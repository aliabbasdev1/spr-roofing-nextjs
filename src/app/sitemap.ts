import type { MetadataRoute } from 'next';
import {metadataByPage} from '@/lib/pageMetadata';

// Required for metadata routes when using output: export.
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{
 return Object.keys(metadataByPage).map(page=>({url:`https://sprroofing.com.au${page==='home'?'':`/${page}/`}`}));
}
