import type { DocumentType } from './types';

export const DOCUMENT_CATEGORIES = {
  IDENTITY: 'identity',
  ACADEMIC: 'academic',
  FINANCIAL: 'financial',
  HEALTH: 'health',
  EMPLOYMENT: 'employment'
} as const;

export type DocumentCategory = typeof DOCUMENT_CATEGORIES[keyof typeof DOCUMENT_CATEGORIES];

export const CATEGORY_CONFIGS: Record<DocumentCategory, {
  name: string;
  description: string;
  requiredDocuments: string[];
  optionalDocuments: string[];
}> = {
  identity: {
    name: 'Identity Documents',
    description: 'Personal identification documents',
    requiredDocuments: ['passport'],
    optionalDocuments: ['nationalId', 'birthCertificate']
  },
  academic: {
    name: 'Academic Documents',
    description: 'Educational certificates and transcripts',
    requiredDocuments: ['academicTranscript', 'englishTest'],
    optionalDocuments: ['recommendations', 'certificates']
  },
  financial: {
    name: 'Financial Documents',
    description: 'Financial statements and proof of funds',
    requiredDocuments: ['bankStatement', 'financialStatement'],
    optionalDocuments: ['sponsorshipLetter', 'scholarshipLetter']
  },
  health: {
    name: 'Health Documents',
    description: 'Medical and insurance documents',
    requiredDocuments: ['healthInsurance'],
    optionalDocuments: ['medicalCertificate', 'vaccinationRecord']
  },
  employment: {
    name: 'Employment Documents',
    description: 'Work experience and employment records',
    requiredDocuments: [],
    optionalDocuments: ['resume', 'employmentLetter', 'references']
  }
};

export function getRequiredDocuments(category: DocumentCategory): string[] {
  return CATEGORY_CONFIGS[category].requiredDocuments;
}

export function getCategoryProgress(category: DocumentCategory, uploadedDocs: DocumentType[]): number {
  const config = CATEGORY_CONFIGS[category];
  const required = config.requiredDocuments;
  if (required.length === 0) return 100;
  
  const uploadedRequired = required.filter(doc => uploadedDocs.includes(doc));
  return Math.round((uploadedRequired.length / required.length) * 100);
}