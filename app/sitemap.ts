// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kakobuy-spreadsheet.com';

  // Core pages with high priority for "kakobuy spreadsheet" keyword
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kakobuy-spreadsheet`,
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
    'is-kakobuy-legit',
    'kakobuy-review',
    'kakobuy-coupon-code',
    'how-to-use-kakobuy',
    'how-to-shop-with-kakobuy',
  ];

  const articleRoutes = articles.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...articleRoutes];
}
