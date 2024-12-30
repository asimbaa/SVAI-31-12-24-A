import type { Scholarship } from '@/lib/types/scholarship';

interface StudentProfile {
  academicScore: number;
  englishScore: {
    ielts?: number;
    pte?: number;
    toefl?: number;
  };
  fieldOfStudy: string;
  nationality: string;
  achievements?: string[];
}

export function matchScholarships(scholarships: Scholarship[], profile: StudentProfile): Scholarship[] {
  return scholarships.map(scholarship => {
    let score = 0;
    const criteria = scholarship.eligibility;

    // Academic score matching
    if (criteria.academicRequirements.minGPA) {
      if (profile.academicScore >= criteria.academicRequirements.minGPA) {
        score += 30;
      }
    }

    // English score matching
    if (criteria.academicRequirements.minEnglishScore) {
      const { ielts, pte, toefl } = criteria.academicRequirements.minEnglishScore;
      if (
        (ielts && profile.englishScore.ielts && profile.englishScore.ielts >= ielts) ||
        (pte && profile.englishScore.pte && profile.englishScore.pte >= pte) ||
        (toefl && profile.englishScore.toefl && profile.englishScore.toefl >= toefl)
      ) {
        score += 25;
      }
    }

    // Field of study matching
    if (criteria.fieldOfStudy?.includes(profile.fieldOfStudy)) {
      score += 25;
    }

    // Nationality matching
    if (!criteria.nationalityRequirements || 
        criteria.nationalityRequirements.includes(profile.nationality)) {
      score += 20;
    }

    return {
      ...scholarship,
      matchScore: score
    };
  }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}