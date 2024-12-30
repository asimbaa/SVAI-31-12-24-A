import { motion } from 'framer-motion';
import type { EligibilityResult } from '../types';
import { NextStepsGuide } from '@/components/eligibility/NextStepsGuide';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '@/lib/storage/authStorage';

interface EligibilityResultProps {
  result: EligibilityResult;
  onReset: () => void;
}

export function EligibilityResult({ result, onReset }: EligibilityResultProps) {
  const navigate = useNavigate();

  // Early return if result or feedback is missing
  if (!result?.feedback?.positives || !result?.feedback?.improvements) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center"
      >
        <p className="text-white/80">Unable to calculate eligibility. Please try again.</p>
        <button
          onClick={onReset}
          className="mt-4 text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80"
        >
          Try Again
        </button>
      </motion.div>
    );
  }
  const handleStartApplication = () => {
    authStorage.updateEligibilityData({ result });
    navigate('/register');
  };

  if (!result?.feedback) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10"
    >
      <div className="text-center mb-8">
        <div className={`text-2xl font-bold mb-2 ${
          result.isEligible ? 'text-green-400' : 'text-yellow-400'
        }`}>
          {result.isEligible ? 'You are eligible!' : 'Almost there!'}
        </div>
        <div className="text-4xl font-bold text-[hsl(var(--gold))] mb-4">
          {result.score}% Match
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {result.feedback?.positives?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-400">Strengths</h3>
            <ul className="space-y-2">
              {result.feedback.positives.map((item, index) => (
                <li key={index} className="flex items-center text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.feedback?.improvements?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Areas to Improve</h3>
            <ul className="space-y-2">
              {result.feedback.improvements.map((item, index) => (
                <li key={index} className="flex items-center text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <NextStepsGuide steps={result.nextSteps} />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onReset}
          className="text-white/60 hover:text-white"
        >
          Check Again
        </button>
        <button
          onClick={handleStartApplication}
          className="bg-[hsl(var(--gold))] text-[hsl(var(--navy))] px-6 py-2 rounded-lg hover:bg-[hsl(var(--gold))]/90"
        >
          Start Application
        </button>
      </div>
    </motion.div>
  );
}