export interface AudioProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]): boolean;
  port?: MessagePort;
}

export interface AudioWorkletNodeOptions {
  numberOfInputs?: number;
  numberOfOutputs?: number;
  outputChannelCount?: number[];
  parameterData?: { [key: string]: number };
  processorOptions?: any;
  port: MessagePort;
}

declare global {
  function registerProcessor(name: string, processorCtor: new (options: AudioWorkletNodeOptions) => AudioProcessor): void;
}

export {};