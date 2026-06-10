import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/content/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return [
    { url: `${origin}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${origin}/credits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
  ];
}
