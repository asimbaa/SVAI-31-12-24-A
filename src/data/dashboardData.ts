export interface ApplicationStatus {
  currentStage: string;
  progress: number;
  nextDeadline?: string;
  nextTask?: string;
}

export interface RecentActivity {
  date: string;
  action: string;
  type: 'update' | 'document' | 'deadline' | 'notification';
}

export const mockUserData = {
  applicationStatus: {
    currentStage: "Skills Assessment",
    progress: 35,
    nextDeadline: "2024-03-15",
    nextTask: "Submit English Test Results"
  },
  recentActivities: [
    {
      date: "2024-02-20",
      action: "Skills Assessment submitted to ACS",
      type: "document"
    },
    {
      date: "2024-02-18",
      action: "English Test booked for March 10",
      type: "deadline"
    },
    {
      date: "2024-02-15",
      action: "Document checklist completed",
      type: "update"
    }
  ]
};