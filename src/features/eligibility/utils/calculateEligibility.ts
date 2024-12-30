import type { EligibilityFormData, EligibilityResult } from '../types';
import { STUDENT_VISA_REQUIREMENTS } from '../constants';

export function calculateEligibility(data: EligibilityFormData): EligibilityResult {
  // Validate input data
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid input data');
  }

  let score = 0;
  const positives: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];

  // Validate required fields
  const requiredFields = ['course_level', 'institution', 'english', 'financial_capacity'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Course and Institution Assessment (30 points)
  if (data.course_level) {
    if (data.institution === 'Yes, I have a confirmed offer (CoE)') {
      score += 30;
      positives.push('You have a confirmed offer from an Australian institution');
      nextSteps.push('Submit your Confirmation of Enrolment (CoE) with your visa application');
    } else if (data.institution === 'Yes, I have a conditional offer') {
      score += 25;
      positives.push('You have a conditional offer from an Australian institution');
      improvements.push('Meet the conditions of your offer letter');
      nextSteps.push('Complete any required English language tests');
      nextSteps.push('Provide academic transcripts and certificates');
    }
  }

  // English Language Assessment (25 points)
  if (data.english?.includes('IELTS')) {
    const ieltsScore = parseFloat(data.english.split(' ')[1]);
    if (ieltsScore >= 7.0) {
      score += 25;
      positives.push('Excellent English language proficiency');
    } else if (ieltsScore >= 6.5) {
      score += 20;
      positives.push('Strong English language proficiency');
    } else if (ieltsScore >= 6.0) {
      score += 15;
      positives.push('Satisfactory English language proficiency');
      improvements.push('Consider improving your English score for better opportunities');
    } else if (ieltsScore >= 5.5) {
      score += 10;
      improvements.push('Work on improving your English language score');
      nextSteps.push('Prepare for another English language test');
    }
  }

  // Financial Capacity Assessment (25 points)
  if (data.financial_capacity === 'Yes, I can demonstrate full financial capacity') {
    score += 25;
    positives.push('You meet the financial requirements');
    nextSteps.push('Prepare bank statements for the last 3-6 months');
  } else if (data.financial_capacity === 'Yes, with family/sponsor support') {
    score += 15;
    positives.push('You have financial support available');
    nextSteps.push('Prepare sponsor documents and financial statements');
    nextSteps.push('Get a signed declaration of financial support');
  } else {
    improvements.push('Ensure you can demonstrate sufficient financial capacity');
    nextSteps.push('Calculate total funds needed for your course duration');
    nextSteps.push('Research scholarship opportunities');
  }

  // Health Insurance and Requirements (20 points)
  if (data.health_insurance === 'Yes, I understand and will arrange OSHC') {
    score += 10;
    positives.push('You understand the health insurance requirements');
    nextSteps.push('Compare OSHC providers and coverage options');
  } else {
    improvements.push('Learn about Overseas Student Health Cover (OSHC) requirements');
    nextSteps.push('Research OSHC providers and coverage options');
  }

  if (data.health_check === 'Yes, I understand and agree') {
    score += 10;
    positives.push('You are prepared for health requirements');
    nextSteps.push('Book health examination with approved panel physician');
  }

  return {
    isEligible: score >= 65,
    score,
    feedback: {
      positives,
      improvements
    },
    nextSteps
  };
}