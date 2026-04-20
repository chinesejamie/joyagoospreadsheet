// components/GoogleAnalytics.tsx
'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-WB49KRXQFM';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
          
          // Custom Events für JoyaGoo Spreadsheet
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}

// utils/analytics.ts - Helper functions for tracking
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'JoyaGoo_Spreadsheet',
      event_label: window.location.pathname,
      ...parameters,
    });
  }
};

// Spezielle Events für JoyaGoo
export const trackSignupAttempt = (method: string = 'email') => {
  trackEvent('signup_attempt', {
    event_category: 'User_Acquisition',
    signup_method: method,
    value: 1,
  });
};

export const trackSignupSuccess = (method: string = 'email') => {
  trackEvent('signup_success', {
    event_category: 'Conversion',
    signup_method: method,
    value: 10, // Wert für erfolgreiche Registrierung
  });
};

export const trackSpreadsheetAccess = (category?: string) => {
  trackEvent('spreadsheet_access', {
    event_category: 'Product_Engagement',
    spreadsheet_category: category || 'all',
    value: 5,
  });
};

export const trackCouponClaim = (couponCode: string) => {
  trackEvent('coupon_claim', {
    event_category: 'Promotion',
    coupon_code: couponCode,
    value: 3,
  });
};

export const trackGiveawayEntry = () => {
  trackEvent('giveaway_entry', {
    event_category: 'Marketing',
    value: 2,
  });
};