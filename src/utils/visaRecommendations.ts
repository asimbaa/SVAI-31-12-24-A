interface VisaData {
  skills: string[];
  experience: string;
  points?: {
    totalPoints: number;
  };
}

export function getRecommendedVisas(data: VisaData) {
  const visas = [
    {
      code: '189',
      name: 'Skilled Independent Visa',
      description: 'For skilled workers who want to live and work in Australia permanently.',
      requirements: [
        'Score at least 65 points',
        'Have an occupation on the skilled occupation list',
        'Be under 45 years old'
      ],
      processingTime: '12-18 months'
    },
    {
      code: '190',
      name: 'Skilled Nominated Visa',
      description: 'For skilled workers nominated by a state or territory government.',
      requirements: [
        'Score at least 65 points',
        'Have an occupation on the state nomination list',
        'Be under 45 years old'
      ],
      processingTime: '9-12 months'
    }
  ];

  // Filter visas based on points if available
  if (data.points?.totalPoints) {
    return visas.filter(() => data.points!.totalPoints >= 65);
  }

  return visas;
}