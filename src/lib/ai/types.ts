export interface AIModel {
  model: any;
  initialize(): Promise<void>;
  predict(input: any): Promise<any>;
}

export interface DocumentAnalysisResult {
  isValid: boolean;
  confidence: number;
  text: string;
  metadata: DocumentMetadata;
  issues?: string[];
  suggestions?: string[];
}

export interface DocumentMetadata {
  documentType?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  documentNumber?: string;
  [key: string]: string | undefined;
}

export interface DocumentRequirement {
  type: string;
  validations: Array<{
    field: string;
    rule: string;
    message: string;
  }>;
  requiredFields: string[];
}