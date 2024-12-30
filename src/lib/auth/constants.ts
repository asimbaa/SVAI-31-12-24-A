export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'An account with this email already exists',
  WEAK_PASSWORD: 'Password does not meet security requirements',
  NETWORK_ERROR: 'Unable to connect to authentication service',
  UNKNOWN: 'An unexpected error occurred'
} as const;

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 1,
  PATTERNS: {}
} as const;

export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours