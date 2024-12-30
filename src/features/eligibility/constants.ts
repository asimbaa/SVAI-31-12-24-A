export const STUDENT_VISA_REQUIREMENTS = {
  FINANCIAL: {
    ANNUAL_LIVING_COST: 21041, // AUD per year
    FIRST_ANNUAL_TUITION: 8000, // Minimum expected
    TRAVEL_COST: 2000, // Minimum expected
  },
  ENGLISH_SCORES: {
    IELTS: {
      MINIMUM: 5.5,
      RECOMMENDED: 6.0,
      PREFERRED: 6.5
    },
    TOEFL: {
      MINIMUM: 46,
      RECOMMENDED: 60,
      PREFERRED: 79
    },
    PTE: {
      MINIMUM: 42,
      RECOMMENDED: 50,
      PREFERRED: 58
    }
  },
  HEALTH_INSURANCE: {
    REQUIRED: true,
    COVERAGE_DURATION: 'Full course duration'
  }
};
export const POINTS_TABLE = {
  age: {
    '18-24': 25,
    '25-32': 30,
    '33-39': 25,
    '40-44': 15,
    '45+': 0
  },
  english: {
    superior: 20,
    proficient: 10,
    competent: 0
  },
  experience: {
    '0-2': 0,
    '3-4': 5,
    '5-7': 10,
    '8+': 15
  }
};

export { eligibilityQuestions as ELIGIBILITY_QUESTIONS } from './constants/questions';