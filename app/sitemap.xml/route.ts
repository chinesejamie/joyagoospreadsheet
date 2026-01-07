// app/sitemap.xml/route.ts

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  await connectToDatabase();

  const baseUrl = 'https://kakobuy-spreadsheet.com';
  const currentDate = new Date().toISOString();

  const products = await Product.find({}, { creatorName: 1, name: 1, updatedAt: 1, images: 1 }).lean();

  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily', lastmod: currentDate },
    { path: '/kakobuy-spreadsheet', priority: 0.95, changefreq: 'daily', lastmod: currentDate },
    { path: '/features/faq?lang=english', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { path: '/features/faq?lang=poland', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { path: '/articles', priority: 0.8, changefreq: 'weekly', lastmod: currentDate },
    { path: '/features/finds-of-the-week', priority: 0.85, changefreq: 'weekly', lastmod: currentDate },
    { path: '/articles/kakobuy-coupons-2024', priority: 0.75, changefreq: 'weekly', lastmod: currentDate },
    { path: '/articles/is-kakobuy-legit', priority: 0.75, changefreq: 'monthly', lastmod: currentDate },
    { path: '/features/kakobuy-qc-images', priority: 0.7, changefreq: 'weekly', lastmod: currentDate },
    { path: '/features/dead-link', priority: 0.5, changefreq: 'monthly', lastmod: currentDate },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" `;
  xml += `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // Static Pages
  staticPages.forEach(({ path, priority, changefreq, lastmod }) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${path}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic Product Pages with Image sitemap
  products.forEach((product: any) => {
    const creatorName = encodeURIComponent(product.creatorName);
    const productSlug = encodeURIComponent(product.name);
    const lastmod = product.updatedAt ? new Date(product.updatedAt).toISOString() : currentDate;

    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/kakobuy-spreadsheet/products/${creatorName}/${productSlug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;

    // Add image data if available
    if (product.images && product.images.length > 0) {
      product.images.slice(0, 3).forEach((img: any) => {
        const imageUrl = typeof img === 'string' ? img : img?.url;
        if (imageUrl) {
          xml += `    <image:image>\n`;
          xml += `      <image:loc>${imageUrl}</image:loc>\n`;
          xml += `      <image:title>${product.name || 'KakoBuy Product'}</image:title>\n`;
          xml += `      <image:caption>Buy ${product.name || 'product'} on KakoBuy - Best price with KakoBuy Spreadsheet</image:caption>\n`;
          xml += `    </image:image>\n`;
        }
      });
    }

    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

