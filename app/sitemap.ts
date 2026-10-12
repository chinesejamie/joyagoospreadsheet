// app/sitemap.ts
// Only real, indexable URLs. No product pages, no facets, no priority/changefreq.
import type { MetadataRoute } from 'next';
import { SITE_URL, CONTENT_LAST_REVIEWED } from '@/lib/site';
import { getLatestCreatedAt } from '@/lib/finds';

export const revalidate = 3600;

const CONTENT_PATHS = [
  '/articles',
  '/articles/how-to-buy-on-joyagoo',
  '/articles/is-joyagoo-legit',
  '/articles/joyagoo-shipping-to-germany',
  '/articles/joyagoo-coupons-2026',
  '/features/faq',
  '/about',
  '/contact',
  '/privacy-policy',
  '/features/dead-link',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reviewed = new Date(CONTENT_LAST_REVIEWED);

  let latestFind: Date = reviewed;
  try {
    latestFind = (await getLatestCreatedAt()) ?? reviewed;
  } catch {
    latestFind = reviewed;
  }

  return [
    { url: SITE_URL, lastModified: latestFind },
    { url: `${SITE_URL}/joyagoo-spreadsheet`, lastModified: latestFind },
    ...CONTENT_PATHS.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: reviewed })),
  ];
}
