import { useState, useCallback } from 'react';
import { EvaluationService } from '../lib/ai/evaluationService';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions?: string[];
}

export function useProfileEvaluation() {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const evaluator = EvaluationService.getInstance();

  const evaluateProfile = useCallback(async (data: Record<string, any>) => {
    setIsEvaluating(true);
    try {
      const result = await evaluator.evaluateProfile(data);
      setResult(result);
      return result;
    } finally {
      setIsEvaluating(false);
    }
  }, []);

  return {
    evaluateProfile,
    isEvaluating,
    result
  };
}