import { motion } from 'framer-motion';
import { RequirementCard } from './RequirementCard';
import { VisaProbabilityMeter } from '@/features/shared/VisaProbabilityMeter';
import { type Requirement } from '../types';

interface StudentSidebarProps {
  requirements: Requirement[];
  visaData: any;
}

export function StudentSidebar({ requirements, visaData }: StudentSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
        <div className="space-y-4">
          {requirements.map((req) => (
            <RequirementCard
              key={req.id}
              title={req.title}
              description=""
              isCompleted={req.met}
              isRequired={req.required}
            />
          ))}
        </div>
      </div>

      <VisaProbabilityMeter data={visaData} />
    </motion.div>
  );
}