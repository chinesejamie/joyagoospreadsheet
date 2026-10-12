// app/joyagoo-spreadsheet/page.tsx
// "All JoyaGoo finds": the complete, paginated sheet as a table. The head term
// "JoyaGoo Spreadsheet" belongs to `/`; this page targets the full list and,
// via ?category=, the category landing pages.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';
import FindsTable from '@/components/FindsTable';
import Pagination from '@/components/Pagination';
import AgentCta from '@/components/AgentCta';
import Disclosure from '@/components/Disclosure';
import { BreadcrumbSchema, CollectionPageSchema } from '@/components/StructuredData';
import { getFinds, getCategoryCounts } from '@/lib/finds';
import { CATEGORIES, categoryBySlug, type CategoryDef } from '@/lib/categories';
import { activeOffers } from '@/lib/offers';
import { SITE_URL, roundedCount } from '@/lib/site';

export const dynamic = 'force-dynamic';

const BASE_PATH = '/joyagoo-spreadsheet';
const PAGE_SIZE = 50;

type SortKey = 'boost' | 'newest' | 'popular';
type SP = { [key: string]: string | string[] | undefined };

// Short, factual intros for the category landing pages.
const CATEGORY_INTRO: Record<string, string> = {
  shoes:
    'Sneakers, runners and other footwear from Weidian, Taobao and 1688 sellers. Most listings use EU sizes and the fit differs from seller to seller and model to model, so read the size chart in the listing before you order. Prices are the seller’s price in CNY, without shipping.',
  't-shirts':
    'T-shirts and polos listed by sellers on Weidian, Taobao and 1688. Chinese size labels often run smaller than EU/US sizes, so compare the measurements in the listing with a shirt you own. Prices are in CNY and do not include shipping.',
  pants:
    'Pants, jeans, cargos and shorts. Sizes are often given as waist measurements in cm or as Asian sizes, so check the size table in the listing rather than relying on the label. Prices are the seller’s CNY price before shipping.',
  hoodies:
    'Hoodies, zip-ups and crewnecks. Heavier fleece pieces weigh more, and international shipping through an agent is charged by weight and volume, so the parcel cost can matter as much as the item price. Prices are in CNY.',
  accessories:
    'Hats, belts, watches and other small items. Small accessories are light, which keeps the shipping share low when you add them to a larger haul. Prices are in CNY; check the listing for colour and size options.',
  jackets:
    'Jackets and outerwear. These are among the heaviest and bulkiest items in the sheet, so expect a noticeable share of shipping cost on top of the CNY price. Compare the listing’s measurements with a jacket you own.',
  tracksuits:
    'Tracksuits and matching sets, usually sold as top and bottom together. Check whether the listing price covers the full set or a single piece, and compare the size table with your measurements. Prices are in CNY.',
  jerseys:
    'Football and sports jerseys. Listings often differ in fan or player version, name and number printing and patches, which can change the price, so check the options in the listing. Prices are in CNY.',
  electronics:
    'A small set of electronics and gadgets. Items with built-in batteries cannot be sent on every shipping line, so check which lines JoyaGoo offers for them before you order. Prices are in CNY.',
};

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

interface Parsed {
  search: string;
  sortParam: string | undefined;
  sort: SortKey;
  category: CategoryDef | null;
  page: number;
}

function parse(sp: SP): Parsed {
  const rawCategory = first(sp.category)?.trim();
  const category = rawCategory ? categoryBySlug(rawCategory) : null;
  if (rawCategory && !category) notFound();

  const rawPage = first(sp.page);
  let page = 1;
  if (rawPage !== undefined) {
    if (!/^\d+$/.test(rawPage)) notFound();
    page = parseInt(rawPage, 10);
    if (page < 1) notFound();
  }

  const sortParam = first(sp.sort)?.trim() || undefined;
  const sort: SortKey = sortParam === 'newest' ? 'newest' : sortParam === 'popular' ? 'popular' : 'boost';

  return { search: (first(sp.search) ?? '').trim().slice(0, 100), sortParam, sort, category, page };
}

const load = cache(async (search: string, category: string | null, page: number, sort: SortKey) =>
  getFinds({ search: search || undefined, category, page, limit: PAGE_SIZE, sort }),
);

function canonicalPath(category: CategoryDef | null, page: number): string {
  const qs = new URLSearchParams();
  if (category) qs.set('category', category.slug);
  if (page > 1) qs.set('page', String(page));
  const s = qs.toString();
  return s ? `${BASE_PATH}?${s}` : BASE_PATH;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const p = parse(await searchParams);
  const data = await load(p.search, p.category?.slug ?? null, p.page, p.sort);
  if (p.page > data.pages) notFound();

  const pageSuffix = p.page > 1 ? ` (Page ${p.page})` : '';
  const title = p.category
    ? `${p.category.name} on the JoyaGoo sheet – ${roundedCount(data.total)} finds${pageSuffix}`
    : `All JoyaGoo Finds – ${roundedCount(data.total)} products with prices & links${pageSuffix}`;
  const description = p.category
    ? `${p.category.name} finds from Weidian, Taobao and 1688 sellers as a table: price in CNY with an approximate EUR/USD value, store, and a link to open each item on JoyaGoo.`
    : 'The full JoyaGoo finds table: every listed item with its price in CNY, an approximate EUR/USD value, the store, and a link to open it on JoyaGoo. Filter by category or search.';

  const url = `${SITE_URL}${canonicalPath(p.category, p.page)}`;
  const noindex = Boolean(p.search) || Boolean(p.sortParam);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary', title, description },
  };
}

