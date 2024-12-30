import { motion } from 'framer-motion';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-white/80">Suggested Questions</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {questions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(question)}
            className="p-3 text-sm text-left text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}