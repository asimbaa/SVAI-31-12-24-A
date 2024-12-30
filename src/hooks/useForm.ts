import { useState, useCallback } from 'react';
import { validateField } from '@/utils/validation';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    validate?: (value: any) => boolean | string;
  };
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

export function useForm<T extends object>(
  initialValues: T,
  validationRules?: ValidationRules
) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {}
  });

  const validateForm = useCallback(() => {
    if (!validationRules) return true;

    const errors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const value = formState.values[field as keyof T];
      const fieldRules = validationRules[field];
      const error = validateField(value, fieldRules);

      if (error) {
        errors[field as keyof T] = error;
        isValid = false;
      }
    });

    setFormState(prev => ({ ...prev, errors }));
    return isValid;
  }, [formState.values, validationRules]);

  const handleChange = useCallback((
    field: keyof T,
    value: any
  ) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true }
    }));
  }, []);

  const handleBlur = useCallback((field: keyof T) => {
    if (validationRules?.[field as string]) {
      const error = validateField(
        formState.values[field],
        validationRules[field as string]
      );

      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: error },
        touched: { ...prev.touched, [field]: true }
      }));
    }
  }, [formState.values, validationRules]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues: (values: Partial<T>) => setFormState(prev => ({
      ...prev,
      values: { ...prev.values, ...values }
    }))
  };
}