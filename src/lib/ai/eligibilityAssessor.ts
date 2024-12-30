import { AI_CONFIG } from '../config';
import type { EligibilityFormData, EligibilityResult } from '@/features/eligibility/types';

class EligibilityAssessor {
  private static instance: EligibilityAssessor;

  private constructor() {}

  static getInstance(): EligibilityAssessor {
    if (!EligibilityAssessor.instance) {
      EligibilityAssessor.instance = new EligibilityAssessor();
    }
    return EligibilityAssessor.instance;
  }

  async assessEligibility(data: EligibilityFormData): Promise<EligibilityResult> {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const retryDelays = [2000, 4000, 8000]; 
      let currentRequest: Promise<any> | null = null;

      // Check API key first
      if (!apiKey?.trim()) {
        console.error('OpenAI API key not found in environment variables');
        return {
          ...this.getFallbackAssessment(data),
          aiStatus: { error: 'Configuration error', fallback: true }
        };
      }

      // Check network connectivity
      if (!navigator.onLine) {
        return {
          ...this.getFallbackAssessment(data),
          aiStatus: { error: 'Network error - please check your connection', fallback: true }
        };
      }

      const maxRetries = 3;
      let attempts = 0;
      let lastError;

      const prompt = this.constructPrompt(data);
      
      while (attempts < maxRetries) {
        try {
          attempts++;
          console.info(`AI Assessment attempt ${attempts} of ${maxRetries}`);
          
          // Cancel any existing request before starting a new one
          if (currentRequest) {
            currentRequest = null;
          }
          currentRequest = this.callOpenAI(prompt, apiKey.trim());
          const response = await currentRequest;
          const result = this.parseResponse(response);
          return {
            ...result,
            aiStatus: { success: true, attempt: attempts }
          };
        } catch (apiError) {
          lastError = apiError;
          console.warn(`Attempt ${attempts} failed:`, apiError);
          
          // Don't retry on certain errors
          if (apiError.message?.includes('API key') || 
              apiError.message?.includes('quota exceeded')) {
            throw apiError;
          }
          
          // Last attempt failed
          if (attempts === maxRetries) {
            throw apiError;
          }
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelays[attempts - 1]));
        }
      }

      // If we get here, all retries failed
      return {
        ...this.getFallbackAssessment(data),
        aiStatus: {
          error: 'Network error - please check your connection',
          fallback: true,
          attempts: attempts
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('AI assessment failed:', errorMessage);
      return {
        ...this.getFallbackAssessment(data),
        aiStatus: { 
          error: errorMessage,
          fallback: true
        }
      };
    }
  }

  private constructPrompt(data: EligibilityFormData): string {
    return `As an expert Australian immigration consultant, analyze this student visa application data and provide a detailed assessment:

Application Data:
${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}

Current Requirements (2024):
- Genuine Temporary Entrant (GTE)
- Financial capacity (AUD 21,041/year + fees)
- English proficiency (IELTS 5.5+)
- OSHC coverage
- Character and health requirements

Provide assessment as JSON:
{
  "score": number (0-100),
  "isEligible": boolean,
  "feedback": {
    "positives": string[],
    "improvements": string[]
  },
  "nextSteps": string[]
}`;
  }

  private async callOpenAI(prompt: string, apiKey: string): Promise<string> {
    const controller = new AbortController(); 
    const timeoutId = setTimeout(() => controller.abort(), 30000); // Reduce timeout to 30s for faster feedback

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          stream: false,
          messages: [
            {
              role: 'system',
              content: 'You are an expert Australian immigration consultant specializing in student visas. Using GPT-4, provide comprehensive eligibility assessments in valid JSON format only.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: AI_CONFIG.temperature,
          max_tokens: AI_CONFIG.max_tokens,
          response_format: { type: "json_object" }
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = 'API error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorMessage;
        } catch {
          // If error parsing fails, use status text
          errorMessage = response.statusText;
        }

        // Check for specific error types
        if (response.status === 401) {
          throw new Error('Authentication failed - please check API key');
        }
        if (response.status === 429) {
          throw new Error('Too many requests - please try again in a few minutes');
        }
        if (response.status === 500) {
          throw new Error('AI service temporarily unavailable');
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('Invalid response from AI service');
      }

      return content;
    } catch (error) {
      // Enhance error handling with specific error types
      if (error.name === 'AbortError') {
        throw new Error('Network error - please check your connection');
      }
      if (error.name === 'TypeError') {
        throw new Error('Network error - please check your connection');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private parseResponse(response: string): EligibilityResult {
    try {
      // Clean the response string - remove any non-JSON content
      const jsonStr = response.replace(/^[^{]*({.*})[^}]*$/, '$1');
      const result = JSON.parse(jsonStr);
      
      // Validate response structure
      if (!this.isValidResponse(result)) {
        throw new Error('Invalid response format');
      }

      return {
        score: result.score,
        isEligible: result.isEligible,
        feedback: {
          positives: result.feedback.positives,
          improvements: result.feedback.improvements
        },
        nextSteps: result.nextSteps
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw error;
    }
  }

  private isValidResponse(result: any): boolean {
    return (
      typeof result === 'object' &&
      typeof result.score === 'number' &&
      typeof result.isEligible === 'boolean' &&
      Array.isArray(result.feedback?.positives) &&
      Array.isArray(result.feedback?.improvements) &&
      Array.isArray(result.nextSteps)
    );
  }

  private getFallbackAssessment(data: EligibilityFormData): EligibilityResult {
    let score = -1; // Use -1 to indicate fallback data
    const positives: string[] = [];
    const improvements: string[] = [];
    const nextSteps: string[] = [];

    // Course and Institution
    if (data.course_level) {
      if (data.institution === 'Yes, I have a confirmed offer (CoE)') {
        score += 30;
        positives.push('Confirmed offer from Australian institution');
        nextSteps.push('Submit CoE with visa application');
      } else if (data.institution === 'Yes, I have a conditional offer') {
        score += 20;
        positives.push('Conditional offer received');
        improvements.push('Meet offer conditions');
        nextSteps.push('Complete required tests/documents');
      }
    }

    // English Proficiency
    if (data.english?.includes('IELTS')) {
      const score = parseFloat(data.english.split(' ')[1]);
      if (score >= 6.5) {
        score += 25;
        positives.push('Strong English proficiency');
      } else if (score >= 5.5) {
        score += 15;
        positives.push('Meets minimum English requirements');
        improvements.push('Consider improving English score');
      }
    }

    // Financial Capacity
    if (data.financial_capacity === 'Yes, I can demonstrate full financial capacity') {
      score += 25;
      positives.push('Meets financial requirements');
      nextSteps.push('Prepare financial documentation');
    } else {
      improvements.push('Ensure sufficient financial evidence');
      nextSteps.push('Gather financial documents');
    }

    // Health and Character
    if (data.health_insurance === 'Yes, I understand and will arrange OSHC') {
      score += 10;
      positives.push('OSHC requirement understood');
      nextSteps.push('Arrange health insurance');
    }

    if (data.character === 'Yes, I meet all requirements') {
      score += 10;
      positives.push('Meets character requirements');
    }

    return {
      score,
      isEligible: score >= 75,
      feedback: {
        positives,
        improvements
      },
      nextSteps
    };
  }
}

export const eligibilityAssessor = EligibilityAssessor.getInstance();