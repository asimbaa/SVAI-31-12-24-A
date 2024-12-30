export type ApplicationStatus = 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';

export interface Application {
  id: string;
  type: 'scholarship' | 'university';
  referenceId: string; // Scholarship or University ID
  status: ApplicationStatus;
  submittedAt?: string;
  lastUpdated: string;
  documents: Array<{
    name: string;
    status: 'pending' | 'verified' | 'rejected';
    feedback?: string;
  }>;
  timeline: Array<{
    date: string;
    status: ApplicationStatus;
    message: string;
  }>;
  nextSteps?: string[];
}