// lib/offers.ts
// JoyaGoo's own new-account offers, in one place, each with a check date and
// an expiry. Pages hide an offer automatically once `validUntil` has passed.
// Nothing here may be invented: add an entry only after seeing it on
// joyagoo.com (register page, banner or voucher list) and note the date.

export const OFFERS_CHECKED_ON = '2026-10-12';

export interface Offer {
  headline: string;      // e.g. "¥450 coupon pack"
  detail: string;        // what it is, in one sentence
  source: string;        // where it was seen (URL or page element)
  validUntil: string;    // ISO date; use a far date only if JoyaGoo shows none
}

// Filled from the live register page on OFFERS_CHECKED_ON. If the page shows
// nothing, this stays empty and the site shows no coupon claims at all.
export const OFFERS: Offer[] = [
  {
    headline: '¥1,200 coupon pack for new accounts',
    detail: 'JoyaGoo shows "New users sign up to get a 1200CNY coupon pack" in its registration dialog. The pack is a set of shipping/service vouchers with minimum-spend tiers, not cash.',
    source: 'joyagoo.com registration dialog, seen 2026-10-12',
    validUntil: '2026-12-31',
  },
];

export function activeOffers(now = new Date()): Offer[] {
  return OFFERS.filter((o) => new Date(o.validUntil) >= now);
}
