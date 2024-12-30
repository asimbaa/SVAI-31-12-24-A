import { useState, useCallback } from 'react';
import { responseCache } from '../lib/cache/responseCache';

export function useDebouncedChat(onAsk: (question: string) => Promise<string>) {
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = useCallback(async (question: string) => {
    // Check cache first
    const cached = responseCache.get(question);
    if (cached) return cached;

    setIsLoading(true);
    try {
      const response = await onAsk(question);
      responseCache.set(question, response);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, [onAsk]);

  return {
    askQuestion,
    isLoading
  };
}