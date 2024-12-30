import { motion } from 'framer-motion';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressTracker({ currentStep, totalSteps }: ProgressTrackerProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-white/60">{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[hsl(var(--gold))]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}