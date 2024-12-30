import type { Scholarship, ScholarshipFilters } from '@/lib/types/scholarship';

export function filterScholarships(
  scholarships: Scholarship[],
  filters: ScholarshipFilters
): Scholarship[] {
  return scholarships.filter(scholarship => {
    // Amount range filter
    if (filters.amount) {
      const { min, max } = filters.amount;
      if (min && scholarship.amount.value < min) return false;
      if (max && scholarship.amount.value > max) return false;
    }

    // Coverage type filter
    if (filters.coverage?.length) {
      if (!filters.coverage.includes(scholarship.amount.coverage)) {
        return false;
      }
    }

    // Field of study filter
    if (filters.fieldOfStudy?.length) {
      if (!scholarship.eligibility.fieldOfStudy?.some(
        field => filters.fieldOfStudy?.includes(field)
      )) {
        return false;
      }
    }

    // Nationality filter
    if (filters.nationality?.length) {
      if (scholarship.eligibility.nationalityRequirements &&
          !filters.nationality.some(nat => 
            scholarship.eligibility.nationalityRequirements?.includes(nat)
          )) {
        return false;
      }
    }

    // Deadline range filter
    if (filters.deadlineRange) {
      const deadline = new Date(scholarship.deadline.date);
      const start = new Date(filters.deadlineRange.start);
      const end = new Date(filters.deadlineRange.end);
      if (deadline < start || deadline > end) return false;
    }

    // Status filter
    if (filters.status?.length) {
      if (!filters.status.includes(scholarship.status)) {
        return false;
      }
    }

    return true;
  });
}