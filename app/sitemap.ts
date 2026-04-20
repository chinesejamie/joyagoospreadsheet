// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://joyagoospreadsheet.com';

  // Core pages with high priority for "joyagoo spreadsheet" keyword
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/joyagoo-spreadsheet`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1.0, // Highest priority - main keyword page
    },
    {
      url: `${baseUrl}/features/finds-of-the-week`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/qc-images`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/report-dead-link`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Article pages
  const articles = [
    'is-joyagoo-legit',
    'joyagoo-review',
    'joyagoo-coupon-code',
    'how-to-use-joyagoo',
    'how-to-shop-with-joyagoo',
  ];

  const articleRoutes = articles.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...articleRoutes];
}
