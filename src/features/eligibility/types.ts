export interface Question {
  id: string;
  title: string;
  description: string;
  type: 'radio' | 'select' | 'text' | 'date';
  options?: string[];
  required?: boolean;
  validation?: {
    min?: string;
    max?: string;
    pattern?: RegExp;
    message?: string;
  };
  dependsOn?: {
    field: string;
    value: string;
  };
}

export interface EligibilityFormData {
  [key: string]: string | undefined;
}

export interface EligibilityResult {
  isEligible: boolean;
  score: number;
  feedback: {
    positives: string[];
    improvements: string[];
  };
  nextSteps: string[];
  aiStatus?: {
    error?: string;
  };
}

export interface EligibilityStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}