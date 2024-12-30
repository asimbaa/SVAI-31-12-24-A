import { motion } from 'framer-motion';
import { DollarSign, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Scholarship } from '@/lib/types/scholarship';

interface ScholarshipOverviewProps {
  scholarships: Scholarship[];
  onViewAll: () => void;
}

export function ScholarshipOverview({ scholarships, onViewAll }: ScholarshipOverviewProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Scholarships</h2>
          <button
            onClick={onViewAll}
            className="text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80"
          >
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {scholarships.slice(0, 3).map((scholarship) => (
            <motion.div
              key={scholarship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{scholarship.name}</h3>
                <span className="text-sm px-2 py-1 bg-[hsl(var(--gold))]/10 rounded-full text-[hsl(var(--gold))]">
                  {scholarship.amount.coverage}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <DollarSign className="w-4 h-4" />
                  <span>{scholarship.amount.value} {scholarship.amount.currency}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(scholarship.deadline.date).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}