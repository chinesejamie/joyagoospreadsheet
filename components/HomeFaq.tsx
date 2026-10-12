// components/HomeFaq.tsx – server component. Visible FAQ; the page passes the
// same plain-text answers to FAQSchema so markup and visible text match.
import type { ReactNode } from 'react';

export interface HomeFaqItem {
  question: string;
  answer: string;       // plain text, used for FAQSchema
  body: ReactNode;      // visible answer (may contain links)
}

export default function HomeFaq({ items }: { items: HomeFaqItem[] }) {
  return (
    <section aria-labelledby="faq" className="mt-12">
      <h2 id="faq" className="text-xl font-bold text-gray-900">JoyaGoo spreadsheet FAQ</h2>
      <div className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {items.map((f) => (
          <div key={f.question} className="p-4">
            <h3 className="font-semibold text-gray-900">{f.question}</h3>
            <div className="mt-1 text-sm leading-relaxed text-gray-700">{f.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
