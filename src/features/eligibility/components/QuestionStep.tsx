import { motion } from 'framer-motion';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Tooltip } from '@nextui-org/react';
import { HelpCircle } from 'lucide-react';
import type { Question } from '@/features/eligibility/types';
import { Input } from '@/components/ui/Input';

interface QuestionStepProps {
  question: Question;
  value: string;
  onAnswer: (answer: string) => void;
  previousAnswers?: Record<string, string | undefined>;
}

export function QuestionStep({ question, value, onAnswer, previousAnswers = {} }: QuestionStepProps) {
  if (question.dependsOn) {
    const { field, value: requiredValue } = question.dependsOn;
    if (previousAnswers[field] !== requiredValue) {
      return null;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold">{question.title}</h2>
          <Tooltip
            content={getQuestionTooltip(question.id)}
            placement="right"
            className="max-w-xs bg-black/90 text-white p-3 rounded-lg border border-white/10"
          >
            <button className="text-white/60 hover:text-white">
              <HelpCircle className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
        <p className="text-white/80">{question.description}</p>
      </div>

      {question.type === 'date' ? (
        <Input
          type="date"
          value={value}
          onChange={(e) => onAnswer(e.target.value)}
          min={question.validation?.min?.toString()}
          max={question.validation?.max?.toString()}
          required={question.required}
        />
      ) : question.type === 'select' ? (
        <Select
          value={value}
          placeholder="Select your answer..."
          onChange={(e) => onAnswer(e.target.value)}
          options={question.options?.map(opt => ({
            value: opt,
            label: opt
          })) || []}
          className="w-full"
          aria-label={question.title}
          required={question.required}
        />
      ) : (
        <RadioGroup
          value={value}
          onChange={onAnswer}
          options={question.options?.map(opt => ({
            value: opt,
            label: opt
          })) || []}
          className="space-y-3"
          aria-label={question.title}
          required={question.required}
        />
      )}
    </motion.div>
  );
}

function getQuestionTooltip(questionId: string): string {
  const tooltips: Record<string, string> = {
    course_level: 'Different course levels have varying requirements and durations. Higher-level courses may require previous qualifications.',
    institution: 'A Confirmation of Enrolment (CoE) from a CRICOS registered institution is required for your student visa application.',
    english: 'You must meet the minimum English language requirements. IELTS, TOEFL, and PTE are accepted. Some institutions may have higher requirements.',
    financial_capacity: 'You need to show sufficient funds to cover tuition fees, living costs (AUD 21,041 per year), and travel costs. Bank statements or sponsorship letters are required.',
    age: 'Your age affects visa eligibility and may influence course options. Most student visas require you to be at least 16 years old.',
    study_gap: 'Explain any gaps in your study history. Recent graduates typically have stronger applications.',
    visa_history: 'Previous visa refusals must be declared and may affect your application. Provide detailed explanations if applicable.',
    study_location: 'Regional areas may offer additional benefits and points for permanent residency pathways.',
    health_insurance: 'OSHC is mandatory for the entire duration of your stay in Australia. Compare providers for the best coverage.',
    health_check: 'Health examinations are required for student visas. Any pre-existing conditions should be declared.',
    genuine_student: 'You must demonstrate that you are a genuine temporary entrant (GTE). This includes showing ties to your home country and clear study plans.',
    character: 'Character requirements include police clearances. Any criminal history must be declared.'
  };
  
  return tooltips[questionId] || 'Additional information about this requirement';
}