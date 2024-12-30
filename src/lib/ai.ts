import { type VisaType } from '../data/visaTypes';
import { type DocumentCategory } from '../data/documentChecklists';
import { chatWithGPT } from './openai';

interface UserProfile {
  personalInfo?: Record<string, string>;
  education?: Record<string, string>;
  experience?: Record<string, string>;
  skills?: string[];
}

interface UserPreferences {
  visaType?: string;
  location?: string;
  industry?: string;
}

export interface AIRecommendation {
  confidence: number;
  explanation: string;
  suggestedPath: string[];
}

export interface DocumentAnalysis {
  isValid: boolean;
  confidence: number;
  issues?: string[];
  suggestions?: string[];
}

export const analyzeProfile = async (_userProfile: UserProfile): Promise<AIRecommendation> => {
  const prompt = `Analyze this profile for Australian immigration eligibility:
    ${JSON.stringify(_userProfile)}
    Provide a detailed analysis with next steps.`;
    
  const response = await chatWithGPT(prompt);
  
  // Parse the response and structure it
  return {
    confidence: 0.9,
    explanation: response,
    suggestedPath: extractStepsFromResponse(response)
  };
};

export const recommendVisaType = async (_profile: UserProfile, _preferences: UserPreferences): Promise<VisaType[]> => {
  const prompt = `Based on this profile and preferences, recommend the most suitable Australian visa types:
    Profile: ${JSON.stringify(_profile)}
    Preferences: ${JSON.stringify(_preferences)}
    Provide detailed reasoning for each recommendation.`;
    
  const response = await chatWithGPT(prompt);
  return parseVisaRecommendations(response);
};

export const analyzePotentialPoints = async (
  _profile: UserProfile
): Promise<{
  estimatedPoints: number;
  breakdown: Record<string, number>;
  suggestions: string[];
}> => {
  // Simulate points analysis
  return {
    estimatedPoints: 65,
    breakdown: {
      age: 30,
      education: 15,
      experience: 10,
      english: 10
    },
    suggestions: [
      "Consider improving English score to gain additional points",
      "Gain more work experience in your field"
    ]
  };
};

export const analyzeDocument = async (
  file: File,
  category: string
): Promise<DocumentAnalysis> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  // Simulate document analysis
  return {
    isValid: true,
    confidence: 0.92,
    suggestions: [
      "Ensure document is certified",
      "Include English translation"
    ]
  };
};

export const generateCoverLetter = async (_jobDescription: string, _userProfile: UserProfile): Promise<string> => {
  const prompt = `Generate a cover letter for this job:
    Job Description: ${_jobDescription}
    Profile: ${JSON.stringify(_userProfile)}`;
    
  return await chatWithGPT(prompt, 'immigration');
};

export const prepareInterviewAnswers = async (
  question: string,
  _userProfile: UserProfile
): Promise<{
  suggestedAnswer: string;
  tips: string[];
  relatedQuestions: string[];
}> => {
  const prompt = `Prepare a response for this visa interview question:
    Question: "${question}"
    Applicant Profile: ${JSON.stringify(_userProfile)}
    Provide:
    1. A suggested answer
    2. Important tips
    3. Related questions to prepare for`;
    
  const response = await chatWithGPT(prompt, 'interview');
  return {
    suggestedAnswer: extractAnswer(response),
    tips: extractTips(response),
    relatedQuestions: extractQuestions(response)
  };
};

export const customizeSettlementPlan = async (
  _profile: UserProfile,
  _preferences: UserPreferences
): Promise<{
  timeline: Array<{ phase: string; tasks: string[] }>;
  recommendations: string[];
}> => {
  const prompt = `Create a settlement plan for a Nepalese immigrant moving to Australia:
    Profile: ${JSON.stringify(_profile)}
    Preferences: ${JSON.stringify(_preferences)}
    Include:
    1. Timeline with phases
    2. Specific tasks for each phase
    3. Recommendations`;
    
  const response = await chatWithGPT(prompt, 'settlement');
  return parseSettlementPlan(response);
};

// Helper functions to parse AI responses
function extractStepsFromResponse(response: string): string[] {
  // Implementation to extract steps from the AI response
  return response.split('\n')
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
    .map(line => line.replace(/^[-*]\s+/, '').trim());
}

function parseVisaRecommendations(response: string): VisaType[] {
  // Implementation to parse visa recommendations
  const recommendations: VisaType[] = [];
  try {
    // Parse the response and extract visa recommendations
    const lines = response.split('\n');
    for (const line of lines) {
      if (line.includes('subclass')) {
        // Basic parsing logic - can be enhanced
        const match = line.match(/subclass (\d+)/);
        if (match) {
          const code = match[1];
          recommendations.push({
            code,
            name: line,
            description: '',
            eligibility: [],
            processingTime: '',
            cost: '',
            requirements: [],
            financialRequirements: {
              amount: '',
              details: []
            },
            checklist: []
          });
        }
      }
    }
  } catch (error) {
    console.error('Error parsing visa recommendations:', error);
  }
  return recommendations;
}

function extractAnswer(aiResponse: string): string {
  // Implementation to extract the suggested answer
  const lines = aiResponse.split('\n');
  return lines.length > 0 ? lines[0] : 'No answer available';
}

function extractTips(aiResponse: string): string[] {
  // Implementation to extract tips
  return aiResponse
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().substring(1).trim());
}

function extractQuestions(aiResponse: string): string[] {
  // Implementation to extract related questions
  return aiResponse
    .split('\n')
    .filter(line => line.includes('?'))
    .map(line => line.trim());
}

function parseSettlementPlan(response: string): {
  timeline: Array<{ phase: string; tasks: string[] }>;
  recommendations: string[];
} {
  // Implementation to parse settlement plan
  const timeline: Array<{ phase: string; tasks: string[] }> = [];
  const recommendations: string[] = [];

  try {
    const sections = response.split('\n\n');
    for (const section of sections) {
      if (section.toLowerCase().includes('phase') || section.toLowerCase().includes('stage')) {
        const lines = section.split('\n');
        const phase = lines[0].trim();
        const tasks = lines.slice(1)
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.trim().replace(/^-\s*/, ''));
        
        if (tasks.length > 0) {
          timeline.push({ phase, tasks });
        }
      } else if (section.toLowerCase().includes('recommend')) {
        const lines = section.split('\n');
        recommendations.push(...lines
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.trim().replace(/^-\s*/, '')));
      }
    }
  } catch (error) {
    console.error('Error parsing settlement plan:', error);
  }

  return {
    timeline,
    recommendations
  };
}
export const generateDocumentChecklist = async (
  _visaType: string,
  _userProfile: UserProfile
): Promise<DocumentCategory[]> => {
  // Simulate checklist generation
  return [];
};