export default async function AllFindsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const p = parse(await searchParams);
  const [data, counts] = await Promise.all([
    load(p.search, p.category?.slug ?? null, p.page, p.sort),
    getCategoryCounts(),
  ]);
  if (p.page > data.pages) notFound();

  const { rows, total, pages } = data;
  const heading = p.category ? p.category.name : 'All JoyaGoo finds';
  const pageUrl = `${SITE_URL}${canonicalPath(p.category, p.page)}`;
  const description = p.category
    ? `${p.category.name} finds on the JoyaGoo sheet with CNY prices and links to JoyaGoo.`
    : 'All finds on the JoyaGoo sheet with CNY prices and links to JoyaGoo.';

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'All finds', url: `${SITE_URL}${BASE_PATH}` },
    ...(p.category ? [{ name: p.category.name, url: `${SITE_URL}${BASE_PATH}?category=${p.category.slug}` }] : []),
  ];

  // Links keep the other active params, drop page.
  const linkWith = (over: Record<string, string | null>): string => {
    const qs = new URLSearchParams();
    const cur: Record<string, string | null> = {
      category: p.category?.slug ?? null,
      search: p.search || null,
      sort: p.sort === 'boost' ? null : p.sort,
      ...over,
    };
    for (const [k, v] of Object.entries(cur)) if (v) qs.set(k, v);
    const s = qs.toString();
    return s ? `${BASE_PATH}?${s}` : BASE_PATH;
  };

  const paginationParams: Record<string, string> = {};
  if (p.category) paginationParams.category = p.category.slug;
  if (p.search) paginationParams.search = p.search;
  if (p.sort !== 'boost') paginationParams.sort = p.sort;

  const allCount = Object.values(counts).reduce((a, b) => a + b, 0);
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm ${active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-100'}`;

  const sorts: { key: SortKey; label: string }[] = [
    { key: 'boost', label: 'Sponsored first' },
    { key: 'newest', label: 'Newest' },
    { key: 'popular', label: 'Most ordered' },
  ];

  const caption = `${heading}${p.search ? ` matching “${p.search}”` : ''}, page ${p.page} of ${pages}`;

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <CollectionPageSchema
        name={heading}
        description={description}
        url={pageUrl}
        itemUrls={rows.map((r) => SITE_URL + r.path)}
      />

      <div className="mx-auto w-full max-w-screen-xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-3 text-xs text-gray-500">
          <Link href="/" className="hover:underline">Home</Link>
          {' / '}
          {p.category ? (
            <>
              <Link href={BASE_PATH} className="hover:underline">All finds</Link>
              {' / '}
              <span className="text-gray-700">{p.category.name}</span>
            </>
          ) : (
            <span className="text-gray-700">All finds</span>
          )}
        </nav>

        <header>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {heading}
            {p.page > 1 ? <span className="text-gray-500"> – page {p.page}</span> : null}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-700">
            {total.toLocaleString('en-US')} {p.search ? 'matching ' : ''}finds with the seller’s price in CNY, an approximate EUR/USD value and a link that opens the item on JoyaGoo.
            {p.sort === 'boost' ? ' Rows marked “Sponsored” are paid placements by sellers and are shown first.' : null}
          </p>
          <Disclosure short className="mt-1 text-xs text-gray-500" />
        </header>

        <form method="get" action={BASE_PATH} role="search" className="mt-5 flex max-w-xl gap-2">
          {p.category ? <input type="hidden" name="category" value={p.category.slug} /> : null}
          <label htmlFor="finds-search" className="sr-only">Search finds</label>
          <input
            id="finds-search"
            type="search"
            name="search"
            defaultValue={p.search}
            placeholder="Search by name, seller or item ID"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
          <button type="submit" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700">
            Search
          </button>
        </form>

        <nav aria-label="Categories" className="mt-4 flex flex-wrap gap-2">
          <Link href={linkWith({ category: null })} className={chip(!p.category)}>
            All <span className="opacity-60">{allCount.toLocaleString('en-US')}</span>
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={linkWith({ category: c.slug })}
              className={chip(p.category?.slug === c.slug)}
              aria-current={p.category?.slug === c.slug ? 'page' : undefined}
            >
              {c.name} <span className="opacity-60">{(counts[c.slug] ?? 0).toLocaleString('en-US')}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">Sort:</span>
          {sorts.map((s) =>
            s.key === p.sort ? (
              <span key={s.key} className="font-semibold text-gray-900">{s.label}</span>
            ) : (
              <Link key={s.key} href={linkWith({ sort: s.key === 'boost' ? null : s.key })} rel="nofollow" className="text-gray-700 underline underline-offset-2 hover:text-gray-900">
                {s.label}
              </Link>
            ),
          )}
          {p.search ? (
            <Link href={linkWith({ search: null })} className="ml-auto text-gray-700 underline underline-offset-2">
              Clear search
            </Link>
          ) : null}
        </div>

        <div className="mt-4">
          <FindsTable rows={rows} startIndex={(p.page - 1) * PAGE_SIZE} showCategory={!p.category} caption={caption} />
        </div>

        <Pagination currentPage={p.page} totalPages={pages} basePath={BASE_PATH} params={paginationParams} />

        <div className="mt-10">
          <AgentCta variant="box" offerHeadline={activeOffers()[0]?.headline ?? null} />
        </div>

        {p.category && CATEGORY_INTRO[p.category.slug] ? (
          <section className="mt-10 max-w-3xl">
            <h2 className="text-lg font-semibold text-gray-900">About {p.category.name.toLowerCase()} on the sheet</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{CATEGORY_INTRO[p.category.slug]}</p>
          </section>
        ) : null}
      </div>
    </>
  );
}
