import { DocumentAnalysisResult, DocumentRequirement } from './types';

export class DocumentValidator {
  private static instance: DocumentValidator;
  private requirements: Record<string, DocumentRequirement> = {
    passport: {
      type: 'passport',
      validations: [
        {
          field: 'expiryDate',
          rule: (value: string) => new Date(value) > new Date(),
          message: 'Passport must not be expired'
        },
        {
          field: 'documentNumber',
          rule: (value: string) => Boolean(value),
          message: 'Passport number is required'
        }
      ],
      requiredFields: ['documentNumber', 'issueDate', 'expiryDate', 'issuingAuthority']
    },
    academicTranscript: {
      type: 'academicTranscript',
      validations: [
        {
          field: 'issueDate',
          rule: (value: string) => Boolean(value),
          message: 'Issue date is required'
        }
      ],
      requiredFields: ['issueDate', 'issuingAuthority']
    }
  };

  private constructor() {}

  static getInstance(): DocumentValidator {
    if (!DocumentValidator.instance) {
      DocumentValidator.instance = new DocumentValidator();
    }
    return DocumentValidator.instance;
  }

  validateDocument(result: DocumentAnalysisResult, documentType: string): DocumentAnalysisResult {
    const requirement = this.requirements[documentType];
    if (!requirement) {
      return {
        ...result,
        isValid: false,
        issues: ['Unknown document type']
      };
    }

    const issues: string[] = [];
    const suggestions: string[] = [];

    // Check required fields
    requirement.requiredFields.forEach((field: string) => {
      if (!result.metadata[field]) {
        issues.push(`Missing required field: ${field}`);
      }
    });

    // Apply validations
    requirement.validations.forEach((validation: { field: string; rule: (value: any) => boolean; message: string }) => {
      const value = result.metadata[validation.field];
      if (value && !validation.rule(value)) {
        issues.push(validation.message);
      }
    });

    // Add suggestions for improvement
    if (result.confidence < 0.8) {
      suggestions.push('Consider uploading a clearer image of the document');
    }

    return {
      ...result,
      isValid: issues.length === 0,
      issues,
      suggestions
    };
  }
}