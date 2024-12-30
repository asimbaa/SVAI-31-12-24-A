import { AnalyticsEvent, UserSession } from './types';

class AnalyticsTracker {
  private currentSession: UserSession | null = null;
  private events: AnalyticsEvent[] = [];

  startSession(journeyType?: 'student' | 'worker'): void {
    this.currentSession = {
      sessionId: 'session_' + Date.now(),
      startTime: Date.now(),
      journeyType,
      completedSteps: []
    };
  }

  trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): void {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now()
    };

    this.events.push(fullEvent);
    this.processEvent(fullEvent);
  }

  private processEvent(event: AnalyticsEvent): void {
    if (event.type === 'step_completed' && this.currentSession) {
      this.currentSession.completedSteps.push(event.metadata?.stepId);
    }
  }

  getSessionAnalytics(): {
    duration: number;
    completionRate: number;
    currentStep: string;
  } {
    if (!this.currentSession) {
      return { duration: 0, completionRate: 0, currentStep: '' };
    }

    const duration = Date.now() - this.currentSession.startTime;
    const completionRate = this.currentSession.completedSteps.length / 5; // Assuming 5 total steps

    return {
      duration,
      completionRate,
      currentStep: this.currentSession.currentStep || ''
    };
  }

  getEventsByType(type: AnalyticsEvent['type']): AnalyticsEvent[] {
    return this.events.filter(event => event.type === type);
  }
}

export const analyticsTracker = new AnalyticsTracker();