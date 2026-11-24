import type { MetadataRoute } from 'next';
import { services } from '@/content/services';
import { abs } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    page('/', 1, 'weekly'),
    page('/services/', 0.9),
    ...services.map(s => page(`/services/${s.slug}/`, 0.8)),
    page('/service-areas/', 0.7),
    page('/about/', 0.6),
    page('/contact/', 0.7),
  ];
}
