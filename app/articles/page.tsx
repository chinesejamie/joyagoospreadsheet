// app/articles/page.tsx

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JoyaGoo Spreadsheet Articles & Guides – Coupons, Tutorials, Reviews 2026',
  description:
    'Discover expert-written JoyaGoo articles including coupon guides, product spreadsheet tips, JoyaGoo seller reviews and more. Updated regularly in 2026.',
  keywords: [
    'joyagoo spreadsheet',
    'joyagoo coupons',
    'joyagoo tips',
    'how to use joyagoo',
    'joyagoo reviews',
    'best agents for joyagoo',
    'joyagoo spreadsheet guide',
    'joyagoo vs wegobuy',
    'is joyagoo legit',
  ],
  openGraph: {
    title: 'JoyaGoo Spreadsheet Articles & Guides 2026',
    description:
      'Explore in-depth articles around the JoyaGoo Spreadsheet, including coupon hacks, agent comparisons, trust scores, and shopping tips for Chinese marketplaces.',
    url: 'https://joyagoospreadsheet.com/articles',
    type: 'article',
  },
  alternates: {
    canonical: '/articles',
  },
};

const articles = [
  {
    slug: 'joyagoo-coupons-2026',
    title: 'JoyaGoo Coupons 2026: How to Save Money on Every Order',
    description:
      'Looking for active JoyaGoo coupons? This guide explains how to apply agent discounts, combine promotions, and get weekly spreadsheet deals.',
  },
  {
    slug: 'is-joyagoo-legit',
    title: 'Is JoyaGoo Legit? A Deep Dive into Safety & Trust in 2026',
    description:
      'We break down the pros, cons, user experiences, and transparency of JoyaGoo compared to other shopping agents in 2026.',
  },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-page-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        JoyaGoo Spreadsheet Articles & Guides
      </h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore tutorials, reviews, coupon breakdowns, and expert insights to make the most of the JoyaGoo Spreadsheet and agent services in 2026.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block border border-gray-200 hover:border-primary-500 rounded-xl p-5 transition shadow-sm hover:shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600">{article.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
