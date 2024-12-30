import { useEffect } from 'react';
import { analyticsTracker } from '@/lib/analytics/tracker';
import { type EventType } from '@/lib/analytics/types';

export function useAnalytics(journeyType?: 'student' | 'worker') {
  useEffect(() => {
    analyticsTracker.startSession(journeyType);
  }, [journeyType]);

  const trackEvent = (type: EventType, metadata?: Record<string, any>) => {
    analyticsTracker.trackEvent({ type, metadata });
  };

  return { trackEvent };
}