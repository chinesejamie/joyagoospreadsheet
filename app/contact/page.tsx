// app/contact/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { SITE_URL, SITE_NAME, AGENT_NAME, AUTHOR_NAME, AUTHOR_URL, CONTACT_EMAIL } from '@/lib/site';

const URL = `${SITE_URL}/contact`;
const TITLE = 'Contact';
const DESCRIPTION = `How to reach the people behind ${SITE_NAME}: dead links, corrections and seller requests.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: URL, siteName: SITE_NAME, type: 'website' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: URL },
        ]}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span aria-current="page">Contact</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
      <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-gray-800 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_a]:underline [&_a]:underline-offset-2">
        <p>
          Write to <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold">{CONTACT_EMAIL}</a>. Mail is read by{' '}
          <a href={AUTHOR_URL}>{AUTHOR_NAME}</a>, usually within a few days.
        </p>
        <p>Good reasons to write:</p>
        <ul>
          <li>
            A product link is dead or points to the wrong item (you can also use the{' '}
            <Link href="/features/dead-link">dead-link form</Link>).
          </li>
          <li>Something in a guide is wrong or out of date. Please include a source if you have one.</li>
          <li>You are a seller and want your listings added, corrected, removed or sponsored.</li>
          <li>Privacy requests, for example deleting your newsletter address.</li>
        </ul>
        <p>
          We are not {AGENT_NAME} and cannot help with {AGENT_NAME} orders, payments, refunds or parcels. For those,
          please contact {AGENT_NAME} support from your {AGENT_NAME} account.
        </p>
      </div>
    </div>
  );
}
