// app/kakobuy-spreadsheet/page.tsx

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductPageHeroProducts from '@/components/ProductPageHeroProducts';
import { CollectionPageSchema, BreadcrumbSchema } from '@/components/StructuredData';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'KakoBuy Spreadsheet 2025 | Browse 10,000+ Products with Prices & QC Photos';
  const description = 'Browse the complete KakoBuy Spreadsheet: 10,000+ verified products with USD prices, QC photos, seller ratings. Free access. Best for USA, Germany, Poland. Updated daily.';
  const imageUrl = 'https://kakobuy-spreadsheet.com/images/seo-cover.webp';

  return {
    title,
    description,
    metadataBase: new URL('https://kakobuy-spreadsheet.com'),
    keywords: [
      'kakobuy spreadsheet',
      'kakobuy price list',
      'kakobuy products',
      'kakobuy spreadsheet 2025',
      'kakobuy database',
      'kakobuy product list',
      'kakobuy prices usd',
      'kakobuy qc photos',
      'kakobuy verified sellers',
      'browse kakobuy spreadsheet',
      'kakobuy spreadsheet free',
      'kakobuy spreadsheet download',
    ],
    openGraph: {
      title,
      description,
      url: '/kakobuy-spreadsheet',
      siteName: 'KakoBuy Spreadsheet',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'KakoBuy Spreadsheet - Browse 10,000+ Products',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: '/kakobuy-spreadsheet',
      languages: {
        'en-US': '/kakobuy-spreadsheet',
        'de-DE': '/kakobuy-spreadsheet',
        'pl-PL': '/kakobuy-spreadsheet',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const dynamic = 'force-dynamic';

interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  price: number | string;
  creatorName: string;
  mainImage: string | { url: string };
  images: any[];
  viewCount: number;
  boostAmount?: number;
  purchased?: number;
  findsOfTheWeekUntil?: Date;
  category?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number | string;
  creatorName: string;
  mainImage: string;
  images: any[];
  viewCount: number;
  boostAmount: number;
  purchased: number;
  findsOfTheWeekUntil: Date | null;
  category?: string;
}

export default async function KakoBuySpreadsheetPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // 1) Query‑Params parsen
  const pParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const page = parseInt(pParam ?? '1', 10);
  const search = Array.isArray(params.search)
    ? params.search[0]
    : params.search ?? '';
  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category ?? 'All';
  const limit = 100;

  const qp = new URLSearchParams({
    search,
    category,
    page: String(page),
    limit: String(limit),
  });

  // 2) Daten laden
  let allProducts: Product[] = [];
  let totalProducts = 0;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/products?${qp.toString()}`,
      { cache: 'no-store' }
    );

    if (res.status === 404) {
      allProducts = [];
      totalProducts = 0;
    } else if (!res.ok) {
      throw new Error(`Failed to fetch products (status ${res.status})`);
    } else {
      const data = await res.json();
      totalProducts = data.totalProducts || 0;

      // 3) mainImage und Badge‑Felder normalisieren
      const apiProducts: ApiProduct[] = data.products || [];
      allProducts = apiProducts.map((p) => {
        // mainImage auf String bringen
        let mainImage: string;
        if (typeof p.mainImage === 'string') {
          mainImage = p.mainImage;
        } else if (
          p.mainImage &&
          typeof (p.mainImage as any).url === 'string'
        ) {
          mainImage = (p.mainImage as any).url;
        } else {
          mainImage = '/images/default-product.jpg';
        }

        return {
          _id: p._id,
          name: p.name,
          description: p.description,
          price: p.price,
          creatorName: p.creatorName,
          mainImage,
          images: p.images,
          viewCount: p.viewCount,
          boostAmount: p.boostAmount ?? 0,
          purchased: p.purchased ?? 0,
          findsOfTheWeekUntil: p.findsOfTheWeekUntil ?? null,
          category: p.category,
        };
      });

      // For Shoes category, make sure manyouyisi products are at the top
      if (category === 'Shoes') {
        // Split products into manyouyisi and non-manyouyisi
        const manyouyisiProducts = allProducts.filter(p => 
          p.creatorName.toLowerCase().includes('manyouyisi')
        );
        
        const otherProducts = allProducts.filter(p => 
          !p.creatorName.toLowerCase().includes('manyouyisi')
        );
        
        // Sort each group
        manyouyisiProducts.sort((a, b) => b.purchased - a.purchased || b.viewCount - a.viewCount);
        otherProducts.sort((a, b) => b.boostAmount - a.boostAmount || b.purchased - a.purchased);
        
        // Combine groups with manyouyisi first
        allProducts = [...manyouyisiProducts, ...otherProducts];
      }
    }
  } catch (err) {
    console.error('Error loading products:', err);
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load products. Please try again later.
      </div>
    );
  }

  // 4) Pagination‑Berechnung
  const totalPages = Math.max(1, Math.ceil(totalProducts / limit));
  const getPageUrl = (num: number) => {
    const params = new URLSearchParams({
      page: String(num),
      ...(category !== 'All' ? { category } : {}),
      ...(search ? { search } : {}),
    });
    return `/kakobuy-spreadsheet?${params.toString()}`;
  };
  const displayedPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Breadcrumb data for schema
  const breadcrumbs = [
    { name: 'Home', url: 'https://kakobuy-spreadsheet.com' },
    { name: 'KakoBuy Spreadsheet', url: 'https://kakobuy-spreadsheet.com/kakobuy-spreadsheet' },
  ];

  return (
    <>
      {/* Schema.org structured data */}
      <CollectionPageSchema />
      <BreadcrumbSchema items={breadcrumbs} />

      <ProductPageHeroProducts />

      {/* H1 for SEO - visually hidden */}
      <h1 className="sr-only">KakoBuy Spreadsheet 2025 - Complete Product Database</h1>

      <div className="h-full my-4">
        <div className="grid max-w-screen-xl px-4 mx-auto w-full animate-page-fade-in">
          {/* Kein Produkt gefunden */}
          {allProducts.length === 0 && (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-900">
                No products existing
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Searching for a product but it's not here?{' '}
                <Link
                  href="/features/request-product"
                  className="text-primary-500 hover:underline"
                >
                  Request a Product
                </Link>
              </p>
            </div>
          )}

          {/* Product‑Grid - Fixed to show only once */}
          {allProducts.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {allProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalProducts > limit && (
            <div className="mt-6 flex justify-center md:justify-end space-x-1 md:space-x-2">
              {page > 1 && (
                <Link
                  href={getPageUrl(page - 1)}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  Previous
                </Link>
              )}
              {displayedPages().map((p) => (
                <Link
                  key={p}
                  href={getPageUrl(p)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    p === page
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link
                  href={getPageUrl(page + 1)}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}