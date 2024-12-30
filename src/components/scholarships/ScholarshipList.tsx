import { motion } from 'framer-motion';
import { ScholarshipCard } from './ScholarshipCard';
import type { Scholarship } from '@/lib/types/scholarship';

interface ScholarshipListProps {
  scholarships: Scholarship[];
  onSelect: (scholarship: Scholarship) => void;
}

export function ScholarshipList({ scholarships, onSelect }: ScholarshipListProps) {
  if (scholarships.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">No scholarships found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {scholarships.map((scholarship, index) => (
        <motion.div
          key={scholarship.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ScholarshipCard
            scholarship={scholarship}
            onSelect={onSelect}
          />
        </motion.div>
      ))}
    </div>
  );
}