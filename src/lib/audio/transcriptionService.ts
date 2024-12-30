export class TranscriptionService {
  private static instance: TranscriptionService;
  private processingQueue: Promise<any> = Promise.resolve();

  private constructor() {}

  static getInstance(): TranscriptionService {
    if (!TranscriptionService.instance) {
      TranscriptionService.instance = new TranscriptionService();
    }
    return TranscriptionService.instance;
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    return new Promise((resolve, reject) => {
      this.processingQueue = this.processingQueue
        .then(() => this.makeTranscriptionRequest(formData))
        .then(resolve)
        .catch(reject);
    });
  }

  private async makeTranscriptionRequest(formData: FormData): Promise<string> {
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const { text } = await response.json();
      return text;
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  }
}