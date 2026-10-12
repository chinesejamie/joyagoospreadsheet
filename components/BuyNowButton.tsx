'use client';

// components/BuyNowButton.tsx
// Main CTA on a product page: opens the find on JoyaGoo (invite link,
// rel="sponsored"), fires the GA4 `buy_now_click` event and counts the
// click for the "orders via this sheet" figure.

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AGENT_LINK_REL } from '@/lib/site';

interface Props {
  creatorName: string;
  productId: string;   // Mongo _id, used by /api/products/purchase
  href: string;
}

export default function BuyNowButton({ creatorName, productId, href }: Props) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'buy_now_click', {
        event_category: 'product',
        event_label: `${creatorName}/${productId}`,
      });
    }
    fetch('/api/products/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creatorName, productId }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel={AGENT_LINK_REL}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-8 py-3 text-base font-bold text-gray-900 shadow hover:bg-primary-600 transition-colors sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      Open on JoyaGoo
      <ArrowUpRight size={18} />
    </a>
  );
}
