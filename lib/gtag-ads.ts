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
 * Track a conversion event and open URL in new tab
 * This ensures the conversion is tracked before opening the URL
 * @param url - The URL to open in new tab after tracking (optional)
 * @param eventParameters - Additional event parameters
 */
export const gtagSendEvent = (url?: string, eventParameters?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    console.warn('[GTM] Window not available');
    return false;
  }

  // Flag to prevent double navigation
  let hasOpened = false;

  // Navigation function to open in new tab
  const openInNewTab = () => {
    if (!hasOpened && url) {
      hasOpened = true;
      console.log('[GTM] Opening in new tab:', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Push event to dataLayer for Google Ads
  pushToDataLayer('sign_up', {
    method: 'button_click',
    event_category: 'engagement',
    event_label: 'joyagoo_signup',
    value: 1,
    ...eventParameters,
    event_callback: openInNewTab,
  });

  // Fallback to open in new tab after timeout (in case callback doesn't fire)
  if (url) {
    setTimeout(openInNewTab, 1000);
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
  pushToDataLayer('sign_up', {
    method: 'giveaway_form',
    event_category: 'engagement',
    event_label: 'giveaway_entry',
    value: 1,
  });
};
