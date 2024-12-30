interface VisaData {
  course?: string;
  duration?: string;
  institution?: string;
  skills?: string[];
  experience?: string;
  occupation?: string;
}

export function calculateVisaProbability(data: VisaData): number {
  let score = 0;
  let maxScore = 0;

  // Student visa calculations
  if (data.course && data.duration && data.institution) {
    maxScore += 100;
    
    // Course duration points
    if (data.duration.includes('3+')) score += 30;
    else if (data.duration.includes('2')) score += 25;
    else if (data.duration.includes('1')) score += 20;
    else score += 15;

    // Institution selection points
    if (data.institution === 'Yes') score += 40;
    else if (data.institution === 'Still researching') score += 20;

    // Course field points (simplified)
    if (data.course) score += 30;
  }

  // Worker visa calculations
  if (data.skills && data.experience && data.occupation) {
    maxScore += 100;

    // Skills points
    score += Math.min(data.skills.length * 10, 40);

    // Experience points
    const years = parseInt(data.experience.split(' ')[2]);
    if (years >= 8) score += 40;
    else if (years >= 5) score += 30;
    else if (years >= 3) score += 20;
    else score += 10;

    // Occupation points
    if (data.occupation) score += 20;
  }

  // Convert to percentage
  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
}