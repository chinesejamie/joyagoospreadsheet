// app/page.tsx (Server Component)
// Homepage = the sheet. Intent for "joyagoo spreadsheet": see the rows at once.
// Short hero, search + category chips, first rows of the table, then a short
// how-to, a definition and an FAQ. DB errors are not caught on purpose: a
// failing query must return 500, never an empty 200.

import Link from 'next/link';
import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import AgentCta from '@/components/AgentCta';
import Disclosure from '@/components/Disclosure';
import HowItWorks from '@/components/HowItWorks';
import HomeFaq, { type HomeFaqItem } from '@/components/HomeFaq';
import { FAQSchema } from '@/components/StructuredData';
import {
  getHomepageRows,
  getListableCount,
  getLatestCreatedAt,
  getCategoryCounts,
  getCreatorCount,
} from '@/lib/finds';
import { CATEGORIES } from '@/lib/categories';
import { activeOffers } from '@/lib/offers';
import { SITE_URL, FX_RATES_DATE, roundedCount } from '@/lib/site';

export const revalidate = 1800;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "10 Sep 2026" – fixed format, independent of the runtime's ICU data.
function fmtDate(d: Date | string | null): string | null {
  if (!d) return null;
  const date = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const n = roundedCount(await getListableCount());
  const title = `JoyaGoo Spreadsheet 2026: ${n} Finds with Prices & Links`;
  const description = `Independent JoyaGoo spreadsheet: ${n} Taobao, Weidian and 1688 finds with CNY/EUR prices, seller, category and a direct JoyaGoo link. Free, no login.`;
  const image = `${SITE_URL}/images/seo-cover.webp`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: 'https://joyagoospreadsheet.com' },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: 'JoyaGoo Spreadsheet',
      type: 'website',
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: 'JoyaGoo Spreadsheet' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function HomePage() {
  const [rows, count, latest, categoryCounts, creatorCount] = await Promise.all([
    getHomepageRows(8, 16),
    getListableCount(),
    getLatestCreatedAt(),
    getCategoryCounts(),
    getCreatorCount(),
  ]);

  const n = roundedCount(count);
  const latestDate = fmtDate(latest);
  const fxDate = fmtDate(FX_RATES_DATE);
  const offer = activeOffers()[0] ?? null;
  const chips = CATEGORIES.filter((c) => (categoryCounts[c.slug] ?? 0) > 0);

  const linkCls = 'font-semibold text-gray-900 underline underline-offset-2';

  const faqs: HomeFaqItem[] = [
    {
      question: 'Is this JoyaGoo’s own spreadsheet?',
      answer: 'No. This is an independent community spreadsheet. It is not run by JoyaGoo; links to JoyaGoo carry our invite code.',
      body: <>No. This is an independent community spreadsheet. It is not run by JoyaGoo; links to JoyaGoo carry our invite code.</>,
    },
    {
      question: 'How often is the JoyaGoo spreadsheet updated?',
      answer: `New finds are added in batches by contributors${latestDate ? `; the newest entry is from ${latestDate}` : ''}.`,
      body: <>New finds are added in batches by contributors{latestDate ? <>; the newest entry is from {latestDate}</> : null}.</>,
    },
    {
      question: 'Is JoyaGoo legit?',
      answer:
        'JoyaGoo is a shopping agent that buys from Chinese marketplaces on your behalf and ships the parcel to you. Start with a small order, check the QC photos before shipping and read our full review first.',
      body: (
        <>
          JoyaGoo is a shopping agent that buys from Chinese marketplaces on your behalf and ships the parcel to you. Start with a small order
          and check the QC photos before shipping. <Link href="/articles/is-joyagoo-legit" className={linkCls}>Read the full review</Link>.
        </>
      ),
    },
    {
      question: 'Does JoyaGoo ship to Germany and Europe?',
      answer: 'Yes, JoyaGoo offers shipping lines to Germany and other European countries; available lines and prices are shown in your account at checkout.',
      body: (
        <>
          Yes, JoyaGoo offers shipping lines to Germany and other European countries; available lines and prices are shown in your account at
          checkout. <Link href="/articles/joyagoo-shipping-to-germany" className={linkCls}>Shipping to Germany explained</Link>.
        </>
      ),
    },
    {
      question: 'Is there a JoyaGoo coupon?',
      answer: offer
        ? `JoyaGoo currently gives new accounts a ${offer.headline}. ${offer.detail}`
        : 'JoyaGoo shows no public new-account offer at the moment.',
      body: (
        <>
          {offer ? <>JoyaGoo currently gives new accounts a {offer.headline}. {offer.detail}</> : <>JoyaGoo shows no public new-account offer at the moment.</>}{' '}
          <Link href="/articles/joyagoo-coupons-2026" className={linkCls}>All JoyaGoo coupons</Link>.
        </>
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:pt-6">
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />

      {/* Hero: headline, one line of context, the sign-up CTA */}
      <header className="rounded-2xl bg-gradient-to-br from-primary-50 to-white px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">JoyaGoo Spreadsheet 2026</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-700 sm:text-base">
          {n} finds from Taobao, Weidian and 1688 with price, category and a direct JoyaGoo link
          {latestDate ? <> · latest find added {latestDate}</> : null}.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <AgentCta variant="button" label="Sign up on JoyaGoo" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-base font-bold text-gray-900 shadow hover:bg-primary-600 transition-colors" />
          <p className="text-sm text-gray-700">
            {offer ? <>New accounts get JoyaGoo&apos;s {offer.headline}. </> : null}
            Then open any find below with &ldquo;Open on JoyaGoo&rdquo;.
          </p>
        </div>
        <Disclosure short className="mt-3 text-xs text-gray-500" />
      </header>

      {/* Search (plain GET form, no JS) + category chips */}
      <div className="mt-5">
        <form action="/joyagoo-spreadsheet" method="get" role="search" className="flex gap-2">
          <label htmlFor="home-search" className="sr-only">Search the JoyaGoo spreadsheet</label>
          <input
            id="home-search"
            name="search"
            type="search"
            placeholder="Search finds, e.g. jacket, sneakers"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
          <button type="submit" className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-bold text-gray-900 hover:bg-primary-600 transition-colors">
            Search
          </button>
        </form>
        {chips.length ? (
          <nav aria-label="Categories" className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
            {chips.map((c) => (
              <Link
                key={c.slug}
                href={`/joyagoo-spreadsheet?category=${c.slug}`}
                className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:border-primary-400 hover:bg-primary-50"
              >
                {c.name} <span className="text-gray-400">{(categoryCounts[c.slug] ?? 0).toLocaleString('en-US')}</span>
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      {/* The sheet */}
      <section aria-label="JoyaGoo spreadsheet" className="mt-4">
        <ProductGrid rows={rows} label="JoyaGoo spreadsheet – latest and sponsored finds" />
        <div className="mt-6 flex flex-col gap-4">
          <Link
            href="/joyagoo-spreadsheet"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-900 hover:border-primary-500 hover:bg-primary-50 sm:self-start"
          >
            Open the full JoyaGoo Spreadsheet ({n} finds) →
          </Link>
          <AgentCta variant="box" offerHeadline={offer?.headline ?? null} />
        </div>
      </section>

      <HowItWorks />

      <section aria-labelledby="what-is" className="mt-12 max-w-3xl">
        <h2 id="what-is" className="text-xl font-bold text-gray-900">What is a JoyaGoo spreadsheet?</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          <p>
            A JoyaGoo spreadsheet is a list of products from Chinese marketplaces such as Taobao, Weidian and 1688, where every row has a price, a
            category and a link that opens the item directly on the shopping agent JoyaGoo. Instead of a Google Sheet, this JoyaGoo sheet is a
            searchable catalogue you can filter by category.
          </p>
          <p>
            The JoyaGoo finds here come from seller and creator lists that are collected in one shared database; {creatorCount.toLocaleString('en-US')}{' '}
            contributors have added items so far. The photos in each row are the seller&apos;s own listing photos. Real QC photos of your exact
            item only exist after you buy: JoyaGoo takes them at its warehouse and shows them in your account before you ship.
          </p>
          <p>
            Prices are the seller&apos;s prices in Chinese yuan (CNY). The EUR and USD amounts in this Joya Goo spreadsheet are approximations at the
            exchange rate from {fxDate ?? FX_RATES_DATE}; JoyaGoo&apos;s own conversion, service fees and shipping come on top.
          </p>
        </div>
      </section>

      <HomeFaq items={faqs} />
    </main>
  );
}
