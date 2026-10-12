'use client';

import React, { useState } from 'react';

export default function DeadLinkForm() {
  const [productLinkSpreadsheet, setProductLinkSpreadsheet] = useState('');
  const [productLinkSource, setProductLinkSource] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/report-dead-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productLinkSpreadsheet,
          productLinkSource,
          email,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setProductLinkSpreadsheet('');
        setProductLinkSource('');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Report a dead link</h1>
        <p className="text-gray-600">
          Sellers often remove or change listings. Paste the spreadsheet link and the seller link. Leave an email if you
          want a reply once we have fixed or removed the find.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Spreadsheet link</label>
          <input
            type="url"
            value={productLinkSpreadsheet}
            onChange={(e) => setProductLinkSpreadsheet(e.target.value)}
            required
            placeholder="https://joyagoospreadsheet.com/..."
            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Seller link (Taobao / Weidian / 1688)</label>
          <input
            type="url"
            value={productLinkSource}
            onChange={(e) => setProductLinkSource(e.target.value)}
            required
            placeholder="https://item.taobao.com/..."
            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Your email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Submitting...' : 'Send report'}
        </button>

        {status === 'success' && (
          <div className="text-green-600 text-sm text-center mt-4">Thanks, we have received your report.</div>
        )}
        {status === 'error' && (
          <div className="text-red-600 text-sm text-center mt-4">Something went wrong. Please try again.</div>
        )}
      </form>
    </div>
  );
}
