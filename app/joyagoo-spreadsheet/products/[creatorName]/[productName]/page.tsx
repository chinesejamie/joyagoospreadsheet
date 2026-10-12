// app/joyagoo-spreadsheet/products/[creatorName]/[productName]/page.tsx
// One find. Rendered on request (no build-time prerendering of ~7,900 pages).
// House rule since 2026-09-28: product pages are noindex,follow on this domain.

import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';
import BuyNowButton from '@/components/BuyNowButton';
import AgentCta from '@/components/AgentCta';
import Disclosure from '@/components/Disclosure';
import FindsTable from '@/components/FindsTable';
import { BreadcrumbSchema, ItemPageSchema } from '@/components/StructuredData';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { findProduct, getFinds, productId, productPath, toRow, usableImages } from '@/lib/finds';
import { buildJoyaGooLink } from '@/lib/joyagooLink';
import { FX_RATES_DATE, SITE_URL, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

const PLACEHOLDER = '/images/default-product.webp';

type Params = Promise<{ creatorName: string; productName: string }>;

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function isListable(p: any): boolean {
  return Boolean(p) && p.hidden !== true && Number(p.price) > 0 && typeof p.name === 'string' && p.name.trim() !== '';
}

// Resolves the product, redirects legacy name/slug URLs, 404s the rest.
const resolve = cache(async (encCreator: string, encKey: string) => {
  const creatorName = safeDecode(encCreator);
  const key = safeDecode(encKey);
  const product = await findProduct(creatorName, key);
  if (!product || !isListable(product)) notFound();
  if (key !== productId(product) || creatorName !== product.creatorName) {
    permanentRedirect(productPath(product));
  }
  return product;
});

function money(n: number, cur: 'eur' | 'usd'): string {
  const v = n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return cur === 'eur' ? `€${v}` : `$${v}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { creatorName, productName } = await params;
  const product = await resolve(creatorName, productName);
  const row = toRow(product);
  const images = usableImages(product.images);

  const title = `${row.name} – ¥${Math.round(row.priceCny).toLocaleString('en-US')} on the JoyaGoo sheet`;
  const parts = [
    `${row.name} from seller ${row.creatorName || 'unknown'}`,
    row.store && row.store !== 'Unknown' ? `on ${row.store}` : null,
    row.categoryName ? `(${row.categoryName})` : null,
  ].filter(Boolean);
  const description = `${parts.join(' ')}: ¥${row.priceCny} (≈ ${money(row.priceEur, 'eur')} / ${money(row.priceUsd, 'usd')}). Open it on JoyaGoo from the independent JoyaGoo sheet.`;
  const url = `${SITE_URL}${productPath(product)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: images[0] ? [{ url: absoluteUrl(images[0]), alt: row.name }] : undefined,
    },
    twitter: { card: images[0] ? 'summary_large_image' : 'summary', title, description },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { creatorName, productName } = await params;
  const product = await resolve(creatorName, productName);
  const row = toRow(product);
  const images = usableImages(product.images);
  const mainImage = images[0] ?? PLACEHOLDER;
  const gallery = images.slice(1, 13);
  const joyagooLink = buildJoyaGooLink(product.link);
  const description = typeof product.description === 'string' ? product.description.trim() : '';
  const url = `${SITE_URL}${row.path}`;

  // View counter (fire-and-forget).
  connectToDatabase()
    .then(() => Product.updateOne({ _id: product._id }, { $inc: { viewCount: 1 } }))
    .catch(() => {});

  const related = row.categorySlug
    ? (await getFinds({ category: row.categorySlug, limit: 9 })).rows.filter((r) => r.mongoId !== row.mongoId).slice(0, 8)
    : [];

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'All finds', url: `${SITE_URL}/joyagoo-spreadsheet` },
    ...(row.categorySlug ? [{ name: row.categoryName as string, url: `${SITE_URL}/joyagoo-spreadsheet?category=${row.categorySlug}` }] : []),
    { name: row.name, url },
  ];

  return (
    <>
      <ItemPageSchema name={row.name} url={url} image={images[0] ? absoluteUrl(images[0]) : undefined} />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="mx-auto w-full max-w-screen-xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-500">
          <Link href="/" className="hover:underline">Home</Link>
          {' / '}
          <Link href="/joyagoo-spreadsheet" className="hover:underline">All finds</Link>
          {row.categorySlug ? (
            <>
              {' / '}
              <Link href={`/joyagoo-spreadsheet?category=${row.categorySlug}`} className="hover:underline">{row.categoryName}</Link>
            </>
          ) : null}
          {' / '}
          <span className="text-gray-700">{row.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={mainImage}
                alt={row.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                unoptimized={mainImage.startsWith('/')}
              />
            </div>
            {gallery.length ? (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {gallery.map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={src}
                      alt={`${row.name} – photo ${i + 2}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                      unoptimized={src.startsWith('/')}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <p className="mt-3 text-xs text-gray-500">
              Photos are the seller&apos;s listing photos. QC photos are taken by JoyaGoo&apos;s warehouse after purchase.
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{row.name}</h1>

            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">¥{row.priceCny.toLocaleString('en-US')}</span>
              <span className="ml-2 text-sm text-gray-600">
                ≈ {money(row.priceEur, 'eur')} · {money(row.priceUsd, 'usd')} (rate {FX_RATES_DATE})
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-[7rem_1fr] gap-y-2 text-sm">
              <dt className="text-gray-500">Store</dt>
              <dd className="text-gray-800">{row.store}</dd>
              <dt className="text-gray-500">Seller list</dt>
              <dd className="text-gray-800">{row.creatorName || 'unknown'}</dd>
              <dt className="text-gray-500">Category</dt>
              <dd className="text-gray-800">
                {row.categorySlug ? (
                  <Link href={`/joyagoo-spreadsheet?category=${row.categorySlug}`} className="underline underline-offset-2 hover:text-gray-900">
                    {row.categoryName}
                  </Link>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </dd>
              {row.sponsored ? (
                <>
                  <dt className="text-gray-500">Placement</dt>
                  <dd className="text-gray-800">Sponsored (the seller pays for placement on this site)</dd>
                </>
              ) : null}
            </dl>

            <div className="mt-8">
              {joyagooLink ? (
                <BuyNowButton creatorName={row.creatorName} productId={row.mongoId} href={joyagooLink} />
              ) : (
                <p className="text-sm text-gray-600">This listing has no link JoyaGoo can open.</p>
              )}
            </div>
            <div className="mt-4">
              <AgentCta variant="inline" />
            </div>

            {description ? (
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                <p className="mt-2 whitespace-pre-line text-sm text-gray-700">{description}</p>
              </section>
            ) : null}

            <Disclosure className="mt-8 text-xs text-gray-500" />
          </div>
        </div>

        {related.length ? (
          <section className="mt-12">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">More {row.categoryName?.toLowerCase()} on the sheet</h2>
            <FindsTable rows={related} showCategory={false} caption={`More ${row.categoryName} finds`} />
            <p className="mt-3 text-sm">
              <Link href={`/joyagoo-spreadsheet?category=${row.categorySlug}`} className="underline underline-offset-2">
                All {row.categoryName?.toLowerCase()} finds →
              </Link>
            </p>
          </section>
        ) : null}
      </div>
    </>
  );
}
