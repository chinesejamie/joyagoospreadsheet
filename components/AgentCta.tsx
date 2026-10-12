'use client';

// components/AgentCta.tsx
// The one JoyaGoo sign-up call to action. Tracks `sign_up` (GA4) + Ads
// conversion via TrackSignUpButton's helper and opens the invite link.
// No countdowns, no "ends soon", no invented bonus: the offer text comes
// from lib/offers.ts and disappears automatically when it expires.

import { trackSignupConversion } from '@/lib/gtag-ads';
import { REGISTER_URL, AGENT_LINK_REL, AFFILIATE_NOTE } from '@/lib/site';

interface Props {
  variant?: 'inline' | 'box' | 'button';
  offerHeadline?: string | null;   // pass activeOffers()[0]?.headline from a server component
  className?: string;
  label?: string;
}

export default function AgentCta({ variant = 'button', offerHeadline = null, className = '', label }: Props) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sign_up', { method: 'joyagoo_register', event_label: 'joyagoo_signup' });
    }
    trackSignupConversion(REGISTER_URL);
  };

  const text = label ?? 'Register on JoyaGoo via our link';

  if (variant === 'button') {
    return (
      <a
        href={REGISTER_URL}
        onClick={onClick}
        target="_blank"
        rel={AGENT_LINK_REL}
        className={
          className ||
          'inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-3 text-sm font-bold text-gray-900 shadow hover:bg-primary-600 transition-colors'
        }
      >
        {text} →
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <p className={className || 'text-sm text-gray-700'}>
        New to JoyaGoo?{' '}
        <a href={REGISTER_URL} onClick={onClick} target="_blank" rel={AGENT_LINK_REL} className="font-semibold underline underline-offset-2 hover:text-gray-900">
          Register via our link
        </a>
        {offerHeadline ? <> and get JoyaGoo&apos;s {offerHeadline}.</> : '.'}{' '}
        <span className="text-gray-500">Sponsored link.</span>
      </p>
    );
  }

  return (
    <aside className={className || 'rounded-xl border border-gray-200 bg-gray-50 p-5'} aria-label="JoyaGoo sign-up">
      <h2 className="text-lg font-bold text-gray-900">New to JoyaGoo?</h2>
      <p className="mt-1 text-sm text-gray-700">
        Create your account through our invite link, then open any find below with &ldquo;Open on JoyaGoo&rdquo;.
        {offerHeadline ? <> JoyaGoo currently gives new accounts a {offerHeadline}.</> : null}
      </p>
      <div className="mt-3">
        <a href={REGISTER_URL} onClick={onClick} target="_blank" rel={AGENT_LINK_REL} className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-3 text-sm font-bold text-gray-900 shadow hover:bg-primary-600 transition-colors">
          {text} →
        </a>
      </div>
      <p className="mt-3 text-xs text-gray-500">{AFFILIATE_NOTE}</p>
    </aside>
  );
}
