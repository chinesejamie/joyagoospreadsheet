// app/about/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/StructuredData';
import {
  SITE_URL,
  SITE_NAME,
  AGENT_NAME,
  AUTHOR_NAME,
  AUTHOR_URL,
  CONTACT_EMAIL,
  CONTENT_LAST_REVIEWED,
  INDEPENDENT_NOTE,
  AFFILIATE_NOTE,
} from '@/lib/site';
import { formatDate } from '@/content/articles';

const URL = `${SITE_URL}/about`;
const TITLE = 'About this JoyaGoo spreadsheet';
const DESCRIPTION =
  'Who runs this independent JoyaGoo spreadsheet, where the finds come from, how the site makes money and what it is not.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: SITE_NAME, type: 'profile' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': AUTHOR_URL,
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  homeLocation: { '@type': 'Country', name: 'Germany' },
  worksFor: { '@id': `${SITE_URL}/#organization` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'About', url: URL },
        ]}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span aria-current="page">About</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">About {SITE_NAME}</h1>
      <p className="mt-2 text-sm text-gray-500">
        Last reviewed <time dateTime={CONTENT_LAST_REVIEWED}>{formatDate(CONTENT_LAST_REVIEWED)}</time>
      </p>

      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gray-800 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_a]:underline [&_a]:underline-offset-2">
        <h2 id="jamie">Who makes this site</h2>
        <p>
          This site is run by {AUTHOR_NAME}, an independent publisher based in Germany. {AUTHOR_NAME} writes and reviews
          the guides, maintains the spreadsheet and answers mail. {INDEPENDENT_NOTE}
        </p>

        <h2 id="finds">Where the finds come from</h2>
        <p>
          The products in the spreadsheet come from finds lists by contributors and from sellers who submit their own
          listings. They are stored in a product database that we share with sister spreadsheets we run for other
          shopping agents, so you may see the same find on those sites with a different agent link. We do not buy or
          test every item; the photos are the sellers&apos; photos. Prices are the sellers&apos; listing prices at the
          time of import and can be out of date.
        </p>

        <h2 id="money">How the site makes money</h2>
        <ul>
          <li>{AFFILIATE_NOTE}</li>
          <li>
            Sellers can pay for a higher placement in the spreadsheet. Those rows are labelled &ldquo;Sponsored&rdquo;.
          </li>
        </ul>
        <p>Neither affects what we write about {AGENT_NAME} in the guides; when we cannot verify something, we say so.</p>

        <h2 id="not">What we are not</h2>
        <ul>
          <li>We are not {AGENT_NAME} and not operated by, or affiliated with, {AGENT_NAME}.</li>
          <li>We do not take orders, payments or parcels. Everything you buy, you buy from {AGENT_NAME} and its sellers.</li>
          <li>
            We cannot help with {AGENT_NAME} orders, refunds, shipping or account problems. Please contact {AGENT_NAME}
            support from your account.
          </li>
        </ul>

        <h2 id="contact">Contact</h2>
        <p>
          Dead links, corrections, seller requests: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. More on the{' '}
          <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </div>
  );
}
