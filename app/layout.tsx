import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMainMetadata } from './metadata';
import Header from '@/components/Header';
import TopBanner from '@/components/TopBanner';
import PromoPopup from '@/components/PromoPopup';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData';

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
        {/* Hreflang tags for international SEO */}
        <link rel="alternate" hrefLang="en" href="https://joyagoospreadsheet.com" />
        <link rel="alternate" hrefLang="en-us" href="https://joyagoospreadsheet.com" />
        <link rel="alternate" hrefLang="en-gb" href="https://joyagoospreadsheet.com" />
        <link rel="alternate" hrefLang="de" href="https://joyagoospreadsheet.com" />
        <link rel="alternate" hrefLang="de-de" href="https://joyagoospreadsheet.com" />
        <link rel="alternate" hrefLang="pl" href="https://joyagoospreadsheet.com" />
        <link rel="alternate" hrefLang="pl-pl" href="https://joyagoospreadsheet.com" />
        <link rel="alternate" hrefLang="x-default" href="https://joyagoospreadsheet.com" />

        {/* Structured Data - Organization & Website */}
        <OrganizationSchema />
        <WebSiteSchema />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5Z56S4H7');
            `,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WB49KRXQFM"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WB49KRXQFM', {
                page_path: window.location.pathname,
                debug_mode: true,
              });
            `,
          }}
        />
        {/* End Google Analytics 4 */}

        {/* TikTok Pixel Code Start */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;
                var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){
                  for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);
                  return e;
                };
                ttq.load=function(e,n){
                  var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                  ttq._i=ttq._i||{};
                  ttq._i[e]=[];
                  ttq._i[e]._u=r;
                  ttq._t=ttq._t||{};
                  ttq._t[e]=+new Date;
                  ttq._o=ttq._o||{};
                  ttq._o[e]=n||{};
                  n=document.createElement("script");
                  n.type="text/javascript";
                  n.async=!0;
                  n.src=r+"?sdkid="+e+"&lib="+t;
                  e=document.getElementsByTagName("script")[0];
                  e.parentNode.insertBefore(n,e);
                };
                ttq.load('D04GPGJC77UD5RFHFTTG');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
        {/* TikTok Pixel Code End */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5Z56S4H7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <PromoPopup />
        <TopBanner />
        <Header />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
