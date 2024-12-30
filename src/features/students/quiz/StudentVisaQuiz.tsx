import { useState } from 'react';
import { QuizQuestion } from '@/components/forms/QuizQuestion';
import { Button } from '@/components/ui/Button';

interface StudentVisaQuizProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export const StudentVisaQuiz = ({ data, onUpdate, onNext }: StudentVisaQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 'course',
      label: 'What course are you planning to study?',
      type: 'text' as const,
    },
    {
      id: 'duration',
      label: 'What is the duration of your course?',
      type: 'select' as const,
      options: ['6 months', '1 year', '2 years', '3+ years'],
    },
    {
      id: 'institution',
      label: 'Have you selected an educational institution?',
      type: 'radio' as const,
      options: ['Yes', 'No', 'Still researching'],
    },
  ];

  const handleAnswer = (answer: string) => {
    onUpdate({
      ...data,
      [questions[currentQuestion].id]: answer,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Student Visa Assessment</h2>
      <QuizQuestion
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        value={data[questions[currentQuestion].id]}
      />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => handleAnswer(data[questions[currentQuestion].id])}
          disabled={!data[questions[currentQuestion].id]}
        >
          {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};