import { type Response } from '@/lib/types/api';

export class ChatProcessor {
  private static instance: ChatProcessor;
  private processingQueue: Promise<any> = Promise.resolve();
  private lastRequestTime = 0;
  private readonly REQUEST_INTERVAL = 500;

  private constructor() {}

  static getInstance(): ChatProcessor {
    if (!ChatProcessor.instance) {
      ChatProcessor.instance = new ChatProcessor();
    }
    return ChatProcessor.instance;
  }

  async processMessage(message: string): Promise<Response> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.REQUEST_INTERVAL) {
      await new Promise(resolve => 
        setTimeout(resolve, this.REQUEST_INTERVAL - timeSinceLastRequest)
      );
    }
    this.lastRequestTime = Date.now();

    return new Promise((resolve, reject) => {
      this.processingQueue = this.processingQueue
        .then(() => this.makeRequest(message))
        .then(resolve)
        .catch(reject);
    });
  }

  private async makeRequest(message: string): Promise<Response> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        model: 'gpt-4o-mini-audio-preview-2024-12-17',
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error('Failed to process message');
    }

    return response;
  }

}