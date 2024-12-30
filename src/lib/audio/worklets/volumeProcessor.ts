import type { AudioProcessor, AudioWorkletNodeOptions } from './types';

export class VolumeProcessor implements AudioProcessor {
  private smoothingFactor = 0.8;
  private volume = 0;
  readonly port: MessagePort;

  constructor(options: AudioWorkletNodeOptions) {
    this.port = options.port;
  }

  process(inputs: Float32Array[][]): boolean {
    const input = inputs[0][0];
    
    if (!input) return true;

    // Calculate RMS volume
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * input[i];
    }
    const rms = Math.sqrt(sum / input.length);

    // Smooth the volume
    this.volume = this.smoothingFactor * this.volume + (1 - this.smoothingFactor) * rms;

    // Post volume to main thread
    this.port.postMessage({ volume: this.volume });

    return true;
  }
}

registerProcessor('volume-processor', VolumeProcessor);