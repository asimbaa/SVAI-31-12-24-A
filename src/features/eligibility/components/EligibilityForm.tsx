import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { QuestionStep } from '@/features/eligibility/components/QuestionStep';
import { ProgressTracker } from './ProgressTracker';
import type { EligibilityFormData, Question } from '@/features/eligibility/types';
import { ELIGIBILITY_QUESTIONS } from '../constants';
import { calculateEligibility } from '../utils/calculateEligibility';
import { eligibilityStorage } from '@/lib/storage/eligibilityStorage';

const questions: Question[] = ELIGIBILITY_QUESTIONS;

interface FormErrors {
  [key: string]: string;
}

interface EligibilityFormProps {
  onComplete: (data: EligibilityFormData) => void;
}

export function EligibilityForm({ onComplete }: EligibilityFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    // Pre-filled values
    course_level: 'Bachelor Degree',
    institution: 'Yes, I have a confirmed offer (CoE)',
    english: 'IELTS 7.0 or higher',
    financial_capacity: 'Yes, I can demonstrate full financial capacity',
    age: '2001-01-01',
    study_gap: 'Currently studying',
    visa_history: 'No visa refusals or cancellations',
    study_location: 'Major City (Sydney/Melbourne)',
    health_insurance: 'Yes, I understand and will arrange OSHC',
    health_check: 'Yes, I understand and agree',
    genuine_student: 'Yes, I can explain my study plans',
    character: 'Yes, I meet all requirements'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateStep = (step: number, value: string): boolean => {
    const question = questions[step];
    
    // Skip validation for dependent questions that shouldn't be shown
    if (question.dependsOn) {
      const { field, value: requiredValue } = question.dependsOn;
      if (formData[field] !== requiredValue) {
        return true;
      }
    }

    if (question.required && !value) {
      setErrors({ [question.id]: 'This field is required' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleAnswer = async (answer: string) => {
    if (!validateStep(currentStep, answer)) return;

    const updatedData = {
      ...formData,
      [questions[currentStep].id]: answer
    };
    setFormData(updatedData);

    let nextStep = currentStep + 1;
    while (nextStep < questions.length) {
      const nextQuestion = questions[nextStep];
      if (nextQuestion.dependsOn) {
        const { field, value: requiredValue } = nextQuestion.dependsOn;
        if (updatedData[field] !== requiredValue) {
          nextStep++;
          continue;
        }
      }
      break;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(nextStep);
    } else {
      setIsLoading(true);
      setError(null);
      let retries = 0;
      const maxRetries = 3;
      const retryDelay = 2000; // 2 seconds between retries

      try {
        while (retries < maxRetries) {
          try {
            const result = await calculateEligibility(updatedData);
            
            if (result) {
              // Store eligibility result before completing
              eligibilityStorage.save({
                formData: updatedData,
                result,
                timestamp: Date.now()
              });

              onComplete(updatedData);
              return;
            }
          } catch (err) {
            console.warn(`Attempt ${retries + 1} failed:`, err);
            retries++;
            
            if (retries === maxRetries) {
              throw err;
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          }
        }
        throw new Error('Failed to calculate eligibility after retries');
      } catch (error) {
        console.error('Eligibility assessment failed:', error);
        setError(
          error instanceof Error 
            ? error.message 
            : 'Failed to assess eligibility. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      let prevStep = currentStep - 1;
      while (prevStep >= 0) {
        const prevQuestion = questions[prevStep];
        if (prevQuestion.dependsOn) {
          const { field, value: requiredValue } = prevQuestion.dependsOn;
          if (formData[field] !== requiredValue) {
            prevStep--;
            continue;
          }
        }
        break;
      }
      setCurrentStep(Math.max(0, prevStep));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressTracker
        currentStep={currentStep + 1}
        totalSteps={questions.length}
      />

      <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <QuestionStep
              question={questions[currentStep]}
              value={formData[questions[currentStep].id] || ''}
              onAnswer={handleAnswer}
              previousAnswers={formData}
            />

            {errors[questions[currentStep].id] && (
              <p className="text-sm text-red-400 mt-2">
                {errors[questions[currentStep].id]}
              </p>
            )}

            {errors.general && (
              <p className="text-sm text-red-400 mt-2">
                {errors.general}
              </p>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  const answer = formData[questions[currentStep].id];
                  if (answer) handleAnswer(answer);
                }}
                disabled={!formData[questions[currentStep].id] || isLoading}
              >
                {isLoading ? 'Processing...' : 
                  currentStep === questions.length - 1 ? 'Check Eligibility' : 'Next'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}