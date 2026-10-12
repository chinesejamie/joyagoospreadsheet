import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – JoyaGoo Warm Reminder Remover',
  description: 'Privacy policy of the Chrome extension “JoyaGoo Warm Reminder Remover”. No personal or browsing data is collected, stored or shared.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/joyagoo-warm-reminder-remover/privacy' },
};

const CONTACT_EMAIL = 'socialbitesgermany@gmail.com';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

export default function WarmReminderRemoverPrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Privacy Policy – JoyaGoo Warm Reminder Remover
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Chrome extension “JoyaGoo Warm Reminder Remover” · Last updated: October 12, 2026
        </p>

        <Section title="Summary">
          <p>
            JoyaGoo Warm Reminder Remover does not collect, store, sell or share any personal data or
            browsing data. Everything it does happens locally in your browser. There is no account, no
            analytics and no tracking.
          </p>
        </Section>

        <Section title="What the extension does">
          <p>The extension only runs on pages of joyagoo.com (including its subdomains). There it:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              hides the “Warm Reminder” overlay popup that appears in the first few seconds after a page
              loads (dialogs you open yourself later, such as cart, checkout or address forms, are never
              touched),
            </li>
            <li>shows a short “Popup hidden” confirmation,</li>
            <li>adds a “Check Spreadsheet” button that opens joyagoospreadsheet.com in a new tab.</li>
          </ul>
          <p>
            To do this it only looks at the page structure (the overlay element) in memory on your device.
            It does not read, store or transmit the content of the pages you visit, your account data, your
            orders or anything you type.
          </p>
        </Section>

        <Section title="Data stored on your device">
          <p>
            None. The extension does not use cookies, <code className="px-1 rounded bg-gray-100">chrome.storage</code>,
            local storage or any other storage.
          </p>
        </Section>

        <Section title="Network requests">
          <p>
            The extension makes no network requests of its own. It contains no remote code, no analytics and
            no third-party libraries.
          </p>
          <p>
            When you click “Check Spreadsheet” or a link in the extension popup, a new tab is opened just like
            clicking a normal link. The popup contains a clearly labelled affiliate link to JoyaGoo’s sign-up
            page; if you register through it, we may earn a commission at no extra cost to you. The extension
            never inserts referral codes into pages you visit. What joyagoospreadsheet.com or JoyaGoo do with
            your visit is covered by their own privacy policies.
          </p>
        </Section>

        <Section title="Permissions">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Access to joyagoo.com</strong> – needed to hide the overlay popup and show the
              spreadsheet button on JoyaGoo pages. The extension does not run on any other website.
            </li>
          </ul>
          <p>The extension requests no other permissions.</p>
        </Section>

        <Section title="Chrome Web Store User Data Policy">
          <p>
            The use of information received by this extension adheres to the Chrome Web Store User Data
            Policy, including the Limited Use requirements. No user data is collected, transferred to third
            parties, used for advertising or used to determine creditworthiness.
          </p>
        </Section>

        <Section title="Independence">
          <p>
            JoyaGoo Warm Reminder Remover is an independent, unofficial tool. It is not made by, endorsed by
            or affiliated with JoyaGoo. All brand names belong to their owners.
          </p>
        </Section>

        <Section title="Changes and contact">
          <p>
            If this policy changes, the “Last updated” date above will change. Questions:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>
      </article>
    </div>
  );
}
