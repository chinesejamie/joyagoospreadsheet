// app/joyagoo-spreadsheet/page.tsx

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductPageHeroProducts from '@/components/ProductPageHeroProducts';
import { CollectionPageSchema, BreadcrumbSchema, FAQSchema } from '@/components/StructuredData';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'JoyaGoo Spreadsheet | Browse 7,500+ Verified Products with Prices & Photos';
  const description = 'Browse the official JoyaGoo Spreadsheet: 7,500+ products with USD prices, authentic QC photos, verified sellers. Free access for USA, Germany, Poland. Search & filter easily.';
  const imageUrl = 'https://joyagoospreadsheet.com/images/seo-cover.webp';

  return {
    title,
    description,
    metadataBase: new URL('https://joyagoospreadsheet.com'),
    keywords: [
      'joyagoo spreadsheet',
      'joyagoo spreadsheet 2026',
      'joyagoo mega spreadsheet',
      'joyagoo price list',
      'joyagoo products',
      'joyagoo spreadsheet free',
      'joyagoo spreadsheet download',
      'joyagoo database',
      'joyagoo product list',
      'joyagoo prices usd',
      'joyagoo qc photos',
      'joyagoo verified sellers',
      'browse joyagoo spreadsheet',
      'joyagoo spreadsheet usa',
      'joyagoo spreadsheet germany',
      'joyagoo spreadsheet poland',
      'best joyagoo spreadsheet',
      'official joyagoo spreadsheet',
      'joyagoo link converter',
      'taobao joyagoo links',
      'weidian joyagoo links',
      '1688 joyagoo',
    ],
    openGraph: {
      title,
      description,
      url: '/joyagoo-spreadsheet',
      siteName: 'JoyaGoo Spreadsheet',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'JoyaGoo Spreadsheet - Browse 7,500+ Products',
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
      canonical: '/joyagoo-spreadsheet',
      languages: {
        'en-US': '/joyagoo-spreadsheet',
        'de-DE': '/joyagoo-spreadsheet',
        'pl-PL': '/joyagoo-spreadsheet',
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
  creatorName?: string;
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

export default async function JoyaGooSpreadsheetPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // 1) Query-Params parsen
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
    // Server-side rendering should always use localhost to avoid external network calls
    const baseUrl = `http://localhost:${process.env.PORT || 3000}`;

    const res = await fetch(
      `${baseUrl}/api/products?${qp.toString()}`,
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

      // 3) mainImage und Badge-Felder normalisieren
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
          creatorName: p.creatorName ?? '',
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
        const manyouyisiProducts = allProducts.filter(p =>
          p.creatorName.toLowerCase().includes('manyouyisi')
        );

        const otherProducts = allProducts.filter(p =>
          !p.creatorName.toLowerCase().includes('manyouyisi')
        );

        manyouyisiProducts.sort((a, b) => b.purchased - a.purchased || b.viewCount - a.viewCount);
        otherProducts.sort((a, b) => b.boostAmount - a.boostAmount || b.purchased - a.purchased);

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

  // 4) Pagination-Berechnung
  const totalPages = Math.max(1, Math.ceil(totalProducts / limit));
  const getPageUrl = (num: number) => {
    const params = new URLSearchParams({
      page: String(num),
      ...(category !== 'All' ? { category } : {}),
      ...(search ? { search } : {}),
    });
    return `/joyagoo-spreadsheet?${params.toString()}`;
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
    { name: 'Home', url: 'https://joyagoospreadsheet.com' },
    { name: 'JoyaGoo Spreadsheet', url: 'https://joyagoospreadsheet.com/joyagoo-spreadsheet' },
  ];

  const faqs = [
    {
      question: 'What is the JoyaGoo Spreadsheet?',
      answer: 'The JoyaGoo Spreadsheet is a free, community-curated database of 7,500+ products available on JoyaGoo — a Chinese shopping agent. It lists verified items across categories like shoes, clothing, hoodies, and accessories with USD prices, QC photos, and direct purchase links.',
    },
    {
      question: 'Is the JoyaGoo Spreadsheet free to use?',
      answer: 'Yes, the JoyaGoo Spreadsheet is completely free. You can browse, search, and filter all 7,500+ products without creating an account. Simply click any product to view it on JoyaGoo.',
    },
    {
      question: 'How often is the JoyaGoo Spreadsheet updated?',
      answer: 'The spreadsheet is updated daily with new products, price changes, and QC photos. New finds are highlighted in the "Finds of the Week" section so you never miss the best deals.',
    },
    {
      question: 'What categories does the JoyaGoo Spreadsheet cover?',
      answer: 'The JoyaGoo Spreadsheet covers Shoes, Clothing, Hoodies, T-Shirts, Tracksuits, Sweaters, Accessories, Bags, Watches, and more. Use the category filter to narrow down your search.',
    },
    {
      question: 'How do I find products on the JoyaGoo Spreadsheet?',
      answer: 'Use the search bar to find products by name or keyword, or filter by category using the dropdown. You can also browse the full list sorted by popularity and purchases.',
    },
    {
      question: 'Does the JoyaGoo Spreadsheet have QC photos?',
      answer: 'Yes. You can access QC (Quality Control) photos for products directly through the JoyaGoo QC Image Checker feature. QC photos help you verify product quality before buying.',
    },
  ];

  return (
    <>
      {/* Schema.org structured data */}
      <CollectionPageSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      <ProductPageHeroProducts />

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

          {/* Product-Grid - Fixed to show only once */}
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
                      ? 'bg-primary-500 text-gray-900'
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

      {/* SEO Content Section */}
      <section className="max-w-screen-xl px-4 mx-auto mt-16 mb-12">
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            JoyaGoo Spreadsheet 2026 — Complete Product Database
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            The <strong>JoyaGoo Spreadsheet</strong> is the most comprehensive free product database for JoyaGoo shoppers worldwide.
            Browse over <strong>7,500 verified products</strong> across all major categories — from shoes and hoodies to tracksuits, bags, and accessories.
            Every listing includes USD pricing, QC photos, and a direct link to the product on JoyaGoo.com.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Use the JoyaGoo Spreadsheet</h3>
              <ul className="space-y-2 text-gray-600">
                <li>1. Use the <strong>search bar</strong> to find any product by keyword or name</li>
                <li>2. Filter by <strong>category</strong> (Shoes, Clothing, Bags, Accessories, etc.)</li>
                <li>3. Click any product card to open the product page on JoyaGoo</li>
                <li>4. Check <strong>QC photos</strong> before purchasing for peace of mind</li>
                <li>5. Use our <strong>exclusive coupon codes</strong> at checkout to save more</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Use This JoyaGoo Spreadsheet?</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ <strong>7,500+ verified products</strong> updated daily</li>
                <li>✓ <strong>USD prices</strong> so you always know what you pay</li>
                <li>✓ <strong>QC photos</strong> for quality verification before you buy</li>
                <li>✓ <strong>Finds of the Week</strong> — hand-picked best deals</li>
                <li>✓ <strong>Exclusive coupon codes</strong> for extra savings</li>
                <li>✓ Trusted by shoppers in <strong>USA, Germany, Poland</strong> and worldwide</li>
              </ul>
            </div>
          </div>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/features/finds-of-the-week" className="px-4 py-2 bg-primary-500 text-gray-900 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors">
              Finds of the Week
            </Link>
            <Link href="/features/joyagoo-qc-images" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              JoyaGoo QC Images
            </Link>
            <Link href="/articles/joyagoo-coupons-2026" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              JoyaGoo Coupons 2026
            </Link>
            <Link href="/articles/is-joyagoo-legit" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Is JoyaGoo Legit?
            </Link>
            <Link href="/features/dead-link" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Report a Dead Link
            </Link>
          </div>

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
