export interface UserProfile {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
  };
  questionnaire?: Record<string, string>;
  preferences: {
    emailNotifications: boolean;
    language: string;
    timezone: string;
  };
  applicationDetails: {
    visaType: string;
    applicationStage: string;
    applicationId?: string;
    startDate: string;
  };
}

export const mockProfile: UserProfile = {
  personalInfo: {
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+977 984-1234567",
    dateOfBirth: "1992-05-15",
    nationality: "Nepali",
    passportNumber: "N1234567"
  },
  preferences: {
    emailNotifications: true,
    language: "English",
    timezone: "Asia/Kathmandu"
  },
  applicationDetails: {
    visaType: "189",
    applicationStage: "Skills Assessment",
    applicationId: "IMMI-2024-0123",
    startDate: "2024-01-15"
  }
};