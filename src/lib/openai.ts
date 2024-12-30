import { OPENAI_API_KEY, AI_CONFIG, SYSTEM_PROMPTS } from './config';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

export async function chatWithGPT(
  message: string,
  context: keyof typeof SYSTEM_PROMPTS = 'immigration'
): Promise<string> {
  const messages: Message[] = [
    { role: 'system', content: SYSTEM_PROMPTS[context] },
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', { 
      method: 'POST',
      signal: AbortSignal.timeout(30000), // 30 second timeout
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages,
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.max_tokens,
        top_p: AI_CONFIG.top_p,
        frequency_penalty: AI_CONFIG.frequency_penalty,
        presence_penalty: AI_CONFIG.presence_penalty
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'The AI service is temporarily unavailable. Please try again later.');
    }

    const data: OpenAIResponse = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('The AI response was incomplete. Please try asking your question again.');
    }

    return data.choices[0].message.content;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('AI Assistant Error:', errorMessage);
    throw new Error(`AI Assistant Error: ${errorMessage}`);
  }
}