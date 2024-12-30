import { useState, useCallback } from 'react';
import { ChatProcessor } from '../lib/chat/chatProcessor';
import { useStreamingChat } from './useStreamingChat';
import { useAudioChat } from './useAudioChat';

export function useChat() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [volume] = useState(0);
  const chatProcessor = ChatProcessor.getInstance();

  const processMessage = useCallback(async (message: string) => {
    setIsProcessing(true);
    try {
      return await chatProcessor.processMessage(message);
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { streamQuestion, isStreaming } = useStreamingChat((question: string) => 
    processMessage(question).then(response => response as Response)
  );

  const { isRecording, startRecording, stopRecording } = useAudioChat({
    onTranscription: async (text) => {
      if (text.trim()) {
        return processMessage(text);
      }
    },
    onError: (error) => {
      console.error('Audio chat error:', error);
    }
  });

  return {
    processMessage,
    isProcessing,
    isStreaming,
    isRecording,
    volume,
    startRecording,
    stopRecording,
    streamQuestion
  };
}