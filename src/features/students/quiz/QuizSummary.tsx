import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Edit2 } from 'lucide-react';

interface QuizSummaryProps {
  questions: Array<{
    id: string;
    text: string;
    type: string;
  }>;
  answers: Record<string, any>;
  onEdit: (index: number) => void;
  onSubmit: () => void;
}

export function QuizSummary({
  questions,
  answers,
  onEdit,
  onSubmit
}: QuizSummaryProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Review Your Answers</h3>
      
      <div className="space-y-4">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-black/20 border border-white/10 rounded-lg"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-medium mb-2">{question.text}</p>
                <p className="text-white/80">
                  {Array.isArray(answers[question.id])
                    ? answers[question.id].join(', ')
                    : answers[question.id]}
                </p>
              </div>
              <button
                onClick={() => onEdit(index)}
                className="text-white/60 hover:text-white"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t border-white/10">
        <Button variant="outline" onClick={() => onEdit(questions.length - 1)}>
          Back to Questions
        </Button>
        <Button onClick={onSubmit}>
          Submit Answers
        </Button>
      </div>
    </div>
  );
}