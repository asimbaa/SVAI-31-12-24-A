import { useState, useCallback } from 'react';
import { ValidationResult } from '@/lib/core/types';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

export function useProfileValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((
    value: any,
    rules: ValidationRules
  ): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (rules.required && !value) {
      errors.push('This field is required');
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Must be at least ${rules.minLength} characters`);
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Must be no more than ${rules.maxLength} characters`);
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push('Invalid format');
    }

    if (rules.custom && !rules.custom(value)) {
      errors.push('Invalid value');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }, []);

  const validateProfile = useCallback((data: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate dependents
    if (!data.dependents) {
      newErrors.dependents = 'Please indicate if you have dependents';
      isValid = false;
    }

    // Validate previous travel
    if (!data.previousTravel) {
      newErrors.previousTravel = 'Please indicate if you have traveled to Australia before';
      isValid = false;
    }

    // Validate financial requirements
    if (!data.financialRequirements) {
      newErrors.financialRequirements = 'Please indicate if you meet the financial requirements';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, []);

  return {
    errors,
    validateField,
    validateProfile
  };
}