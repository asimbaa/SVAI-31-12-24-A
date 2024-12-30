export interface InterviewQuestion {
  id: string;
  question: string;
  tips: string[];
  category: 'general' | 'technical' | 'cultural' | 'language';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface InterviewScenario {
  id: string;
  title: string;
  description: string;
  questions: InterviewQuestion[];
  duration: string;
}

export const mockQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    question: "Why do you want to migrate to Australia?",
    tips: [
      "Focus on positive reasons for choosing Australia",
      "Mention specific aspects of Australian culture that appeal to you",
      "Discuss your professional goals in relation to Australian opportunities"
    ],
    category: "general",
    difficulty: "medium"
  },
  {
    id: "q2",
    question: "How will your skills contribute to the Australian workforce?",
    tips: [
      "Highlight skills that are in demand in Australia",
      "Provide specific examples from your work experience",
      "Connect your expertise to Australian industry needs"
    ],
    category: "technical",
    difficulty: "medium"
  },
  {
    id: "q3",
    question: "How do you plan to adapt to Australian workplace culture?",
    tips: [
      "Show awareness of Australian workplace norms",
      "Discuss previous experience working in diverse environments",
      "Emphasize willingness to learn and adapt"
    ],
    category: "cultural",
    difficulty: "hard"
  }
];

export const mockScenarios: InterviewScenario[] = [
  {
    id: "s1",
    title: "Skilled Migration Interview",
    description: "Practice for your skilled migration visa interview with common questions and scenarios.",
    questions: mockQuestions.filter(q => q.category === 'general' || q.category === 'technical'),
    duration: "30 minutes"
  },
  {
    id: "s2",
    title: "Cultural Adaptation",
    description: "Prepare for questions about cultural integration and workplace adaptation in Australia.",
    questions: mockQuestions.filter(q => q.category === 'cultural'),
    duration: "20 minutes"
  }
];