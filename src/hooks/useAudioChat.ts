import { useState, useCallback } from 'react';
import { AudioProcessor } from '../lib/audio/audioProcessor';

interface UseAudioChatOptions {
  onTranscription: (text: string) => void;
  onError: (error: Error) => void;
}

export function useAudioChat({ onTranscription, onError }: UseAudioChatOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioProcessor] = useState(() => new AudioProcessor());

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await audioProcessor.processStream(stream);
      setIsRecording(true);
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Failed to start recording'));
    }
  }, [onError, audioProcessor]);

  const stopRecording = useCallback(async () => {
    try {
      const audioBlob = await audioProcessor.stopRecording();
      setIsRecording(false);
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('model', 'gpt-4o-mini-audio-preview-2024-12-17');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const { text } = await response.json();
      onTranscription(text);
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Failed to process audio'));
    }
  }, [onTranscription, onError, audioProcessor]);

  return {
    isRecording,
    startRecording,
    stopRecording
  };
}