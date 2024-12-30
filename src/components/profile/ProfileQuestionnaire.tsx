import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'radio' | 'number';
  options?: string[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}

const questions: Question[] = [
  {
    id: 'dependents',
    text: 'Do you have any dependents who will be traveling with you?',
    type: 'radio',
    options: ['Yes', 'No'],
    validation: { required: true }
  },
  {
    id: 'previousTravel',
    text: 'Have you traveled to Australia before?',
    type: 'radio',
    options: ['Yes', 'No'],
    validation: { required: true }
  },
  {
    id: 'financialRequirements',
    text: 'Do you meet the financial requirements? (Minimum AUD $21,041 per year)',
    type: 'radio',
    options: ['Yes', 'No', 'Not Sure'],
    validation: { required: true }
  }
];

interface ProfileQuestionnaireProps {
  onComplete: (data: Record<string, string>) => void;
}

export function ProfileQuestionnaire({ onComplete }: ProfileQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validateAnswer = (question: Question, value: string): string | undefined => {
    if (question.validation?.required && !value) {
      return 'This field is required';
    }
    if (question.validation?.pattern && !question.validation.pattern.test(value)) {
      return 'Invalid format';
    }
    return undefined;
  };

  const handleNext = () => {
    const question = questions[currentQuestion];
    const error = validateAnswer(question, answers[question.id] || '');
    
    if (error) {
      setErrors(prev => ({ ...prev, [question.id]: error }));
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">{currentQ.text}</h3>
        
        {currentQ.type === 'radio' && currentQ.options && (
          <div className="space-y-2">
            {currentQ.options.map(option => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option}
                  checked={answers[currentQ.id] === option}
                  onChange={e => {
                    setAnswers(prev => ({
                      ...prev,
                      [currentQ.id]: e.target.value
                    }));
                    setErrors(prev => ({
                      ...prev,
                      [currentQ.id]: undefined
                    }));
                  }}
                  className="h-4 w-4 text-[hsl(var(--gold))] border-white/10 focus:ring-[hsl(var(--gold))]/20"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        )}

        {errors[currentQ.id] && (
          <p className="text-sm text-red-500">{errors[currentQ.id]}</p>
        )}
      </motion.div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentQuestion === 0}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}