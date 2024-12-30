import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { QuizQuestion } from '@/components/forms/QuizQuestion';
import { QuizProgress } from './QuizProgress';
import { QuizSummary } from './QuizSummary';

interface Question {
  id: string;
  label: string;
  text: string;
  type: 'text' | 'select' | 'radio';
  options?: string[];
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    message?: string;
  };
}

interface QuizEngineProps {
  questions: Question[];
  onComplete: (answers: Record<string, any>) => void;
}

export function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentIndex].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  if (showSummary) {
    return (
      <QuizSummary
        questions={questions}
        answers={answers}
        onEdit={(index) => {
          setCurrentIndex(index);
          setShowSummary(false);
        }}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="space-y-8">
      <QuizProgress
        currentStep={currentIndex + 1}
        totalSteps={questions.length}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuizQuestion
            question={questions[currentIndex]}
            value={answers[questions[currentIndex].id]}
            onAnswer={handleAnswer}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentIndex === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[questions[currentIndex].id]}
        >
          {currentIndex === questions.length - 1 ? 'Review' : 'Next'}
        </Button>
      </div>
    </div>
  );
}