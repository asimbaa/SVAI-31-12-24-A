import { useState, useCallback } from 'react';
import { streamResponse } from '../lib/chat/streamingUtils';
import { responseCache } from '../lib/cache/responseCache';

export function useStreamingChat(onAsk: (question: string) => Promise<Response>) {
  const [isStreaming, setIsStreaming] = useState(false);

  const streamQuestion = useCallback(async (
    question: string,
    onChunk: (chunk: string) => void
  ) => {
    // Check cache first
    const cached = responseCache.get(question);
    if (cached) {
      onChunk(cached);
      return;
    }

    setIsStreaming(true);
    let fullResponse = '';

    try {
      const response = await onAsk(question);
      
      for await (const chunk of streamResponse(response)) {
        fullResponse += chunk;
        onChunk(chunk);
      }

      // Cache the complete response
      responseCache.set(question, fullResponse);
    } finally {
      setIsStreaming(false);
    }
  }, [onAsk]);

  return {
    streamQuestion,
    isStreaming
  };
}