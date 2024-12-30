export type EventType = 
  | 'journey_started'
  | 'step_completed'
  | 'data_updated'
  | 'document_uploaded'
  | 'quiz_completed'
  | 'visa_selected'
  | 'points_calculated';

export interface AnalyticsEvent {
  type: EventType;
  timestamp: number;
  userId?: string;
  journeyType?: 'student' | 'worker';
  metadata?: Record<string, any>;
}

export interface UserSession {
  sessionId: string;
  startTime: number;
  journeyType?: 'student' | 'worker';
  completedSteps: string[];
  currentStep?: string;
}