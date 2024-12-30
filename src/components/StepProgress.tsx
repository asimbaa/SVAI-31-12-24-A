import { cn } from '../lib/utils';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export default function StepProgress({ currentStep, totalSteps, onStepClick }: StepProgressProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className="flex items-center"
          onClick={() => onStepClick(i)}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors",
              currentStep === i
                ? "bg-primary text-white"
                : i < currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            )}
          >
            {i < currentStep ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={cn(
                "h-1 w-full mx-2",
                i < currentStep ? "bg-green-500" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}