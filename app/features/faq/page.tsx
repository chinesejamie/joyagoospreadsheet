// app/features/faq/page.tsx
// Fully server-rendered FAQ: every question and answer is in the HTML.
// <details> only adds optional collapsing; it works without JavaScript.
import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData';
import AgentCta from '@/components/AgentCta';
import Disclosure from '@/components/Disclosure';
import { activeOffers, OFFERS_CHECKED_ON } from '@/lib/offers';
import { formatDate } from '@/content/articles';
import { SITE_URL, SITE_NAME, AGENT_NAME, AUTHOR_NAME, AUTHOR_URL, CONTACT_EMAIL, CONTENT_LAST_REVIEWED } from '@/lib/site';

const URL = `${SITE_URL}/features/faq`;
const TITLE = 'JoyaGoo Spreadsheet FAQ';
const DESCRIPTION =
  'Answers about this independent JoyaGoo spreadsheet: how ordering works, QC photos, shipping and customs to the EU, coupons, sponsored rows and dead links.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: SITE_NAME, type: 'website' },
};

interface Faq {
  id: string;
  question: string;
  answer: string;            // plain text, used for schema and as the visible answer
  more?: { href: string; label: string };
}

function buildFaqs(): Faq[] {
  const offers = activeOffers();
  const offerAnswer =
    offers.length > 0
      ? `As of ${formatDate(OFFERS_CHECKED_ON)}, ${AGENT_NAME} shows this offer for new accounts: ${offers
          .map((o) => `${o.headline}. ${o.detail}`)
          .join(' ')} There is no code to enter; the vouchers are added to new accounts. We do not publish codes we cannot see on joyagoo.com.`
      : `As of ${formatDate(OFFERS_CHECKED_ON)} we could not confirm any public ${AGENT_NAME} offer. We do not publish codes we cannot see on joyagoo.com.`;

  return [
    {
      id: 'what-is-this',
      question: 'What is this site?',
      answer: `An independent, community-run spreadsheet of products you can buy through the shopping agent ${AGENT_NAME}. It is not operated by or affiliated with ${AGENT_NAME}. We do not sell anything ourselves.`,
      more: { href: '/about', label: 'About this site' },
    },
    {
      id: 'how-to-order',
      question: `How do I order a find through ${AGENT_NAME}?`,
      answer: `Create a ${AGENT_NAME} account, open a find with "Open on ${AGENT_NAME}", choose size and colour, and pay ${AGENT_NAME}. ${AGENT_NAME} buys the item from the seller, receives it in its warehouse in China, sends you QC photos, and ships it to you once you choose a shipping line.`,
      more: { href: '/articles/how-to-buy-on-joyagoo', label: 'Step-by-step guide' },
    },
    {
      id: 'price',
      question: 'Is the price in the spreadsheet what I pay in the end?',
      answer: `No. It is the seller's listing price at the time the find was added. ${AGENT_NAME}'s charges, domestic shipping in China, international shipping and import taxes come on top. Prices can also have changed since.`,
    },
    {
      id: 'qc-photos',
      question: 'Are the photos in the spreadsheet QC photos?',
      answer: `No. The spreadsheet shows the sellers' own photos. QC photos are taken by ${AGENT_NAME}'s warehouse once your item has arrived, and you see them in your ${AGENT_NAME} account. Check them before you ship.`,
      more: { href: '/articles/how-to-buy-on-joyagoo#qc-photos', label: 'How QC photos work' },
    },
    {
      id: 'fees',
      question: `What does ${AGENT_NAME} charge, and how can I pay?`,
      answer: `Service charges, shipping prices and payment methods are set by ${AGENT_NAME} and change over time. Check them at checkout in your ${AGENT_NAME} account; we do not quote numbers we cannot keep up to date.`,
    },
    {
      id: 'shipping-eu',
      question: 'What does shipping to Germany or the EU cost in taxes?',
      answer:
        'Germany charges 19 % import VAT on the value of the goods plus shipping plus duty. Since 1 July 2026 the EU charges a fixed €3 customs duty per product category on small parcels under €150, and the EU announced an additional handling fee per parcel from 1 November 2026, whose amount is set separately; check zoll.de for the current figure.',
      more: { href: '/articles/joyagoo-shipping-to-germany', label: 'Shipping and customs guide with sources' },
    },
    {
      id: 'coupons',
      question: `Are there ${AGENT_NAME} coupons?`,
      answer: offerAnswer,
      more: { href: '/articles/joyagoo-coupons-2026', label: 'Coupons and offers' },
    },
    {
      id: 'legit',
      question: `Is ${AGENT_NAME} legit?`,
      answer: `${AGENT_NAME} is a working shopping agent that buyers report receiving parcels from. It has been public since March 2025, is based in China and we cannot see who runs it. Start with a small order and do not keep a large balance in the account.`,
      more: { href: '/articles/is-joyagoo-legit', label: 'What we know, with sources' },
    },
    {
      id: 'replicas',
      question: 'Are the products original branded goods?',
      answer:
        'Many finds are replicas of branded goods. Importing counterfeits can be illegal where you live, and customs can seize them even for private use. We do not check authenticity.',
    },
    {
      id: 'sponsored',
      question: 'What does "Sponsored" mean on a row?',
      answer: 'The seller paid for a higher placement in the spreadsheet. It says nothing about quality.',
    },
    {
      id: 'money',
      question: 'How does this site make money?',
      answer: `Links to ${AGENT_NAME} carry our invite code, so ${AGENT_NAME} pays us a commission when you register and order through them, at no extra cost to you. Sellers can also pay for "Sponsored" placements.`,
    },
    {
      id: 'support',
      question: `Can you help with my ${AGENT_NAME} order?`,
      answer: `No. We have no access to ${AGENT_NAME} accounts or orders. Please contact ${AGENT_NAME} support from your account.`,
    },
    {
      id: 'dead-link',
      question: 'A link is dead. What can I do?',
      answer: `Report it with the dead-link form or by email to ${CONTACT_EMAIL}. Sellers often remove or change listings.`,
      more: { href: '/features/dead-link', label: 'Report a dead link' },
    },
  ];
}

export default function FAQPage() {
  const faqs = buildFaqs();
  const offer = activeOffers()[0]?.headline ?? null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'FAQ', url: URL },
        ]}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span aria-current="page">FAQ</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">Frequently asked questions</h1>
      <p className="mt-2 text-sm text-gray-600">
        By <a href={AUTHOR_URL} className="font-semibold underline underline-offset-2">{AUTHOR_NAME}</a> · Last reviewed{' '}
        <time dateTime={CONTENT_LAST_REVIEWED}>{formatDate(CONTENT_LAST_REVIEWED)}</time>
      </p>
      <Disclosure className="mt-2 text-xs text-gray-500" />

      <div className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {faqs.map((f) => (
          <details key={f.id} id={f.id} open className="group p-5">
            <summary className="cursor-pointer list-none text-lg font-semibold text-gray-900">
              <h2 className="inline">{f.question}</h2>
            </summary>
            <p className="mt-3 text-gray-700 leading-relaxed">{f.answer}</p>
            {f.more ? (
              <p className="mt-2 text-sm">
                <Link href={f.more.href} className="font-medium underline underline-offset-2">
                  {f.more.label}
                </Link>
              </p>
            ) : null}
          </details>
        ))}
      </div>

      <div className="mt-10">
        <AgentCta variant="box" offerHeadline={offer} />
      </div>
    </div>
  );
}
