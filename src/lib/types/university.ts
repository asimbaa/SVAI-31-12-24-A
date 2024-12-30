export interface University {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  ranking: {
    world?: number;
    national?: number;
    year: number;
  };
  programs: Array<{
    id: string;
    name: string;
    level: 'undergraduate' | 'postgraduate' | 'research' | 'diploma';
    duration: string;
    tuitionFee: {
      amount: number;
      currency: string;
      period: 'year' | 'semester' | 'total';
    };
    intakes: string[];
    requirements: {
      academicScore?: number;
      englishScore?: {
        ielts?: number;
        pte?: number;
        toefl?: number;
      };
      otherRequirements?: string[];
    };
  }>;
  facilities: string[];
  internationalSupport: string[];
  matchScore?: number;
}

export interface UniversityFilters {
  location?: {
    cities?: string[];
    states?: string[];
  };
  ranking?: {
    min?: number;
    max?: number;
  };
  tuitionRange?: {
    min?: number;
    max?: number;
  };
  programLevel?: Array<'undergraduate' | 'postgraduate' | 'research' | 'diploma'>;
  intake?: string[];
}