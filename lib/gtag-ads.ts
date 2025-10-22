// lib/gtag-ads.ts
// Google Tag Manager / Google Ads conversion tracking utilities

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Push an event to the GTM dataLayer
 * @param eventName - The name of the event
 * @param eventData - Additional event data/parameters
 */
export const pushToDataLayer = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
    console.log('[GTM] Event pushed to dataLayer:', eventName, eventData || {});
  } else {
    console.warn('[GTM] dataLayer not available');
  }
};

/**
 * Track a conversion event with delayed navigation
 * This ensures the conversion is tracked before navigating to a URL
 * @param url - The URL to navigate to after tracking (optional)
 * @param eventParameters - Additional event parameters
 */
export const gtagSendEvent = (url?: string, eventParameters?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    console.warn('[GTM] Window not available');
    return false;
  }

  // Push event to dataLayer
  pushToDataLayer('conversion_event_signup_1', {
    ...eventParameters,
    event_callback: url ? () => {
      window.location.href = url;
    } : undefined,
  });

  // Fallback navigation after timeout
  if (url) {
    setTimeout(() => {
      window.location.href = url;
    }, 2000);
  }

  console.log('[GTM] Signup conversion tracked', url ? `-> ${url}` : '');

  return false;
};

/**
 * Track signup button clicks with delayed navigation
 * Pushes event to GTM dataLayer for Google Ads conversion tracking
 * @param url - The URL to navigate to after tracking
 */
export const trackSignupConversion = (url?: string) => {
  return gtagSendEvent(url);
};

/**
 * Track a simple conversion event without navigation
 * Use this for form submissions or other non-navigation events
 */
export const trackConversionOnly = () => {
  pushToDataLayer('conversion_event_signup_1', {
    event_category: 'signup',
    event_label: 'giveaway_form',
  });
};
