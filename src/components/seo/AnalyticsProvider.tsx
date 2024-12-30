import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeGA, trackPageView, trackEvent } from '@/lib/analytics/gtag';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    // Track page views with full URL and title
    trackPageView(
      location.pathname + location.search,
      document.title
    );

    // Track user engagement after page load
    trackEvent(
      'page_engagement',
      'user_behavior',
      location.pathname
    );
  }, [location]);

  return <>{children}</>;
}