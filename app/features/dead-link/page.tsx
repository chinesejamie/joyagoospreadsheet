// app/features/dead-link/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import DeadLinkForm from '@/components/DeadLinkForm';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from '@/lib/site';

const URL = `${SITE_URL}/features/dead-link`;
const TITLE = 'Report a dead link';
const DESCRIPTION = 'Found a spreadsheet find whose Taobao, Weidian or 1688 listing is gone? Tell us and we will fix or remove it.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: URL, siteName: SITE_NAME, type: 'website' },
};

export default function DeadLinkReportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Report a dead link', url: URL },
        ]}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span aria-current="page">Report a dead link</span>
      </nav>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <DeadLinkForm />
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Prefer email? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">{CONTACT_EMAIL}</a>.
        How we handle report data is described in our <Link href="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>.
      </p>
    </div>
  );
}
