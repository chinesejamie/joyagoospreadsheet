'use client';

import React from 'react';
import { trackSignupConversion } from '@/lib/gtag-ads';

declare global {
  interface Window {
    ttq?: {
      track: (event: string) => void;
      [key: string]: any;
    };
  }
}

interface TrackSignUpButtonProps {
  className?: string;
}

export default function TrackSignUpButton({ className }: TrackSignUpButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track Google Analytics 4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sign_up', {
        method: 'button_click',
        event_category: 'engagement',
        event_label: 'joyagoo_signup',
        value: 1
      });
    }

    // Track TikTok event
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('Subscribe');
    }

    // Track Google Ads conversion with delayed navigation
    const url = process.env.NEXT_PUBLIC_INVITE_URL || 'https://joyagoo.com/register?ref=300000171';
    trackSignupConversion(url);
  };

  const defaultClassName = "bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-gray-900 px-12 py-6 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary-200 hover:shadow-primary-300 flex items-center justify-center gap-2 cursor-pointer";

  return (
    <button
      onClick={handleClick}
      className={className || defaultClassName}
      type="button"
    >
      🚀 Sign Up for JoyaGoo & Get Exclusive Coupons!
    </button>
  );
}
