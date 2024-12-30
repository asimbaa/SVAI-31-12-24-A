import { motion } from 'framer-motion';
import { UniversityCard } from './UniversityCard';
import type { University } from '@/lib/types/university';

interface UniversityListProps {
  universities: University[];
  onSelect: (university: University) => void;
}

export function UniversityList({ universities, onSelect }: UniversityListProps) {
  if (universities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">No universities found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {universities.map((university, index) => (
        <motion.div
          key={university.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <UniversityCard
            university={university}
            onSelect={onSelect}
          />
        </motion.div>
      ))}
    </div>
  );
}