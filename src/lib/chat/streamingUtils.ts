export async function* streamResponse(response: Response): AsyncGenerator<string> {
  if (!response.body) throw new Error('No response body');
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.trim()) {
          yield line;
        }
      }
    }
    
    if (buffer) {
      yield buffer;
    }
  } finally {
    reader.releaseLock();
  }
}