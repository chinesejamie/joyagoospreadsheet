// app/articles/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import articles, { formatDate } from '@/content/articles';
import { BreadcrumbSchema } from '@/components/StructuredData';
import Disclosure from '@/components/Disclosure';
import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_URL } from '@/lib/site';

const URL = `${SITE_URL}/articles`;
const TITLE = 'JoyaGoo Guides: Buying, Shipping, Coupons, Legit Check';
const DESCRIPTION =
  'Dated, sourced guides for buying on JoyaGoo with the spreadsheet: how ordering works, customs and tax for Germany and the EU, current offers and an honest legit check.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: SITE_NAME, type: 'website' },
};

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) => b.dateModified.localeCompare(a.dateModified));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Articles', url: URL },
        ]}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span aria-current="page">Articles</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">JoyaGoo guides</h1>
      <p className="mt-3 text-gray-700">
        Written and reviewed by <a href={AUTHOR_URL} className="font-semibold underline underline-offset-2">{AUTHOR_NAME}</a>.
        Every guide shows when it was published and last reviewed, and links its sources.
      </p>
      <Disclosure className="mt-2 text-xs text-gray-500" />

      <ul className="mt-8 space-y-4">
        {sorted.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 transition hover:border-primary-500"
            >
              <h2 className="text-lg font-semibold text-gray-900">{a.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{a.description}</p>
              <p className="mt-2 text-xs text-gray-500">
                Published <time dateTime={a.datePublished}>{formatDate(a.datePublished)}</time> · Last reviewed{' '}
                <time dateTime={a.dateModified}>{formatDate(a.dateModified)}</time>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
