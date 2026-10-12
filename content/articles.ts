// content/articles.ts
// Registry of the editorial articles. The article index, related-article
// blocks, metadata and the Article schema all read from here. Dates are real:
// datePublished = first publication, dateModified = last human review.

import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from '@/lib/site';
import { OFFERS_CHECKED_ON } from '@/lib/offers';

export interface ArticleEntry {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO date
  dateModified: string;  // ISO date
}

const articles: ArticleEntry[] = [
  {
    slug: 'how-to-buy-on-joyagoo',
    title: 'How to Buy on JoyaGoo with the Spreadsheet (2026 Guide)',
    description:
      'Step by step: register, pick a find, open it on JoyaGoo, pay, check the warehouse QC photos, choose a shipping line and handle customs.',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
  },
  {
    slug: 'is-joyagoo-legit',
    title: 'Is JoyaGoo Legit? What We Know in October 2026',
    description:
      'What JoyaGoo is, how long it has been around, how shopping agents make money, the real risks, what buyers report, and a checklist before your first order.',
    datePublished: '2026-04-20',
    dateModified: '2026-10-12',
  },
  {
    slug: 'joyagoo-shipping-to-germany',
    title: 'JoyaGoo Shipping to Germany & the EU: Customs, Tax, Timing (2026)',
    description:
      'How a JoyaGoo parcel reaches Germany, what changed in EU customs in July and November 2026, the 19 % import VAT, and what we cannot tell you.',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
  },
  {
    slug: 'joyagoo-coupons-2026',
    title: `JoyaGoo Coupons & New-Account Offers (checked ${OFFERS_CHECKED_ON})`,
    description:
      'The new-account offer JoyaGoo actually shows, how its coupons work, and why "70 % off" codes on other sites are not real.',
    datePublished: '2026-04-20',
    dateModified: '2026-10-12',
  },
];

export default articles;

export function getArticle(slug: string): ArticleEntry {
  const a = articles.find((x) => x.slug === slug);
  if (!a) throw new Error(`Unknown article slug: ${slug}`);
  return a;
}

export function articleUrl(slug: string): string {
  return `${SITE_URL}/articles/${slug}`;
}

// Per-article Metadata: absolute canonical, no keywords, no languages.
export function articleMetadata(slug: string): Metadata {
  const a = getArticle(slug);
  const url = articleUrl(slug);
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: url },
    authors: [{ name: AUTHOR_NAME }],
    openGraph: {
      title: a.title,
      description: a.description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified,
      authors: [AUTHOR_NAME],
    },
  };
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
