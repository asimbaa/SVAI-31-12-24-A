import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface EligibilityProgressProps {
  steps: { id: string; title: string }[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function EligibilityProgress({
  steps,
  currentStep,
  onStepClick
}: EligibilityProgressProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute top-5 left-6 right-6 h-0.5 bg-white/10">
        <div
          className="h-full bg-[hsl(var(--gold))] transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <motion.button
              key={step.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStepClick(index)}
              className="flex flex-col items-center"
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-colors relative z-10
                ${isCompleted
                  ? 'bg-[hsl(var(--gold))]'
                  : isCurrent
                    ? 'bg-white/20 border-2 border-[hsl(var(--gold))]'
                    : 'bg-white/10'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5 text-[hsl(var(--navy))]" />
                ) : (
                  <span className={`text-sm font-medium ${
                    isCurrent ? 'text-[hsl(var(--gold))]' : 'text-white/60'
                  }`}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                isCurrent ? 'text-white' : 'text-white/60'
              }`}>
                {step.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}