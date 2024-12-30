import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  component: React.ComponentType<any>;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function StepProgress({ steps, currentStep, onStepChange }: StepProgressProps) {
  return (
    <div className="relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
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
            <button
              key={step.title}
              onClick={() => onStepChange(index)}
              className={cn(
                "flex flex-col items-center",
                "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20 rounded-lg",
                (isCompleted || isCurrent) ? "cursor-pointer" : "cursor-not-allowed"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isCompleted ? "bg-[hsl(var(--gold))]" :
                isCurrent ? "bg-white/20 border-2 border-[hsl(var(--gold))]" :
                "bg-white/10"
              )}>
                {isCompleted ? (
                  <Check className="w-5 h-5 text-[hsl(var(--navy))]" />
                ) : (
                  <span className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-[hsl(var(--gold))]" : "text-white/60"
                  )}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={cn(
                "mt-2 text-sm font-medium",
                isCurrent ? "text-white" : "text-white/60"
              )}>
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}