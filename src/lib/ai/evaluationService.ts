import { ValidationResult } from '../core/types';

export class EvaluationService {
  private static instance: EvaluationService;
  private model: any = null;

  private constructor() {}

  static getInstance(): EvaluationService {
    if (!EvaluationService.instance) {
      EvaluationService.instance = new EvaluationService();
    }
    return EvaluationService.instance;
  }

  async initialize() {
    if (!this.model) {
      this.model = {
        process: async (_input: string) => [{
          score: 0.8
        }]
      };
    }
  }

  async evaluateProfile(data: Record<string, any>): Promise<ValidationResult> {
    await this.initialize();

    const input = this.formatProfileData(data);
    const result = await this.model.process(input);

    return this.processEvaluationResult(result);
  }

  private formatProfileData(data: Record<string, any>): string {
    return Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }

  private processEvaluationResult(result: any): ValidationResult {
    const score = result[0].score;
    const isValid = score > 0.7;

    return {
      isValid,
      errors: isValid ? [] : ['Profile does not meet minimum requirements'],
      warnings: score > 0.5 && score <= 0.7 
        ? ['Some aspects of your profile may need improvement']
        : []
    };
  }
}