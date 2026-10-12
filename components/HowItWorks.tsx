// components/HowItWorks.tsx – server component. Four buying steps, no invented
// fees, days or shipping lines.
import Link from 'next/link';

const STEPS: Array<{ title: string; text: string }> = [
  { title: 'Register via our link', text: 'Create a JoyaGoo account through the invite link on this page.' },
  { title: 'Pick a find', text: 'Choose a row in the spreadsheet and click “Open on JoyaGoo”. Add the size and colour you want to your cart.' },
  { title: 'JoyaGoo buys it', text: 'JoyaGoo orders the item from the Chinese seller. Once it reaches their warehouse, QC photos arrive in your account.' },
  { title: 'Ship it', text: 'Choose a shipping line for your parcel and send it to your address.' },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-to-buy" className="mt-12">
      <h2 id="how-to-buy" className="text-xl font-bold text-gray-900">How to buy with the JoyaGoo spreadsheet</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-gray-200 bg-white p-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-800">{i + 1}</span>
            <h3 className="mt-2 font-semibold text-gray-900">{s.title}</h3>
            <p className="mt-1 text-sm text-gray-700">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-gray-600">
        Fees and shipping lines are set by JoyaGoo and change; check them in your JoyaGoo account before you order.{' '}
        <Link href="/articles/how-to-buy-on-joyagoo" className="font-semibold text-gray-900 underline underline-offset-2">Full guide</Link>
      </p>
    </section>
  );
}
