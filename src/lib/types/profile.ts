export interface ProfileData {
  // Personal Information
  personalInfo: {
    fullName: string;
    dateOfBirth?: string;
    nationality: string;
    passportNumber: string;
    passportExpiry?: string;
    email: string;
    phone: string;
    address: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country: string;
    };
  };
  
  // Educational Background
  education?: {
    highestQualification: string;
    institution: string;
    graduationYear?: string;
    fieldOfStudy: string;
    gpa?: string;
    englishProficiency: {
      testType: 'IELTS' | 'TOEFL' | 'PTE' | 'None';
      overallScore?: string;
      listeningScore?: string;
      readingScore?: string;
      writingScore?: string;
      speakingScore?: string;
      testDate?: string;
    };
  };

  // Professional Experience
  experience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
    country: string;
  }>;

  // Visa Information
  visaInfo: {
    intendedCourse?: string;
    preferredInstitutions?: string[];
    studyLevel: 'Undergraduate' | 'Postgraduate' | 'Research' | 'Vocational';
    expectedStartDate?: string;
    hasRefusedVisaBefore: boolean;
    refusedVisaDetails?: string;
    hasCriminalRecord: boolean;
    criminalRecordDetails?: string;
  };

  // Financial Information
  financialInfo: {
    primarySource: 'Self' | 'Family' | 'Loan' | 'Scholarship' | 'Other';
    annualIncome?: string;
    savings?: string;
    hasSponsor: boolean;
    sponsorDetails?: {
      name: string;
      relationship: string;
      occupation: string;
      annualIncome: string;
    };
  };

  // Health Information
  healthInfo: {
    hasHealthConditions: boolean;
    healthConditionDetails?: string;
    hasHealthInsurance: boolean;
    insuranceProvider?: string;
    policyNumber?: string;
    coverageEndDate?: string;
  };

  // Emergency Contacts
  emergencyContacts: Array<{
    name: string;
    relationship: string;
    phone: string;
    email: string;
    address: string;
  }>;

  // Additional Information
  additionalInfo?: {
    hobbies?: string[];
    skills?: string[];
    achievements?: string[];
    references?: Array<{
      name: string;
      position: string;
      organization: string;
      email: string;
      phone: string;
    }>;
  };
}

export type PersonalInfoData = ProfileData['personalInfo'];
export type EducationData = NonNullable<ProfileData['education']>;
export type VisaInfoData = NonNullable<ProfileData['visaInfo']>;
export type FinancialInfoData = NonNullable<ProfileData['financialInfo']>;
export type HealthInfoData = NonNullable<ProfileData['healthInfo']>;
export type EmergencyContactData = NonNullable<ProfileData['emergencyContacts']>[number];
export type AdditionalInfoData = NonNullable<ProfileData['additionalInfo']>;