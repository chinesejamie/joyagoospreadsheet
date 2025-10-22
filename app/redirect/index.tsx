// pages/redirect.tsx (für Pages Router)
// oder app/redirect/page.tsx (für App Router)

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// TypeScript Interfaces
interface GTMEvent {
  event: string;
  redirect_url: string;
  event_category: string;
  event_action: string;
}

// Google Analytics Tracking Function
const trackRedirect = (url: string): void => {
  // Google Analytics 4 (gtag)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      transport_type: 'beacon'
    });
  }

  // Alternative: Google Analytics Universal Analytics (ga)
  if (typeof window !== 'undefined' && (window as any).ga) {
    (window as any).ga('send', 'event', 'outbound', 'click', url, {
      transport: 'beacon'
    });
  }

  // Google Tag Manager Event (optional)
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'redirect_click',
      redirect_url: url,
      event_category: 'outbound',
      event_action: 'redirect'
    });
  }
};

const RedirectPage: React.FC = () => {
  const router = useRouter();
  const redirectUrl: string = 'https://www.kakobuy.com/register_sps?affcode=kakobuyspreadsheet';

  useEffect(() => {
    // Track the redirect
    trackRedirect(redirectUrl);
    
    // Small delay to ensure tracking is sent
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 100);

    return () => clearTimeout(timer);
  }, [redirectUrl]);

  const handleManualClick = (): void => {
    trackRedirect(redirectUrl);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <Head>
        <title>Weiterleitung...</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Sie werden automatisch weitergeleitet..." />
      </Head>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px', fontSize: '18px', color: '#333' }}>
          Sie werden weitergeleitet...
        </div>
        <div style={{
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}>
        </div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        
        <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          Falls die automatische Weiterleitung nicht funktioniert,{' '}
          <a 
            href={redirectUrl}
            onClick={handleManualClick}
            style={{ color: '#3498db', textDecoration: 'underline', cursor: 'pointer' }}
          >
            klicken Sie hier
          </a>
        </p>
      </div>
    </div>
  );
};

export default RedirectPage;