export class AudioManager {
  private audioContext: AudioContext | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  async initialize() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    await this.requestPermissions();
  }

  private async requestPermissions(): Promise<void> {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      throw new Error('Microphone permission denied');
    }
  }

  startRecording(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          this.audioChunks = [];
          resolve();
        };

        this.mediaRecorder.start();
      } catch (error) {
        reject(error);
      }
    });
  }

  stopRecording(): Blob {
    if (!this.mediaRecorder) {
      throw new Error('Recording not started');
    }

    this.mediaRecorder.stop();
    return new Blob(this.audioChunks, { type: 'audio/wav' });
  }

  async playAudio(audioBlob: Blob): Promise<void> {
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    await audio.play();
    URL.revokeObjectURL(url);
  }
}

export const audioManager = new AudioManager();