// components/GoogleAnalytics.tsx
'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

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
          
          // Custom Events für KakoBuy Spreadsheet
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
      event_category: 'KakoBuy_Spreadsheet',
      event_label: window.location.pathname,
      ...parameters,
    });
  }
};

// Spezielle Events für KakoBuy
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

// components/TrackSignUpButton.tsx
'use client';

import { useState } from 'react';
import { trackSignupAttempt, trackSignupSuccess } from '@/utils/analytics';

interface TrackSignUpButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function TrackSignUpButton({ 
  className = "bg-primary-500 hover:bg-primary-600 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2",
  children
}: TrackSignUpButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUpClick = () => {
    trackSignupAttempt('button_click');
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Hier würdest du die Email an dein Backend senden
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'main_cta' }),
      });

      if (response.ok) {
        trackSignupSuccess('email');
        setIsSuccess(true);
        // Optional: Redirect to Discord or download page
        setTimeout(() => {
          window.open(process.env.NEXT_PUBLIC_INVITE_URL, '_blank');
        }, 1500);
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`${className} bg-green-500 cursor-default`}>
        <span>✅ Success! Check Your Email</span>
      </div>
    );
  }

  if (showEmailForm) {
    return (
      <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email for instant access..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          {isLoading ? '...' : '🚀 Get Access'}
        </button>
      </form>
    );
  }

  return (
    <button onClick={handleSignUpClick} className={className}>
      {children || (
        <>
          <span>🚀 Join 50,000+ Members FREE</span>
        </>
      )}
    </button>
  );
}

// components/GiveawayForm.tsx - Updated with tracking
'use client';

import { useState } from 'react';
import { trackGiveawayEntry } from '@/utils/analytics';

export function GiveawayForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/giveaway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          timestamp: new Date().toISOString(),
          source: 'main_page_giveaway'
        }),
      });

      if (response.ok) {
        trackGiveawayEntry();
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Giveaway submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-2xl font-bold text-green-700 mb-2">You're In!</h3>
        <p className="text-green-600">
          Thanks for entering! Winner announced February 28, 2025.
          <br />
          Check your email for exclusive bonus coupons!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to enter..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold transition-all ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-lg'
          }`}
        >
          {isSubmitting ? 'Entering...' : '🎁 Enter Now'}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        By entering, you agree to receive our weekly deals newsletter. Unsubscribe anytime.
      </p>
    </form>
  );
}

// API Routes für Backend Integration

// pages/api/signup.ts (oder app/api/signup/route.ts für App Router)
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, source } = req.body;

  try {
    // Hier würdest du die Email in deiner Datenbank speichern
    // Beispiel mit einer hypothetischen Database function:
    // await saveEmailToDatabase(email, source);
    
    // Optional: Send to email marketing service
    // await addToEmailList(email, 'kakobuy-spreadsheet');
    
    // Optional: Send welcome email with download link
    // await sendWelcomeEmail(email);

    console.log(`New signup: ${email} from ${source}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Successfully signed up!' 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process signup' 
    });
  }
}

// pages/api/giveaway.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, timestamp, source } = req.body;

  try {
    // Save giveaway entry to database
    // await saveGiveawayEntry(email, timestamp, source);
    
    console.log(`New giveaway entry: ${email} at ${timestamp}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Giveaway entry successful!' 
    });
  } catch (error) {
    console.error('Giveaway error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process giveaway entry' 
    });
  }
}

// types/global.d.ts - TypeScript types für gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: any
    ) => void;
  }
}

export {};