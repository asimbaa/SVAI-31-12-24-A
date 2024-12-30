// Google Analytics configuration
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
function initializeGA() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
      send_page_view: true
    });
  }
}

// Track page views
function trackPageView(url: string, title?: string) {
  window.gtag?.('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href
  });
}

// Track events
function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
}

// Track user engagement
function trackEngagement(
  type: 'scroll' | 'time' | 'interaction',
  value?: number
) {
  window.gtag?.('event', 'user_engagement', {
    engagement_type: type,
    engagement_value: value
  });
}

// Track form submissions
function trackFormSubmission(
  formName: string,
  success: boolean,
  errorMessage?: string
) {
  window.gtag?.('event', 'form_submission', {
    form_name: formName,
    success: success,
    error_message: errorMessage
  });
}

// Track document downloads
function trackDownload(documentName: string, documentType: string) {
  window.gtag?.('event', 'file_download', {
    file_name: documentName,
    file_type: documentType
  });
}

export {
  GA_TRACKING_ID,
  initializeGA,
  trackPageView,
  trackEvent,
  trackEngagement,
  trackFormSubmission,
  trackDownload
};