export interface ProfileFormData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    email: string;
    phone: string;
  };
  educationInfo: {
    level: 'undergraduate' | 'postgraduate';
    institution?: string;
    course?: string;
    startDate?: string;
  };
  visaInfo: {
    type?: string;
    hasDependents: boolean;
    previousTravel: boolean;
    financiallyReady: boolean;
  };
}

export interface ProfileStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

export type ProfileStepId = 'personal' | 'education' | 'visa';