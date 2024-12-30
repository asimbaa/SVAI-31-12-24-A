import { storage } from '../utils/storage';

interface CachedResponse {
  response: string;
  timestamp: number;
}

const CACHE_PREFIX = 'ai-responses:';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const responseCache = {
  get(question: string): string | null {
    const cached = storage.get<CachedResponse>(CACHE_PREFIX + question);
    if (!cached) return null;
    
    // Check if cache is still valid
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      storage.remove(CACHE_PREFIX + question);
      return null;
    }
    
    return cached.response;
  },

  set(question: string, response: string): void {
    storage.set(CACHE_PREFIX + question, {
      response,
      timestamp: Date.now()
    });
  }
};