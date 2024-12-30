import type { EligibilityFormData, EligibilityResult } from '../types';

export function calculatePoints(data: EligibilityFormData): EligibilityResult {
  let score = 0;
  const positives: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];

  // Course and Institution Assessment (30 points)
  if (data.course) {
    if (data.institution === 'Yes, I have a confirmed offer') {
      score += 30;
      positives.push('You have a confirmed offer from an Australian institution');
    } else if (data.institution === 'Yes, I have a conditional offer') {
      score += 25;
      positives.push('You have a conditional offer from an Australian institution');
      improvements.push('Work on meeting the conditions of your offer');
    } else {
      score += 10;
      improvements.push('Secure an offer from an Australian educational institution');
      nextSteps.push('Research and apply to Australian educational institutions');
    }
  }

  // English Language Assessment (30 points)
  if (data.english?.includes('IELTS')) {
    const ieltsScore = parseFloat(data.english.split(' ')[1]);
    if (ieltsScore >= 7.0) {
      score += 30;
      positives.push('Excellent English language proficiency');
    } else if (ieltsScore >= 6.5) {
      score += 25;
      positives.push('Strong English language proficiency');
    } else if (ieltsScore >= 6.0) {
      score += 20;
      positives.push('Satisfactory English language proficiency');
      improvements.push('Consider improving your English score for better opportunities');
    }
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