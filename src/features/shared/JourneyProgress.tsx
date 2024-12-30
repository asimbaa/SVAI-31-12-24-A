import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/ui/ProgressRing';

interface JourneyProgressProps {
  progress: number;
  currentStep: string;
  nextStep: string;
}

export function JourneyProgress({ progress, currentStep, nextStep }: JourneyProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
    >
      <div className="flex items-center gap-6">
        <ProgressRing progress={progress} />
        <div>
          <h3 className="text-lg font-medium mb-2">Journey Progress</h3>
          <p className="text-white/80">Current: {currentStep}</p>
          <p className="text-white/60">Next: {nextStep}</p>
        </div>
      </div>
    </motion.div>
  );
}