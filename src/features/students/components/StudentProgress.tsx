import { ProgressRing } from '@/components/ui/ProgressRing';

interface StudentProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  nextStepTitle: string;
}

export const StudentProgress = ({
  currentStep,
  totalSteps,
  stepTitle,
  nextStepTitle
}: StudentProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
      <div className="flex items-center gap-6">
        <ProgressRing progress={progress} />
        <div>
          <h3 className="text-lg font-medium mb-2">Application Progress</h3>
          <p className="text-white/80">Current: {stepTitle}</p>
          <p className="text-white/60">Next: {nextStepTitle}</p>
        </div>
      </div>
    </div>
  );
};