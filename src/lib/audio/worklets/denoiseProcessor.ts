import type { AudioProcessor } from './types';

class DenoiseProcessor implements AudioProcessor {
  private readonly bufferSize = 2048;
  private readonly smoothingFactor = 0.2;
  private noiseProfile = new Float32Array(this.bufferSize);
  private initialized = false;

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0][0];
    const output = outputs[0][0];

    if (!input || !output) return true;

    // Initialize noise profile from first few frames
    if (!this.initialized) {
      this.noiseProfile.set(input);
      this.initialized = true;
      return true;
    }

    // Apply noise reduction
    for (let i = 0; i < input.length; i++) {
      // Estimate noise using exponential smoothing
      this.noiseProfile[i] = this.smoothingFactor * Math.abs(input[i]) + 
        (1 - this.smoothingFactor) * this.noiseProfile[i];

      // Subtract estimated noise
      output[i] = input[i] - this.noiseProfile[i];
    }

    return true;
  }
}

export { DenoiseProcessor };