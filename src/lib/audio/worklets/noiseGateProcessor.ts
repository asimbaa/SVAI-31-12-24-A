import type { AudioProcessor } from './types';

class NoiseGateProcessor implements AudioProcessor {
  private threshold = -50; // dB
  private attack = 0.01;
  private release = 0.1;
  private envelope = 0;

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0][0];
    const output = outputs[0][0];

    if (!input || !output) return true;

    for (let i = 0; i < input.length; i++) {
      // Calculate signal level in dB
      const level = 20 * Math.log10(Math.abs(input[i] + 1e-10));
      
      // Update envelope
      if (level > this.envelope) {
        this.envelope = this.envelope * (1 - this.attack) + level * this.attack;
      } else {
        this.envelope = this.envelope * (1 - this.release) + level * this.release;
      }

      // Apply gate
      output[i] = this.envelope > this.threshold ? input[i] : 0;
    }

    return true;
  }
}

export { NoiseGateProcessor };