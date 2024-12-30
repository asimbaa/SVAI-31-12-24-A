import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';

interface QuizQuestion {
  id: string;
  label: string;
  type: 'text' | 'select' | 'radio';
  options?: string[];
}

interface QuizQuestionProps {
  question: QuizQuestion;
  value: string;
  onAnswer: (answer: string) => void;
}

export function QuizQuestion({ question, value, onAnswer }: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-white">
        {question.label}
      </label>

      {question.type === 'text' && (
        <Input
          value={value}
          onChange={(e) => onAnswer(e.target.value)}
          className="w-full"
        />
      )}

      {question.type === 'select' && question.options && (
        <Select
          value={value}
          onChange={(e) => onAnswer(e.target.value)}
          options={question.options.map(opt => ({
            value: opt,
            label: opt
          }))}
          placeholder="Select an option..."
        />
      )}

      {question.type === 'radio' && question.options && (
        <RadioGroup
          value={value}
          onChange={onAnswer}
          options={question.options.map(opt => ({
            value: opt,
            label: opt
          }))}
        />
      )}
    </div>
  );
}