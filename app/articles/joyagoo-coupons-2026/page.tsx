// app/articles/joyagoo-coupons-2026/page.tsx
// Offers come ONLY from lib/offers.ts via activeOffers(). No invented codes.
import Link from 'next/link';
import ArticleShell from '../_components/ArticleShell';
import AgentCta from '@/components/AgentCta';
import CouponCard from '@/components/CouponCard';
import { articleMetadata, formatDate } from '@/content/articles';
import { activeOffers, OFFERS_CHECKED_ON } from '@/lib/offers';

const SLUG = 'joyagoo-coupons-2026';
export const metadata = articleMetadata(SLUG);

export default function JoyaGooCouponsPage() {
  const offers = activeOffers();
  const offer = offers[0]?.headline ?? null;

  return (
    <ArticleShell
      slug={SLUG}
      lead={
        <>
          This page lists only offers we have seen on joyagoo.com ourselves, with the date we checked. Last check:{' '}
          <time dateTime={OFFERS_CHECKED_ON}>{formatDate(OFFERS_CHECKED_ON)}</time>.
        </>
      }
    >
      <h2 id="current">Current offers</h2>
      {offers.length > 0 ? (
        <div className="grid gap-4">
          {offers.map((o) => (
            <CouponCard key={o.headline} offer={o} />
          ))}
        </div>
      ) : (
        <p>
          There is currently no public JoyaGoo offer that we could confirm. We will list one here as soon as we see it on
          joyagoo.com.
        </p>
      )}
      <p>
        There is no code to copy: JoyaGoo adds new-account coupons to the account after registration. Our register link
        carries our invite code, which earns us a commission; it does not reduce or replace JoyaGoo&apos;s own offer.
      </p>

      <h2 id="how-coupons-work">How JoyaGoo coupons work</h2>
      <p>
        The new-account pack JoyaGoo advertises is a set of vouchers, not cash. The vouchers apply to charges such as
        international shipping or services and come with minimum-spend tiers: a larger voucher needs a larger order or
        shipment. Which vouchers you get, their minimum amounts and their expiry dates are listed in your JoyaGoo account
        after you register. Read the conditions there before you rely on a voucher to make a parcel affordable.
      </p>
      {offer ? (
        <p>
          So the amount in &ldquo;{offer}&rdquo; is the sum of all vouchers in the pack. What you actually save depends
          on how much you ship and whether your orders reach the voucher thresholds.
        </p>
      ) : null}

      <h2 id="fake-codes">Be careful with &ldquo;70 % off&rdquo; codes</h2>
      <p>
        Many coupon and spreadsheet sites publish JoyaGoo codes with huge discounts and countdown timers. We could not
        confirm any of them on joyagoo.com. Earlier versions of this page also listed codes that were not real; we
        removed them. Our rule now: if a discount is not visible on joyagoo.com, we do not publish it. If you see a code
        elsewhere, check in your JoyaGoo account whether it actually works before you plan around it.
      </p>

      <h2 id="save-without-coupons">Saving money without coupons</h2>
      <ul>
        <li>Combine items into one parcel instead of shipping each one separately.</li>
        <li>Use the packing preview (rehearsal) to see the real weight before you pay for shipping.</li>
        <li>Compare shipping lines in your account; cheaper lines are usually slower.</li>
        <li>
          Count import costs in: for Germany and the EU see{' '}
          <Link href="/articles/joyagoo-shipping-to-germany">our customs guide</Link>.
        </li>
      </ul>

      <AgentCta variant="box" offerHeadline={offer} />
    </ArticleShell>
  );
}
