// lib/site.ts
// Single source of truth for brand, agent and trust constants.
// Every page, component and schema reads from here. No hard-coded
// agent names, invite links, counts or review dates anywhere else.

import { JOYAGOO_REF } from './joyagooLink';

export const SITE_URL = 'https://joyagoospreadsheet.com';
export const SITE_NAME = 'JoyaGoo Spreadsheet';
export const SITE_SHORT = 'joyagoospreadsheet.com';

export const AGENT_NAME = 'JoyaGoo';
export const AGENT_URL = 'https://joyagoo.com';
export { JOYAGOO_REF };
export const REGISTER_URL = `https://joyagoo.com/register?ref=${JOYAGOO_REF}`;

// rel for every link that leads to JoyaGoo (affiliate / invite link).
export const AGENT_LINK_REL = 'noopener noreferrer sponsored';

// Who runs the site. Independent fan project, not operated by JoyaGoo.
export const CONTACT_EMAIL = 'socialbitesgermany@gmail.com';
export const PUBLISHER_NAME = 'JoyaGoo Spreadsheet (independent)';
export const AUTHOR_NAME = 'Jamie';
export const AUTHOR_URL = `${SITE_URL}/about#jamie`;

// Date the editorial content (guides, FAQ, offers) was last checked by a human.
// Change it only when the content was actually reviewed.
export const CONTENT_LAST_REVIEWED = '2026-10-12';

// Disclosure strings, used inline at CTAs and in the global footer.
export const INDEPENDENT_NOTE =
  'Independent community spreadsheet. Not operated by or affiliated with JoyaGoo.';
export const AFFILIATE_NOTE =
  'Links to JoyaGoo carry our invite code. If you register and order through them, JoyaGoo pays us a commission at no extra cost to you.';

// Boost page id of this site in the shared product database (sellers pay for
// placement on this domain; boosted rows are labelled "Sponsored").
export const BOOST_PAGE_ID = '69651a22477d89367936e6a6';

// FX rates for the "≈ price" column. Source: open.er-api.com (ECB-based),
// read on FX_RATES_DATE. Shown as an approximation only.
export const FX_RATES_DATE = '2026-10-12';
export const CNY_TO_EUR = 0.1333;
export const CNY_TO_USD = 0.1492;
export const CNY_TO_PLN = 0.5805;

// Tracking (shared GTM container; GA4 and TikTok pixel load through it).
export const GTM_ID = 'GTM-5Z56S4H7';

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// Round a live count down to a clean marketing-safe figure (8,320 → "8,300").
export function roundedCount(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '0';
  const step = n >= 10000 ? 500 : n >= 1000 ? 100 : 10;
  return (Math.floor(n / step) * step).toLocaleString('en-US');
}
