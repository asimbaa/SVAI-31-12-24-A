interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  validate?: (value: any) => boolean | string;
}

export function validateField(value: any, rules: ValidationRule): string | undefined {
  if (rules.required && !value) {
    return 'This field is required';
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (rules.validate) {
    const result = rules.validate(value);
    if (typeof result === 'string') {
      return result;
    }
    if (!result) {
      return 'Invalid value';
    }
  }

  return undefined;
}

export const emailValidation = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  validate: (email: string) => {
    if (!email.includes('.')) return 'Invalid email format';
    return true;
  }
};

export const passwordValidation = {
  required: true,
  minLength: 8,
  validate: (password: string) => {
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return true;
  }
};

export const phoneValidation = {
  pattern: /^\+?[\d\s-]{8,}$/,
  validate: (phone: string) => {
    if (!/^\+/.test(phone)) {
      return 'Phone number must include country code';
    }
    return true;
  }
};