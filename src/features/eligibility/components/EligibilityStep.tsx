import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import type { Question } from '../types';

interface EligibilityStepProps {
  question: Question;
  value: string;
  onAnswer: (answer: string) => void;
}

export function EligibilityStep({ question, value, onAnswer }: EligibilityStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {question.type === 'select' ? (
          <Select
            value={value}
            onChange={(e) => onAnswer(e.target.value)}
            options={question.options?.map(opt => ({
              value: opt,
              label: opt
            })) || []}
          />
        ) : question.type === 'radio' ? (
          <RadioGroup
            value={value}
            onChange={onAnswer}
            options={question.options?.map(opt => ({
              value: opt,
              label: opt
            })) || []}
          />
        ) : null}
      </div>
    </div>
  );
}