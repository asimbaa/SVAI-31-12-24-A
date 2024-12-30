import type { DocumentTypeConfig } from './types';

export const DOCUMENT_TYPES: Record<string, DocumentTypeConfig> = {
  passport: {
    name: 'Passport',
    description: 'Valid passport with at least 6 months validity',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
    maxSize: 5 * 1024 * 1024, // 5MB
    requiredFields: ['documentNumber', 'issueDate', 'expiryDate', 'issuingAuthority'],
    validations: [
      {
        field: 'expiryDate',
        rule: (value: string) => new Date(value) > new Date(),
        message: 'Passport must not be expired'
      }
    ]
  },
  academicTranscript: {
    name: 'Academic Transcript',
    description: 'Official academic transcripts and certificates',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
    maxSize: 10 * 1024 * 1024, // 10MB
    requiredFields: ['issueDate', 'issuingAuthority'],
    validations: []
  },
  englishTest: {
    name: 'English Test Results',
    description: 'IELTS, TOEFL, or PTE test results',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
    maxSize: 5 * 1024 * 1024,
    requiredFields: ['testType', 'score', 'testDate'],
    validations: [
      {
        field: 'testDate',
        rule: (value: string) => {
          const testDate = new Date(value);
          const twoYearsAgo = new Date();
          twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
          return testDate > twoYearsAgo;
        },
        message: 'English test must be less than 2 years old'
      },
      {
        field: 'score',
        rule: (value: number) => value >= 0,
        message: 'Invalid test score'
      }
    ]
  },
  financialStatement: {
    name: 'Financial Statement',
    description: 'Bank statements or financial documents',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
    maxSize: 10 * 1024 * 1024,
    requiredFields: ['issueDate', 'amount', 'currency'],
    validations: [
      {
        field: 'amount',
        rule: (value: number) => value > 0,
        message: 'Invalid amount'
      }
    ]
  },
  healthInsurance: {
    name: 'Health Insurance',
    description: 'Overseas Student Health Cover (OSHC)',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.pdf'],
    maxSize: 5 * 1024 * 1024,
    requiredFields: ['issueDate', 'expiryDate', 'policyNumber'],
    validations: [
      {
        field: 'expiryDate',
        rule: (value: string) => new Date(value) > new Date(),
        message: 'Insurance policy must not be expired'
      }
    ]
  }
};

export function getDocumentTypeConfig(type: string): DocumentTypeConfig | undefined {
  return DOCUMENT_TYPES[type];
}

export function validateDocumentType(type: string, file: File): string[] {
  const config = DOCUMENT_TYPES[type];
  const errors: string[] = [];

  if (!config) {
    errors.push('Unsupported document type');
    return errors;
  }

  // Check file format
  const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
  if (!config.acceptedFormats.includes(fileExtension)) {
    errors.push(`Invalid file format. Accepted formats: ${config.acceptedFormats.join(', ')}`);
  }

  // Check file size
  if (file.size > config.maxSize) {
    errors.push(`File too large. Maximum size: ${config.maxSize / (1024 * 1024)}MB`);
  }

  return errors;
}