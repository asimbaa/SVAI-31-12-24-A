interface PointsSections {
  age: number;
  english: number;
  education: number;
  experience: number;
}

export function calculatePoints(sections: PointsSections): number {
  return Object.values(sections).reduce((total, points) => total + points, 0);
}

export function getPointsRecommendations(sections: PointsSections): string[] {
  const recommendations: string[] = [];

  if (sections.english < 20) {
    recommendations.push('Consider improving your English score to gain more points');
  }

  if (sections.education < 15) {
    recommendations.push('Additional qualifications could increase your points');
  }

  if (sections.experience < 10) {
    recommendations.push('Gaining more work experience would add points');
  }

  return recommendations;
}