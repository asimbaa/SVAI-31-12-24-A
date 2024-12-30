import { motion } from 'framer-motion';
import { JourneyProgress } from './JourneyProgress';
import { TimelineProgress } from './TimelineProgress';
import { RequirementsList } from './RequirementsList';
import { Card } from '@/components/ui/Card';

interface ProgressDashboardProps {
  progress: {
    overall: number;
    currentStep: string;
    nextStep: string;
  };
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    completed: boolean;
  }>;
  requirements: Array<{
    id: string;
    title: string;
    description: string;
    met: boolean;
    importance: 'required' | 'recommended';
  }>;
}

export function ProgressDashboard({
  progress,
  timeline,
  requirements
}: ProgressDashboardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <JourneyProgress
            progress={progress.overall}
            currentStep={progress.currentStep}
            nextStep={progress.nextStep}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <h3 className="text-lg font-semibold mb-4">Timeline</h3>
          <TimelineProgress events={timeline} />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="md:col-span-2"
      >
        <Card>
          <h3 className="text-lg font-semibold mb-4">Requirements</h3>
          <RequirementsList requirements={requirements} />
        </Card>
      </motion.div>
    </div>
  );
}