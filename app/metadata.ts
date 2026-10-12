// app/metadata.ts
// Default metadata for every route. Each page sets its own canonical
// (alternates.canonical) — nothing is inherited from the root on purpose.
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, AGENT_NAME, PUBLISHER_NAME } from '@/lib/site';

const DEFAULT_DESCRIPTION = `Independent ${AGENT_NAME} spreadsheet: community finds from Taobao, Weidian and 1688 with prices, photos and buying guides. Not operated by ${AGENT_NAME}.`;
const COVER = `${SITE_URL}/images/seo-cover.webp`;

export function generateMainMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    authors: [{ name: PUBLISHER_NAME }],
    creator: PUBLISHER_NAME,
    publisher: PUBLISHER_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [{ url: COVER, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [COVER],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.png', type: 'image/png', sizes: '64x64' },
      ],
      apple: '/apple-icon.png',
    },
  };
}
