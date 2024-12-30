export class AudioProcessor {
  private context: AudioContext;
  private analyser: AnalyserNode;
  private gainNode: GainNode;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor() {
    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.gainNode = this.context.createGain();
    
    // Configure nodes
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 1024;
    
    // Connect nodes
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }

  async processStream(stream: MediaStream): Promise<void> {
    const source = this.context.createMediaStreamSource(stream);
    source.connect(this.gainNode);

    // Initialize MediaRecorder
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.audioChunks.push(e.data);
      }
    };

    this.mediaRecorder.start();
  }

  getVolume(): number {
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray.reduce((a, b) => a + b) / dataArray.length;
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioChunks = [];
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  cleanup(): void {
    this.analyser.disconnect();
    this.gainNode.disconnect();
    
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.stop();
    }
    
    this.context.close();
  }
}