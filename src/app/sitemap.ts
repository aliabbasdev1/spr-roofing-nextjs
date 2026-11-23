import type { MetadataRoute } from 'next';
import {metadataByPage} from '@/lib/pageMetadata';
export default function sitemap():MetadataRoute.Sitemap{
 return Object.keys(metadataByPage).map(page=>({url:`https://sprroofing.com.au${page==='home'?'':`/${page}`}`}));
}
export const dynamic = "force-static";