// File: /app/metadata.ts
import { Metadata } from 'next';

// Function to generate metadata for the main pages
export function generateMainMetadata(): Metadata {
  const canonicalUrl = `https://joyagoospreadsheet.com`;

  return {
    metadataBase: new URL('https://joyagoospreadsheet.com'),
    title: 'JoyaGoo Spreadsheet 2026 | #1 Free Price List & QC',
    description: 'Official JoyaGoo Spreadsheet 2026 with 7,500+ verified products, exclusive coupons & QC photos. Best JoyaGoo price list for USA, Germany, Poland. Updated daily. Free access.',
    keywords: [
      // Primary target keyword
      'joyagoo spreadsheet',
      'joyagoo spreadsheet 2026',
      'joyagoo mega spreadsheet',
      'official joyagoo spreadsheet',

      // Geographic modifiers
      'joyagoo spreadsheet usa',
      'joyagoo spreadsheet germany',
      'joyagoo spreadsheet deutschland',
      'joyagoo spreadsheet poland',
      'joyagoo spreadsheet polska',

      // Related high-value keywords
      'joyagoo price list',
      'joyagoo finds',
      'joyagoo product list',
      'joyagoo shopping guide',
      'best joyagoo spreadsheet',
      'joyagoo spreadsheet free',
      'joyagoo spreadsheet download',
      'joyagoo qc photos',
      'joyagoo coupons',
      'joyagoo discount codes',
      'joyagoo link converter',
      'taobao joyagoo',
      'weidian joyagoo',
      '1688 joyagoo',

      // Long-tail variations
      'where to find joyagoo spreadsheet',
      'joyagoo spreadsheet 2026 free',
      'joyagoo spreadsheet with prices',
      'joyagoo verified products',
      'joyagoo seller list',
      'joyagoo spreadsheet taobao links',
      'joyagoo spreadsheet weidian links',

      // German keywords
      'joyagoo tabelle',
      'joyagoo preisliste',
      'joyagoo spreadsheet deutschland',

      // Polish keywords
      'joyagoo arkusz',
      'joyagoo lista',
      'joyagoo spreadsheet polska',
    ].join(', '),
    authors: [{ name: 'JoyaGoo Spreadsheet Team' }],
    creator: 'JoyaGoo Spreadsheet',
    publisher: 'JoyaGoo Spreadsheet',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: 'JoyaGoo Spreadsheet 2026 | 7,500+ Verified Products & QC Photos',
      description: 'The official #1 JoyaGoo spreadsheet with 7,500+ verified products, exclusive coupons, and QC photos. Best price list for USA, Germany, Poland. Updated daily, free access.',
      url: canonicalUrl,
      siteName: 'JoyaGoo Spreadsheet',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://joyagoospreadsheet.com/images/seo-cover.webp',
          width: 1200,
          height: 630,
          alt: 'JoyaGoo Spreadsheet - 7,500+ Verified Products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "JoyaGoo Spreadsheet 2026 | 7,500+ Products, Coupons & QC Photos",
      description: 'Official #1 JoyaGoo spreadsheet: 7,500+ verified products, exclusive coupons, QC photos. Best for USA, Germany, Poland. Free access, updated daily.',
      images: ['https://joyagoospreadsheet.com/images/seo-cover.webp'],
      creator: '@joyagoosheet',
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
