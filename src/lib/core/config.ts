/// <reference types="vite/client" />

export const config = {
  api: {
    baseUrl: 'http://localhost:3000',
    timeout: 10000
  },
  features: {
    aiAssistant: true,
    documentOcr: true,
    translation: true
  },
  limits: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxDocuments: 50,
    maxTranslationsPerDay: 10
  }
} as const;

export {};