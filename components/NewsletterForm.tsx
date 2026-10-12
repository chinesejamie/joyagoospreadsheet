// components/NewsletterForm.tsx
// Newsletter sign-up. Fires the GA4 event `newsletter_signup` only; this is
// not an agent sign-up, so no Ads conversion is sent.
'use client';

import { useState } from 'react';
import Link from 'next/link';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ message: data.message || 'Thanks, you are subscribed.', isError: false });
        setEmail('');
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'newsletter_signup', { method: 'newsletter_form' });
        }
      } else {
        setStatus({ message: data.message || 'Something went wrong. Please try again.', isError: true });
      }
    } catch {
      setStatus({ message: 'Something went wrong. Please try again.', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
        required
        placeholder="Your email address"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-primary-500 text-gray-900 rounded-lg font-bold hover:bg-primary-600 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Submitting…' : 'Subscribe'}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Occasional emails about new finds and guides. Unsubscribe any time. See our{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>.
      </p>
      {status && (
        <p className={`mt-2 text-center ${status.isError ? 'text-red-600' : 'text-green-600'}`}>{status.message}</p>
      )}
    </form>
  );
}
