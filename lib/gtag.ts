
// lib/gtag.ts - Google Analytics Konfiguration
export const GA_TRACKING_ID: string = 'GA_MEASUREMENT_ID'; // Ersetzen Sie mit Ihrer GA4 Measurement ID

// TypeScript Interfaces
interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Global Window Interface für gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetIdOrAction: string,
      config?: Record<string, any>
    ) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventParams): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Spezielle Funktion für Redirect Tracking
export const trackRedirect = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      transport_type: 'beacon',
      event_callback: () => {
        // Optional: Callback nach erfolgreichem Tracking
        console.log('Redirect tracked successfully');
      }
    });
  }
};