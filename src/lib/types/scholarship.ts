export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string;
  amount: {
    value: number;
    currency: string;
    coverage: 'full' | 'partial' | 'fixed';
    details: string;
  };
  eligibility: {
    academicRequirements: {
      minGPA?: number;
      minEnglishScore?: {
        ielts?: number;
        pte?: number;
        toefl?: number;
      };
      requiredDegrees?: string[];
    };
    nationalityRequirements?: string[];
    fieldOfStudy?: string[];
    otherCriteria?: string[];
  };
  deadline: {
    date: string;
    type: 'rolling' | 'fixed';
    round?: string;
  };
  documents: Array<{
    name: string;
    required: boolean;
    description: string;
  }>;
  status: 'open' | 'closing-soon' | 'closed';
  applicationUrl?: string;
  tags: string[];
  matchScore?: number;
}

export interface ScholarshipFilters {
  amount?: {
    min?: number;
    max?: number;
  };
  coverage?: Array<'full' | 'partial' | 'fixed'>;
  fieldOfStudy?: string[];
  nationality?: string[];
  deadlineRange?: {
    start: string;
    end: string;
  };
  status?: Array<'open' | 'closing-soon' | 'closed'>;
}