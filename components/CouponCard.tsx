// components/CouponCard.tsx
// Renders one JoyaGoo offer from lib/offers.ts. No codes, no countdowns:
// the offer is applied by JoyaGoo to new accounts, there is nothing to copy.
import type { Offer } from '@/lib/offers';

function fmt(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function CouponCard({ offer }: { offer: Offer }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-primary-500 bg-white p-5">
      <h3 className="text-lg font-bold text-gray-900">{offer.headline}</h3>
      <p className="mt-2 text-sm text-gray-700">{offer.detail}</p>
      <dl className="mt-3 space-y-1 text-xs text-gray-500">
        <div><dt className="inline font-semibold">Seen at: </dt><dd className="inline">{offer.source}</dd></div>
        <div><dt className="inline font-semibold">Shown here until: </dt><dd className="inline">{fmt(offer.validUntil)} (JoyaGoo can change or end it earlier)</dd></div>
      </dl>
    </div>
  );
}
