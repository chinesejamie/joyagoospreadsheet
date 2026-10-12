import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-4 text-gray-600">
        This page does not exist or has moved. Finds that are no longer available are removed from the sheet.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
          Back to the homepage
        </Link>
        <Link href="/joyagoo-spreadsheet" className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-primary-600">
          Open the JoyaGoo Spreadsheet
        </Link>
      </div>
    </section>
  );
}
