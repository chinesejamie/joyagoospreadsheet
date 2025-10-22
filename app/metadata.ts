// File: /app/metadata.ts
import { Metadata } from 'next';

// Function to generate metadata for the main pages
export function generateMainMetadata(): Metadata {
  const canonicalUrl = `https://kakobuy-spreadsheet.com`;

  return {
    metadataBase: new URL('https://kakobuy-spreadsheet.com'),
    title: 'KakoBuy Spreadsheet 2025 | #1 Price List, Finds & QC Photos - USA, DE, PL',
    description: 'Official KakoBuy Spreadsheet 2025 with 10,000+ verified products, exclusive coupons & QC photos. Best KakoBuy price list for USA, Germany, Poland. Updated daily. Free access.',
    keywords: [
      // Primary target keyword
      'kakobuy spreadsheet',
      'kakobuy spreadsheet 2025',

      // Geographic modifiers
      'kakobuy spreadsheet usa',
      'kakobuy spreadsheet germany',
      'kakobuy spreadsheet deutschland',
      'kakobuy spreadsheet poland',
      'kakobuy spreadsheet polska',

      // Related high-value keywords
      'kakobuy price list',
      'kakobuy finds',
      'kakobuy product list',
      'kakobuy shopping guide',
      'best kakobuy spreadsheet',
      'kakobuy spreadsheet free',
      'kakobuy spreadsheet download',
      'kakobuy qc photos',
      'kakobuy coupons',
      'kakobuy discount codes',

      // Long-tail variations
      'where to find kakobuy spreadsheet',
      'kakobuy spreadsheet 2025 free',
      'kakobuy spreadsheet with prices',
      'kakobuy verified products',
      'kakobuy seller list',

      // German keywords
      'kakobuy tabelle',
      'kakobuy preisliste',

      // Polish keywords
      'kakobuy arkusz',
      'kakobuy lista',
    ].join(', '),
    authors: [{ name: 'KakoBuy Spreadsheet Team' }],
    creator: 'KakoBuy Spreadsheet',
    publisher: 'KakoBuy Spreadsheet',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: 'KakoBuy Spreadsheet 2025 | 10,000+ Verified Products & QC Photos',
      description: 'The official #1 KakoBuy spreadsheet with 10,000+ verified products, exclusive coupons, and QC photos. Best price list for USA, Germany, Poland. Updated daily, free access.',
      url: canonicalUrl,
      siteName: 'KakoBuy Spreadsheet',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://kakobuy-spreadsheet.com/images/seo-cover.webp',
          width: 1200,
          height: 630,
          alt: 'KakoBuy Spreadsheet - 10,000+ Verified Products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "KakoBuy Spreadsheet 2025 | 10,000+ Products, Coupons & QC Photos",
      description: 'Official #1 KakoBuy spreadsheet: 10,000+ verified products, exclusive coupons, QC photos. Best for USA, Germany, Poland. Free access, updated daily.',
      images: ['https://kakobuy-spreadsheet.com/images/seo-cover.webp'],
      creator: '@kakobuysheet',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'en-GB': canonicalUrl,
        'de-DE': canonicalUrl,
        'pl-PL': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },
    verification: {
      // Add your verification codes here when you have them
      google: '',
      yandex: '',
    },
    category: 'Shopping',
  };
}