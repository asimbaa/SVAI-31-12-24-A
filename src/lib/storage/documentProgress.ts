import { type StoredDocument } from './documentStorage';
import { DOCUMENT_CATEGORIES, type DocumentCategory, getCategoryProgress, CATEGORY_CONFIGS } from '../ai/documentAnalysis/documentCategories';

export interface DocumentProgress {
  totalProgress: number;
  categoryProgress: Record<DocumentCategory, number>;
  missingDocuments: string[];
  nextRequiredDocument?: string;
}

export function calculateDocumentProgress(documents: StoredDocument[]): DocumentProgress {
  const uploadedDocs = documents.map(doc => doc.type);
  const categoryProgress: Record<DocumentCategory, number> = {} as Record<DocumentCategory, number>;
  const missingDocuments: string[] = [];

  // Calculate progress for each category
  Object.values(DOCUMENT_CATEGORIES).forEach(category => {
    const progress = getCategoryProgress(category, uploadedDocs);
    categoryProgress[category] = progress;
    
    if (progress < 100) {
      const config = CATEGORY_CONFIGS[category];
      const missing = config.requiredDocuments.filter(doc => !uploadedDocs.includes(doc));
      missingDocuments.push(...missing);
    }
  });

  // Calculate total progress
  const totalProgress = Object.values(categoryProgress).reduce((sum, p) => sum + p, 0) / 
    Object.keys(categoryProgress).length;

  return {
    totalProgress: Math.round(totalProgress),
    categoryProgress,
    missingDocuments,
    nextRequiredDocument: missingDocuments[0]
  };
}

export function getDocumentStatus(document: StoredDocument): {
  isValid: boolean;
  message: string;
} {
  if (!document.verificationResult) {
    return {
      isValid: false,
      message: 'Document not verified'
    };
  }

  if (!document.verificationResult.isValid) {
    return {
      isValid: false,
      message: document.verificationResult.issues?.[0] || 'Invalid document'
    };
  }

  return {
    isValid: true,
    message: 'Document verified'
  };
}