export type DocumentType = string;

export interface DocumentMetadata {
  documentType: DocumentType;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  documentNumber?: string;
  score?: number;
  testType?: string;
  testDate?: string;
  amount?: number;
  currency?: string;
  [key: string]: any;
}

export interface DocumentAnalysisResult {
  isValid: boolean;
  confidence: number;
  text: string;
  metadata: DocumentMetadata;
  issues?: string[];
  suggestions?: string[];
}

export interface DocumentRequirement {
  type: DocumentType;
  validations: Array<{
    field: string;
    rule: (value: any) => boolean;
    message: string;
  }>;
  requiredFields: string[];
}

export interface DocumentTypeConfig {
  name: string;
  description: string;
  acceptedFormats: string[];
  maxSize: number;
  requiredFields: string[];
  validations: Array<{
    field: string;
    rule: (value: any) => boolean;
    message: string;
  }>;
}