import { useState, useCallback } from 'react';
import { AudioProcessor } from '../lib/audio/audioProcessor';

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioProcessor] = useState(() => new AudioProcessor());
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await audioProcessor.processStream(stream);
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('Could not access microphone');
      console.error('Recording error:', err);
    }
  }, [audioProcessor]);

  const stopRecording = useCallback(async () => {
    try {
      const audioBlob = await audioProcessor.stopRecording();
      setIsRecording(false);
      return audioBlob;
    } catch (err) {
      setError('Error stopping recording');
      console.error('Stop recording error:', err);
      return null;
    }
  }, [audioProcessor]);

  return {
    isRecording,
    error,
    startRecording,
    stopRecording
  };
}