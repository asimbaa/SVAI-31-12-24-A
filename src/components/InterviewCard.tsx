import { useState } from 'react';
import { InterviewQuestion } from '../data/interviewData';

interface InterviewCardProps {
  question: InterviewQuestion;
}

export default function InterviewCard({ question }: InterviewCardProps) {
  const [showTips, setShowTips] = useState(false);

  const getDifficultyColor = (difficulty: InterviewQuestion['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium">{question.question}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
      </div>
      
      <div className="mb-4">
        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
          {question.category}
        </span>
      </div>

      <button
        onClick={() => setShowTips(!showTips)}
        className="text-primary hover:text-primary/80 text-sm font-medium"
      >
        {showTips ? 'Hide Tips' : 'Show Tips'}
      </button>

      {showTips && (
        <ul className="mt-4 space-y-2 list-disc pl-5">
          {question.tips.map((tip, index) => (
            <li key={index} className="text-gray-600 text-sm">{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}