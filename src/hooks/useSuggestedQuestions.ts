import { useState, useEffect } from 'react';

const commonQuestions = [
  {
    category: 'Visa',
    questions: [
      "What documents do I need for a student visa?",
      "How long does visa processing usually take?",
      "What are the financial requirements for students?",
      "Can I work while studying in Australia?",
      "How do I prove English proficiency?"
    ]
  },
  {
    category: 'Study',
    questions: [
      "Which universities accept Nepali qualifications?",
      "What are the top courses for international students?",
      "How much are typical tuition fees?",
      "Are scholarships available for Nepali students?",
      "What's the academic calendar in Australia?"
    ]
  },
  {
    category: 'Living',
    questions: [
      "What's the cost of living in major cities?",
      "How do I find student accommodation?",
      "What healthcare coverage do I need?",
      "How's the public transport system?",
      "Can my family visit me while studying?"
    ]
  }
];

export function useSuggestedQuestions() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate number of questions based on screen size
  const getQuestionCount = () => {
    if (screenSize.width >= 1536) return 15; // 2xl
    if (screenSize.width >= 1280) return 12; // xl
    if (screenSize.width >= 1024) return 9;  // lg
    if (screenSize.width >= 768) return 6;   // md
    return 3;                                // sm
  };

  const getSuggestedQuestions = () => {
    const count = getQuestionCount();
    const questions: string[] = [];
    
    // Evenly distribute questions from each category
    const perCategory = Math.floor(count / commonQuestions.length);
    
    commonQuestions.forEach(category => {
      questions.push(...category.questions.slice(0, perCategory));
    });

    // Add remaining questions if any
    const remaining = count - questions.length;
    if (remaining > 0) {
      const extras = commonQuestions
        .flatMap(c => c.questions)
        .filter(q => !questions.includes(q))
        .slice(0, remaining);
      questions.push(...extras);
    }

    return questions;
  };

  return {
    suggestedQuestions: getSuggestedQuestions(),
    screenSize
  };
}