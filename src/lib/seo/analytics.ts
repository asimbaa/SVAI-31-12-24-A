declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_TRACKING_ID = 'G-C0LZL0C248';

// Initialize analytics tracking
export function initAnalytics() {
  // Track page views
  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined') {
      window.gtag?.('config', GA_TRACKING_ID, {
        page_path: url,
        page_title: document.title
      });
    }
  };

  // Track user engagement
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined') {
      window.gtag?.('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  // Track form submissions
  const trackFormSubmission = (formName: string, success: boolean) => {
    trackEvent(
      'form_submission',
      'forms',
      formName,
      success ? 1 : 0
    );
  };

  // Track document downloads
  const trackDownload = (documentName: string) => {
    trackEvent(
      'download',
      'documents',
      documentName
    );
  };

  // Track user authentication
  const trackAuth = (action: 'login' | 'register' | 'logout', success: boolean) => {
    trackEvent(
      action,
      'authentication',
      success ? 'success' : 'failure'
    );
  };

  return {
    trackPageView,
    trackEvent,
    trackFormSubmission,
    trackDownload,
    trackAuth
  };
}