import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ProgressChart } from '../charts/ProgressChart';

export function ApplicationStatus() {
  const progress = 25; // This will be dynamic in future updates

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card className="h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Application Status</h2>
          <span className="text-sm text-white/60">Updated 2h ago</span>
        </div>

        <div className="flex items-center gap-6">
          <ProgressChart progress={progress} />
          <div>
            <h3 className="font-medium mb-2">Document Collection</h3>
            <p className="text-white/60 text-sm">
              Complete your profile and upload required documents
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Next deadline</span>
            <span className="text-[hsl(var(--gold))]">March 15, 2024</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}