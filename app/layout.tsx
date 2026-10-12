import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMainMetadata } from './metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData';
import { GTM_ID } from '@/lib/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateMainMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />

        {/* Google Tag Manager (loads GA4 and the TikTok pixel) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
