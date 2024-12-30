export async function loadAudioWorklets(context: AudioContext): Promise<void> {
  try {
    await Promise.all([
      context.audioWorklet.addModule('/src/lib/audio/worklets/denoiseProcessor.ts'),
      context.audioWorklet.addModule('/src/lib/audio/worklets/noiseGateProcessor.ts'),
      context.audioWorklet.addModule('/src/lib/audio/worklets/volumeProcessor.ts')
    ]);
  } catch (error) {
    console.warn('Failed to load audio worklets:', error);
  }
}