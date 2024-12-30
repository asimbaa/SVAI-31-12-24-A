
import { type DocumentAnalysisResult, type DocumentMetadata, type DocumentType } from './types';
import { DOCUMENT_TYPES } from './documentTypes'; 

export function validateDocument(analysis: any, type?: DocumentType): DocumentAnalysisResult {
  const documentType = analysis.metadata.documentType;
  const config = DOCUMENT_TYPES[documentType];

  if (!config) {
    return {
      isValid: false,
      confidence: 0,
      text: '',
      metadata: {
        documentType: type || 'unknown'
      } as DocumentMetadata,
      issues: ['Unknown document type'],
      suggestions: ['Please ensure you are uploading a supported document type']
    };
  }

  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check required fields
  config.requiredFields.forEach(field => {
    if (!analysis.metadata[field]) {
      issues.push(`Missing required field: ${field}`);
      suggestions.push(`Please ensure ${field} is clearly visible in the document`);
    }
  });

  // Apply validations
  config.validations.forEach(validation => {
    const value = analysis.metadata[validation.field];
    if (value && !validation.rule(value)) {
      issues.push(validation.message);
    }
  });

  // Check image quality
  if (analysis.confidence < 0.8) {
    suggestions.push('Consider uploading a clearer image of the document');
  }

  return {
    isValid: issues.length === 0,
    confidence: analysis.confidence,
    text: analysis.text,
    metadata: analysis.metadata,
    issues: issues.length > 0 ? issues : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined
  };
}