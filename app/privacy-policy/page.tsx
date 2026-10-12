// app/privacy-policy/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { SITE_URL, SITE_NAME, SITE_SHORT, AUTHOR_NAME, CONTACT_EMAIL, GTM_ID, AGENT_NAME } from '@/lib/site';
import { formatDate } from '@/content/articles';

const URL = `${SITE_URL}/privacy-policy`;
const TITLE = 'Privacy policy';
const DESCRIPTION = `What personal data ${SITE_SHORT} processes (analytics, newsletter, server logs), why, and your rights under the GDPR.`;
const LAST_UPDATED = '2026-10-12';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: URL, siteName: SITE_NAME, type: 'website' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Privacy policy', url: URL },
        ]}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span aria-current="page">Privacy policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">Privacy policy</h1>
      <p className="mt-2 text-sm text-gray-500">
        Last updated <time dateTime={LAST_UPDATED}>{formatDate(LAST_UPDATED)}</time>
      </p>

      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gray-800 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_a]:underline [&_a]:underline-offset-2">
        <h2 id="responsible">1. Who is responsible</h2>
        <p>
          Responsible for data processing on {SITE_SHORT}: {AUTHOR_NAME}, contact via{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          {/* TODO_ADDRESS: postal address of the responsible person (required for Impressum / Art. 13 GDPR) is still missing. Add it here and on an Impressum page. */}
        </p>
        <p>
          This site is an independent spreadsheet and is not operated by {AGENT_NAME}. When you follow a link to{' '}
          {AGENT_NAME}, {AGENT_NAME}&apos;s own privacy policy applies there.
        </p>

        <h2 id="hosting">2. Hosting and server logs</h2>
        <p>
          The site runs on a virtual server in Germany (nginx web server). Requests pass through Cloudflare, which acts
          as a reverse proxy and content delivery network and therefore processes your IP address and request data.
          The web server and Cloudflare record technical log data: IP address, date and time, requested URL, referrer,
          browser and operating system (user agent) and status code. We use these logs to run the site, fix errors and
          defend against attacks (legal basis: Art. 6(1)(f) GDPR, legitimate interest in a secure, working website).
          Logs are kept only as long as needed for these purposes and then deleted or rotated. Cloudflare may process
          data outside the EU; Cloudflare relies on the EU-US Data Privacy Framework and standard contractual clauses.
        </p>

        <h2 id="analytics">3. Analytics and advertising pixels</h2>
        <p>
          We use Google Tag Manager (container {GTM_ID}). Through it we load Google Analytics 4 and the TikTok pixel.
        </p>
        <ul>
          <li>
            <strong>Google Analytics 4</strong> (Google Ireland Ltd.) measures page views, clicks on links such as
            &ldquo;Open on {AGENT_NAME}&rdquo; and sign-ups, using cookies and a pseudonymous identifier.
          </li>
          <li>
            <strong>TikTok pixel</strong> (TikTok Technology Ltd., Ireland) measures visits from TikTok and the success of
            our TikTok content and ads, using cookies and similar technology.
          </li>
          <li>
            <strong>Google Tag Manager</strong> only loads these tools; it does not store analytics data itself, but your
            browser connects to Google servers when it loads.
          </li>
        </ul>
        <p>
          These providers may transfer data to the USA or China (TikTok). Google relies on the EU-US Data Privacy
          Framework. Legal basis is your consent (Art. 6(1)(a) GDPR, § 25(1) TDDDG) where required. You can block these
          tools at any time with your browser settings or a content blocker.
        </p>

        <h2 id="newsletter">4. Newsletter</h2>
        <p>
          If you enter your email address in the newsletter form, we store it in our MongoDB database on our server to
          send you occasional updates about new finds and guides (legal basis: your consent, Art. 6(1)(a) GDPR). We
          store it until you unsubscribe or ask us to delete it by writing to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2 id="dead-links">5. Dead-link reports</h2>
        <p>
          When you report a dead link, the links you enter and, if you provide it, your email address are forwarded to
          our internal Discord channel so we can fix the link and let you know. Legal basis: Art. 6(1)(b) and (f) GDPR.
          Discord Inc. is based in the USA. We delete the report once it is handled.
        </p>

        <h2 id="email">6. Email contact</h2>
        <p>
          If you email us, we use your address and message only to answer you and delete them when the matter is closed,
          unless we have to keep them for legal reasons.
        </p>

        <h2 id="links">7. Links to {AGENT_NAME}</h2>
        <p>
          Links to {AGENT_NAME} contain our invite code. {AGENT_NAME} can see that you came from us. We do not receive
          your {AGENT_NAME} account data, orders or payment details.
        </p>

        <h2 id="rights">8. Your rights</h2>
        <p>Under the GDPR you have the right to:</p>
        <ul>
          <li>access the personal data we hold about you (Art. 15),</li>
          <li>have it corrected (Art. 16) or deleted (Art. 17),</li>
          <li>restrict its processing (Art. 18),</li>
          <li>receive it in a portable format (Art. 20),</li>
          <li>object to processing based on legitimate interest (Art. 21),</li>
          <li>withdraw consent at any time, with effect for the future (Art. 7(3)),</li>
          <li>complain to a data protection supervisory authority (Art. 77).</li>
        </ul>
        <p>
          To use these rights, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2 id="changes">9. Changes</h2>
        <p>We update this policy when the site changes. The date at the top shows the current version.</p>
      </div>
    </div>
  );
}
